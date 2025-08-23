import React from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/ui/Button/Button';
import { AddOutline } from '@/assets/icons';

interface PropertyListHeaderProps {
  propertiesCount: number;
}

const PropertyListHeader = ({ propertiesCount }: PropertyListHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          My Listings
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Manage your property listings ({propertiesCount} {propertiesCount === 1 ? 'property' : 'properties'})
        </p>
      </div>
      <Button
        onClick={() => router.push('/landlord/add-listing')}
        className="flex items-center justify-center gap-2 w-full sm:w-auto"
      >
        <AddOutline className="w-4 h-4" />
        Add New Property
      </Button>
    </div>
  );
};

export default PropertyListHeader;