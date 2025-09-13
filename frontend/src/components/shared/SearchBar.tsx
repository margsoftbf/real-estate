import React from 'react';
import { SearchOutline, FilterOutline } from '@/assets/icons';
import CitySearch from '@/components/shared/CitySearch';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
  className?: string;
  onFiltersClick?: () => void;
  size?: 'default' | 'compact';
}

const SearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search location',
  className = '',
  onFiltersClick,
  size = 'default',
}: SearchBarProps) => {
  const isCompact = size === 'compact';

  return (
    <form onSubmit={onSubmit} className={`relative ${className}`}>
      <div className="relative overflow-visible">
        <div className="lg:hidden relative">
          <CitySearch
            value={value}
            onChange={(city) => onChange(city)}
            placeholder={placeholder}
            inputClassName={`w-full pr-12 bg-white border border-purple-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-primary-violet focus:border-primary-violet focus:bg-white text-gray-900 placeholder:text-gray-600 ${
              isCompact ? 'py-2 px-3 text-sm' : 'py-3 px-4'
            }`}
            showSearchIcon={false}
          />
          <button
            type="submit"
            className={`absolute right-1 top-1/2 transform -translate-y-1/2 bg-primary-violet-dark flex items-center justify-center rounded-md hover:brightness-120 transition-all ${
              isCompact ? 'w-8 h-8' : 'w-10 h-10'
            }`}
            aria-label="Search properties"
          >
            <SearchOutline
              className={isCompact ? 'w-3 h-3' : 'w-4 h-4'}
              color="white"
            />
          </button>
        </div>

        <div className="hidden lg:flex items-center bg-white border border-purple-300 rounded-lg px-2 gap-1 focus-within:ring-1 focus-within:ring-primary-violet focus-within:border-primary-violet focus-within:bg-white transition-colors">
          <div className="flex-1 px-4 py-3 relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Location
            </label>
            <CitySearch
              value={value}
              onChange={(city) => onChange(city)}
              placeholder={placeholder}
              inputClassName="w-full text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm bg-transparent border-0 p-0"
              showSearchIcon={false}
            />
          </div>
          {onFiltersClick && (
            <button
              type="button"
              onClick={onFiltersClick}
              className="flex items-center gap-2 px-4 py-3 h-full border-l border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <FilterOutline className="w-5 h-5 text-primary-violet-dark" />
              <span className="text-sm font-medium text-gray-700">Filters</span>
            </button>
          )}
          <button
            type="submit"
            className="flex items-center gap-2 bg-primary-violet-dark text-white px-4 py-3 h-full hover:brightness-110 transition-all rounded-lg cursor-pointer"
          >
            <SearchOutline className="w-4 h-4" color="white" />
            <span className="text-sm font-medium">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
