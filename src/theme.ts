import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#568825" },   // ✅ cor oficial do site antigo
    secondary: { main: "#C7B27A" }, // areia/dourado suave (secundária elegante)
    background: { default: "#fbfbf7", paper: "#ffffff" },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: ["Inter", "system-ui", "Segoe UI", "Roboto", "Arial"].join(","),
    h1: { color: "#568825", fontWeight: 700, fontFamily: '"Josefin Sans", "Inter", sans-serif' },
    h2: { color: "#568825", fontWeight: 700, fontFamily: '"Josefin Sans", "Inter", sans-serif' },
    h3: { color: "#568825", fontWeight: 700, fontFamily: '"Josefin Sans", "Inter", sans-serif' },
    h4: { color: "#568825", fontWeight: 700, fontFamily: '"Josefin Sans", "Inter", sans-serif' },
    h5: { color: "#568825", fontWeight: 700, fontFamily: '"Josefin Sans", "Inter", sans-serif' },
    h6: { color: "#568825", fontWeight: 700, fontFamily: '"Josefin Sans", "Inter", sans-serif' },
    button: { textTransform: "none", fontWeight: 600 },
  },
});
