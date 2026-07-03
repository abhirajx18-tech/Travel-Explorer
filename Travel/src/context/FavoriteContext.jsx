import { createContext, useState, useEffect } from 'react';

export const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  const addFavorite = (country) => {
    setFavorites(prevFavorites => {
      // Check if already exists
      if (prevFavorites.some(fav => fav.cca2 === country.cca2)) {
        return prevFavorites;
      }
      return [...prevFavorites, country];
    });
  };

  const removeFavorite = (countryCode) => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(fav => fav.cca2 !== countryCode)
    );
  };

  const isFavorite = (countryCode) => {
    return favorites.some(fav => fav.cca2 === countryCode);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite, clearFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
