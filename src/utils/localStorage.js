/**
 * LocalStorage utility helpers with safe JSON handling and error guards
 */

export const STORAGE_KEYS = {
  FAVORITES: 'favoriteMovies',
  LAST_SEARCHED: 'lastSearchedMovie',
  THEME_MODE: 'themeMode',
  AUTH_USER: 'authUser',
  CUSTOM_API_KEY: 'tmdbCustomApiKey',
};

export const getItem = (key, defaultValue = null) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const setItem = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing to localStorage key "${key}":`, error);
  }
};

export const removeItem = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
  }
};
