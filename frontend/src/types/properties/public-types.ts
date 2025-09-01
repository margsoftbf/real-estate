export enum PropertyType {
  SELL = 'sell',
  RENT = 'rent',
}

export interface PropertyFeatures {
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  parkingSpaces?: number;
  dateAvailable?: string;
  homeType?: 'house' | 'condo' | 'apartment' | 'townhouse' | 'studio';
  laundry?: 'in-unit' | 'shared' | 'none';
  heating?: 'central' | 'electric' | 'gas' | 'oil' | 'none';
  yearBuilt?: number;
  furnished?: boolean;
  petsAllowed?: boolean;
  smokingAllowed?: boolean;
  balcony?: boolean;
  garden?: boolean;
  garage?: boolean;
  elevator?: boolean;
  airConditioning?: boolean;
  dishwasher?: boolean;
  washerDryer?: boolean;
  internet?: boolean;
  cable?: boolean;
  [key: string]: string | number | boolean | undefined;
}

export interface PropertyPriceHistory {
  price: number;
  date: string;
  reason?: string;
}

export interface PropertyPublicOwnerDto {
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  avatarUrl: string | null;
}

export interface PropertyPublicDto {
  slug: string;
  type: PropertyType;
  price: number;
  city: string;
  country: string;
  latitude?: number | null;
  longitude?: number | null;
  title: string | null;
  photos: string[];
  description: string | null;
  features: PropertyFeatures | null;
  isPopular: boolean;
  priceHistory?: PropertyPriceHistory[];
  createdAt: string;
  updatedAt: string;
  owner: PropertyPublicOwnerDto;
}
