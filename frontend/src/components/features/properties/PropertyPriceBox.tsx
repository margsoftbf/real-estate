import React from 'react';
import { PropertyPublicDto } from '@/types/properties';
import { BedOutline, BathOutline, AreaIcon } from '@/assets/icons';

interface PropertyPriceBoxProps {
  property: PropertyPublicDto;
}

const PropertyPriceBox = ({ property }: PropertyPriceBoxProps) => {
  const getStatusColor = (type: string) => {
    return type === 'rent'
      ? 'bg-green-100 text-green-800'
      : 'bg-blue-100 text-blue-800';
  };

  const formatStatus = (type: string) => {
    return type === 'rent' ? 'For Rent' : 'For Sale';
  };

  return (
    <div className="bg-gray-50 border-2 border-purple-200 rounded-lg p-3 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold text-primary-violet-dark">
          ${property.price.toLocaleString()}
          {property.type === 'rent' && (
            <span className="text-body-sm font-medium text-gray-600">
              /month
            </span>
          )}
        </div>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(property.type)}`}
        >
          {formatStatus(property.type)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-5">
        {[
          {
            key: 'bedrooms',
            value: property.features?.bedrooms,
            icon: BedOutline,
            label: 'Bed',
          },
          {
            key: 'bathrooms',
            value: property.features?.bathrooms,
            icon: BathOutline,
            label: 'Bath',
          },
          {
            key: 'area',
            value: property.features?.area,
            icon: AreaIcon,
            label: 'Area',
            unit: 'm²',
          },
        ]
          .filter((feature) => feature.value)
          .map(({ key, value, icon: Icon, label, unit }) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <div className="text-sm text-primary-black/50 font-jakarta font-semibold">
                {label}
              </div>
              <div className="flex gap-2 items-center justify-center">
                <div className="flex justify-center">
                  <Icon className="w-5 h-5 text-primary-black/50" />
                </div>
                <div className="text-md font-semibold text-gray-900">
                  {value}
                  {unit && ` ${unit}`}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PropertyPriceBox;
