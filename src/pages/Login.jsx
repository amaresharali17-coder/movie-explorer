import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Chip,
  Container,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, authError, setAuthError } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Destination after login (default to Home /home)
  const destination =
    location.state?.from?.pathname &&
    location.state.from.pathname !== '/' &&
    location.state.from.pathname !== '/login'
      ? location.state.from.pathname
      : '/home';

  // If already authenticated, redirect to Home
  useEffect(() => {
    if (user) {
      navigate('/home', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!username.trim() || !password) {
      setValidationError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    const result = login(username, password);
    setLoading(false);

    if (result.success) {
      navigate(destination, { replace: true });
    }
  };

  const handleFillDemo = () => {
    setUsername('movie_lover');
    setPassword('explorer123');
    setValidationError('');
    if (setAuthError) setAuthError(null);
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, sm: 3 },
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at 50% 30%, rgba(229, 9, 20, 0.15) 0%, rgba(11, 15, 25, 0) 70%)'
            : 'radial-gradient(circle at 50% 30%, rgba(229, 9, 20, 0.08) 0%, rgba(248, 250, 252, 0) 70%)',
      }}
    >
      <Container maxWidth="xs">
        <Card
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: 4,
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 20px 40px -10px rgba(0,0,0,0.8)'
                : '0 20px 40px -10px rgba(0,0,0,0.1)',
          }}
        >
          <CardContent sx={{ p: 0 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  bgcolor: 'primary.main',
                  color: '#ffffff',
                  mb: 2,
                  boxShadow: '0 8px 16px rgba(229, 9, 20, 0.35)',
                }}
              >
                <MovieIcon sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
                Welcome to Movie <span style={{ color: '#e50914' }}>Explorer</span>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Sign in to discover, explore, and curate your favorite films
              </Typography>
            </Box>

            {/* Error alerts */}
            {(validationError || authError) && (
              <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
                {validationError || authError}
              </Alert>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setValidationError('');
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setValidationError('');
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  py: 1.4,
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  boxShadow: '0 8px 20px -4px rgba(229, 9, 20, 0.4)',
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Box>

            {/* Demo Helper */}
            <Box
              sx={{
                mt: 3,
                pt: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
                textAlign: 'center',
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Frontend Developer Selection Test Mode
              </Typography>
              <Chip
                label="Fill Demo Credentials"
                size="small"
                onClick={handleFillDemo}
                clickable
                variant="outlined"
                color="primary"
                sx={{ fontWeight: 600, fontSize: '0.75rem' }}
              />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
