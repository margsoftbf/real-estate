import React from 'react';

interface CheckCircleOutlineProps {
  className?: string;
  color?: string;
}

const CheckCircleOutline: React.FC<CheckCircleOutlineProps> = ({
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
      <path 
        d="M12.0001 21.9999C17.5001 21.9999 22.0001 17.4999 22.0001 11.9999C22.0001 6.49988 17.5001 1.99988 12.0001 1.99988C6.50012 1.99988 2.00012 6.49988 2.00012 11.9999C2.00012 17.4999 6.50012 21.9999 12.0001 21.9999Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M7.74988 12L10.5799 14.83L16.2499 9.17004" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckCircleOutline;