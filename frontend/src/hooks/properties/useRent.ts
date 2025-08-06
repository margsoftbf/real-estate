import { useReducer, useEffect, useState, useOptimistic } from 'react';
import { propertiesApi } from '@/lib/properties/api';
import { PropertyPublicDto } from '@/types/properties';
import { BasePaginatedResponse } from '@/types/api';

const ITEMS_PER_REQUEST = 12;

interface Filters {
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

interface RentState {
  properties: PropertyPublicDto[];
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  appliedSearchTerm: string;
  filters: Filters;
  isFilterModalOpen: boolean;
}

type RentAction =
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'APPLY_SEARCH'; payload: string }
  | { type: 'SET_FILTER_MODAL_OPEN'; payload: boolean }
  | {
      type: 'SET_FILTER';
      payload: { key: string; value: string | boolean | null };
    }
  | { type: 'CLEAR_FILTERS' }
  | {
      type: 'SET_PROPERTIES';
      payload: {
        properties: PropertyPublicDto[];
        totalPages: number;
        currentPage: number;
      };
    }
  | { type: 'SET_PAGE'; payload: number };

const initialState: RentState = {
  properties: [],
  currentPage: 1,
  totalPages: 1,
  searchTerm: '',
  appliedSearchTerm: '',
  filters: {
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
  },
  isFilterModalOpen: false,
};

function rentReducer(state: RentState, action: RentAction): RentState {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'APPLY_SEARCH':
      return { ...state, appliedSearchTerm: action.payload };
    case 'SET_FILTER_MODAL_OPEN':
      return { ...state, isFilterModalOpen: action.payload };
    case 'SET_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value,
        },
      };
    case 'CLEAR_FILTERS':
      return {
        ...state,
        searchTerm: '',
        appliedSearchTerm: '',
        filters: {
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
        },
      };
    case 'SET_PROPERTIES':
      return {
        ...state,
        properties: action.payload.properties,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
}

async function loadProperties(
  page: number,
  appliedSearchTerm: string,
  filters: Filters
): Promise<{
  properties: PropertyPublicDto[];
  totalPages: number;
  currentPage: number;
}> {
  const query: Record<string, string | number | boolean | undefined> = {
    page,
    limit: ITEMS_PER_REQUEST,
    search: appliedSearchTerm.trim() || undefined,
  };

  // Basic filters
  if (filters.minPrice) query['filter.price$gte'] = Number(filters.minPrice);
  if (filters.maxPrice) query['filter.price$lte'] = Number(filters.maxPrice);
  if (filters.city) query['filter.city$ilike'] = filters.city;

  // Features range filters
  if (filters.minBedrooms)
    query['filter.features.minBedrooms'] = filters.minBedrooms;
  if (filters.maxBedrooms)
    query['filter.features.maxBedrooms'] = filters.maxBedrooms;
  if (filters.minBathrooms)
    query['filter.features.minBathrooms'] = filters.minBathrooms;
  if (filters.maxBathrooms)
    query['filter.features.maxBathrooms'] = filters.maxBathrooms;
  if (filters.minArea) query['filter.features.minArea'] = filters.minArea;
  if (filters.maxArea) query['filter.features.maxArea'] = filters.maxArea;
  if (filters.minParkingSpaces)
    query['filter.features.minParkingSpaces'] = filters.minParkingSpaces;
  if (filters.maxParkingSpaces)
    query['filter.features.maxParkingSpaces'] = filters.maxParkingSpaces;
  if (filters.minYearBuilt)
    query['filter.features.minYearBuilt'] = filters.minYearBuilt;
  if (filters.maxYearBuilt)
    query['filter.features.maxYearBuilt'] = filters.maxYearBuilt;

  // Features string filters
  if (filters.homeType) query['filter.features.homeType'] = filters.homeType;
  if (filters.laundry) query['filter.features.laundry'] = filters.laundry;
  if (filters.heating) query['filter.features.heating'] = filters.heating;

  // Features boolean filters
  if (filters.furnished !== null)
    query['filter.features.furnished'] = filters.furnished.toString();
  if (filters.petsAllowed !== null)
    query['filter.features.petsAllowed'] = filters.petsAllowed.toString();
  if (filters.smokingAllowed !== null)
    query['filter.features.smokingAllowed'] = filters.smokingAllowed.toString();
  if (filters.balcony !== null)
    query['filter.features.balcony'] = filters.balcony.toString();
  if (filters.garden !== null)
    query['filter.features.garden'] = filters.garden.toString();
  if (filters.garage !== null)
    query['filter.features.garage'] = filters.garage.toString();
  if (filters.elevator !== null)
    query['filter.features.elevator'] = filters.elevator.toString();
  if (filters.airConditioning !== null)
    query['filter.features.airConditioning'] =
      filters.airConditioning.toString();
  if (filters.dishwasher !== null)
    query['filter.features.dishwasher'] = filters.dishwasher.toString();
  if (filters.washerDryer !== null)
    query['filter.features.washerDryer'] = filters.washerDryer.toString();
  if (filters.internet !== null)
    query['filter.features.internet'] = filters.internet.toString();
  if (filters.cable !== null)
    query['filter.features.cable'] = filters.cable.toString();

  console.log('🔍 Query being sent to API:', JSON.stringify(query, null, 2));

  const response: BasePaginatedResponse<PropertyPublicDto> =
    await propertiesApi.findRentProperties(query);

  console.log('📊 Response from API:', {
    totalItems: response.meta.totalItems,
    totalPages: response.meta.totalPages,
    currentPage: response.meta.currentPage,
    itemsCount: response.data.length,
  });

  return {
    properties: response.data,
    totalPages: response.meta.totalPages || 1,
    currentPage: Number(response.meta.currentPage) || page,
  };
}

interface UseRentReturn {
  state: RentState;
  isLoading: boolean;
  error: string | null;
  optimisticProperties: PropertyPublicDto[];

  dispatch: React.Dispatch<RentAction>;
  loadPropertiesWithParams: (page?: number) => Promise<void>;
}

export const useRent = (): UseRentReturn => {
  const [state, dispatch] = useReducer(rentReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [optimisticProperties] = useOptimistic(
    state.properties,
    (current: PropertyPublicDto[], optimisticProperty: PropertyPublicDto) => [
      optimisticProperty,
      ...current,
    ]
  );

  // Load properties when filters or applied search term change
  useEffect(() => {
    loadPropertiesWithParams(1);
  }, [state.filters, state.appliedSearchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load initial properties
  useEffect(() => {
    loadPropertiesWithParams(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    } catch (err) {
      console.error('Error loading properties:', err);
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
  };
};
