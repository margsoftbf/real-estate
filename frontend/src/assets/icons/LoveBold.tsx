import React from 'react';

interface LoveBoldProps {
  className?: string;
  color?: string;
}

const LoveBold: React.FC<LoveBoldProps> = ({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.45965 4.52185C4.39446 3.58731 5.66218 3.06232 6.98401 3.06232C8.30584 3.06232 9.57355 3.58731 10.5084 4.52185L11.969 5.98119L13.4296 4.52185C13.8894 4.04573 14.4395 3.66597 15.0476 3.40471C15.6558 3.14346 16.31 3.00594 16.9719 3.00019C17.6338 2.99444 18.2902 3.12056 18.9028 3.37121C19.5154 3.62186 20.072 3.99201 20.5401 4.46006C21.0081 4.92811 21.3783 5.48469 21.6289 6.09732C21.8796 6.70995 22.0057 7.36637 21.9999 8.02827C21.9942 8.69017 21.8567 9.34429 21.5954 9.95248C21.3342 10.5607 20.9544 11.1107 20.4783 11.5706L11.969 20.0811L3.45965 11.5706C2.52511 10.6358 2.00012 9.36804 2.00012 8.04621C2.00012 6.72438 2.52511 5.45666 3.45965 4.52185Z"
        fill={color}
      />
    </svg>
  );
};

export default LoveBold;