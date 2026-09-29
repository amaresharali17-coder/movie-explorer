import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Grid,
  Avatar,
  Paper,
  CardMedia,
  useTheme,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ArrowBack as ArrowBackIcon,
  AccessTime as TimeIcon,
  CalendarToday as CalendarIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import {
  getImageUrl,
  getBackdropUrl,
  getPosterPlaceholder,
} from '../services/tmdbApi';
import TrailerModal from './TrailerModal';
import MovieGrid from './MovieGrid';

const MovieDetails = ({ movie }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { isFavorite, toggleFavorite } = useMovies();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [posterError, setPosterError] = useState(false);

  if (!movie) return null;

  const favorite = isFavorite(movie.id);

  // Formatting helpers
  const formatRuntime = (minutes) => {
    if (!minutes) return null;
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  const formatReleaseDate = (dateStr) => {
    if (!dateStr) return 'Release date unknown';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const backdropUrl = getBackdropUrl(movie.backdrop_path, 'original');
  const posterUrl =
    !posterError && movie.poster_path
      ? getImageUrl(movie.poster_path, 'w500')
      : getPosterPlaceholder(movie.title || movie.name);

  // Cast members (up to 12)
  const castList = movie.credits?.cast ? movie.credits.cast.slice(0, 12) : [];

  // Videos
  const videosList = movie.videos?.results || [];
  const hasTrailer = videosList.some(
    (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
  );

  // Similar or recommended movies
  const recommendations =
    movie.recommendations?.results?.slice(0, 5) ||
    movie.similar?.results?.slice(0, 5) ||
    [];

  return (
    <Box sx={{ width: '100%', pb: 8 }}>
      {/* Back Navigation Bar */}
      <Container maxWidth="xl" sx={{ pt: 2, pb: 1 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          variant="text"
          color="inherit"
          sx={{ fontWeight: 600, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
        >
          Back
        </Button>
      </Container>

      {/* Hero Backdrop Banner */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: { xs: 450, md: 540 },
          backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          bgcolor: theme.palette.mode === 'dark' ? '#0b0f19' : '#1e293b',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(to bottom, rgba(11, 15, 25, 0.5) 0%, rgba(11, 15, 25, 0.95) 75%, #0b0f19 100%), linear-gradient(to right, rgba(11, 15, 25, 0.9) 0%, rgba(11, 15, 25, 0.3) 100%)'
                : 'linear-gradient(to bottom, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0.95) 75%, #0f172a 100%), linear-gradient(to right, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 100%)',
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            py: { xs: 4, md: 6 },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Grid container spacing={{ xs: 3, md: 5 }} alignItems="center">
            {/* Poster Column */}
            <Grid item xs={12} sm={4} md={3.5} lg={3}>
              <Box
                sx={{
                  maxWidth: { xs: 240, sm: '100%' },
                  mx: { xs: 'auto', sm: 0 },
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                <CardMedia
                  component="img"
                  image={posterUrl}
                  alt={movie.title}
                  onError={() => setPosterError(true)}
                  sx={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '2/3' }}
                />
              </Box>
            </Grid>

            {/* Details Column */}
            <Grid item xs={12} sm={8} md={8.5} lg={9} sx={{ color: '#ffffff' }}>
              {/* Title & Tagline */}
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                  letterSpacing: -0.5,
                  mb: 1,
                }}
              >
                {movie.title}
              </Typography>

              {movie.tagline && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontStyle: 'italic',
                    color: 'rgba(255, 255, 255, 0.75)',
                    mb: 2,
                    fontSize: { xs: '0.95rem', sm: '1.1rem' },
                  }}
                >
                  &ldquo;{movie.tagline}&rdquo;
                </Typography>
              )}

              {/* Meta information row */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2.5,
                  flexWrap: 'wrap',
                  mb: 2.5,
                  color: 'rgba(255, 255, 255, 0.85)',
                }}
              >
                {/* Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <StarIcon sx={{ color: '#f59e0b', fontSize: 24 }} />
                  <Typography variant="h6" component="span" sx={{ fontWeight: 700, color: '#ffffff' }}>
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    ({movie.vote_count?.toLocaleString() || 0} votes)
                  </Typography>
                </Box>

                {/* Release Date */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <CalendarIcon sx={{ fontSize: 18, color: 'rgba(255, 255, 255, 0.7)' }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {formatReleaseDate(movie.release_date)}
                  </Typography>
                </Box>

                {/* Runtime */}
                {movie.runtime > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <TimeIcon sx={{ fontSize: 18, color: 'rgba(255, 255, 255, 0.7)' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {formatRuntime(movie.runtime)}
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                  {movie.genres.map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                        color: '#ffffff',
                        backdropFilter: 'blur(8px)',
                        fontWeight: 600,
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    />
                  ))}
                </Box>
              )}

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<PlayIcon />}
                  onClick={() => setTrailerOpen(true)}
                  sx={{
                    px: 3,
                    py: 1.2,
                    fontSize: '1rem',
                    borderRadius: 3,
                    boxShadow: '0 8px 20px -4px rgba(229, 9, 20, 0.5)',
                  }}
                >
                  {hasTrailer ? 'Watch Trailer' : 'View Trailer Info'}
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => toggleFavorite(movie)}
                  startIcon={favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  sx={{
                    px: 3,
                    py: 1.2,
                    fontSize: '1rem',
                    borderRadius: 3,
                    color: favorite ? '#ff4d4f' : '#ffffff',
                    borderColor: favorite ? '#ff4d4f' : 'rgba(255, 255, 255, 0.4)',
                    bgcolor: favorite ? 'rgba(255, 77, 79, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(8px)',
                    '&:hover': {
                      borderColor: '#ff4d4f',
                      bgcolor: 'rgba(255, 77, 79, 0.25)',
                    },
                  }}
                >
                  {favorite ? 'Saved in Favorites' : 'Add to Favorites'}
                </Button>
              </Box>

              {/* Overview */}
              <Box sx={{ maxWidth: 800 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#ffffff' }}>
                  Overview
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    lineHeight: 1.7,
                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                  }}
                >
                  {movie.overview || 'No overview available for this movie.'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content Sections: Cast & Details */}
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        {/* Cast Section */}
        {castList.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
              Top Billed Cast
            </Typography>

            <Grid container spacing={2}>
              {castList.map((actor) => {
                const profileUrl = actor.profile_path
                  ? getImageUrl(actor.profile_path, 'w185')
                  : null;

                return (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={actor.id}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        borderRadius: 3,
                        textAlign: 'center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '1px solid',
                        borderColor: (th) =>
                          th.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.06)'
                            : 'rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      <Avatar
                        src={profileUrl}
                        alt={actor.name}
                        sx={{
                          width: 80,
                          height: 80,
                          mb: 1.5,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          bgcolor: 'primary.dark',
                          fontSize: 24,
                        }}
                      >
                        {actor.name.charAt(0)}
                      </Avatar>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                        {actor.name}
                      </Typography>
                      {actor.character && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mt: 0.5, fontStyle: 'italic', display: 'block' }}
                        >
                          {actor.character}
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}

        {/* Similar / Recommended Movies */}
        {recommendations.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
              Recommended Movies
            </Typography>
            <MovieGrid movies={recommendations} />
          </Box>
        )}
      </Container>

      {/* YouTube Trailer Modal */}
      <TrailerModal
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        videos={videosList}
        movieTitle={movie.title}
      />
    </Box>
  );
};

export default MovieDetails;
