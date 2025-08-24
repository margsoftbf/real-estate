import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/features/landing/Header';
import Footer from '@/components/features/landing/Footer';
import PhotoModal from '@/components/shared/PhotoModal';
import LoadingState from '@/components/shared/LoadingState';
import { PropertyPublicDto } from '@/types/properties';
import { propertiesApi } from '@/lib/properties/api';
import PropertyHeader from '@/components/features/properties/PropertyHeader';
import PropertyActions from '@/components/features/properties/PropertyActions';
import PropertyPhotos from '@/components/features/properties/PropertyPhotos';
import PropertyPriceBox from '@/components/features/properties/PropertyPriceBox';
import PropertyFeatures from '@/components/features/properties/PropertyFeatures';
import PropertyOwner from '@/components/features/properties/PropertyOwner';
import PropertyLocation from '@/components/features/properties/PropertyLocation';
import SimilarProperties from '@/components/features/properties/SimilarProperties';
import PropertyRequest from '@/components/features/properties/PropertyRequest';
import BackToResultsButton from '@/components/features/properties/BackToResultsButton';
import PropertyDescription from '@/components/features/properties/PropertyDescription';
import PropertyPriceHistory from '@/components/features/properties/PropertyPriceHistory';

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

  return (
    <>
      {property && (
        <Head>
          <title>{`${property.title || 'Property'} | ${property.type === 'rent' ? 'For Rent' : 'For Sale'} in ${property.city} | RentSmart`}</title>
          <meta
            name="description"
            content={`${property.description?.slice(0, 150) || `${property.type === 'rent' ? 'Rental property' : 'Property for sale'} in ${property.city}, ${property.country}`}. Price: $${property.price?.toLocaleString()}. ${property.features?.bedrooms ? `${property.features.bedrooms} bedrooms` : ''} ${property.features?.bathrooms ? `, ${property.features.bathrooms} bathrooms` : ''}.`}
          />
          <meta
            name="keywords"
            content={`${property.city}, ${property.country}, ${property.type === 'rent' ? 'rental' : 'for sale'}, property, real estate, ${property.features?.homeType || 'home'}`}
          />
        </Head>
      )}

      <div className="min-h-screen bg-white">
        {property && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': property.type === 'rent' ? 'RentAction' : 'Product',
                name: property.title || 'Property',
                description: property.description,
                url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://rentsmart.com'}/properties/${property.slug}`,
                image: property.photos?.[0] || '',
                ...(property.type === 'rent'
                  ? {
                      object: {
                        '@type': 'Accommodation',
                        name: property.title,
                        description: property.description,
                        address: {
                          '@type': 'PostalAddress',
                          addressLocality: property.city,
                          addressCountry: property.country,
                        },
                        amenityFeature: Object.entries(property.features || {})
                          .filter(([, value]) => value === true)
                          .map(([key]) => ({
                            '@type': 'LocationFeatureSpecification',
                            name: key.replace(/([A-Z])/g, ' $1').trim(),
                          })),
                      },
                      priceSpecification: {
                        '@type': 'PriceSpecification',
                        price: property.price,
                        priceCurrency: 'USD',
                        unitCode: 'MON',
                      },
                    }
                  : {
                      offers: {
                        '@type': 'Offer',
                        price: property.price,
                        priceCurrency: 'USD',
                        availability: 'https://schema.org/InStock',
                      },
                      address: {
                        '@type': 'PostalAddress',
                        addressLocality: property.city,
                        addressCountry: property.country,
                      },
                    }),
              }),
            }}
          />
        )}
        <Header />
        <main className="pb-8">
          {error ? (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
                <p className="text-gray-600">{error}</p>
              </div>
            </div>
          ) : isLoading || !property ? (
            <LoadingState className="flex justify-center items-center py-20" />
          ) : (
            <>
              <div className="lg:hidden bg-white border-b border-gray-100 sticky top-0 left-0 z-10">
                <BackToResultsButton onClick={handleBackToResults} isMobile />
              </div>

              <BackToResultsButton onClick={handleBackToResults} />

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

                  <PropertyDescription description={property.description} />

                  <PropertyOwner property={property} />

                  <PropertyRequest />

                  <PropertyFeatures property={property} />

                  <PropertyPriceHistory
                    price={property.price}
                    type={property.type}
                    createdAt={property.createdAt}
                  />
                  <PropertyLocation property={property} />
                </div>

                <div className="hidden lg:block">
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-8">
                      <PropertyPhotos
                        property={property}
                        onOpenPhotoModal={openPhotoModal}
                      />

                      <PropertyDescription description={property.description} />

                      <PropertyFeatures property={property} />

                      <PropertyPriceHistory
                        price={property.price}
                        type={property.type}
                        createdAt={property.createdAt}
                      />

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
          )}
        </main>
        <Footer />
      </div>
    </>
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
  } catch {
    // Error handled by error state

    return {
      props: {
        property: null,
        error: 'Failed to load property',
      },
    };
  }
};
