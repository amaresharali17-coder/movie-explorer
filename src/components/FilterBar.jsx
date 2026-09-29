import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import {
  FilterAlt as FilterIcon,
  RestartAlt as ResetIcon,
} from '@mui/icons-material';

// Generate recent years list
const currentYear = new Date().getFullYear();
const YEARS = ['all', ...Array.from({ length: 35 }, (_, i) => String(currentYear - i))];

const RATINGS = [
  { value: 0, label: 'All Ratings' },
  { value: 6, label: '⭐ 6.0+ Good' },
  { value: 7, label: '⭐ 7.0+ Very Good' },
  { value: 8, label: '⭐ 8.0+ Excellent' },
  { value: 8.5, label: '⭐ 8.5+ Masterpiece' },
];

const FilterBar = ({
  genres = [],
  selectedGenre = 'all',
  selectedYear = 'all',
  selectedRating = 0,
  sortBy = 'popularity.desc',
  onGenreChange,
  onYearChange,
  onRatingChange,
  onSortChange,
  onReset,
}) => {
  const hasActiveFilters =
    selectedGenre !== 'all' ||
    selectedYear !== 'all' ||
    selectedRating > 0 ||
    sortBy !== 'popularity.desc';

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        mb: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(17, 24, 39, 0.7)' : 'rgba(255, 255, 255, 0.9)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <FilterIcon fontSize="small" sx={{ color: 'primary.main' }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
          Filter & Discover
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr) auto',
          },
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        {/* Genre Filter */}
        <FormControl size="small" fullWidth>
          <InputLabel id="genre-filter-label">Genre</InputLabel>
          <Select
            labelId="genre-filter-label"
            id="genre-filter"
            value={selectedGenre}
            label="Genre"
            onChange={(e) => onGenreChange(e.target.value)}
          >
            <MenuItem value="all">All Genres</MenuItem>
            {genres.map((g) => (
              <MenuItem key={g.id} value={g.id}>
                {g.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Year Filter */}
        <FormControl size="small" fullWidth>
          <InputLabel id="year-filter-label">Year</InputLabel>
          <Select
            labelId="year-filter-label"
            id="year-filter"
            value={selectedYear}
            label="Year"
            onChange={(e) => onYearChange(e.target.value)}
          >
            <MenuItem value="all">All Years</MenuItem>
            {YEARS.slice(1).map((yr) => (
              <MenuItem key={yr} value={yr}>
                {yr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Rating Filter */}
        <FormControl size="small" fullWidth>
          <InputLabel id="rating-filter-label">Minimum Rating</InputLabel>
          <Select
            labelId="rating-filter-label"
            id="rating-filter"
            value={selectedRating}
            label="Minimum Rating"
            onChange={(e) => onRatingChange(Number(e.target.value))}
          >
            {RATINGS.map((r) => (
              <MenuItem key={r.value} value={r.value}>
                {r.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort By */}
        {onSortChange && (
          <FormControl size="small" fullWidth>
            <InputLabel id="sort-filter-label">Sort By</InputLabel>
            <Select
              labelId="sort-filter-label"
              id="sort-filter"
              value={sortBy}
              label="Sort By"
              onChange={(e) => onSortChange(e.target.value)}
            >
              <MenuItem value="popularity.desc">Most Popular</MenuItem>
              <MenuItem value="vote_average.desc">Highest Rated</MenuItem>
              <MenuItem value="primary_release_date.desc">Newest Release</MenuItem>
              <MenuItem value="primary_release_date.asc">Oldest Release</MenuItem>
            </Select>
          </FormControl>
        )}

        {/* Reset Filters */}
        {hasActiveFilters && (
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            startIcon={<ResetIcon />}
            onClick={onReset}
            sx={{
              height: 40,
              minWidth: { xs: '100%', md: 100 },
              gridColumn: { xs: '1 / -1', md: 'auto' },
            }}
          >
            Reset
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default FilterBar;
