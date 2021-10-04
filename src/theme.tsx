import { createTheme } from "@mui/material/styles";

// Create a theme instance.
// https://mui.com/customization/theming/
const theme = createTheme({
  palette: {
    primary: {
      main: "#673AB7",
    },
    secondary: {
      main: "#9575CD",
    },
    background: {
      default: "#f7f7f7",
    },
  },
  typography: {
    fontSize: 17,
    h1: {
      fontSize: "2.7rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2.0rem",
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: "1.0rem",
      fontWceight: 400,
      lineHeight: 1.5,
      color: "#85858B",
    },
  },
});

export default theme;
