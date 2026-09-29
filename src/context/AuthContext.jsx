import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItem, setItem, removeItem, STORAGE_KEYS } from '../utils/localStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getItem(STORAGE_KEYS.AUTH_USER, null));
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Keep user state synchronized with localStorage
    const savedUser = getItem(STORAGE_KEYS.AUTH_USER, null);
    if (savedUser && !user) {
      setUser(savedUser);
    }
  }, [user]);

  const login = (username, password) => {
    setAuthError(null);
    const trimmedUsername = username?.trim();

    if (!trimmedUsername || !password) {
      const err = 'Both username and password are required.';
      setAuthError(err);
      return { success: false, error: err };
    }

    const userData = {
      username: trimmedUsername,
      loginTime: new Date().toISOString(),
      name: trimmedUsername.charAt(0).toUpperCase() + trimmedUsername.slice(1),
    };

    setItem(STORAGE_KEYS.AUTH_USER, userData);
    setUser(userData);
    return { success: true, user: userData };
  };

  const logout = () => {
    removeItem(STORAGE_KEYS.AUTH_USER);
    setUser(null);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        authError,
        setAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
