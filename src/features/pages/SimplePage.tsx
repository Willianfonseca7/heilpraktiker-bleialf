import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { PageContainer } from "../../components/ui/PageContainer";

type SimplePageProps = {
  title: string;
  subtitle: string;
  intro: string;
  children?: ReactNode;
};

export function SimplePage({
  title,
  subtitle,
  intro,
  children,
}: SimplePageProps) {
  return (
    <Box component="main" sx={{ bgcolor: "#f8fcf9" }}>
      <PageContainer py={{ xs: 5, md: 8 }}>
        <Stack spacing={{ xs: 5, md: 6 }}>
          <Box
            sx={{
              borderRadius: 6,
              border: "1px solid rgba(5,150,105,0.12)",
              background:
                "linear-gradient(135deg, rgba(247,252,248,0.98) 0%, rgba(237,247,241,0.98) 48%, rgba(231,243,235,0.98) 100%)",
              px: { xs: 3, md: 5 },
              py: { xs: 4, md: 5 },
              boxShadow: "0 18px 45px rgba(15, 23, 42, 0.05)",
            }}
          >
            <Typography
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.24em",
                color: "primary.main",
                fontSize: "0.85rem",
                fontWeight: 700,
                mb: 2,
              }}
            >
              {subtitle}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.3rem", md: "3.1rem" },
                lineHeight: 1.05,
                maxWidth: 820,
                mb: 2.5,
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                maxWidth: 760,
                color: "text.secondary",
                fontSize: { xs: "1rem", md: "1.08rem" },
                lineHeight: 1.8,
              }}
            >
              {intro}
            </Typography>
          </Box>

          <Box
            sx={{
              borderRadius: 5,
              border: "1px solid rgba(5,150,105,0.12)",
              bgcolor: "background.paper",
              px: { xs: 3, md: 4 },
              py: { xs: 3, md: 4 },
              boxShadow: "0 16px 32px rgba(15, 23, 42, 0.05)",
            }}
          >
            <Stack spacing={3}>
              {children}
            </Stack>
          </Box>
        </Stack>
      </PageContainer>
    </Box>
  );
}
