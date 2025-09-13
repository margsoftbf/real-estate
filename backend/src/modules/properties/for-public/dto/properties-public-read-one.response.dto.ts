import { ApiProperty } from '@nestjs/swagger';
import {
  PropertyFeatures,
  PropertyPriceHistory,
  PropertyType,
} from '../../entities/property.entity';

class PropertyOwnerDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string | null;

  @ApiProperty()
  lastName: string | null;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string | null;

  @ApiProperty()
  avatarUrl: string | null;
}

export class PropertiesPublicReadOneResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({ enum: PropertyType })
  type: PropertyType;

  @ApiProperty()
  price: number;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  title: string | null;

  @ApiProperty({ type: [String] })
  photos: string[];

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  features: PropertyFeatures | null;

  @ApiProperty()
  isPopular: boolean;

  @ApiProperty()
  latitude: number | null;

  @ApiProperty()
  longitude: number | null;

  @ApiProperty()
  priceHistory: PropertyPriceHistory[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: PropertyOwnerDto })
  owner: PropertyOwnerDto;
}
