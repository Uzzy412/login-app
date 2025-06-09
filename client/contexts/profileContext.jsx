import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

// create context
export const ProfileContext = createContext();

// create provider
export const ProfileProvider = ({ children }) => {
  const [ user, setUser ] = useState('');

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser({ user: decoded.username });
  };

  const logout = () => {
    localStorage.removeItem('token');
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded = jwtDecode(token);
      setUser({ user: decoded.username });
    }
  }, []);

  const value = { user, login, logout };

  return (
    <ProfileContext.Provider value={ value }>
      { children }
    </ProfileContext.Provider>
  );
};
