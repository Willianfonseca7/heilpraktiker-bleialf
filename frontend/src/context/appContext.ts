import { createContext } from "react";
import type { NavItem } from "../types/navigation.ts";

export type AppPreferences = {
  language: "de";
};

export type AppContextValue = {
  navItems: NavItem[];
  preferences: AppPreferences;
  setPreferences: (next: AppPreferences) => void;
};

export const AppContext = createContext<AppContextValue | undefined>(undefined);
