import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BasicInformationSection from './BasicInformationSection';
import { PropertyType } from '@/types/properties/public-types';


vi.mock('@/components/common/EditableCitySearch', () => ({
  default: ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (value: string) => void, placeholder: string }) => (
    <div>
      <label>{label}</label>
      <input
        data-testid="city-search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  ),
}));


vi.mock('@/components/shared/LocationMap', () => ({
  default: ({ latitude, longitude, cityName }: { latitude: number, longitude: number, cityName: string }) => (
    <div data-testid="location-map">
      Map: {cityName} ({latitude}, {longitude})
    </div>
  ),
}));

describe('BasicInformationSection', () => {
  const mockFormData = {
    type: PropertyType.RENT,
    price: 1000,
    city: 'New York',
    country: 'USA',
    latitude: 40.7128,
    longitude: -74.0060,
    title: 'Test Property',
    description: 'Test Description',
    photos: [''],
    features: {},
    isPopular: false,
    isActive: true,
  };

  const mockProps = {
    formData: mockFormData,
    validationErrors: {},
    onInputChange: vi.fn(),
    onCitySelect: vi.fn(),
  };

  it('should render all form fields correctly', () => {
    render(<BasicInformationSection {...mockProps} />);

    expect(screen.getByText('Basic Information')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Property')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('New York')).toBeInTheDocument();
    expect(screen.getByDisplayValue('USA')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
  });

  it('should display location map when coordinates are available', () => {
    render(<BasicInformationSection {...mockProps} />);

    expect(screen.getByTestId('location-map')).toBeInTheDocument();
    expect(screen.getByText('Map: New York (40.7128, -74.006)')).toBeInTheDocument();
  });

  it('should not display location map when coordinates are not available', () => {
    const propsWithoutCoords = {
      ...mockProps,
      formData: {
        ...mockFormData,
        latitude: undefined,
        longitude: undefined,
      },
    };

    render(<BasicInformationSection {...propsWithoutCoords} />);

    expect(screen.queryByTestId('location-map')).not.toBeInTheDocument();
  });

  it('should call onInputChange when title is changed', () => {
    render(<BasicInformationSection {...mockProps} />);

    const titleInput = screen.getByDisplayValue('Test Property');
    fireEvent.change(titleInput, { target: { value: 'New Title' } });

    expect(mockProps.onInputChange).toHaveBeenCalledWith('title', 'New Title');
  });

  it('should call onCitySelect when city is changed', () => {
    render(<BasicInformationSection {...mockProps} />);

    const cityInput = screen.getByTestId('city-search');
    fireEvent.change(cityInput, { target: { value: 'Los Angeles' } });

    expect(mockProps.onCitySelect).toHaveBeenCalledWith('Los Angeles');
  });

  it('should display validation errors', () => {
    const propsWithErrors = {
      ...mockProps,
      validationErrors: {
        title: 'Title is required',
        price: 'Price must be greater than 0',
      },
    };

    render(<BasicInformationSection {...propsWithErrors} />);

    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(screen.getByText('Price must be greater than 0')).toBeInTheDocument();
  });

  it('should show correct price label based on property type', () => {
    // Test rental property
    render(<BasicInformationSection {...mockProps} />);
    expect(screen.getByText('Price * (per month)')).toBeInTheDocument();

    // Test sale property
    const saleProps = {
      ...mockProps,
      formData: { ...mockFormData, type: PropertyType.SELL },
    };
    render(<BasicInformationSection {...saleProps} />);
    expect(screen.getByText('Price * (total)')).toBeInTheDocument();
  });
});