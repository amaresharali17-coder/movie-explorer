import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Snackbar, Alert, Box, Typography, Container, Link } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider, useMovies } from './context/MovieContext';
import { getAppTheme } from './theme';

// Components
import Navbar from './components/Navbar';
import ApiKeyModal from './components/ApiKeyModal';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Favorites from './pages/Favorites';
import MovieDetailsPage from './pages/MovieDetailsPage';

const AppContent = () => {
  const { themeMode, toast, closeToast } = useMovies();
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);

  const theme = useMemo(() => getAppTheme(themeMode), [themeMode]);

  const handleOpenApiKeyModal = () => setApiKeyModalOpen(true);
  const handleCloseApiKeyModal = () => setApiKeyModalOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar onOpenApiKeyModal={handleOpenApiKeyModal} />

        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home onOpenApiKeyModal={handleOpenApiKeyModal} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchResults onOpenApiKeyModal={handleOpenApiKeyModal} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <ProtectedRoute>
                  <MovieDetailsPage onOpenApiKeyModal={handleOpenApiKeyModal} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 4,
            px: 2,
            mt: 'auto',
            borderTop: '1px solid',
            borderColor: 'divider',
            bgcolor: (th) =>
              th.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.02)',
            textAlign: 'center',
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
              Movie Explorer &bull; Developer Selection Test Assignment
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Movie data and imagery provided by{' '}
              <Link
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                underline="hover"
              >
                The Movie Database (TMDb)
              </Link>
              . This product uses the TMDb API but is not endorsed or certified by TMDb.
            </Typography>
          </Container>
        </Box>

        {/* Global Toast / Snackbar */}
        <Snackbar
          open={toast.open}
          autoHideDuration={3500}
          onClose={closeToast}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={closeToast}
            severity={toast.severity || 'info'}
            variant="filled"
            sx={{ width: '100%', borderRadius: 2, fontWeight: 600, boxShadow: 6 }}
          >
            {toast.message}
          </Alert>
        </Snackbar>

        {/* Global API Key Configuration Modal */}
        <ApiKeyModal open={apiKeyModalOpen} onClose={handleCloseApiKeyModal} />
      </Box>
    </ThemeProvider>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <MovieProvider>
          <AppContent />
        </MovieProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
