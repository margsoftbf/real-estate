import Link from 'next/link';
import Button from '@/components/ui/Button/Button';
import EditableInput from '@/components/common/EditableInput';
import googleImage from '@/assets/google.png';
import Image from 'next/image';
import { UserRole } from '@/types/types';
import { RegisterFormData } from '@/validation/registerValidation';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  register: UseFormRegister<RegisterFormData>;
  handleSubmit: UseFormHandleSubmit<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  isPending: boolean;
  currentRole: UserRole;
  setValue: UseFormSetValue<RegisterFormData>;
}

const RegisterForm = ({
  onSubmit,
  register,
  handleSubmit,
  errors,
  isPending,
  currentRole,
  setValue,
}: RegisterFormProps) => {
  return (
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
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
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

      <div>
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? 'Creating account...' : 'Sign up'}
        </Button>
      </div>

      <div>
        <Button variant="outline" className="w-full flex gap-2" disabled>
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
  );
};

export default RegisterForm;
