import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

type AdminRole = "SUPERADMIN" | "ADMIN" | "PATIENT" | null;

function isAdminHost(host: string) {
  if (host.startsWith("admin.")) return true;
  if (host.startsWith("localhost")) return true;
  if (host.startsWith("127.0.0.1")) return true;
  return false;
}

export async function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("admin-session")?.value;
  let hasSession = false;
  let role: AdminRole = null;
  if (token) {
    try {
      const session = await verifySession(token);
      hasSession = true;
      role = (session?.role as AdminRole) ?? null;
    } catch {
      hasSession = false;
    }
  }

  const isAdminRoute =
    pathname.startsWith("/patients") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login");

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/verwaltung")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname
      .replace(/^\/verwaltung\/admins/, "/admin/users")
      .replace(/^\/verwaltung\/login/, "/admin/login");
    if (url.pathname.startsWith("/verwaltung")) {
      url.pathname = url.pathname.replace(/^\/verwaltung/, "/admin");
    }
    return NextResponse.redirect(url);
  }

  if (isAdminRoute && !isAdminHost(host)) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin/login")) {
    if (hasSession) {
      const url = req.nextUrl.clone();
      url.pathname = role === "SUPERADMIN" ? "/admin/users" : "/patients";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/patients") && !hasSession) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (pathname.startsWith("/admin/users") && role !== "SUPERADMIN") {
    const url = req.nextUrl.clone();
    url.pathname = "/patients";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/api/users") && !hasSession) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isAdminRoute && !hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
