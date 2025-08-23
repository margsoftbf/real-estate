import { BaseApiClient } from '@/lib/base-api';
import { BasePaginatedResponse } from '@/types/api';
import { PropertyPublicDto } from '@/types/properties/public-types';

export interface PropertyQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string;
  filter?: {
    type?: string;
    city?: string;
    country?: string;
    minPrice?: number;
    maxPrice?: number;
    isPopular?: boolean;
    'features.bedrooms'?: number;
    'features.minBedrooms'?: number;
    'features.maxBedrooms'?: number;
    'features.bathrooms'?: number;
    'features.minBathrooms'?: number;
    'features.maxBathrooms'?: number;
    'features.minArea'?: number;
    'features.maxArea'?: number;
    'features.parkingSpaces'?: number;
    'features.minParkingSpaces'?: number;
    'features.maxParkingSpaces'?: number;
    'features.homeType'?:
      | 'house'
      | 'condo'
      | 'apartment'
      | 'townhouse'
      | 'studio';
    'features.laundry'?: 'in-unit' | 'shared' | 'none';
    'features.heating'?: 'central' | 'electric' | 'gas' | 'oil' | 'none';
    'features.minYearBuilt'?: number;
    'features.maxYearBuilt'?: number;
    'features.furnished'?: boolean;
    'features.petsAllowed'?: boolean;
    'features.smokingAllowed'?: boolean;
    'features.balcony'?: boolean;
    'features.garden'?: boolean;
    'features.garage'?: boolean;
    'features.elevator'?: boolean;
    'features.airConditioning'?: boolean;
    'features.dishwasher'?: boolean;
    'features.washerDryer'?: boolean;
    'features.internet'?: boolean;
    'features.cable'?: boolean;
  };
}

class PropertiesApi extends BaseApiClient {
  async findAll(
    query: PropertyQuery = {}
  ): Promise<BasePaginatedResponse<PropertyPublicDto>> {
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
    const endpoint = `/properties${queryString ? `?${queryString}` : ''}`;

    return this.request<BasePaginatedResponse<PropertyPublicDto>>(endpoint);
  }

  async findRentProperties(
    query: Record<string, string | number | boolean | undefined> = {}
  ): Promise<BasePaginatedResponse<PropertyPublicDto>> {
    const searchParams = new URLSearchParams();

    if (query.page) searchParams.append('page', String(query.page));
    if (query.limit) searchParams.append('limit', String(query.limit));
    if (query.sortBy) searchParams.append('sortBy', String(query.sortBy));
    if (query.search) searchParams.append('search', String(query.search));

    Object.entries(query).forEach(([key, value]) => {
      if (
        key !== 'page' &&
        key !== 'limit' &&
        key !== 'sortBy' &&
        key !== 'search' &&
        value !== undefined &&
        value !== null
      ) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/properties/rent${queryString ? `?${queryString}` : ''}`;

    return this.request<BasePaginatedResponse<PropertyPublicDto>>(endpoint);
  }

  async findBuyProperties(
    query: Record<string, string | number | boolean | undefined> = {}
  ): Promise<BasePaginatedResponse<PropertyPublicDto>> {
    const searchParams = new URLSearchParams();

    if (query.page) searchParams.append('page', String(query.page));
    if (query.limit) searchParams.append('limit', String(query.limit));
    if (query.sortBy) searchParams.append('sortBy', String(query.sortBy));
    if (query.search) searchParams.append('search', String(query.search));

    Object.entries(query).forEach(([key, value]) => {
      if (
        key !== 'page' &&
        key !== 'limit' &&
        key !== 'sortBy' &&
        key !== 'search' &&
        value !== undefined &&
        value !== null
      ) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/properties/buy${queryString ? `?${queryString}` : ''}`;

    return this.request<BasePaginatedResponse<PropertyPublicDto>>(endpoint);
  }

  async findBySlug(slug: string): Promise<PropertyPublicDto> {
    return this.request<PropertyPublicDto>(`/properties/${slug}`);
  }
}

export const propertiesApi = new PropertiesApi();
