import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode = 'dark') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#e50914', // Cinematic vibrant red
        light: '#ff3d47',
        dark: '#b20710',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#f59e0b', // Amber / Gold for ratings & accents
        light: '#fbbf24',
        dark: '#d97706',
        contrastText: '#000000',
      },
      background: {
        default: isDark ? '#0b0f19' : '#f8fafc',
        paper: isDark ? '#111827' : '#ffffff',
        elevated: isDark ? '#1f2937' : '#f1f5f9',
      },
      text: {
        primary: isDark ? '#f3f4f6' : '#0f172a',
        secondary: isDark ? '#9ca3af' : '#475569',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    },
    typography: {
      fontFamily: [
        'Plus Jakarta Sans',
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'sans-serif',
      ].join(','),
      h1: { fontWeight: 800 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? '#0b0f19' : '#f8fafc',
            color: isDark ? '#f3f4f6' : '#0f172a',
            transition: 'background-color 0.3s ease, color 0.3s ease',
            minHeight: '100vh',
          },
          '::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '::-webkit-scrollbar-track': {
            background: isDark ? '#0b0f19' : '#f1f5f9',
          },
          '::-webkit-scrollbar-thumb': {
            background: isDark ? '#374151' : '#cbd5e1',
            borderRadius: '4px',
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: isDark ? '#4b5563' : '#94a3b8',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: isDark
              ? 'rgba(11, 15, 25, 0.85)'
              : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
            boxShadow: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundImage: 'none',
            backgroundColor: isDark ? '#111827' : '#ffffff',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)'}`,
            boxShadow: isDark
              ? '0 4px 20px -2px rgba(0, 0, 0, 0.5)'
              : '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '8px 18px',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
    },
  });
};

export default getAppTheme;
