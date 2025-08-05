import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('should return "Never" when date is null', () => {
    expect(formatDate(null)).toBe('Never');
  });

  it('should format a valid date correctly', () => {
    const testDate = new Date('2024-01-15T10:30:00');
    const result = formatDate(testDate);

    // Check if the result contains expected parts
    expect(result).toContain('January');
    expect(result).toContain('15');
    expect(result).toContain('2024');
    expect(result).toContain('10:30');
  });

  it('should handle different dates', () => {
    const testDate = new Date('2023-12-25T15:45:00');
    const result = formatDate(testDate);

    expect(result).toContain('December');
    expect(result).toContain('25');
    expect(result).toContain('2023');
  });
});
