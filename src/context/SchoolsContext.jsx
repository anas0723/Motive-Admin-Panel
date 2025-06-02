import React, { createContext, useContext, useState } from 'react';

// Sample schools data
export const initialSchools = [
  { id: 1, name: 'Lincoln High School', location: 'New York', type: 'Public' },
  { id: 2, name: 'Washington Academy', location: 'Boston', type: 'Private' },
  { id: 3, name: 'Roosevelt High School', location: 'Chicago', type: 'Public' },
  { id: 4, name: 'Jefferson Middle School', location: 'Los Angeles', type: 'Public' },
  { id: 5, name: 'Madison High School', location: 'Seattle', type: 'Private' },
];

const SchoolsContext = createContext();

export function SchoolsProvider({ children }) {
  const [schools, setSchools] = useState([
    { id: 1, name: 'Central High School', city: 'Springfield', state: 'IL' },
    { id: 2, name: 'Northwood Academy', city: 'Oakville', state: 'CA' },
    { id: 3, name: 'Riverside Prep', city: 'Maplewood', state: 'NY' },
    { id: 4, name: 'Mountain View High', city: 'Boulder', state: 'CO' },
    { id: 5, name: 'Coastline Academy', city: 'Santa Monica', state: 'CA' },
  ]);

  const addSchool = (newSchool) => {
    const schoolWithId = {
      ...newSchool,
      id: schools.length + 1,
    };
    setSchools(prevSchools => [...prevSchools, schoolWithId]);
  };

  const getSchoolById = (id) => {
    return schools.find(school => school.id === id);
  };

  return (
    <SchoolsContext.Provider value={{ schools, addSchool, getSchoolById }}>
      {children}
    </SchoolsContext.Provider>
  );
}

export function useSchools() {
  const context = useContext(SchoolsContext);
  if (!context) {
    throw new Error('useSchools must be used within a SchoolsProvider');
  }
  return context;
} 