import React from 'react';

const Logo = ({ width = 200, height = 50 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 50"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: 'drop-shadow(0 0 8px #00fff2)',
      }}
    >
      {/* Shield Background */}
      <path
        d="M25 5 L45 5 L45 20 C45 32 35 42 25 45 C15 42 5 32 5 20 L5 5 Z"
        fill="none"
        stroke="#00fff2"
        strokeWidth="2"
        style={{
          filter: 'drop-shadow(0 0 3px #00fff2)',
        }}
      />
      
      {/* Flag inside shield */}
      <path
        d="M15 15 L35 15 L35 25 L15 25 Z"
        fill="#00fff2"
        style={{
          filter: 'drop-shadow(0 0 5px #00fff2)',
        }}
      />

      {/* Text */}
      <text
        x="60"
        y="32"
        fontFamily="Arial, sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="#00fff2"
        stroke="#00D8CD"
        strokeWidth="0.5"
        style={{
          filter: 'drop-shadow(0 0 3px #00fff2)',
        }}
      >
        FlagGuard
      </text>
    </svg>
  );
};

export default Logo; 