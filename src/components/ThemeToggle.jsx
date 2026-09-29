import React from 'react';
import { IconButton, Tooltip, Box, Typography } from '@mui/material';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';
import { useMovies } from '../context/MovieContext';

const ThemeToggle = ({ showLabel = false, size = 'medium' }) => {
  const { themeMode, toggleThemeMode } = useMovies();
  const isDark = themeMode === 'dark';

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
      <Tooltip title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}>
        <IconButton
          onClick={toggleThemeMode}
          color="inherit"
          size={size}
          aria-label="toggle light/dark theme"
          sx={{
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'rotate(25deg)' },
          }}
        >
          {isDark ? (
            <LightModeIcon sx={{ color: '#fbbf24' }} />
          ) : (
            <DarkModeIcon sx={{ color: '#6366f1' }} />
          )}
        </IconButton>
      </Tooltip>
      {showLabel && (
        <Typography variant="body2" color="text.secondary">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </Typography>
      )}
    </Box>
  );
};

export default ThemeToggle;
