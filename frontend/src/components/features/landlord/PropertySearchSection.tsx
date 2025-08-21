import React from 'react';
import SearchBar from '@/components/shared/SearchBar';
import { FilterOutline } from '@/assets/icons';

interface PropertySearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  setShowFilters: (show: boolean) => void;
  propertiesCount: number;
}

const PropertySearchSection = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  setShowFilters,
  propertiesCount,
}: PropertySearchSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">
            Properties
          </h2>
          <span className="bg-primary-violet-dark text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
            {propertiesCount}
          </span>
        </div>
        <button
          onClick={() => setShowFilters(true)}
          className="lg:hidden flex items-center gap-2 text-gray-600 hover:text-gray-900 mr-1"
        >
          <FilterOutline className="w-5 h-5 text-primary-violet-dark" />
        </button>
      </div>

      <div>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={handleSearch}
          placeholder="Search..."
          className="w-full"
          onFiltersClick={() => setShowFilters(true)}
          size="compact"
        />
      </div>
    </div>
  );
};

export default PropertySearchSection;