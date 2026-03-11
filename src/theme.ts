import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#059669", dark: "#065f46" },
    secondary: { main: "#C7B27A" }, // areia/dourado suave (secundária elegante)
    background: { default: "#f6fbf7", paper: "#ffffff" },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: ["Inter", "system-ui", "Segoe UI", "Roboto", "Arial"].join(","),
    h1: { color: "#065f46", fontWeight: 700, fontFamily: '"Josefin Sans", "Inter", sans-serif' },
    h2: { color: "#065f46", fontWeight: 700, fontFamily: '"Josefin Sans", "Inter", sans-serif' },
    h3: { color: "#065f46", fontWeight: 700, fontFamily: '"Josefin Sans", "Inter", sans-serif' },
    h4: { color: "#065f46", fontWeight: 700, fontFamily: '"Josefin Sans", "Inter", sans-serif' },
    h5: { color: "#065f46", fontWeight: 700, fontFamily: '"Josefin Sans", "Inter", sans-serif' },
    h6: { color: "#065f46", fontWeight: 700, fontFamily: '"Josefin Sans", "Inter", sans-serif' },
    button: { textTransform: "none", fontWeight: 600 },
  },
});
