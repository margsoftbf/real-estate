import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
import { propertyQueryKeys } from '@/lib/properties/query-keys';

interface FormState {
  formData: PropertyLandlordUpdateDto;
  validationErrors: Record<string, string>;
  property: PropertyLandlordDto | null;
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
    FormActions {
  isSubmitting: boolean;
  isLoading: boolean;
  error: string | null;
}

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
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] =
    useState<PropertyLandlordUpdateDto>(initialFormData);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const propertySlug = typeof slug === 'string' ? slug : undefined;

  const {
    data: property,
    isLoading,
    error,
  } = useQuery({
    queryKey: propertyQueryKeys.landlord.detail(propertySlug || ''),
    queryFn: () => propertiesLandlordApi.findOne(propertySlug!),
    enabled: !!propertySlug,
    staleTime: 5 * 60 * 1000,
  });

  const updatePropertyMutation = useMutation({
    mutationFn: (data: PropertyLandlordUpdateDto) =>
      propertiesLandlordApi.update(propertySlug!, data),
    onSuccess: (updatedProperty) => {
      queryClient.invalidateQueries({ queryKey: propertyQueryKeys.landlord.all() });
      queryClient.setQueryData(
        propertyQueryKeys.landlord.detail(propertySlug!),
        updatedProperty
      );
      showSuccess('Listing updated successfully!');
      router.push('/landlord/my-listings');
    },
    onError: () => {
      showError('Failed to update listing. Please try again.');
    },
  });

  const updatePriceMutation = useMutation({
    mutationFn: ({ price, reason }: { price: number; reason: string }) =>
      propertiesLandlordApi.update(propertySlug!, {
        price,
        priceChangeReason: reason,
      }),
    onMutate: async ({ price }) => {
      await queryClient.cancelQueries({
        queryKey: propertyQueryKeys.landlord.detail(propertySlug!),
      });

      const previousProperty = queryClient.getQueryData(
        propertyQueryKeys.landlord.detail(propertySlug!)
      );

      queryClient.setQueryData(
        propertyQueryKeys.landlord.detail(propertySlug!),
        (old: PropertyLandlordDto | undefined) =>
          old ? { ...old, price } : undefined
      );

      setFormData(prev => ({ ...prev, price }));

      return { previousProperty };
    },
    onSuccess: (updatedProperty) => {
      queryClient.invalidateQueries({ queryKey: propertyQueryKeys.landlord.all() });
      queryClient.setQueryData(
        propertyQueryKeys.landlord.detail(propertySlug!),
        updatedProperty
      );
      showSuccess(`Price updated to $${updatedProperty.price.toLocaleString()} successfully!`);
    },
    onError: (error: unknown, variables, context) => {
      if (context?.previousProperty) {
        queryClient.setQueryData(
          propertyQueryKeys.landlord.detail(propertySlug!),
          context.previousProperty
        );
        setFormData(prev => ({ ...prev, price: (context.previousProperty as PropertyLandlordDto).price }));
      }

      console.error('Price update error:', error);
      const errorMessage = error && typeof error === 'object' && 'response' in error
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
        : undefined;
      showError(
        errorMessage || 'Failed to update price. Please try again.'
      );
    },
  });

  useEffect(() => {
    if (property) {
      setFormData({
        type: property.type,
        price: property.price,
        city: property.city,
        country: property.country,
        latitude:
          typeof property.latitude === 'string'
            ? parseFloat(property.latitude)
            : property.latitude,
        longitude:
          typeof property.longitude === 'string'
            ? parseFloat(property.longitude)
            : property.longitude,
        title: property.title || '',
        description: property.description || '',
        photos: property.photos.length > 0 ? property.photos : [''],
        features: property.features || {},
        isPopular: property.isPopular,
        isActive: property.isActive,
      });
    }
  }, [property]);

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
    if (!propertySlug) return;
    updatePriceMutation.mutate({ price: newPrice, reason });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertySlug) return;

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

    setValidationErrors({});
    updatePropertyMutation.mutate(dataToValidate);
  };

  return {
    formData,
    validationErrors,
    isSubmitting: updatePropertyMutation.isPending || updatePriceMutation.isPending,
    isLoading,
    property: property || null,
    error: error ? 'Failed to load property' : null,

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