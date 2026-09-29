import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { ErrorOutline as ErrorIcon, Refresh as RefreshIcon, VpnKey as KeyIcon } from '@mui/icons-material';

const ErrorMessage = ({
  message = 'Unable to load movies. Please try again.',
  onRetry,
  onConfigureKey,
  isKeyError = false,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        my: 4,
        borderRadius: 4,
        textAlign: 'center',
        maxWidth: 520,
        mx: 'auto',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(239, 68, 68, 0.2)',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(254, 242, 242, 0.8)',
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          bgcolor: 'rgba(239, 68, 68, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 2,
        }}
      >
        <ErrorIcon sx={{ fontSize: 32, color: 'error.main' }} />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
        Oops! Something went wrong
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
        {message}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
        {onRetry && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
            sx={{ borderRadius: 3, px: 2.5 }}
          >
            Try Again
          </Button>
        )}

        {(isKeyError || onConfigureKey) && (
          <Button
            variant="outlined"
            color="warning"
            startIcon={<KeyIcon />}
            onClick={onConfigureKey}
            sx={{ borderRadius: 3, px: 2 }}
          >
            Set API Key
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default ErrorMessage;
