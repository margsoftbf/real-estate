import { User, UserRole } from '../src/modules/users/entities/user.entity';

export const createMockUser = (overrides?: Partial<User>): User => {
  return {
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
    ...overrides,
  };
};

export const createMinimalMockUser = (overrides?: Partial<User>): User => {
  return createMockUser({
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
    ...overrides,
  });
};

export const createLandlordUser = (overrides?: Partial<User>): User => {
  return createMockUser({
    role: UserRole.LANDLORD,
    email: 'landlord@example.com',
    ...overrides,
  });
};

export const createAdminUser = (overrides?: Partial<User>): User => {
  return createMockUser({
    role: UserRole.ADMIN,
    email: 'admin@example.com',
    ...overrides,
  });
};