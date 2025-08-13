import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pagination with correct page numbers', () => {
    render(<Pagination {...defaultProps} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('highlights current page', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveClass('bg-secondary-violet', 'text-white');
  });

  it('calls onPageChange when page button is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);
    
    const page3Button = screen.getByText('3');
    fireEvent.click(page3Button);
    
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('shows previous button when not on first page', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    
    const prevButton = screen.getByLabelText(/previous/i);
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).not.toBeDisabled();
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    
    const prevButton = screen.getByLabelText(/previous/i);
    expect(prevButton).toBeDisabled();
  });

  it('shows next button when not on last page', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    
    const nextButton = screen.getByLabelText(/next/i);
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).not.toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    
    const nextButton = screen.getByLabelText(/next/i);
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange with previous page when prev button clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} currentPage={3} onPageChange={onPageChange} />);
    
    const prevButton = screen.getByLabelText(/previous/i);
    fireEvent.click(prevButton);
    
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with next page when next button clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} currentPage={3} onPageChange={onPageChange} />);
    
    const nextButton = screen.getByLabelText(/next/i);
    fireEvent.click(nextButton);
    
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('does not render when totalPages is 1 or less', () => {
    const { container } = render(<Pagination {...defaultProps} totalPages={1} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('handles large page counts with ellipsis', () => {
    render(<Pagination {...defaultProps} totalPages={20} currentPage={10} />);
    
    expect(screen.getAllByText('...')).toHaveLength(2);
  });
});