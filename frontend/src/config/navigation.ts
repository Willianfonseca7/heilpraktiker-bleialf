import type { NavItem } from "../types/navigation.ts";

export const navigationItems: NavItem[] = [
  { label: "Team", path: "/team" },
  { label: "Kompetenz", path: "/kompetenz" },
  { label: "Aktuelles", path: "/aktuelles" },
];

export const contactNavItem: NavItem = { label: "Kontakt", path: "/kontakt" };
