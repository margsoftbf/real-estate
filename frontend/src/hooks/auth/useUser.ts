import { useSession, signOut } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { UserInfo } from '@/types/types';

export const useUser = () => {
  const { data: session, status } = useSession();
  
  const {
    data: userInfo,
    isLoading: userInfoLoading,
    error,
  } = useQuery<UserInfo>({
    queryKey: ['user'],
    queryFn: () => apiClient.getUserInfo(),
    enabled: status === 'authenticated' && !!session?.accessToken,
    retry: (failureCount, error: unknown) => {
      if (error && typeof error === 'object' && 'code' in error && error.code === 401) {
        signOut({ callbackUrl: '/login' });
        return false;
      }
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    data: userInfo || null,
    isLoading: status === 'loading' || userInfoLoading,
    isAuthenticated: status === 'authenticated' && !!userInfo,
    session,
    error,
  };
};

export const useLogout = () => {
  return () => signOut({ callbackUrl: '/login' });
};
