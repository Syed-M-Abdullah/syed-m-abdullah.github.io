# Deploying to GitHub Pages

The site is a static export of the TanStack Start app, published to:

**https://syed-m-abdullah.github.io**

This repository _is_ the Pages repository (`Syed-M-Abdullah/syed-m-abdullah.github.io`), so the
site is served from the domain root and no base path is needed.

## How it works

Every push to `main` runs `.github/workflows/deploy.yml`:

1. Checks out the repo and sets up Node 22.
2. `npm install`
3. `npm run export:github` — builds the app and pre-renders every page (see below) into
   `.output/github/`.
4. Uploads `.output/github/` as a Pages artifact and deploys it with `actions/deploy-pages`.

No personal access token or second repository is involved.

## One-time setup

In this repository on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

That's it — after that, every push to `main` deploys automatically. You can follow progress in the
**Actions** tab.

## What the export produces

`scripts/export-static.mjs`:

- reads the page list from `src/data/routes.ts` (static pages, every service page and every
  project — add a service or sync a project and it's exported automatically);
- renders small forwarding pages for the old `/case-studies` and `/case/<slug>` URLs (kept out of
  the sitemap);
- renders each route to `<route>/index.html`, failing the build if any page doesn't render;
- renders a branded `404.html` (GitHub Pages serves it for unknown URLs);
- writes `sitemap.xml` and `robots.txt` using `site.url` from `src/data/site.ts`.

The export uses Node's built-in TypeScript type-stripping to read `src/data/routes.ts`, so it needs
Node 22.6 or newer (the workflow uses Node 22).

## Run it locally

```bash
npm ci
npm run export:github
```

Then serve `.output/github/` with any static file server to check it. GitHub Pages redirects
`/about` to `/about/`, so internal links (the router uses `trailingSlash: "always"`), canonical
URLs and the sitemap all use the trailing-slash form. Every page is pre-rendered to its own
`index.html`, so direct links and refreshes work without a single-page-app 404 workaround.

## Contact form

The form posts to the contact API in [`server/`](./server/README.md) — Express + Nodemailer sending
through Gmail SMTP (smtp.gmail.com:465). It emails you a lead alert and the visitor a confirmation.
Only after the API confirms success does the visitor see "Thank you" for ~1.5 seconds and get
taken to the Calendly booking page (`site.calendly`); on any failure they see an error and stay.

GitHub Pages can't run Node, so the API is deployed separately (Vercel or Render — steps in
`server/README.md`). Then set `contactApi` in `src/data/site.ts` to its URL and push. Until that
URL is set, the live form shows an error with your email address.

SMTP credentials live only in the git-ignored `.env` (locally) and in the API host's environment
settings — never in this repository or the website code.

## Custom domain (optional)

If you later add a custom domain, add a `public/CNAME` file containing the domain, configure it under
**Settings → Pages**, and update `site.url` in `src/data/site.ts` so canonical URLs, Open Graph tags
and the sitemap point at the new domain.
