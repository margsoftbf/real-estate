import type { ApiError } from '@/types/api';
import { getSession } from 'next-auth/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class BaseApiClient {
  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const session = await getSession();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(session?.accessToken && {
          Authorization: `Bearer ${session.accessToken}`,
        }),
        ...options.headers,
      },
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
}
