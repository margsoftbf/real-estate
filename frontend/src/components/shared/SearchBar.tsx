import React from 'react';
import { SearchOutline, FilterOutline } from '@/assets/icons';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
  className?: string;
  onFiltersClick?: () => void;
}

const SearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search location',
  className = '',
  onFiltersClick,
}: SearchBarProps) => {
  return (
    <form onSubmit={onSubmit} className={`relative ${className}`}>
      <div className="relative">
        <div className="lg:hidden">
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pr-14 py-3 px-4 bg-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-300 focus:border-transparent text-gray-900 placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-violet w-10 h-10 flex items-center justify-center rounded-md hover:brightness-120 transition-all"
          >
            <SearchOutline className="w-4 h-4" color="white" />
          </button>
        </div>

        <div className="hidden lg:flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden px-2 gap-1">
          <div className="flex-1 px-4 py-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm bg-transparent border-0 p-0"
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
            className="flex items-center gap-2 bg-primary-violet text-white px-4 py-3 h-full hover:brightness-110 transition-all rounded-lg cursor-pointer"
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
