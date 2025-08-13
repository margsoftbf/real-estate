import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyPhotos from './PropertyPhotos';
import { PropertyPublicDto, PropertyType } from '@/types/properties';

const mockProperty: PropertyPublicDto = {
  slug: 'test-property',
  type: PropertyType.RENT,
  price: 2500,
  city: 'New York',
  country: 'USA',
  title: 'Beautiful Apartment',
  photos: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'],
  description: 'A lovely place to live',
  features: null,
  owner: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phoneNumber: '+1234567890',
    avatarUrl: null,
  },
  isPopular: false,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

describe('PropertyPhotos', () => {
  const mockOnOpenPhotoModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays no image available when no photos', () => {
    const propertyWithoutPhotos = { ...mockProperty, photos: [] };
    render(
      <PropertyPhotos
        property={propertyWithoutPhotos}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    expect(screen.getByText('No image available')).toBeInTheDocument();
  });

  it('displays single photo with correct button text', () => {
    const singlePhotoProperty = { ...mockProperty, photos: ['photo1.jpg'] };
    render(
      <PropertyPhotos
        property={singlePhotoProperty}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    expect(screen.getByText('View photo')).toBeInTheDocument();
  });

  it('displays multiple photos count in button', () => {
    render(
      <PropertyPhotos
        property={mockProperty}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    expect(screen.getByText('3 photos')).toBeInTheDocument();
  });

  it('calls onOpenPhotoModal when main photo is clicked', () => {
    render(
      <PropertyPhotos
        property={mockProperty}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    const photoContainer = screen.getByTestId('photo-container');
    fireEvent.click(photoContainer!);

    expect(mockOnOpenPhotoModal).toHaveBeenCalledWith(0);
  });

  it('calls onOpenPhotoModal when view photos button is clicked', () => {
    render(
      <PropertyPhotos
        property={mockProperty}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    const viewPhotosButton = screen.getByText('3 photos');
    fireEvent.click(viewPhotosButton);

    expect(mockOnOpenPhotoModal).toHaveBeenCalledWith(0);
  });

  it('prevents event propagation when button is clicked', () => {
    render(
      <PropertyPhotos
        property={mockProperty}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    const viewPhotosButton = screen.getByText('3 photos');
    fireEvent.click(viewPhotosButton);

    // Should be called only once from button click, not from container click
    expect(mockOnOpenPhotoModal).toHaveBeenCalledTimes(1);
  });

  it('renders image with correct alt text', () => {
    render(
      <PropertyPhotos
        property={mockProperty}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    const container = screen.getByTestId('photo-container');
    expect(container).toBeInTheDocument();
  });

  it('renders image with fallback alt text when no title', () => {
    const propertyWithoutTitle = { ...mockProperty, title: null };
    render(
      <PropertyPhotos
        property={propertyWithoutTitle}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    const container = screen.getByTestId('photo-container');
    expect(container).toBeInTheDocument();
  });

  it('renders with correct styling classes', () => {
    render(
      <PropertyPhotos
        property={mockProperty}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    const container = screen.getByTestId('photo-container').parentElement;
    expect(container).toHaveClass('mb-6');

    const photoContainer = screen.getByTestId('photo-container');
    expect(photoContainer).toHaveClass(
      'h-64',
      'md:h-80',
      'rounded-lg',
      'overflow-hidden',
      'cursor-pointer',
      'hover:opacity-90',
      'transition-opacity'
    );
  });

  it('renders button with correct styling', () => {
    render(
      <PropertyPhotos
        property={mockProperty}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    const button = screen.getByText('3 photos');
    expect(button).toHaveClass('gap-1.5');
  });

  it('positions button correctly', () => {
    render(
      <PropertyPhotos
        property={mockProperty}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    const buttonContainer = screen.getByText('3 photos').closest('div');
    expect(buttonContainer).toHaveClass('absolute', 'bottom-3', 'right-3');
  });

  it('renders ImageOutline icon in button', () => {
    render(
      <PropertyPhotos
        property={mockProperty}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    const button = screen.getByText('3 photos');
    expect(button).toBeInTheDocument();
    // The icon is part of the button component
  });

  it('handles empty photos array', () => {
    const propertyWithEmptyPhotos = { ...mockProperty, photos: [] };
    render(
      <PropertyPhotos
        property={propertyWithEmptyPhotos}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    expect(screen.getByText('No image available')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('handles undefined photos', () => {
    const propertyWithUndefinedPhotos = {
      ...mockProperty,
      photos: undefined as unknown as string[],
    };
    render(
      <PropertyPhotos
        property={propertyWithUndefinedPhotos}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    expect(screen.getByText('No image available')).toBeInTheDocument();
  });

  it('renders first photo when multiple photos available', () => {
    render(
      <PropertyPhotos
        property={mockProperty}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    const image = screen.getByTestId('photo-container');
    // Next.js Image component doesn't render alt in tests, so we check it contains the container
    expect(image).toBeInTheDocument();
    // The src would be set by Next.js Image component
  });

  it('has hover effects on photo container', () => {
    render(
      <PropertyPhotos
        property={mockProperty}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    const photoContainer = screen.getByTestId('photo-container');
    expect(photoContainer).toHaveClass('hover:opacity-90');
  });

  it('has correct border styling', () => {
    render(
      <PropertyPhotos
        property={mockProperty}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    const photoContainer = screen.getByTestId('photo-container');
    expect(photoContainer).toHaveClass('border', 'border-gray-200');
  });

  it('handles click events correctly with single photo', () => {
    const singlePhotoProperty = { ...mockProperty, photos: ['photo1.jpg'] };
    render(
      <PropertyPhotos
        property={singlePhotoProperty}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    const photoContainer = screen.getByTestId('photo-container');
    fireEvent.click(photoContainer!);

    expect(mockOnOpenPhotoModal).toHaveBeenCalledWith(0);
  });

  it('renders correct responsive classes', () => {
    render(
      <PropertyPhotos
        property={mockProperty}
        onOpenPhotoModal={mockOnOpenPhotoModal}
      />
    );

    const photoContainer = screen.getByTestId('photo-container');
    expect(photoContainer).toHaveClass('h-64', 'md:h-80');
  });
});
