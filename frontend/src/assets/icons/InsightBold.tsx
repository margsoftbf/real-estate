import { FC, SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  color?: string;
}

const InsightBold: FC<IconProps> = ({
  size = 24,
  className = '',
  color = 'currentColor',
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M19.21 6.36001C18.17 4.26001 16.16 2.71001 13.83 2.20001C11.39 1.66001 8.88997 2.24001 6.97997 3.78001C5.05997 5.31001 3.96997 7.60001 3.96997 10.05C3.96997 12.64 5.51997 15.35 7.85997 16.92V17.75C7.84997 18.03 7.83997 18.46 8.17997 18.81C8.52997 19.17 9.04997 19.21 9.45997 19.21H14.59C15.13 19.21 15.54 19.06 15.82 18.78C16.2 18.39 16.19 17.89 16.18 17.62V16.92C19.28 14.83 21.23 10.42 19.21 6.36001Z"
        fill={color}
      />
      <path
        d="M15.26 21.9999C15.2 21.9999 15.13 21.9899 15.07 21.9699C13.06 21.3999 10.95 21.3999 8.93997 21.9699C8.56997 22.0699 8.17997 21.8599 8.07997 21.4899C7.96997 21.1199 8.18997 20.7299 8.55997 20.6299C10.82 19.9899 13.2 19.9899 15.46 20.6299C15.83 20.7399 16.05 21.1199 15.94 21.4899C15.84 21.7999 15.56 21.9999 15.26 21.9999Z"
        fill={color}
      />
    </svg>
  );
};

export default InsightBold;
