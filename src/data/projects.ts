// Keep value imports limited to sibling data files with explicit .ts extensions:
// scripts/export-static.mjs loads this file with Node's TypeScript type-stripping.
//
// Every project on the site comes from here. Folder projects are generated from
// src/assets/Portfolio by scripts/sync-projects.mjs (run `npm run projects:sync`); a few older
// projects without a folder live in scripts/projects.manual.json and are merged in by the same
// script. Long text (overview, sections, gallery) is split into one JSON file per project in
// src/data/project-details/, loaded only on that project's page.
import type { ServiceSlug } from "./services";
import { generatedProjects, retiredUrls } from "./projects.generated.ts";

/** Old project URLs (e.g. a showcase later split into separate projects) → where they forward. */
export { retiredUrls };

export type ProjectTool = "n8n" | "make" | "zapier" | "ghl" | "voice" | "custom";

export type ProjectImage = {
  /** Default (mid-size) URL, used as `src`. */
  src: string;
  srcSet: string;
  /** Largest version, for the lightbox. */
  full: string;
  width: number;
  height: number;
  alt: string;
};

export type ProjectSummary = {
  slug: string;
  title: string;
  /** The project document's own title, when it differs from the folder name. */
  subtitle?: string;
  tool: ProjectTool;
  /** One or two lines for cards. */
  excerpt: string;
  cover?: ProjectImage;
  imageCount: number;
  /** Tool names as written in the project document. */
  toolsUsed: string[];
  /** The same tools, matched to src/data/tools.ts ids (for coloured logos). */
  toolIds: string[];
  services: ServiceSlug[];
  featured: boolean;
  order: number;
  /** Old /case/<slug> URLs that now redirect here. */
  legacySlugs: string[];
  source: "folder" | "manual";
  /** Simplified workflow steps (manual projects without screenshots show them as a diagram). */
  flow?: string[];
};

export type ProjectBlock = { p: string } | { list: string[] };

export type ProjectDetail = {
  slug: string;
  tags: string[];
  overview: string[];
  sections: { heading: string; blocks: ProjectBlock[] }[];
  result: string[];
  images: ProjectImage[];
};

export const toolLabels: Record<ProjectTool, string> = {
  n8n: "n8n",
  make: "Make",
  zapier: "Zapier",
  ghl: "GoHighLevel",
  voice: "Voice Agents",
  custom: "Custom Software",
};

/** Filter tab order on /projects. */
export const toolOrder: ProjectTool[] = ["n8n", "make", "zapier", "ghl", "voice", "custom"];

/** The tools.ts id used for each tab's logo. */
export const toolLogoIds: Partial<Record<ProjectTool, string>> = {
  n8n: "n8n",
  make: "make",
  zapier: "zapier",
  ghl: "gohighlevel",
};

/** All projects: featured first, then by tool order and each project's order. */
export const projects: ProjectSummary[] = [...generatedProjects].sort(
  (a, b) =>
    Number(b.featured) - Number(a.featured) ||
    toolOrder.indexOf(a.tool) - toolOrder.indexOf(b.tool) ||
    a.order - b.order ||
    a.title.localeCompare(b.title),
);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Finds the project an old /case/<slug> URL now lives at. */
export const projectForLegacySlug = (slug: string) =>
  projects.find((p) => p.legacySlugs.includes(slug)) ?? getProject(slug);

export const featuredProjects = projects.filter((p) => p.featured);

export const projectsByTool = (tool: ProjectTool) => projects.filter((p) => p.tool === tool);

/** The tab a tools.ts id belongs to, for "Used in N projects" links. */
export const toolTab: Record<string, ProjectTool> = {
  n8n: "n8n",
  make: "make",
  zapier: "zapier",
  gohighlevel: "ghl",
  vapi: "voice",
  elevenlabs: "voice",
  synthflow: "voice",
};

/** How many projects list a tool (tools.ts id), from the generated project data. */
export const projectCountForTool = (id: string) =>
  projects.filter((p) => p.toolIds.includes(id)).length;

/**
 * Up to `n` projects from different tools, for the closing call-to-action: the given ones
 * first (e.g. a service's own projects), then featured projects. Only projects with a cover
 * and a written description.
 */
export function projectsFromDifferentTools(
  preferred: ProjectSummary[] = [],
  n = 3,
  /** Slugs already shown on the page. */
  exclude: string[] = [],
) {
  const out: ProjectSummary[] = [];
  for (const p of [...preferred, ...featuredProjects, ...projects]) {
    if (out.length === n) break;
    if (exclude.includes(p.slug) || !p.cover || !p.excerpt) continue;
    if (!out.some((o) => o.tool === p.tool || o.slug === p.slug)) out.push(p);
  }
  return out;
}

/** The tool tab a service page links to for "all related projects". */
export const serviceTool: Record<ServiceSlug, ProjectTool | undefined> = {
  "workflow-automation": undefined,
  "gohighlevel-automation": "ghl",
  "lead-generation": undefined,
  "ai-content-automation": undefined,
  "voice-ai": "voice",
  "ai-chatbots": undefined,
  "custom-software": "custom",
};

/** Projects for a service page: projects tagged with the service, those with images first. */
export const projectsForService = (service: ServiceSlug) =>
  projects
    .filter((p) => p.services.includes(service))
    .sort((a, b) => Number(!!b.cover) - Number(!!a.cover));
