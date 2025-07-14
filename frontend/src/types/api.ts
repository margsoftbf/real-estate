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
