import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PropertyPublicDto } from '@/types/properties';
import Button from '@/components/ui/Button/Button';

interface SimilarPropertiesProps {
  similarProperties: PropertyPublicDto[];
  currentPropertyType: 'rent' | 'sell';
}

const SimilarProperties = ({
  similarProperties,
  currentPropertyType,
}: SimilarPropertiesProps) => {
  if (similarProperties.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Similar listings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {similarProperties.slice(0, 3).map((similarProperty) => (
          <Link
            key={similarProperty.slug}
            href={`/properties/${similarProperty.slug}`}
          >
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              {similarProperty.photos?.[0] && (
                <div className="relative h-32">
                  <Image
                    src={similarProperty.photos[0]}
                    alt={similarProperty.title || 'Similar property'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                  />
                </div>
              )}
              <div className="p-3">
                <div className="text-lg font-semibold text-primary-violet mb-1">
                  ${Math.floor(similarProperty.price).toLocaleString()}
                  {similarProperty.type === 'rent' && (
                    <span className="text-sm font-normal text-gray-600">
                      /month
                    </span>
                  )}
                </div>
                <h3 className="font-medium text-gray-900 text-sm line-clamp-1 mb-1">
                  {similarProperty.title || 'Untitled Property'}
                </h3>
                <p className="text-gray-600 text-xs">
                  {similarProperty.city}, {similarProperty.country}
                </p>
                <div className="flex gap-4 mt-2 text-xs text-gray-600">
                  {similarProperty.features?.bedrooms && (
                    <span>{similarProperty.features.bedrooms} beds</span>
                  )}
                  {similarProperty.features?.bathrooms && (
                    <span>{similarProperty.features.bathrooms} baths</span>
                  )}
                  {similarProperty.features?.area && (
                    <span>{similarProperty.features.area} m²</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link href={currentPropertyType === 'rent' ? '/rent' : '/buy'}>
          <Button variant="outline" className="w-full md:w-auto">
            View all {currentPropertyType === 'rent' ? 'rental' : 'sale'}{' '}
            properties
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SimilarProperties;
