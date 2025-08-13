import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Header from '@/components/features/landing/Header';
import { useRegister } from '@/hooks/auth';
import {
  RegisterFormData,
  registerSchema,
} from '@/validation/registerValidation';
import { UserRole } from '@/types/types';
import PropertyLoginSidebar from '@/components/login/PropertyLoginSidebar';
import RegisterForm from '@/components/register/RegisterForm';

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

            <RegisterForm
              onSubmit={onSubmit}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              isPending={registerMutation.isPending}
              currentRole={currentRole}
              setValue={setValue}
            />

           

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
        <PropertyLoginSidebar />
      </div>
    </div>
  );
};

export default RegisterPage;
