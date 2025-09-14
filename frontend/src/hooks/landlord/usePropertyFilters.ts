import { useMemo } from 'react';
import { Filters } from '@/types/landlord/filters';
import { LandlordPropertyQuery } from '@/lib/properties/for-landlord/api';
import { PropertyType } from '@/types/properties/public-types';

export const usePropertyFilters = (
  filters: Filters,
  activeTab: PropertyType | 'all',
  currentPage: number,
  searchQuery: string
) => {
  return useMemo(() => {
    const filter: Record<string, string | number | boolean> =
      activeTab !== 'all' ? { type: activeTab } : {};

    if (filters.minPrice) filter['price$gte'] = Number(filters.minPrice);
    if (filters.maxPrice) filter['price$lte'] = Number(filters.maxPrice);
    if (filters.city) filter.city = filters.city;

    if (filters.minBedrooms)
      filter['features.bedrooms$gte'] = Number(filters.minBedrooms);
    if (filters.maxBedrooms)
      filter['features.bedrooms$lte'] = Number(filters.maxBedrooms);
    if (filters.minBathrooms)
      filter['features.bathrooms$gte'] = Number(filters.minBathrooms);
    if (filters.maxBathrooms)
      filter['features.bathrooms$lte'] = Number(filters.maxBathrooms);
    if (filters.minArea) filter['features.area$gte'] = Number(filters.minArea);
    if (filters.maxArea) filter['features.area$lte'] = Number(filters.maxArea);
    if (filters.minParkingSpaces)
      filter['features.parkingSpaces$gte'] = Number(filters.minParkingSpaces);
    if (filters.maxParkingSpaces)
      filter['features.parkingSpaces$lte'] = Number(filters.maxParkingSpaces);
    if (filters.minYearBuilt)
      filter['features.yearBuilt$gte'] = Number(filters.minYearBuilt);
    if (filters.maxYearBuilt)
      filter['features.yearBuilt$lte'] = Number(filters.maxYearBuilt);

    if (filters.homeType) filter['features.homeType'] = filters.homeType;
    if (filters.laundry) filter['features.laundry'] = filters.laundry;
    if (filters.heating) filter['features.heating'] = filters.heating;

    if (filters.furnished !== null)
      filter['features.furnished'] = filters.furnished;
    if (filters.petsAllowed !== null)
      filter['features.petsAllowed'] = filters.petsAllowed;
    if (filters.smokingAllowed !== null)
      filter['features.smokingAllowed'] = filters.smokingAllowed;
    if (filters.balcony !== null) filter['features.balcony'] = filters.balcony;
    if (filters.garden !== null) filter['features.garden'] = filters.garden;
    if (filters.garage !== null) filter['features.garage'] = filters.garage;
    if (filters.elevator !== null)
      filter['features.elevator'] = filters.elevator;
    if (filters.airConditioning !== null)
      filter['features.airConditioning'] = filters.airConditioning;
    if (filters.dishwasher !== null)
      filter['features.dishwasher'] = filters.dishwasher;
    if (filters.washerDryer !== null)
      filter['features.washerDryer'] = filters.washerDryer;
    if (filters.internet !== null)
      filter['features.internet'] = filters.internet;
    if (filters.cable !== null) filter['features.cable'] = filters.cable;

    const query: LandlordPropertyQuery = {
      page: currentPage,
      limit: 10,
      search: searchQuery || undefined,
      filter: Object.keys(filter).length > 0 ? filter : undefined,
    };

    return query;
  }, [filters, activeTab, currentPage, searchQuery]);
};
