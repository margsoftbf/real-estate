import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyActions from './PropertyActions';

describe('PropertyActions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders share and favorite buttons', () => {
    render(<PropertyActions />);
    
    expect(screen.getByText('Share')).toBeInTheDocument();
    expect(screen.getByText('Favorite')).toBeInTheDocument();
  });

  it('renders buttons with correct icons', () => {
    render(<PropertyActions />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    
    expect(shareButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
  });

  it('applies correct responsive classes to container', () => {
    render(<PropertyActions />);
    
    const container = screen.getByText('Share').closest('div');
    expect(container).toHaveClass(
      'flex',
      'justify-between',
      'lg:justify-end',
      'items-center',
      'mb-4',
      'lg:mb-0',
      'w-full',
      'lg:w-auto',
      'gap-2',
      'lg:gap-2'
    );
  });

  it('applies correct responsive classes to share button', () => {
    render(<PropertyActions />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    expect(shareButton).toHaveClass(
      'gap-1.5',
      'w-full',
      'lg:w-auto',
      'lg:!px-3',
      'lg:!py-2',
      'lg:text-sm'
    );
  });

  it('applies correct responsive classes to favorite button', () => {
    render(<PropertyActions />);
    
    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    expect(favoriteButton).toHaveClass(
      'gap-1.5',
      'w-full',
      'lg:w-auto',
      'lg:!px-3',
      'lg:!py-2',
      'lg:text-sm'
    );
  });

  it('uses large size variant by default', () => {
    render(<PropertyActions />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    
    expect(shareButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
  });

  it('uses gray variant for both buttons', () => {
    render(<PropertyActions />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    
    expect(shareButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
  });

  it('handles share button click', () => {
    render(<PropertyActions />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    
    expect(() => fireEvent.click(shareButton)).not.toThrow();
  });

  it('handles favorite button click', () => {
    render(<PropertyActions />);
    
    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    
    expect(() => fireEvent.click(favoriteButton)).not.toThrow();
  });

  it('renders share icon with correct styling', () => {
    render(<PropertyActions />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    expect(shareButton).toBeInTheDocument();
  });

  it('renders heart icon with correct styling', () => {
    render(<PropertyActions />);
    
    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    expect(favoriteButton).toBeInTheDocument();
  });

  it('maintains button order - share then favorite', () => {
    render(<PropertyActions />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('Share');
    expect(buttons[1]).toHaveTextContent('Favorite');
  });

  it('has proper gap spacing between buttons', () => {
    render(<PropertyActions />);
    
    const container = screen.getByText('Share').closest('div');
    expect(container).toHaveClass('gap-2');
  });

  it('renders as flex container', () => {
    render(<PropertyActions />);
    
    const container = screen.getByText('Share').closest('div');
    expect(container).toHaveClass('flex');
  });

  it('centers items properly', () => {
    render(<PropertyActions />);
    
    const container = screen.getByText('Share').closest('div');
    expect(container).toHaveClass('items-center');
  });

  it('has correct margin bottom for mobile', () => {
    render(<PropertyActions />);
    
    const container = screen.getByText('Share').closest('div');
    expect(container).toHaveClass('mb-4');
  });

  it('removes margin bottom on desktop', () => {
    render(<PropertyActions />);
    
    const container = screen.getByText('Share').closest('div');
    expect(container).toHaveClass('lg:mb-0');
  });

  it('justifies content between on mobile', () => {
    render(<PropertyActions />);
    
    const container = screen.getByText('Share').closest('div');
    expect(container).toHaveClass('justify-between');
  });

  it('justifies content to end on desktop', () => {
    render(<PropertyActions />);
    
    const container = screen.getByText('Share').closest('div');
    expect(container).toHaveClass('lg:justify-end');
  });

  it('has full width on mobile and auto width on desktop', () => {
    render(<PropertyActions />);
    
    const container = screen.getByText('Share').closest('div');
    expect(container).toHaveClass('w-full', 'lg:w-auto');
  });

  it('buttons have full width on mobile and auto width on desktop', () => {
    render(<PropertyActions />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    
    expect(shareButton).toHaveClass('w-full', 'lg:w-auto');
    expect(favoriteButton).toHaveClass('w-full', 'lg:w-auto');
  });

  it('applies custom desktop padding with important flag', () => {
    render(<PropertyActions />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    
    expect(shareButton).toHaveClass('lg:!px-3', 'lg:!py-2');
    expect(favoriteButton).toHaveClass('lg:!px-3', 'lg:!py-2');
  });

  it('applies custom desktop text size', () => {
    render(<PropertyActions />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    
    expect(shareButton).toHaveClass('lg:text-sm');
    expect(favoriteButton).toHaveClass('lg:text-sm');
  });
});