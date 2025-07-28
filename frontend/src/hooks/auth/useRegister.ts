import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { authApi } from '@/lib/auth/api';
import type { RegisterRequest, ApiError } from '@/types/api';

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterRequest) => {
      return authApi.register(data);
    },
    onSuccess: () => {
      router.push('/login?message=registration-success');
    },
    onError: (error: ApiError) => {
      console.error('Registration failed:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
    },
  });
};
