import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "tott_admin_session";
export const ADMIN_SESSION_MAX_AGE = 8 * 60 * 60;

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export function verifyAdminPassword(password: string) {
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword) return false;

  const suppliedHash = createHash("sha256").update(password).digest();
  const expectedHash = createHash("sha256").update(expectedPassword).digest();
  return timingSafeEqual(suppliedHash, expectedHash);
}

export function createAdminSessionToken() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");

  const issuedAt = Math.floor(Date.now() / 1000).toString();
  const signature = createHmac("sha256", secret).update(issuedAt).digest("hex");
  return `${issuedAt}.${signature}`;
}

export function isAdminRequest(request: Request) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const cookie = request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_SESSION_COOKIE}=`));
  const token = cookie?.slice(ADMIN_SESSION_COOKIE.length + 1);
  if (!token) return false;

  const [issuedAt, signature, extra] = token.split(".");
  if (!issuedAt || !signature || extra || !/^\d+$/.test(issuedAt) || !/^[a-f\d]{64}$/i.test(signature)) {
    return false;
  }

  const issuedAtSeconds = Number(issuedAt);
  const age = Math.floor(Date.now() / 1000) - issuedAtSeconds;
  if (!Number.isSafeInteger(issuedAtSeconds) || age < 0 || age > ADMIN_SESSION_MAX_AGE) {
    return false;
  }

  const expected = createHmac("sha256", secret).update(issuedAt).digest();
  const provided = Buffer.from(signature, "hex");
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}