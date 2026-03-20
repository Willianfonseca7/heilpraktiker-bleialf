"use client";

import { useMemo, useState, type PropsWithChildren } from "react";
import { navigationItems } from "../config/site";
import { AppContext, type AppPreferences } from "./appContext";

export function AppProvider({ children }: PropsWithChildren) {
  const [preferences, setPreferences] = useState<AppPreferences>({ language: "de" });

  const value = useMemo(
    () => ({
      navItems: navigationItems,
      preferences,
      setPreferences,
    }),
    [preferences]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
