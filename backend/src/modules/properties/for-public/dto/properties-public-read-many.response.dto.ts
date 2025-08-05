import { PropertyType, PropertyFeatures } from '../../entities/property.entity';
import { User } from '../../../users/entities/user.entity';
import { BasePaginatedResponse } from '@/shared/types/base.dto';

class PropertyPublicOwnerReadManyDto
  implements
    Pick<User, 'firstName' | 'lastName' | 'email' | 'phoneNumber' | 'avatarUrl'>
{
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  avatarUrl: string | null;
}

export class PropertyPublicReadManyDto {
  slug: string;
  type: PropertyType;
  price: number;
  city: string;
  country: string;
  title: string | null;
  photos: string[];
  description: string | null;
  features: PropertyFeatures | null;
  isPopular: boolean;
  createdAt: Date;
  updatedAt: Date;
  owner: PropertyPublicOwnerReadManyDto;
}

export class PropertyPublicReadManyResponseDto extends BasePaginatedResponse<PropertyPublicReadManyDto> {}
