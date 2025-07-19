import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UsersUserService } from './users.user.service';
import { User, UserRole } from '../entities/user.entity';
import { ReadUserInfoDto } from './dto/read-user-info.dto';

describe('UsersUserService', () => {
  let service: UsersUserService;
  let userRepository: jest.Mocked<Repository<User>>;

  const mockUser: User = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    slug: 'test-user-slug',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    passwordHash: '$2b$10$hashedPassword',
    phoneNumber: '+48123456789',
    avatarUrl: 'https://example.com/avatar.jpg',
    role: UserRole.TENANT,
    address: '123 Test Street',
    city: 'Warsaw',
    postalCode: '00-001',
    emailVerified: true,
    privacyConsent: true,
    marketingConsent: false,
    isActive: true,
    lastLoginAt: new Date('2025-01-01T12:00:00Z'),
    createdAt: new Date('2025-01-01T00:00:00Z'),
    updatedAt: new Date('2025-01-01T12:00:00Z'),
    deletedAt: null,
  };

  beforeEach(async () => {
    const mockUserRepository = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersUserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersUserService>(UsersUserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('readUserInfo', () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';

    it('should return user info when user exists', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.readUserInfo(userId);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });

      const expectedResult: ReadUserInfoDto = {
        slug: mockUser.slug!,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
        phoneNumber: mockUser.phoneNumber,
        avatarUrl: mockUser.avatarUrl,
        role: mockUser.role,
        address: mockUser.address,
        city: mockUser.city,
        postalCode: mockUser.postalCode,
        emailVerified: mockUser.emailVerified,
        privacyConsent: mockUser.privacyConsent,
        marketingConsent: mockUser.marketingConsent,
        isActive: mockUser.isActive,
        lastLoginAt: mockUser.lastLoginAt,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
      };

      expect(result).toEqual(expectedResult);
    });

    it('should throw NotFoundException when user does not exist', async () => {
      userRepository.findOne.mockResolvedValue(null);

      await expect(service.readUserInfo(userId)).rejects.toThrow(
        NotFoundException,
      );

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });

    it('should handle user with minimal data', async () => {
      const minimalUser: User = {
        ...mockUser,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        avatarUrl: null,
        address: null,
        city: null,
        postalCode: null,
        emailVerified: false,
        marketingConsent: false,
        lastLoginAt: null,
      };

      userRepository.findOne.mockResolvedValue(minimalUser);

      const result = await service.readUserInfo(userId);

      expect(result).toEqual({
        slug: minimalUser.slug!,
        firstName: null,
        lastName: null,
        email: minimalUser.email,
        phoneNumber: null,
        avatarUrl: null,
        role: minimalUser.role,
        address: null,
        city: null,
        postalCode: null,
        emailVerified: false,
        privacyConsent: minimalUser.privacyConsent,
        marketingConsent: false,
        isActive: minimalUser.isActive,
        lastLoginAt: null,
        createdAt: minimalUser.createdAt,
        updatedAt: minimalUser.updatedAt,
      });
    });

    it('should handle different user roles', async () => {
      const landlordUser = {
        ...mockUser,
        role: UserRole.LANDLORD,
        email: 'landlord@example.com',
      };

      userRepository.findOne.mockResolvedValue(landlordUser);

      const result = await service.readUserInfo(userId);

      expect(result.role).toBe(UserRole.LANDLORD);
      expect(result.email).toBe('landlord@example.com');
    });

    it('should handle admin user', async () => {
      const adminUser = {
        ...mockUser,
        role: UserRole.ADMIN,
        email: 'admin@example.com',
      };

      userRepository.findOne.mockResolvedValue(adminUser);

      const result = await service.readUserInfo(userId);

      expect(result.role).toBe(UserRole.ADMIN);
      expect(result.email).toBe('admin@example.com');
    });

    it('should not expose sensitive fields', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.readUserInfo(userId);

      expect(result).not.toHaveProperty('passwordHash');
      expect(result).not.toHaveProperty('id');
      expect(result).not.toHaveProperty('deletedAt');
    });

    it('should handle user with all nullable fields as null', async () => {
      const userWithNulls: User = {
        ...mockUser,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        avatarUrl: null,
        address: null,
        city: null,
        postalCode: null,
        lastLoginAt: null,
      };

      userRepository.findOne.mockResolvedValue(userWithNulls);

      const result = await service.readUserInfo(userId);

      expect(result.firstName).toBeNull();
      expect(result.lastName).toBeNull();
      expect(result.phoneNumber).toBeNull();
      expect(result.avatarUrl).toBeNull();
      expect(result.address).toBeNull();
      expect(result.city).toBeNull();
      expect(result.postalCode).toBeNull();
      expect(result.lastLoginAt).toBeNull();
    });
  });
});