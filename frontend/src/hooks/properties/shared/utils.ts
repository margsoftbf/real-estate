import { PropertyFilters } from './types';

export const buildQueryFromFilters = (
  page: number,
  limit: number,
  appliedSearchTerm: string,
  filters: PropertyFilters
): Record<string, string | number | boolean | undefined> => {
  const query: Record<string, string | number | boolean | undefined> = {
    page,
    limit,
    search: appliedSearchTerm.trim() || undefined,
  };

  if (filters.minPrice) query['filter.price$gte'] = Number(filters.minPrice);
  if (filters.maxPrice) query['filter.price$lte'] = Number(filters.maxPrice);

  if (filters.minBedrooms)
    query['filter.features.bedrooms$gte'] = Number(filters.minBedrooms);
  if (filters.maxBedrooms)
    query['filter.features.bedrooms$lte'] = Number(filters.maxBedrooms);
  if (filters.minBathrooms)
    query['filter.features.bathrooms$gte'] = Number(filters.minBathrooms);
  if (filters.maxBathrooms)
    query['filter.features.bathrooms$lte'] = Number(filters.maxBathrooms);
  if (filters.minArea) query['filter.features.area$gte'] = Number(filters.minArea);
  if (filters.maxArea) query['filter.features.area$lte'] = Number(filters.maxArea);
  if (filters.minParkingSpaces)
    query['filter.features.parkingSpaces$gte'] = Number(filters.minParkingSpaces);
  if (filters.maxParkingSpaces)
    query['filter.features.parkingSpaces$lte'] = Number(filters.maxParkingSpaces);
  if (filters.minYearBuilt)
    query['filter.features.yearBuilt$gte'] = Number(filters.minYearBuilt);
  if (filters.maxYearBuilt)
    query['filter.features.yearBuilt$lte'] = Number(filters.maxYearBuilt);

  if (filters.homeType) query['filter.features.homeType'] = filters.homeType;
  if (filters.laundry) query['filter.features.laundry'] = filters.laundry;
  if (filters.heating) query['filter.features.heating'] = filters.heating;

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

  return query;
};
