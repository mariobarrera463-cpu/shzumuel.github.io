import React from 'react';

export function StarOfDavid({ className, size = 24, fill = "none" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={fill} 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {/* Precision Geometric Star of David (Interlocking Triangles) */}
      <path d="M12 2L20.66 17H3.34L12 2Z" />
      <path d="M12 22L3.34 7H20.66L12 22Z" />
    </svg>
  );
}
