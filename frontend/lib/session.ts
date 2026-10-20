export type LoginMode = "claveunica" | "inapi";

export const COOKIE_AUTH = "miinapi-auth";
export const COOKIE_MODE = "miinapi-mode";
export const COOKIE_RUT = "miinapi-rut";

function setCookie(name: string, value: string, maxAge = 3600) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; samesite=lax`;
}

function clearCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
}

export function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const parts = document.cookie.split(";").map((p) => p.trim());
  const hit = parts.find((p) => p.startsWith(`${name}=`));
  if (!hit) return null;
  return decodeURIComponent(hit.slice(name.length + 1));
}

export function writeClaveUnicaSession() {
  setCookie(COOKIE_AUTH, "true");
  setCookie(COOKIE_MODE, "claveunica");
  clearCookie(COOKIE_RUT);
}

export function writeInapiSession(rutNum: string) {
  setCookie(COOKIE_AUTH, "inapi-session");
  setCookie(COOKIE_MODE, "inapi");
  setCookie(COOKIE_RUT, rutNum);
}

export function readSessionFromCookies(): {
  loginMode: LoginMode;
  sessionRut: string | null;
} {
  const mode = readCookie(COOKIE_MODE);
  const rut = readCookie(COOKIE_RUT);
  if (mode === "inapi" && rut) {
    return { loginMode: "inapi", sessionRut: rut };
  }
  return { loginMode: "claveunica", sessionRut: null };
}
