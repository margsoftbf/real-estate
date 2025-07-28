import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import Switch from './Switch';

describe('Switch', () => {
  it('should render with default unchecked state', () => {
    render(<Switch />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should render with checked state when checked prop is true', () => {
    render(<Switch checked={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should call onCheckedChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Switch onCheckedChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('should toggle from checked to unchecked', () => {
    const handleChange = vi.fn();
    render(<Switch checked={true} onCheckedChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Switch disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('should not call onCheckedChange when disabled and clicked', () => {
    const handleChange = vi.fn();
    render(<Switch disabled onCheckedChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    render(<Switch className="custom-switch" />);
    const label = screen.getByRole('checkbox').parentElement;
    expect(label).toHaveClass('custom-switch');
  });

  it('should have proper accessibility attributes', () => {
    render(<Switch aria-label="Enable notifications" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'Enable notifications');
  });

  it('should support aria-labelledby', () => {
    render(
      <div>
        <span id="switch-label">Notifications</span>
        <Switch aria-labelledby="switch-label" />
      </div>
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-labelledby', 'switch-label');
  });

  it('should have correct visual state classes when checked', () => {
    render(<Switch checked={true} />);
    const toggleElement = screen.getByRole('checkbox').nextElementSibling;
    expect(toggleElement).toHaveClass('peer-checked:bg-primary-violet');
  });

  it('should apply disabled styles when disabled', () => {
    render(<Switch disabled />);
    const label = screen.getByRole('checkbox').parentElement;
    expect(label).toHaveClass('cursor-not-allowed', 'opacity-50');
  });

  it('should support custom id and name attributes', () => {
    render(<Switch id="test-switch" name="notifications" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'test-switch');
    expect(checkbox).toHaveAttribute('name', 'notifications');
  });
});