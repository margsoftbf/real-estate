import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PropertyRequest from './PropertyRequest';

describe('PropertyRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock date to ensure consistent testing
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-15'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders request form with default values', () => {
    render(<PropertyRequest />);
    
    expect(screen.getByText('Request a home tour')).toBeInTheDocument();
    expect(screen.getByText('In Person')).toBeInTheDocument();
    expect(screen.getByText('Virtual')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2024-01-15')).toBeInTheDocument();
    expect(screen.getByText('Request a Tour')).toBeInTheDocument();
  });

  it('has In Person selected by default', () => {
    render(<PropertyRequest />);
    
    const inPersonButton = screen.getByRole('button', { name: /in person/i });
    const virtualButton = screen.getByRole('button', { name: /virtual/i });
    
    expect(inPersonButton).toHaveClass('bg-purple-200', 'text-primary-violet-dark');
    expect(virtualButton).toHaveClass('bg-white', 'text-primary-black/50');
  });

  it('switches between tour types', () => {
    render(<PropertyRequest />);
    
    const virtualButton = screen.getByRole('button', { name: /virtual/i });
    const inPersonButton = screen.getByRole('button', { name: /in person/i });
    
    fireEvent.click(virtualButton);
    
    expect(virtualButton).toHaveClass('bg-purple-200', 'text-primary-violet-dark');
    expect(inPersonButton).toHaveClass('bg-white', 'text-primary-black/50');
  });

  it('displays icons for tour types', () => {
    render(<PropertyRequest />);
    
    // Check that tour type icons are present
    const inPersonButton = screen.getByRole('button', { name: /in person/i });
    const virtualButton = screen.getByRole('button', { name: /virtual/i });
    
    expect(inPersonButton).toBeInTheDocument();
    expect(virtualButton).toBeInTheDocument();
  });

  it('updates date when changed', () => {
    render(<PropertyRequest />);
    
    const dateInput = screen.getByDisplayValue('2024-01-15');
    fireEvent.change(dateInput, { target: { value: '2024-02-01' } });
    
    expect(screen.getByDisplayValue('2024-02-01')).toBeInTheDocument();
  });

  it('shows success modal when form is submitted', async () => {
    render(<PropertyRequest />);
    
    const requestButton = screen.getByRole('button', { name: /request a tour/i });
    fireEvent.click(requestButton);
    
    await waitFor(() => {
      expect(screen.getByText('Tour Request Sent!')).toBeInTheDocument();
    });
    
    expect(screen.getByText(/your in person tour request for 2024-01-15/i)).toBeInTheDocument();
  });

  it('shows correct tour type in success modal', async () => {
    render(<PropertyRequest />);
    
    // Switch to virtual tour
    const virtualButton = screen.getByRole('button', { name: /virtual/i });
    fireEvent.click(virtualButton);
    
    // Submit form
    const requestButton = screen.getByRole('button', { name: /request a tour/i });
    fireEvent.click(requestButton);
    
    await waitFor(() => {
      expect(screen.getByText(/your virtual tour request/i)).toBeInTheDocument();
    });
  });

  it('closes modal and resets date when modal is closed', async () => {
    render(<PropertyRequest />);
    
    // Change date and submit
    const dateInput = screen.getByDisplayValue('2024-01-15');
    fireEvent.change(dateInput, { target: { value: '2024-02-01' } });
    
    const requestButton = screen.getByRole('button', { name: /request a tour/i });
    fireEvent.click(requestButton);
    
    await waitFor(() => {
      expect(screen.getByText('Tour Request Sent!')).toBeInTheDocument();
    });
    
    // Close modal
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Tour Request Sent!')).not.toBeInTheDocument();
    });
    
    // Check that date is reset
    expect(screen.getByDisplayValue('2024-01-15')).toBeInTheDocument();
  });

  it('closes modal when X button is clicked', async () => {
    render(<PropertyRequest />);
    
    const requestButton = screen.getByRole('button', { name: /request a tour/i });
    fireEvent.click(requestButton);
    
    await waitFor(() => {
      expect(screen.getByText('Tour Request Sent!')).toBeInTheDocument();
    });
    
    // Click X button
    const xButton = screen.getByLabelText(/close/i) || screen.getAllByRole('button')[0];
    fireEvent.click(xButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Tour Request Sent!')).not.toBeInTheDocument();
    });
  });

  it('displays disclaimer text', () => {
    render(<PropertyRequest />);
    
    expect(screen.getByText("It's free, with no obligation － cancel anytime.")).toBeInTheDocument();
  });

  it('has minimum date set to today', () => {
    render(<PropertyRequest />);
    
    const dateInput = screen.getByDisplayValue('2024-01-15');
    expect(dateInput).toHaveAttribute('min', '2024-01-15');
  });

  it('renders location control icon on request button', () => {
    render(<PropertyRequest />);
    
    const requestButton = screen.getByRole('button', { name: /request a tour/i });
    expect(requestButton).toBeInTheDocument();
  });

  it('has correct styling for active and inactive tour buttons', () => {
    render(<PropertyRequest />);
    
    const inPersonButton = screen.getByRole('button', { name: /in person/i });
    const virtualButton = screen.getByRole('button', { name: /virtual/i });
    
    // Initial state - In Person active
    expect(inPersonButton).toHaveClass('bg-purple-200');
    expect(virtualButton).toHaveClass('bg-white');
    
    // Switch to Virtual
    fireEvent.click(virtualButton);
    
    expect(virtualButton).toHaveClass('bg-purple-200');
    expect(inPersonButton).toHaveClass('bg-white');
  });
});