import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Header from '@/components/features/landing/Header';
import Footer from '@/components/features/landing/Footer';
import PhotoModal from '@/components/shared/PhotoModal';
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner';
import { PropertyPublicDto } from '@/types/properties';
import { propertiesApi } from '@/lib/properties/api';
import { ChevronLeftOutline } from '@/assets/icons';
import PropertyHeader from '@/components/features/properties/PropertyHeader';
import PropertyActions from '@/components/features/properties/PropertyActions';
import PropertyPhotos from '@/components/features/properties/PropertyPhotos';
import PropertyPriceBox from '@/components/features/properties/PropertyPriceBox';
import PropertyFeatures from '@/components/features/properties/PropertyFeatures';
import PropertyOwner from '@/components/features/properties/PropertyOwner';
import PropertyLocation from '@/components/features/properties/PropertyLocation';
import SimilarProperties from '@/components/features/properties/SimilarProperties';
import PropertyRequest from '@/components/features/properties/PropertyRequest';

interface PropertyPageProps {
  property: PropertyPublicDto | null;
  error?: string;
}

export default function PropertyPage({
  property: initialProperty,
  error,
}: PropertyPageProps) {
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
        .catch(console.error)
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
      } catch (error) {
        console.error('Error fetching similar properties:', error);
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

  const renderContent = () => {
    if (error) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      );
    }

    if (isLoading || !property) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="lg:hidden bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="px-4 py-3">
            <button
              onClick={handleBackToResults}
              className="flex items-center gap-1 text-primary-violet font-medium font-jakarta"
            >
              <ChevronLeftOutline className="w-5 h-5" />
              <span>Back to results</span>
            </button>
          </div>
        </div>

        <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <button
            onClick={handleBackToResults}
            className="flex items-center gap-2 text-primary-violet font-medium mb-6"
          >
            <ChevronLeftOutline className="w-5 h-5" />
            <span>Back to results</span>
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="block lg:hidden">
            <PropertyHeader property={property} />
            <PropertyActions />
          </div>

          <div className="hidden lg:flex justify-between items-center mb-4">
            <PropertyHeader property={property} />
            <PropertyActions />
          </div>

          <div className="block lg:hidden">
            <PropertyPhotos
              property={property}
              onOpenPhotoModal={openPhotoModal}
            />
            <PropertyPriceBox property={property} />

            {property.description && (
              <div className="my-6">
                <h2 className="text-xl font-semibold text-primary-black mb-2">
                  About this home
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>
            )}

            <PropertyOwner property={property} />
            <PropertyRequest />
            <PropertyFeatures property={property} />

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Price history
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      ${property.price.toLocaleString()}
                      {property.type === 'rent' && (
                        <span className="text-sm font-normal text-gray-600">
                          /month
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      Listed {new Date(property.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    Current price
                  </div>
                </div>
              </div>
            </div>

            <PropertyLocation property={property} />
          </div>

          <div className="hidden lg:block">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8">
                <PropertyPhotos
                  property={property}
                  onOpenPhotoModal={openPhotoModal}
                />

                {property.description && (
                  <div className="my-6">
                    <h2 className="text-xl font-semibold text-primary-black mb-2">
                      About this home
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {property.description}
                    </p>
                  </div>
                )}

                <PropertyFeatures property={property} />

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Price history
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold text-gray-900">
                          ${property.price.toLocaleString()}
                          {property.type === 'rent' && (
                            <span className="text-sm font-normal text-gray-600">
                              /month
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          Listed{' '}
                          {new Date(property.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        Current price
                      </div>
                    </div>
                  </div>
                </div>

                <PropertyLocation property={property} />
              </div>

              <div className="col-span-4 space-y-6">
                <PropertyPriceBox property={property} />
                <PropertyOwner property={property} />
                <PropertyRequest />
              </div>
            </div>
          </div>

          <SimilarProperties
            similarProperties={similarProperties}
            currentPropertyType={property.type}
          />
        </div>

        {property && property.photos && (
          <PhotoModal
            isOpen={isPhotoModalOpen}
            onClose={closePhotoModal}
            photos={property.photos}
            initialIndex={photoModalIndex}
            propertyTitle={property.title || 'Property'}
          />
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pb-8">{renderContent()}</main>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;

  if (typeof slug !== 'string') {
    return {
      notFound: true,
    };
  }

  try {
    const property = await propertiesApi.findBySlug(slug);

    return {
      props: {
        property,
      },
    };
  } catch (error) {
    console.error('Error fetching property:', error);

    return {
      props: {
        property: null,
        error: 'Failed to load property',
      },
    };
  }
};
