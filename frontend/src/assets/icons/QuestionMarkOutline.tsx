import React from 'react';

interface QuestionMarkOutlineProps {
  className?: string;
  color?: string;
}

const QuestionMarkOutline: React.FC<QuestionMarkOutlineProps> = ({
  className = 'w-6 h-6',
  color = 'currentColor',
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_418_14927)">
        <path
          d="M9.99984 18.3334C14.5832 18.3334 18.3332 14.5834 18.3332 10.0001C18.3332 5.41675 14.5832 1.66675 9.99984 1.66675C5.4165 1.66675 1.6665 5.41675 1.6665 10.0001C1.6665 14.5834 5.4165 18.3334 9.99984 18.3334Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 7.70712C7.5 7.21014 7.73033 6.73352 8.14032 6.3821C8.55031 6.03068 9.10637 5.83325 9.68618 5.83325H10.3108C10.8906 5.83325 11.4467 6.03068 11.8567 6.3821C12.2667 6.73352 12.497 7.21014 12.497 7.70712C12.52 8.11266 12.4106 8.5147 12.1853 8.85267C11.96 9.19064 11.6309 9.44625 11.2477 9.581C10.8646 9.76066 10.5355 10.1015 10.3102 10.5521C10.0849 11.0027 9.9755 10.9141 9.9985 11.4549"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99854 14.5781V14.5844"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_418_14927">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default QuestionMarkOutline;
