import type { LoginRequest, LoginResponse, RegisterRequest } from '@/types/api';
import { BaseApiClient } from '../base-api';

class AuthApiClient extends BaseApiClient {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(data: RegisterRequest): Promise<void> {
    return this.request<void>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const authApi = new AuthApiClient();
