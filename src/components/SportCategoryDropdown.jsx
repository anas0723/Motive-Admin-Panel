import React from 'react';

const sports = [
  { value: 'Football', label: '⚽ Football' },
  { value: 'Swimming', label: '🏊 Swimming' },
  { value: 'Basketball', label: '🏀 Basketball' },
  { value: 'Running', label: '🏃 Running' },
  { value: 'Cycling', label: '🚴 Cycling' },
  { value: 'Gym', label: '🏋️ Gym' },
  { value: 'Yoga', label: '🧘 Yoga' },
  { value: 'Golf', label: '⛳ Golf' },
];

function SportCategoryDropdown({
  value,
  onChange,
  label = 'Sport Category',
  required = false,
  className = '',
}) {
  return (
    <div className={className}>
      <label htmlFor="sport-category" className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id="sport-category"
        name="specialization"
        value={value || ''}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Select a sport...</option>
        {sports.map((sport) => (
          <option key={sport.value} value={sport.value}>
            {sport.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SportCategoryDropdown; 