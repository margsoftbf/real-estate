import React from 'react';
import { useRouter } from 'next/router';
import { CloseOutline } from '@/assets/icons';

interface ActiveFiltersSectionProps {
  appliedSearchTerm: string;
  filters: Record<string, string | boolean | null>;
  onSearchTermClear: () => void;
  onFilterChange: (key: string, value: string | boolean | null) => void;
  onClearAll: () => void;
  basePath: string;
}

const ActiveFiltersSection = ({
  appliedSearchTerm,
  filters,
  onSearchTermClear,
  onFilterChange,
  onClearAll,
  basePath,
}: ActiveFiltersSectionProps) => {
  const router = useRouter();

  const hasActiveFilters =
    appliedSearchTerm ||
    Object.entries(filters).some(([, value]) => {
      if (typeof value === 'string') return value !== '';
      if (typeof value === 'boolean') return value !== null;
      return value !== null;
    });

  if (!hasActiveFilters) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Active filters:</span>

      {appliedSearchTerm && (
        <div className="flex items-center gap-1 bg-primary-violet text-white px-3 py-1 rounded-full text-sm">
          <span>&quot;{appliedSearchTerm}&quot;</span>
          <button
            onClick={onSearchTermClear}
            className="ml-1 hover:bg-white/20 rounded-full p-0.5 cursor-pointer"
          >
            <CloseOutline className="w-3 h-3" />
          </button>
        </div>
      )}

      {Object.entries(filters).map(([key, value]) => {
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
              {displayKey}: {String(displayValue)}
            </span>
            <button
              onClick={() => {
                const resetValue = typeof value === 'boolean' ? null : '';
                onFilterChange(key, resetValue);
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
          onClearAll();
          router.push(`/${basePath}`, undefined, { shallow: true });
        }}
        className="text-sm text-red-600 hover:text-red-700 font-medium underline cursor-pointer"
      >
        Clear all
      </button>
    </div>
  );
};

export default ActiveFiltersSection;
