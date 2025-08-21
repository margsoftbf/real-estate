import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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

const RentPage = () => {
  const router = useRouter();
  const {
    state,
    isLoading,
    error,
    optimisticProperties,
    dispatch,
    loadPropertiesWithParams,
  } = useRent();

  useEffect(() => {
    if (router.isReady) {
      if (router.query.city && typeof router.query.city === 'string') {
        dispatch({
          type: 'SET_SEARCH_TERM',
          payload: router.query.city,
        });
        dispatch({
          type: 'APPLY_SEARCH',
          payload: router.query.city,
        });
      } else {
        loadPropertiesWithParams(1);
      }
    }
  }, [router.isReady, router.asPath]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'APPLY_SEARCH', payload: state.searchTerm });
    dispatch({ type: 'SET_PAGE', payload: 1 });

    if (state.searchTerm.trim()) {
      router.push(
        `/rent?city=${encodeURIComponent(state.searchTerm.trim())}`,
        undefined,
        { shallow: true }
      );
    } else {
      router.push('/rent', undefined, { shallow: true });
    }
  };

  const handleFilterChange = (key: string, value: string | boolean | null) => {
    dispatch({ type: 'SET_FILTER', payload: { key, value } });
  };

  const handleApplyFilters = () => {
    dispatch({ type: 'SET_PAGE', payload: 1 });
    loadPropertiesWithParams(1);
  };

  const handleClearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
    dispatch({ type: 'SET_PAGE', payload: 1 });
    loadPropertiesWithParams(1);
  };

  const handlePageChange = (page: number) => {
    dispatch({ type: 'SET_PAGE', payload: page });
    loadPropertiesWithParams(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PublicLayout>
      <Head>
        <title>Properties for Rent | Property Manager</title>
        <meta name="description" content="Find your perfect rental property" />
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
          searchTerm={state.searchTerm}
          onSearchTermChange={(value) =>
            dispatch({ type: 'SET_SEARCH_TERM', payload: value })
          }
          onSubmit={handleSearch}
          onFiltersClick={() =>
            dispatch({ type: 'SET_FILTER_MODAL_OPEN', payload: true })
          }
        />

        <ActiveFiltersSection
          appliedSearchTerm={state.appliedSearchTerm}
          filters={state.filters}
          onSearchTermClear={() => {
            dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
            dispatch({ type: 'APPLY_SEARCH', payload: '' });
            dispatch({ type: 'SET_PAGE', payload: 1 });
          }}
          onFilterChange={(key, value) => {
            handleFilterChange(key, value);
            dispatch({ type: 'SET_PAGE', payload: 1 });
          }}
          onClearAll={() => {
            dispatch({ type: 'CLEAR_FILTERS' });
            dispatch({ type: 'SET_PAGE', payload: 1 });
          }}
          basePath="rent"
        />

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState
            error={error}
            onRetry={() => loadPropertiesWithParams()}
          />
        ) : optimisticProperties.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {optimisticProperties.map((property) => (
                <PropertyCard key={property.slug} property={property} />
              ))}
            </div>
            <Pagination
              currentPage={state.currentPage}
              totalPages={state.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      <FilterModal
        isOpen={state.isFilterModalOpen}
        onClose={() =>
          dispatch({ type: 'SET_FILTER_MODAL_OPEN', payload: false })
        }
        filters={state.filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
    </PublicLayout>
  );
};

export default RentPage;
