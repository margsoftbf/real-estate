import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/hooks/auth/useUser';
import { propertiesLandlordApi } from '@/lib/properties/for-landlord/api';
import type { PropertyLandlordDto } from '@/lib/properties/for-landlord/api';
import { PropertyType } from '@/types/properties/public-types';
import { propertyQueryKeys } from '@/lib/properties/query-keys';
import { Filters, emptyFilters } from '@/types/landlord/filters';
import { usePropertyFilters } from './usePropertyFilters';
import { usePropertySorting } from './usePropertySorting';
import { useDeleteDialog } from './useDeleteDialog';

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

export const useMyListings = (): UseMyListingsReturn => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: userInfo, isLoading: userLoading } = useUser();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<PropertyType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'status' | 'date'>(
    'date'
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>(emptyFilters);

  const { deleteDialog, openDeleteDialog, closeDeleteDialog } =
    useDeleteDialog();

  const queryParams = usePropertyFilters(
    filters,
    activeTab,
    currentPage,
    searchQuery
  );

  const {
    data: propertiesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: propertyQueryKeys.landlord.list(
      queryParams as Record<string, unknown>
    ),
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
      await queryClient.cancelQueries({
        queryKey: propertyQueryKeys.landlord.all(),
      });

      const previousQueries = new Map();

      queryClient
        .getQueriesData({ queryKey: propertyQueryKeys.landlord.lists() })
        .forEach(([queryKey, data]) => {
          previousQueries.set(queryKey, data);

          if (data && typeof data === 'object' && 'data' in data) {
            const paginatedData = data as {
              data: PropertyLandlordDto[];
              meta?: unknown;
            };
            queryClient.setQueryData(queryKey, {
              ...paginatedData,
              data: paginatedData.data.filter(
                (property) => property.slug !== slug
              ),
            });
          }
        });

      return { previousQueries, deletedSlug: slug };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: propertyQueryKeys.landlord.counts(),
      });
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
      queryClient.invalidateQueries({
        queryKey: propertyQueryKeys.landlord.all(),
      });
    },
  });

  if (!userLoading && userInfo && userInfo.role !== 'landlord') {
    router.replace('/dashboard');
  }

  const rawProperties = propertiesData?.data || [];
  const properties = usePropertySorting(rawProperties, sortBy, sortOrder);
  const totalPages = Math.ceil(
    (propertiesData?.meta?.totalItems || 0) /
      (propertiesData?.meta?.itemsPerPage || 10)
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
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
    properties,
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
