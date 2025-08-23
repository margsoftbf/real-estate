import { NextRouter } from 'next/router';
import { propertiesApi } from '@/lib/properties/api';
import { usePropertySearch } from './shared/usePropertySearch';

interface UseBuyReturn {
  state: ReturnType<typeof usePropertySearch>['state'];
  isLoading: boolean;
  error: string | null;
  optimisticProperties: ReturnType<
    typeof usePropertySearch
  >['optimisticProperties'];
  dispatch: ReturnType<typeof usePropertySearch>['dispatch'];
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

export const useBuy = (): UseBuyReturn => {
  const {
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
  } = usePropertySearch({
    apiCall: (query) => propertiesApi.findBuyProperties(query),
    routePath: 'buy',
    enableInitialLoad: true,
  });

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
