// lib/auth.ts

import { cookies } from "next/headers";

export function getTokenExpiry(token: string): number | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = Buffer.from(base64, "base64").toString("utf-8");
    const claims = JSON.parse(json) as { exp?: number };
    return typeof claims.exp === "number" ? claims.exp : null;
  } catch {
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return false;

  const tokenExpiry = getTokenExpiry(token);
  const secondsUntilExpiry = tokenExpiry
    ? tokenExpiry - Math.floor(Date.now() / 1000)
    : null;

  return secondsUntilExpiry === null || secondsUntilExpiry > 0;
}