import React from 'react';
import { useSchools } from '../context/SchoolsContext';
import Select from './ui/Select';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';

function SchoolDropdown({ value, onChange, label = 'Select School', required = false, className = '' }) {
  const { schools } = useSchools();

  const options = [
    { value: '', label: 'Choose a school...' },
    ...schools.map((school) => ({
      value: school.id,
      label: `${school.name} - ${school.city}, ${school.state}`
    }))
  ];

  return (
    <Select
      label={label}
      value={value || ''}
      onChange={onChange}
      required={required}
      options={options}
      className={className}
      icon={BuildingOffice2Icon}
    />
  );
}

export default SchoolDropdown; 