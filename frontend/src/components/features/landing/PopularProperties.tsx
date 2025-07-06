import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import PropertyCard, { Property } from '@/components/shared/PropertyCard';
import Button from '@/components/ui/Button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const properties: Property[] = [
  {
    id: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=400',
    popular: true,
    price: 2095,
    name: 'Palm Harbor',
    address: '2699 Green Valley, Highland Lake, FL',
    beds: 3,
    baths: 2,
    area: '5x7 m²',
  },
  {
    id: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=400',
    popular: true,
    price: 2700,
    name: 'Beverly Springfield',
    address: '2821 Lake Sevilla, Palm Harbor, TX',
    beds: 4,
    baths: 2,
    area: '6x7.5 m²',
  },
  {
    id: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400',
    popular: true,
    price: 4550,
    name: 'Faulkner Ave',
    address: '909 Woodland St, Michigan, IN',
    beds: 4,
    baths: 3,
    area: '8x10 m²',
  },
  {
    id: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=400',
    popular: false,
    price: 2400,
    name: 'St. Crystal',
    address: '210 US Highway, Highland Lake, FL',
    beds: 4,
    baths: 2,
    area: '6x8 m²',
  },
  {
    id: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400',
    popular: false,
    price: 1500,
    name: 'Cove Red',
    address: '243 Curlew Road, Palm Harbor, TX',
    beds: 2,
    baths: 1,
    area: '5x7.5 m²',
  },
  {
    id: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    popular: false,
    price: 1600,
    name: 'Tarpon Bay',
    address: '103 Lake Shores, Michigan, IN',
    beds: 3,
    baths: 1,
    area: '5x7 m²',
  },
];

const PopularProperties = () => {
  return (
    <section className="py-16 bg-gray-50">
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
            <Link href="/properties">
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
                  key={property.id}
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
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-8 text-center lg:hidden">
          <Link href="/properties">
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
