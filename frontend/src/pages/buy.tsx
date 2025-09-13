import React, { useEffect } from 'react';
import Head from 'next/head';
import PublicLayout from '@/components/layout/PublicLayout';
import PropertyCard from '@/components/shared/Property/PropertyCard';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import FilterModal from '@/components/shared/FilterModal';
import Pagination from '@/components/shared/Pagination';
import ActiveFiltersSection from '@/components/shared/ActiveFiltersSection';
import LoadingState from '@/components/shared/LoadingState';
import ErrorState from '@/components/shared/ErrorState';
import EmptyState from '@/components/shared/EmptyState';
import { useBuy } from '@/hooks/properties';
import PropertySearchSection from '@/components/shared/Property/PropertySearchSection';
import { PropertyFilters } from '@/lib/properties/api';

// Convert PropertyFilters to FilterModal format
const convertToModalFilters = (filters: PropertyFilters) => ({
  minPrice: filters.minPrice?.toString() || '',
  maxPrice: filters.maxPrice?.toString() || '',
  city: filters.city || '',
  minBedrooms: filters.minBedrooms?.toString() || '',
  maxBedrooms: filters.maxBedrooms?.toString() || '',
  minBathrooms: filters.minBathrooms?.toString() || '',
  maxBathrooms: filters.maxBathrooms?.toString() || '',
  minArea: filters.minArea?.toString() || '',
  maxArea: filters.maxArea?.toString() || '',
  minParkingSpaces: filters.minParkingSpaces?.toString() || '',
  maxParkingSpaces: filters.maxParkingSpaces?.toString() || '',
  minYearBuilt: filters.minYearBuilt?.toString() || '',
  maxYearBuilt: filters.maxYearBuilt?.toString() || '',
  homeType: filters.homeType || '',
  laundry: filters.laundry || '',
  heating: filters.heating || '',
  furnished: filters.furnished ?? null,
  petsAllowed: filters.petsAllowed ?? null,
  smokingAllowed: filters.smokingAllowed ?? null,
  balcony: filters.balcony ?? null,
  garden: filters.garden ?? null,
  garage: filters.garage ?? null,
  elevator: filters.elevator ?? null,
  airConditioning: filters.airConditioning ?? null,
  dishwasher: filters.dishwasher ?? null,
  washerDryer: filters.washerDryer ?? null,
  internet: filters.internet ?? null,
  cable: filters.cable ?? null,
});

// Convert FilterModal format back to PropertyFilters
const convertFromModalFilters = (modalFilters: Record<string, string | boolean | null>): PropertyFilters => {
  const filters: PropertyFilters = {};
  
  Object.entries(modalFilters).forEach(([key, value]) => {
    if (value !== '' && value !== null) {
      if (key.startsWith('min') || key.startsWith('max')) {
        filters[key] = typeof value === 'string' ? Number(value) : undefined;
      } else if (typeof value === 'boolean') {
        filters[key] = value;
      } else {
        filters[key] = value;
      }
    }
  });
  
  return filters;
};

const BuyPage = () => {
  const {
    properties,
    isLoading,
    error,
    totalPages,
    currentPage,
    currentSearch,
    currentFilters,
    setSearch,
    setFilters,
    setPage,
    clearFilters,
  } = useBuy();

  const [searchInput, setSearchInput] = React.useState(currentSearch);
  const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PublicLayout>
      <Head>
        <title>Properties for Sale | Buy Houses & Apartments | RentSmart</title>
        <meta
          name="description"
          content="Browse properties for sale. Find houses, apartments, and condos. Advanced search filters, virtual tours, and detailed property information. Start your home buying journey today."
        />
        <meta
          name="keywords"
          content="properties for sale, buy house, buy apartment, homes for sale, real estate purchase, property search"
        />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden">
        <div className="mb-6">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Buy' }]}
          />
        </div>
        <div className="mb-4">
          <h1 className="text-h3 text-primary-black text-center lg:text-h2 lg:text-left mb-6">
            Search properties to buy
          </h1>
        </div>

        <PropertySearchSection
          searchTerm={searchInput}
          onSearchTermChange={setSearchInput}
          onSubmit={handleSearch}
          onFiltersClick={() => setIsFilterModalOpen(true)}
        />

        <ActiveFiltersSection
          appliedSearchTerm={currentSearch}
          filters={currentFilters as Record<string, string | boolean | null>}
          onSearchTermClear={() => setSearch('')}
          onFilterChange={(key, value) => {
            setFilters({ ...currentFilters, [key]: value });
          }}
          onClearAll={clearFilters}
          basePath="buy"
        />

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState
            error={error.message || 'Failed to load properties'}
            onRetry={() => window.location.reload()}
          />
        ) : properties.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {properties.map((property) => (
                <PropertyCard key={property.slug} property={property} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={convertToModalFilters(currentFilters)}
        onFilterChange={(key, value) => {
          const updatedModalFilters = { ...convertToModalFilters(currentFilters), [key]: value };
          setFilters(convertFromModalFilters(updatedModalFilters));
        }}
        onApplyFilters={() => setIsFilterModalOpen(false)}
        onClearFilters={clearFilters}
      />
    </PublicLayout>
  );
};

export default BuyPage;
