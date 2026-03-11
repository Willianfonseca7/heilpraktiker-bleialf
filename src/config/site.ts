import type { NavItem } from "../types/navigation";

export const siteBrand = {
  shortName: "HZ",
  name: "Heilpraktiker-Zentrum Bleialf",
  tagline: "Ganzheitliche Gesundheit",
};

export const navigationItems: NavItem[] = [
  { label: "Start", path: "/" },
  { label: "Unser Team", path: "/team" },
  { label: "Behandlungen", path: "/behandlungen" },
  { label: "Praxisräume", path: "/aktuelles" },
  { label: "Kontakt", path: "/kontakt" },
];

export const contactNavItem: NavItem = {
  label: "Gesundheits-Check",
  path: "/gesundheits-check",
};

export const legalNavItems: NavItem[] = [
  { label: "Impressum", path: "/impressum" },
  { label: "Datenschutz", path: "/datenschutz" },
];
