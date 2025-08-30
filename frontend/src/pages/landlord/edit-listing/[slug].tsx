import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AppLayout from '@/components/layout/AppLayout';
import { useUser } from '@/hooks/auth/useUser';
import LoadingState from '@/components/shared/LoadingState';
import ErrorState from '@/components/shared/ErrorState';
import { ButtonLoading } from '@/components/ui/Loading';
import Button from '@/components/ui/Button/Button';
import { useEditListing } from '@/hooks/landlord/listing/useEditListing';
import {
  BasicInformationSection,
  PropertyPhotosSection,
  PropertyFeaturesSection,
  ListingSettingsSection,
  EditListingInformationSection,
} from '@/components/landlord/AddListing';

const EditListingPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: userInfo, isLoading: userLoading } = useUser();
  
  const {
    formData,
    validationErrors,
    isSubmitting,
    isLoading,
    property,
    error,
    
    handleChange,
    handleCity,
    handleFeature,
    handlePhoto,
    addPhoto,
    removePhoto,
    
    handleSubmit,
  } = useEditListing(slug);

  if (userLoading || isLoading) {
    return <LoadingState />;
  }

  if (!userInfo || userInfo.role !== 'landlord') {
    return null;
  }

  if (error || !property) {
    return (
      <AppLayout userRole={userInfo.role} userInfo={userInfo}>
        <ErrorState
          error={error || 'Property not found'}
          onRetry={() => router.reload()}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout userRole={userInfo.role} userInfo={userInfo}>
      <Head>
        <title>Edit Listing: {property.title} | Property Manager</title>
      </Head>

      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Listing</h1>
          <p className="text-gray-600 mt-2">
            Update your property listing details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          <BasicInformationSection
            formData={formData}
            validationErrors={validationErrors}
            onInputChange={handleChange}
            onCitySelect={handleCity}
          />

          <PropertyPhotosSection
            photos={formData.photos || ['']}
            validationErrors={validationErrors}
            onPhotoChange={handlePhoto}
            onAddPhoto={addPhoto}
            onRemovePhoto={removePhoto}
          />

          <PropertyFeaturesSection
            features={formData.features || {}}
            validationErrors={validationErrors}
            onFeatureChange={handleFeature}
          />

          <EditListingInformationSection property={property} />

          <ListingSettingsSection
            isPopular={formData.isPopular || false}
            isActive={formData.isActive !== false}
            onIsPopularChange={(value) => handleChange('isPopular', value)}
            onIsActiveChange={(value) => handleChange('isActive', value)}
          />

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/landlord/my-listings')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <ButtonLoading />
                  <span>Updating...</span>
                </div>
              ) : (
                'Update Listing'
              )}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default EditListingPage;
