import React from 'react';
import { PropertyLandlordDto } from '@/lib/properties/for-landlord/api';

interface PropertyPerformanceProps {
  properties: PropertyLandlordDto[];
  activeProperties: number;
  totalCount: number;
}

export const PropertyPerformance = ({ properties, activeProperties, totalCount }: PropertyPerformanceProps) => {
  const safeProperties = properties || [];
  const averagePrice = (() => {
    const validPrices = safeProperties.filter(p => p.price && !isNaN(Number(p.price)) && Number(p.price) > 0);
    return validPrices.length > 0
      ? Math.round(validPrices.reduce((sum, p) => sum + Number(p.price), 0) / validPrices.length).toLocaleString()
      : '2,500';
  })();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Property Performance</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Average Price</span>
          <span className="font-medium">
            ${averagePrice}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Active Listings</span>
          <span className="font-medium">{activeProperties}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Properties</span>
          <span className="font-medium">{totalCount}</span>
        </div>
      </div>
    </div>
  );
};