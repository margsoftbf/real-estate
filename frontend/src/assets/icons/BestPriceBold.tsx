import React from 'react';

interface BestPriceBoldProps {
  className?: string;
  color?: string;
}

const BestPriceBold: React.FC<BestPriceBoldProps> = ({
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
      <g clipPath="url(#clip0_222_5993)">
        <path 
          d="M4.99997 21V5C4.99997 4.46957 5.21068 3.96086 5.58576 3.58579C5.96083 3.21071 6.46954 3 6.99997 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21L16 19L14 21L12 19L9.99997 21L7.99997 19L4.99997 21Z" 
          fill={color} 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M14 8H11.5C11.1022 8 10.7207 8.15804 10.4394 8.43934C10.1581 8.72064 10 9.10218 10 9.5C10 9.89782 10.1581 10.2794 10.4394 10.5607C10.7207 10.842 11.1022 11 11.5 11H12.5C12.8979 11 13.2794 11.158 13.5607 11.4393C13.842 11.7206 14 12.1022 14 12.5C14 12.8978 13.842 13.2794 13.5607 13.5607C13.2794 13.842 12.8979 14 12.5 14H10M12 14V15.5M12 6.5V8" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_222_5993">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default BestPriceBold;