import { useMemo, useState, type PropsWithChildren } from "react";
import { navigationItems } from "../config/navigation.ts";
import { AppContext, type AppPreferences } from "./appContext.ts";

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
