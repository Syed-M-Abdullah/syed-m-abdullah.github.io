// Single source of truth for every pre-rendered page. Used by scripts/export-static.mjs
// (static HTML + sitemap). Imports use explicit .ts extensions so Node can load this file
// directly with its built-in TypeScript type-stripping.
import { caseStudies } from "./caseStudies.ts";
import { services } from "./services.ts";
import { site } from "./site.ts";

export const siteUrl = site.url;
export const siteName = site.name;

export const staticPages = ["/", "/services", "/case-studies", "/process", "/about", "/contact"];

export function getStaticRoutes(): string[] {
  return [
    ...staticPages,
    ...services.map((s) => `/services/${s.slug}`),
    ...caseStudies.map((c) => `/case/${c.slug}`),
  ];
}
