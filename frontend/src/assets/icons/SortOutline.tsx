import { SVGProps } from "react";

const SortOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3 7H21" stroke="#000929" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 12H18" stroke="#000929" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 17H14" stroke="#000929" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default SortOutline;