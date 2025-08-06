import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PropertyCard from '@/components/shared/PropertyCard';
import { PropertyPublicDto, PropertyType } from '@/types/properties';
import Button from '@/components/ui/Button/Button';
import Header from '@/components/features/landing/Header';
import propertyImage from '@/assets/home-hero-bg.webp';
import EditableInput from '@/components/common/EditableInput';
import googleImage from '@/assets/google.png';
import Image from 'next/image';
import { useRegister } from '@/hooks/auth';
import {
  RegisterFormData,
  registerSchema,
} from '@/validation/registerValidation';
import { UserRole } from '@/types/types';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: UserRole.TENANT,
      privacyConsent: false,
      marketingConsent: false,
    },
  });

  const currentRole = watch('role');

  const registerMutation = useRegister();

  const mockProperty: PropertyPublicDto = {
    slug: 'beverly-springfield',
    type: PropertyType.RENT,
    price: 2700,
    city: 'Palm Harbor',
    country: 'TX',
    title: 'Beverly Springfield',
    photos: [propertyImage.src],
    description: 'Beautiful property in a great location',
    features: {
      bedrooms: 4,
      bathrooms: 2,
      area: 157.5, // 6x7.5 m² = 45 m²
    },
    isPopular: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    owner: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1-555-0123',
      avatarUrl: null,
    },
  };

  const onSubmit = (data: RegisterFormData) => {
    const payload = {
      email: data.email,
      password: data.password,
      role: data.role,
      privacyConsent: data.privacyConsent,
      marketingConsent: data.marketingConsent || false,
    };

    registerMutation.mutate(payload);
  };

  return (
    <div className="min-h-screen bg-white ">
      <Header variant="auth" />
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-12">
        <div className="w-full lg:w-1/2 flex items-center lg:items-start lg:justify-start justify-center p-8">
          <div className="max-w-md w-full">
            <h1 className="text-h3 font-bold text-primary-black text-center">
              Create your account
            </h1>
            <p className="mt-2 text-body-md text-primary-black/50 text-center">
              Create your account to access all our powerful tools.
            </p>

            {registerMutation.isError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">
                  {registerMutation.error?.message ||
                    'Registration failed. Please try again.'}
                </p>
              </div>
            )}

            <form
              onSubmit={(e) => {
                handleSubmit(onSubmit)(e);
              }}
              className="mt-8 space-y-4"
            >
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

              <div>
                <EditableInput
                  fieldName="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm password"
                  type="password"
                  required
                  showPasswordToggle={true}
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 items-center md:flex-row justify-between mt-4 lg:mt-8">
                <div className="flex items-center">
                  <input
                    id="is_property_manager"
                    type="checkbox"
                    className="h-4 w-4 text-primary-violet focus:ring-primary-violet border-gray-300 rounded"
                    checked={currentRole === UserRole.LANDLORD}
                    onChange={(e) => {
                      setValue(
                        'role',
                        e.target.checked ? UserRole.LANDLORD : UserRole.TENANT
                      );
                    }}
                  />
                  <label
                    htmlFor="is_property_manager"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    I am a property manager
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    href="#"
                    className="font-medium text-primary-violet hover:text-primary-violet-dark"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    {...register('privacyConsent')}
                    id="privacyConsent"
                    type="checkbox"
                    className="h-4 w-4 text-primary-violet focus:ring-primary-violet border-gray-300 rounded"
                  />
                  <label
                    htmlFor="privacyConsent"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>
                {errors.privacyConsent && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.privacyConsent.message}
                  </p>
                )}

                <div className="flex items-center">
                  <input
                    {...register('marketingConsent')}
                    id="marketingConsent"
                    type="checkbox"
                    className="h-4 w-4 text-primary-violet focus:ring-primary-violet border-gray-300 rounded"
                  />
                  <label
                    htmlFor="marketingConsent"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Send me marketing emails and updates
                  </label>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending
                    ? 'Creating account...'
                    : 'Sign up'}
                </Button>
              </div>

              <div>
                <Button
                  variant="outline"
                  className="w-full flex gap-2"
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

            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-primary-violet hover:text-primary-violet-dark"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden lg:block w-1/2 bg-purple-50 rounded-md">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="max-w-md">
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

export default RegisterPage;
