import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Heilpraktiker-Zentrum Bleialf",
  description: "Ganzheitliche Gesundheit, Akupunktur, Psychotherapie und Lerntherapie.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="de">
      <body>
        <Providers
          initialUser={
            session
              ? {
                  role: session.role,
                  firstName: session.firstName,
                  lastName: session.lastName,
                }
              : null
          }
        >
          {children}
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
