import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyPhotosSection from './PropertyPhotosSection';

describe('PropertyPhotosSection', () => {
  const mockProps = {
    photos: ['https://example.com/photo1.jpg', ''],
    validationErrors: {},
    onPhotoChange: vi.fn(),
    onAddPhoto: vi.fn(),
    onRemovePhoto: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all photo inputs correctly', () => {
    render(<PropertyPhotosSection {...mockProps} />);

    expect(screen.getByText('Property Photos')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://example.com/photo1.jpg')).toBeInTheDocument();
    expect(screen.getByLabelText('Photo 1 URL')).toBeInTheDocument();
    expect(screen.getByLabelText('Photo 2 URL')).toBeInTheDocument();
  });

  it('should call onPhotoChange when photo URL is changed', () => {
    render(<PropertyPhotosSection {...mockProps} />);

    const photoInput = screen.getByDisplayValue('https://example.com/photo1.jpg');
    fireEvent.change(photoInput, { target: { value: 'https://example.com/new-photo.jpg' } });

    expect(mockProps.onPhotoChange).toHaveBeenCalledWith(0, 'https://example.com/new-photo.jpg');
  });

  it('should call onAddPhoto when Add Another Photo button is clicked', () => {
    render(<PropertyPhotosSection {...mockProps} />);

    const addButton = screen.getByText('Add Another Photo');
    fireEvent.click(addButton);

    expect(mockProps.onAddPhoto).toHaveBeenCalled();
  });

  it('should show Remove button when there are multiple photos', () => {
    render(<PropertyPhotosSection {...mockProps} />);

    const removeButtons = screen.getAllByText('Remove');
    expect(removeButtons).toHaveLength(2); // One for each photo
  });

  it('should not show Remove button when there is only one photo', () => {
    const singlePhotoProps = {
      ...mockProps,
      photos: ['https://example.com/photo1.jpg'],
    };

    render(<PropertyPhotosSection {...singlePhotoProps} />);

    expect(screen.queryByText('Remove')).not.toBeInTheDocument();
  });

  it('should call onRemovePhoto when Remove button is clicked', () => {
    render(<PropertyPhotosSection {...mockProps} />);

    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);

    expect(mockProps.onRemovePhoto).toHaveBeenCalledWith(0);
  });

  it('should display validation errors for photo URLs', () => {
    const propsWithErrors = {
      ...mockProps,
      validationErrors: {
        'photos.0': 'Invalid photo URL',
        'photos.1': 'Photo URL is required',
      },
    };

    render(<PropertyPhotosSection {...propsWithErrors} />);

    expect(screen.getByText('Invalid photo URL')).toBeInTheDocument();
    expect(screen.getByText('Photo URL is required')).toBeInTheDocument();
  });

  it('should handle empty photos array', () => {
    const emptyPhotosProps = {
      ...mockProps,
      photos: [],
    };

    render(<PropertyPhotosSection {...emptyPhotosProps} />);

    expect(screen.getByText('Property Photos')).toBeInTheDocument();
    expect(screen.getByText('Add Another Photo')).toBeInTheDocument();
  });
});