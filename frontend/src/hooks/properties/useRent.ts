import { propertiesApi } from '@/lib/properties/api';
import { usePropertySearch, UsePropertySearchReturn } from './usePropertySearch';

export const useRent = (): UsePropertySearchReturn => {
  return usePropertySearch({
    apiCall: (query) => propertiesApi.findRentProperties(query),
    routePath: 'rent',
    enableInitialLoad: false,
  });
};
