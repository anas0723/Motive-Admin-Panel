import React from 'react';

const dummySchools = [
  { id: 1, name: 'Central High School', city: 'Springfield', state: 'IL' },
  { id: 2, name: 'Northwood Academy', city: 'Oakville', state: 'CA' },
  { id: 3, name: 'Riverside Prep', city: 'Maplewood', state: 'NY' },
  { id: 4, name: 'Mountain View High', city: 'Boulder', state: 'CO' },
  { id: 5, name: 'Coastline Academy', city: 'Santa Monica', state: 'CA' },
];

function SchoolSelect({ value, onChange, label = 'Select School', required = false, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor="school-select" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id="school-select"
        name="school"
        value={value || ''}
        onChange={onChange}
        required={required}
        className="input-primary mt-1"
      >
        <option value="">Choose a school...</option>
        {dummySchools.map((school) => (
          <option key={school.id} value={school.id}>
            {school.name} - {school.city}, {school.state}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SchoolSelect; 