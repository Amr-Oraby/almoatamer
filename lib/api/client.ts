let isRedirectingToLogin = false;

function handleUnauthorized(url: string) {
  if (isRedirectingToLogin) return;
  if (url.includes("/api/auth/login") || url.includes("/api/auth/logout")) return;

  // Prevent infinite redirect loop: if we're already on the login page, don't redirect again
  if (typeof window !== "undefined" && window.location.pathname.includes("/auth")) return;

  isRedirectingToLogin = true;

  if (typeof document !== "undefined") {
    document.cookie = "user_type=; Max-Age=0; Path=/";
    document.cookie = "user_data=; Max-Age=0; Path=/";
  }

  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon("/api/auth/logout");
  }

  const locale = typeof document !== "undefined" ? document.documentElement.lang || "en" : "en";
  // Hard redirect is intentional: a full reload resets in-memory React Query state on session expiry.
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
  window.location.href = `/${locale}/auth?error=session_expired`;
}

export async function apiClient<T>(url: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers);

  const isFormData = options?.body instanceof FormData;
  if (!headers.has("Content-Type") && !isFormData) {
    headers.set("Content-Type", "application/json");
  } else if (headers.get("Content-Type")?.includes("multipart/form-data")) {
    headers.delete("Content-Type");
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      handleUnauthorized(url);
    }
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}
