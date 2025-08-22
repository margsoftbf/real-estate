import React from 'react';
import { useRouter } from 'next/router';
import { PropertyLandlordDto } from '@/lib/properties/for-landlord/api';
import PropertyListItem from './PropertyListItem';
import LoadingState from '@/components/shared/LoadingState';
import ErrorState from '@/components/shared/ErrorState';
import EmptyState from '@/components/shared/EmptyState';
import Pagination from '@/components/shared/Pagination';
import Button from '@/components/ui/Button/Button';
import { AddOutline } from '@/assets/icons';

interface PropertyListContainerProps {
  properties: PropertyLandlordDto[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  onDeleteProperty: (slug: string, title: string) => void;
  onPageChange: (page: number, searchQuery: string) => void;
  formatPrice: (price: number) => string;
  getStatusBadge: (property: PropertyLandlordDto) => {
    label: string;
    color: string;
  };
  sortProperties: (properties: PropertyLandlordDto[]) => PropertyLandlordDto[];
  onRetry: () => void;
}

const PropertyListContainer = ({
  properties,
  isLoading,
  error,
  currentPage,
  totalPages,
  searchQuery,
  onDeleteProperty,
  onPageChange,
  formatPrice,
  getStatusBadge,
  sortProperties,
  onRetry,
}: PropertyListContainerProps) => {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <ErrorState error={error} onRetry={onRetry} />
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <EmptyState />
        <div className="text-center mt-4">
          <Button
            onClick={() => router.push('/landlord/my-listings/create')}
            className="inline-flex items-center gap-2"
          >
            <AddOutline className="w-4 h-4" />
            Add Property
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="divide-y divide-gray-100">
          {sortProperties(properties).map((property) => (
            <PropertyListItem
              key={property.slug}
              property={property}
              onDelete={onDeleteProperty}
              formatPrice={formatPrice}
              getStatusBadge={getStatusBadge}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 md:mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => onPageChange(page, searchQuery)}
        />
      </div>
    </>
  );
};

export default PropertyListContainer;