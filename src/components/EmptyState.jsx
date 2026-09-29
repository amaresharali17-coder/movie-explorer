import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { MovieFilter as MovieFilterIcon } from '@mui/icons-material';

const EmptyState = ({
  icon: CustomIcon,
  title = 'No movies found',
  message = 'We could not find any movies matching your criteria.',
  actionLabel,
  onAction,
}) => {
  const IconComponent = CustomIcon || MovieFilterIcon;

  return (
    <Box
      sx={{
        py: 8,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        maxWidth: 480,
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2.5,
          color: 'text.secondary',
        }}
      >
        <IconComponent sx={{ fontSize: 42, color: 'text.secondary', opacity: 0.8 }} />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 380 }}>
        {message}
      </Typography>

      {actionLabel && onAction && (
        <Button
          variant="contained"
          color="primary"
          onClick={onAction}
          sx={{ px: 3, py: 1, borderRadius: 3 }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
