export enum UserRole {
  ADMIN = 'admin',
  LANDLORD = 'landlord',
  TENANT = 'tenant',
}

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
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type UserInfo = ReadUserInfoDto;
