import React from 'react';

interface LowCommisionBoldProps {
  className?: string;
  color?: string;
}

const LowCommisionBold: React.FC<LowCommisionBoldProps> = ({
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
        d="M12 21L22 14H18.01L18 3H6V14H2L12 21Z"
        fill={color}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 14L15 8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 9C9.77614 9 10 8.77614 10 8.5C10 8.22386 9.77614 8 9.5 8C9.22386 8 9 8.22386 9 8.5C9 8.77614 9.22386 9 9.5 9Z"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 14C14.7761 14 15 13.7761 15 13.5C15 13.2239 14.7761 13 14.5 13C14.2239 13 14 13.2239 14 13.5C14 13.7761 14.2239 14 14.5 14Z"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LowCommisionBold;
