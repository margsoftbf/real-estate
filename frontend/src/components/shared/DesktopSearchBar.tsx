import React, { useState, useRef, useEffect } from 'react';
import {
  SearchOutline,
  ChevronDownOutline,
  FilterOutline,
} from '@/assets/icons';

interface Filters {
  minPrice: string;
  maxPrice: string;
  city: string;
  homeType: string;
}

interface DesktopSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  filters: Filters;
  onFilterChange: (key: string, value: string) => void;
  onOpenModal: () => void;
  className?: string;
}

const DesktopSearchBar = ({
  searchTerm,
  onSearchChange,
  onSubmit,
  filters,
  onFilterChange,
  onOpenModal,
  className = '',
}: DesktopSearchBarProps) => {
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const priceDropdownRef = useRef<HTMLDivElement>(null);

  const homeTypeOptions = [
    { value: '', label: 'Any Type' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'studio', label: 'Studio' },
  ];

  const formatPriceRange = () => {
    if (!filters.minPrice && !filters.maxPrice) return 'Price Range';
    if (filters.minPrice && filters.maxPrice)
      return `$${filters.minPrice} - $${filters.maxPrice}`;
    if (filters.minPrice) return `From $${filters.minPrice}`;
    if (filters.maxPrice) return `Up to $${filters.maxPrice}`;
    return 'Price Range';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        priceDropdownRef.current &&
        !priceDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPriceDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-end gap-3">
          <form
            onSubmit={onSubmit}
            className="flex flex-wrap lg:flex-nowrap gap-3 items-end flex-1"
          >
            {/* Location Input */}
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="Search location"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full py-2.5 px-3 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-300 focus:border-transparent text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Price Range Dropdown */}
            <div className="flex-shrink-0 relative" ref={priceDropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <button
                type="button"
                onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
                className="flex items-center justify-between gap-2 py-2.5 px-3 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-1 focus:ring-purple-300 focus:border-transparent text-gray-900 min-w-[140px]"
              >
                <span className="text-sm">{formatPriceRange()}</span>
                <ChevronDownOutline
                  className={`w-4 h-4 text-gray-400 transition-transform ${isPriceDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isPriceDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 p-3 min-w-[200px]">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Min Price
                      </label>
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) =>
                          onFilterChange('minPrice', e.target.value)
                        }
                        className="w-full py-2 px-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-purple-300 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Max Price
                      </label>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) =>
                          onFilterChange('maxPrice', e.target.value)
                        }
                        className="w-full py-2 px-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-purple-300 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Property Type Select */}
            <div className="flex-shrink-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                value={filters.homeType}
                onChange={(e) => onFilterChange('homeType', e.target.value)}
                className="py-2.5 px-3 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-300 focus:border-transparent text-gray-900 min-w-[120px]"
              >
                {homeTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex-shrink-0">
              <label className="block text-sm font-medium text-gray-700 mb-1 opacity-0">
                Search
              </label>
              <button
                type="submit"
                className="flex items-center gap-2 bg-primary-violet text-white py-2.5 px-4 rounded-md hover:brightness-110 transition-all focus:ring-2 focus:ring-purple-300 focus:ring-offset-2"
              >
                <SearchOutline className="w-4 h-4" color="white" />
                <span className="hidden lg:block text-sm font-medium">
                  Search
                </span>
              </button>
            </div>
          </form>

          {/* Filters Button - Outside the form, on the right */}
          <div className="flex-shrink-0">
            <label className="block text-sm font-medium text-gray-700 mb-1 opacity-0">
              Filters
            </label>
            <button
              type="button"
              onClick={onOpenModal}
              className="flex items-center gap-2 py-2.5 px-3 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-1 focus:ring-purple-300 focus:border-transparent text-gray-700 transition-colors"
            >
              <FilterOutline className="w-5 h-5 text-primary-violet-dark" />
              <span className="text-sm">Filters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopSearchBar;
