import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import { getImageUrl, getPosterPlaceholder } from '../services/tmdbApi';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovies();
  const [imageError, setImageError] = useState(false);

  if (!movie) return null;

  const favorite = isFavorite(movie.id);

  // Extract release year safely
  const releaseYear = movie.release_date
    ? movie.release_date.split('-')[0]
    : movie.first_air_date
    ? movie.first_air_date.split('-')[0]
    : 'N/A';

  // Format rating (e.g. 8.4)
  const rating =
    typeof movie.vote_average === 'number' && movie.vote_average > 0
      ? movie.vote_average.toFixed(1)
      : 'NR';

  // Poster source
  const posterUrl =
    !imageError && movie.poster_path
      ? getImageUrl(movie.poster_path, 'w500')
      : getPosterPlaceholder(movie.title || movie.name);

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-7px)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 16px 30px -10px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(229, 9, 20, 0.3)'
              : '0 16px 30px -10px rgba(0, 0, 0, 0.15), 0 0 1px 1px rgba(229, 9, 20, 0.2)',
          '& .movie-poster': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      {/* Poster Image Container */}
      <Box sx={{ position: 'relative', paddingTop: '150%', width: '100%', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={posterUrl}
          alt={movie.title || movie.name || 'Movie Poster'}
          loading="lazy"
          onError={() => setImageError(true)}
          className="movie-poster"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease-out',
          }}
        />

        {/* Gradient Overlay at top for favorite button contrast */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 60,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Favorite Button */}
        <Tooltip title={favorite ? 'Remove from favorites' : 'Add to favorites'}>
          <IconButton
            onClick={handleFavoriteClick}
            aria-label={favorite ? 'remove from favorites' : 'add to favorites'}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(6px)',
              color: favorite ? '#e50914' : '#ffffff',
              p: 0.8,
              transition: 'transform 0.2s ease, background-color 0.2s ease',
              '&:hover': {
                bgcolor: 'rgba(15, 23, 42, 0.9)',
                transform: 'scale(1.15)',
              },
            }}
            size="small"
          >
            {favorite ? (
              <FavoriteIcon sx={{ fontSize: 20, color: '#e50914' }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 20 }} />
            )}
          </IconButton>
        </Tooltip>

        {/* Rating Badge */}
        <Chip
          icon={<StarIcon sx={{ fontSize: '15px !important', color: '#f59e0b !important' }} />}
          label={rating}
          size="small"
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            bgcolor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(6px)',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.78rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            height: 24,
            px: 0.5,
          }}
        />
      </Box>

      {/* Card Details */}
      <CardContent sx={{ p: 1.5, flexGrow: 1, display: 'flex', flexDirection: 'column', '&:last-child': { pb: 1.5 } }}>
        <Typography
          variant="subtitle1"
          component="h3"
          sx={{
            fontWeight: 700,
            fontSize: '0.95rem',
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 0.5,
          }}
          title={movie.title || movie.name}
        >
          {movie.title || movie.name}
        </Typography>

        <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            {releaseYear}
          </Typography>

          {movie.original_language && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform: 'uppercase',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              {movie.original_language}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
