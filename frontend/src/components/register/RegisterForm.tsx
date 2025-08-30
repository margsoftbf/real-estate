import Link from 'next/link';
import Button from '@/components/ui/Button/Button';
import EditableInput from '@/components/common/EditableInput';
import googleImage from '@/assets/google.png';
import Image from 'next/image';
import { UserRole } from '@/types/types';
import { RegisterFormData } from '@/validation/registerValidation';
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { ButtonLoading } from '@/components/ui/Loading';

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
            className="h-4 w-4 text-primary-violet focus:ring-primary-violet border-gray-300 rounded disabled:opacity-60 disabled:cursor-not-allowed"
            checked={true}
            disabled={true}
            readOnly
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

      <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
        <input
          {...register('privacyConsent')}
          id="privacyConsent"
          type="checkbox"
          className="mt-1 h-4 w-4 text-primary-violet focus:ring-primary-violet focus:ring-2 border-2 border-gray-300 rounded bg-white checked:bg-primary-violet checked:border-primary-violet"
        />
        <label
          htmlFor="privacyConsent"
          className="block text-sm text-gray-900 cursor-pointer"
        >
          <span className="font-medium">
            I agree to the Terms of Service and Privacy Policy
          </span>
          <br />
          <span className="text-xs text-gray-600">
            Required to create an account
          </span>
        </label>
      </div>
      {errors.privacyConsent && (
        <p className="mt-1 text-sm text-red-600">
          {errors.privacyConsent.message}
        </p>
      )}

      <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
        <input
          {...register('marketingConsent')}
          id="marketingConsent"
          type="checkbox"
          className="mt-1 h-4 w-4 text-primary-violet focus:ring-primary-violet focus:ring-2 border-2 border-gray-300 rounded bg-white checked:bg-primary-violet checked:border-primary-violet"
        />
        <label
          htmlFor="marketingConsent"
          className="block text-sm text-gray-900 cursor-pointer"
        >
          <span className="font-medium">
            Send me marketing emails and updates
          </span>
          <br />
          <span className="text-xs text-gray-600">
            Optional - you can unsubscribe anytime
          </span>
        </label>
      </div>

      <div>
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isPending}
        >
{isPending ? (
            <div className="flex items-center space-x-2">
              <ButtonLoading />
              <span>Creating account...</span>
            </div>
          ) : (
            'Sign up'
          )}
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
