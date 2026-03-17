"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import AuthModal, { type AuthMode } from "@/components/auth/AuthModal";
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
  initialUser: AdminNavbarUser | null;
};

export function Header({
  brand,
  navItems,
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
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [scrolled, setScrolled] = useState(false);
  const role = user?.role ?? null;

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
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
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    if (isAdminRoute) {
      router.replace("/admin/login");
    } else {
      router.push("/");
      router.refresh();
    }
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

  const openLogin = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthMode("register");
    setAuthModalOpen(true);
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          color: "#24513a",
          bgcolor: scrolled ? "rgba(240, 249, 244, 0.95)" : "#ecf8f0",
          borderBottom: scrolled
            ? "1px solid rgba(16, 185, 129, 0.14)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled ? "0 2px 10px rgba(15, 23, 42, 0.06)" : "none",
          transition:
            "background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease, backdrop-filter 180ms ease",
        }}
      >
        <Container
          sx={{
            py: 1.6,
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
                width: 44,
                height: 44,
                borderRadius: "50%",
                bgcolor: "#ffffff",
                color: "#047857",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                fontSize: "0.95rem",
                textDecoration: "none",
                border: "1px solid rgba(16, 185, 129, 0.18)",
                boxShadow: "0 6px 16px rgba(15, 23, 42, 0.06)",
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
                  color: "#065f46",
                  fontWeight: 700,
                  letterSpacing: 0.2,
                  fontSize: "1.1rem",
                  lineHeight: 1.2,
                }}
              >
                {brand.name}
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(6,95,70,0.72)" }}>
                {brand.tagline}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.25} sx={{ flexWrap: "wrap", alignItems: "center" }}>
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
                      color: "#065f46",
                      borderRadius: 999,
                      px: 1.2,
                      py: 0.8,
                      minHeight: 0,
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "rgba(16, 185, 129, 0.08)",
                        color: "#059669",
                      },
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
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: "#ffffff",
                        border: "1px solid rgba(16, 185, 129, 0.18)",
                        display: "grid",
                        placeItems: "center",
                        fontWeight: 800,
                        letterSpacing: 0.4,
                        p: 0,
                        color: "#047857",
                        boxShadow: "0 4px 14px rgba(15, 23, 42, 0.05)",
                        "&:hover": {
                          bgcolor: "#f7fffb",
                        },
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
                        textTransform: "none",
                        color: "#065f46",
                        borderColor: "rgba(16, 185, 129, 0.22)",
                        bgcolor: "rgba(255,255,255,0.78)",
                        "&:hover": {
                          borderColor: "rgba(16, 185, 129, 0.34)",
                          bgcolor: "rgba(16, 185, 129, 0.08)",
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
                      color: "#065f46",
                      borderRadius: 999,
                      px: 1.2,
                      py: 0.8,
                      minHeight: 0,
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "rgba(16, 185, 129, 0.08)",
                        color: "#059669",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                {role ? (
                  <>
                    <Button
                      component={Link}
                      href="/mein-konto"
                      sx={{
                        borderRadius: 999,
                        px: 2.5,
                        fontWeight: 700,
                        textTransform: "none",
                        color: "#047857",
                        borderColor: "rgba(16, 185, 129, 0.22)",
                        bgcolor: "rgba(255,255,255,0.78)",
                        boxShadow: "0 4px 14px rgba(15, 23, 42, 0.05)",
                        "&:hover": {
                          borderColor: "rgba(16, 185, 129, 0.34)",
                          bgcolor: "rgba(16, 185, 129, 0.08)",
                        },
                      }}
                    >
                      Mein Konto
                    </Button>
                    <Button
                      onClick={handleLogout}
                      variant="outlined"
                      color="inherit"
                      sx={{
                        borderRadius: 999,
                        px: 2.5,
                        fontWeight: 700,
                        textTransform: "none",
                        color: "#065f46",
                        borderColor: "rgba(16, 185, 129, 0.22)",
                        bgcolor: "rgba(255,255,255,0.78)",
                        "&:hover": {
                          borderColor: "rgba(16, 185, 129, 0.34)",
                          bgcolor: "rgba(16, 185, 129, 0.08)",
                        },
                      }}
                    >
                      Abmelden
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={openLogin}
                      variant="outlined"
                      color="inherit"
                      sx={{
                        borderRadius: 999,
                        px: 2.5,
                        fontWeight: 700,
                        textTransform: "none",
                        color: "#065f46",
                        borderColor: "rgba(16, 185, 129, 0.22)",
                        bgcolor: "rgba(255,255,255,0.78)",
                        "&:hover": {
                          borderColor: "rgba(16, 185, 129, 0.34)",
                          bgcolor: "rgba(16, 185, 129, 0.08)",
                          color: "#059669",
                        },
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      onClick={openRegister}
                      variant="outlined"
                      color="inherit"
                      sx={{
                        borderRadius: 999,
                        px: 2.5,
                        fontWeight: 700,
                        textTransform: "none",
                        color: "#ffffff",
                        borderColor: "#059669",
                        bgcolor: "#059669",
                        boxShadow: "0 10px 18px rgba(5, 150, 105, 0.18)",
                        "&:hover": {
                          borderColor: "#047857",
                          bgcolor: "#047857",
                        },
                      }}
                    >
                      Registrieren
                    </Button>
                  </>
                )}
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

      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSwitchMode={setAuthMode}
        onAuthSuccess={() => {
          setAuthModalOpen(false);
          router.refresh();
        }}
      />
    </>
  );
}
