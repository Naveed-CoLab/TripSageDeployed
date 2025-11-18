const HTTP_PATTERN = /^https?:\/\//i;

export function sanitizeRedirectPath(path: string | null, fallback: string | null = "/") {
  if (!path) return fallback;

  if (HTTP_PATTERN.test(path)) {
    return fallback;
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function extractRedirectFromSearch(value: string | null) {
  if (!value) return null;

  try {
    return sanitizeRedirectPath(decodeURIComponent(value));
  } catch {
    return null;
  }
}

export function buildRedirectQuery(path: string | null) {
  const sanitized = sanitizeRedirectPath(path, null);
  if (!sanitized) return "";
  return `?redirect=${encodeURIComponent(sanitized)}`;
}

