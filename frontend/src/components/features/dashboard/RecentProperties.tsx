import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PropertyLandlordDto } from '@/lib/properties/for-landlord/api';
import { HouseOutline, CalendarOutline } from '@/assets/icons';

interface RecentPropertiesProps {
  properties: PropertyLandlordDto[];
}

export const RecentProperties = ({ properties }: RecentPropertiesProps) => {
  const safeProperties = properties || [];
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <CalendarOutline className="w-5 h-5 mr-2" />
          Recent Properties
        </h2>
        <Link
          href="/landlord/my-listings"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View all →
        </Link>
      </div>

      {safeProperties.length === 0 ? (
        <div className="text-center py-8">
          <HouseOutline className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-500 font-medium">No properties yet</h3>
          <p className="text-gray-400 text-sm mb-4">
            Get started by adding your first property
          </p>
          <Link href="/landlord/add-listing">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add Property
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {safeProperties.slice(0, 3).map((property) => (
            <div
              key={property.slug}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                  {property.photos?.[0] && (
                    <Image
                      src={property.photos[0]}
                      alt={property.title || 'Property'}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-500">{property.city}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">
                  ${property.price ? Math.floor(property.price).toLocaleString() : 'N/A'}
                </div>
                <div className="text-sm text-gray-500 capitalize">
                  {property.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};