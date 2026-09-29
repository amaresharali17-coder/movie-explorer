import React, { useState, useEffect } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  Chip,
  Typography,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';

const SearchBar = ({
  initialQuery = '',
  placeholder = 'Search movies by title, actor, or genre (e.g. Interstellar)...',
  fullWidth = true,
  variant = 'hero', // 'hero' or 'compact'
  onSearchSubmit,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const { lastSearchedMovie, executeSearch } = useMovies();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    if (onSearchSubmit) {
      onSearchSubmit(trimmed);
    } else {
      executeSearch(trimmed);
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  const handleLastSearchedClick = () => {
    setQuery(lastSearchedMovie);
    if (onSearchSubmit) {
      onSearchSubmit(lastSearchedMovie);
    } else {
      executeSearch(lastSearchedMovie);
      navigate(`/search?q=${encodeURIComponent(lastSearchedMovie)}`);
    }
  };

  const isHero = variant === 'hero';

  return (
    <Box sx={{ width: fullWidth ? '100%' : 'auto', maxWidth: isHero ? 720 : 600, mx: 'auto' }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={isHero ? 6 : 2}
        sx={{
          p: isHero ? '6px 12px' : '4px 8px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: isHero ? 6 : 4,
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(17, 24, 39, 0.9)' : '#ffffff',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 10px 25px -5px rgba(0, 0, 0, 0.6)'
              : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.25s ease-in-out',
          '&:focus-within': {
            borderColor: 'primary.main',
            boxShadow: (theme) =>
              `0 0 0 2px ${theme.palette.primary.main}40, 0 10px 25px -5px rgba(0, 0, 0, 0.3)`,
          },
        }}
      >
        <SearchIcon
          sx={{
            color: 'text.secondary',
            ml: 1,
            mr: 1.5,
            fontSize: isHero ? 28 : 22,
          }}
        />

        <InputBase
          sx={{
            flex: 1,
            fontSize: isHero ? { xs: '1rem', sm: '1.15rem' } : '0.95rem',
            fontWeight: 500,
          }}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          inputProps={{
            'aria-label': 'search movies',
          }}
        />

        {query && (
          <IconButton
            size="small"
            aria-label="clear search"
            onClick={handleClear}
            sx={{ mr: 0.5, color: 'text.secondary' }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        )}

        <IconButton
          type="submit"
          sx={{
            p: isHero ? 1.5 : 1,
            bgcolor: 'primary.main',
            color: '#fff',
            borderRadius: isHero ? 4 : 3,
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
          aria-label="submit search"
        >
          <SearchIcon fontSize={isHero ? 'medium' : 'small'} />
        </IconButton>
      </Paper>

      {/* Persistent Last Searched Movie Quick-Badge */}
      {lastSearchedMovie && (
        <Box
          sx={{
            mt: 1.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
            justifyContent: isHero ? 'center' : 'flex-start',
            px: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            Recent Search:
          </Typography>
          <Chip
            size="small"
            icon={<HistoryIcon fontSize="small" />}
            label={lastSearchedMovie}
            onClick={handleLastSearchedClick}
            clickable
            color="primary"
            variant="outlined"
            sx={{
              fontWeight: 600,
              fontSize: '0.78rem',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'primary.main',
                color: '#fff',
                '& .MuiChip-icon': { color: '#fff' },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
