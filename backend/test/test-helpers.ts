import { User, UserRole } from '../src/modules/users/entities/user.entity';
import {
  Property,
  PropertyAvailabilityStatus,
  PropertyType,
} from '../src/modules/properties/entities/property.entity';
import {
  Application,
  ApplicationStatus,
} from '../src/modules/applications/entities/application.entity';

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
    country: 'Poland',
    postalCode: '00-001',
    emailVerified: true,
    privacyConsent: true,
    marketingConsent: false,
    isActive: true,
    lastLoginAt: new Date('2025-01-01T12:00:00Z'),
    createdAt: new Date('2025-01-01T00:00:00Z'),
    updatedAt: new Date('2025-01-01T12:00:00Z'),
    deletedAt: null,
    properties: [],
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
    country: null,
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

export const createMockProperty = (overrides?: Partial<Property>): Property => {
  return {
    id: '550e8400-e29b-41d4-a716-446655440000',
    slug: 'test-property-slug',
    owner: createLandlordUser(),
    type: PropertyType.RENT,
    availabilityStatus: PropertyAvailabilityStatus.AVAILABLE,
    price: 2500,
    city: 'Warsaw',
    country: 'Poland',
    latitude: 52.237_049,
    longitude: 21.017_532,
    title: 'Test Property',
    photos: ['https://example.com/photo1.jpg'],
    description: 'A beautiful test property',
    features: {
      bedrooms: 2,
      bathrooms: 1,
      area: 75,
      homeType: 'apartment' as const,
      furnished: true,
    },
    priceHistory: [
      {
        price: 2500,
        date: new Date('2025-01-01T00:00:00Z'),
        reason: 'Initial listing',
      },
    ],
    isPopular: false,
    isActive: true,
    createdAt: new Date('2025-01-01T00:00:00Z'),
    updatedAt: new Date('2025-01-01T00:00:00Z'),
    deletedAt: null,
    ...overrides,
  };
};

export const createMockPropertyForSale = (
  overrides?: Partial<Property>,
): Property => {
  return createMockProperty({
    type: PropertyType.SELL,
    price: 450_000,
    title: 'Test House for Sale',
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      homeType: 'house' as const,
      garden: true,
      garage: true,
    },
    ...overrides,
  });
};

export const createMockApplication = (
  overrides?: Partial<Application>,
): Application => {
  return {
    id: '660e8400-e29b-41d4-a716-446655440000',
    slug: 'test-application-slug',
    property: createMockProperty(),
    applicant: createMockUser(),
    applicantName: 'John Doe',
    applicantEmail: 'john.doe@example.com',
    applicantPhone: '+48123456789',
    message: 'I am interested in renting this property',
    status: ApplicationStatus.PENDING,
    proposedRent: 2400,
    preferredMoveInDate: new Date('2025-03-01'),
    landlordNotes: null,
    createdAt: new Date('2025-01-01T00:00:00Z'),
    updatedAt: new Date('2025-01-01T00:00:00Z'),
    isCurrentRenter: false,
    deletedAt: null,
    ...overrides,
  };
};

// Query Builder Mock Helpers - Simple and type-safe approach
export const createMockQueryBuilder = (config?: {
  getOne?: any;
  getMany?: any[];
}) => {
  const mockBuilder = {
    where: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockResolvedValue(config?.getOne ?? null),
    getMany: jest.fn().mockResolvedValue(config?.getMany ?? []),
  };

  return mockBuilder as any;
};

export const createPropertyQueryBuilder = (property?: Property | null) =>
  createMockQueryBuilder({ getOne: property });

export const createApplicationQueryBuilder = (
  applications?: Application | Application[] | null,
) => {
  if (Array.isArray(applications)) {
    return createMockQueryBuilder({ getMany: applications });
  }
  return createMockQueryBuilder({ getOne: applications });
};
