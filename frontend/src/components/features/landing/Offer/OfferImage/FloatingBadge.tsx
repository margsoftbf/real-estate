import React from 'react';

interface FloatingBadgeProps {
  variant: 'top' | 'bottom';
  position: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  variant,
  position,
  icon,
  title,
  subtitle,
}) => {
  const baseClasses =
    'absolute z-20 bg-white rounded-md shadow-md px-4 py-3 flex items-center gap-2';

  const variantClasses = {
    top: 'shadow-primary-violet/40',
    bottom: 'w-54 sm:w-72 rounded-xl border-2 border-purple-50',
  };

  const iconContainerClasses = {
    top: 'bg-primary-violet/10 p-2 rounded-full border-purple-300 border-2',
    bottom:
      'p-2 rounded-full border-purple-300 border-2 absolute -top-5 right-5 z-20 bg-primary-violet',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${position}`}>
      <span className={iconContainerClasses[variant]}>{icon}</span>
      <div>
        <div className="font-semibold text-sm text-secondary-violet">
          {title}
        </div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
    </div>
  );
};

export default FloatingBadge;
