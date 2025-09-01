import { GetServerSideProps } from 'next';
import Header from '@/components/features/landing/Header';
import Footer from '@/components/features/landing/Footer';
import { PropertyPublicDto } from '@/types/properties';
import { propertiesApi } from '@/lib/properties/api';
import PropertySEO from '@/components/features/properties/PropertySEO';
import PropertyPageLayout from '@/components/features/properties/PropertyPageLayout';
import { usePropertyPage } from '@/hooks/properties/usePropertyPage';

interface PropertyPageProps {
  property: PropertyPublicDto | null;
  error?: string;
}

export default function PropertyPage({
  property: initialProperty,
  error,
}: PropertyPageProps) {
  const {
    property,
    isLoading,
    similarProperties,
    isPhotoModalOpen,
    photoModalIndex,
    handleBackToResults,
    openPhotoModal,
    closePhotoModal,
  } = usePropertyPage({ initialProperty });

  return (
    <>
      {property && <PropertySEO property={property} />}
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pb-8">
          <PropertyPageLayout
            property={property}
            isLoading={isLoading}
            error={error}
            similarProperties={similarProperties}
            isPhotoModalOpen={isPhotoModalOpen}
            photoModalIndex={photoModalIndex}
            onBackToResults={handleBackToResults}
            onOpenPhotoModal={openPhotoModal}
            onClosePhotoModal={closePhotoModal}
          />
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

    return {
      props: {
        property: null,
        error: 'Failed to load property',
      },
    };
  }
};
