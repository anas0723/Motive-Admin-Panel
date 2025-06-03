import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import Athlete from './pages/Athlete';
import Coach from './pages/Coach';
import School from './pages/School';
import SidebarLayout from './layouts/SidebarLayout'
import { AthletesProvider } from './context/AthletesContext';
import { SchoolsProvider } from './context/SchoolsContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for authentication status in localStorage on initial load
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (email, password) => {
    if (email === 'motive.athleteanas@gmail.com' && password === 'motive123') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  if (loading) {
    // Optionally show a loading spinner or screen while checking auth status
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <SchoolsProvider>
        <AthletesProvider>
          <Routes>
            <Route 
              path="/login" 
              element={
                !isAuthenticated ? (
                  <Login onLogin={handleLogin} />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              } 
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <SidebarLayout onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="team" element={<Team />} />
              <Route path="athlete" element={<Athlete />} />
              <Route path="coach" element={<Coach />} />
              <Route path="school" element={<School />} />
              <Route index element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </AthletesProvider>
      </SchoolsProvider>
    </Router>
  );
}

export default App;


// import React from 'react'

// const App = () => {
//   return (
//     <>
//     <h1 className=' text-red-700 bg-amber-900'>Anas</h1>
//     </>
//   )
// }

// export default App
