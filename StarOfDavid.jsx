import React from 'react';

export function StarOfDavid({ className, size = 24 }) {
  // A true Star of David is typically hollow with a noticeable stroke width.
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinejoin="miter" 
      className={className}
    >
      <path d="M12 2L20.66 17H3.34L12 2Z" />
      <path d="M12 22L3.34 7H20.66L12 22Z" />
    </svg>
  );
}
