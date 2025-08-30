import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Toast from '@/components/ui/Toast/Toast';
import Header from '@/components/features/landing/Header';
import { useLogin } from '@/hooks/auth';
import { useToast } from '@/contexts/ToastContext';
import { LoginFormData, loginSchema } from '@/validation/loginValidation';
import PropertyLoginSidebar from '@/components/login/PropertyLoginSidebar';
import LoginForm from '@/components/login/LoginForm';
import AuthMessage from '@/components/login/AuthMessage';

const LoginPage = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { toasts, removeToast, showSuccess, showError } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();

  useEffect(() => {
    if (router.query.message === 'registration-success') {
      setSuccessMessage(
        'Registration successful! Please sign in with your credentials.'
      );
      router.replace('/login', undefined, { shallow: true });
    }
  }, [router]);

  useEffect(() => {
    if (loginMutation.isSuccess) {
      showSuccess('Successfully logged in! Redirecting to dashboard...');
    }
  }, [loginMutation.isSuccess, showSuccess]);

  useEffect(() => {
    if (loginMutation.isError) {
      showError(
        loginMutation.error?.message || 'Login failed. Please try again.'
      );
    }
  }, [loginMutation.isError, loginMutation.error, showError]);

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header variant="auth" />
      <div className="flex max-w-7xl mx-auto lg:py-12">
        <div className="w-full lg:w-1/2 flex items-center lg:items-start lg:justify-start justify-center p-8">
          <div className="max-w-md w-full">
            <h1 className="text-h3 font-bold text-primary-black text-center">
              Welcome back
            </h1>
            <p className="mt-2 text-body-md text-primary-black/50 text-center">
              Sign in to access your account and manage your properties.
            </p>

            <AuthMessage
              successMessage={successMessage}
              isError={loginMutation.isError}
              errorMessage={loginMutation.error?.message}
            />

            <LoginForm
              onSubmit={onSubmit}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              isPending={loginMutation.isPending}
            />

            <p className="mt-6 text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-primary-violet hover:text-primary-violet-dark underline"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
        <PropertyLoginSidebar />
      </div>

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default LoginPage;
