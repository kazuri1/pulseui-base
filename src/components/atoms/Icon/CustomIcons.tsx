import React from "react";

export const TrendUp: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="40"
    height="32"
    viewBox="0 0 40 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M24 10L26.29 12.29L21.41 17.17L17.41 13.17L10 20.59L11.41 22L17.41 16L21.41 20L27.71 13.71L30 16V10H24Z"
      fill="currentColor"
    />
  </svg>
);

export const TrendDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="40"
    height="32"
    viewBox="0 0 40 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M24 22L26.29 19.71L21.41 14.83L17.41 18.83L10 11.41L11.41 10L17.41 16L21.41 12L27.71 18.29L30 16V22H24Z"
      fill="currentColor"
    />
  </svg>
);









