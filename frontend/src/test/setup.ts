import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
      beforePopState: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
    };
  },
}));

vi.mock('next/image', () => ({
  default: () => null,
}));

vi.mock('next/head', () => ({
  default: () => null,
}));
