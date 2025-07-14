import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { apiClient } from '@/lib/api';
import { authStorage } from '@/lib/auth';
import type { LoginRequest, ApiError } from '@/types/api';

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => apiClient.login(credentials),
    onSuccess: (data) => {
      authStorage.setToken(data.access_token);

      queryClient.invalidateQueries({ queryKey: ['user'] });

      const returnTo = router.query.returnTo as string;
      router.push(returnTo || '/dashboard');
    },
    onError: (error: ApiError) => {
      console.error('Login failed:', error);
    },
  });
};
