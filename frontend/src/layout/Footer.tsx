import { Box, Container, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <Box sx={{ borderTop: "1px solid", borderColor: "divider", mt: 8, py: 4, bgcolor: "background.paper" }}>
      <Container>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Heilpraktiker-Zentrum Bleialf
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap" }}>
          <MuiLink component={Link} to="/impressum" underline="hover" color="text.secondary">
            Impressum
          </MuiLink>
          <MuiLink component={Link} to="/datenschutz" underline="hover" color="text.secondary">
            Datenschutz
          </MuiLink>
        </Box>
      </Container>
    </Box>
  );
}
