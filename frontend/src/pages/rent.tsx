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
import { useRent } from '@/hooks/properties';
import PropertySearchSection from '@/components/shared/Property/PropertySearchSection';
import { PropertyFilters } from '@/lib/properties/api';

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
const convertFromModalFilters = (
  modalFilters: Record<string, string | boolean | null>
): PropertyFilters => {
  const filters: PropertyFilters = {};

  Object.entries(modalFilters).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      if (key.startsWith('min') || key.startsWith('max')) {
        const numValue = typeof value === 'string' ? Number(value) : value;
        if (!isNaN(Number(numValue))) {
          (filters as Record<string, number>)[key] = Number(numValue);
        }
      } else if (typeof value === 'boolean') {
        (filters as Record<string, boolean>)[key] = value;
      } else if (typeof value === 'string' && value !== '') {
        (filters as Record<string, string>)[key] = value;
      }
    }
  });

  return filters;
};

const RentPage = () => {
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
  } = useRent();

  const [searchInput, setSearchInput] = React.useState(currentSearch);
  const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);
  const [modalFilters, setModalFilters] = React.useState(
    convertToModalFilters(currentFilters)
  );

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  const handleOpenFilterModal = () => {
    setModalFilters(convertToModalFilters(currentFilters));
    setIsFilterModalOpen(true);
  };

  const handleApplyFilters = (
    appliedFilters: Record<string, string | boolean | null>
  ) => {
    const convertedFilters = convertFromModalFilters(appliedFilters);
    setFilters(convertedFilters);
    setIsFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    clearFilters();
    setIsFilterModalOpen(false);
  };

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
        <title>
          Properties for Rent | Rental Apartments & Houses | RentSmart
        </title>
        <meta
          name="description"
          content="Find rental properties including apartments, houses, and condos. Advanced search with filters for price, location, amenities. Virtual tours and detailed listings available."
        />
        <meta
          name="keywords"
          content="properties for rent, rental apartments, rent house, apartment rentals, rental search, property rentals"
        />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden">
        <div className="mb-6">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Rent' }]}
          />
        </div>
        <div className="mb-4">
          <h1 className="text-h3 text-primary-black text-center lg:text-h2 lg:text-left mb-6">
            Search properties to rent
          </h1>
        </div>

        <PropertySearchSection
          searchTerm={searchInput}
          onSearchTermChange={setSearchInput}
          onSubmit={handleSearch}
          onFiltersClick={handleOpenFilterModal}
        />

        <ActiveFiltersSection
          appliedSearchTerm={currentSearch}
          filters={currentFilters as Record<string, string | boolean | null>}
          onSearchTermClear={() => setSearch('')}
          onFilterChange={(key, value) => {
            const updatedFilters: Record<
              string,
              string | number | boolean | null | undefined
            > = { ...currentFilters };
            if (value === '' || value === null) {
              delete updatedFilters[key];
            } else {
              updatedFilters[key] = value;
            }
            setFilters(updatedFilters as PropertyFilters);
          }}
          onClearAll={clearFilters}
          basePath="rent"
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
        filters={modalFilters}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
    </PublicLayout>
  );
};

export default RentPage;
