import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-soft p-6 hover:shadow-lg transition-shadow duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card; 