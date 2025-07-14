import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { apiClient } from '@/lib/api';
import type { RegisterRequest, ApiError } from '@/types/api';

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterRequest) => {
      return apiClient.register(data);
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
