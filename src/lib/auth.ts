export type SessionPayload = {
  sub: string;
  email: string;
  role: "SUPERADMIN" | "ADMIN";
  firstName: string;
  lastName: string;
};

type JwtPayload = SessionPayload & {
  iat: number;
  exp: number;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is missing");
  }
  return secret;
}

function base64urlEncode(input: Uint8Array | string) {
  const data = typeof input === "string" ? input : decoder.decode(input);
  const b64 =
    typeof Buffer !== "undefined"
      ? Buffer.from(data, "utf8").toString("base64")
      : btoa(data);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64urlDecode(input: string) {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
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
  if (!match) return 7 * 24 * 60 * 60;
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
      return amount * 24 * 60 * 60;
    default:
      return 7 * 24 * 60 * 60;
  }
}

export function getSessionMaxAgeSeconds() {
  return parseExpiresIn(process.env.JWT_EXPIRES_IN ?? "7d");
}

export async function signSession(payload: SessionPayload) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + getSessionMaxAgeSeconds();

  const header = { alg: "HS256", typ: "JWT" };
  const body: JwtPayload = { ...payload, iat, exp };

  const headerPart = base64urlEncode(JSON.stringify(header));
  const bodyPart = base64urlEncode(JSON.stringify(body));
  const signingInput = `${headerPart}.${bodyPart}`;
  const signature = await hmacSha256(getJwtSecret(), signingInput);
  const sigPart = base64urlEncode(signature);
  return `${signingInput}.${sigPart}`;
}

export async function verifySession(token: string) {
  const [headerPart, bodyPart, sigPart] = token.split(".");
  if (!headerPart || !bodyPart || !sigPart) {
    throw new Error("Invalid token");
  }

  const signingInput = `${headerPart}.${bodyPart}`;
  const expected = await hmacSha256(getJwtSecret(), signingInput);
  const expectedSig = base64urlEncode(expected);
  if (expectedSig !== sigPart) {
    throw new Error("Invalid signature");
  }

  const payload = JSON.parse(base64urlDecode(bodyPart)) as JwtPayload;
  if (!payload?.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error("Token expired");
  }
  return payload;
}
