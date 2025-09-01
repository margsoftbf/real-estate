import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks/auth/useUser';
import { propertiesLandlordApi } from '@/lib/properties/for-landlord/api';
import type {
  PropertyLandlordDto,
  LandlordPropertyQuery,
} from '@/lib/properties/for-landlord/api';
import { PropertyType } from '@/types/properties/public-types';

interface Filters {
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

interface UseMyListingsReturn {
  properties: PropertyLandlordDto[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  totalCount: number;
  rentCount: number;
  saleCount: number;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: PropertyType | 'all';
  setActiveTab: (tab: PropertyType | 'all') => void;
  sortBy: 'name' | 'price' | 'status' | 'date';
  setSortBy: (sort: 'name' | 'price' | 'status' | 'date') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  handleFilterChange: (key: string, value: string | boolean | null) => void;
  handleClearFilters: () => void;

  deleteDialog: {
    isOpen: boolean;
    propertySlug: string | null;
    propertyTitle: string;
  };
  openDeleteDialog: (slug: string, title: string) => void;
  closeDeleteDialog: () => void;
  confirmDelete: () => Promise<void>;

  handleSearch: (e: React.FormEvent) => void;
  fetchProperties: (
    page?: number,
    search?: string,
    typeFilter?: PropertyType | 'all',
    filtersToUse?: Filters
  ) => Promise<void>;

  formatPrice: (price: number) => string;
  sortProperties: (properties: PropertyLandlordDto[]) => PropertyLandlordDto[];
}

export const useMyListings = (): UseMyListingsReturn => {
  const router = useRouter();
  const { data: userInfo, isLoading: userLoading } = useUser();

  const emptyFilters: Filters = useMemo(
    () => ({
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
    }),
    []
  );

  const [properties, setProperties] = useState<PropertyLandlordDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [rentCount, setRentCount] = useState(0);
  const [saleCount, setSaleCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<PropertyType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'status' | 'date'>(
    'date'
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
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
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    propertySlug: null as string | null,
    propertyTitle: '',
  });

  useEffect(() => {
    if (!userLoading && userInfo && userInfo.role !== 'landlord') {
      router.replace('/dashboard');
    }
  }, [userInfo, userLoading, router]);

  const fetchProperties = useCallback(
    async (
      page = 1,
      search = '',
      typeFilter: PropertyType | 'all' = 'all',
      filtersToUse = filters
    ) => {
      try {
        setIsLoading(true);
        setError(null);

        const filter: Record<string, string | number | boolean> =
          typeFilter !== 'all' ? { type: typeFilter } : {};

        if (filtersToUse.minPrice)
          filter['price$gte'] = Number(filtersToUse.minPrice);
        if (filtersToUse.maxPrice)
          filter['price$lte'] = Number(filtersToUse.maxPrice);
        if (filtersToUse.city) filter.city = filtersToUse.city;

        if (filtersToUse.minBedrooms)
          filter['features.bedrooms$gte'] = Number(filtersToUse.minBedrooms);
        if (filtersToUse.maxBedrooms)
          filter['features.bedrooms$lte'] = Number(filtersToUse.maxBedrooms);
        if (filtersToUse.minBathrooms)
          filter['features.bathrooms$gte'] = Number(filtersToUse.minBathrooms);
        if (filtersToUse.maxBathrooms)
          filter['features.bathrooms$lte'] = Number(filtersToUse.maxBathrooms);
        if (filtersToUse.minArea)
          filter['features.area$gte'] = Number(filtersToUse.minArea);
        if (filtersToUse.maxArea)
          filter['features.area$lte'] = Number(filtersToUse.maxArea);
        if (filtersToUse.minParkingSpaces)
          filter['features.parkingSpaces$gte'] = Number(
            filtersToUse.minParkingSpaces
          );
        if (filtersToUse.maxParkingSpaces)
          filter['features.parkingSpaces$lte'] = Number(
            filtersToUse.maxParkingSpaces
          );
        if (filtersToUse.minYearBuilt)
          filter['features.yearBuilt$gte'] = Number(filtersToUse.minYearBuilt);
        if (filtersToUse.maxYearBuilt)
          filter['features.yearBuilt$lte'] = Number(filtersToUse.maxYearBuilt);

        if (filtersToUse.homeType)
          filter['features.homeType'] = filtersToUse.homeType;
        if (filtersToUse.laundry)
          filter['features.laundry'] = filtersToUse.laundry;
        if (filtersToUse.heating)
          filter['features.heating'] = filtersToUse.heating;

        if (filtersToUse.furnished !== null)
          filter['features.furnished'] = filtersToUse.furnished;
        if (filtersToUse.petsAllowed !== null)
          filter['features.petsAllowed'] = filtersToUse.petsAllowed;
        if (filtersToUse.smokingAllowed !== null)
          filter['features.smokingAllowed'] = filtersToUse.smokingAllowed;
        if (filtersToUse.balcony !== null)
          filter['features.balcony'] = filtersToUse.balcony;
        if (filtersToUse.garden !== null)
          filter['features.garden'] = filtersToUse.garden;
        if (filtersToUse.garage !== null)
          filter['features.garage'] = filtersToUse.garage;
        if (filtersToUse.elevator !== null)
          filter['features.elevator'] = filtersToUse.elevator;
        if (filtersToUse.airConditioning !== null)
          filter['features.airConditioning'] = filtersToUse.airConditioning;
        if (filtersToUse.dishwasher !== null)
          filter['features.dishwasher'] = filtersToUse.dishwasher;
        if (filtersToUse.washerDryer !== null)
          filter['features.washerDryer'] = filtersToUse.washerDryer;
        if (filtersToUse.internet !== null)
          filter['features.internet'] = filtersToUse.internet;
        if (filtersToUse.cable !== null)
          filter['features.cable'] = filtersToUse.cable;

        const query: LandlordPropertyQuery = {
          page,
          limit: 10,
          search: search || undefined,
          filter: Object.keys(filter).length > 0 ? filter : undefined,
        };

        const response = await propertiesLandlordApi.findAll(query);

        setProperties(response.data);
        setTotalPages(
          Math.ceil(
            (response.meta?.totalItems || 0) /
              (response.meta?.itemsPerPage || 10)
          )
        );
        setCurrentPage(page);
      } catch {
        setError('Failed to load properties. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const fetchCounts = useCallback(async () => {
    try {
      const [allResponse, rentResponse, saleResponse] = await Promise.all([
        propertiesLandlordApi.findAll({ page: 1, limit: 1 }),
        propertiesLandlordApi.findAll({
          page: 1,
          limit: 1,
          filter: { type: PropertyType.RENT },
        }),
        propertiesLandlordApi.findAll({
          page: 1,
          limit: 1,
          filter: { type: PropertyType.SELL },
        }),
      ]);

      setTotalCount(allResponse.meta?.totalItems || 0);
      setRentCount(rentResponse.meta?.totalItems || 0);
      setSaleCount(saleResponse.meta?.totalItems || 0);
    } catch {

    }
  }, []);

  useEffect(() => {
    if (userInfo?.role === 'landlord') {
      fetchCounts();
    }
  }, [userInfo, fetchCounts]);

  useEffect(() => {
    if (userInfo?.role === 'landlord') {
      fetchProperties(1, '', activeTab, emptyFilters);
    }
  }, [userInfo, fetchProperties, activeTab, emptyFilters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProperties(1, searchQuery, activeTab, filters);
  };

  const openDeleteDialog = (slug: string, title: string) => {
    setDeleteDialog({
      isOpen: true,
      propertySlug: slug,
      propertyTitle: title,
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      isOpen: false,
      propertySlug: null,
      propertyTitle: '',
    });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.propertySlug) return;

    try {
      await propertiesLandlordApi.remove(deleteDialog.propertySlug);
      await fetchProperties(currentPage, searchQuery, activeTab, filters);
      fetchCounts();
      closeDeleteDialog();
    } catch {
      setError('Failed to delete property. Please try again.');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const sortProperties = (properties: PropertyLandlordDto[]) => {
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
  };

  const handleFilterChange = (key: string, value: string | boolean | null) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters(emptyFilters);
  };

  return {
    properties,
    isLoading,
    error,
    totalPages,
    currentPage,
    totalCount,
    rentCount,
    saleCount,

    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    showFilters,
    setShowFilters,
    filters,
    setFilters,
    handleFilterChange,
    handleClearFilters,

    deleteDialog,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,

    handleSearch,
    fetchProperties,

    formatPrice,
    sortProperties,
  };
};
