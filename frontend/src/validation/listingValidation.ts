import { z } from 'zod';
import { PropertyType } from '@/types/properties/public-types';

const propertyFeaturesSchema = z.object({
  bedrooms: z.number().min(0, 'Bedrooms must be 0 or greater').optional(),
  bathrooms: z.number().min(0, 'Bathrooms must be 0 or greater').optional(),
  area: z.number().min(0, 'Area must be 0 or greater').optional(),
  parkingSpaces: z.number().min(0, 'Parking spaces must be 0 or greater').optional(),
  dateAvailable: z.string().optional(),
  homeType: z.enum(['house', 'condo', 'apartment', 'townhouse', 'studio']).optional(),
  laundry: z.enum(['in-unit', 'shared', 'none']).optional(),
  heating: z.enum(['central', 'electric', 'gas', 'oil', 'none']).optional(),
  yearBuilt: z.number()
    .min(1800, 'Year built must be after 1800')
    .max(new Date().getFullYear() + 1, 'Year built cannot be in the future')
    .optional(),
  furnished: z.boolean().optional(),
  petsAllowed: z.boolean().optional(),
  smokingAllowed: z.boolean().optional(),
  balcony: z.boolean().optional(),
  garden: z.boolean().optional(),
  garage: z.boolean().optional(),
  elevator: z.boolean().optional(),
  airConditioning: z.boolean().optional(),
  dishwasher: z.boolean().optional(),
  washerDryer: z.boolean().optional(),
  internet: z.boolean().optional(),
  cable: z.boolean().optional(),
});

export const createListingSchema = z.object({
  type: z.nativeEnum(PropertyType, {
    required_error: 'Property type is required',
  }),
  price: z.number()
    .min(1, 'Price must be greater than 0')
    .max(100000000, 'Price is too high'),
  city: z.string()
    .min(1, 'City is required')
    .max(100, 'City name is too long')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'City name contains invalid characters'),
  country: z.string()
    .min(1, 'Country is required')
    .max(100, 'Country name is too long')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Country name contains invalid characters'),
  title: z.string()
    .min(1, 'Title is required')
    .min(10, 'Title must be at least 10 characters')
    .max(200, 'Title is too long'),
  description: z.string()
    .max(2000, 'Description is too long')
    .optional(),
  photos: z.array(z.string().url('Invalid photo URL'))
    .max(20, 'Maximum 20 photos allowed')
    .optional(),
  features: propertyFeaturesSchema.optional(),
  isPopular: z.boolean().optional(),
  isActive: z.boolean().optional(),
})
.refine((data) => {
  if (data.type === PropertyType.RENT && data.price > 50000) {
    return false;
  }
  if (data.type === PropertyType.SELL && data.price < 1000) {
    return false;
  }
  return true;
}, {
  message: 'Price seems unrealistic for the property type',
  path: ['price'],
})
.refine((data) => {
  if (data.features?.bedrooms && data.features.bedrooms > 0 && 
      (!data.features.bathrooms || data.features.bathrooms === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Properties with bedrooms should have at least one bathroom',
  path: ['features', 'bathrooms'],
});

const baseUpdateSchema = z.object({
  type: z.nativeEnum(PropertyType).optional(),
  price: z.number()
    .min(1, 'Price must be greater than 0')
    .max(100000000, 'Price is too high')
    .optional(),
  city: z.string()
    .min(1, 'City is required')
    .max(100, 'City name is too long')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'City name contains invalid characters')
    .optional(),
  country: z.string()
    .min(1, 'Country is required')
    .max(100, 'Country name is too long')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Country name contains invalid characters')
    .optional(),
  title: z.string()
    .min(1, 'Title is required')
    .min(10, 'Title must be at least 10 characters')
    .max(200, 'Title is too long')
    .optional(),
  description: z.string()
    .max(2000, 'Description is too long')
    .optional(),
  photos: z.array(z.string().url('Invalid photo URL'))
    .max(20, 'Maximum 20 photos allowed')
    .optional(),
  features: propertyFeaturesSchema.optional(),
  isPopular: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const updateListingSchema = baseUpdateSchema;

export const fieldValidationSchemas = {
  title: z.string()
    .min(1, 'Title is required')
    .min(10, 'Title must be at least 10 characters')
    .max(200, 'Title is too long'),
  
  price: z.number()
    .min(1, 'Price must be greater than 0')
    .max(100000000, 'Price is too high'),
  
  city: z.string()
    .min(1, 'City is required')
    .max(100, 'City name is too long')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'City name contains invalid characters'),
  
  country: z.string()
    .min(1, 'Country is required')
    .max(100, 'Country name is too long')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Country name contains invalid characters'),
  
  description: z.string()
    .max(2000, 'Description is too long'),
  
  photoUrl: z.string().url('Invalid photo URL'),
  
  bedrooms: z.number().min(0, 'Bedrooms must be 0 or greater'),
  bathrooms: z.number().min(0, 'Bathrooms must be 0 or greater'),
  area: z.number().min(0, 'Area must be 0 or greater'),
  parkingSpaces: z.number().min(0, 'Parking spaces must be 0 or greater'),
  yearBuilt: z.number()
    .min(1800, 'Year built must be after 1800')
    .max(new Date().getFullYear() + 1, 'Year built cannot be in the future'),
};

export type CreateListingFormData = z.infer<typeof createListingSchema>;
export type UpdateListingFormData = z.infer<typeof updateListingSchema>;

export const validateField = (fieldName: keyof typeof fieldValidationSchemas, value: string | number) => {
  try {
    fieldValidationSchemas[fieldName].parse(value);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message || 'Invalid value' };
    }
    return { isValid: false, error: 'Validation error' };
  }
};

export const validateCreateListing = (data: unknown) => {
  try {
    createListingSchema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
};

export const validateUpdateListing = (data: unknown) => {
  try {
    updateListingSchema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
};