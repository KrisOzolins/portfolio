import React from 'react';

const Logo = ({ color = 'white' }) => {
  return (
    <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="3" y1="30" x2="3" stroke={color} strokeWidth="6" />
      <line y1="-1.5" x2="16.207" y2="-1.5" transform="matrix(0.672602 0.740004 -0.672602 0.740004 8 17.3927)" stroke={color} strokeWidth="3" />
      <line
        y1="-1.5"
        x2="16.207"
        y2="-1.5"
        transform="matrix(0.672602 -0.740004 0.672602 0.740004 10.0992 18.9932)"
        stroke={color}
        strokeWidth="3"
      />
      <line x1="23" y1="28.5" x2="31" y2="28.5" stroke={color} strokeWidth="3" />
    </svg>
  );
};

export default Logo;
