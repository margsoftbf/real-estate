import React, { useState, useEffect } from 'react';
import { CloseOutline } from '@/assets/icons';
import Button from '@/components/ui/Button/Button';
import EditableInput from '@/components/common/EditableInput';
import EditableSelect from '@/components/common/EditableSelect';
import EditableNumberRange from '@/components/common/EditableNumberRange';

interface Filters {
  minPrice: string;
  maxPrice: string;
  city: string;

  minBedrooms: string;
  maxBedrooms: string;
  minBathrooms: string;
  maxBathrooms: string;
  minArea: string;
  maxArea: string;
  minParkingSpaces: string;
  maxParkingSpaces: string;
  minYearBuilt: string;
  maxYearBuilt: string;

  homeType: string;
  laundry: string;
  heating: string;

  furnished: boolean | null;
  petsAllowed: boolean | null;
  smokingAllowed: boolean | null;
  balcony: boolean | null;
  garden: boolean | null;
  garage: boolean | null;
  elevator: boolean | null;
  airConditioning: boolean | null;
  dishwasher: boolean | null;
  washerDryer: boolean | null;
  internet: boolean | null;
  cable: boolean | null;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  onFilterChange: (key: string, value: string | boolean | null) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

const ToggleSwitch = ({
  label,
  value,
  onFilterChange,
  filterKey,
}: {
  label: string;
  value: boolean | null;
  onFilterChange: (key: string, value: boolean | null) => void;
  filterKey: string;
}) => (
  <div className="flex items-center justify-between">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="flex items-center space-x-2">
      <button
        onClick={() =>
          onFilterChange(filterKey, value === false ? null : false)
        }
        className={`px-3 py-1 text-xs rounded-full border transition-colors ${
          value === false
            ? 'bg-red-100 text-red-700 border-red-300'
            : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
        }`}
      >
        No
      </button>
      <button
        onClick={() => onFilterChange(filterKey, value === true ? null : true)}
        className={`px-3 py-1 text-xs rounded-full border transition-colors ${
          value === true
            ? 'bg-green-100 text-green-700 border-green-300'
            : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
        }`}
      >
        Yes
      </button>
      <button
        onClick={() => onFilterChange(filterKey, null)}
        className={`px-3 py-1 text-xs rounded-full border transition-colors ${
          value === null
            ? 'bg-primary-violet text-white border-primary-violet'
            : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
        }`}
      >
        Any
      </button>
    </div>
  </div>
);

const FilterModal = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onApplyFilters,
}: FilterModalProps) => {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
    }
  }, [isOpen, filters]);

  if (!isOpen) return null;

  const handleLocalFilterChange = (key: string, value: string | boolean | null) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    Object.keys(localFilters).forEach(key => {
      onFilterChange(key, localFilters[key as keyof Filters]);
    });
    onApplyFilters();
    onClose();
  };

  const handleClear = () => {
    const clearedFilters: Filters = {
      minPrice: '',
      maxPrice: '',
      city: '',
      minBedrooms: '',
      maxBedrooms: '',
      minBathrooms: '',
      maxBathrooms: '',
      minArea: '',
      maxArea: '',
      minParkingSpaces: '',
      maxParkingSpaces: '',
      minYearBuilt: '',
      maxYearBuilt: '',
      homeType: '',
      laundry: '',
      heating: '',
      furnished: null,
      petsAllowed: null,
      smokingAllowed: null,
      balcony: null,
      garden: null,
      garage: null,
      elevator: null,
      airConditioning: null,
      dishwasher: null,
      washerDryer: null,
      internet: null,
      cable: null,
    };
    setLocalFilters(clearedFilters);
  };

  const homeTypeOptions = [
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'studio', label: 'Studio' },
  ];

  const laundryOptions = [
    { value: 'in-unit', label: 'In Unit' },
    { value: 'shared', label: 'Shared' },
    { value: 'none', label: 'None' },
  ];

  const heatingOptions = [
    { value: 'central', label: 'Central' },
    { value: 'electric', label: 'Electric' },
    { value: 'gas', label: 'Gas' },
    { value: 'oil', label: 'Oil' },
    { value: 'none', label: 'None' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/70 transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Filter Properties
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <CloseOutline className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                  Basic Filters
                </h3>

                <EditableNumberRange
                  label="Price Range ($)"
                  minFieldName="minPrice"
                  maxFieldName="maxPrice"
                  minValue={localFilters.minPrice}
                  maxValue={localFilters.maxPrice}
                  onMinChange={(value) => handleLocalFilterChange('minPrice', value)}
                  onMaxChange={(value) => handleLocalFilterChange('maxPrice', value)}
                  placeholder={{ min: 'Min Price', max: 'Max Price' }}
                />

                <EditableInput
                  fieldName="city"
                  label="City"
                  placeholder="Enter city name"
                  type="text"
                  value={localFilters.city}
                  onChange={(e) => handleLocalFilterChange('city', e.target.value)}
                />

                <EditableSelect
                  fieldName="homeType"
                  label="Home Type"
                  placeholder="Any"
                  options={homeTypeOptions}
                  value={localFilters.homeType}
                  onChange={(e) => handleLocalFilterChange('homeType', e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                  Rooms & Space
                </h3>

                <EditableNumberRange
                  label="Bedrooms"
                  minFieldName="minBedrooms"
                  maxFieldName="maxBedrooms"
                  minValue={localFilters.minBedrooms}
                  maxValue={localFilters.maxBedrooms}
                  onMinChange={(value) => handleLocalFilterChange('minBedrooms', value)}
                  onMaxChange={(value) => handleLocalFilterChange('maxBedrooms', value)}
                  placeholder={{ min: 'Min', max: 'Max' }}
                />

                <EditableNumberRange
                  label="Bathrooms"
                  minFieldName="minBathrooms"
                  maxFieldName="maxBathrooms"
                  minValue={localFilters.minBathrooms}
                  maxValue={localFilters.maxBathrooms}
                  onMinChange={(value) => handleLocalFilterChange('minBathrooms', value)}
                  onMaxChange={(value) => handleLocalFilterChange('maxBathrooms', value)}
                  placeholder={{ min: 'Min', max: 'Max' }}
                />

                <EditableNumberRange
                  label="Area (m²)"
                  minFieldName="minArea"
                  maxFieldName="maxArea"
                  minValue={localFilters.minArea}
                  maxValue={localFilters.maxArea}
                  onMinChange={(value) => handleLocalFilterChange('minArea', value)}
                  onMaxChange={(value) => handleLocalFilterChange('maxArea', value)}
                  placeholder={{ min: 'Min Area', max: 'Max Area' }}
                />

                <EditableNumberRange
                  label="Parking Spaces"
                  minFieldName="minParkingSpaces"
                  maxFieldName="maxParkingSpaces"
                  minValue={localFilters.minParkingSpaces}
                  maxValue={localFilters.maxParkingSpaces}
                  onMinChange={(value) =>
                    handleLocalFilterChange('minParkingSpaces', value)
                  }
                  onMaxChange={(value) =>
                    handleLocalFilterChange('maxParkingSpaces', value)
                  }
                  placeholder={{ min: 'Min', max: 'Max' }}
                />

                <EditableNumberRange
                  label="Year Built"
                  minFieldName="minYearBuilt"
                  maxFieldName="maxYearBuilt"
                  minValue={localFilters.minYearBuilt}
                  maxValue={localFilters.maxYearBuilt}
                  onMinChange={(value) => handleLocalFilterChange('minYearBuilt', value)}
                  onMaxChange={(value) => handleLocalFilterChange('maxYearBuilt', value)}
                  placeholder={{ min: 'From Year', max: 'To Year' }}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                  Amenities & Features
                </h3>

                <EditableSelect
                  fieldName="laundry"
                  label="Laundry"
                  placeholder="Any"
                  options={laundryOptions}
                  value={localFilters.laundry}
                  onChange={(e) => handleLocalFilterChange('laundry', e.target.value)}
                />

                <EditableSelect
                  fieldName="heating"
                  label="Heating"
                  placeholder="Any"
                  options={heatingOptions}
                  value={localFilters.heating}
                  onChange={(e) => handleLocalFilterChange('heating', e.target.value)}
                />

                <div className="space-y-3">
                  <ToggleSwitch
                    label="Furnished"
                    value={localFilters.furnished}
                    onFilterChange={handleLocalFilterChange}
                    filterKey="furnished"
                  />
                  <ToggleSwitch
                    label="Pets Allowed"
                    value={localFilters.petsAllowed}
                    onFilterChange={handleLocalFilterChange}
                    filterKey="petsAllowed"
                  />
                  <ToggleSwitch
                    label="Smoking Allowed"
                    value={localFilters.smokingAllowed}
                    onFilterChange={handleLocalFilterChange}
                    filterKey="smokingAllowed"
                  />
                  <ToggleSwitch
                    label="Balcony"
                    value={localFilters.balcony}
                    onFilterChange={handleLocalFilterChange}
                    filterKey="balcony"
                  />
                  <ToggleSwitch
                    label="Garden"
                    value={localFilters.garden}
                    onFilterChange={handleLocalFilterChange}
                    filterKey="garden"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                  Building Features
                </h3>
                <div className="space-y-3">
                  <ToggleSwitch
                    label="Garage"
                    value={localFilters.garage}
                    onFilterChange={handleLocalFilterChange}
                    filterKey="garage"
                  />
                  <ToggleSwitch
                    label="Elevator"
                    value={localFilters.elevator}
                    onFilterChange={handleLocalFilterChange}
                    filterKey="elevator"
                  />
                  <ToggleSwitch
                    label="Air Conditioning"
                    value={localFilters.airConditioning}
                    onFilterChange={handleLocalFilterChange}
                    filterKey="airConditioning"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                  Appliances
                </h3>
                <div className="space-y-3">
                  <ToggleSwitch
                    label="Dishwasher"
                    value={localFilters.dishwasher}
                    onFilterChange={handleLocalFilterChange}
                    filterKey="dishwasher"
                  />
                  <ToggleSwitch
                    label="Washer/Dryer"
                    value={localFilters.washerDryer}
                    onFilterChange={handleLocalFilterChange}
                    filterKey="washerDryer"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                  Utilities
                </h3>
                <div className="space-y-3">
                  <ToggleSwitch
                    label="Internet"
                    value={localFilters.internet}
                    onFilterChange={handleLocalFilterChange}
                    filterKey="internet"
                  />
                  <ToggleSwitch
                    label="Cable TV"
                    value={localFilters.cable}
                    onFilterChange={handleLocalFilterChange}
                    filterKey="cable"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-t px-6 py-4 flex gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={handleClear}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleApply}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
