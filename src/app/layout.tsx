import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Heilpraktiker-Zentrum Bleialf",
  description: "Ganzheitliche Gesundheit, Akupunktur, Psychotherapie und Lerntherapie.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
