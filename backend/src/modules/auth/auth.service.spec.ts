import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { User, UserRole } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  BadRequestException,
  UnauthorizedException,
} from '../../exceptions';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: jest.Mocked<Repository<User>>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser: User = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    slug: 'test-slug',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    passwordHash: '$2b$10$hashedPassword',
    phoneNumber: null,
    avatarUrl: null,
    role: UserRole.TENANT,
    address: null,
    city: null,
    postalCode: null,
    emailVerified: false,
    privacyConsent: true,
    marketingConsent: false,
    isActive: true,
    lastLoginAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  beforeEach(async () => {
    const mockUserRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    const mockJwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    const registerDto: RegisterDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: UserRole.TENANT,
      privacyConsent: true,
      marketingConsent: false,
    };

    it('should successfully register a new user', async () => {
      userRepository.findOne.mockResolvedValue(null);
      userRepository.create.mockReturnValue(mockUser);
      userRepository.save.mockResolvedValue(mockUser);

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);

      await service.register(registerDto);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: registerDto.email },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(registerDto.password, 10);
      expect(userRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
          email: registerDto.email,
          passwordHash: 'hashedPassword',
          role: registerDto.role,
          privacyConsent: registerDto.privacyConsent,
          marketingConsent: registerDto.marketingConsent,
        }),
      );
      expect(userRepository.save).toHaveBeenCalledWith(mockUser);
    });

    it('should throw BadRequestException if user already exists', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);

      await expect(service.register(registerDto)).rejects.toThrow(
        BadRequestException,
      );

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: registerDto.email },
      });
      expect(userRepository.create).not.toHaveBeenCalled();
      expect(userRepository.save).not.toHaveBeenCalled();
    });

    it('should handle optional fields correctly', async () => {
      const minimalRegisterDto: RegisterDto = {
        email: 'minimal@example.com',
        password: 'password123',
        role: UserRole.TENANT,
        privacyConsent: true,
      };

      userRepository.findOne.mockResolvedValue(null);
      userRepository.create.mockReturnValue(mockUser);
      userRepository.save.mockResolvedValue(mockUser);

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);

      await service.register(minimalRegisterDto);

      expect(userRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: null,
          lastName: null,
          email: minimalRegisterDto.email,
          passwordHash: 'hashedPassword',
          role: minimalRegisterDto.role,
          privacyConsent: minimalRegisterDto.privacyConsent,
          marketingConsent: false,
        }),
      );
    });
  });

  describe('login', () => {
    const loginDto: LoginDto = {
      email: 'john.doe@example.com',
      password: 'password123',
    };

    it('should successfully login with valid credentials', async () => {
      const accessToken = 'jwt-token';
      userRepository.findOne.mockResolvedValue(mockUser);
      userRepository.update.mockResolvedValue({} as any);
      jwtService.sign.mockReturnValue(accessToken);

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await service.login(loginDto);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: loginDto.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginDto.password,
        mockUser.passwordHash,
      );
      expect(userRepository.update).toHaveBeenCalledWith(mockUser.id, {
        lastLoginAt: expect.any(Date),
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
      });
      expect(result).toEqual({ access_token: accessToken });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      userRepository.findOne.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: loginDto.email },
      });
      expect(userRepository.update).not.toHaveBeenCalled();
      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException if user has no password hash', async () => {
      const userWithoutPassword = { ...mockUser, passwordHash: null };
      userRepository.findOne.mockResolvedValue(userWithoutPassword);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );

      expect(userRepository.update).not.toHaveBeenCalled();
      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );

      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginDto.password,
        mockUser.passwordHash,
      );
      expect(userRepository.update).not.toHaveBeenCalled();
      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('should update lastLoginAt on successful login', async () => {
      const accessToken = 'jwt-token';
      userRepository.findOne.mockResolvedValue(mockUser);
      userRepository.update.mockResolvedValue({} as any);
      jwtService.sign.mockReturnValue(accessToken);

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      await service.login(loginDto);

      expect(userRepository.update).toHaveBeenCalledWith(mockUser.id, {
        lastLoginAt: expect.any(Date),
      });
    });
  });
});