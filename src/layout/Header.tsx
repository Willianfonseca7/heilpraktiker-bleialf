"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { NavItem } from "../types/navigation";
import type { UserRole } from "../types/user";

type AdminNavbarUser = {
  role: UserRole;
  firstName: string;
  lastName: string;
};

type Brand = {
  shortName: string;
  name: string;
  tagline: string;
};

type HeaderProps = {
  brand: Brand;
  navItems: NavItem[];
  contactItem: NavItem;
  initialUser: AdminNavbarUser | null;
};

export function Header({
  brand,
  navItems,
  contactItem,
  initialUser,
}: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const isAdminRoute =
    pathname.startsWith("/patients") || pathname.startsWith("/admin");
  const homeHref = isAdminRoute ? "/patients" : "/";
  const [user, setUser] = useState<AdminNavbarUser | null>(initialUser);
  const role = user?.role ?? null;

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    if (!isAdminRoute) return;
    let active = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active) return;
        const nextUser = data?.user ?? null;
        setUser(
          nextUser
            ? {
                role: nextUser.role,
                firstName: nextUser.firstName ?? "",
                lastName: nextUser.lastName ?? "",
              }
            : null
        );
      })
      .catch(() => {
        if (!active) return;
        setUser(null);
      });
    return () => {
      active = false;
    };
  }, [isAdminRoute, pathname]);

  const adminNavItems = useMemo(
    () => {
      if (role === "SUPERADMIN") {
        return [
          { label: "Patientenverwaltung", path: "/patients" },
          { label: "Admin-Verwaltung", path: "/admin/users" },
        ];
      }

      return [];
    },
    [role]
  );

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.replace("/admin/login");
    router.refresh();
  };

  const userInitials = useMemo(() => {
    if (!user) return "";

    const firstName = (user.firstName ?? "").trim();
    const lastName = (user.lastName ?? "").trim();
    const first = firstName.charAt(0);
    const last = lastName.charAt(0);

    return `${first}${last}`.trim().toUpperCase();
  }, [user]);

  return (
    <Box
      component="header"
      sx={{
        position: isHome ? "absolute" : "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        color: "common.white",
        bgcolor: "primary.main",
        background:
          "linear-gradient(180deg, rgba(86,136,37,0.95) 0%, rgba(86,136,37,0.85) 55%, rgba(86,136,37,0.7) 100%)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid rgba(255,255,255,0.18)",
      }}
    >
      <Container
        sx={{
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          position: "relative",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            component={Link}
            href={homeHref}
            sx={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.92)",
              color: "primary.main",
              display: "grid",
              placeItems: "center",
              fontWeight: 800,
              textDecoration: "none",
              boxShadow: "0 8px 18px rgba(0,0,0,0.25)",
            }}
          >
            {brand.shortName}
          </Box>
          <Box>
            <Typography
              component={Link}
              href={homeHref}
              variant="h6"
              sx={{
                textDecoration: "none",
                color: "common.white",
                fontWeight: 800,
                letterSpacing: 0.2,
              }}
            >
              {brand.name}
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.85)" }}>
              {brand.tagline}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", alignItems: "center" }}>
          {isAdminRoute ? (
            <>
              {adminNavItems.map((item) => (
                <Button
                  key={`${item.path}-${item.label}`}
                  component={Link}
                  href={item.path}
                  color="inherit"
                  sx={{
                    fontWeight: 600,
                    color: "common.white",
                  }}
                >
                  {item.label}
                </Button>
              ))}
              {role ? (
                <>
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      bgcolor: "rgba(255,255,255,0.16)",
                      border: "1px solid rgba(255,255,255,0.28)",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 800,
                      letterSpacing: 0.4,
                    }}
                  >
                    {userInitials || "AD"}
                  </Box>
                  <Button
                    onClick={handleLogout}
                    variant="outlined"
                    color="inherit"
                    sx={{
                      borderRadius: 999,
                      px: 2.5,
                      fontWeight: 700,
                      color: "common.white",
                      borderColor: "rgba(255,255,255,0.7)",
                      bgcolor: "transparent",
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.95)",
                        bgcolor: "rgba(255,255,255,0.12)",
                      },
                    }}
                  >
                    Abmelden
                  </Button>
                </>
              ) : null}
            </>
          ) : (
            <>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  href={item.path}
                  color="inherit"
                  sx={{
                    fontWeight: 600,
                    color: "common.white",
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                component={Link}
                href={contactItem.path}
                variant="outlined"
                color="inherit"
                sx={{
                  borderRadius: 999,
                  px: 2.5,
                  fontWeight: 700,
                  color: "common.white",
                  borderColor: "rgba(255,255,255,0.7)",
                  bgcolor: "transparent",
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.95)",
                    bgcolor: "rgba(255,255,255,0.12)",
                  },
                }}
              >
                {contactItem.label}
              </Button>
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
