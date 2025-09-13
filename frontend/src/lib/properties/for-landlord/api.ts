import { BaseApiClient } from '@/lib/base-api';
import { BasePaginatedResponse } from '@/types/api';
import {
  PropertyType,
  PropertyFeatures,
  PropertyPriceHistory,
} from '@/types/properties/public-types';


class PropertiesLandlordApi extends BaseApiClient {
  private readonly baseEndpoint = '/landlord/properties';

  async create(data: PropertyLandlordCreateDto): Promise<PropertyLandlordDto> {
    return this.request<PropertyLandlordDto>(this.baseEndpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async findAll(
    query: LandlordPropertyQuery = {}
  ): Promise<BasePaginatedResponse<PropertyLandlordDto>> {
    const searchParams = new URLSearchParams();

    if (query.page) searchParams.append('page', query.page.toString());
    if (query.limit) searchParams.append('limit', query.limit.toString());
    if (query.sortBy) searchParams.append('sortBy', query.sortBy);
    if (query.search) searchParams.append('search', query.search);

    if (query.filter) {
      Object.entries(query.filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(`filter.${key}`, value.toString());
        }
      });
    }

    const queryString = searchParams.toString();
    const endpoint = `${this.baseEndpoint}${queryString ? `?${queryString}` : ''}`;

    return this.request<BasePaginatedResponse<PropertyLandlordDto>>(endpoint);
  }

  async findOne(slug: string): Promise<PropertyLandlordDto> {
    return this.request<PropertyLandlordDto>(`${this.baseEndpoint}/${slug}`);
  }

  async update(
    slug: string,
    data: PropertyLandlordUpdateDto
  ): Promise<PropertyLandlordDto> {
    return this.request<PropertyLandlordDto>(`${this.baseEndpoint}/${slug}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async remove(slug: string): Promise<void> {
    return this.request<void>(`${this.baseEndpoint}/${slug}`, {
      method: 'DELETE',
    });
  }
}

export const propertiesLandlordApi = new PropertiesLandlordApi();

export interface PropertyLandlordCreateDto {
  slug?: string;
  type: PropertyType;
  price: number;
  city: string;
  country: string;
  title?: string;
  photos?: string[];
  description?: string;
  features?: PropertyFeatures;
  isPopular?: boolean;
  isActive?: boolean;
  latitude?: number;
  longitude?: number;
  priceChangeReason?: string;
}

export type PropertyLandlordUpdateDto = Partial<PropertyLandlordCreateDto>;

export interface PropertyLandlordDto {
  slug: string;
  type: PropertyType;
  price: number;
  city: string;
  country: string;
  title: string | null;
  photos: string[];
  description: string | null;
  latitude: number;
  longitude: number;
  features: PropertyFeatures | null;
  priceHistory: PropertyPriceHistory[];
  isPopular: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LandlordPropertyQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string;
  filter?: {
    type?: PropertyType;
    city?: string;
    country?: string;
    isPopular?: boolean;
    isActive?: boolean;
  };
}