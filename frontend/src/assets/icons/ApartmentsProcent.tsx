import { FC, SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  color?: string;
}

const ApartmentsProcent: FC<IconProps> = ({
  size = 28,
  className = '',
  color = 'currentColor',
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_361_24154)">
        <path
          d="M24.1647 9.1957L16.3875 3.15211C15.7049 2.62163 14.8649 2.33362 14.0002 2.33362C13.1354 2.33362 12.2954 2.62163 11.6129 3.15211L3.83412 9.1957C3.36664 9.5589 2.98842 10.024 2.72835 10.5556C2.46827 11.0871 2.33322 11.671 2.3335 12.2627V22.753C2.3335 23.5258 2.64079 24.267 3.18777 24.8135C3.73475 25.3599 4.47661 25.667 5.25016 25.667H22.7502C23.5237 25.667 24.2656 25.3599 24.8126 24.8135C25.3595 24.267 25.6668 23.5258 25.6668 22.753V12.2627C25.6668 11.0636 25.1127 9.93148 24.1647 9.1957Z"
          fill="white"
        />
        <circle cx="10.5" cy="11.5" r="2.5" fill={color} />
        <circle cx="17.5" cy="16.5" r="2.5" fill={color} />
        <path
          d="M9.5 18.5L18.5 9.5"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_361_24154">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ApartmentsProcent;
