import React from 'react';

interface LocationControlBoldProps {
  className?: string;
  color?: string;
}

const LocationControlBold: React.FC<LocationControlBoldProps> = ({
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
      <g clipPath="url(#clip0_222_6026)">
        <path
          d="M4.00003 8V6C4.00003 5.46957 4.21074 4.96086 4.58582 4.58579C4.96089 4.21071 5.4696 4 6.00003 4H8.00003"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.00003 16V18C4.00003 18.5304 4.21074 19.0391 4.58582 19.4142C4.96089 19.7893 5.4696 20 6.00003 20H8.00003"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 4H18C18.5305 4 19.0392 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V8"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 20H18C18.5305 20 19.0392 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V16"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 18L8.49997 13C8.16304 12.391 7.99082 11.7047 8.00034 11.0088C8.00986 10.3129 8.20079 9.63149 8.55425 9.03197C8.90771 8.43245 9.41148 7.93552 10.0158 7.59029C10.6201 7.24506 11.304 7.06348 12 7.06348C12.6959 7.06348 13.3799 7.24506 13.9842 7.59029C14.5885 7.93552 15.0922 8.43245 15.4457 9.03197C15.7992 9.63149 15.9901 10.3129 15.9996 11.0088C16.0091 11.7047 15.8369 12.391 15.5 13L12 18Z"
          fill={color}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11V11.01"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_222_6026">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default LocationControlBold;