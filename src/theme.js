// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#69b2ff',  // light blue
      main: '#1890ff',   // primary blue
      dark: '#006bb3',   // dark blue
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ff9e9e',  // light red
      main: '#ff4d4f',   // primary red
      dark: '#b32424',   // dark red
      contrastText: '#ffffff',
    },
    background: {
      default: '#f0f5ff', // light blue-grey
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',  // black
      secondary: '#595959',  // medium grey
      disabled: '#bfbfbf',  // light grey
    },
    divider: '#d9d9d9',  // light grey
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
          backgroundColor: '#006bb3',  // dark blue
          color: '#ffffff',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 240,
          backgroundColor: '#ffffff',  // white background
          color: '#000000',  // black text
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
