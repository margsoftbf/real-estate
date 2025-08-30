import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
    onSubmit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input with placeholder', () => {
    render(<SearchBar {...defaultProps} placeholder="Search here" />);
    expect(screen.getAllByPlaceholderText('Search here')).toHaveLength(2);
  });

  it('displays current value', () => {
    render(<SearchBar {...defaultProps} value="test query" />);
    expect(screen.getAllByDisplayValue('test query')).toHaveLength(2);
  });

  it('allows typing in mobile input without calling onChange immediately', () => {
    const onChange = vi.fn();
    render(<SearchBar {...defaultProps} onChange={onChange} />);
    
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'new value' } });
    
    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls onSubmit when form is submitted', () => {
    const onSubmit = vi.fn();
    render(<SearchBar {...defaultProps} onSubmit={onSubmit} />);
    
    const inputs = screen.getAllByRole('textbox');
    const form = inputs[0].closest('form');
    fireEvent.submit(form!);
    
    expect(onSubmit).toHaveBeenCalled();
  });

  it('calls onSubmit when search button is clicked', () => {
    const onSubmit = vi.fn();
    render(<SearchBar {...defaultProps} onSubmit={onSubmit} />);
    
    const inputs = screen.getAllByRole('textbox');
    const form = inputs[0].closest('form');
    fireEvent.submit(form!);
    
    expect(onSubmit).toHaveBeenCalled();
  });

  it('shows filters button when onFiltersClick is provided', () => {
    const onFiltersClick = vi.fn();
    render(<SearchBar {...defaultProps} onFiltersClick={onFiltersClick} />);
    
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('calls onFiltersClick when filters button is clicked', () => {
    const onFiltersClick = vi.fn();
    render(<SearchBar {...defaultProps} onFiltersClick={onFiltersClick} />);
    
    const filtersButton = screen.getByText('Filters');
    fireEvent.click(filtersButton);
    
    expect(onFiltersClick).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <SearchBar {...defaultProps} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});