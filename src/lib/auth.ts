export type AppRole = "USER" | "ADMIN" | "SUPERADMIN";

export type SessionPayload = {
  sub: string;
  email: string;
  role: AppRole;
  firstName: string;
  lastName: string;
};

type JwtPayload = SessionPayload & {
  iat: number;
  exp: number;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const SESSION_COOKIE_NAME = "app-session";
export const SESSION_COOKIE_PATH = "/";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is missing");
  return secret;
}

function base64UrlEncode(input: Uint8Array | string) {
  const data =
    typeof input === "string" ? input : decoder.decode(input);
  const b64 =
    typeof Buffer !== "undefined"
      ? Buffer.from(data, "utf-8").toString("base64")
      : btoa(data);

  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(input: string) {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  const str =
    typeof Buffer !== "undefined"
      ? Buffer.from(b64 + pad, "base64").toString("utf8")
      : atob(b64 + pad);

  return str;
}

async function hmacSha256(secret: string, data: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );

  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return new Uint8Array(sig);
}

function parseExpiresIn(value: string) {
  const match = /^(\d+)([smhd])$/.exec(value);
  if (!match) return 60 * 60 * 24 * 7;

  const amount = Number(match[1]);
  const unit = match[2];

  switch (unit) {
    case "s":
      return amount;
    case "m":
      return amount * 60;
    case "h":
      return amount * 60 * 60;
    case "d":
      return amount * 60 * 60 * 24;
    default:
      return 60 * 60 * 24 * 7;
  }
}

export function getSessionMaxAgeSeconds() {
  return parseExpiresIn(process.env.JWT_EXPIRES_IN || "7d");
}

export function getSessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: SESSION_COOKIE_PATH,
    maxAge,
  };
}

export function getExpiredSessionCookieOptions() {
  return getSessionCookieOptions(0);
}

export async function signSession(payload: SessionPayload) {
  const header = { alg: "HS256", typ: "JWT" };

  const now = Math.floor(Date.now() / 1000);
  const exp = now + getSessionMaxAgeSeconds();

  const fullPayload: JwtPayload = {
    ...payload,
    iat: now,
    exp,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const signature = await hmacSha256(getJwtSecret(), unsignedToken);
  const encodedSignature = base64UrlEncode(signature);

  return `${unsignedToken}.${encodedSignature}`;
}

export async function verifySession(token: string): Promise<JwtPayload | null> {
  try {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");
    if (!encodedHeader || !encodedPayload || !encodedSignature) return null;

    const unsignedToken = `${encodedHeader}.${encodedPayload}`;
    const expectedSignature = await hmacSha256(getJwtSecret(), unsignedToken);
    const expectedEncodedSignature = base64UrlEncode(expectedSignature);

    if (expectedEncodedSignature !== encodedSignature) return null;

    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as JwtPayload;

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp <= now) return null;

    return payload;
  } catch {
    return null;
  }
}
