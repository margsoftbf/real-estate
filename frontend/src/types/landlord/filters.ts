export interface Filters {
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

export const emptyFilters: Filters = {
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
};
