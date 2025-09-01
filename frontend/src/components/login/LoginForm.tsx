import Link from 'next/link';
import Button from '@/components/ui/Button/Button';
import EditableInput from '@/components/common/EditableInput';
import googleImage from '@/assets/google.png';
import Image from 'next/image';
import { LoginFormData } from '@/validation/loginValidation';
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { ButtonLoading } from '@/components/ui/Loading';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  register: UseFormRegister<LoginFormData>;
  handleSubmit: UseFormHandleSubmit<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  isPending: boolean;
}

const LoginForm = ({
  onSubmit,
  register,
  handleSubmit,
  errors,
  isPending,
}: LoginFormProps) => {
  return (
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
          disabled={isPending}
        >
{isPending ? (
            <div className="flex items-center space-x-2">
              <ButtonLoading />
              <span>Signing in...</span>
            </div>
          ) : (
            'Login'
          )}
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
  );
};

export default LoginForm;
