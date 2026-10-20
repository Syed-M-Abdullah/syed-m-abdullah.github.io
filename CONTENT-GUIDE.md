# Updating the site's content

All content lives in typed data files under `src/data/`. Pages are generated from them, and the
static export picks up new services and projects automatically.

| What                                         | Where                                             |
| -------------------------------------------- | ------------------------------------------------- |
| Name, email, links, availability, site URL   | `src/data/site.ts`                                |
| Headline numbers (130+, 25+, 10+)            | `headlineClaims` in `src/data/site.ts`            |
| Services and their detail pages              | `src/data/services.ts`                            |
| Projects (generated from your folders)       | `src/assets/Portfolio/` + `npm run projects:sync` |
| Projects without a folder                    | `scripts/projects.manual.json`                    |
| Process steps, principles, tools, experience | `src/data/misc.ts`                                |
| Portrait and logo                            | `src/assets/portrait/`, `src/assets/brand/`       |

## Claims and numbers

- `headlineClaims` entries are hidden unless `verified: true`. Only flip one on when you can back it
  up if a client asks.
- Project pages show only what your own documents say. Don't add results or metrics that aren't
  in them.

## Projects

The projects page, each `/projects/<slug>/` page, the service pages and the homepage's featured
work are all built from the tool-wise folders in `src/assets/Portfolio/`:

```
src/assets/Portfolio/
  n8n/<Project name>/        description (.docx, .md, .txt or .json) + screenshots
  Make.com/<Project name>/
  zapier/<Project name>/
  Voice Agent/<Project name>/
  Custom Code/<Project name>/
  GHL/<files>                loose files are split into separate projects (see below)
  AI Voices/                 skipped (the voice samples on the site use their own files)
```

### Loose files (no subfolder)

Files placed directly in a tool folder are split into projects, never merged into one:

1. a description file and the images that share its name are one project
   (`Dental.md` + `Dental 1.png` + `Dental-2.png`);
2. images whose names differ only by a trailing number are one project
   (`sms campaign 1.png`, `sms campaign 2.png`);
3. every other image is its own project.

Subfolders and loose files can be mixed in the same tool folder. The sync report lists names that
look related but were kept apart (for example "Lead Followup" and "Lead Nurturing"); rename them
`<name> 1`, `<name> 2` if they belong together. A trailing single capital letter in a file name
("Facebook M") is ignored in the title.

After adding or changing a folder, run:

```bash
npm run projects:sync
```

It prints a report (folder, tool, document found, images used/excluded) and writes:

- `public/projects/<slug>/` — responsive WebP copies of the images (480 / 960 / 1600 px wide).
  Your originals are never modified. The cover is a file named `cover.*` if present, otherwise the
  first image alphabetically.
- `src/data/projects.generated.ts` — the list (title, tool, excerpt, cover, featured, order…).
- `src/data/project-details/<slug>.json` — the full text and gallery, loaded per page.

The document's wording is kept as written (only obvious typos are fixed). Don't edit the generated
files by hand; change the folder or the settings and sync again.

### Settings and privacy: `scripts/projects.config.json`

Keys are `"<tool folder>/<project folder>"`, or `"<tool folder>/<file name>"` for a loose file (the
name without its extension and trailing number, as shown in the sync report). Every field is
optional:

- `title`, `slug`, `order`, `featured: true` (homepage, first in lists; keep it to about six),
  `services` (which service pages show it), `toolsUsed`;
- `legacySlugs`: old `/case/<slug>` URLs that should forward to this project;
- `excludeImages`: file names to leave out. **Use it for any screenshot that shows a client's name,
  email, phone number or other personal data**;
- `replace`: text replacements, e.g. `{ "for Jane Doe using": "for a client using" }`, to keep
  names private;
- `crop`: `{ "top": 140 }` trims pixels (e.g. a browser bar) off every image;
- `description: "ignore"` when the folder's document belongs to another project;
- `overview`: a description to use when the project has no document.

`retired` maps project URLs that no longer exist to where they should forward, e.g.
`"/projects/gohighlevel-automation-showcase": "/projects/?tool=ghl"`. The sync warns when a
project URL disappears without an entry here.

`toolFolders` maps folder names to tools, and `skipFolders` lists folders to ignore.

`src/assets/Portfolio/` holds your raw materials (some with private details), so keep it out of
git; only the processed images in `public/projects/` are published.

## Links

- Fiverr: set `site.fiverr` to your seller-profile URL to show it in the footer and contact page.
- Calendly, LinkedIn and WhatsApp links are in `site.ts`.
