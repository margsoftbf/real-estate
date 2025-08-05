import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import PropertyCard from '@/components/shared/PropertyCard';
import Button from '@/components/ui/Button/Button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/Carousel/carousel';
import { PropertyPublicDto, PropertyType } from '@/types/properties';

const properties: PropertyPublicDto[] = [
  {
    slug: 'palm-harbor',
    type: PropertyType.RENT,
    price: 2095,
    city: 'Highland Lake',
    country: 'FL',
    title: 'Palm Harbor',
    photos: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=400',
    ],
    description: 'Beautiful property in Highland Lake',
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 35,
    },
    isPopular: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    owner: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '+1234567890',
      avatarUrl: null,
    },
  },
  {
    slug: 'beverly-springfield',
    type: PropertyType.RENT,
    price: 2700,
    city: 'Palm Harbor',
    country: 'TX',
    title: 'Beverly Springfield',
    photos: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=400',
    ],
    description: 'Spacious property in Palm Harbor',
    features: {
      bedrooms: 4,
      bathrooms: 2,
      area: 45,
    },
    isPopular: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    owner: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phoneNumber: '+1234567891',
      avatarUrl: null,
    },
  },
  {
    slug: 'faulkner-ave',
    type: PropertyType.RENT,
    price: 4550,
    city: 'Michigan',
    country: 'IN',
    title: 'Faulkner Ave',
    photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400',
    ],
    description: 'Premium property in Michigan',
    features: {
      bedrooms: 4,
      bathrooms: 3,
      area: 80,
    },
    isPopular: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    owner: {
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike@example.com',
      phoneNumber: '+1234567892',
      avatarUrl: null,
    },
  },
  {
    slug: 'st-crystal',
    type: PropertyType.RENT,
    price: 2400,
    city: 'Highland Lake',
    country: 'FL',
    title: 'St. Crystal',
    photos: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=400',
    ],
    description: 'Comfortable property near the lake',
    features: {
      bedrooms: 4,
      bathrooms: 2,
      area: 48,
    },
    isPopular: false,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    owner: {
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah@example.com',
      phoneNumber: '+1234567893',
      avatarUrl: null,
    },
  },
  {
    slug: 'cove-red',
    type: PropertyType.RENT,
    price: 1500,
    city: 'Palm Harbor',
    country: 'TX',
    title: 'Cove Red',
    photos: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400',
    ],
    description: 'Cozy property with great location',
    features: {
      bedrooms: 2,
      bathrooms: 1,
      area: 37,
    },
    isPopular: false,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    owner: {
      firstName: 'Tom',
      lastName: 'Brown',
      email: 'tom@example.com',
      phoneNumber: '+1234567894',
      avatarUrl: null,
    },
  },
  {
    slug: 'tarpon-bay',
    type: PropertyType.RENT,
    price: 1600,
    city: 'Michigan',
    country: 'IN',
    title: 'Tarpon Bay',
    photos: [
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    description: 'Modern property with bay views',
    features: {
      bedrooms: 3,
      bathrooms: 1,
      area: 35,
    },
    isPopular: false,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    owner: {
      firstName: 'Lisa',
      lastName: 'Davis',
      email: 'lisa@example.com',
      phoneNumber: '+1234567895',
      avatarUrl: null,
    },
  },
];

const PopularProperties = () => {
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
              {properties.map((property) => (
                <CarouselItem
                  key={property.slug}
                  className="pl-4 basis-full sm:basis-1/2"
                >
                  <div className="p-1">
                    <PropertyCard property={property} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>

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
