import React from 'react';

interface IncomeRentBoldProps {
  className?: string;
  color?: string;
}

const IncomeRentBold: React.FC<IncomeRentBoldProps> = ({
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
      <g clipPath="url(#clip0_253_5438)">
        <path
          d="M20.7125 7.88203L14.0463 2.70181C13.4612 2.24711 12.7412 2.00024 12 2.00024C11.2588 2.00024 10.5388 2.24711 9.95375 2.70181L3.28625 7.88203C2.88555 8.19334 2.56137 8.59203 2.33844 9.04764C2.11552 9.50324 1.99976 10.0037 2 10.5108V19.5026C2 20.165 2.26339 20.8003 2.73223 21.2687C3.20107 21.7371 3.83696 22.0002 4.5 22.0002H19.5C20.163 22.0002 20.7989 21.7371 21.2678 21.2687C21.7366 20.8003 22 20.165 22 19.5026V10.5108C22 9.48305 21.525 8.51269 20.7125 7.88203Z"
          fill={color}
        />
        <path
          d="M9.5 14.75C9.5 15.72 10.25 16.5 11.17 16.5H13.05C13.85 16.5 14.5 15.82 14.5 14.97C14.5 14.06 14.1 13.73 13.51 13.52L10.5 12.47C9.91 12.26 9.51001 11.94 9.51001 11.02C9.51001 10.18 10.16 9.48999 10.96 9.48999H12.84C13.76 9.48999 14.51 10.27 14.51 11.24"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 8.5V17.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_253_5438">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default IncomeRentBold;