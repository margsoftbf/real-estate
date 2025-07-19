import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropertyCard, { Property } from '@/components/shared/PropertyCard';
import Button from '@/components/ui/Button';
import Header from '@/components/features/landing/Header';
import propertyImage from '@/assets/home-hero-bg.webp';
import EditableInput from '@/components/common/EditableInput';
import googleImage from '@/assets/google.png';
import Image from 'next/image';
import { useLogin } from '@/hooks/auth';
import { LoginFormData, loginSchema } from '@/validation/loginValidation';

const LoginPage = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  const mockProperty: Property = {
    id: 1,
    imageUrl: propertyImage.src,
    popular: true,
    price: 2700,
    name: 'Beverly Springfield',
    address: '2821 Sevilla, Palm Harbor, TX',
    beds: 4,
    baths: 2,
    area: '6x7.5 m²',
  };

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

            {successMessage && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600">{successMessage}</p>
              </div>
            )}

            {loginMutation.isError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">
                  {loginMutation.error?.message ||
                    'Login failed. Please try again.'}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              <div>
                <EditableInput
                  fieldName="email"
                  label="Email"
                  placeholder="hi@example.com"
                  type="email"
                  required
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <EditableInput
                  fieldName="password"
                  label="Password"
                  placeholder="Enter password"
                  type="password"
                  required
                  showPasswordToggle={true}
                  {...register('password')}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end text-sm mt-4 lg:mt-8">
                <Link
                  href="#"
                  className="font-medium text-primary-violet hover:text-primary-violet-dark"
                >
                  Forgot Password?
                </Link>
              </div>

              <div>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? 'Signing in...' : 'Login'}
                </Button>
              </div>

              <div>
                <Button
                  variant="outline"
                  className="w-full text-black flex gap-2"
                  disabled
                >
                  <Image
                    src={googleImage}
                    alt="Rentsmart"
                    width={25}
                    height={25}
                    className="object-contain"
                  />{' '}
                  Sign up with Google
                </Button>
              </div>
            </form>

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
        <div className="hidden lg:block w-1/2 bg-purple-50 p-12 rounded-md">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="max-w-sm">
              <PropertyCard property={mockProperty} />
              <div className="mt-8 text-center text-xs text-gray-500">
                <p>Powered by RentSmart</p>
                <p className="mt-2">
                  You agree to RentSmart&apos;s Terms of Use &amp; Privacy
                  Policy. You don&apos;t need to consent as a condition of
                  renting any property, or buying any other goods or services.
                  Message/data rates may apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
