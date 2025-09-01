import React from 'react';
import CitySearch from '@/components/shared/CitySearch';

interface EditableCitySearchProps {
  fieldName: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange: (city: string, coordinates?: { lat: number; lng: number }) => void;
  error?: string;
  required?: boolean;
}

const EditableCitySearch = ({
  fieldName,
  label,
  placeholder = "Search for a city...",
  value = '',
  onChange,
  error,
  required = false,
}: EditableCitySearchProps) => {
  const inputClassName = `mt-1 block w-full px-4 py-3 border bg-white font-medium rounded-md placeholder-primary-black/50 focus:ring-1 focus:outline-none text-body-md focus:bg-purple-50 valid:bg-white ${
    error
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-purple-300 focus:ring-primary-violet focus:border-primary-violet'
  }`;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={fieldName}
        className="block text-body-sm-medium text-primary-black"
      >
        {label}
        {required && ' *'}
      </label>
      <CitySearch
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputClassName={inputClassName}
        showSearchIcon={false}
      />
      {error && (
        <span className="text-xs text-body-sm-medium text-red-600 mt-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default EditableCitySearch;