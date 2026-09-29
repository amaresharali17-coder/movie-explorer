import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from '@mui/material';
import {
  Whatshot as TrendingIcon,
  Explore as ExploreIcon,
} from '@mui/icons-material';
import { useMovies } from '../context/MovieContext';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import FilterBar from '../components/FilterBar';
import ErrorMessage from '../components/ErrorMessage';
import { discoverMovies } from '../services/tmdbApi';

const Home = ({ onOpenApiKeyModal }) => {
  const {
    trendingMovies,
    trendingLoading,
    trendingError,
    trendingTimeWindow,
    fetchTrending,
    genres,
    isApiKeyMissing,
  } = useMovies();

  // Bonus 1: Filtering / Discover State
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('popularity.desc');

  const [discoveredMovies, setDiscoveredMovies] = useState([]);
  const [discoverLoading, setDiscoverLoading] = useState(false);
  const [discoverError, setDiscoverError] = useState(null);

  const hasActiveFilters =
    selectedGenre !== 'all' ||
    selectedYear !== 'all' ||
    selectedRating > 0 ||
    sortBy !== 'popularity.desc';

  const handleTimeWindowChange = (event, newWindow) => {
    if (newWindow !== null) {
      fetchTrending(newWindow);
    }
  };

  const handleResetFilters = () => {
    setSelectedGenre('all');
    setSelectedYear('all');
    setSelectedRating(0);
    setSortBy('popularity.desc');
    setDiscoveredMovies([]);
  };

  // Fetch discovered movies when filters change
  const fetchDiscovered = useCallback(async () => {
    if (!hasActiveFilters) return;

    setDiscoverLoading(true);
    setDiscoverError(null);
    try {
      const data = await discoverMovies({
        genreId: selectedGenre,
        year: selectedYear,
        minRating: selectedRating,
        sortBy,
        page: 1,
      });
      setDiscoveredMovies(data.results || []);
    } catch (err) {
      setDiscoverError(err.message || 'Failed to discover movies.');
    } finally {
      setDiscoverLoading(false);
    }
  }, [selectedGenre, selectedYear, selectedRating, sortBy, hasActiveFilters]);

  useEffect(() => {
    if (hasActiveFilters) {
      fetchDiscovered();
    }
  }, [fetchDiscovered, hasActiveFilters]);

  return (
    <Box sx={{ width: '100%', pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 6, sm: 8, md: 10 },
          px: 2,
          textAlign: 'center',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(229, 9, 20, 0.12) 0%, rgba(11, 15, 25, 0) 100%)'
              : 'linear-gradient(180deg, rgba(229, 9, 20, 0.07) 0%, rgba(248, 250, 252, 0) 100%)',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.2rem', sm: '3.2rem', md: '3.8rem' },
              letterSpacing: -1,
              lineHeight: 1.15,
              mb: 2,
            }}
          >
            Discover Your Next <br />
            <span style={{ color: '#e50914' }}>Favorite Film</span>
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' },
              fontWeight: 400,
              maxWidth: 620,
              mx: 'auto',
              mb: 4,
            }}
          >
            Explore real-time trending movies, detailed cast, trailers, and reviews powered by TMDb.
          </Typography>

          {/* Search Bar Component */}
          <SearchBar variant="hero" />
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="xl" sx={{ mt: { xs: 2, md: 4 } }}>
        {/* Bonus 1: Filter & Discover Bar */}
        <Box sx={{ mb: 4 }}>
          <FilterBar
            genres={genres}
            selectedGenre={selectedGenre}
            selectedYear={selectedYear}
            selectedRating={selectedRating}
            sortBy={sortBy}
            onGenreChange={setSelectedGenre}
            onYearChange={setSelectedYear}
            onRatingChange={setSelectedRating}
            onSortChange={setSortBy}
            onReset={handleResetFilters}
          />
        </Box>

        {/* If Active Filters: Show Filtered Results */}
        {hasActiveFilters ? (
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <ExploreIcon sx={{ color: 'primary.main', fontSize: 28 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 800 }}>
                Filtered Movie Results
              </Typography>
            </Box>

            {discoverError ? (
              <ErrorMessage
                message={discoverError}
                onRetry={fetchDiscovered}
                isKeyError={isApiKeyMissing}
                onConfigureKey={onOpenApiKeyModal}
              />
            ) : (
              <MovieGrid
                movies={discoveredMovies}
                loading={discoverLoading}
                emptyTitle="No movies match these filters"
                emptyMessage="Try broadening your filter criteria or resetting to explore all movies."
                emptyAction={{
                  label: 'Reset Filters',
                  onClick: handleResetFilters,
                }}
              />
            )}
          </Box>
        ) : null}

        {/* Trending Section */}
        <Box sx={{ mb: 6 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
              mb: 2.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <TrendingIcon sx={{ color: '#e50914', fontSize: 30 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 800 }}>
                Trending Movies
              </Typography>
            </Box>

            {/* Today / This Week Toggle */}
            <ToggleButtonGroup
              value={trendingTimeWindow}
              exclusive
              onChange={handleTimeWindowChange}
              size="small"
              sx={{
                bgcolor: (th) =>
                  th.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                borderRadius: 2,
                '& .MuiToggleButton-root': {
                  px: 2,
                  py: 0.5,
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  textTransform: 'none',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: '#ffffff',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  },
                },
              }}
            >
              <ToggleButton value="day">Today</ToggleButton>
              <ToggleButton value="week">This Week</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Trending Grid / States */}
          {trendingError ? (
            <ErrorMessage
              message={trendingError}
              onRetry={() => fetchTrending(trendingTimeWindow)}
              isKeyError={isApiKeyMissing}
              onConfigureKey={onOpenApiKeyModal}
            />
          ) : (
            <MovieGrid
              movies={trendingMovies}
              loading={trendingLoading}
              skeletonCount={10}
              emptyTitle="No trending movies available"
              emptyMessage="Unable to retrieve trending movies at the moment."
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
