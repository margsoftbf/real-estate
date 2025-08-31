import React from 'react';
import SearchBar from '@/components/shared/SearchBar';
import { FilterOutline } from '@/assets/icons';
import Button from '@/components/ui/Button/Button';

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
    <div className="flex gap-4 items-center">
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onSubmit={handleSearch}
        placeholder="Search properties..."
        className="flex-1 max-w-full lg:max-w-lg"
        onFiltersClick={() => setShowFilters(true)}
        size="compact"
      />
      <Button
        variant="white"
        size="sm"
        onClick={() => setShowFilters(true)}
        className="flex items-center gap-2 shrink-0 px-3 lg:hidden h-10"
      >
        <FilterOutline className="w-7 h-7 text-primary-violet-dark" />
        <span>Filters</span>
      </Button>
    </div>
  );
};

export default PropertySearchSection;
