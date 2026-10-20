// Builds the site's project data and images from the tool-wise folders in src/assets/Portfolio.
//
//   npm run projects:sync            (incremental: unchanged images are skipped)
//   npm run projects:sync -- --force (re-encode every image)
//
// Projects are found per tool folder, in this order (mixed folders work too):
//   1. every subfolder is one project;
//   2. loose files: a description file plus the images that share its name ("Dental.md",
//      "Dental 1.png", "Dental-2.png") are one project;
//   3. other loose images that differ only by a trailing number ("sms campaign 1", "sms campaign 2")
//      are one project; every other loose image is its own project. Different projects are never
//      merged; names that only look related are listed in the report so they can be renamed.
// For each project:
//   • images → responsive WebP in public/projects/<slug>/ (480 / 960 / 1600 px wide, never
//     upscaled; originals are not modified). The cover is `cover.*` if present, otherwise the
//     first image alphabetically.
//   • the description document (.docx, .md, .txt or .json) → overview, sections, tools and
//     result, keeping the original wording (only obvious typos are fixed).
// Output: src/data/projects.generated.ts (summaries, small) and src/data/project-details/*.json
// (full text + gallery, loaded per page). Settings and overrides: scripts/projects.config.json.
// Projects without a folder: scripts/projects.manual.json. A report is printed at the end.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";
import { readDocxParagraphs } from "./lib/docx.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src", "assets", "Portfolio");
const OUT_IMG = path.join(ROOT, "public", "projects");
const OUT_DETAILS = path.join(ROOT, "src", "data", "project-details");
const OUT_INDEX = path.join(ROOT, "src", "data", "projects.generated.ts");
const FORCE = process.argv.includes("--force");
const WIDTHS = [480, 960, 1600];

const CONFIG_FILE = path.join(ROOT, "scripts", "projects.config.json");
const config = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
const CONFIG_TIME = fs.statSync(CONFIG_FILE).mtimeMs;
const manual = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts", "projects.manual.json"), "utf8"),
);
const { tools } = await import(pathToFileURL(path.join(ROOT, "src", "data", "tools.ts")).href);

const IMG = /\.(png|jpe?g|webp|avif|gif)$/i;
const DOC = /\.(docx|md|txt|json)$/i;
const norm = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();

// ---------- text helpers ----------
const TYPOS = [
  [/\bGenration\b/g, "Generation"],
  [/\bCompaign\b/g, "Campaign"],
  [/\bResturant\b/g, "Restaurant"],
  [/\bSaloon\b/g, "Salon"],
  [/\bRealestate\b/g, "Real Estate"],
  [/\bE Commerce\b/g, "E-Commerce"],
  [/\bFollow Up\b/g, "Follow-Up"],
];
const ACRONYMS = {
  pos: "POS",
  ai: "AI",
  crm: "CRM",
  seo: "SEO",
  ghl: "GHL",
  zatca: "ZATCA",
  ruda: "RUDA",
  sla: "SLA",
  sms: "SMS",
  uk: "UK",
};
const SMALL = new Set([
  "and",
  "or",
  "of",
  "to",
  "with",
  "for",
  "from",
  "the",
  "a",
  "an",
  "in",
  "on",
  "by",
]);

function fixTypos(s) {
  return TYPOS.reduce((t, [re, to]) => t.replace(re, to), s);
}
function prettifyFolder(name) {
  let s = name.replace(/[_-]+/g, " ");
  // Split joined words only in one-word names ("BeautySaloon"), never brand names in titles.
  if (!/\s/.test(s.trim())) s = s.replace(/([a-z])([A-Z])/g, "$1 $2");
  s = s.replace(/\(\s*/g, "(").replace(/\s*\)/g, ")").replace(/\s+/g, " ").trim();
  s = fixTypos(s).replace(/\bfollow ?up\b/gi, "Follow-Up");
  return s
    .split(" ")
    .map((w, i) => {
      const bare = w.replace(/[^\w.]/g, "").toLowerCase();
      if (bare === "n8n") return w.replace(/n8n/i, "n8n");
      if (/^\W*[A-Z0-9]{2,}s?\W*$/.test(w)) return w; // already an acronym (ZATCA, POs)
      if (ACRONYMS[bare]) return w.replace(new RegExp(bare, "i"), ACRONYMS[bare]);
      if (i > 0 && SMALL.has(w.toLowerCase())) return w.toLowerCase();
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}
const slugify = (s) =>
  s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
const naturalSort = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

function applyReplace(text, replace) {
  let t = text;
  for (const [from, to] of Object.entries(replace)) t = t.split(from).join(to);
  return t;
}

// ---------- description parsing ----------
const SECTION = {
  overview: /^(project )?(overview|description|summary|about)/i,
  tools: /^(technology|technologies|tools|tech stack|tools used|stack)/i,
  result: /^(result|results|outcome|outcomes|key objective|impact)/i,
};

/** Paragraph-level model → { title, tags, overview, sections, tools, result }. */
function structure(paragraphs) {
  const doc = { title: "", tags: [], overview: [], sections: [], tools: [], result: [] };
  let current = null;
  const push = (block) => {
    if (!current) {
      current = { heading: "", blocks: [] };
      doc.sections.push(current);
    }
    const last = current.blocks.at(-1);
    if (block.list && last?.list) last.list.push(...block.list);
    else current.blocks.push(block);
  };
  for (const [i, p] of paragraphs.entries()) {
    const isTitle = /^(Heading1|Title)$/i.test(p.style) || (i === 0 && !doc.title);
    if (isTitle && !doc.title) {
      doc.title = p.text;
      continue;
    }
    if (!doc.sections.length && !current && p.text.includes(" | ")) {
      doc.tags = p.text
        .split("|")
        .map((t) => t.trim())
        .filter(Boolean);
      continue;
    }
    if (
      /^Heading[2-6]$/i.test(p.style) ||
      (p.bold && p.text.length < 70 && !p.text.includes(" | "))
    ) {
      current = { heading: p.text, blocks: [] };
      doc.sections.push(current);
      continue;
    }
    if (p.text.includes("•")) {
      const [intro, ...items] = p.text.split("•").map((t) => t.trim());
      if (intro) push({ p: intro });
      push({ list: items.filter(Boolean) });
    } else if (p.list) push({ list: [p.text] });
    else push({ p: p.text });
  }
  // Pull overview / tools / result out of the generic sections.
  const rest = [];
  for (const s of doc.sections) {
    const text = s.blocks.flatMap((b) => ("p" in b ? [b.p] : b.list));
    if (SECTION.overview.test(s.heading)) doc.overview.push(...text);
    else if (SECTION.tools.test(s.heading)) doc.tools.push(...text);
    else if (SECTION.result.test(s.heading)) doc.result.push(...text);
    else if (s.heading || s.blocks.length) rest.push(s);
  }
  // A subtitle line before the first section (e.g. a business name) is not a section.
  doc.sections = rest.filter((s) => s.heading);
  if (!doc.overview.length) {
    const intro = rest.find((s) => !s.heading);
    if (intro) doc.overview.push(...intro.blocks.flatMap((b) => ("p" in b ? [b.p] : [])));
  }
  return doc;
}

function readDescription(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".docx") return structure(readDocxParagraphs(file));
  if (ext === ".json") {
    const j = JSON.parse(fs.readFileSync(file, "utf8"));
    return {
      title: j.title ?? "",
      tags: j.tags ?? [],
      overview: [].concat(j.overview ?? []),
      sections: j.sections ?? [],
      tools: j.tools ?? j.toolsUsed ?? [],
      result: [].concat(j.result ?? []),
      order: j.order,
      featured: j.featured,
    };
  }
  // .md / .txt: "#" headings, "-", "*" or "•" bullets, blank-line paragraphs.
  const paras = [];
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t) continue;
    const h = /^#{1,6}\s+(.*)$/.exec(t);
    if (h)
      paras.push({
        text: h[1],
        style: t.startsWith("# ") ? "Heading1" : "Heading2",
        list: false,
        bold: true,
      });
    else if (/^[-*•]\s+/.test(t))
      paras.push({ text: t.replace(/^[-*•]\s+/, ""), style: "", list: true, bold: false });
    else paras.push({ text: t, style: "", list: false, bold: false });
  }
  return structure(paras);
}

function cleanText(doc, replace) {
  // Also restores the space lost between sentences in some documents ("GoHighLevel.The").
  const f = (s) =>
    applyReplace(
      fixTypos(
        s
          .replace(/\s+/g, " ")
          .replace(/([a-z])\.([A-Z][a-z])/g, "$1. $2")
          .trim(),
      ),
      replace,
    );
  return {
    ...doc,
    title: f(doc.title),
    tags: doc.tags.map(f),
    overview: doc.overview.map(f),
    tools: doc.tools.map(f),
    result: doc.result.map(f),
    sections: doc.sections.map((s) => ({
      heading: f(s.heading),
      blocks: s.blocks.map((b) => ("p" in b ? { p: f(b.p) } : { list: b.list.map(f) })),
    })),
  };
}

// ---------- tools ----------
const TOOL_ALIASES = {
  "make.com": "make",
  ghl: "gohighlevel",
  "go high level": "gohighlevel",
  chatgpt: "openai",
  "openai / dall·e": "openai",
  "google gemini": "gemini",
  apollo: "apollo",
  zoho: "zoho",
  "asp.net": "aspnetcore",
  "asp.net mvc": "aspnetcore",
  "asp.net core": "aspnetcore",
  ".net": "aspnetcore",
  "c#": "csharp",
  "sql server": "sqlserver",
  monday: "monday",
  "google sheet": "googlesheets",
  sheets: "googlesheets",
};
const toolIndex = new Map();
for (const t of tools) {
  toolIndex.set(norm(t.name), t.id);
  toolIndex.set(t.id, t.id);
}
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Word-boundary patterns for loose matches ("Gmail API" → Gmail). "Make" only as "Make.com".
const toolPatterns = tools
  .filter((t) => t.id !== "make")
  .map((t) => [t.id, new RegExp(`(^|[^a-z0-9])${escapeRe(norm(t.name))}([^a-z0-9]|$)`)]);
const PRIMARY_TOOL = { n8n: "n8n", make: "make", zapier: "zapier", ghl: "gohighlevel" };

function matchTools(names, primary) {
  const ids = primary && PRIMARY_TOOL[primary] ? [PRIMARY_TOOL[primary]] : [];
  for (const raw of names) {
    for (const part of raw.split(/\s*\/\s*|\s*,\s*|\s*\|\s*/)) {
      const key = norm(part.replace(/\(.*?\)/g, ""));
      let id = toolIndex.get(key) ?? toolIndex.get(TOOL_ALIASES[key] ?? "") ?? TOOL_ALIASES[key];
      if (!id) id = toolPatterns.find(([, re]) => re.test(key))?.[0];
      if (!id && /(^|\s)make\.com(\s|$)/.test(key)) id = "make";
      if (!id && /^(asp\.net|\.net)/.test(key)) id = "aspnetcore";
      if (id && tools.some((t) => t.id === id) && !ids.includes(id)) ids.push(id);
    }
  }
  return ids;
}
const splitTools = (list) =>
  list
    .flatMap((t) => t.split(/\s*\|\s*/))
    .map((t) => t.trim())
    .filter(Boolean);

// ---------- services ----------
function defaultServices(tool, text) {
  const s = new Set();
  if (tool === "n8n" || tool === "make" || tool === "zapier") s.add("workflow-automation");
  if (tool === "ghl") s.add("gohighlevel-automation");
  if (tool === "voice") s.add("voice-ai");
  if (tool === "custom") s.add("custom-software");
  const t = text.toLowerCase();
  if (/gohighlevel/.test(t)) s.add("gohighlevel-automation");
  if (/apollo|lead generation|outreach|prospect/.test(t)) s.add("lead-generation");
  if (/blog|seo|social media|content|youtube|reel/.test(t)) s.add("ai-content-automation");
  if (/chatbot|whatsapp assistant|chat assistant/.test(t)) s.add("ai-chatbots");
  return [...s];
}

// ---------- images ----------
async function processImages(slug, files, title, crop = {}) {
  const dir = path.join(OUT_IMG, slug);
  fs.mkdirSync(dir, { recursive: true });
  const keep = new Set();
  const images = [];
  const cropTop = crop.top ?? 0;
  const cropBottom = crop.bottom ?? 0;
  for (const [i, file] of files.entries()) {
    const n = String(i + 1).padStart(2, "0");
    const meta = await sharp(file).metadata();
    const srcW = meta.width ?? 1600;
    // Crops (e.g. a browser bookmarks bar or taskbar) are in source pixels.
    const srcH = (meta.height ?? 900) - cropTop - cropBottom;
    const pipeline = () => {
      const s = sharp(file).rotate();
      return cropTop || cropBottom
        ? s.extract({ left: 0, top: cropTop, width: srcW, height: srcH })
        : s;
    };
    let widths = WIDTHS.filter((w) => w <= srcW);
    if (srcW < WIDTHS.at(-1) && !widths.includes(srcW)) widths.push(srcW);
    if (!widths.length) widths = [srcW];
    widths = [...new Set(widths)].sort((a, b) => a - b);
    const srcTime = fs.statSync(file).mtimeMs;
    for (const w of widths) {
      const out = path.join(dir, `${n}-${w}.webp`);
      keep.add(path.basename(out));
      if (
        !FORCE &&
        fs.existsSync(out) &&
        fs.statSync(out).mtimeMs >= Math.max(srcTime, CONFIG_TIME)
      )
        continue;
      await pipeline()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 80, effort: 5 })
        .toFile(out);
    }
    const maxW = widths.at(-1);
    const mid = widths.find((w) => w >= 960) ?? maxW;
    const label = prettifyFolder(path.basename(file, path.extname(file)))
      .replace(/\b(M|Img|Image|Screenshot|Copy)\b/gi, "")
      .replace(/\b\d{4}[- ]\d{2}[- ]\d{2}.*$/, "")
      .replace(/\s+/g, " ")
      .trim();
    images.push({
      src: `/projects/${slug}/${n}-${mid}.webp`,
      srcSet: widths.map((w) => `/projects/${slug}/${n}-${w}.webp ${w}w`).join(", "),
      full: `/projects/${slug}/${n}-${maxW}.webp`,
      width: maxW,
      height: Math.round((srcH * maxW) / srcW),
      alt: label && !/^\d+$/.test(label) ? `${title}: ${label}` : `${title}, screenshot ${i + 1}`,
    });
  }
  // Remove outputs for images that no longer exist.
  for (const f of fs.readdirSync(dir)) if (!keep.has(f)) fs.rmSync(path.join(dir, f));
  if (!images.length) fs.rmSync(dir, { recursive: true, force: true });
  return images;
}

// ---------- loose files directly in a tool folder ----------
// A trailing number after a separator: "sms campaign 1", "dental-2", "shot (3)". Never the
// digits of a name itself ("GarageFlow 360").
const INDEX = /(?:[\s_-]+\(?\d{1,2}\)?|\(\d{1,2}\))$/;
const baseName = (f) => path.basename(f, path.extname(f)).trim();
const fullKey = (f) => norm(baseName(f).replace(/[_-]+/g, " "));
const stemKey = (f) => norm(baseName(f).replace(INDEX, "").replace(/[_-]+/g, " ")) || fullKey(f);
const VIDEO = /\.(mp4|mov|webm)$/i;

/** Splits the loose files of a tool folder into projects (rules 2 and 3 above). */
function groupLoose(toolName, files) {
  const docs = files.filter((f) => DOC.test(f)).sort(naturalSort);
  const media = files.filter((f) => IMG.test(f) || VIDEO.test(f)).sort(naturalSort);
  const notes = [];
  const units = docs.map((doc) => ({
    name: baseName(doc),
    files: [doc],
    grouping: "description file",
  }));
  const taken = new Set();
  for (const f of media) {
    const d = (u) => stemKey(u.files[0]);
    const hits = units
      .filter(
        (u) => stemKey(f) === d(u) || fullKey(f) === d(u) || fullKey(f).startsWith(`${d(u)} `),
      )
      .sort((a, b) => d(b).length - d(a).length);
    if (!hits.length) continue;
    if (hits[1] && d(hits[1]).length === d(hits[0]).length)
      notes.push(
        `"${path.basename(f)}" matches ${hits.map((h) => `"${path.basename(h.files[0])}"`).join(" and ")}; attached to the first`,
      );
    hits[0].files.push(f);
    hits[0].grouping = "description file + images with its name";
    taken.add(f);
  }
  const groups = new Map();
  for (const f of media.filter((m) => !taken.has(m))) {
    if (VIDEO.test(f)) {
      notes.push(`"${path.basename(f)}" has no matching description or image; not used`);
      continue;
    }
    const k = stemKey(f);
    groups.set(k, [...(groups.get(k) ?? []), f]);
  }
  for (const group of groups.values())
    units.push({
      name: baseName(group[0]).replace(INDEX, "").trim(),
      files: group,
      grouping: group.length > 1 ? "same name, numbered" : "single image",
    });
  // Names that share a first word but differ are kept apart; list them in case they belong
  // together (rename them "<name> 1", "<name> 2" to merge).
  const byWord = new Map();
  for (const u of units) {
    const w = norm(u.name).split(" ")[0];
    byWord.set(w, [...(byWord.get(w) ?? []), u.name]);
  }
  for (const [w, names] of byWord)
    if (names.length > 1)
      notes.push(`"${w}…": ${names.map((n) => `"${n}"`).join(", ")} kept as separate projects`);
  return {
    units: units.map((u) => ({
      key: `${toolName}/${u.name}`,
      folder: u.name,
      // A trailing single capital ("Facebook M") is a filing marker, not part of the title.
      title: u.name.replace(/\s+[A-Z]$/, ""),
      files: u.files,
      grouping: u.grouping,
    })),
    notes,
  };
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

const excerptOf = (overview) => {
  const text = overview.join(" ");
  if (text.length <= 170) return text;
  const cut = text.slice(0, 170);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "));
  return end > 80 ? cut.slice(0, end + 1) : cut.slice(0, cut.lastIndexOf(" ")) + "…";
};

// ---------- main ----------
const report = [];
const groupingNotes = [];
const summaries = [];
const details = [];
const usedSlugs = new Set();

const toolDirs = fs.readdirSync(SRC, { withFileTypes: true }).filter((d) => d.isDirectory());
for (const toolDir of toolDirs) {
  const key = norm(toolDir.name);
  if (config.skipFolders.includes(key)) continue;
  const tool = config.toolFolders[key];
  if (!tool) {
    report.push({
      tool: toolDir.name,
      project: "—",
      images: 0,
      description: "—",
      issues: "unknown tool folder (add it to toolFolders)",
    });
    continue;
  }
  const tdir = path.join(SRC, toolDir.name);
  const entries = fs.readdirSync(tdir, { withFileTypes: true });
  const subdirs = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort(naturalSort);
  const flatFiles = entries.filter((e) => e.isFile()).map((e) => path.join(tdir, e.name));
  const units = subdirs.map((name) => ({
    key: `${toolDir.name}/${name}`,
    folder: name,
    title: name,
    files: walk(path.join(tdir, name)),
    grouping: "subfolder",
  }));
  // Files directly in the tool folder: split into separate projects, never one showcase.
  const loose = groupLoose(toolDir.name, flatFiles);
  units.push(...loose.units);
  groupingNotes.push(...loose.notes.map((n) => `${toolDir.name}: ${n}`));

  for (const unit of units) {
    const cfg = config.projects[unit.key] ?? {};
    const issues = [];
    const replace = { ...config.replace, ...(cfg.replace ?? {}) };
    const docFile = unit.files.filter((f) => DOC.test(f)).sort(naturalSort)[0];
    let doc = { title: "", tags: [], overview: [], sections: [], tools: [], result: [] };
    if (docFile && cfg.description !== "ignore") doc = cleanText(readDescription(docFile), replace);
    if (!docFile)
      issues.push(cfg.overview ? "no description (overview from config)" : "no description");
    if (!doc.overview.length && cfg.overview) doc.overview = cfg.overview;
    if (docFile && cfg.description === "ignore")
      issues.push("description ignored (belongs to another project)");

    const title = cfg.title ?? prettifyFolder(unit.title);
    const slug = cfg.slug ?? slugify(title);
    if (usedSlugs.has(slug))
      throw new Error(`duplicate slug ${slug} (${unit.key}) — set "slug" in projects.config.json`);
    usedSlugs.add(slug);

    const exclude = new Set((cfg.excludeImages ?? []).map(norm));
    const imgFiles = unit.files
      .filter((f) => IMG.test(f) && !exclude.has(norm(path.basename(f))))
      .sort((a, b) => {
        const ca = /^cover\./i.test(path.basename(a));
        const cb = /^cover\./i.test(path.basename(b));
        return ca === cb ? naturalSort(path.basename(a), path.basename(b)) : ca ? -1 : 1;
      });
    if (!imgFiles.length) issues.push("no images");
    if (!unit.files.some((f) => /^cover\./i.test(path.basename(f))) && imgFiles.length)
      issues.push("no cover.* (first image used)");
    const videos = unit.files.filter((f) => /\.(mp4|mov|webm)$/i.test(f));
    if (videos.length) issues.push(`${videos.length} video(s) not used`);
    if (exclude.size) issues.push(`${exclude.size} image(s) excluded (personal data)`);
    const images = await processImages(slug, imgFiles, title, cfg.crop);

    const toolsUsed = splitTools(cfg.toolsUsed ?? (doc.tools.length ? doc.tools : doc.tags));
    const allText = [title, doc.title, ...doc.tags, ...doc.overview].join(" ");
    const docTitle = doc.title && norm(doc.title) !== norm(title) ? doc.title : undefined;
    summaries.push({
      slug,
      title,
      ...(docTitle ? { subtitle: docTitle } : {}),
      tool,
      excerpt: excerptOf(doc.overview),
      ...(images[0] ? { cover: images[0] } : {}),
      imageCount: images.length,
      toolsUsed,
      toolIds: matchTools(toolsUsed, tool),
      services: cfg.services ?? defaultServices(tool, allText),
      featured: cfg.featured ?? doc.featured ?? false,
      order: cfg.order ?? doc.order ?? 100,
      legacySlugs: cfg.legacySlugs ?? [],
      source: "folder",
    });
    details.push({
      slug,
      tags: doc.tags,
      overview: doc.overview,
      sections: doc.sections,
      result: doc.result,
      images,
    });
    report.push({
      tool: toolDir.name,
      project: unit.folder,
      slug,
      images: images.length,
      description: docFile ? path.relative(path.join(SRC, toolDir.name), docFile) : "—",
      grouping: unit.grouping,
      issues: issues.join("; "),
    });
  }
}

// Projects without a folder (kept from the earlier site; images already in public/case-media).
for (const m of manual) {
  if (usedSlugs.has(m.slug))
    throw new Error(`manual project ${m.slug} clashes with a folder project`);
  usedSlugs.add(m.slug);
  const images = m.images.map((img) => {
    const small = img.file.replace(/\.webp$/, "-800.webp");
    const hasSmall = img.width > 900 && fs.existsSync(path.join(ROOT, "public", small));
    return {
      src: hasSmall ? small : img.file,
      srcSet: hasSmall ? `${small} 800w, ${img.file} ${img.width}w` : `${img.file} ${img.width}w`,
      full: img.file,
      width: img.width,
      height: img.height,
      alt: img.alt,
    };
  });
  summaries.push({
    slug: m.slug,
    title: m.title,
    tool: m.tool,
    excerpt: excerptOf(m.overview),
    ...(images[0] ? { cover: images[0] } : {}),
    imageCount: images.length,
    toolsUsed: m.toolsUsed,
    toolIds: matchTools(m.toolsUsed, m.tool),
    services: m.services,
    featured: !!m.featured,
    order: m.order ?? 100,
    legacySlugs: [],
    source: "manual",
    ...(m.flow ? { flow: m.flow } : {}),
  });
  details.push({
    slug: m.slug,
    tags: m.tags ?? [],
    overview: m.overview,
    sections: m.sections,
    result: m.result ?? [],
    images,
  });
}

// ---------- write ----------
// Project URLs that no longer exist must keep working: each needs a target in config.retired.
const retired = config.retired ?? {};
const previousSlugs = fs.existsSync(OUT_INDEX)
  ? [...fs.readFileSync(OUT_INDEX, "utf8").matchAll(/"?slug"?:\s*"([^"]+)"/g)].map((m) => m[1])
  : [];
const vanished = previousSlugs.filter((s) => !usedSlugs.has(s) && !retired[`/projects/${s}`]);
for (const [from, to] of Object.entries(retired)) {
  const slug = /^\/projects\/([^/?#]+)/.exec(to)?.[1];
  if (slug && !usedSlugs.has(slug)) throw new Error(`retired ${from} points to missing ${to}`);
}

// House style: no em dashes (or spaced en dashes) in site copy. Titles and headings get a colon,
// running text a comma. The source documents are not changed.
const undash = (s, heading) => s.replace(/\s*—\s*|\s+–\s+/g, heading ? ": " : ", ");
for (const p of summaries) {
  p.title = undash(p.title, true);
  if (p.subtitle) p.subtitle = undash(p.subtitle, true);
  p.excerpt = undash(p.excerpt);
  if (p.cover) p.cover.alt = undash(p.cover.alt, true);
}
for (const d of details) {
  d.tags = d.tags.map((t) => undash(t, true));
  d.overview = d.overview.map((t) => undash(t));
  d.result = d.result.map((t) => undash(t));
  d.sections = d.sections.map((s) => ({
    heading: undash(s.heading, true),
    blocks: s.blocks.map((b) =>
      "p" in b ? { p: undash(b.p) } : { list: b.list.map((t) => undash(t)) },
    ),
  }));
  d.images = d.images.map((img) => ({ ...img, alt: undash(img.alt, true) }));
}

fs.rmSync(OUT_DETAILS, { recursive: true, force: true });
fs.mkdirSync(OUT_DETAILS, { recursive: true });
for (const d of details)
  fs.writeFileSync(path.join(OUT_DETAILS, `${d.slug}.json`), JSON.stringify(d, null, 1) + "\n");
// Drop image folders of projects that no longer exist.
for (const d of fs.existsSync(OUT_IMG) ? fs.readdirSync(OUT_IMG) : [])
  if (!usedSlugs.has(d)) fs.rmSync(path.join(OUT_IMG, d), { recursive: true, force: true });

fs.writeFileSync(
  OUT_INDEX,
  `// AUTO-GENERATED by scripts/sync-projects.mjs from src/assets/Portfolio — do not edit by hand.
// Change the folders (or scripts/projects.config.json) and run \`npm run projects:sync\`.
import type { ProjectSummary } from "./projects";

export const generatedProjects: ProjectSummary[] = ${JSON.stringify(summaries, null, 1)};

/** Old project URLs and where they now forward (scripts/projects.config.json → "retired"). */
export const retiredUrls: Record<string, string> = ${JSON.stringify(retired, null, 1)};
`,
);

const pad = (s, n) => String(s).padEnd(n).slice(0, n);
console.log(
  `\n${pad("Tool folder", 12)} | ${pad("Project", 44)} | Img | ${pad("Description", 40)} | ${pad("Grouped by", 26)} | Issues`,
);
for (const r of report)
  console.log(
    `${pad(r.tool, 12)} | ${pad(r.project, 44)} | ${String(r.images).padStart(3)} | ${pad(r.description, 40)} | ${pad(r.grouping ?? "", 26)} | ${r.issues}`,
  );
console.log(
  `\n${summaries.filter((s) => s.source === "folder").length} folder projects, ${manual.length} manual projects, ${details.reduce((a, d) => a + d.images.length, 0)} images.`,
);
if (groupingNotes.length) console.log(`\nCheck these names:\n- ${groupingNotes.join("\n- ")}`);
if (vanished.length)
  console.warn(
    `\nWARNING: these project URLs no longer exist. Add each to "retired" in scripts/projects.config.json with the page it should forward to:\n- /projects/${vanished.join("\n- /projects/")}`,
  );
