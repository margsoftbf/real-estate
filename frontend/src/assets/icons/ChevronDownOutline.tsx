import React from 'react';

interface ChevronDownOutlineProps {
  className?: string;
  color?: string;
}

const ChevronDownOutline: React.FC<ChevronDownOutlineProps> = ({
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
      <g clipPath="url(#clip0_86_1267)">
        <path 
          d="M5 8.5L12 15.5L19 8.5" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_86_1267">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default ChevronDownOutline;