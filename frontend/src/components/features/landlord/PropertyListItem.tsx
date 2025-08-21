import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PropertyLandlordDto } from '@/lib/properties/for-landlord/api';
import {
  EditOutline,
  TrashOutline,
  EyeOutline,
} from '@/assets/icons';

interface PropertyListItemProps {
  property: PropertyLandlordDto;
  onDelete: (slug: string, title: string) => void;
  formatPrice: (price: number) => string;
  getStatusBadge: (property: PropertyLandlordDto) => {
    label: string;
    color: string;
  };
}

const PropertyListItem = ({
  property,
  onDelete,
  formatPrice,
  getStatusBadge,
}: PropertyListItemProps) => {
  const router = useRouter();
  const statusBadge = getStatusBadge(property);

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg overflow-hidden relative">
          {property.photos?.[0] ? (
            <Image
              src={property.photos[0]}
              alt={property.title || 'Property'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 64px, 80px"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-xs">
              No Image
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2">
                {property.title || 'Untitled Property'}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 truncate mt-0.5">
                {property.city}, {property.country}
              </p>
              <div className="md:hidden mt-1">
                <span className="text-xs text-gray-500">
                  {property.features?.area
                    ? `${property.features.area} sq m`
                    : 'Size N/A'}
                </span>
              </div>
            </div>

            <div className="flex-shrink-0 ml-2">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}
              >
                {statusBadge.label}
              </span>
            </div>

            <div className="hidden md:flex flex-shrink-0 ml-4 text-right">
              <span className="text-sm text-gray-900 font-medium">
                {property.features?.area
                  ? `${property.features.area} sq m`
                  : 'Size N/A'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-4">
              <span className="text-sm md:text-base font-bold text-blue-600">
                {formatPrice(property.price)}
              </span>

              <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
                {property.features?.bedrooms && (
                  <span>{property.features.bedrooms} bed</span>
                )}
                {property.features?.bathrooms && (
                  <span>
                    {property.features.bathrooms} bath
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  router.push(`/properties/${property.slug}`)
                }
                className="p-2 text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
                title="View Property"
              >
                <EyeOutline className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  router.push(
                    `/landlord/my-listings/${property.slug}/edit`
                  )
                }
                className="p-2 text-green-500 hover:text-green-700 transition-colors cursor-pointer"
                title="Edit Property"
              >
                <EditOutline className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  onDelete(property.slug, property.title || 'Untitled Property')
                }
                className="p-2 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                title="Delete Property"
              >
                <TrashOutline className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListItem;