import { UserRole } from '../../entities/user.entity';

export class UserReadInfoDto {
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
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
