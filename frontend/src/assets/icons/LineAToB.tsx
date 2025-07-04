import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
}

const LineAToB: React.FC<IconProps> = ({
  className = '',
  style = {},
  ...props
}) => (
  <svg
    width="228"
    height="310"
    viewBox="0 0 228 310"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    {...props}
  >
    <path
      d="M8 1L3.72457 37.7687C3.29913 41.4275 5.42693 44.9039 8.87874 46.1896L218.925 124.424C222.234 125.656 224.344 128.913 224.116 132.437L217.665 232.213C217.328 237.426 212.167 240.923 207.2 239.303L105.274 206.047C101.631 204.858 97.657 206.42 95.7975 209.77L41 308.5"
      stroke="url(#paint0_linear_331_10958)"
      strokeWidth="6"
    />
    <defs>
      <linearGradient
        id="paint0_linear_331_10958"
        x1="49.5"
        y1="331.5"
        x2="5.5"
        y2="1.00002"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#100A55" />
        <stop offset="1" stopColor="#100A55" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default LineAToB;
