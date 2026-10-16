# Updating the site's content

All content lives in typed data files under `src/data/`. Pages are generated from them, and the
static export picks up new services and case studies automatically.

| What                                         | Where                                       |
| -------------------------------------------- | ------------------------------------------- |
| Name, email, links, availability, site URL   | `src/data/site.ts`                          |
| Headline numbers (130+, 25+, 10+)            | `headlineClaims` in `src/data/site.ts`      |
| Services and their detail pages              | `src/data/services.ts`                      |
| Case studies                                 | `src/data/caseStudies.ts`                   |
| Process steps, principles, tools, experience | `src/data/misc.ts`                          |
| Portrait and logo                            | `src/assets/portrait/`, `src/assets/brand/` |

## Claims and numbers

- `headlineClaims` entries are hidden unless `verified: true`. Only flip one on when you can back it
  up if a client asks.
- Case-study `metrics` are hidden unless `verified: true`. Use `highlights` for descriptive facts
  about the system (e.g. "3-stage reminders") and `metrics` for outcomes (e.g. "40% fewer no-shows").
- The homepage credibility strip is otherwise derived from the data itself (years since 2020, number
  of case studies, countries of projects marked `status: "client"`).

## Case studies

- `status`: set to `"client"`, `"internal"` or `"concept"` only when you know it. Leave it out and no
  badge is shown.
- `role`: one sentence on what you did ("Sole engineer — architecture, build and handover"). Shown as
  a "My role" section when present.
- `featured: true` puts a project on the homepage and first in the list (keep it to about six).
- `services`: which service pages the project appears on.

### Adding real screenshots

1. Put images in `public/case-media/<slug>/` (WebP, about 1600px wide, no personal data, no
   browser bookmarks bar).
2. For every image wider than 900px, also save an 800px-wide copy next to it named
   `<name>-800.webp` (e.g. `01.webp` → `01-800.webp`). Cards and galleries load this smaller copy;
   the export fails with a clear message if one is missing.
3. Reference them in the case study:

```ts
screenshots: [
  {
    src: "/case-media/<slug>/01.webp",
    alt: "What the screenshot shows",
    width: 1600,
    height: 900,
    caption: "Optional caption",
  },
],
```

The first screenshot is also used as that page's social-share image. Never use placeholder or stock
images here — when a project has no screenshots, the page simply shows its workflow diagram.

### Adding a walkthrough video

```ts
video: { kind: "embed", src: "https://www.youtube-nocookie.com/embed/<id>", title: "Walkthrough" },
// or a file in public/case-media/<slug>/
video: { kind: "file", src: "/case-media/<slug>/demo.mp4", title: "Walkthrough", poster: "/case-media/<slug>/01.webp" },
```

## Links

- Fiverr: set `site.fiverr` to your seller-profile URL to show it in the footer and contact page.
- Calendly, LinkedIn and WhatsApp links are in `site.ts`.
