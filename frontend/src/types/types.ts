// Synchronized with backend DTO - keep in sync with backend/src/modules/users/

export enum UserRole {
  ADMIN = 'admin',
  LANDLORD = 'landlord',
  TENANT = 'tenant',
}

// Matches backend ReadUserInfoDto exactly
export interface ReadUserInfoDto {
  slug: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  avatarUrl: string | null;
  role: UserRole;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  emailVerified: boolean;
  privacyConsent: boolean;
  marketingConsent: boolean;
  isActive: boolean;
  lastLoginAt: string | null; // JSON serializes Date as string
  createdAt: string; // JSON serializes Date as string
  updatedAt: string; // JSON serializes Date as string
}

// Main type to use in app
export type UserInfo = ReadUserInfoDto;
