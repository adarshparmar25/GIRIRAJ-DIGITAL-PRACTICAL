import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import "../styles/global.scss";

export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        variables: {
          background: "#000",
          surface: "#FFFFFF",
        },
        colors: {
          primary: "#1976d2",
          secondary: "#ff4081",
        },
      },
      dark: {
        variables: {
          background: "#121212",
          surface: "#1E1E1E",
        },
        colors: {
          primary: "#1e88e5",
          secondary: "#e91e63",
        },
      },
    },
  },
});
