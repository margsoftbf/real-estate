import { PropertyPublicDto } from '@/types/properties';
import LoadingState from '@/components/shared/LoadingState';
import PhotoModal from '@/components/shared/PhotoModal';
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

interface PropertyPageLayoutProps {
  property: PropertyPublicDto | null;
  isLoading: boolean;
  error?: string;
  similarProperties: PropertyPublicDto[];
  isPhotoModalOpen: boolean;
  photoModalIndex: number;
  onBackToResults: () => void;
  onOpenPhotoModal: (index?: number) => void;
  onClosePhotoModal: () => void;
}

export default function PropertyPageLayout({
  property,
  isLoading,
  error,
  similarProperties,
  isPhotoModalOpen,
  photoModalIndex,
  onBackToResults,
  onOpenPhotoModal,
  onClosePhotoModal,
}: PropertyPageLayoutProps) {
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
    return <LoadingState className="flex justify-center items-center py-20" />;
  }

  return (
    <>
      <div className="lg:hidden bg-white border-b border-gray-100 sticky top-0 left-0 z-10">
        <BackToResultsButton onClick={onBackToResults} isMobile />
      </div>

      <BackToResultsButton onClick={onBackToResults} />

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
            onOpenPhotoModal={onOpenPhotoModal}
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
                onOpenPhotoModal={onOpenPhotoModal}
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
          onClose={onClosePhotoModal}
          photos={property.photos}
          initialIndex={photoModalIndex}
          propertyTitle={property.title || 'Property'}
        />
      )}
    </>
  );
}