import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { authStorage } from '@/lib/auth';
import { UserInfo } from '@/types/types';

export const useUser = () => {
  return useQuery<UserInfo>({
    queryKey: ['user'],
    queryFn: () => apiClient.getUserInfo(),
    enabled: authStorage.isLoggedIn(),
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error: unknown) => {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 401
      ) {
        authStorage.removeToken();
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useLogout = () => {
  return () => {
    authStorage.removeToken();
    window.location.href = '/login';
  };
};
