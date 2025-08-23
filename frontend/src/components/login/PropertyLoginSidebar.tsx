import React, { useEffect, useState } from 'react';
import PropertyCard from '../shared/Property/PropertyCard';
import { PropertyPublicDto } from '@/types/properties';
import { propertiesApi } from '@/lib/properties/api';

const PropertyLoginSidebar = () => {
  const [randomProperty, setRandomProperty] =
    useState<PropertyPublicDto | null>(null);

  useEffect(() => {
    const fetchRandomProperty = async () => {
      try {
        const response = await propertiesApi.findAll({
          limit: 1,
          page: Math.floor(Math.random() * 3) + 1,
        });
        if (response.data.length > 0) {
          setRandomProperty(response.data[0]);
        }
      } catch {
        // Error handled by empty state
      }
    };

    fetchRandomProperty();
  }, []);

  return (
    <div className="hidden lg:block w-1/2 bg-purple-50 p-12 rounded-md">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="max-w-sm">
          {randomProperty ? (
            <PropertyCard property={randomProperty} />
          ) : (
            <div className="w-full h-80 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
              <span className="text-gray-500">Loading property...</span>
            </div>
          )}
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>Powered by RentSmart</p>
            <p className="mt-2">
              You agree to RentSmart&apos;s Terms of Use &amp; Privacy Policy.
              You don&apos;t need to consent as a condition of renting any
              property, or buying any other goods or services. Message/data
              rates may apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyLoginSidebar;
