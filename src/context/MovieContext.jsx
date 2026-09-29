import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getTrendingMovies,
  searchMovies as apiSearchMovies,
  getMovieGenres,
  getActiveApiKey,
} from '../services/tmdbApi';
import { getItem, setItem, STORAGE_KEYS } from '../utils/localStorage';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  // Theme state
  const [themeMode, setThemeMode] = useState(() => getItem(STORAGE_KEYS.THEME_MODE, 'dark'));

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState(() => getItem(STORAGE_KEYS.FAVORITES, []));

  // Last searched movie query persisted in localStorage
  const [lastSearchedMovie, setLastSearchedMovieState] = useState(() =>
    getItem(STORAGE_KEYS.LAST_SEARCHED, '')
  );

  // API Key state (checks env or localStorage fallback)
  const [apiKey, setApiKeyState] = useState(() => getActiveApiKey());
  const [isApiKeyMissing, setIsApiKeyMissing] = useState(!getActiveApiKey());

  // Trending movies state
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTimeWindow, setTrendingTimeWindow] = useState('day');
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [trendingError, setTrendingError] = useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchPage, setSearchPage] = useState(1);
  const [totalSearchPages, setTotalSearchPages] = useState(0);
  const [totalSearchResults, setTotalSearchResults] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchLoadingMore, setSearchLoadingMore] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Genres cache
  const [genres, setGenres] = useState([]);

  // Toast / Snackbar feedback
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });

  // Sync theme mode to localStorage
  const toggleThemeMode = () => {
    setThemeMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      setItem(STORAGE_KEYS.THEME_MODE, next);
      return next;
    });
  };

  // Toast helper
  const showToast = useCallback((message, severity = 'info') => {
    setToast({ open: true, message, severity });
  }, []);

  const closeToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  // Save last searched movie
  const setLastSearchedMovie = useCallback((query) => {
    if (query && query.trim()) {
      const trimmed = query.trim();
      setLastSearchedMovieState(trimmed);
      setItem(STORAGE_KEYS.LAST_SEARCHED, trimmed);
    }
  }, []);

  // Save custom API key
  const setCustomApiKey = useCallback(
    (key) => {
      const trimmed = key ? key.trim() : '';
      setItem(STORAGE_KEYS.CUSTOM_API_KEY, trimmed);
      setApiKeyState(trimmed);
      setIsApiKeyMissing(!trimmed);
      showToast('API Key updated successfully!', 'success');
    },
    [showToast]
  );

  // Favorites management
  const addFavorite = useCallback(
    (movie) => {
      if (!movie || !movie.id) return;
      setFavorites((prev) => {
        if (prev.some((item) => item.id === movie.id)) return prev;
        const updated = [movie, ...prev];
        setItem(STORAGE_KEYS.FAVORITES, updated);
        return updated;
      });
      showToast(`"${movie.title}" added to favorites!`, 'success');
    },
    [showToast]
  );

  const removeFavorite = useCallback(
    (movieId) => {
      setFavorites((prev) => {
        const found = prev.find((m) => m.id === movieId);
        const updated = prev.filter((item) => item.id !== movieId);
        setItem(STORAGE_KEYS.FAVORITES, updated);
        if (found) {
          showToast(`"${found.title}" removed from favorites.`, 'info');
        }
        return updated;
      });
    },
    [showToast]
  );

  const isFavorite = useCallback(
    (movieId) => {
      return favorites.some((item) => item.id === movieId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (movie) => {
      if (isFavorite(movie.id)) {
        removeFavorite(movie.id);
      } else {
        addFavorite(movie);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  // Load genres once
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const list = await getMovieGenres();
        setGenres(list);
      } catch (err) {
        console.warn('Failed to load genres:', err.message);
      }
    };
    fetchGenres();
  }, [apiKey]);

  // Fetch trending movies
  const fetchTrending = useCallback(
    async (timeWindow = 'day') => {
      setTrendingLoading(true);
      setTrendingError(null);
      try {
        const data = await getTrendingMovies(timeWindow);
        setTrendingMovies(data.results || []);
        setTrendingTimeWindow(timeWindow);
      } catch (err) {
        setTrendingError(err.message || 'Failed to load trending movies.');
        if (err.status === 401) {
          setIsApiKeyMissing(true);
        }
      } finally {
        setTrendingLoading(false);
      }
    },
    []
  );

  // Initial load of trending movies
  useEffect(() => {
    fetchTrending(trendingTimeWindow);
  }, [fetchTrending, trendingTimeWindow, apiKey]);

  // Search movies (Page 1)
  const executeSearch = useCallback(
    async (query) => {
      const trimmed = query?.trim();
      if (!trimmed) return;

      setSearchQuery(trimmed);
      setLastSearchedMovie(trimmed);
      setSearchLoading(true);
      setSearchError(null);
      setSearchPage(1);

      try {
        const data = await apiSearchMovies(trimmed, 1);
        setSearchResults(data.results || []);
        setTotalSearchPages(data.total_pages || 0);
        setTotalSearchResults(data.total_results || 0);
      } catch (err) {
        setSearchError(err.message || 'Unable to load search results.');
        setSearchResults([]);
        if (err.status === 401) {
          setIsApiKeyMissing(true);
        }
      } finally {
        setSearchLoading(false);
      }
    },
    [setLastSearchedMovie]
  );

  // Load more search results for infinite scroll
  const loadMoreSearchResults = useCallback(async () => {
    if (searchLoadingMore || searchLoading) return;
    if (searchPage >= totalSearchPages) return;
    if (!searchQuery) return;

    const nextPage = searchPage + 1;
    setSearchLoadingMore(true);

    try {
      const data = await apiSearchMovies(searchQuery, nextPage);
      setSearchResults((prev) => {
        // Deduplicate movies by id
        const existingIds = new Set(prev.map((m) => m.id));
        const newUnique = (data.results || []).filter((m) => !existingIds.has(m.id));
        return [...prev, ...newUnique];
      });
      setSearchPage(nextPage);
    } catch (err) {
      showToast(err.message || 'Error loading more results.', 'error');
    } finally {
      setSearchLoadingMore(false);
    }
  }, [searchLoadingMore, searchLoading, searchPage, totalSearchPages, searchQuery, showToast]);

  return (
    <MovieContext.Provider
      value={{
        themeMode,
        toggleThemeMode,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        lastSearchedMovie,
        setLastSearchedMovie,
        apiKey,
        isApiKeyMissing,
        setCustomApiKey,
        trendingMovies,
        trendingTimeWindow,
        setTrendingTimeWindow,
        trendingLoading,
        trendingError,
        fetchTrending,
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        searchPage,
        totalSearchPages,
        totalSearchResults,
        searchLoading,
        searchLoadingMore,
        searchError,
        executeSearch,
        loadMoreSearchResults,
        genres,
        toast,
        showToast,
        closeToast,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

export default MovieContext;
