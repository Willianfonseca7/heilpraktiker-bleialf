import { Box, Typography } from "@mui/material";
import { PageContainer } from "../../components/ui/PageContainer.tsx";

export function NotFound() {
  return (
    <PageContainer>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main", mb: 2 }}>
          Seite nicht gefunden
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Die angeforderte Seite existiert nicht oder wurde verschoben.
        </Typography>
      </Box>
    </PageContainer>
  );
}
