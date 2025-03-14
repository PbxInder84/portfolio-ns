import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const createAppTheme = (mode) => {
  let theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#00f0ff', // Bright cyan
        light: '#64ffda',
        dark: '#00b8d4',
        contrastText: '#000000',
      },
      secondary: {
        main: '#f50057', // Neon pink
        light: '#ff4081',
        dark: '#c51162',
        contrastText: '#ffffff',
      },
      background: {
        default: mode === 'dark' ? '#0a192f' : '#f5f5f7',
        paper: mode === 'dark' ? '#172a45' : '#ffffff',
        accent: mode === 'dark' ? '#303846' : '#e6e6e6',
      },
      text: {
        primary: mode === 'dark' ? '#e6f1ff' : '#333333',
        secondary: mode === 'dark' ? '#8892b0' : '#666666',
        accent: mode === 'dark' ? '#64ffda' : '#00b8d4',
      },
      divider: mode === 'dark' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(0, 184, 212, 0.1)',
    },
    typography: {
      fontFamily: '"Rajdhani", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.01562em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.00833em',
      },
      h3: {
        fontWeight: 600,
        letterSpacing: '0em',
      },
      h4: {
        fontWeight: 600,
        letterSpacing: '0.00735em',
      },
      h5: {
        fontWeight: 600,
        letterSpacing: '0em',
      },
      h6: {
        fontWeight: 600,
        letterSpacing: '0.0075em',
      },
      button: {
        fontWeight: 600,
        letterSpacing: '0.02857em',
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 4,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: mode === 'dark' ? '#6b6b6b #2b2b2b' : '#959595 #f5f5f5',
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
              backgroundColor: mode === 'dark' ? '#2b2b2b' : '#f5f5f5',
              width: 8,
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: mode === 'dark' ? '#6b6b6b' : '#959595',
              minHeight: 24,
            },
            '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
              backgroundColor: mode === 'dark' ? '#959595' : '#6b6b6b',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          outlined: {
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            boxShadow: mode === 'dark' 
              ? '0 10px 30px -15px rgba(2, 12, 27, 0.7)' 
              : '0 10px 30px -15px rgba(0, 0, 0, 0.1)',
            border: mode === 'dark' 
              ? '1px solid #172a45' 
              : '1px solid #e6e6e6',
            transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: mode === 'dark' 
                ? '0 20px 30px -15px rgba(2, 12, 27, 0.7)' 
                : '0 20px 30px -15px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'dark' 
              ? '0 10px 30px -10px rgba(2, 12, 27, 0.7)' 
              : '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            backgroundColor: mode === 'dark' 
              ? 'rgba(10, 25, 47, 0.85)' 
              : 'rgba(255, 255, 255, 0.85)',
          },
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
};

export default createAppTheme; 