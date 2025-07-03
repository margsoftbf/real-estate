import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
}

const HouseDot: React.FC<IconProps> = ({
  className = '',
  style = {},
  ...props
}) => (
  <svg
    width="56"
    height="85"
    viewBox="0 0 56 85"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="28" cy="77" r="8" fill="#CECBF6" />
    <circle cx="28" cy="28" r="28" fill="#7065F0" />
    <g clipPath="url(#clip0_331_10943)">
      <path
        d="M34.9998 24.7098L29.6668 20.5618C29.1988 20.1977 28.6227 20 28.0298 20C27.4368 20 26.8608 20.1977 26.3928 20.5618L21.0588 24.7098C20.7382 24.9591 20.4789 25.2783 20.3005 25.6431C20.1222 26.0079 20.0296 26.4087 20.0298 26.8148V34.0148C20.0298 34.5452 20.2405 35.0539 20.6156 35.429C20.9906 35.8041 21.4994 36.0148 22.0298 36.0148H34.0298C34.5602 36.0148 35.0689 35.8041 35.444 35.429C35.8191 35.0539 36.0298 34.5452 36.0298 34.0148V26.8148C36.0298 25.9918 35.6498 25.2148 34.9998 24.7098Z"
        fill="white"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 31C29.79 32.333 26.208 32.333 24 31"
        stroke="#7065F0"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <path
      d="M29.732 61C28.9622 62.3333 27.0377 62.3333 26.2679 61L22.8038 55C22.034 53.6667 22.9963 52 24.5359 52L31.4641 52C33.0037 52 33.966 53.6667 33.1962 55L29.732 61Z"
      fill="#7065F0"
    />
    <defs>
      <clipPath id="clip0_331_10943">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(16 16)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default HouseDot;
