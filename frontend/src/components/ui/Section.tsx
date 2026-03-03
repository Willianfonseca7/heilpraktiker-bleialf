import { Box, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  mt?: { xs: number; md: number } | number;
}>;

export function Section({ title, subtitle, mt = { xs: 6, md: 10 }, children }: SectionProps) {
  return (
    <Box sx={{ mt }}>
      {title && (
        <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main", mb: subtitle ? 1 : 3 }}>
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography sx={{ color: "text.secondary", mb: 3, maxWidth: 820 }}>{subtitle}</Typography>
      )}
      {children}
    </Box>
  );
}
