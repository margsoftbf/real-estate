import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AppLayout from '@/components/layout/AppLayout';
import { useUser } from '@/hooks/auth/useUser';
import LoadingState from '@/components/shared/LoadingState';
import { ButtonLoading } from '@/components/ui/Loading';
import Button from '@/components/ui/Button/Button';
import { useAddProperty } from '@/hooks/landlord/listing/useAddProperty';
import {
  BasicInformationSection,
  PropertyPhotosSection,
  PropertyFeaturesSection,
  ListingSettingsSection,
  AIGeneratorSection,
} from '@/components/landlord/AddListing';

const AddListingPage = () => {
  const router = useRouter();
  const { data: userInfo, isLoading: userLoading } = useUser();
  
  const {
    formData,
    validationErrors,
    isSubmitting,
    
    handleChange,
    handleCity,
    handleFeature,
    handlePhoto,
    addPhoto,
    removePhoto,
    
    handleSubmit,
    handleAI,
  } = useAddProperty();

  if (userLoading) {
    return <LoadingState />;
  }

  if (!userInfo || userInfo.role !== 'landlord') {
    return null;
  }

  return (
    <AppLayout userRole={userInfo.role} userInfo={userInfo}>
      <Head>
        <title>Add New Listing | Property Manager</title>
      </Head>

      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Add New Listing</h1>
          <p className="text-gray-600 mt-2">
            Create a new property listing for rent or sale
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          
          <AIGeneratorSection
            propertyType={formData.features?.homeType as 'apartment' | 'house' | 'studio' | 'room' || 'apartment'}
            location={formData.city ? `${formData.city}${formData.country ? `, ${formData.country}` : ''}` : 'Your Location'}
            onDescriptionGenerated={handleAI}
          />

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
                  <span>Creating...</span>
                </div>
              ) : (
                'Create Listing'
              )}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default AddListingPage;