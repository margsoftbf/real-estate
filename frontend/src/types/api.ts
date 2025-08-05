import { UserRole } from './types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterRequest {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role: UserRole;
  privacyConsent: boolean;
  marketingConsent?: boolean;
}

export interface ApiError {
  code: number;
  message: string;
}

export interface PaginationMeta {
  itemCount?: number;
  totalItems?: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage?: number;
  sortBy?: string;
  searchBy?: string[];
  search?: string;
  select?: string[];
  filter?: Record<string, unknown>;
  cursor?: string;
}

export interface PaginationLinks {
  first?: string;
  previous?: string;
  current: string;
  next?: string;
  last?: string;
}

export interface BasePaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
}
