import { BaseApiClient } from '@/lib/base-api';
import { BasePaginatedResponse } from '@/types/api';
import { PropertyPublicDto } from '@/types/properties/public-types';

export interface PropertyFilters {
  [key: string]: string | number | boolean | null | undefined;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minArea?: number;
  maxArea?: number;
  minParkingSpaces?: number;
  maxParkingSpaces?: number;
  minYearBuilt?: number;
  maxYearBuilt?: number;
  homeType?: 'house' | 'condo' | 'apartment' | 'townhouse' | 'studio';
  laundry?: 'in-unit' | 'shared' | 'none';
  heating?: 'central' | 'electric' | 'gas' | 'oil' | 'none';
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
  isPopular?: boolean;
}

export interface PropertyQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string;
  filters?: PropertyFilters;
}

const buildQueryParams = (query: PropertyQuery): string => {
  const searchParams = new URLSearchParams();

  if (query.page) searchParams.append('page', query.page.toString());
  if (query.limit) searchParams.append('limit', query.limit.toString());
  if (query.sortBy) searchParams.append('sortBy', query.sortBy);
  if (query.search) searchParams.append('search', query.search);

  if (query.filters) {
    Object.entries(query.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key.startsWith('min') || key.startsWith('max')) {
          const filterKey = key.startsWith('min') 
            ? `filter.${key.replace('min', '').toLowerCase()}$gte`
            : `filter.${key.replace('max', '').toLowerCase()}$lte`;
          searchParams.append(filterKey, value.toString());
        } else {
          searchParams.append(`filter.${key}`, value.toString());
        }
      }
    });
  }

  return searchParams.toString();
};

class PropertiesApi extends BaseApiClient {
  async findAll(query: PropertyQuery = {}): Promise<BasePaginatedResponse<PropertyPublicDto>> {
    const queryString = buildQueryParams(query);
    const endpoint = `/properties${queryString ? `?${queryString}` : ''}`;
    return this.request<BasePaginatedResponse<PropertyPublicDto>>(endpoint);
  }

  async findRentProperties(query: PropertyQuery = {}): Promise<BasePaginatedResponse<PropertyPublicDto>> {
    const queryString = buildQueryParams(query);
    const endpoint = `/properties/rent${queryString ? `?${queryString}` : ''}`;
    return this.request<BasePaginatedResponse<PropertyPublicDto>>(endpoint);
  }

  async findBuyProperties(query: PropertyQuery = {}): Promise<BasePaginatedResponse<PropertyPublicDto>> {
    const queryString = buildQueryParams(query);
    const endpoint = `/properties/buy${queryString ? `?${queryString}` : ''}`;
    return this.request<BasePaginatedResponse<PropertyPublicDto>>(endpoint);
  }

  async findBySlug(slug: string): Promise<PropertyPublicDto> {
    return this.request<PropertyPublicDto>(`/properties/${slug}`);
  }
}

export const propertiesApi = new PropertiesApi();
