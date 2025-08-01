import { FC, SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  color?: string;
}

const ChartOutline: FC<IconProps> = ({
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
      <g clipPath="url(#clip0_76_1145)">
        <path
          d="M4 22H20"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 10H4C3.44772 10 3 10.6716 3 11.5V20.5C3 21.3284 3.44772 22 4 22H8C8.55228 22 9 21.3284 9 20.5V11.5C9 10.6716 8.55228 10 8 10Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 6H10C9.44772 6 9 6.59695 9 7.33333V20.6667C9 21.403 9.44772 22 10 22H14C14.5523 22 15 21.403 15 20.6667V7.33333C15 6.59695 14.5523 6 14 6Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 2H16C15.4477 2 15 2.55964 15 3.25V20.75C15 21.4404 15.4477 22 16 22H20C20.5523 22 21 21.4404 21 20.75V3.25C21 2.55964 20.5523 2 20 2Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_76_1145">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ChartOutline;
