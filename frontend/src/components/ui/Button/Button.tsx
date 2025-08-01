import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
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
    };

    const sizes = {
      sm: 'px-4 py-1.5 text-body-sm font-semibold',
      md: 'px-4 py-2 text-body-sm-medium font-semibold',
      lg: 'px-6 py-3 text-body-lg font-semibold',
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

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        style={{
          ...primaryStyles,
          ...outlineStyles,
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
