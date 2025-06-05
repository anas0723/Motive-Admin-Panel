import React, { createContext, useContext, useState, useCallback } from 'react';
import { mockData } from '../data/mockDataGenerator';

const SchoolsContext = createContext();

export function SchoolsProvider({ children }) {
  const [schools, setSchools] = useState(mockData.schools);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const addSchool = useCallback((newSchool) => {
    setSchools(prevSchools => [...prevSchools, {
      ...newSchool,
      id: Math.random().toString(36).substr(2, 9),
      teams: []
    }]);
  }, []);

  const getSchoolById = useCallback((id) => {
    return schools.find(school => school.id === id);
  }, [schools]);

  const selectSchool = useCallback((school) => {
    setSelectedSchool(school);
  }, []);

  return (
    <SchoolsContext.Provider value={{ 
      schools, 
      addSchool, 
      getSchoolById, 
      selectedSchool,
      selectSchool
    }}>
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