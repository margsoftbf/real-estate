import React from 'react';
import { PropertyPriceHistory as PriceHistoryType } from '@/types/properties';

interface PropertyPriceHistoryProps {
  price: number;
  type: string;
  createdAt: string;
  priceHistory?: PriceHistoryType[];
}

const PropertyPriceHistory = ({
  price,
  type,
  createdAt,
  priceHistory = [],
}: PropertyPriceHistoryProps) => {
  const sortedHistory = [...priceHistory].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Price history
      </h2>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {sortedHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Reason</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedHistory.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      <span className="font-semibold text-gray-900">
                        ${entry.price.toLocaleString()}
                        {type === 'rent' && (
                          <span className="font-normal text-gray-600">/month</span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {entry.reason || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        index === 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {index === 0 ? 'Current' : 'Previous'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 text-center">
            <div className="text-lg font-semibold text-gray-900 mb-1">
              ${price.toLocaleString()}
              {type === 'rent' && (
                <span className="text-sm font-normal text-gray-600">/month</span>
              )}
            </div>
            <div className="text-sm text-gray-600">
              Listed {new Date(createdAt).toLocaleDateString()}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              No price changes yet
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyPriceHistory;
