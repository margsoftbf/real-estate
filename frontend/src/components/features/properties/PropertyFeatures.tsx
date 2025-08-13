import React from 'react';
import { PropertyPublicDto } from '@/types/properties';

interface PropertyFeaturesProps {
  property: PropertyPublicDto;
}

const PropertyFeatures = ({ property }: PropertyFeaturesProps) => {
  if (!property.features) return null;

  const formatPropertyType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const propertyDetails = [
    { key: 'homeType', label: 'Property type', value: property.features.homeType ? formatPropertyType(property.features.homeType) : null },
    { key: 'yearBuilt', label: 'Year built', value: property.features.yearBuilt },
    { key: 'parkingSpaces', label: 'Parking spaces', value: property.features.parkingSpaces },
    { key: 'laundry', label: 'Laundry', value: property.features.laundry ? formatPropertyType(property.features.laundry.replace('-', ' ')) : null },
    { key: 'heating', label: 'Heating', value: property.features.heating ? formatPropertyType(property.features.heating) : null },
    { key: 'furnished', label: 'Furnished', value: property.features.furnished !== undefined ? (property.features.furnished ? 'Yes' : 'No') : null },
    { key: 'petsAllowed', label: 'Pets allowed', value: property.features.petsAllowed !== undefined ? (property.features.petsAllowed ? 'Yes' : 'No') : null },
  ].filter(item => item.value);

  const knownAmenityLabels: Record<string, string> = {
    balcony: 'Balcony',
    garden: 'Garden', 
    garage: 'Garage',
    elevator: 'Elevator',
    airConditioning: 'Air Conditioning',
    dishwasher: 'Dishwasher', 
    washerDryer: 'Washer/Dryer',
    internet: 'Internet',
    cable: 'Cable',
    smokingAllowed: 'Smoking Allowed',
  };

  const excludedKeys = new Set([
    'bedrooms', 'bathrooms', 'area', 'parkingSpaces', 'dateAvailable',
    'homeType', 'laundry', 'heating', 'yearBuilt', 'furnished', 'petsAllowed'
  ]);

  const amenities = Object.entries(property.features || {})
    .filter(([key, value]) => 
      !excludedKeys.has(key) && 
      value === true
    )
    .map(([key]) => ({
      key,
      label: knownAmenityLabels[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
    }));

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-primary-black mb-4">
        Property features
      </h2>
      
      <div className="bg-white border-2 border-purple-300 rounded-lg p-5">
        {/* Property Details */}
        {propertyDetails.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {propertyDetails.map(item => (
              <div key={item.key} className="flex justify-between items-center py-2 px-3 bg-purple-50 rounded-md">
                <span className="text-primary-black/70 font-medium text-sm">{item.label}</span>
                <span className="font-semibold text-primary-violet-dark text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className={propertyDetails.length > 0 ? "pt-5 border-t border-purple-200" : ""}>
            <h4 className="font-semibold text-primary-black mb-3">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {amenities.map(amenity => (
                <span 
                  key={amenity.key} 
                  className="bg-primary-violet-dark text-white px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  {amenity.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyFeatures;