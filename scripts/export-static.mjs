// Builds the app and pre-renders every route to static HTML for GitHub Pages.
//   npm run export:github  →  .output/github/
import { execFileSync, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, ".output", "github");
const SRC_DIR = path.join(ROOT, ".output", "public");
const SSR_HANDLER = path.join(ROOT, ".output", "server", "index.mjs");
const ROUTES_MODULE = path.join(ROOT, "src", "data", "routes.ts");
// Files the Cloudflare/Nitro build emits that GitHub Pages doesn't use.
const SKIP_FILES = new Set(["_headers", "_redirects"]);
const NOT_FOUND_PROBE = "/__export-404__";

function log(...args) {
  console.log("[export-static]", ...args);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function rmrf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function copyDir(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (SKIP_FILES.has(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

/**
 * Loads the route list from src/data/routes.ts using Node's built-in TypeScript
 * type-stripping (Node ≥ 22.6). Runs in a child process so the flag works on every
 * supported Node version without changing how this script is invoked.
 */
function loadRouteConfig() {
  const code = `import(${JSON.stringify(pathToFileURL(ROUTES_MODULE).href)}).then((m) => {
    process.stdout.write(JSON.stringify({ routes: m.getStaticRoutes(), redirects: m.getRedirectRoutes?.() ?? [], siteUrl: m.siteUrl, siteName: m.siteName }));
  });`;
  const out = execFileSync(
    process.execPath,
    ["--experimental-strip-types", "--no-warnings", "--input-type=module", "-e", code],
    { cwd: ROOT, encoding: "utf-8" },
  );
  const { routes, redirects, siteUrl, siteName } = JSON.parse(out);
  if (!Array.isArray(routes) || routes.length === 0)
    throw new Error("No routes found in routes.ts");
  const all = [...routes, ...redirects];
  const dupes = all.filter((r, i) => all.indexOf(r) !== i);
  if (dupes.length) throw new Error(`Duplicate routes: ${dupes.join(", ")}`);
  return { routes, redirects, siteUrl: siteUrl.replace(/\/+$/, ""), siteName };
}

/**
 * Every srcset candidate in the exported HTML must exist — e.g. the 800px "-800.webp" copy of a
 * large case-study screenshot (see CONTENT-GUIDE.md). A missing one would show a broken image.
 */
function missingSrcsetFiles() {
  const missing = new Set();
  const walk = (dir) => {
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (name.endsWith(".html")) {
        const html = fs.readFileSync(p, "utf-8");
        for (const [, set] of html.matchAll(/srcSet="([^"]+)"/gi)) {
          for (const candidate of set.split(",")) {
            const url = candidate.trim().split(/\s+/)[0];
            if (url.startsWith("/") && !fs.existsSync(path.join(OUT_DIR, decodeURI(url))))
              missing.add(url);
          }
        }
      }
    }
  };
  walk(OUT_DIR);
  return [...missing];
}

async function render(handler, url) {
  const response = await handler.fetch(new Request(url), {}, { waitUntil: (p) => p });
  return { status: response.status, html: await response.text() };
}

function outputFile(route) {
  return route === "/" ? path.join(OUT_DIR, "index.html") : path.join(OUT_DIR, route, "index.html");
}

function writeFile(filePath, contents) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, contents, "utf-8");
  log("wrote", path.relative(ROOT, filePath));
}

const canonical = (siteUrl, route) => (route === "/" ? `${siteUrl}/` : `${siteUrl}${route}/`);

function sitemapXml(siteUrl, routes) {
  const urls = routes.map((r) => `  <url><loc>${canonical(siteUrl, r)}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
  log("starting static export for GitHub Pages");

  // 1. Route list (fails fast before the slow build if routes.ts is broken)
  const { routes, redirects, siteUrl, siteName } = loadRouteConfig();
  log(`found ${routes.length} routes (+${redirects.length} redirect pages) for ${siteUrl}`);

  // 2. Production build
  log("running production build...");
  execSync("npm run build", { cwd: ROOT, stdio: "inherit" });

  // 3. Import SSR handler
  const { default: handler } = await import(pathToFileURL(SSR_HANDLER).href);

  // 4. Clean output and copy client assets
  rmrf(OUT_DIR);
  copyDir(SRC_DIR, OUT_DIR);

  // 5. Render every route
  const base = "http://localhost:8080";
  // Redirect pages (old URLs) render like any page but stay out of the sitemap.
  for (const route of [...routes, ...redirects]) {
    const { status, html } = await render(handler, base + route);
    if (status !== 200) throw new Error(`Failed to render ${route}: HTTP ${status}`);
    if (!/<title>[^<]+<\/title>/.test(html)) throw new Error(`No <title> rendered for ${route}`);
    writeFile(outputFile(route), html);
  }

  // 6. Branded 404 page (GitHub Pages serves 404.html for unknown paths)
  const notFound = await render(handler, base + NOT_FOUND_PROBE);
  if (notFound.status !== 404) {
    throw new Error(`Expected 404 for ${NOT_FOUND_PROBE}, got HTTP ${notFound.status}`);
  }
  // The root route's default <title> is rendered for unknown paths; give 404.html its own.
  const notFoundHtml = notFound.html.replace(
    /<title>[^<]*<\/title>/,
    `<title>Page not found | ${siteName}</title><meta name="robots" content="noindex"/>`,
  );
  writeFile(path.join(OUT_DIR, "404.html"), notFoundHtml);

  // 7. Sitemap + robots
  writeFile(path.join(OUT_DIR, "sitemap.xml"), sitemapXml(siteUrl, routes));
  writeFile(
    path.join(OUT_DIR, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
  );

  // 8. Verify output
  const missing = [...routes, ...redirects].filter((r) => !fs.existsSync(outputFile(r)));
  if (missing.length) throw new Error(`Missing exported pages: ${missing.join(", ")}`);
  const missingImages = missingSrcsetFiles();
  if (missingImages.length) {
    throw new Error(
      `Missing responsive image files (add an 800px-wide copy, see CONTENT-GUIDE.md): ${missingImages.join(", ")}`,
    );
  }

  log(
    `done — ${routes.length} pages + 404.html, sitemap.xml, robots.txt in`,
    path.relative(ROOT, OUT_DIR),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
