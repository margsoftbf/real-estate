import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PropertyFeatures, PropertyType } from '../../entities/property.entity';

export class PropertiesAdminCreateDto {
  @ApiProperty({ description: 'Property slug', maxLength: 500 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  slug: string;

  @ApiProperty({ description: 'Owner ID' })
  @IsUUID()
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty({ description: 'Property type', enum: PropertyType })
  @IsEnum(PropertyType)
  type: PropertyType;

  @ApiProperty({ description: 'Price', minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'City', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city: string;

  @ApiProperty({ description: 'Country', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  country: string;

  @ApiProperty({
    description: 'Property title',
    required: false,
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @ApiProperty({
    description: 'Property photos',
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photos?: string[];

  @ApiProperty({ description: 'Property description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Property features', required: false })
  @IsOptional()
  features?: PropertyFeatures;

  @ApiProperty({
    description: 'Is property popular',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isPopular?: boolean;

  @ApiProperty({
    description: 'Is property active',
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
