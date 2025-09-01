import { useState } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@/contexts/ToastContext';
import {
  propertiesLandlordApi,
  PropertyLandlordCreateDto,
} from '@/lib/properties/for-landlord/api';
import {
  PropertyType,
} from '@/types/properties/public-types';
import {
  validateCreateListing,
  validateField,
} from '@/validation/listingValidation';

interface FormState {
  formData: PropertyLandlordCreateDto;
  validationErrors: Record<string, string>;
  isSubmitting: boolean;
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
  handleAI: (data: AIData) => void;
  resetForm: () => void;
}

interface AIData {
  title?: string;
  description?: string;
  tags?: string[];
  highlights?: string[];
  city?: string;
  price?: number;
}

interface UseAddPropertyForm extends FormState, InputHandlers, PhotoHandlers, FormActions {}

const initialFormData: PropertyLandlordCreateDto = {
  type: PropertyType.RENT,
  price: 0,
  city: '',
  country: '',
  latitude: undefined,
  longitude: undefined,
  title: '',
  description: '',
  photos: [''],
  features: {
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    parkingSpaces: 0,
    homeType: 'apartment',
    laundry: 'none',
    heating: 'central',
    furnished: false,
    petsAllowed: false,
    smokingAllowed: false,
    balcony: false,
    garden: false,
    garage: false,
    elevator: false,
    airConditioning: false,
    dishwasher: false,
    washerDryer: false,
    internet: false,
    cable: false,
  },
  isPopular: false,
  isActive: true,
};

export const useAddProperty = (): UseAddPropertyForm => {
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] =
    useState<PropertyLandlordCreateDto>(initialFormData);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const { [field]: _, ...rest } = prev;
        void _;
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
      latitude: coords?.lat,
      longitude: coords?.lng,
    }));

    if (validationErrors.city) {
      setValidationErrors((prev) => {
        const { city: _, ...rest } = prev;
        void _;
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
        const { [fieldPath]: _, ...rest } = prev;
        void _;
        return rest;
      });
    }

    const numericFields = ['bedrooms', 'bathrooms', 'area', 'parkingSpaces', 'yearBuilt'];
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
      const { [fieldKey]: _, ...rest } = prev;
      void _;
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
      photos: prev.photos?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleAI = (data: AIData) => {
    setFormData((prev) => ({
      ...prev,
      ...(data.title && { title: data.title }),
      ...(data.description && { description: data.description }),
      ...(data.city && { city: data.city }),
      ...(data.price && { price: data.price }),
    }));

    const fieldsToUpdate = ['title', 'description', 'city', 'price'];
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      fieldsToUpdate.forEach(field => {
        if (data[field as keyof AIData]) delete newErrors[field];
      });
      return newErrors;
    });

    showSuccess('AI description applied!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const filteredPhotos =
      formData.photos?.filter((photo) => photo.trim() !== '') || [];

    const dataToValidate = {
      ...formData,
      price: Number(formData.price),
      photos: filteredPhotos,
    };

    const validation = validateCreateListing(dataToValidate);

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
      await propertiesLandlordApi.create(dataToValidate);
      showSuccess('Listing created successfully!');
      router.push('/landlord/my-listings');
    } catch {
      showError('Failed to create listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setValidationErrors({});
    setIsSubmitting(false);
  };

  return {
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
    resetForm,
  };
};
