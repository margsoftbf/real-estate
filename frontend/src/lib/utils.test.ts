import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn (className utility)', () => {
  it('combines multiple class names', () => {
    const result = cn('class1', 'class2', 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('handles conditional classes', () => {
    const result = cn('base', true && 'truthy', false && 'falsy');
    expect(result).toBe('base truthy');
  });

  it('handles undefined and null values', () => {
    const result = cn('base', undefined, null, 'valid');
    expect(result).toBe('base valid');
  });

  it('merges Tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4'); // px-4 should override px-2
    expect(result).toBe('py-1 px-4');
  });

  it('handles empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles array of classes', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('handles duplicate classes', () => {
    const result = cn('class1', 'class2', 'class1');
    expect(result).toBe('class1 class2 class1'); // clsx behavior
  });

  it('handles object with boolean values', () => {
    const result = cn({
      'base': true,
      'conditional': false,
      'active': true
    });
    expect(result).toBe('base active');
  });
});