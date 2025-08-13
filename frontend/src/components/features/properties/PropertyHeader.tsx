import React from 'react';
import { PropertyPublicDto } from '@/types/properties';

interface PropertyHeaderProps {
  property: PropertyPublicDto;
}

const PropertyHeader = ({ property }: PropertyHeaderProps) => {
  return (
    <div className="mb-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-1 font-jakarta">
        {property.title || 'Property'}
      </h1>
      <p className="text-primary-black/50 text-sm md:text-base">
        {property.city}, {property.country}
      </p>
    </div>
  );
};

export default PropertyHeader;