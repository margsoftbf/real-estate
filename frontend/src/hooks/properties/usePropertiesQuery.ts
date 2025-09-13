import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { propertiesApi, PropertyFilters } from '@/lib/properties/api';
import { PropertyPublicDto } from '@/types/properties/public-types';
import { BasePaginatedResponse } from '@/types/api';

export interface UsePropertiesQueryOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string;
  filters?: PropertyFilters;
  enabled?: boolean;
}

export const usePropertiesQuery = (options: UsePropertiesQueryOptions = {}) => {
  const { page = 1, limit = 12, enabled = true, ...queryParams } = options;

  return useQuery({
    queryKey: ['properties', { page, limit, ...queryParams }],
    queryFn: () => propertiesApi.findAll({ page, limit, ...queryParams }),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};

export const useRentPropertiesQuery = (options: UsePropertiesQueryOptions = {}) => {
  const { page = 1, limit = 12, enabled = true, ...queryParams } = options;

  return useQuery({
    queryKey: ['properties', 'rent', { page, limit, ...queryParams }],
    queryFn: () => propertiesApi.findRentProperties({ page, limit, ...queryParams }),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};

export const useBuyPropertiesQuery = (options: UsePropertiesQueryOptions = {}) => {
  const { page = 1, limit = 12, enabled = true, ...queryParams } = options;

  return useQuery({
    queryKey: ['properties', 'buy', { page, limit, ...queryParams }],
    queryFn: () => propertiesApi.findBuyProperties({ page, limit, ...queryParams }),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePropertyBySlugQuery = (slug: string, enabled = true) => {
  return useQuery({
    queryKey: ['properties', 'slug', slug],
    queryFn: () => propertiesApi.findBySlug(slug),
    enabled: enabled && !!slug,
    staleTime: 10 * 60 * 1000,
  });
};

export const useInfinitePropertiesQuery = (
  type: 'all' | 'rent' | 'buy',
  options: Omit<UsePropertiesQueryOptions, 'page'> = {}
) => {
  const { limit = 12, enabled = true, ...queryParams } = options;

  const queryFn = (type: 'all' | 'rent' | 'buy') => {
    switch (type) {
      case 'rent':
        return propertiesApi.findRentProperties;
      case 'buy':
        return propertiesApi.findBuyProperties;
      default:
        return propertiesApi.findAll;
    }
  };

  return useInfiniteQuery({
    queryKey: ['properties', type, 'infinite', { limit, ...queryParams }],
    queryFn: ({ pageParam = 1 }) => 
      queryFn(type)({ page: pageParam, limit, ...queryParams }),
    enabled,
    initialPageParam: 1,
    getNextPageParam: (lastPage: BasePaginatedResponse<PropertyPublicDto>) => {
      const currentPage = lastPage.meta.currentPage || 1;
      const totalPages = lastPage.meta.totalPages || 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const usePropertySearch = (
  type: 'all' | 'rent' | 'buy' = 'all',
  initialOptions: UsePropertiesQueryOptions = {}
) => {
  const rentQuery = useRentPropertiesQuery(type === 'rent' ? initialOptions : { ...initialOptions, enabled: false });
  const buyQuery = useBuyPropertiesQuery(type === 'buy' ? initialOptions : { ...initialOptions, enabled: false });
  const allQuery = usePropertiesQuery(type === 'all' ? initialOptions : { ...initialOptions, enabled: false });

  const query = type === 'rent' ? rentQuery : type === 'buy' ? buyQuery : allQuery;

  return {
    ...query,
    properties: query.data?.data || [],
    totalPages: query.data?.meta.totalPages || 1,
    currentPage: query.data?.meta.currentPage || 1,
    totalItems: query.data?.meta.totalItems || 0,
  };
};