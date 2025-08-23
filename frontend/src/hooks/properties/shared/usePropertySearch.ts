import { useReducer, useEffect, useState } from 'react';
import { NextRouter } from 'next/router';
import { PropertyPublicDto } from '@/types/properties';
import { BasePaginatedResponse } from '@/types/api';
import {
  PropertySearchState,
  PropertySearchAction,
  createInitialState,
  createInitialFilters,
} from './types';
import { propertySearchReducer } from './reducer';
import { buildQueryFromFilters } from './utils';

const ITEMS_PER_REQUEST = 12;

interface UsePropertySearchOptions {
  apiCall: (
    query: Record<string, string | number | boolean | undefined>
  ) => Promise<BasePaginatedResponse<PropertyPublicDto>>;
  routePath: string;
  enableInitialLoad?: boolean;
}

interface UsePropertySearchReturn {
  state: PropertySearchState;
  isLoading: boolean;
  error: string | null;
  optimisticProperties: PropertyPublicDto[];
  dispatch: React.Dispatch<PropertySearchAction>;
  loadPropertiesWithParams: (page?: number) => Promise<void>;
  handleRouterSearch: (
    routerQuery: Record<string, string | string[] | undefined>,
    router: NextRouter
  ) => void;
  handleSearch: (searchTerm: string, router: NextRouter) => void;
  handleFilterChange: (key: string, value: string | boolean | null) => void;
  handleApplyFilters: () => void;
  handleClearFilters: () => void;
}

export const usePropertySearch = ({
  apiCall,
  routePath,
  enableInitialLoad = false,
}: UsePropertySearchOptions): UsePropertySearchReturn => {
  const [state, dispatch] = useReducer(
    propertySearchReducer,
    createInitialState()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Use regular properties instead of optimistic for now
  const optimisticProperties = state.properties;

  useEffect(() => {
    if (enableInitialLoad) {
      loadPropertiesWithParams(1);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Load properties when applied search term or filters change
    if (
      state.appliedSearchTerm !== '' ||
      Object.values(state.filters).some((v) => v !== '' && v !== null)
    ) {
      loadPropertiesWithParams(1);
    }
  }, [state.appliedSearchTerm, state.filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadProperties = async (
    page: number,
    appliedSearchTerm: string,
    filters: PropertySearchState['filters']
  ): Promise<{
    properties: PropertyPublicDto[];
    totalPages: number;
    currentPage: number;
  }> => {
    const query = buildQueryFromFilters(
      page,
      ITEMS_PER_REQUEST,
      appliedSearchTerm,
      filters
    );
    const response = await apiCall(query);

    return {
      properties: response.data,
      totalPages: response.meta.totalPages || 1,
      currentPage: Number(response.meta.currentPage) || page,
    };
  };

  const loadPropertiesWithParams = async (page?: number) => {
    try {
      setIsLoading(true);
      setError(null);

      const currentPage = page || state.currentPage;
      const result = await loadProperties(
        currentPage,
        state.appliedSearchTerm,
        state.filters
      );

      dispatch({
        type: 'SET_PROPERTIES',
        payload: {
          properties: result.properties,
          totalPages: result.totalPages,
          currentPage: result.currentPage,
        },
      });
    } catch {
      setError('Failed to load properties. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRouterSearch = (
    routerQuery: Record<string, string | string[] | undefined>,
    router: NextRouter
  ) => {
    if (router.isReady) {
      if (routerQuery.city && typeof routerQuery.city === 'string') {
        dispatch({
          type: 'SET_SEARCH_TERM',
          payload: routerQuery.city,
        });
        dispatch({
          type: 'APPLY_SEARCH',
          payload: routerQuery.city,
        });
        // Load properties with the search term
        loadPropertiesWithParams(1);
      } else if (!enableInitialLoad) {
        // Only load if initial load is disabled and no city parameter
        loadPropertiesWithParams(1);
      }
    }
  };

  const handleSearch = (searchTerm: string, router: NextRouter) => {
    dispatch({ type: 'APPLY_SEARCH', payload: searchTerm });
    dispatch({ type: 'SET_PAGE', payload: 1 });

    if (searchTerm.trim()) {
      router.push(
        `/${routePath}?city=${encodeURIComponent(searchTerm.trim())}`,
        undefined,
        { shallow: true }
      );
    } else {
      router.push(`/${routePath}`, undefined, { shallow: true });
    }
  };

  const handleFilterChange = (key: string, value: string | boolean | null) => {
    dispatch({ type: 'SET_FILTER', payload: { key, value } });
  };

  const handleApplyFilters = () => {
    dispatch({ type: 'SET_PAGE', payload: 1 });
    loadPropertiesWithParams(1);
  };

  const handleClearFilters = async () => {
    dispatch({ type: 'CLEAR_FILTERS' });

    // Load properties with cleared filters directly
    try {
      setIsLoading(true);
      setError(null);

      const result = await loadProperties(1, '', createInitialFilters());

      dispatch({
        type: 'SET_PROPERTIES',
        payload: {
          properties: result.properties,
          totalPages: result.totalPages,
          currentPage: result.currentPage,
        },
      });
    } catch {
      setError('Failed to load properties. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    state,
    isLoading,
    error,
    optimisticProperties,
    dispatch,
    loadPropertiesWithParams,
    handleRouterSearch,
    handleSearch,
    handleFilterChange,
    handleApplyFilters,
    handleClearFilters,
  };
};
