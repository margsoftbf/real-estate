import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ApiError,
} from '@/types/api';
import { createAuthHeaders } from './auth';
import { UserInfo } from '@/types/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: createAuthHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const errorText = await response.text();
        let error: ApiError;
        try {
          error = JSON.parse(errorText);
        } catch {
          error = {
            code: response.status,
            message: response.statusText || errorText,
          };
        }
        throw error;
      }

      if (response.status === 204) {
        return undefined as T;
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

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

  async getUserInfo(): Promise<UserInfo> {
    return this.request<UserInfo>('/users/userinfo');
  }
}

export const apiClient = new ApiClient();
