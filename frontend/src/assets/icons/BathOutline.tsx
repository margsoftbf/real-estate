import React from 'react';

const BathOutline = ({ className = 'w-6 h-6', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <g clipPath="url(#clip0_228_5797)">
      <path
        d="M4 12H20C20.2652 12 20.5196 12.1054 20.7071 12.2929C20.8946 12.4804 21 12.7348 21 13V16C21 17.0609 20.5786 18.0783 19.8284 18.8284C19.0783 19.5786 18.0609 20 17 20H7C5.93913 20 4.92172 19.5786 4.17157 18.8284C3.42143 18.0783 3 17.0609 3 16V13C3 12.7348 3.10536 12.4804 3.29289 12.2929C3.48043 12.1054 3.73478 12 4 12V12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 12V5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3H11V5.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 21L5 19.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 21L19 19.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_228_5797">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default BathOutline;
