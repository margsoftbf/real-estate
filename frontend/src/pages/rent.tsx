import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PublicLayout from '@/components/layout/PublicLayout';
import PropertyCard from '@/components/shared/PropertyCard';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import FilterModal from '@/components/shared/FilterModal';
import Pagination from '@/components/shared/Pagination';
import { CloseOutline } from '@/assets/icons';
import { useRent } from '@/hooks/properties';
import PropertySearchSection from '@/components/shared/PropertySearchSection';

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
  };

  const handleClearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
    dispatch({ type: 'SET_PAGE', payload: 1 });
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

        {(state.appliedSearchTerm ||
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          Object.entries(state.filters).some(([key, value]) => {
            if (typeof value === 'string') return value !== '';
            if (typeof value === 'boolean') return value !== null;
            return value !== null;
          })) && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Active filters:
            </span>

            {state.appliedSearchTerm && (
              <div className="flex items-center gap-1 bg-primary-violet text-white px-3 py-1 rounded-full text-sm">
                <span>&quot;{state.appliedSearchTerm}&quot;</span>
                <button
                  onClick={() => {
                    dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
                    dispatch({ type: 'APPLY_SEARCH', payload: '' });
                    dispatch({ type: 'SET_PAGE', payload: 1 });
                  }}
                  className="ml-1 hover:bg-white/20 rounded-full p-0.5 cursor-pointer"
                >
                  <CloseOutline className="w-3 h-3" />
                </button>
              </div>
            )}

            {Object.entries(state.filters).map(([key, value]) => {
              if (typeof value === 'string' && value === '') return null;
              if (value === null) return null;

              let displayValue = value;
              if (typeof value === 'boolean') {
                displayValue = value ? 'Yes' : 'No';
              }

              const displayKey = key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())
                .replace(
                  /min |max /,
                  (match) => match.charAt(0).toUpperCase() + match.slice(1)
                );

              return (
                <div
                  key={key}
                  className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  <span>
                    {displayKey}: {displayValue}
                  </span>
                  <button
                    onClick={() => {
                      const resetValue = typeof value === 'boolean' ? null : '';
                      handleFilterChange(key, resetValue);
                      dispatch({ type: 'SET_PAGE', payload: 1 });
                    }}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
                  >
                    <CloseOutline className="w-3 h-3" />
                  </button>
                </div>
              );
            })}

            <button
              onClick={() => {
                dispatch({ type: 'CLEAR_FILTERS' });
                dispatch({ type: 'SET_PAGE', payload: 1 });
                router.push('/rent', undefined, { shallow: true });
              }}
              className="text-sm text-red-600 hover:text-red-700 font-medium underline cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-violet"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => loadPropertiesWithParams()}
              className="px-4 py-2 bg-primary-violet text-white rounded-lg hover:bg-primary-violet-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : optimisticProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              No properties found matching your criteria.
            </p>
            <p className="text-sm text-gray-500">
              Try adjusting your search or filters.
            </p>
          </div>
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
