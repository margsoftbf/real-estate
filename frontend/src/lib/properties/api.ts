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
          const baseKey = key.replace(/^(min|max)/, '').toLowerCase();
          const operator = key.startsWith('min') ? '$gte' : '$lte';

          // Map feature fields to features.* format for backend
          const featureMapping: Record<string, string> = {
            bedrooms: 'features.bedrooms',
            bathrooms: 'features.bathrooms',
            area: 'features.area',
            parkingspaces: 'features.parkingSpaces',
            yearbuilt: 'features.yearBuilt',
          };
          const finalKey = featureMapping[baseKey] || baseKey;

          searchParams.append(
            `filter.${finalKey}${operator}`,
            value.toString()
          );
        } else {
          // Map feature fields to features.* format for boolean/string features
          const featureMapping: Record<string, string> = {
            hometype: 'features.homeType',
            laundry: 'features.laundry',
            heating: 'features.heating',
            furnished: 'features.furnished',
            petsallowed: 'features.petsAllowed',
            smokingallowed: 'features.smokingAllowed',
            balcony: 'features.balcony',
            garden: 'features.garden',
            garage: 'features.garage',
            elevator: 'features.elevator',
            airconditioning: 'features.airConditioning',
            dishwasher: 'features.dishwasher',
            washerdryer: 'features.washerDryer',
            internet: 'features.internet',
            cable: 'features.cable',
          };
          const finalKey = featureMapping[key.toLowerCase()] || key;

          searchParams.append(`filter.${finalKey}`, value.toString());
        }
      }
    });
  }

  return searchParams.toString();
};

class PropertiesApi extends BaseApiClient {
  async findAll(
    query: PropertyQuery = {}
  ): Promise<BasePaginatedResponse<PropertyPublicDto>> {
    const queryString = buildQueryParams(query);
    const endpoint = `/properties${queryString ? `?${queryString}` : ''}`;
    return this.request<BasePaginatedResponse<PropertyPublicDto>>(endpoint);
  }

  async findRentProperties(
    query: PropertyQuery = {}
  ): Promise<BasePaginatedResponse<PropertyPublicDto>> {
    const queryString = buildQueryParams(query);
    const endpoint = `/properties/rent${queryString ? `?${queryString}` : ''}`;
    return this.request<BasePaginatedResponse<PropertyPublicDto>>(endpoint);
  }

  async findBuyProperties(
    query: PropertyQuery = {}
  ): Promise<BasePaginatedResponse<PropertyPublicDto>> {
    const queryString = buildQueryParams(query);
    const endpoint = `/properties/buy${queryString ? `?${queryString}` : ''}`;
    return this.request<BasePaginatedResponse<PropertyPublicDto>>(endpoint);
  }

  async findBySlug(slug: string): Promise<PropertyPublicDto> {
    return this.request<PropertyPublicDto>(`/properties/${slug}`);
  }
}

export const propertiesApi = new PropertiesApi();
