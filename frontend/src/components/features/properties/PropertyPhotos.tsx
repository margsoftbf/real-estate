import React from 'react';
import Image from 'next/image';
import { PropertyPublicDto } from '@/types/properties';
import { ImageOutline } from '@/assets/icons';
import Button from '@/components/ui/Button/Button';

interface PropertyPhotosProps {
  property: PropertyPublicDto;
  onOpenPhotoModal: (index: number) => void;
}

const PropertyPhotos = ({
  property,
  onOpenPhotoModal,
}: PropertyPhotosProps) => {
  const photos = property.photos || [];
  const hasPhotos = photos.length > 0;

  if (!hasPhotos) {
    return (
      <div className="mb-6">
        <div className="h-64 md:h-80 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">No image available</span>
        </div>
      </div>
    );
  }

  // Always show single photo layout - no grid even for multiple photos
  return (
    <div className="mb-6">
      <div
        className="h-64 md:h-80 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border border-gray-200 relative group"
        onClick={() => onOpenPhotoModal(0)}
      >
        <Image
          src={photos[0]}
          alt={property.title || 'Property image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-3 right-3">
          <Button
            size="sm"
            variant="white"
            className="gap-1.5 hover:bg-primary-violet-dark hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onOpenPhotoModal(0);
            }}
          >
            <ImageOutline className="w-4 h-4 text-primary-violet-dark group-hover:text-white transition-colors" />
            {photos.length === 1 ? 'View photo' : `${photos.length} photos`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyPhotos;
