import React from 'react';
import EditableInput from '@/components/common/EditableInput';
import EditableSelect from '@/components/common/EditableSelect';
import { PropertyFeatures } from '@/types/properties/public-types';

interface PropertyFeaturesSectionProps {
  features: PropertyFeatures;
  validationErrors: Record<string, string>;
  onFeatureChange: (field: string, value: string | number | boolean) => void;
}

const PropertyFeaturesSection: React.FC<PropertyFeaturesSectionProps> = ({
  features,
  validationErrors,
  onFeatureChange,
}) => {
  const homeTypeOptions = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'studio', label: 'Studio' },
  ];

  const laundryOptions = [
    { value: 'none', label: 'None' },
    { value: 'in-unit', label: 'In Unit' },
    { value: 'shared', label: 'Shared' },
  ];

  const heatingOptions = [
    { value: 'central', label: 'Central' },
    { value: 'electric', label: 'Electric' },
    { value: 'gas', label: 'Gas' },
    { value: 'oil', label: 'Oil' },
    { value: 'none', label: 'None' },
  ];

  const amenityOptions = [
    { key: 'furnished', label: 'Furnished' },
    { key: 'petsAllowed', label: 'Pets Allowed' },
    { key: 'smokingAllowed', label: 'Smoking Allowed' },
    { key: 'balcony', label: 'Balcony' },
    { key: 'garden', label: 'Garden' },
    { key: 'garage', label: 'Garage' },
    { key: 'elevator', label: 'Elevator' },
    { key: 'airConditioning', label: 'Air Conditioning' },
    { key: 'dishwasher', label: 'Dishwasher' },
    { key: 'washerDryer', label: 'Washer/Dryer' },
    { key: 'internet', label: 'Internet' },
    { key: 'cable', label: 'Cable TV' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-6">Property Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <EditableInput
          fieldName="bedrooms"
          label="Bedrooms"
          placeholder="0"
          type="number"
          value={features?.bedrooms?.toString() || '0'}
          onChange={(e) => onFeatureChange('bedrooms', Number(e.target.value))}
          error={validationErrors['features.bedrooms']}
        />

        <EditableInput
          fieldName="bathrooms"
          label="Bathrooms"
          placeholder="0"
          type="number"
          value={features?.bathrooms?.toString() || '0'}
          onChange={(e) => onFeatureChange('bathrooms', Number(e.target.value))}
          error={validationErrors['features.bathrooms']}
        />

        <EditableInput
          fieldName="area"
          label="Area (m²)"
          placeholder="0"
          type="number"
          value={features?.area?.toString() || '0'}
          onChange={(e) => onFeatureChange('area', Number(e.target.value))}
          error={validationErrors['features.area']}
        />

        <EditableInput
          fieldName="parkingSpaces"
          label="Parking Spaces"
          placeholder="0"
          type="number"
          value={features?.parkingSpaces?.toString() || '0'}
          onChange={(e) => onFeatureChange('parkingSpaces', Number(e.target.value))}
          error={validationErrors['features.parkingSpaces']}
        />

        <EditableSelect
          fieldName="homeType"
          label="Home Type"
          options={homeTypeOptions}
          value={features?.homeType || 'apartment'}
          onChange={(e) => onFeatureChange('homeType', e.target.value)}
          error={validationErrors['features.homeType']}
        />

        <EditableInput
          fieldName="yearBuilt"
          label="Year Built"
          placeholder="e.g., 2020"
          type="number"
          value={features?.yearBuilt?.toString() || ''}
          onChange={(e) => onFeatureChange('yearBuilt', Number(e.target.value))}
          error={validationErrors['features.yearBuilt']}
        />

        <EditableSelect
          fieldName="laundry"
          label="Laundry"
          options={laundryOptions}
          value={features?.laundry || 'none'}
          onChange={(e) => onFeatureChange('laundry', e.target.value)}
          error={validationErrors['features.laundry']}
        />

        <EditableSelect
          fieldName="heating"
          label="Heating"
          options={heatingOptions}
          value={features?.heating || 'central'}
          onChange={(e) => onFeatureChange('heating', e.target.value)}
          error={validationErrors['features.heating']}
        />
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {amenityOptions.map(({ key, label }) => (
            <label
              key={key}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={(features?.[key as keyof PropertyFeatures] as boolean) || false}
                onChange={(e) =>
                  onFeatureChange(key, e.target.checked)
                }
                className="rounded border-purple-300 text-primary-violet focus:ring-primary-violet h-4 w-4"
              />
              <span className="text-sm text-primary-black">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyFeaturesSection;