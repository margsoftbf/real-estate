import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UsersUserService } from './users.user.service';
import { User, UserRole } from '../entities/user.entity';
import { UserReadInfoDto } from './dto/user-read-info-response.dto';
import { UpdateUserDto } from './dto/user-update-response.dto';
import { createMockUser, createMinimalMockUser, createLandlordUser, createAdminUser } from '../../../../test/test-helpers';

describe('UsersUserService', () => {
  let service: UsersUserService;
  let userRepository: jest.Mocked<Repository<User>>;

  const mockUser = createMockUser();

  beforeEach(async () => {
    const mockUserRepository = {
      findOne: jest.fn(),
      update: jest.fn(),
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

      const expectedResult: UserReadInfoDto = {
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
      const minimalUser = createMinimalMockUser();

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
      const landlordUser = createLandlordUser();

      userRepository.findOne.mockResolvedValue(landlordUser);

      const result = await service.readUserInfo(userId);

      expect(result.role).toBe(UserRole.LANDLORD);
      expect(result.email).toBe('landlord@example.com');
    });

    it('should handle admin user', async () => {
      const adminUser = createAdminUser();

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
      const userWithNulls = createMinimalMockUser();

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

  describe('updateUser', () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';

    it('should update user info successfully', async () => {
      const updateData: UpdateUserDto = {
        firstName: 'Jane',
        lastName: 'Smith',
        phoneNumber: '+48987654321',
        city: 'Krakow',
      };

      userRepository.findOne.mockResolvedValue(mockUser);
      userRepository.update.mockResolvedValue({ affected: 1 } as any);

      const updatedUser = createMockUser({
        firstName: 'Jane',
        lastName: 'Smith',
        phoneNumber: '+48987654321',
        city: 'Krakow',
      });

      userRepository.findOne.mockResolvedValueOnce(mockUser).mockResolvedValueOnce(updatedUser);

      const result = await service.updateUser(userId, updateData);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(userRepository.update).toHaveBeenCalledWith(userId, updateData);
      expect(result.firstName).toBe('Jane');
      expect(result.lastName).toBe('Smith');
      expect(result.phoneNumber).toBe('+48987654321');
      expect(result.city).toBe('Krakow');
    });

    it('should throw NotFoundException when user does not exist', async () => {
      const updateData: UpdateUserDto = {
        firstName: 'Jane',
      };

      userRepository.findOne.mockResolvedValue(null);

      await expect(service.updateUser(userId, updateData)).rejects.toThrow(
        NotFoundException,
      );

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(userRepository.update).not.toHaveBeenCalled();
    });

    it('should update only provided fields', async () => {
      const updateData: UpdateUserDto = {
        firstName: 'UpdatedName',
        marketingConsent: true,
      };

      userRepository.findOne.mockResolvedValue(mockUser);
      userRepository.update.mockResolvedValue({ affected: 1 } as any);

      const updatedUser = createMockUser({
        firstName: 'UpdatedName',
        marketingConsent: true,
      });

      userRepository.findOne.mockResolvedValueOnce(mockUser).mockResolvedValueOnce(updatedUser);

      const result = await service.updateUser(userId, updateData);

      expect(userRepository.update).toHaveBeenCalledWith(userId, {
        firstName: 'UpdatedName',
        marketingConsent: true,
      });
      expect(result.firstName).toBe('UpdatedName');
      expect(result.marketingConsent).toBe(true);
      expect(result.email).toBe(mockUser.email);
    });

    it('should handle empty update data', async () => {
      const updateData: UpdateUserDto = {};

      userRepository.findOne.mockResolvedValue(mockUser);
      userRepository.update.mockResolvedValue({ affected: 1 } as any);

      userRepository.findOne.mockResolvedValueOnce(mockUser).mockResolvedValueOnce(mockUser);

      const result = await service.updateUser(userId, updateData);

      expect(userRepository.update).toHaveBeenCalledWith(userId, {});
      expect(result).toEqual({
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
      });
    });

    it('should update all updatable fields', async () => {
      const updateData: UpdateUserDto = {
        firstName: 'NewFirst',
        lastName: 'NewLast',
        phoneNumber: '+48111222333',
        avatarUrl: 'https://newavatar.com/image.jpg',
        address: '456 New Street',
        city: 'Gdansk',
        postalCode: '80-001',
        marketingConsent: true,
      };

      userRepository.findOne.mockResolvedValue(mockUser);
      userRepository.update.mockResolvedValue({ affected: 1 } as any);

      const updatedUser = createMockUser(updateData);

      userRepository.findOne.mockResolvedValueOnce(mockUser).mockResolvedValueOnce(updatedUser);

      const result = await service.updateUser(userId, updateData);

      expect(userRepository.update).toHaveBeenCalledWith(userId, updateData);
      expect(result.firstName).toBe('NewFirst');
      expect(result.lastName).toBe('NewLast');
      expect(result.phoneNumber).toBe('+48111222333');
      expect(result.avatarUrl).toBe('https://newavatar.com/image.jpg');
      expect(result.address).toBe('456 New Street');
      expect(result.city).toBe('Gdansk');
      expect(result.postalCode).toBe('80-001');
      expect(result.marketingConsent).toBe(true);
    });
  });
});
