import { SVGProps } from "react";

const SortDescendingOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_300_6430)">
      <path d="M4 6H13" stroke="#000929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 12H11" stroke="#000929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 18H11" stroke="#000929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 15L18 18L21 15" stroke="#000929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 6V18" stroke="#000929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_300_6430">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

export default SortDescendingOutline;