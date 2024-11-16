import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export default ({ children }) => {
  // Initialize `auth` state from localStorage or use default values
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : { isAuthenticated: false, user: null };
  });

  // Sync `auth` state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
