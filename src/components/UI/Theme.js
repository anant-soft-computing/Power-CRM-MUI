import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
    info: {
      main: "#000000",
    },
    warning: {
      main: "#7f5217",
    },
  },
  direction: "rtl",
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
  props: {
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: "small",
    },
  },
});

export default Theme;
