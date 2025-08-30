import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useToast } from '@/contexts/ToastContext';
import { useAddProperty } from './useAddProperty';
import { propertiesLandlordApi } from '@/lib/properties/for-landlord/api';
import { PropertyType } from '@/types/properties/public-types';

// Mock dependencies
vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));
vi.mock('@/contexts/ToastContext');
vi.mock('@/lib/properties/for-landlord/api');

const mockRouter = {
  push: vi.fn(),
};
const mockToast = {
  showSuccess: vi.fn(),
  showError: vi.fn(),
};

describe('useAddProperty', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as unknown as Mock).mockReturnValue(mockRouter);
    (useToast as unknown as Mock).mockReturnValue(mockToast);
  });

  it('should initialize with default form data', () => {
    const { result } = renderHook(() => useAddProperty());

    expect(result.current.formData.type).toBe(PropertyType.RENT);
    expect(result.current.formData.price).toBe(0);
    expect(result.current.formData.city).toBe('');
    expect(result.current.formData.photos).toEqual(['']);
    expect(result.current.validationErrors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should handle input changes correctly', () => {
    const { result } = renderHook(() => useAddProperty());

    act(() => {
      result.current.handleChange('title', 'Test Property');
    });

    expect(result.current.formData.title).toBe('Test Property');
  });

  it('should handle city selection with coordinates', () => {
    const { result } = renderHook(() => useAddProperty());
    const coordinates = { lat: 40.7128, lng: -74.0060 };

    act(() => {
      result.current.handleCity('New York', coordinates);
    });

    expect(result.current.formData.city).toBe('New York');
    expect(result.current.formData.latitude).toBe(40.7128);
    expect(result.current.formData.longitude).toBe(-74.0060);
  });

  it('should handle feature changes correctly', () => {
    const { result } = renderHook(() => useAddProperty());

    act(() => {
      result.current.handleFeature('bedrooms', 2);
    });

    expect(result.current.formData.features?.bedrooms).toBe(2);
  });

  it('should add photo fields correctly', () => {
    const { result } = renderHook(() => useAddProperty());

    act(() => {
      result.current.addPhoto();
    });

    expect(result.current.formData.photos).toEqual(['', '']);
  });

  it('should remove photo fields correctly', () => {
    const { result } = renderHook(() => useAddProperty());

    // First add a photo field
    act(() => {
      result.current.addPhoto();
    });

    // Then remove the second one
    act(() => {
      result.current.removePhoto(1);
    });

    expect(result.current.formData.photos).toEqual(['']);
  });

  it('should handle AI generated data correctly', () => {
    const { result } = renderHook(() => useAddProperty());
    const aiData = {
      title: 'AI Generated Title',
      description: 'AI Generated Description',
      price: 1500,
    };

    act(() => {
      result.current.handleAI(aiData);
    });

    expect(result.current.formData.title).toBe('AI Generated Title');
    expect(result.current.formData.description).toBe('AI Generated Description');
    expect(result.current.formData.price).toBe(1500);
    expect(mockToast.showSuccess).toHaveBeenCalledWith('AI description applied!');
  });

  it('should handle form submission successfully', async () => {
    const { result } = renderHook(() => useAddProperty());
    
    // Set up valid form data
    act(() => {
      result.current.handleChange('title', 'Test Property Title');
      result.current.handleChange('price', 1000);
      result.current.handleCity('Test City');
      result.current.handleChange('country', 'Test Country');
    });

    // Mock successful API call
    (propertiesLandlordApi.create as unknown as Mock).mockResolvedValueOnce({});

    const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(propertiesLandlordApi.create).toHaveBeenCalled();
    expect(mockToast.showSuccess).toHaveBeenCalledWith('Listing created successfully!');
    expect(mockRouter.push).toHaveBeenCalledWith('/landlord/my-listings');
  });

  it('should handle form submission with validation errors', async () => {
    const { result } = renderHook(() => useAddProperty());
    
    const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(Object.keys(result.current.validationErrors).length).toBeGreaterThan(0);
    expect(mockToast.showError).toHaveBeenCalledWith('Please fix the validation errors before submitting');
  });

  it('should reset form correctly', () => {
    const { result } = renderHook(() => useAddProperty());

    // Make some changes
    act(() => {
      result.current.handleChange('title', 'Test Title');
      result.current.handleChange('price', 1000);
    });

    // Reset form
    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData.title).toBe('');
    expect(result.current.formData.price).toBe(0);
    expect(result.current.validationErrors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });
});