import { useReducer, useEffect, useState } from 'react';
import { NextRouter } from 'next/router';
import { PropertyPublicDto } from '@/types/properties';
import { BasePaginatedResponse } from '@/types/api';

const ITEMS_PER_REQUEST = 12;

export interface PropertyFilters {
  [key: string]: string | boolean | null;
  minPrice: string;
  maxPrice: string;
  city: string;
  minBedrooms: string;
  maxBedrooms: string;
  minBathrooms: string;
  maxBathrooms: string;
  minArea: string;
  maxArea: string;
  minParkingSpaces: string;
  maxParkingSpaces: string;
  minYearBuilt: string;
  maxYearBuilt: string;
  homeType: string;
  laundry: string;
  heating: string;
  furnished: boolean | null;
  petsAllowed: boolean | null;
  smokingAllowed: boolean | null;
  balcony: boolean | null;
  garden: boolean | null;
  garage: boolean | null;
  elevator: boolean | null;
  airConditioning: boolean | null;
  dishwasher: boolean | null;
  washerDryer: boolean | null;
  internet: boolean | null;
  cable: boolean | null;
}

export interface PropertySearchState {
  properties: PropertyPublicDto[];
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  appliedSearchTerm: string;
  filters: PropertyFilters;
  isFilterModalOpen: boolean;
}

type PropertySearchAction =
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'APPLY_SEARCH'; payload: string }
  | { type: 'SET_FILTER_MODAL_OPEN'; payload: boolean }
  | { type: 'SET_FILTER'; payload: { key: string; value: string | boolean | null } }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'SET_PROPERTIES'; payload: { properties: PropertyPublicDto[]; totalPages: number; currentPage: number } }
  | { type: 'SET_PAGE'; payload: number };

const createInitialFilters = (): PropertyFilters => ({
  minPrice: '',
  maxPrice: '',
  city: '',
  minBedrooms: '',
  maxBedrooms: '',
  minBathrooms: '',
  maxBathrooms: '',
  minArea: '',
  maxArea: '',
  minParkingSpaces: '',
  maxParkingSpaces: '',
  minYearBuilt: '',
  maxYearBuilt: '',
  homeType: '',
  laundry: '',
  heating: '',
  furnished: null,
  petsAllowed: null,
  smokingAllowed: null,
  balcony: null,
  garden: null,
  garage: null,
  elevator: null,
  airConditioning: null,
  dishwasher: null,
  washerDryer: null,
  internet: null,
  cable: null,
});

const createInitialState = (): PropertySearchState => ({
  properties: [],
  currentPage: 1,
  totalPages: 1,
  searchTerm: '',
  appliedSearchTerm: '',
  filters: createInitialFilters(),
  isFilterModalOpen: false,
});

function propertySearchReducer(state: PropertySearchState, action: PropertySearchAction): PropertySearchState {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'APPLY_SEARCH':
      return { ...state, appliedSearchTerm: action.payload };
    case 'SET_FILTER_MODAL_OPEN':
      return { ...state, isFilterModalOpen: action.payload };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, [action.payload.key]: action.payload.value } };
    case 'CLEAR_FILTERS':
      return { ...state, searchTerm: '', appliedSearchTerm: '', filters: createInitialFilters(), currentPage: 1 };
    case 'SET_PROPERTIES':
      return { ...state, properties: action.payload.properties, totalPages: action.payload.totalPages, currentPage: action.payload.currentPage };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
}

const buildQueryFromFilters = (page: number, limit: number, appliedSearchTerm: string, filters: PropertyFilters): Record<string, string | number | boolean | undefined> => {
  const query: Record<string, string | number | boolean | undefined> = { page, limit };
  
  if (appliedSearchTerm.trim()) {
    query['filter.city$eq'] = appliedSearchTerm.trim();
  }

  if (filters.minPrice) query['filter.price$gte'] = Number(filters.minPrice);
  if (filters.maxPrice) query['filter.price$lte'] = Number(filters.maxPrice);
  if (filters.minBedrooms) query['filter.features.bedrooms$gte'] = Number(filters.minBedrooms);
  if (filters.maxBedrooms) query['filter.features.bedrooms$lte'] = Number(filters.maxBedrooms);
  if (filters.minBathrooms) query['filter.features.bathrooms$gte'] = Number(filters.minBathrooms);
  if (filters.maxBathrooms) query['filter.features.bathrooms$lte'] = Number(filters.maxBathrooms);
  if (filters.minArea) query['filter.features.area$gte'] = Number(filters.minArea);
  if (filters.maxArea) query['filter.features.area$lte'] = Number(filters.maxArea);
  if (filters.minParkingSpaces) query['filter.features.parkingSpaces$gte'] = Number(filters.minParkingSpaces);
  if (filters.maxParkingSpaces) query['filter.features.parkingSpaces$lte'] = Number(filters.maxParkingSpaces);
  if (filters.minYearBuilt) query['filter.features.yearBuilt$gte'] = Number(filters.minYearBuilt);
  if (filters.maxYearBuilt) query['filter.features.yearBuilt$lte'] = Number(filters.maxYearBuilt);

  if (filters.homeType) query['filter.features.homeType'] = filters.homeType;
  if (filters.laundry) query['filter.features.laundry'] = filters.laundry;
  if (filters.heating) query['filter.features.heating'] = filters.heating;

  if (filters.furnished !== null) query['filter.features.furnished'] = filters.furnished.toString();
  if (filters.petsAllowed !== null) query['filter.features.petsAllowed'] = filters.petsAllowed.toString();
  if (filters.smokingAllowed !== null) query['filter.features.smokingAllowed'] = filters.smokingAllowed.toString();
  if (filters.balcony !== null) query['filter.features.balcony'] = filters.balcony.toString();
  if (filters.garden !== null) query['filter.features.garden'] = filters.garden.toString();
  if (filters.garage !== null) query['filter.features.garage'] = filters.garage.toString();
  if (filters.elevator !== null) query['filter.features.elevator'] = filters.elevator.toString();
  if (filters.airConditioning !== null) query['filter.features.airConditioning'] = filters.airConditioning.toString();
  if (filters.dishwasher !== null) query['filter.features.dishwasher'] = filters.dishwasher.toString();
  if (filters.washerDryer !== null) query['filter.features.washerDryer'] = filters.washerDryer.toString();
  if (filters.internet !== null) query['filter.features.internet'] = filters.internet.toString();
  if (filters.cable !== null) query['filter.features.cable'] = filters.cable.toString();

  return query;
};

interface UsePropertySearchOptions {
  apiCall: (query: Record<string, string | number | boolean | undefined>) => Promise<BasePaginatedResponse<PropertyPublicDto>>;
  routePath: string;
  enableInitialLoad?: boolean;
}

export interface UsePropertySearchReturn {
  state: PropertySearchState;
  isLoading: boolean;
  error: string | null;
  optimisticProperties: PropertyPublicDto[];
  dispatch: React.Dispatch<PropertySearchAction>;
  loadPropertiesWithParams: (page?: number) => Promise<void>;
  handleRouterSearch: (routerQuery: Record<string, string | string[] | undefined>, router: NextRouter) => void;
  handleSearch: (searchTerm: string, router: NextRouter) => void;
  handleFilterChange: (key: string, value: string | boolean | null) => void;
  handleApplyFilters: () => void;
  handleClearFilters: () => void;
}

export const usePropertySearch = ({ apiCall, routePath, enableInitialLoad = false }: UsePropertySearchOptions): UsePropertySearchReturn => {
  const [state, dispatch] = useReducer(propertySearchReducer, createInitialState());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (enableInitialLoad) {
      loadPropertiesWithParams(1);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (state.appliedSearchTerm !== '' || Object.values(state.filters).some((v) => v !== '' && v !== null)) {
      loadPropertiesWithParams(1);
    }
  }, [state.appliedSearchTerm, state.filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadProperties = async (page: number, appliedSearchTerm: string, filters: PropertyFilters) => {
    const query = buildQueryFromFilters(page, ITEMS_PER_REQUEST, appliedSearchTerm, filters);
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
      const result = await loadProperties(currentPage, state.appliedSearchTerm, state.filters);

      dispatch({
        type: 'SET_PROPERTIES',
        payload: result,
      });
    } catch {
      setError('Failed to load properties. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRouterSearch = (routerQuery: Record<string, string | string[] | undefined>, router: NextRouter) => {
    if (router.isReady) {
      if (routerQuery.city && typeof routerQuery.city === 'string') {
        dispatch({ type: 'SET_SEARCH_TERM', payload: routerQuery.city });
        dispatch({ type: 'APPLY_SEARCH', payload: routerQuery.city });
      } else if (!enableInitialLoad) {
        loadPropertiesWithParams(1);
      }
    }
  };

  const handleSearch = (searchTerm: string, router: NextRouter) => {
    dispatch({ type: 'APPLY_SEARCH', payload: searchTerm });
    dispatch({ type: 'SET_PAGE', payload: 1 });

    if (searchTerm.trim()) {
      router.push(`/${routePath}?city=${encodeURIComponent(searchTerm.trim())}`, undefined, { shallow: true });
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

    try {
      setIsLoading(true);
      setError(null);

      const result = await loadProperties(1, '', createInitialFilters());
      dispatch({ type: 'SET_PROPERTIES', payload: result });
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
    optimisticProperties: state.properties,
    dispatch,
    loadPropertiesWithParams,
    handleRouterSearch,
    handleSearch,
    handleFilterChange,
    handleApplyFilters,
    handleClearFilters,
  };
};