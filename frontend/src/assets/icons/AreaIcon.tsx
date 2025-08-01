import React from 'react';

const AreaIcon = ({ className = 'w-6 h-6', ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <g clipPath="url(#clip0_228_5798)">
      <path
        d="M10.5979 18.6523L4.14766 12.2021C3.41758 11.472 3.41758 10.1278 4.14766 9.39768L10.5979 2.94747C11.328 2.21738 12.6722 2.21738 13.4023 2.94747L19.8525 9.39768C20.5826 10.1278 20.5826 11.472 19.8525 12.2021L13.4023 18.6523C12.6722 19.3824 11.328 19.3824 10.5979 18.6523V18.6523Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.3999 15.8059L7.63636 21.0424"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.3635 21.0424L21.6 15.8059"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_228_5798">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default AreaIcon;
