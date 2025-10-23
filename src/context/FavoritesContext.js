// context/FavoritesContext.js
import React, { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

/**
 * FavoritesProvider component that wraps the app and provides favorites state
 */
export const FavoritesProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [allFavorites, setAllFavorites] = useLocalStorage('favorites', {});

  // Get current user's favorites
  const getUserFavorites = useCallback(() => {
    if (!currentUser) return [];
    return allFavorites[currentUser.id] || [];
  }, [currentUser, allFavorites]);

  // Add movie to favorites
  const addFavorite = useCallback((movie) => {
    if (!currentUser) return;

    const userFavorites = allFavorites[currentUser.id] || [];
    const exists = userFavorites.some((m) => m.id === movie.id);

    if (!exists) {
      const updated = {
        ...allFavorites,
        [currentUser.id]: [...userFavorites, { ...movie, addedAt: new Date().toISOString() }],
      };
      setAllFavorites(updated);
    }
  }, [currentUser, allFavorites, setAllFavorites]);

  // Remove movie from favorites
  const removeFavorite = useCallback((movieId) => {
    if (!currentUser) return;

    const userFavorites = allFavorites[currentUser.id] || [];
    const updated = {
      ...allFavorites,
      [currentUser.id]: userFavorites.filter((m) => m.id !== movieId),
    };
    setAllFavorites(updated);
  }, [currentUser, allFavorites, setAllFavorites]);

  // Check if movie is in favorites
  const isFavorite = useCallback((movieId) => {
    const favorites = getUserFavorites();
    return favorites.some((m) => m.id === movieId);
  }, [getUserFavorites]);

  // Clear all favorites for current user
  const clearFavorites = useCallback(() => {
    if (!currentUser) return;
    const updated = { ...allFavorites };
    delete updated[currentUser.id];
    setAllFavorites(updated);
  }, [currentUser, allFavorites, setAllFavorites]);

  const value = {
    favorites: getUserFavorites(),
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

/**
 * Custom hook to use favorites context
 */
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
