import React from 'react';
import { useSchools } from '../context/SchoolsContext';

function SchoolDropdown({ value, onChange, label = 'Select School', required = false, className = '' }) {
  const { schools } = useSchools();

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor="school-select" className="block text-sm font-medium text-gray-800 mb-1">
        {label}
      </label>
      <select
        id="school-select"
        name="school"
        value={value || ''}
        onChange={onChange}
        required={required}
        className="input-primary"
      >
        <option value="">Choose a school...</option>
        {schools.map((school) => (
          <option key={school.id} value={school.id}>
            {school.name} - {school.city}, {school.state}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SchoolDropdown; 