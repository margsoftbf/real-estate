import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PropertyPublicDto } from '@/types/properties';
import { propertiesApi } from '@/lib/properties/api';

interface UsePropertyPageProps {
  initialProperty: PropertyPublicDto | null;
}

interface UsePropertyPageReturn {
  property: PropertyPublicDto | null;
  isLoading: boolean;
  similarProperties: PropertyPublicDto[];
  isPhotoModalOpen: boolean;
  photoModalIndex: number;
  handleBackToResults: () => void;
  openPhotoModal: (index?: number) => void;
  closePhotoModal: () => void;
}

export const usePropertyPage = ({
  initialProperty,
}: UsePropertyPageProps): UsePropertyPageReturn => {
  const router = useRouter();
  const [property, setProperty] = useState<PropertyPublicDto | null>(
    initialProperty
  );
  const [isLoading, setIsLoading] = useState(false);
  const [similarProperties, setSimilarProperties] = useState<
    PropertyPublicDto[]
  >([]);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoModalIndex, setPhotoModalIndex] = useState(0);

  useEffect(() => {
    if (
      !initialProperty &&
      router.query.slug &&
      typeof router.query.slug === 'string'
    ) {
      setIsLoading(true);
      propertiesApi
        .findBySlug(router.query.slug)
        .then(setProperty)
        .catch(() => {})
        .finally(() => setIsLoading(false));
    }
  }, [router.query.slug, initialProperty]);

  useEffect(() => {
    const fetchSimilarProperties = async () => {
      try {
        const response = await propertiesApi.findAll({
          limit: 3,
          page: 1,
        });
        setSimilarProperties(response.data.slice(0, 3));
      } catch {
        // Error handled by empty state
      }
    };

    fetchSimilarProperties();
  }, []);

  const handleBackToResults = () => {
    if (property?.type === 'rent') {
      router.push('/rent');
    } else if (property?.type === 'sell') {
      router.push('/buy');
    } else {
      router.push('/rent');
    }
  };

  const openPhotoModal = (index: number = 0) => {
    setPhotoModalIndex(index);
    setIsPhotoModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsPhotoModalOpen(false);
  };

  return {
    property,
    isLoading,
    similarProperties,
    isPhotoModalOpen,
    photoModalIndex,
    handleBackToResults,
    openPhotoModal,
    closePhotoModal,
  };
};