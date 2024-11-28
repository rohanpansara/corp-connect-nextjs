import { cookies } from "next/headers";

export function getCookieAsString(cookieName: string): string {
  const cookieStore = cookies();
  return cookieStore.get(cookieName)?.value || "";
}

export function getCookieAsNumber(cookieName: string): number | null {
  const cookieStore = cookies();
  const value = cookieStore.get(cookieName)?.value;
  return value && !isNaN(Number(value)) ? Number(value) : null;
}

export function getCookieAsBoolean(cookieName: string): boolean {
  const cookieStore = cookies();
  const value = cookieStore.get(cookieName)?.value?.toLowerCase();
  return value === "true";
}

export function getCookieAsJson<T>(cookieName: string): T | null {
  const cookieStore = cookies();
  const value = cookieStore.get(cookieName)?.value;
  try {
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    console.warn(`Failed to parse cookie "${cookieName}" as JSON.`);
    return null;
  }
}

export function getRawCookie(cookieName: string): string | null {
  const cookieStore = cookies();
  return cookieStore.get(cookieName)?.value || null;
}
