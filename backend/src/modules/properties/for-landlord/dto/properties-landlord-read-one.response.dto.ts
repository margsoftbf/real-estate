import { PropertyType, PropertyFeatures, PropertyPriceHistory } from '../../entities/property.entity';

export class PropertyLandlordReadOneDto {
  slug: string;
  type: PropertyType;
  price: number;
  city: string;
  country: string;
  title: string | null;
  photos: string[];
  description: string | null;
  features: PropertyFeatures | null;
  priceHistory: PropertyPriceHistory[];
  isPopular: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}