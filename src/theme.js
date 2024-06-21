import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#69b2ff',
      main: '#1890ff',
      dark: '#006bb3',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ff9e9e',
      main: '#ff4d4f',
      dark: '#b32424',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f0f5ff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#595959',
      disabled: '#bfbfbf',
    },
    divider: '#d9d9d9',
  },
  typography: {
    fontFamily: [
      '"Roboto"',
      '"Helvetica"',
      '"Arial"',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.125rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#006bb3',
          color: '#ffffff',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 240,
          backgroundColor: '#ffffff',
          color: '#000000',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '2.125rem',
          fontWeight: 500,
        },
        h2: {
          fontSize: '1.75rem',
          fontWeight: 500,
        },
        h3: {
          fontSize: '1.5rem',
          fontWeight: 500,
        },
        h4: {
          fontSize: '1.25rem',
          fontWeight: 500,
        },
        h5: {
          fontSize: '1rem',
          fontWeight: 500,
        },
        h6: {
          fontSize: '0.875rem',
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
