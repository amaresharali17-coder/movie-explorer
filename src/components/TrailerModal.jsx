import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Close as CloseIcon, MovieCreation as MovieIcon } from '@mui/icons-material';

const TrailerModal = ({ open, onClose, videos = [], movieTitle = 'Trailer' }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Find official trailer or teaser from YouTube
  const youtubeTrailer = videos.find(
    (v) => v.site === 'YouTube' && v.type === 'Trailer'
  ) || videos.find(
    (v) => v.site === 'YouTube' && (v.type === 'Teaser' || v.type === 'Clip')
  ) || videos.find((v) => v.site === 'YouTube');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#0a0a0a',
          color: '#ffffff',
          borderRadius: fullScreen ? 0 : 3,
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.85)',
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography variant="h6" component="span" sx={{ fontWeight: 700 }} noWrap>
          {movieTitle} — Trailer
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: 'grey.500',
            '&:hover': { color: '#ffffff' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, bgcolor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {youtubeTrailer ? (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%', // 16:9 Aspect Ratio
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${youtubeTrailer.key}?autoplay=1&rel=0`}
              title={`${movieTitle} Official Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              py: 8,
              px: 3,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <MovieIcon sx={{ fontSize: 56, color: 'text.secondary', opacity: 0.6 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Trailer unavailable
            </Typography>
            <Typography variant="body2" color="grey.400" sx={{ maxWidth: 360 }}>
              No official video trailer found for &quot;{movieTitle}&quot; on TMDb.
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TrailerModal;
