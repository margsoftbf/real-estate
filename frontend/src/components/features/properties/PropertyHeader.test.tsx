import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PropertyHeader from './PropertyHeader';
import { PropertyPublicDto } from '@/types/properties';

const mockProperty: PropertyPublicDto = {
  id: '1',
  slug: 'test-property',
  type: 'rent',
  price: 2500,
  city: 'New York',
  country: 'USA',
  title: 'Beautiful Downtown Apartment',
  photos: ['photo1.jpg'],
  description: 'A lovely place to live',
  features: null,
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

describe('PropertyHeader', () => {
  it('renders property title', () => {
    render(<PropertyHeader property={mockProperty} />);

    expect(
      screen.getByText('Beautiful Downtown Apartment')
    ).toBeInTheDocument();
  });

  it('renders fallback title when no title provided', () => {
    const propertyWithoutTitle = { ...mockProperty, title: null };
    render(<PropertyHeader property={propertyWithoutTitle} />);

    expect(screen.getByText('Property')).toBeInTheDocument();
  });

  it('renders property location', () => {
    render(<PropertyHeader property={mockProperty} />);

    expect(screen.getByText('New York, USA')).toBeInTheDocument();
  });

  it('formats location correctly with different cities and countries', () => {
    const propertyInParis = {
      ...mockProperty,
      city: 'Paris',
      country: 'France',
    };

    render(<PropertyHeader property={propertyInParis} />);

    expect(screen.getByText('Paris, France')).toBeInTheDocument();
  });

  it('applies correct styling to title', () => {
    render(<PropertyHeader property={mockProperty} />);

    const title = screen.getByText('Beautiful Downtown Apartment');
    expect(title).toHaveClass(
      'text-2xl',
      'md:text-3xl',
      'font-bold',
      'text-gray-900',
      'mt-2',
      'mb-1',
      'font-jakarta'
    );
  });

  it('applies correct styling to location', () => {
    render(<PropertyHeader property={mockProperty} />);

    const location = screen.getByText('New York, USA');
    expect(location).toHaveClass(
      'text-primary-black/50',
      'text-sm',
      'md:text-base'
    );
  });

  it('applies correct styling to container', () => {
    render(<PropertyHeader property={mockProperty} />);

    const container = screen
      .getByText('Beautiful Downtown Apartment')
      .closest('div');
    expect(container).toHaveClass('mb-4');
  });

  it('renders title as h1 element', () => {
    render(<PropertyHeader property={mockProperty} />);

    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveTextContent('Beautiful Downtown Apartment');
  });

  it('renders location as paragraph element', () => {
    render(<PropertyHeader property={mockProperty} />);

    const location = screen.getByText('New York, USA');
    expect(location.tagName).toBe('P');
  });

  it('handles long property titles', () => {
    const propertyWithLongTitle = {
      ...mockProperty,
      title:
        'This is a very long property title that should still render correctly and maintain proper styling throughout the entire length of the text',
    };

    render(<PropertyHeader property={propertyWithLongTitle} />);

    expect(
      screen.getByText(
        'This is a very long property title that should still render correctly and maintain proper styling throughout the entire length of the text'
      )
    ).toBeInTheDocument();
  });

  it('handles special characters in title', () => {
    const propertyWithSpecialChars = {
      ...mockProperty,
      title: 'Luxury Apartment & Penthouse - 5★ Rating',
    };

    render(<PropertyHeader property={propertyWithSpecialChars} />);

    expect(
      screen.getByText('Luxury Apartment & Penthouse - 5★ Rating')
    ).toBeInTheDocument();
  });

  it('handles special characters in location', () => {
    const propertyWithSpecialLocation = {
      ...mockProperty,
      city: 'São Paulo',
      country: 'Brasília',
    };

    render(<PropertyHeader property={propertyWithSpecialLocation} />);

    expect(screen.getByText('São Paulo, Brasília')).toBeInTheDocument();
  });

  it('maintains responsive text sizing', () => {
    render(<PropertyHeader property={mockProperty} />);

    const title = screen.getByText('Beautiful Downtown Apartment');
    const location = screen.getByText('New York, USA');

    expect(title).toHaveClass('text-2xl', 'md:text-3xl');
    expect(location).toHaveClass('text-sm', 'md:text-base');
  });

  it('uses Jakarta font family for title', () => {
    render(<PropertyHeader property={mockProperty} />);

    const title = screen.getByText('Beautiful Downtown Apartment');
    expect(title).toHaveClass('font-jakarta');
  });

  it('uses correct text colors', () => {
    render(<PropertyHeader property={mockProperty} />);

    const title = screen.getByText('Beautiful Downtown Apartment');
    const location = screen.getByText('New York, USA');

    expect(title).toHaveClass('text-gray-900');
    expect(location).toHaveClass('text-primary-black/50');
  });

  it('has correct margin spacing', () => {
    render(<PropertyHeader property={mockProperty} />);

    const title = screen.getByText('Beautiful Downtown Apartment');
    const container = title.closest('div');

    expect(title).toHaveClass('mt-2', 'mb-1');
    expect(container).toHaveClass('mb-4');
  });

  it('renders empty title as Property fallback', () => {
    const propertyWithEmptyTitle = { ...mockProperty, title: '' };
    render(<PropertyHeader property={propertyWithEmptyTitle} />);

    expect(screen.getByText('Property')).toBeInTheDocument();
  });

  it('handles undefined title gracefully', () => {
    const propertyWithUndefinedTitle = {
      ...mockProperty,
      title: undefined as unknown as string,
    };
    render(<PropertyHeader property={propertyWithUndefinedTitle} />);

    expect(screen.getByText('Property')).toBeInTheDocument();
  });

  it('renders complete component structure', () => {
    render(<PropertyHeader property={mockProperty} />);

    // Check that both title and location are present
    expect(
      screen.getByText('Beautiful Downtown Apartment')
    ).toBeInTheDocument();
    expect(screen.getByText('New York, USA')).toBeInTheDocument();

    // Check that they are in the same container
    const container = screen
      .getByText('Beautiful Downtown Apartment')
      .closest('div');
    expect(container).toContainElement(screen.getByText('New York, USA'));
  });

  it('maintains proper semantic structure', () => {
    render(<PropertyHeader property={mockProperty} />);

    // Title should be h1
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();

    // Location should be a paragraph
    const location = screen.getByText('New York, USA');
    expect(location.tagName).toBe('P');
  });
});
