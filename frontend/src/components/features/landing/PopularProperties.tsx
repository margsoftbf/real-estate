import { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import PropertyCard from '@/components/shared/Property/PropertyCard';
import Button from '@/components/ui/Button/Button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/Carousel/carousel';
import { PropertyPublicDto } from '@/types/properties';
import { propertiesApi } from '@/lib/properties/api';

const PopularProperties = () => {
  const [properties, setProperties] = useState<PropertyPublicDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPopularProperties = async () => {
      try {
        setIsLoading(true);
        const response = await propertiesApi.findAll({
          filter: {
            isPopular: true,
          },
          limit: 6,
          page: 1,
        });
        setProperties(response.data);
      } catch {
        // Error handled by empty state
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularProperties();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-t from-purple-50 via-purple-50 via-80% lg:via-90% to-white to-95% lg:to-100%">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:flex lg:justify-between lg:items-center mb-8">
            <div className="lg:text-left">
              <h2 className="text-h3 font-bold text-primary-black px-6 lg:px-0 sm:text-4xl">
                Based on your location
              </h2>
              <p className="mt-4 text-body-md px-6 lg:px-0  text-gray-500 lg:text-lg">
                Some of our picked properties near you location.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-violet"></div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-16 bg-gradient-to-t from-purple-50 via-purple-50 via-80% lg:via-90% to-white to-95% lg:to-100%">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center lg:flex lg:justify-between lg:items-center mb-8">
          <div className="lg:text-left">
            <h2 className="text-h3 font-bold text-primary-black px-6 lg:px-0 sm:text-4xl">
              Based on your location
            </h2>
            <p className="mt-4 text-body-md px-6 lg:px-0  text-gray-500 lg:text-lg">
              Some of our picked properties near you location.
            </p>
          </div>
          <div className="hidden lg:block shrink-0">
            <Link href="/rent">
              <Button variant="primary" size="lg" className="text-sm">
                Browse more properties
              </Button>
            </Link>
          </div>
        </div>

        {properties.length > 0 ? (
          <>
            <div className="lg:hidden mx-4">
              <Carousel
                opts={{
                  align: 'start',
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 4000,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {properties.map((property, index) => (
                    <CarouselItem
                      key={property.slug}
                      className="pl-4 basis-full sm:basis-1/2"
                    >
                      <div className="p-1">
                        <PropertyCard property={property} priority={index === 0} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property, index) => (
                <PropertyCard key={property.slug} property={property} priority={index === 0} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No popular properties found at the moment.
            </p>
          </div>
        )}

        <div className="mt-8 text-center lg:hidden">
          <Link href="/rent">
            <Button variant="primary" size="lg" className="text-sm">
              Browse more properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularProperties;
