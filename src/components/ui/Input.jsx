import React from 'react';
import { twMerge } from 'tailwind-merge';

const Input = ({
  label,
  error,
  className = '',
  icon: Icon,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          className={twMerge(
            'w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm transition-all duration-200',
            'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50',
            'placeholder:text-gray-400',
            'disabled:bg-gray-50 disabled:text-gray-500',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            Icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input; 