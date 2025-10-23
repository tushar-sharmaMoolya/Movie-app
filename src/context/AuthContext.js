// context/AuthContext.js
import React, { createContext, useCallback, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

/**
 * AuthProvider component that wraps the app and provides auth state
 */
export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useLocalStorage('users', []);
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated', false);

  // Register a new user
  const register = useCallback((userData) => {
    const existingUser = users.find(
      (u) => u.email === userData.email || (userData.socialProvider && u.socialId === userData.socialId)
    );

    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    };

    setUsers([...users, newUser]);
    return newUser;
  }, [users, setUsers]);

  // Login user
  const login = useCallback((email, password, socialLogin = null) => {
    let user;

    if (socialLogin) {
      user = users.find((u) => u.socialId === socialLogin.socialId && u.socialProvider === socialLogin.provider);
    } else {
  
      user = users.find((u) => u.email === email && u.password === password);
    }

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const userToSet = { ...user };
    delete userToSet.password; // Don't store password in current user
    setCurrentUser(userToSet);
    setIsAuthenticated(true);
    return userToSet;
  }, [users, setCurrentUser, setIsAuthenticated]);

  // Logout user
  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  }, [setCurrentUser, setIsAuthenticated]);

  // Check if email exists (for registration)
  const emailExists = useCallback((email) => {
    return users.some((u) => u.email === email);
  }, [users]);

  const value = {
    currentUser,
    isAuthenticated,
    register,
    login,
    logout,
    emailExists,
    users,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
