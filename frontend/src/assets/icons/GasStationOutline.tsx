import React from 'react';

interface GasStationOutlineProps {
  className?: string;
  color?: string;
}

const GasStationOutline: React.FC<GasStationOutlineProps> = ({
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
        d="M3.5 22V5C3.5 3 4.84 2 6.5 2H14.5C16.16 2 17.5 3 17.5 5V22H3.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 22H19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.39 10.0001H12.62C13.66 10.0001 14.51 9.50011 14.51 8.11011V6.88011C14.51 5.49011 13.66 4.99011 12.62 4.99011H8.39C7.35 4.99011 6.5 5.49011 6.5 6.88011V8.11011C6.5 9.50011 7.35 10.0001 8.39 10.0001Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 13H9.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 16.01L22 16V10L20 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GasStationOutline;