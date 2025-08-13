import { describe, it, expect } from 'vitest';
import { loginSchema } from './loginValidation';

describe('loginValidation', () => {
  it('validates correct email and password', () => {
    const validData = {
      email: 'test@example.com',
      password: 'password123'
    };

    const result = loginSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects invalid email format', () => {
    const invalidData = {
      email: 'invalid-email',
      password: 'password123'
    };

    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(['email']);
      expect(result.error.issues[0].message).toContain('valid email');
    }
  });

  it('rejects empty email', () => {
    const invalidData = {
      email: '',
      password: 'password123'
    };

    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(['email']);
    }
  });

  it('rejects empty password', () => {
    const invalidData = {
      email: 'test@example.com',
      password: ''
    };

    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(['password']);
    }
  });

  it('accepts any non-empty password', () => {
    const validData = {
      email: 'test@example.com',
      password: '123'
    };

    const result = loginSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects missing fields', () => {
    const invalidData = {};

    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues).toHaveLength(2);
    }
  });

  it('accepts edge case valid emails', () => {
    const validEmails = [
      'user+tag@example.com',
      'user.name@example.co.uk',
      'user123@example-site.com'
    ];

    validEmails.forEach(email => {
      const result = loginSchema.safeParse({
        email,
        password: 'validpassword'
      });
      expect(result.success).toBe(true);
    });
  });
});