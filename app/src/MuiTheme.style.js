import { createTheme } from "@mui/material/styles";

const BetterTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#222831',
          bg: '#ffffff',
        },
        secondary: {
          main: '#76abae',
          text: '#ffffff',
        },
      },
});

export default BetterTheme;