import React from 'react';

interface InsightOutlineProps {
  className?: string;
  color?: string;
}

const InsightOutline: React.FC<InsightOutlineProps> = ({
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
        d="M8.29999 18.0399V16.8799C5.99999 15.4899 4.10999 12.7799 4.10999 9.89993C4.10999 4.94993 8.65999 1.06993 13.8 2.18993C16.06 2.68993 18.04 4.18993 19.07 6.25993C21.16 10.4599 18.96 14.9199 15.73 16.8699V18.0299C15.73 18.3199 15.84 18.9899 14.77 18.9899H9.25999C8.15999 18.9999 8.29999 18.5699 8.29999 18.0399Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 22C10.79 21.35 13.21 21.35 15.5 22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default InsightOutline;