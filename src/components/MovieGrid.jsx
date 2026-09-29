import React from 'react';
import { Grid, Box, Skeleton, Card, CardContent } from '@mui/material';
import MovieCard from './MovieCard';
import EmptyState from './EmptyState';

const MovieGridSkeleton = ({ count = 8 }) => {
  return (
    <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
      {Array.from(new Array(count)).map((_, index) => (
        <Grid item xs={6} sm={4} md={3} lg={2.4} key={`skeleton-${index}`}>
          <Card sx={{ height: '100%', borderRadius: 3 }}>
            <Skeleton variant="rectangular" sx={{ paddingTop: '150%', width: '100%' }} />
            <CardContent sx={{ p: 1.5 }}>
              <Skeleton variant="text" width="80%" height={24} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Skeleton variant="text" width="40%" height={18} />
                <Skeleton variant="text" width="30%" height={18} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const MovieGrid = ({
  movies = [],
  loading = false,
  skeletonCount = 10,
  emptyTitle = 'No movies found',
  emptyMessage = 'Try searching with different keywords or adjusting filters.',
  emptyAction,
}) => {
  if (loading && (!movies || movies.length === 0)) {
    return <MovieGridSkeleton count={skeletonCount} />;
  }

  if (!loading && (!movies || movies.length === 0)) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
        actionLabel={emptyAction?.label}
        onAction={emptyAction?.onClick}
      />
    );
  }

  return (
    <Box sx={{ width: '100%', my: 2 }}>
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
        {movies.map((movie) => (
          <Grid item xs={6} sm={4} md={3} lg={2.4} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieGrid;
