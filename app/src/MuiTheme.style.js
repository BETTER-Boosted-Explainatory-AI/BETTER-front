import { createTheme } from "@mui/material/styles";

const BetterTheme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Open Sans", "Nunito Sans", sans-serif;', 
  },
  palette: {
    mode: "light",
    primary: {
      main: "#222831",
      bg: "#ffffff",
    },
    secondary: {
      main: "#76abae",
      text: "#ffffff",
    },
    customColors: {
      // <-- Move here
      softBlue: "#c8dde0",
      paleBlue: "#e4eeef",
    },
  },
});

export default BetterTheme;
