import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white' | 'gray' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', children, ...props },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center rounded-md transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-jakarta';

    const variants = {
      primary:
        'text-white border-2 border-primary-violet-dark hover:border-primary-violet-dark hover:brightness-120',
      outline:
        'bg-transparent border-1 hover:border-[#7065f0] hover:text-[#7065f0] hover:bg-[#7065f020]',
      white:
        'bg-white text-primary-violet-dark border-1 hover:border-primary-violet-dark hover:text-primary-violet-dark hover:bg-primary-violet-dark/10',
      gray: 'bg-purple-50 text-primary-violet-dark border-1 hover:border-purple-300 hover:text-primary-violet-dark hover:bg-primary-violet-dark/10',
      secondary:
        'bg-secondary-violet text-white border-1 hover:border-secondary-violet hover:text-secondary-violet hover:bg-secondary-violet/10',
    };

    const sizes = {
      sm: 'px-4 py-1.5 text-body-sm-bold',
      md: 'px-4 py-2 text-body-sm-bold',
      lg: 'px-6 py-3 text-body-md-bold',
    };

    const primaryStyles =
      variant === 'primary'
        ? {
            backgroundColor: 'var(--color-primary-violet-dark)',
            borderColor: 'var(--color-primary-violet-dark)',
            color: 'white',
          }
        : {};

    const outlineStyles =
      variant === 'outline'
        ? {
            color: 'var(--color-primary-violet-dark)',
            borderColor: 'var(--color-purple-300)',
          }
        : {};

    const grayStyles =
      variant === 'gray'
        ? {
            backgroundColor: 'var(--color-purple-50)',
            color: 'var(--color-primary-violet-dark)',
            borderColor: 'var(--color-purple-300)',
          }
        : {};

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        style={{
          ...primaryStyles,
          ...outlineStyles,
          ...grayStyles,
        }}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
