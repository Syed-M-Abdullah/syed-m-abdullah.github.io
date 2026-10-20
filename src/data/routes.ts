// Single source of truth for every pre-rendered page. Used by scripts/export-static.mjs
// (static HTML + sitemap). Imports use explicit .ts extensions so Node can load this file
// directly with its built-in TypeScript type-stripping.
import { projects, retiredUrls } from "./projects.ts";
import { services } from "./services.ts";
import { site } from "./site.ts";

export const siteUrl = site.url;
export const siteName = site.name;

export const staticPages = ["/", "/services", "/projects", "/process", "/about", "/contact"];

/** Pages listed in the sitemap. */
export function getStaticRoutes(): string[] {
  return [
    ...staticPages,
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`),
  ];
}

/**
 * Old URLs kept working: each is exported as a small page that forwards to its new address
 * (not listed in the sitemap).
 */
export function getRedirectRoutes(): string[] {
  const legacy = new Set<string>();
  for (const p of projects) {
    for (const s of p.legacySlugs) legacy.add(s);
    if (p.source === "manual") legacy.add(p.slug);
  }
  const retired = Object.keys(retiredUrls).filter(
    (u) => !u.startsWith("/case/") || !legacy.has(u.slice(6)),
  );
  return ["/case-studies", ...[...legacy].map((s) => `/case/${s}`), ...retired];
}
