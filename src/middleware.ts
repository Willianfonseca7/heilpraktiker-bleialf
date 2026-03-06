import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isAdminHost(host: string) {
  if (host.startsWith("admin.")) return true;
  if (host.startsWith("localhost")) return true;
  if (host.startsWith("127.0.0.1")) return true;
  return false;
}

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const { pathname } = req.nextUrl;
  const hasSession = Boolean(req.cookies.get("admin-session")?.value);

  const isAdminRoute =
    pathname.startsWith("/patients") ||
    pathname.startsWith("/verwaltung") ||
    pathname.startsWith("/login");

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (isAdminRoute && !isAdminHost(host)) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/verwaltung/login")) {
    if (hasSession) {
      const url = req.nextUrl.clone();
      url.pathname = "/patients";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (isAdminRoute && !hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/verwaltung/login";
    url.searchParams.set("reason", "expired");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
