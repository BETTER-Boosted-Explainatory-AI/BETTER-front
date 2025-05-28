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
      softBlue: "#c8dde0",
      paleBlue: "#e4eeef",
      softGray: "#f2f2f2",
      lightBlue: "#f6f9fa",
    },
  },
});

export default BetterTheme;
