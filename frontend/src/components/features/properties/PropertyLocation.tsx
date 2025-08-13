import React from 'react';
import Image from 'next/image';
import { PropertyPublicDto } from '@/types/properties';
import mapImage from '@/assets/hero-map.png';

interface PropertyLocationProps {
  property: PropertyPublicDto;
}

const PropertyLocation = ({ property }: PropertyLocationProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Location
      </h2>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="relative h-48 rounded-lg overflow-hidden mb-3">
          <Image
            src={mapImage}
            alt="Property location map"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-primary-violet rounded-full border-4 border-white shadow-lg"></div>
          </div>
        </div>
        <p className="text-gray-700 font-medium">
          {property.city}, {property.country}
        </p>
        <button className="mt-2 text-primary-violet font-medium hover:text-primary-violet-dark">
          View larger map
        </button>
      </div>
    </div>
  );
};

export default PropertyLocation;