import React from 'react';

interface BoldOutlineProps {
  className?: string;
  color?: string;
}

const BoldOutline: React.FC<BoldOutlineProps> = ({
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
      <g clipPath="url(#clip0_184_2651)">
        <path 
          d="M7 5H13C13.9283 5 14.8185 5.36875 15.4749 6.02513C16.1313 6.6815 16.5 7.57174 16.5 8.5C16.5 9.42826 16.1313 10.3185 15.4749 10.9749C14.8185 11.6313 13.9283 12 13 12H7V5Z" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M13 12H14C14.9283 12 15.8185 12.3687 16.4749 13.0251C17.1313 13.6815 17.5 14.5717 17.5 15.5C17.5 16.4283 17.1313 17.3185 16.4749 17.9749C15.8185 18.6313 14.9283 19 14 19H7V12" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_184_2651">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default BoldOutline;