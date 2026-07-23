import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, ".output", "github");
const SRC_DIR = path.join(ROOT, ".output", "public");
const SSR_HANDLER = path.join(ROOT, ".output", "server", "index.mjs");

function log(...args) {
  console.log("[export-static]", ...args);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function rmrf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function readSlugs() {
  const file = path.join(ROOT, "src", "data", "caseStudies.ts");
  const text = fs.readFileSync(file, "utf-8");
  const matches = [...text.matchAll(/slug:\s*"([^"]+)"/g)];
  return matches.map((m) => m[1]);
}

function copyDir(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function renderRoute(handler, route, url) {
  const request = new Request(url);
  const response = await handler.fetch(request, {}, { waitUntil: (p) => p });
  const html = await response.text();
  if (!response.ok) {
    throw new Error(`Failed to render ${route}: ${response.status} ${response.statusText}`);
  }
  return html;
}

function writeHtml(dir, route, html) {
  const filePath = route === "/"
    ? path.join(dir, "index.html")
    : path.join(dir, route, "index.html");
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, html, "utf-8");
  log("wrote", filePath.replace(ROOT + path.sep, ""));
}

async function main() {
  log("starting static export for GitHub Pages");

  // 1. Production build
  log("running production build...");
execSync("npm run build", { cwd: ROOT, stdio: "inherit" });

  // 2. Import SSR handler
  log("importing SSR handler from", SSR_HANDLER.replace(ROOT + path.sep, ""));
  const { default: handler } = await import("file://" + SSR_HANDLER);

  // 3. Collect routes
  const slugs = readSlugs();
  const routes = ["/", ...slugs.map((s) => `/case/${s}`)];
  log("rendering", routes.length, "routes");

  // 4. Clean output
  rmrf(OUT_DIR);
  ensureDir(OUT_DIR);

  // 5. Copy client assets
  copyDir(SRC_DIR, OUT_DIR);

  // 6. Render every route to HTML
  const baseUrl = "http://localhost:8080";
  for (const route of routes) {
    const html = await renderRoute(handler, route, baseUrl + route);
    writeHtml(OUT_DIR, route, html);
  }

  // 7. SPA fallback for unknown routes (GitHub Pages 404 trick)
  const indexHtml = fs.readFileSync(path.join(OUT_DIR, "index.html"), "utf-8");
  fs.writeFileSync(path.join(OUT_DIR, "404.html"), indexHtml, "utf-8");
  log("wrote 404.html (SPA fallback)");

  log("done — output ready at", OUT_DIR.replace(ROOT + path.sep, ""));
  log("deploy this folder to GitHub Pages");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
