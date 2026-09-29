import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Favorite as FavoriteIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  Key as KeyIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenApiKeyModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { themeMode, toggleThemeMode, favorites, isApiKeyMissing } = useMovies();
  const { user, isAuthenticated, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    {
      label: 'Favorites',
      path: '/favorites',
      icon: (
        <Badge badgeContent={favorites.length} color="primary" max={99}>
          <FavoriteIcon />
        </Badge>
      ),
    },
    { label: 'Search', path: '/search', icon: <SearchIcon /> },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/login');
  };

  const drawerContent = (
    <Box sx={{ width: 280, p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, px: 1 }}>
        <MovieIcon sx={{ color: 'primary.main', fontSize: 32 }} />
        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
          Movie <span style={{ color: '#e50914' }}>Explorer</span>
        </Typography>
      </Box>

      {isAuthenticated && user && (
        <Box
          sx={{
            p: 1.5,
            mb: 2,
            borderRadius: 2,
            bgcolor: themeMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontSize: 16 }}>
            {user.username.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }} noWrap>
              {user.name || user.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Logged in
            </Typography>
          </Box>
        </Box>
      )}

      <Divider sx={{ mb: 1 }} />

      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavClick(item.path)}
                selected={isActive}
                sx={{
                  borderRadius: 2,
                  color: isActive ? 'primary.main' : 'text.primary',
                  '&.Mui-selected': {
                    bgcolor: themeMode === 'dark' ? 'rgba(229, 9, 20, 0.15)' : 'rgba(229, 9, 20, 0.08)',
                    '&:hover': {
                      bgcolor: themeMode === 'dark' ? 'rgba(229, 9, 20, 0.22)' : 'rgba(229, 9, 20, 0.12)',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ my: 1 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {onOpenApiKeyModal && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<KeyIcon />}
            color={isApiKeyMissing ? 'warning' : 'inherit'}
            onClick={() => {
              setMobileOpen(false);
              onOpenApiKeyModal();
            }}
            fullWidth
          >
            {isApiKeyMissing ? 'Set API Key' : 'API Key Settings'}
          </Button>
        )}

        <Button
          variant="text"
          startIcon={themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          onClick={toggleThemeMode}
          fullWidth
          sx={{ justifyContent: 'flex-start', px: 2 }}
        >
          {themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>

        {isAuthenticated ? (
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            fullWidth
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<LoginIcon />}
            onClick={() => {
              setMobileOpen(false);
              navigate('/login');
            }}
            fullWidth
          >
            Login
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 70 }}>
            {/* Logo */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                cursor: 'pointer',
                userSelect: 'none',
              }}
              onClick={() => navigate('/')}
            >
              <MovieIcon sx={{ color: 'primary.main', fontSize: 34 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 800,
                  letterSpacing: -0.5,
                  fontSize: { xs: '1.2rem', sm: '1.4rem' },
                }}
              >
                Movie <span style={{ color: '#e50914' }}>Explorer</span>
              </Typography>
            </Box>

            {/* Desktop Navigation Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    startIcon={item.icon}
                    sx={{
                      px: 2,
                      py: 1,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'primary.main' : 'text.primary',
                      backgroundColor: isActive
                        ? themeMode === 'dark'
                          ? 'rgba(229, 9, 20, 0.12)'
                          : 'rgba(229, 9, 20, 0.08)'
                        : 'transparent',
                      '&:hover': {
                        backgroundColor:
                          themeMode === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>

            {/* Desktop Right Actions */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
              {/* API Key Config Button */}
              {onOpenApiKeyModal && (
                <Tooltip title={isApiKeyMissing ? 'Configure TMDb API Key' : 'TMDb API Key Settings'}>
                  <IconButton
                    onClick={onOpenApiKeyModal}
                    color={isApiKeyMissing ? 'warning' : 'default'}
                    size="medium"
                  >
                    <Badge color="warning" variant="dot" invisible={!isApiKeyMissing}>
                      <KeyIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}

              {/* Theme Toggle Button */}
              <Tooltip title={`Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`}>
                <IconButton onClick={toggleThemeMode} color="inherit" size="medium">
                  {themeMode === 'dark' ? (
                    <LightModeIcon sx={{ color: '#fbbf24' }} />
                  ) : (
                    <DarkModeIcon sx={{ color: '#6366f1' }} />
                  )}
                </IconButton>
              </Tooltip>

              {/* Auth User Info & Logout/Login */}
              {isAuthenticated && user ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 34,
                      height: 34,
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {user.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="body2" sx={{ fontWeight: 600, display: { md: 'none', lg: 'block' } }}>
                    {user.name || user.username}
                  </Typography>
                  <Tooltip title="Logout">
                    <IconButton onClick={handleLogout} color="error" size="small">
                      <LogoutIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<LoginIcon />}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              )}
            </Box>

            {/* Mobile Actions & Hamburger */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 0.5 }}>
              <IconButton onClick={toggleThemeMode} color="inherit" size="small">
                {themeMode === 'dark' ? (
                  <LightModeIcon sx={{ color: '#fbbf24', fontSize: 20 }} />
                ) : (
                  <DarkModeIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                )}
              </IconButton>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            backgroundImage: 'none',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
