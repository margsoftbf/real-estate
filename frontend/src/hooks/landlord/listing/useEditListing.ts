import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@/contexts/ToastContext';
import {
  propertiesLandlordApi,
  PropertyLandlordUpdateDto,
  PropertyLandlordDto,
} from '@/lib/properties/for-landlord/api';
import { PropertyType } from '@/types/properties/public-types';
import {
  validateUpdateListing,
  validateField,
} from '@/validation/listingValidation';

interface FormState {
  formData: PropertyLandlordUpdateDto;
  validationErrors: Record<string, string>;
  isSubmitting: boolean;
  isLoading: boolean;
  property: PropertyLandlordDto | null;
  error: string | null;
}

interface InputHandlers {
  handleChange: (field: string, value: string | number | boolean) => void;
  handleCity: (city: string, coords?: { lat: number; lng: number }) => void;
  handleFeature: (field: string, value: string | number | boolean) => void;
}

interface PhotoHandlers {
  handlePhoto: (index: number, value: string) => void;
  addPhoto: () => void;
  removePhoto: (index: number) => void;
}

interface FormActions {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handlePriceChange: (newPrice: number, reason: string) => Promise<void>;
}

interface UseEditListingForm
  extends FormState,
    InputHandlers,
    PhotoHandlers,
    FormActions {}

const initialFormData: PropertyLandlordUpdateDto = {
  type: PropertyType.RENT,
  price: 0,
  city: '',
  country: '',
  latitude: undefined,
  longitude: undefined,
  title: '',
  description: '',
  photos: [''],
  features: {},
  isPopular: false,
  isActive: true,
};

export const useEditListing = (
  slug: string | string[] | undefined
): UseEditListingForm => {
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const [property, setProperty] = useState<PropertyLandlordDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] =
    useState<PropertyLandlordUpdateDto>(initialFormData);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          latitude:
            typeof propertyData.latitude === 'string'
              ? parseFloat(propertyData.latitude)
              : propertyData.latitude,
          longitude:
            typeof propertyData.longitude === 'string'
              ? parseFloat(propertyData.longitude)
              : propertyData.longitude,
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

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const { [field]: removed, ...rest } = prev;
        void removed;
        return rest;
      });
    }

    const validationFields = ['title', 'price', 'city', 'country'];
    if (validationFields.includes(field) && typeof value !== 'boolean') {
      const validation = validateField(
        field as keyof typeof import('@/validation/listingValidation').fieldValidationSchemas,
        value as string | number
      );
      if (!validation.isValid) {
        setValidationErrors((prev) => ({
          ...prev,
          [field]: validation.error || 'Invalid value',
        }));
      }
    }
  };

  const handleCity = (city: string, coords?: { lat: number; lng: number }) => {
    setFormData((prev) => ({
      ...prev,
      city,
      latitude: coords?.lat || prev.latitude,
      longitude: coords?.lng || prev.longitude,
    }));

    if (validationErrors.city) {
      setValidationErrors((prev) => {
        const { city: removed, ...rest } = prev;
        void removed;
        return rest;
      });
    }
  };

  const handleFeature = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      features: { ...prev.features, [field]: value },
    }));

    const fieldPath = `features.${field}`;
    if (validationErrors[fieldPath]) {
      setValidationErrors((prev) => {
        const { [fieldPath]: removed, ...rest } = prev;
        void removed;
        return rest;
      });
    }

    const numericFields = [
      'bedrooms',
      'bathrooms',
      'area',
      'parkingSpaces',
      'yearBuilt',
    ];
    if (numericFields.includes(field) && typeof value !== 'boolean') {
      const validation = validateField(
        field as keyof typeof import('@/validation/listingValidation').fieldValidationSchemas,
        value as string | number
      );
      if (!validation.isValid) {
        setValidationErrors((prev) => ({
          ...prev,
          [fieldPath]: validation.error || 'Invalid value',
        }));
      }
    }
  };

  const handlePhoto = (index: number, value: string) => {
    setFormData((prev) => {
      const photos = [...(prev.photos || [])];
      photos[index] = value;
      return { ...prev, photos };
    });

    const fieldKey = `photos.${index}`;
    if (value.trim()) {
      const validation = validateField('photoUrl', value);
      if (!validation.isValid) {
        setValidationErrors((prev) => ({
          ...prev,
          [fieldKey]: validation.error || 'Invalid URL',
        }));
        return;
      }
    }

    setValidationErrors((prev) => {
      const { [fieldKey]: removed, ...rest } = prev;
      void removed;
      return rest;
    });
  };

  const addPhoto = () => {
    setFormData((prev) => ({
      ...prev,
      photos: [...(prev.photos || []), ''],
    }));
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos?.filter((_, i) => i !== index) || [''],
    }));
  };

  const handlePriceChange = async (newPrice: number, reason: string) => {
    if (!slug || typeof slug !== 'string') return;
    
    setIsSubmitting(true);
    
    try {
      await propertiesLandlordApi.update(slug, {
        price: newPrice,
        priceChangeReason: reason,
      });
      
      // Update the property state with new price
      if (property) {
        setProperty({ ...property, price: newPrice });
      }
      
      // Update form data
      setFormData(prev => ({ ...prev, price: newPrice }));
      
      showSuccess(`Price updated to $${newPrice.toLocaleString()} successfully!`);
    } catch (error: unknown) {
      console.error('Price update error:', error);
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
        : undefined;
      showError(
        errorMessage || 'Failed to update price. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug || typeof slug !== 'string') return;

    const filteredPhotos =
      formData.photos?.filter((photo) => photo.trim() !== '') || [];

    const dataToValidate = {
      ...formData,
      price: Number(formData.price),
      latitude: formData.latitude || undefined,
      longitude: formData.longitude || undefined,
      photos: filteredPhotos,
    };

    const validation = validateUpdateListing(dataToValidate);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);

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

  return {
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
    
    handlePriceChange,
    handleSubmit,
  };
};
