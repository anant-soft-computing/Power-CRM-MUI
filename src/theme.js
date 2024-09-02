import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#6ec6ff",
      main: "#1e88e5",
      dark: "#005cb2",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ffb74d",
      main: "#ff8f00",
      dark: "#c56000",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f4f4f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
      disabled: "#b0bec5",
    },
    divider: "#bdbdbd",
  },
  typography: {
    fontFamily: ['"Poppins"', '"Helvetica"', '"Arial"', "sans-serif"].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    button: {
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: "0.05em",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e88e5",
          color: "#ffffff",
          boxShadow: "none",
          borderBottom: "1px solid #bdbdbd",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 260,
          backgroundColor: "#f4f4f9",
          color: "#212121",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          borderRadius: "20px",
          padding: "10px 20px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          padding: "20px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: "2.5rem",
          fontWeight: 700,
          letterSpacing: "-0.02em",
        },
        h2: {
          fontSize: "2rem",
          fontWeight: 600,
        },
        h3: {
          fontSize: "1.75rem",
          fontWeight: 600,
        },
        h4: {
          fontSize: "1.5rem",
          fontWeight: 600,
        },
        h5: {
          fontSize: "1.25rem",
          fontWeight: 500,
        },
        h6: {
          fontSize: "1rem",
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
