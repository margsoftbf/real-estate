import { useMemo } from 'react';
import { PropertyLandlordDto } from '@/lib/properties/for-landlord/api';

type SortBy = 'name' | 'price' | 'status' | 'date';
type SortOrder = 'asc' | 'desc';

export const usePropertySorting = (
  properties: PropertyLandlordDto[],
  sortBy: SortBy,
  sortOrder: SortOrder
) => {
  return useMemo(() => {
    return [...properties].sort((a, b) => {
      let aValue: string | number | Date;
      let bValue: string | number | Date;

      switch (sortBy) {
        case 'name':
          aValue = (a.title || '').toLowerCase();
          bValue = (b.title || '').toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'status':
          aValue = a.isActive ? 'active' : 'inactive';
          bValue = b.isActive ? 'active' : 'inactive';
          break;
        case 'date':
        default:
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [properties, sortBy, sortOrder]);
};
