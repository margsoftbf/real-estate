import React from 'react';

const PropertyInsuranceOutline = ({
  className = 'w-5 h-5',
  color = 'currentColor',
  ...props
}: React.SVGProps<SVGSVGElement> & { color?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <g clipPath="url(#clip0_86_2064)">
      <path
        d="M4.22222 12H2L12 2L22 12H19.7778"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.22223 12V19.7778C4.22223 20.3671 4.45636 20.9324 4.8731 21.3491C5.28985 21.7659 5.85508 22 6.44445 22H17.5556C18.1449 22 18.7102 21.7659 19.1269 21.3491C19.5437 20.9324 19.7778 20.3671 19.7778 19.7778V12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 13.5L11 15.5L15 11.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_86_2064">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default PropertyInsuranceOutline;
