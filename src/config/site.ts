import type { NavItem } from "../types/navigation";

export const siteBrand = {
  shortName: "HZ",
  name: "Heilpraktiker-Zentrum Bleialf",
  tagline: "Ganzheitliche Gesundheit",
};

export const navigationItems: NavItem[] = [
  { label: "Team", path: "/team" },
  { label: "Kompetenz", path: "/kompetenz" },
  { label: "Aktuelles", path: "/aktuelles" },
];

export const contactNavItem: NavItem = { label: "Kontakt", path: "/kontakt" };

export const legalNavItems: NavItem[] = [
  { label: "Impressum", path: "/impressum" },
  { label: "Datenschutz", path: "/datenschutz" },
];
