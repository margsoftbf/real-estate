import { PropertyType, PropertyFeatures } from '../../entities/property.entity';
import { BasePaginatedResponse } from '../../../../shared/types/base.dto';

export class PropertyLandlordReadManyDto {
  slug: string;
  type: PropertyType;
  price: number;
  city: string;
  country: string;
  title: string | null;
  photos: string[];
  features: PropertyFeatures | null;
  isPopular: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class PropertyLandlordReadManyResponseDto extends BasePaginatedResponse<PropertyLandlordReadManyDto> {}