import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  FormControlLabel,
  Switch,
  Chip,
  Paper,
} from '@mui/material';
import {
  Autorenew as AutoIcon,
  TouchApp as TouchIcon,
} from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const SearchResults = ({ onOpenApiKeyModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const {
    searchResults,
    searchPage,
    totalSearchPages,
    totalSearchResults,
    searchLoading,
    searchLoadingMore,
    searchError,
    executeSearch,
    loadMoreSearchResults,
    isApiKeyMissing,
  } = useMovies();

  // Bonus 3: Toggle between Infinite Scroll & Load More Button
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(true);

  // Sync query from URL param
  useEffect(() => {
    if (queryParam) {
      executeSearch(queryParam);
    }
  }, [queryParam, executeSearch]);

  const hasMore = searchPage < totalSearchPages;

  // Infinite scroll hook sentinel
  const sentinelRef = useInfiniteScroll(
    loadMoreSearchResults,
    hasMore && infiniteScrollEnabled,
    searchLoadingMore
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: '80vh' }}>
      {/* Top Search Bar */}
      <Box sx={{ mb: 4 }}>
        <SearchBar
          initialQuery={queryParam}
          variant="compact"
          fullWidth={false}
          onSearchSubmit={(newQuery) => setSearchParams({ q: newQuery })}
        />
      </Box>

      {/* Results Header & Pagination Mode Toggle */}
      {queryParam && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Search Results
            </Typography>
            <Chip
              label={`"${queryParam}"`}
              color="primary"
              variant="outlined"
              size="small"
              sx={{ fontWeight: 700 }}
            />
            {!searchLoading && (
              <Typography variant="body2" color="text.secondary">
                Found {totalSearchResults.toLocaleString()} movies ({searchResults.length} shown)
              </Typography>
            )}
          </Box>

          {/* Bonus 3: Pagination Mode Switch (Infinite Scroll vs Load More Button) */}
          {searchResults.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={infiniteScrollEnabled}
                    onChange={(e) => setInfiniteScrollEnabled(e.target.checked)}
                    color="primary"
                    size="small"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {infiniteScrollEnabled ? (
                      <>
                        <AutoIcon fontSize="small" sx={{ color: 'primary.main' }} />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          Infinite Scroll ON
                        </Typography>
                      </>
                    ) : (
                      <>
                        <TouchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          Load More Button
                        </Typography>
                      </>
                    )}
                  </Box>
                }
              />
            </Box>
          )}
        </Paper>
      )}

      {/* Error state */}
      {searchError && (
        <ErrorMessage
          message={searchError}
          onRetry={() => executeSearch(queryParam)}
          isKeyError={isApiKeyMissing}
          onConfigureKey={onOpenApiKeyModal}
        />
      )}

      {/* Movie Grid */}
      {!searchError && (
        <MovieGrid
          movies={searchResults}
          loading={searchLoading}
          skeletonCount={10}
          emptyTitle={queryParam ? `No movies found for "${queryParam}"` : 'Discover Amazing Movies'}
          emptyMessage={
            queryParam
              ? 'Please check the spelling or try searching for another title, actor, or genre.'
              : 'Enter a movie title, franchise, or actor in the search bar above to begin searching.'
          }
        />
      )}

      {/* Pagination Controls & Loading Indicators */}
      {!searchLoading && searchResults.length > 0 && (
        <Box sx={{ mt: 4, mb: 6, textAlign: 'center' }}>
          {/* Loading indicator for fetching next page */}
          {searchLoadingMore && (
            <Loading inline message={`Loading page ${searchPage + 1} of ${totalSearchPages}...`} />
          )}

          {/* Bonus 3: Manual Load More Button (when infinite scroll is toggled off) */}
          {!infiniteScrollEnabled && hasMore && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={loadMoreSearchResults}
              disabled={searchLoadingMore}
              sx={{ px: 4, py: 1.2, borderRadius: 3, fontWeight: 700 }}
            >
              {searchLoadingMore ? 'Loading...' : `Load More (Page ${searchPage + 1}/${totalSearchPages})`}
            </Button>
          )}

          {/* End of results message */}
          {!hasMore && totalSearchPages > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ py: 2, fontStyle: 'italic' }}>
              ✓ You have viewed all {totalSearchResults.toLocaleString()} movie results.
            </Typography>
          )}

          {/* Infinite Scroll Sentinel element */}
          {infiniteScrollEnabled && hasMore && (
            <Box
              ref={sentinelRef}
              sx={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            />
          )}
        </Box>
      )}
    </Container>
  );
};

export default SearchResults;
