const raw = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/** Backend origin without trailing slash */
export const API_BASE_URL = raw.replace(/\/$/, "");

/** Absolute URL for an API path (path should start with `/`, e.g. `/users/me`). */
export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${p}`;
}
