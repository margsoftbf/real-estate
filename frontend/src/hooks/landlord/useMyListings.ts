import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/hooks/auth/useUser';
import { propertiesLandlordApi } from '@/lib/properties/for-landlord/api';
import type {
  PropertyLandlordDto,
  LandlordPropertyQuery,
} from '@/lib/properties/for-landlord/api';
import { PropertyType } from '@/types/properties/public-types';
import { propertyQueryKeys } from '@/lib/properties/query-keys';

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
  confirmDelete: () => void;

  handleSearch: (e: React.FormEvent) => void;
  refetch: () => void;
  setCurrentPage: (page: number) => void;

  formatPrice: (price: number) => string;
}

const emptyFilters: Filters = {
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

export const useMyListings = (): UseMyListingsReturn => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: userInfo, isLoading: userLoading } = useUser();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<PropertyType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'status' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    propertySlug: null as string | null,
    propertyTitle: '',
  });

  const queryParams = useMemo(() => {
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
    if (filters.minArea)
      filter['features.area$gte'] = Number(filters.minArea);
    if (filters.maxArea)
      filter['features.area$lte'] = Number(filters.maxArea);
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

    if (filters.furnished !== null) filter['features.furnished'] = filters.furnished;
    if (filters.petsAllowed !== null) filter['features.petsAllowed'] = filters.petsAllowed;
    if (filters.smokingAllowed !== null) filter['features.smokingAllowed'] = filters.smokingAllowed;
    if (filters.balcony !== null) filter['features.balcony'] = filters.balcony;
    if (filters.garden !== null) filter['features.garden'] = filters.garden;
    if (filters.garage !== null) filter['features.garage'] = filters.garage;
    if (filters.elevator !== null) filter['features.elevator'] = filters.elevator;
    if (filters.airConditioning !== null) filter['features.airConditioning'] = filters.airConditioning;
    if (filters.dishwasher !== null) filter['features.dishwasher'] = filters.dishwasher;
    if (filters.washerDryer !== null) filter['features.washerDryer'] = filters.washerDryer;
    if (filters.internet !== null) filter['features.internet'] = filters.internet;
    if (filters.cable !== null) filter['features.cable'] = filters.cable;

    const query: LandlordPropertyQuery = {
      page: currentPage,
      limit: 10,
      search: searchQuery || undefined,
      filter: Object.keys(filter).length > 0 ? filter : undefined,
    };

    return query;
  }, [currentPage, searchQuery, activeTab, filters]);

  const {
    data: propertiesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: propertyQueryKeys.landlord.list(queryParams as Record<string, unknown>),
    queryFn: () => propertiesLandlordApi.findAll(queryParams),
    enabled: !userLoading && userInfo?.role === 'landlord',
    staleTime: 5 * 60 * 1000,
  });

  const { data: countsData } = useQuery({
    queryKey: propertyQueryKeys.landlord.counts(),
    queryFn: async () => {
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

      return {
        totalCount: allResponse.meta?.totalItems || 0,
        rentCount: rentResponse.meta?.totalItems || 0,
        saleCount: saleResponse.meta?.totalItems || 0,
      };
    },
    enabled: !userLoading && userInfo?.role === 'landlord',
    staleTime: 5 * 60 * 1000,
  });

  const deletePropertyMutation = useMutation({
    mutationFn: (slug: string) => propertiesLandlordApi.remove(slug),
    onMutate: async (slug) => {
      await queryClient.cancelQueries({ queryKey: propertyQueryKeys.landlord.all() });

      const previousQueries = new Map();

      queryClient.getQueriesData({ queryKey: propertyQueryKeys.landlord.lists() }).forEach(([queryKey, data]) => {
        previousQueries.set(queryKey, data);

        if (data && typeof data === 'object' && 'data' in data) {
          const paginatedData = data as { data: PropertyLandlordDto[]; meta?: unknown };
          queryClient.setQueryData(queryKey, {
            ...paginatedData,
            data: paginatedData.data.filter((property) => property.slug !== slug),
          });
        }
      });

      return { previousQueries, deletedSlug: slug };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propertyQueryKeys.landlord.counts() });
      closeDeleteDialog();
    },
    onError: (error, variables, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach((data, queryKey) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: propertyQueryKeys.landlord.all() });
    },
  });

  if (!userLoading && userInfo && userInfo.role !== 'landlord') {
    router.replace('/dashboard');
  }

  const properties = propertiesData?.data || [];
  const totalPages = Math.ceil(
    (propertiesData?.meta?.totalItems || 0) /
      (propertiesData?.meta?.itemsPerPage || 10)
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
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

  const confirmDelete = () => {
    if (deleteDialog.propertySlug) {
      deletePropertyMutation.mutate(deleteDialog.propertySlug);
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
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters(emptyFilters);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: PropertyType | 'all') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return {
    properties: sortProperties(properties),
    isLoading,
    error: error ? 'Failed to load properties. Please try again.' : null,
    totalPages,
    currentPage,
    totalCount: countsData?.totalCount || 0,
    rentCount: countsData?.rentCount || 0,
    saleCount: countsData?.saleCount || 0,

    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab: handleTabChange,
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
    refetch,
    setCurrentPage,

    formatPrice,
  };
};