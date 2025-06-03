import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({
  children,
  className = '',
  header,
  footer,
  variant = 'default',
  ...props
}) => {
  const variants = {
    default: 'bg-white',
    elevated: 'bg-white shadow-lg',
    bordered: 'bg-white border border-gray-200',
    gradient: 'bg-gradient-to-br from-white to-gray-50',
  };

  return (
    <div
      className={twMerge(
        'rounded-xl overflow-hidden',
        variants[variant],
        className
      )}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-gray-100">
          {header}
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 