import React from 'react';
import { useMyListings } from '@/hooks/landlord/useMyListings';
import LoadingState from '@/components/shared/LoadingState';
import { PropertyType } from '@/types/properties/public-types';
import { StatCard } from './StatCard';
import { QuickActions } from './QuickActions';
import { RecentProperties } from './RecentProperties';
import { PropertyPerformance } from './PropertyPerformance';
import { QuickTips } from './QuickTips';


export const DashboardContent = () => {
  const { totalCount, rentCount, saleCount, properties, isLoading } =
    useMyListings();

  const safeProperties = properties || [];
  const activeProperties = safeProperties.filter((p) => p.isActive === true).length;
  const activeRentals = safeProperties.filter((p) => p.type === PropertyType.RENT && p.isActive === true && p.price && !isNaN(Number(p.price)) && Number(p.price) > 0);
  const averageRentPrice = activeRentals.length > 0 
    ? Math.round(activeRentals.reduce((sum, p) => sum + Number(p.price), 0) / activeRentals.length)
    : 2500;

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Properties" 
          value={totalCount} 
          subtitle={`${activeProperties} active`}
          className="text-gray-900"
        />
        <StatCard 
          title="Average Rent Price" 
          value={`$${averageRentPrice.toLocaleString()}`} 
          subtitle={`From ${activeRentals.length} active rentals`}
          className="text-green-600"
        />
        <StatCard 
          title="For Rent" 
          value={rentCount} 
          subtitle={`${saleCount} for sale`}
          className="text-purple-600"
        />
        <StatCard 
          title="Active Properties" 
          value={`${Math.round((activeProperties / (totalCount || 1)) * 100)}%`} 
          subtitle={`${activeProperties} of ${totalCount} properties`}
          className="text-orange-600"
        />
      </div>

      <QuickActions />

      <RecentProperties properties={safeProperties} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PropertyPerformance 
          properties={safeProperties} 
          activeProperties={activeProperties} 
          totalCount={totalCount} 
        />
        <QuickTips />
      </div>
    </div>
  );
};

export default DashboardContent;
