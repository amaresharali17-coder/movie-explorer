import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({
  message = 'Loading movies...',
  size = 40,
  minHeight = '300px',
  inline = false,
}) => {
  if (inline) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          py: 3,
        }}
      >
        <CircularProgress size={size} thickness={4} color="primary" />
        {message && (
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight,
        width: '100%',
        py: 6,
      }}
    >
      <CircularProgress size={size} thickness={4} color="primary" />
      {message && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 2.5, fontWeight: 500 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Loading;
