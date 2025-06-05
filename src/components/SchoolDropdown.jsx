import React from 'react';
import { useSchools } from '../context/SchoolsContext';

function SchoolDropdown({ value, onChange, label = 'Select School', required = false, className = '' }) {
  const { schools } = useSchools();

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor="school-select" className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id="school-select"
        name="school"
        value={value || ''}
        onChange={onChange}
        required={required}
        className="block w-full rounded-md border-gray-300 py-2 px-3 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Choose a school...</option>        {schools.map((school) => (
          <option key={school.id} value={school.name}>
            {school.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SchoolDropdown; 