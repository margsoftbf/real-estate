import React from 'react';
import Head from 'next/head';
import AppLayout from '@/components/layout/AppLayout';
import { useUser } from '@/hooks/auth/useUser';
import { useMyListings } from '@/hooks/landlord/useMyListings';
import LoadingState from '@/components/shared/LoadingState';
import FilterModal from '@/components/shared/FilterModal';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import PropertyListHeader from '@/components/features/landlord/PropertyListHeader';
import PropertySearchSection from '@/components/features/landlord/PropertySearchSection';
import PropertyTypeTabs from '@/components/features/landlord/PropertyTypeTabs';
import PropertyListContainer from '@/components/features/landlord/PropertyListContainer';

const MyListingsPage = () => {
  const { data: userInfo, isLoading: userLoading } = useUser();
  const {
    properties,
    isLoading,
    error,
    totalPages,
    currentPage,
    totalCount,
    rentCount,
    saleCount,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    showFilters,
    setShowFilters,
    filters,
    handleFilterChange,
    handleClearFilters,
    deleteDialog,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
    handleSearch,
    fetchProperties,
    formatPrice,
    getStatusBadge,
    sortProperties,
  } = useMyListings();

  if (userLoading) {
    return <LoadingState />;
  }

  if (!userInfo || userInfo.role !== 'landlord') {
    return null;
  }

  return (
    <AppLayout userRole={userInfo.role} userInfo={userInfo}>
      <Head>
        <title>My Listings | Property Manager</title>
      </Head>

      <div className="p-4 md:p-0 space-y-4 md:space-y-6">
        <PropertyListHeader propertiesCount={totalCount} />

        <PropertySearchSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          setShowFilters={setShowFilters}
          propertiesCount={properties.length}
        />

        <PropertyTypeTabs
          totalCount={totalCount}
          rentCount={rentCount}
          saleCount={saleCount}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <PropertyListContainer
          properties={properties}
          isLoading={isLoading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          searchQuery={searchQuery}
          onDeleteProperty={openDeleteDialog}
          onPageChange={(page) => fetchProperties(page, searchQuery, activeTab, filters)}
          formatPrice={formatPrice}
          getStatusBadge={getStatusBadge}
          sortProperties={sortProperties}
          onRetry={() => fetchProperties(currentPage, searchQuery, activeTab, filters)}
        />

        <FilterModal
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onApplyFilters={() => {
            fetchProperties(1, searchQuery, activeTab, filters);
            setShowFilters(false);
          }}
          onClearFilters={() => {
            handleClearFilters();
            fetchProperties(1, searchQuery, activeTab, {
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
            });
          }}
        />

        <ConfirmDialog
          isOpen={deleteDialog.isOpen}
          onClose={closeDeleteDialog}
          onConfirm={confirmDelete}
          title="Delete Property"
          message={`Are you sure you want to remove "${deleteDialog.propertyTitle}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </AppLayout>
  );
};

export default MyListingsPage;
