import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";

export const metadata = {
  title: "Heilpraktiker-Zentrum Bleialf",
  description: "Ganzheitliche Gesundheit, Akupunktur, Psychotherapie und Lerntherapie.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <Providers>
          {children}
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
