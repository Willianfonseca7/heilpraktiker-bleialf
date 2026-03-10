"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { NavItem } from "../types/navigation";
import type { CurrentUser, UserRole } from "../types/user";
import { getCurrentUser, updateCurrentUser } from "@/lib/account-api";
import MyAccountModal from "@/components/account/MyAccountModal";
import type { UserAccountFormValues } from "@/components/account/UserAccountForm";

type AdminNavbarUser = {
  id?: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email?: string;
  isActive?: boolean;
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
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountSubmitting, setAccountSubmitting] = useState(false);
  const role = user?.role ?? null;

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    if (!isAdminRoute) return;
    let active = true;
    getCurrentUser()
      .then((nextUser) => {
        if (!active) return;
        setUser(
          nextUser
            ? {
                id: nextUser.id,
                role: nextUser.role,
                firstName: nextUser.firstName ?? "",
                lastName: nextUser.lastName ?? "",
                email: nextUser.email ?? "",
                isActive: nextUser.isActive,
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

  const accountUser: CurrentUser | null = user?.id
    ? {
        id: user.id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email ?? "",
        isActive: user.isActive ?? true,
      }
    : null;

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

  const handleAccountOpen = async () => {
    if (!role) return;

    try {
      const nextUser = await getCurrentUser();
      setUser({
        id: nextUser.id,
        role: nextUser.role,
        firstName: nextUser.firstName,
        lastName: nextUser.lastName,
        email: nextUser.email,
        isActive: nextUser.isActive,
      });
      setAccountOpen(true);
    } catch {
      toast.error("Profil konnte nicht geladen werden.");
    }
  };

  const handleAccountSubmit = async (values: UserAccountFormValues) => {
    setAccountSubmitting(true);
    try {
      const updated = await updateCurrentUser({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        password: values.password.trim() || undefined,
      });

      setUser({
        id: updated.id,
        role: updated.role,
        firstName: updated.firstName,
        lastName: updated.lastName,
        email: updated.email,
        isActive: updated.isActive,
      });
      setAccountOpen(false);
      router.refresh();
      toast.success("Profil erfolgreich aktualisiert.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Profil konnte nicht aktualisiert werden.";
      toast.error(message);
    } finally {
      setAccountSubmitting(false);
    }
  };

  return (
    <>
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
                    <Button
                      onClick={handleAccountOpen}
                      color="inherit"
                      sx={{
                        minWidth: 38,
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        bgcolor: "rgba(255,255,255,0.16)",
                        border: "1px solid rgba(255,255,255,0.28)",
                        display: "grid",
                        placeItems: "center",
                        fontWeight: 800,
                        letterSpacing: 0.4,
                        p: 0,
                      }}
                    >
                      {userInitials || "AD"}
                    </Button>
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

      <MyAccountModal
        open={accountOpen}
        initialData={accountUser}
        submitting={accountSubmitting}
        onSubmit={handleAccountSubmit}
        onClose={() => {
          if (accountSubmitting) return;
          setAccountOpen(false);
        }}
      />
    </>
  );
}
