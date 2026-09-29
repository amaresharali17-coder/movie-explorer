import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { getMovieDetails } from '../services/tmdbApi';
import MovieDetails from '../components/MovieDetails';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { useMovies } from '../context/MovieContext';

const MovieDetailsPage = ({ onOpenApiKeyModal }) => {
  const { id } = useParams();
  const { isApiKeyMissing } = useMovies();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetails = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getMovieDetails(id);
      setMovie(data);
    } catch (err) {
      setError(err.message || 'Unable to load movie details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchDetails]);

  if (loading) {
    return (
      <Box sx={{ py: 12 }}>
        <Loading message="Loading movie details & trailers..." minHeight="400px" />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <ErrorMessage
          message={error || 'Movie not found.'}
          onRetry={fetchDetails}
          isKeyError={isApiKeyMissing}
          onConfigureKey={onOpenApiKeyModal}
        />
      </Container>
    );
  }

  return <MovieDetails movie={movie} />;
};

export default MovieDetailsPage;
