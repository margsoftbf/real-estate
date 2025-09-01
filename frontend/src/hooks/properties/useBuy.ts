import { propertiesApi } from '@/lib/properties/api';
import { usePropertySearch, UsePropertySearchReturn } from './usePropertySearch';

export const useBuy = (): UsePropertySearchReturn => {
  return usePropertySearch({
    apiCall: (query) => propertiesApi.findBuyProperties(query),
    routePath: 'buy',
    enableInitialLoad: false,
  });
};
