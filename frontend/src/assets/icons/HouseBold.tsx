import React from 'react';

interface HouseBoldProps {
  className?: string;
  color?: string;
}

const HouseBold: React.FC<HouseBoldProps> = ({
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
        d="M10 15.5C9.59 15.5 9.25 15.84 9.25 16.25V17.75C9.25 18.16 9.59 18.5 10 18.5C10.41 18.5 10.75 18.16 10.75 17.75V16.25C10.75 15.84 10.41 15.5 10 15.5Z" 
        fill={color}
      />
      <path 
        d="M22 21.25H21V9.97997C21 9.35997 20.72 8.77997 20.23 8.39997L13.23 2.95997C12.51 2.38997 11.49 2.38997 10.77 2.95997L3.77 8.39997C3.28 8.77997 3 9.35997 3 9.96997L2.95 21.25H2C1.59 21.25 1.25 21.58 1.25 22C1.25 22.41 1.59 22.75 2 22.75H22C22.41 22.75 22.75 22.41 22.75 22C22.75 21.58 22.41 21.25 22 21.25ZM10.5 6.74997H13.5C13.91 6.74997 14.25 7.08997 14.25 7.49997C14.25 7.90997 13.91 8.24997 13.5 8.24997H10.5C10.09 8.24997 9.75 7.90997 9.75 7.49997C9.75 7.08997 10.09 6.74997 10.5 6.74997ZM17 21.25H7V12.5C7 11.67 7.67 11 8.5 11H15.5C16.33 11 17 11.67 17 12.5V21.25Z" 
        fill={color}
      />
    </svg>
  );
};

export default HouseBold;