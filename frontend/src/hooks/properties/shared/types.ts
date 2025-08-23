import { PropertyPublicDto } from '@/types/properties';

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

export type PropertySearchAction =
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

export const createInitialFilters = (): PropertyFilters => ({
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

export const createInitialState = (): PropertySearchState => ({
  properties: [],
  currentPage: 1,
  totalPages: 1,
  searchTerm: '',
  appliedSearchTerm: '',
  filters: createInitialFilters(),
  isFilterModalOpen: false,
});
