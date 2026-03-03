"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import { theme } from "../theme";
import { AppProvider } from "../context/AppContext";
import { ErrorBoundary } from "../components/common/ErrorBoundary";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { contactNavItem, legalNavItems, navigationItems, siteBrand } from "../config/site";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
          <Header brand={siteBrand} navItems={navigationItems} contactItem={contactNavItem} />
          <Box component="main">{children}</Box>
          <Footer brandName={siteBrand.name} legalLinks={legalNavItems} />
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
