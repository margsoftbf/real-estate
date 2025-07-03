import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
}

const DotOutlineInsideBold: React.FC<IconProps> = ({
  className = '',
  style = {},
  ...props
}) => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    {...props}
  >
    <circle
      cx="28"
      cy="28"
      r="27.5"
      fill="#7570FF"
      fillOpacity="0.4"
      stroke="#7065F0"
    />
    <path
      d="M28.0005 21.9001C30.9826 21.9004 33.3999 24.3183 33.3999 27.3005C33.3997 30.2826 30.9825 32.6997 28.0005 32.7C25.0183 32.7 22.6003 30.2827 22.6001 27.3005C22.6001 24.3182 25.0182 21.9001 28.0005 21.9001Z"
      fill="white"
      stroke="#7065F0"
      strokeWidth="6"
    />
  </svg>
);

export default DotOutlineInsideBold;
