import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
} from '@mui/material';
import { VpnKey as KeyIcon } from '@mui/icons-material';
import { useMovies } from '../context/MovieContext';

const ApiKeyModal = ({ open, onClose }) => {
  const { apiKey, setCustomApiKey } = useMovies();
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [error, setError] = useState('');

  const handleSave = () => {
    const trimmed = inputKey.trim();
    if (!trimmed) {
      setError('Please provide a valid TMDb API key.');
      return;
    }
    setCustomApiKey(trimmed);
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
        <KeyIcon color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          TMDb API Key Configuration
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          To fetch real-time movie data, this application requires a free TMDb (The Movie Database)
          API key. You can provide it in your <code>.env</code> file (as{' '}
          <code>REACT_APP_TMDB_API_KEY</code>) or enter it below to test immediately in this browser.
        </Typography>

        <Alert severity="info" sx={{ mb: 2.5, borderRadius: 2 }}>
          Don&apos;t have an API key? You can get a free one at{' '}
          <Link
            href="https://www.themoviedb.org/settings/api"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ fontWeight: 600 }}
          >
            themoviedb.org/settings/api
          </Link>
          .
        </Alert>

        <TextField
          autoFocus
          margin="dense"
          label="TMDb API Key (v3 auth)"
          type="text"
          fullWidth
          variant="outlined"
          value={inputKey}
          onChange={(e) => {
            setInputKey(e.target.value);
            if (error) setError('');
          }}
          placeholder="e.g. 1a2b3c4d5e6f7g8h9i0j..."
          error={!!error}
          helperText={error || 'Your key will be securely saved in your browser localStorage.'}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save & Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApiKeyModal;
