import { createContext, useContext, useState, useEffect } from 'react';
import { mockData, getAllAthletes } from '../data/mockDataGenerator';

const AthletesContext = createContext();

export function AthletesProvider({ children }) {
  const [athletes, setAthletes] = useState(() => getAllAthletes(mockData));

  return (
    <AthletesContext.Provider value={{ athletes, setAthletes }}>
      {children}
    </AthletesContext.Provider>
  );
}

export function useAthletes() {
  const context = useContext(AthletesContext);
  if (!context) {
    throw new Error('useAthletes must be used within an AthletesProvider');
  }
  return context;
} 