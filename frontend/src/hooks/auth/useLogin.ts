import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { signIn, SignInResponse } from 'next-auth/react';
import type { LoginRequest } from '@/types/api';

interface LoginError extends Error {
  message: string;
}

export const useLogin = () => {
  const router = useRouter();

  return useMutation<SignInResponse, LoginError, LoginRequest>({
    mutationFn: async (credentials: LoginRequest) => {
      const result = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (result?.error) {
        switch (result.error) {
          case 'CredentialsSignin':
            throw new Error(
              'Invalid email or password. Please check your credentials and try again.'
            );
          case 'Callback':
            throw new Error(
              'Authentication service temporarily unavailable. Please try again later.'
            );
          default:
            throw new Error('Login failed. Please try again.');
        }
      }

      if (!result?.ok) {
        throw new Error('Login failed. Please try again.');
      }

      return result;
    },
    onSuccess: () => {
      const returnTo = router.query.returnTo as string;
      router.push(returnTo || '/dashboard');
    },
    onError: () => {
      // Error handled by setError state
    },
  });
};
