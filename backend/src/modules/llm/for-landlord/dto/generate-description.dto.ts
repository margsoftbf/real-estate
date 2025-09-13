import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  STUDIO = 'studio',
  ROOM = 'room',
}

export enum ListingType {
  RENT = 'rent',
  SALE = 'sale',
}

export class GenerateDescriptionDto {
  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsEnum(ListingType)
  listingType: ListingType;

  @IsNumber()
  rooms: number;

  @IsNumber()
  area: number;

  @IsString()
  location: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  features?: string;

  @IsOptional()
  @IsString()
  additionalInfo?: string;
}

export interface PropertyDescriptionResponse {
  description: string;
  tags: string[];
  highlights: string[];
  title: string;
}
