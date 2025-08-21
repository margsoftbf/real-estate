import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks/auth/useUser';
import { propertiesLandlordApi } from '@/lib/properties/for-landlord/api';
import type {
  PropertyLandlordDto,
  LandlordPropertyQuery,
} from '@/lib/properties/for-landlord/api';

interface UseMyListingsReturn {
  properties: PropertyLandlordDto[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'name' | 'price' | 'status' | 'date';
  setSortBy: (sort: 'name' | 'price' | 'status' | 'date') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;

  deleteDialog: {
    isOpen: boolean;
    propertySlug: string | null;
    propertyTitle: string;
  };
  openDeleteDialog: (slug: string, title: string) => void;
  closeDeleteDialog: () => void;
  confirmDelete: () => Promise<void>;

  handleSearch: (e: React.FormEvent) => void;
  fetchProperties: (page?: number, search?: string) => Promise<void>;

  formatPrice: (price: number) => string;
  getStatusBadge: (property: PropertyLandlordDto) => {
    label: string;
    color: string;
  };
  sortProperties: (properties: PropertyLandlordDto[]) => PropertyLandlordDto[];
}

export const useMyListings = (): UseMyListingsReturn => {
  const router = useRouter();
  const { data: userInfo, isLoading: userLoading } = useUser();

  const [properties, setProperties] = useState<PropertyLandlordDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'status' | 'date'>(
    'date'
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
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

  const fetchProperties = useCallback(async (page = 1, search = '') => {
    try {
      setIsLoading(true);
      setError(null);

      const query: LandlordPropertyQuery = {
        page,
        limit: 10,
        search: search || undefined,
      };

      const response = await propertiesLandlordApi.findAll(query);
      setProperties(response.data);
      setTotalPages(
        Math.ceil(
          (response.meta?.totalItems || 0) / (response.meta?.itemsPerPage || 10)
        )
      );
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load properties. Please try again.');
      console.error('Error fetching properties:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userInfo?.role === 'landlord') {
      fetchProperties(1, '');
    }
  }, [userInfo, fetchProperties]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProperties(1, searchQuery);
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
      await fetchProperties(currentPage, searchQuery);
      closeDeleteDialog();
    } catch (err) {
      setError('Failed to delete property. Please try again.');
      console.error('Error deleting property:', err);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (property: PropertyLandlordDto) => {
    if (!property.isActive) {
      return { label: 'MAINTENANCE', color: 'bg-red-100 text-red-700' };
    }

    const statuses = ['OCCUPIED', 'VACANT', 'REQUEST'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    switch (randomStatus) {
      case 'OCCUPIED':
        return { label: 'OCCUPIED', color: 'bg-green-100 text-green-700' };
      case 'VACANT':
        return { label: 'VACANT', color: 'bg-purple-100 text-purple-700' };
      case 'REQUEST':
        return { label: 'REQUEST', color: 'bg-orange-100 text-orange-700' };
      default:
        return { label: 'VACANT', color: 'bg-purple-100 text-purple-700' };
    }
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

  return {
    properties,
    isLoading,
    error,
    totalPages,
    currentPage,

    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    showFilters,
    setShowFilters,

    deleteDialog,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,

    handleSearch,
    fetchProperties,

    formatPrice,
    getStatusBadge,
    sortProperties,
  };
};
