import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import MovieGrid from '../components/MovieGrid';

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites } = useMovies();
  const [filterQuery, setFilterQuery] = useState('');

  // Local filter for favorites list
  const filteredFavorites = favorites.filter((movie) => {
    if (!filterQuery.trim()) return true;
    const title = (movie.title || movie.name || '').toLowerCase();
    return title.includes(filterQuery.toLowerCase().trim());
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: '80vh' }}>
      {/* Page Title & Count Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          mb: 4,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <FavoriteIcon sx={{ color: '#e50914', fontSize: 32 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>
            Favorite Movies
          </Typography>
          <Chip
            label={favorites.length}
            color="primary"
            size="small"
            sx={{ fontWeight: 700, fontSize: '0.85rem' }}
          />
        </Box>

        {/* Filter within favorites (if multiple saved) */}
        {favorites.length > 2 && (
          <TextField
            size="small"
            placeholder="Filter saved favorites..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 240 }}
          />
        )}
      </Box>

      {/* Grid or Empty State */}
      <MovieGrid
        movies={filteredFavorites}
        loading={false}
        emptyTitle={filterQuery ? 'No matching favorites' : 'No favorite movies yet'}
        emptyMessage={
          filterQuery
            ? `No saved movies match "${filterQuery}".`
            : "You haven't added any favorite movies yet. Click the heart icon on any movie card to save it here!"
        }
        emptyAction={
          !filterQuery
            ? {
                label: 'Discover Trending Movies',
                onClick: () => navigate('/home'),
              }
            : null
        }
      />
    </Container>
  );
};

export default Favorites;
