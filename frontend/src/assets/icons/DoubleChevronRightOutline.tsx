import React from 'react';

interface DoubleChevronRightOutlineProps {
  className?: string;
  color?: string;
}

const DoubleChevronRightOutline: React.FC<DoubleChevronRightOutlineProps> = ({
  className = 'w-6 h-6',
  color = 'currentColor',
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_200_4634)">
        <path
          d="M7.00006 6.99988L12.0001 11.9999L7.00006 16.9999"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 6.99988L18 11.9999L13 16.9999"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_200_4634">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default DoubleChevronRightOutline;