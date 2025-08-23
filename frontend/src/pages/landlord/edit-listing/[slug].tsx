import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AppLayout from '@/components/layout/AppLayout';
import { useUser } from '@/hooks/auth/useUser';
import { useToast } from '@/hooks/useToast';
import LoadingState from '@/components/shared/LoadingState';
import ErrorState from '@/components/shared/ErrorState';
import Button from '@/components/ui/Button/Button';
import EditableInput from '@/components/common/EditableInput';
import EditableSelect from '@/components/common/EditableSelect';
import {
  propertiesLandlordApi,
  PropertyLandlordUpdateDto,
  PropertyLandlordDto,
} from '@/lib/properties/for-landlord/api';
import {
  PropertyType,
  PropertyFeatures,
} from '@/types/properties/public-types';
import { validateUpdateListing } from '@/validation/listingValidation';

const EditListingPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: userInfo, isLoading: userLoading } = useUser();
  const { showSuccess, showError } = useToast();

  const [property, setProperty] = useState<PropertyLandlordDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const [formData, setFormData] = useState<PropertyLandlordUpdateDto>({
    type: PropertyType.RENT,
    price: 0,
    city: '',
    country: '',
    title: '',
    description: '',
    photos: [''],
    features: {},
    isPopular: false,
    isActive: true,
  });

  useEffect(() => {
    const fetchProperty = async () => {
      if (!slug || typeof slug !== 'string') return;

      try {
        setIsLoading(true);
        const propertyData = await propertiesLandlordApi.findOne(slug);
        setProperty(propertyData);
        setFormData({
          type: propertyData.type,
          price: propertyData.price,
          city: propertyData.city,
          country: propertyData.country,
          title: propertyData.title || '',
          description: propertyData.description || '',
          photos: propertyData.photos.length > 0 ? propertyData.photos : [''],
          features: propertyData.features || {},
          isPopular: propertyData.isPopular,
          isActive: propertyData.isActive,
        });
      } catch {
        setError('Failed to load property');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [slug]);

  const handleInputChange = (
    field: keyof PropertyLandlordUpdateDto,
    value: string | number | boolean | PropertyFeatures
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));


    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFeatureChange = (
    field: keyof PropertyFeatures,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      features: { ...prev.features, [field]: value },
    }));

    const fieldPath = `features.${field}`;
    if (validationErrors[fieldPath]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldPath];
        return newErrors;
      });
    }
  };

  const handlePhotoChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newPhotos = [...(prev.photos || [''])];
      newPhotos[index] = value;
      return { ...prev, photos: newPhotos };
    });
  };

  const addPhotoField = () => {
    setFormData((prev) => ({
      ...prev,
      photos: [...(prev.photos || []), ''],
    }));
  };

  const removePhotoField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos?.filter((_, i) => i !== index) || [''],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug || typeof slug !== 'string') return;

    const filteredPhotos =
      formData.photos?.filter((photo) => photo.trim() !== '') || [];

    const dataToValidate = {
      ...formData,
      photos: filteredPhotos,
    };


    const validation = validateUpdateListing(dataToValidate);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      showError('Please fix the validation errors before submitting');

      const firstErrorElement = document.querySelector('[data-error="true"]');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
      return;
    }

    setIsSubmitting(true);
    setValidationErrors({}); 

    try {
      await propertiesLandlordApi.update(slug, dataToValidate);
      showSuccess('Listing updated successfully!');
      router.push('/landlord/my-listings');
    } catch {
      showError('Failed to update listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const propertyTypeOptions = [
    { value: PropertyType.RENT, label: 'For Rent' },
    { value: PropertyType.SELL, label: 'For Sale' },
  ];

  const homeTypeOptions = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'studio', label: 'Studio' },
  ];

  const laundryOptions = [
    { value: 'none', label: 'None' },
    { value: 'in-unit', label: 'In Unit' },
    { value: 'shared', label: 'Shared' },
  ];

  const heatingOptions = [
    { value: 'central', label: 'Central' },
    { value: 'electric', label: 'Electric' },
    { value: 'gas', label: 'Gas' },
    { value: 'oil', label: 'Oil' },
    { value: 'none', label: 'None' },
  ];

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

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EditableSelect
                fieldName="type"
                label="Property Type *"
                options={propertyTypeOptions}
                value={formData.type}
                onChange={(e) =>
                  handleInputChange('type', e.target.value as PropertyType)
                }
                error={validationErrors.type}
              />

              <EditableInput
                fieldName="price"
                label={`Price * (${formData.type === PropertyType.RENT ? 'per month' : 'total'})`}
                placeholder="Enter price"
                type="number"
                value={formData.price?.toString() || ''}
                onChange={(e) =>
                  handleInputChange('price', Number(e.target.value))
                }
                required
                error={validationErrors.price}
              />

              <EditableInput
                fieldName="title"
                label="Title *"
                placeholder="e.g., Beautiful 2BR Apartment with City View"
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />

              <EditableInput
                fieldName="city"
                label="City *"
                placeholder="Enter city"
                type="text"
                value={formData.city || ''}
                onChange={(e) => handleInputChange('city', e.target.value)}
                required
              />

              <EditableInput
                fieldName="country"
                label="Country *"
                placeholder="Enter country"
                type="text"
                value={formData.country || ''}
                onChange={(e) => handleInputChange('country', e.target.value)}
                required
              />
            </div>

            <div className="mt-6">
              <div className="flex flex-col gap-1">
                <label className="block text-body-sm-medium text-primary-black">
                  Description
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) =>
                    handleInputChange('description', e.target.value)
                  }
                  className="mt-1 block w-full px-4 py-3 border bg-purple-50 font-medium border-purple-300 rounded-md placeholder-primary-black/50 focus:ring-1 focus:outline-none focus:ring-primary-violet focus:border-primary-violet text-body-md focus:bg-white"
                  rows={4}
                  placeholder="Describe your property..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-6">Property Photos</h2>
            <div className="space-y-4">
              {formData.photos?.map((photo, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <EditableInput
                      fieldName={`photo-${index}`}
                      label={`Photo ${index + 1} URL`}
                      placeholder="https://example.com/photo.jpg"
                      type="url"
                      value={photo}
                      onChange={(e) => handlePhotoChange(index, e.target.value)}
                    />
                  </div>
                  {formData.photos && formData.photos.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removePhotoField(index)}
                      className="mb-1"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPhotoField}
              >
                Add Another Photo
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-6">Property Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <EditableInput
                fieldName="bedrooms"
                label="Bedrooms"
                placeholder="0"
                type="number"
                value={formData.features?.bedrooms?.toString() || '0'}
                onChange={(e) =>
                  handleFeatureChange('bedrooms', Number(e.target.value))
                }
              />

              <EditableInput
                fieldName="bathrooms"
                label="Bathrooms"
                placeholder="0"
                type="number"
                value={formData.features?.bathrooms?.toString() || '0'}
                onChange={(e) =>
                  handleFeatureChange('bathrooms', Number(e.target.value))
                }
              />

              <EditableInput
                fieldName="area"
                label="Area (m²)"
                placeholder="0"
                type="number"
                value={formData.features?.area?.toString() || '0'}
                onChange={(e) =>
                  handleFeatureChange('area', Number(e.target.value))
                }
              />

              <EditableInput
                fieldName="parkingSpaces"
                label="Parking Spaces"
                placeholder="0"
                type="number"
                value={formData.features?.parkingSpaces?.toString() || '0'}
                onChange={(e) =>
                  handleFeatureChange('parkingSpaces', Number(e.target.value))
                }
              />

              <EditableSelect
                fieldName="homeType"
                label="Home Type"
                options={homeTypeOptions}
                value={formData.features?.homeType || 'apartment'}
                onChange={(e) =>
                  handleFeatureChange('homeType', e.target.value)
                }
              />

              <EditableInput
                fieldName="yearBuilt"
                label="Year Built"
                placeholder="e.g., 2020"
                type="number"
                value={formData.features?.yearBuilt?.toString() || ''}
                onChange={(e) =>
                  handleFeatureChange('yearBuilt', Number(e.target.value))
                }
              />

              <EditableSelect
                fieldName="laundry"
                label="Laundry"
                options={laundryOptions}
                value={formData.features?.laundry || 'none'}
                onChange={(e) => handleFeatureChange('laundry', e.target.value)}
              />

              <EditableSelect
                fieldName="heating"
                label="Heating"
                options={heatingOptions}
                value={formData.features?.heating || 'central'}
                onChange={(e) => handleFeatureChange('heating', e.target.value)}
              />
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: 'furnished', label: 'Furnished' },
                  { key: 'petsAllowed', label: 'Pets Allowed' },
                  { key: 'smokingAllowed', label: 'Smoking Allowed' },
                  { key: 'balcony', label: 'Balcony' },
                  { key: 'garden', label: 'Garden' },
                  { key: 'garage', label: 'Garage' },
                  { key: 'elevator', label: 'Elevator' },
                  { key: 'airConditioning', label: 'Air Conditioning' },
                  { key: 'dishwasher', label: 'Dishwasher' },
                  { key: 'washerDryer', label: 'Washer/Dryer' },
                  { key: 'internet', label: 'Internet' },
                  { key: 'cable', label: 'Cable TV' },
                ].map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={
                        (formData.features?.[
                          key as keyof PropertyFeatures
                        ] as boolean) || false
                      }
                      onChange={(e) =>
                        handleFeatureChange(
                          key as keyof PropertyFeatures,
                          e.target.checked
                        )
                      }
                      className="rounded border-purple-300 text-primary-violet focus:ring-primary-violet h-4 w-4"
                    />
                    <span className="text-sm text-primary-black">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-6">Listing Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Created:</span>{' '}
                  {new Date(property.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Last Updated:</span>{' '}
                  {new Date(property.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Property Slug:</span>{' '}
                  {property.slug}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-6">Listing Settings</h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPopular || false}
                  onChange={(e) =>
                    handleInputChange('isPopular', e.target.checked)
                  }
                  className="rounded border-purple-300 text-primary-violet focus:ring-primary-violet h-4 w-4"
                />
                <span className="text-sm text-primary-black">
                  Mark as Popular
                </span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive !== false}
                  onChange={(e) =>
                    handleInputChange('isActive', e.target.checked)
                  }
                  className="rounded border-purple-300 text-primary-violet focus:ring-primary-violet h-4 w-4"
                />
                <span className="text-sm text-primary-black">
                  Active (visible to tenants)
                </span>
              </label>
            </div>
          </div>

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
              {isSubmitting ? 'Updating...' : 'Update Listing'}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default EditListingPage;
