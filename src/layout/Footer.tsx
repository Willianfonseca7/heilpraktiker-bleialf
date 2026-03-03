"use client";

import { Box, Container, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import type { NavItem } from "../types/navigation";

type FooterProps = {
  brandName: string;
  legalLinks: NavItem[];
};

export function Footer({ brandName, legalLinks }: FooterProps) {
  return (
    <Box sx={{ borderTop: "1px solid", borderColor: "divider", mt: 8, py: 4, bgcolor: "background.paper" }}>
      <Container>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} {brandName}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap" }}>
          {legalLinks.map((item) => (
            <MuiLink key={item.path} component={Link} href={item.path} underline="hover" color="text.secondary">
              {item.label}
            </MuiLink>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
