import React from 'react';
import Head from 'next/head';
import AppLayout from '@/components/layout/AppLayout';
import { useUser } from '@/hooks/auth/useUser';
import { useMyListings } from '@/hooks/landlord/useMyListings';
import { Filters } from '@/types/landlord/filters';
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
    setFilters,
    handleClearFilters,
    deleteDialog,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
    handleSearch,
    refetch,
    setCurrentPage,
    formatPrice,
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
          onPageChange={setCurrentPage}
          formatPrice={formatPrice}
          onRetry={refetch}
        />

        <FilterModal
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          onApplyFilters={(appliedFilters) => {
            setFilters(appliedFilters as Filters);
            setShowFilters(false);
          }}
          onClearFilters={() => {
            handleClearFilters();
            setShowFilters(false);
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
