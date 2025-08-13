import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PropertyFeatures from './PropertyFeatures';
import { PropertyPublicDto } from '@/types/properties';

const mockProperty: PropertyPublicDto = {
  id: '1',
  slug: 'test-property',
  type: 'rent',
  price: 2500,
  city: 'New York',
  country: 'USA',
  title: 'Beautiful Apartment',
  photos: ['photo1.jpg'],
  description: 'A lovely place to live',
  features: {
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    homeType: 'apartment',
    yearBuilt: 2020,
    parkingSpaces: 1,
    laundry: 'in-unit',
    heating: 'central',
    furnished: true,
    petsAllowed: false,
    balcony: true,
    garden: false,
    garage: true,
    airConditioning: true,
    dishwasher: true,
    washerDryer: false,
  },
  owner: {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phoneNumber: '+1234567890',
    avatarUrl: null,
  },
  isPopular: false,
  isActive: true,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

describe('PropertyFeatures', () => {
  it('renders nothing when no features are provided', () => {
    const propertyWithoutFeatures = { ...mockProperty, features: null };
    const { container } = render(<PropertyFeatures property={propertyWithoutFeatures} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders property features title', () => {
    render(<PropertyFeatures property={mockProperty} />);
    expect(screen.getByText('Property features')).toBeInTheDocument();
  });

  it('displays property details with correct formatting', () => {
    render(<PropertyFeatures property={mockProperty} />);
    
    expect(screen.getByText('Property type')).toBeInTheDocument();
    expect(screen.getByText('Apartment')).toBeInTheDocument();
    
    expect(screen.getByText('Year built')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    
    expect(screen.getByText('Parking spaces')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('capitalizes property type correctly', () => {
    const propertyWithHouse = {
      ...mockProperty,
      features: { ...mockProperty.features!, homeType: 'house' as const }
    };
    
    render(<PropertyFeatures property={propertyWithHouse} />);
    expect(screen.getByText('House')).toBeInTheDocument();
  });

  it('formats laundry type correctly', () => {
    render(<PropertyFeatures property={mockProperty} />);
    
    expect(screen.getByText('Laundry')).toBeInTheDocument();
    expect(screen.getByText('In unit')).toBeInTheDocument();
  });

  it('formats heating type correctly', () => {
    render(<PropertyFeatures property={mockProperty} />);
    
    expect(screen.getByText('Heating')).toBeInTheDocument();
    expect(screen.getByText('Central')).toBeInTheDocument();
  });

  it('displays boolean features as Yes/No', () => {
    render(<PropertyFeatures property={mockProperty} />);
    
    expect(screen.getByText('Furnished')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    
    expect(screen.getByText('Pets allowed')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('displays amenities when they exist', () => {
    render(<PropertyFeatures property={mockProperty} />);
    
    expect(screen.getByText('Amenities')).toBeInTheDocument();
    expect(screen.getByText('Balcony')).toBeInTheDocument();
    expect(screen.getByText('Garage')).toBeInTheDocument();
    expect(screen.getByText('Air Conditioning')).toBeInTheDocument();
    expect(screen.getByText('Dishwasher')).toBeInTheDocument();
  });

  it('does not display false amenities', () => {
    render(<PropertyFeatures property={mockProperty} />);
    
    expect(screen.queryByText('Garden')).not.toBeInTheDocument();
    expect(screen.queryByText('Washer/Dryer')).not.toBeInTheDocument();
  });

  it('handles custom amenities with proper formatting', () => {
    const propertyWithCustomAmenity = {
      ...mockProperty,
      features: {
        ...mockProperty.features!,
        customFeature: true,
        anotherCustomAmenity: true,
      }
    };
    
    render(<PropertyFeatures property={propertyWithCustomAmenity} />);
    
    expect(screen.getByText('Custom Feature')).toBeInTheDocument();
    expect(screen.getByText('Another Custom Amenity')).toBeInTheDocument();
  });

  it('renders amenities with correct styling', () => {
    render(<PropertyFeatures property={mockProperty} />);
    
    const balconyAmenity = screen.getByText('Balcony');
    expect(balconyAmenity).toHaveClass('bg-primary-violet-dark', 'text-white');
  });

  it('renders property details with correct styling', () => {
    render(<PropertyFeatures property={mockProperty} />);
    
    const propertyTypeLabel = screen.getByText('Property type');
    expect(propertyTypeLabel).toHaveClass('text-primary-black/70');
    
    const propertyTypeValue = screen.getByText('Apartment');
    expect(propertyTypeValue).toHaveClass('text-primary-violet-dark');
  });

  it('excludes non-amenity features from amenities section', () => {
    render(<PropertyFeatures property={mockProperty} />);
    
    // These should appear in property details, not amenities
    expect(screen.queryByText('2')).toBeInTheDocument(); // bedrooms in property details
    
    // But bedrooms should not appear as an amenity pill
    const amenitiesSection = screen.getByText('Amenities').closest('div');
    expect(amenitiesSection).not.toHaveTextContent('Bedrooms');
  });

  it('renders container with correct styling', () => {
    render(<PropertyFeatures property={mockProperty} />);
    
    const container = screen.getByText('Property features').closest('div');
    expect(container).toHaveClass('mb-6');
    
    const featuresContainer = screen.getByText('Apartment').closest('div')?.closest('div');
    expect(featuresContainer).toHaveClass('bg-white', 'border-2', 'border-purple-300');
  });

  it('shows amenities section only when amenities exist', () => {
    const propertyWithNoAmenities = {
      ...mockProperty,
      features: {
        homeType: 'apartment' as const,
        yearBuilt: 2020,
        // No boolean amenities
      }
    };
    
    render(<PropertyFeatures property={propertyWithNoAmenities} />);
    
    expect(screen.queryByText('Amenities')).not.toBeInTheDocument();
  });

  it('shows property details section only when details exist', () => {
    const propertyWithOnlyAmenities = {
      ...mockProperty,
      features: {
        balcony: true,
        garage: true,
        // No property details
      }
    };
    
    render(<PropertyFeatures property={propertyWithOnlyAmenities} />);
    
    expect(screen.getByText('Amenities')).toBeInTheDocument();
    expect(screen.queryByText('Property type')).not.toBeInTheDocument();
  });

  it('handles mixed case and special characters in custom amenities', () => {
    const propertyWithSpecialAmenities = {
      ...mockProperty,
      features: {
        ...mockProperty.features!,
        wiFiIncluded: true,
        poolAccess: true,
      }
    };
    
    render(<PropertyFeatures property={propertyWithSpecialAmenities} />);
    
    expect(screen.getByText('Wi Fi Included')).toBeInTheDocument();
    expect(screen.getByText('Pool Access')).toBeInTheDocument();
  });
});