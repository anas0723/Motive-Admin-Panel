import { createContext, useContext, useState } from 'react';
import { initialAthletes } from '../pages/Athlete';

const AthletesContext = createContext();

export function AthletesProvider({ children }) {
  const [athletes, setAthletes] = useState(initialAthletes);

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