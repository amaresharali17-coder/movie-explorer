import axios from 'axios';
import { getItem, STORAGE_KEYS } from '../utils/localStorage';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

/**
 * Get active API key from environment variable or user-provided fallback in localStorage
 */
export const getActiveApiKey = () => {
  return (
    process.env.REACT_APP_TMDB_API_KEY ||
    getItem(STORAGE_KEYS.CUSTOM_API_KEY, '') ||
    ''
  );
};

// Create reusable Axios instance
const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically inject API key
tmdbClient.interceptors.request.use(
  (config) => {
    const apiKey = getActiveApiKey();
    if (!apiKey) {
      // Do not block request immediately; let it reach TMDb or trigger informative error
      console.warn('TMDb API key is not configured.');
    }
    config.params = {
      ...config.params,
      api_key: apiKey,
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for friendly error handling
tmdbClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let friendlyMessage = 'Unable to load movies. Please try again.';

    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        friendlyMessage = 'Request timed out. Please check your internet connection.';
      } else {
        friendlyMessage = 'Network error. Please check your internet connection and try again.';
      }
    } else {
      const status = error.response.status;
      if (status === 401) {
        friendlyMessage = 'Invalid or missing TMDb API key. Please check your API key configuration.';
      } else if (status === 404) {
        friendlyMessage = 'The requested movie or resource was not found.';
      } else if (status === 429) {
        friendlyMessage = 'Rate limit exceeded. Please wait a moment and try again.';
      } else if (status >= 500) {
        friendlyMessage = 'TMDb server error. Please try again later.';
      } else if (error.response.data && error.response.data.status_message) {
        friendlyMessage = error.response.data.status_message;
      }
    }

    const enhancedError = new Error(friendlyMessage);
    enhancedError.originalError = error;
    enhancedError.status = error.response ? error.response.status : null;
    return Promise.reject(enhancedError);
  }
);

/**
 * Image URL Helpers with size options and safe fallbacks
 */
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path, size = 'original') => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

/**
 * Generate inline SVG placeholder when poster is unavailable
 */
export const getPosterPlaceholder = (title = 'Movie') => {
  const encodedTitle = encodeURIComponent(title.length > 25 ? `${title.slice(0, 22)}...` : title);
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750" fill="%231e293b"><rect width="100%" height="100%" fill="%231e293b"/><path d="M220 320h60v60h-60zM200 420h100v20H200z" fill="%2364748b"/><text x="50%" y="480" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif" font-size="24" font-weight="600">${encodedTitle}</text><text x="50%" y="520" dominant-baseline="middle" text-anchor="middle" fill="%2364748b" font-family="sans-serif" font-size="18">Poster Unavailable</text></svg>`;
};

/**
 * API Service Functions
 */

// 1. Fetch Trending Movies (day / week)
export const getTrendingMovies = async (timeWindow = 'day', page = 1) => {
  const response = await tmdbClient.get(`/trending/movie/${timeWindow}`, {
    params: { page },
  });
  return response.data;
};

// 2. Search Movies by query and page
export const searchMovies = async (query, page = 1) => {
  if (!query || !query.trim()) {
    return { results: [], total_pages: 0, total_results: 0, page: 1 };
  }
  const response = await tmdbClient.get('/search/movie', {
    params: {
      query: query.trim(),
      page,
      include_adult: false,
    },
  });
  return response.data;
};

// 3. Get Movie Details (with credits and videos appended)
export const getMovieDetails = async (movieId) => {
  const response = await tmdbClient.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'credits,videos,recommendations,similar',
    },
  });
  return response.data;
};

// 4. Get Movie Genres
export const getMovieGenres = async () => {
  const response = await tmdbClient.get('/genre/movie/list');
  return response.data.genres || [];
};

// 5. Discover Movies with filters (Genre, Year, Rating, Sort)
export const discoverMovies = async ({ genreId, year, minRating, sortBy = 'popularity.desc', page = 1 } = {}) => {
  const params = {
    page,
    sort_by: sortBy,
    include_adult: false,
  };

  if (genreId && genreId !== 'all') {
    params.with_genres = genreId;
  }
  if (year && year !== 'all') {
    params.primary_release_year = year;
  }
  if (minRating && minRating > 0) {
    params['vote_average.gte'] = minRating;
    params['vote_count.gte'] = 50; // Filter out low-voted noise
  }

  const response = await tmdbClient.get('/discover/movie', { params });
  return response.data;
};

// 6. Get Movie Videos (Trailers) specifically
export const getMovieVideos = async (movieId) => {
  const response = await tmdbClient.get(`/movie/${movieId}/videos`);
  return response.data.results || [];
};

// Export client instance for advanced needs
export default tmdbClient;
