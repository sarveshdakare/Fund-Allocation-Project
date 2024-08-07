
// import React, { createContext, useState, useContext } from 'react';
// import { useNavigate } from 'react-router';
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//  const navigate=useNavigate();

//   const signIn = (token) => {
//     localStorage.setItem('token', token);
//     setIsAuthenticated(true);
//   };

//   const signOut = () => {
//     localStorage.removeItem('token');

//     setIsAuthenticated(false);
//     navigate('/'); 
  
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// src/contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Default isAdmin to false
  const navigate = useNavigate();

  const signIn = (token, admin = false) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setIsAdmin(admin); // Set admin state based on argument
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false); // Reset admin state on sign out
    navigate('/'); // Redirect to the home page or login page
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

