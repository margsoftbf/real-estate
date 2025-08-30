import Head from 'next/head';
import { PropertyPublicDto } from '@/types/properties';

interface PropertySEOProps {
  property: PropertyPublicDto;
}

export default function PropertySEO({ property }: PropertySEOProps) {
  const generateStructuredData = () => {
    return {
      '@context': 'https://schema.org',
      '@type': property.type === 'rent' ? 'RentAction' : 'Product',
      name: property.title || 'Property',
      description: property.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://real-estate.marcingarski.com'}/properties/${property.slug}`,
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
    };
  };

  return (
    <>
      <Head>
        <title>{`${property.title || 'Property'} | ${property.type === 'rent' ? 'For Rent' : 'For Sale'} in ${property.city} | RentSmart`}</title>
        <meta
          name="description"
          content={`${property.description?.slice(0, 150) || `${property.type === 'rent' ? 'Rental property' : 'Property for sale'} in ${property.city}, ${property.country}`}. Price: $${property.price ? Math.floor(property.price).toLocaleString() : 'N/A'}. ${property.features?.bedrooms ? `${property.features.bedrooms} bedrooms` : ''} ${property.features?.bathrooms ? `, ${property.features.bathrooms} bathrooms` : ''}.`}
        />
        <meta
          name="keywords"
          content={`${property.city}, ${property.country}, ${property.type === 'rent' ? 'rental' : 'for sale'}, property, real estate, ${property.features?.homeType || 'home'}`}
        />
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData()),
        }}
      />
    </>
  );
}