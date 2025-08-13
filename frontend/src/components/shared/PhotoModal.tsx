import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  CloseOutline,
  ChevronLeftOutline,
  ChevronRightOutline,
} from '@/assets/icons';

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: string[];
  initialIndex?: number;
  propertyTitle?: string;
}

const PhotoModal = ({
  isOpen,
  onClose,
  photos,
  initialIndex = 0,
  propertyTitle = 'Property',
}: PhotoModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, photos.length]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || photos.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90">
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between p-4">
          <div className="text-white">
            <h2 className="text-lg font-semibold">{propertyTitle}</h2>
            <p className="text-sm text-gray-300">
              {currentIndex + 1} of {photos.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close photo viewer"
          >
            <CloseOutline className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center h-full px-4 py-16">
        <div className="relative w-full h-full max-w-5xl max-h-full">
          <Image
            src={photos[currentIndex]}
            alt={`${propertyTitle} - Photo ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      {photos.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeftOutline className="w-8 h-8" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Next photo"
          >
            <ChevronRightOutline className="w-8 h-8" />
          </button>
        </>
      )}

      {photos.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-center p-4">
            <div className="flex gap-2 max-w-full overflow-x-auto">
              {photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`relative flex-shrink-0 w-16 h-12 rounded border-2 transition-all overflow-hidden ${
                    index === currentIndex
                      ? 'border-white'
                      : 'border-transparent hover:border-gray-400'
                  }`}
                >
                  <Image
                    src={photo}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {photos.length > 1 && (
        <>
          <div
            className="absolute left-0 top-0 w-1/3 h-full lg:hidden"
            onClick={goToPrevious}
          />
          <div
            className="absolute right-0 top-0 w-1/3 h-full lg:hidden"
            onClick={goToNext}
          />
        </>
      )}
    </div>
  );
};

export default PhotoModal;
