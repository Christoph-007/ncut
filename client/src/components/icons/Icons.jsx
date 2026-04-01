import React from 'react';

// Common SVG props to allow sizing and custom coloring
const defaultProps = {
  viewBox: "0 0 20 20",
  fill: "none",
  width: "24px",
  height: "24px",
  style: { "var(--icon-stroke-width)": "1.5px" }
};

export function SearchIcon({ className = '', strokeWidth = "1.5", ...props }) {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className={className} strokeWidth={strokeWidth} {...defaultProps} {...props}>
      <circle cx="9" cy="9" r="4.75" stroke="currentColor" strokeWidth={strokeWidth}/>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="m12.5 12.5 3.25 3.25"/>
    </svg>
  );
}

export function CartIcon({ className = '', strokeWidth = "1.5", ...props }) {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className={className} strokeWidth={strokeWidth} {...defaultProps} {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M3.392 6.875h13.216v8.016c0 .567-.224 1.112-.624 1.513-.4.402-.941.627-1.506.627H5.522a2.13 2.13 0 0 1-1.506-.627 2.15 2.15 0 0 1-.624-1.513zM8.818 2.969h2.333c.618 0 1.211.247 1.649.686a2.35 2.35 0 0 1 .683 1.658v1.562H6.486V5.313c0-.622.246-1.218.683-1.658a2.33 2.33 0 0 1 1.65-.686"/>
    </svg>
  );
}

export function CloseIcon({ className = '', strokeWidth = "1.5", ...props }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" className={className} strokeWidth={strokeWidth} {...defaultProps} {...props}>
      <path d="M12 2L2 12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12L2 2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function AccountIcon({ className = '', strokeWidth = "1.5", ...props }) {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className={className} strokeWidth={strokeWidth} {...defaultProps} {...props}>
      <circle cx="10" cy="6.5" r="2.75" stroke="currentColor" strokeWidth={strokeWidth}/>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="m5.172 14.591-.437.786a.588.588 0 0 0 .514.873h9.502a.588.588 0 0 0 .514-.873l-.437-.786a5.523 5.523 0 0 0-9.656 0"/>
    </svg>
  );
}
