import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import {
  usePropertySearch,
  UsePropertiesQueryOptions,
} from './usePropertiesQuery';
import { PropertyFilters } from '@/lib/properties/api';

interface UsePropertySearchWithURLOptions {
  type: 'all' | 'rent' | 'buy';
  routePath: string;
  defaultLimit?: number;
}

export const usePropertySearchWithURL = ({
  type,
  routePath,
  defaultLimit = 12,
}: UsePropertySearchWithURLOptions) => {
  const router = useRouter();
  const [queryOptions, setQueryOptions] = useState<UsePropertiesQueryOptions>({
    page: 1,
    limit: defaultLimit,
    enabled: false,
  });

  const query = usePropertySearch(type, queryOptions);

  useEffect(() => {
    if (!router.isReady) return;

    const timeout = setTimeout(() => {
      const { page, search, ...filterParams } = router.query;

      const filters: PropertyFilters = {};
      const booleanFields = [
        'furnished',
        'petsAllowed',
        'smokingAllowed',
        'balcony',
        'garden',
        'garage',
        'elevator',
        'airConditioning',
        'dishwasher',
        'washerDryer',
        'internet',
        'cable',
      ];

      Object.entries(filterParams).forEach(([key, value]) => {
        if (typeof value === 'string' && value) {
          if (key.startsWith('min') || key.startsWith('max')) {
            const numValue = Number(value);
            if (!isNaN(numValue)) {
              (filters as Record<string, number>)[key] = numValue;
            }
          } else if (booleanFields.includes(key)) {
            (filters as Record<string, boolean>)[key] = value === 'true';
          } else {
            (filters as Record<string, string>)[key] = value;
          }
        }
      });

      const newQueryOptions = {
        page: page && typeof page === 'string' ? Number(page) : 1,
        limit: defaultLimit,
        search: search && typeof search === 'string' ? search : undefined,
        filters: Object.keys(filters).length > 0 ? filters : undefined,
        enabled: true,
      };

      setQueryOptions(newQueryOptions);
    }, 100); // 100ms debounce

    return () => clearTimeout(timeout);
  }, [router.isReady, router.asPath, router.query, defaultLimit]);

  const updateURL = useCallback(
    (newOptions: Partial<UsePropertiesQueryOptions>) => {
      const queryParams: Record<string, string> = {};

      if (newOptions.page && newOptions.page > 1) {
        queryParams.page = newOptions.page.toString();
      }

      if (newOptions.search) {
        queryParams.search = newOptions.search;
      }

      if (newOptions.filters) {
        Object.entries(newOptions.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams[key] = value.toString();
          }
        });
      }

      const hasParams = Object.keys(queryParams).length > 0;
      const url = hasParams
        ? `/${routePath}?${new URLSearchParams(queryParams).toString()}`
        : `/${routePath}`;

      router.push(url, undefined, { shallow: true });
    },
    [router, routePath]
  );

  const setSearch = useCallback(
    (search: string) => {
      setQueryOptions((prevOptions) => {
        const newOptions = {
          ...prevOptions,
          search: search || undefined,
          page: 1,
        };
        updateURL(newOptions);
        return newOptions;
      });
    },
    [updateURL]
  );

  const setFilters = useCallback(
    (filters: PropertyFilters) => {
      setQueryOptions((prevOptions) => {
        const newOptions = { ...prevOptions, filters, page: 1 };
        updateURL(newOptions);
        return newOptions;
      });
    },
    [updateURL]
  );

  const setPage = useCallback(
    (page: number) => {
      setQueryOptions((prevOptions) => {
        const newOptions = { ...prevOptions, page };
        updateURL(newOptions);
        return newOptions;
      });
    },
    [updateURL]
  );

  const clearFilters = useCallback(() => {
    const newOptions = {
      page: 1,
      limit: defaultLimit,
      search: undefined,
      filters: undefined,
      enabled: true,
    };
    setQueryOptions(newOptions);
    updateURL(newOptions);
  }, [defaultLimit, updateURL]);

  return {
    ...query,
    currentSearch: queryOptions.search || '',
    currentFilters: queryOptions.filters || {},
    currentPage: queryOptions.page || 1,
    setSearch,
    setFilters,
    setPage,
    clearFilters,
    refetch: query.refetch,
  };
};
