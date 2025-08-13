import React from 'react';

interface PropertyPriceHistoryProps {
  price: number;
  type: string;
  createdAt: string;
}

const PropertyPriceHistory = ({
  price,
  type,
  createdAt,
}: PropertyPriceHistoryProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Price history
      </h2>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-gray-900">
              ${price.toLocaleString()}
              {type === 'rent' && (
                <span className="text-sm font-normal text-gray-600">
                  /month
                </span>
              )}
            </div>
            <div className="text-sm text-gray-600">
              Listed {new Date(createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className="text-sm text-green-600 font-medium">
            Current price
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPriceHistory;
