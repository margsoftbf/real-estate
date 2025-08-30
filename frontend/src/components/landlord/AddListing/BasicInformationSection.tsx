import React from 'react';
import EditableSelect from '@/components/common/EditableSelect';
import EditableInput from '@/components/common/EditableInput';
import EditableTextarea from '@/components/common/EditableTextarea';
import EditableCitySearch from '@/components/common/EditableCitySearch';
import LocationMap from '@/components/shared/LocationMap';
import { PropertyType } from '@/types/properties/public-types';
interface FormData {
  type?: PropertyType;
  price?: number;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  title?: string;
  description?: string;
}

interface BasicInformationSectionProps {
  formData: FormData;
  validationErrors: Record<string, string>;
  onInputChange: (field: string, value: string | number) => void;
  onCitySelect: (city: string, coordinates?: { lat: number; lng: number }) => void;
}

const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({
  formData,
  validationErrors,
  onInputChange,
  onCitySelect,
}) => {
  const propertyTypeOptions = [
    { value: PropertyType.RENT, label: 'For Rent' },
    { value: PropertyType.SELL, label: 'For Sale' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EditableSelect
          fieldName="type"
          label="Property Type *"
          options={propertyTypeOptions}
          value={formData.type || PropertyType.RENT}
          onChange={(e) => onInputChange('type', e.target.value as PropertyType)}
          error={validationErrors.type}
        />

        <EditableInput
          fieldName="price"
          label={`Price * (${(formData.type || PropertyType.RENT) === PropertyType.RENT ? 'per month' : 'total'})`}
          placeholder="Enter price"
          type="number"
          value={formData.price ? Math.round(formData.price).toString() : '0'}
          onChange={(e) => onInputChange('price', Number(e.target.value))}
          error={validationErrors.price}
        />

        <EditableInput
          fieldName="title"
          label="Title *"
          placeholder="e.g., Beautiful 2BR Apartment with City View"
          type="text"
          value={formData.title || ''}
          onChange={(e) => onInputChange('title', e.target.value)}
          error={validationErrors.title}
        />

        <EditableCitySearch
          fieldName="city"
          label="City"
          placeholder="Search for a city..."
          value={formData.city || ''}
          onChange={onCitySelect}
          error={validationErrors.city}
          required={true}
        />

        <EditableInput
          fieldName="country"
          label="Country *"
          placeholder="Enter country"
          type="text"
          value={formData.country || ''}
          onChange={(e) => onInputChange('country', e.target.value)}
          error={validationErrors.country}
        />
      </div>

      {formData.latitude && formData.longitude && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Property Location</h3>
          <LocationMap
            latitude={formData.latitude}
            longitude={formData.longitude}
            cityName={formData.city || ''}
            height="250px"
            className="border rounded-lg"
          />
        </div>
      )}

      <div className="mt-6">
        <EditableTextarea
          fieldName="description"
          label="Description"
          placeholder="Describe your property..."
          rows={4}
          value={formData.description || ''}
          onChange={(e) => onInputChange('description', e.target.value)}
          error={validationErrors.description}
        />
      </div>
    </div>
  );
};

export default BasicInformationSection;