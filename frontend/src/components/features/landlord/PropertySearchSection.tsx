import React from 'react';
import SearchBar from '@/components/shared/SearchBar';

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
}: PropertySearchSectionProps) => {
  return (
    <div className="flex justify-start">
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onSubmit={handleSearch}
        placeholder="Search properties..."
        className="w-full max-w-md"
        onFiltersClick={() => setShowFilters(true)}
        size="compact"
      />
    </div>
  );
};

export default PropertySearchSection;