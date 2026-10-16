import { useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  automationPlatformOf,
  automationPlatforms,
  categoryLabels,
  categoryOrder,
  sortedCaseStudies,
  type AutomationPlatform,
  type Category,
  type CaseStudy,
} from "@/data/caseStudies";
import { cn } from "@/lib/utils";
import { shotSrcSet } from "@/lib/images";
import { CategoryBadge, Chip, StatusBadge } from "./badges";

const categoryGlow: Record<Category, string> = {
  voice: "var(--blue)",
  automation: "var(--violet)",
  crm: "var(--lavender)",
  chatbots: "var(--cyan)",
  "erp-pos": "#10b981",
  web: "var(--blue-light)",
};

/**
 * Card header: a simplified rendering of the project's real workflow data. Clearly labelled
 * as a workflow illustration so it isn't mistaken for a product screenshot.
 */
function FlowPreview({ study }: { study: CaseStudy }) {
  const glow = categoryGlow[study.category];
  // Four steps fit; longer flows show three plus a "+N more" line.
  const shown = study.flow.length > 4 ? 3 : 4;
  return (
    <div
      className="relative isolate h-[212px] overflow-hidden border-b border-border px-5 pt-5 pb-6"
      style={{
        background: `radial-gradient(120% 90% at 0% 0%, color-mix(in oklab, ${glow} 22%, transparent), transparent 60%), radial-gradient(90% 80% at 100% 100%, color-mix(in oklab, var(--violet) 14%, transparent), transparent 60%)`,
      }}
    >
      <div aria-hidden className="tech-grid absolute inset-0 -z-10 opacity-80" />
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
          Workflow
        </span>
        <span className="font-mono text-[10.5px] text-muted-foreground">
          {study.flow.length} steps
        </span>
      </div>
      <ol className="relative space-y-2" aria-label={`${study.title} workflow`}>
        <span
          aria-hidden
          className="absolute top-3 bottom-3 left-[11px] w-px bg-[linear-gradient(var(--cyan),var(--violet))] opacity-50"
        />
        {study.flow.slice(0, shown).map((n, i) => (
          <li key={n} className="relative flex items-center gap-3">
            <span className="grid h-[23px] w-[23px] shrink-0 place-items-center rounded-full border border-border bg-panel font-mono text-[10px] font-semibold text-foreground">
              {i + 1}
            </span>
            <span className="truncate rounded-lg border border-border bg-panel/80 px-2.5 py-1 text-[12.5px] text-foreground backdrop-blur">
              {n}
            </span>
          </li>
        ))}
        {study.flow.length > shown && (
          <li className="relative pl-[35px] text-[12px] text-muted-foreground">
            + {study.flow.length - shown} more
          </li>
        )}
      </ol>
    </div>
  );
}

/** Card header for projects with a real screenshot. */
function ScreenshotPreview({ shot }: { shot: NonNullable<CaseStudy["screenshots"]>[number] }) {
  return (
    <div className="relative h-[212px] overflow-hidden border-b border-border bg-panel-2">
      <img
        src={shot.src}
        srcSet={shotSrcSet(shot)}
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-white backdrop-blur">
        Screenshot
      </span>
    </div>
  );
}

export function CaseStudyCard({
  study,
  headingLevel = 3,
  morph = false,
  reveal,
}: {
  study: CaseStudy;
  headingLevel?: 2 | 3;
  /** Give the card a view-transition name so filtering animates it to its new position. */
  morph?: boolean;
  /** "view": scroll-driven entrance (CSS view timeline, IntersectionObserver fallback). */
  reveal?: "view";
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article
      data-reveal={reveal ?? ""}
      style={morph ? { viewTransitionName: `case-${study.slug}` } : undefined}
      className="group panel-border panel-border-hover relative flex flex-col overflow-hidden rounded-3xl"
    >
      {study.screenshots?.[0] ? (
        <ScreenshotPreview shot={study.screenshots[0]} />
      ) : (
        <FlowPreview study={study} />
      )}
      {/* Hover / focus reveal over the media area */}
      <span
        aria-hidden
        className="case-hover-pill pointer-events-none absolute top-[166px] right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(110deg,#2563eb,#4f46e5_55%,#7c3aed)] px-3.5 py-1.5 font-heading text-[12.5px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(79,70,229,0.9)]"
      >
        Open case study <ArrowRight size={13} />
      </span>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge>{categoryLabels[study.category]}</CategoryBadge>
          <StatusBadge status={study.status} />
        </div>
        <H className="mt-4 text-lg font-bold leading-snug text-foreground sm:text-xl">
          <Link
            to="/case/$slug"
            params={{ slug: study.slug }}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {study.title}
          </Link>
        </H>
        <p className="mt-1 text-[13px] text-muted-foreground">
          {study.tag} · {study.location}
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{study.summary}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {study.tools.slice(0, 4).map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
          {study.tools.length > 4 && <Chip>+{study.tools.length - 4}</Chip>}
        </div>
        <span className="mt-auto flex items-center gap-1.5 pt-6 font-heading text-sm font-semibold text-foreground">
          View case study
          <ArrowRight
            size={15}
            aria-hidden
            className="text-cyan transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
      {/* Focus ring for the stretched link */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-transparent ring-inset group-has-[a:focus-visible]:ring-[var(--ring)]"
      />
    </article>
  );
}

export function CaseStudyGrid({
  studies,
  headingLevel,
  morph,
  reveal,
}: {
  studies: CaseStudy[];
  headingLevel?: 2 | 3;
  morph?: boolean;
  reveal?: "view";
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {studies.map((s) => (
        <CaseStudyCard
          key={s.slug}
          study={s}
          headingLevel={headingLevel}
          morph={morph}
          reveal={reveal}
        />
      ))}
    </div>
  );
}

type Tab = "all" | Category;
type PlatformFilter = "all" | AutomationPlatform;

const isCategory = (v: string | null): v is Category =>
  !!v && (categoryOrder as string[]).includes(v);

/**
 * Runs a state change inside a View Transition when the browser supports it, so the active
 * tab pill slides and cards glide to their new grid positions. Falls back to an instant update
 * (and under reduced motion).
 */
function withViewTransition(update: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!doc.startViewTransition || reduce) {
    update();
    return;
  }
  doc.startViewTransition(() => flushSync(update));
}

/**
 * Filterable list for /case-studies. Every project has exactly one category, so it appears
 * under exactly one tab. Automation work can be narrowed further by platform.
 * Deep link: /case-studies/?category=voice
 */
export function CaseStudiesBrowser() {
  const [tab, setTab] = useState<Tab>("all");
  const [platform, setPlatform] = useState<PlatformFilter>("all");

  // Apply ?category= after hydration so the pre-rendered HTML and the first client render match.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("category");
    if (isCategory(fromUrl)) setTab(fromUrl);
  }, []);

  const tabs = useMemo(
    () => [
      { id: "all" as Tab, label: "All work", count: sortedCaseStudies.length },
      ...categoryOrder.map((c) => ({
        id: c as Tab,
        label: categoryLabels[c],
        count: sortedCaseStudies.filter((s) => s.category === c).length,
      })),
    ],
    [],
  );
  const platforms = useMemo(
    () =>
      automationPlatforms.map((p) => ({
        id: p,
        count: sortedCaseStudies.filter(
          (s) => s.category === "automation" && automationPlatformOf(s) === p,
        ).length,
      })),
    [],
  );

  const visible = sortedCaseStudies.filter(
    (s) =>
      (tab === "all" || s.category === tab) &&
      (tab !== "automation" || platform === "all" || automationPlatformOf(s) === platform),
  );

  function selectTab(next: Tab) {
    if (next === tab) return;
    withViewTransition(() => {
      setTab(next);
      setPlatform("all");
    });
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    window.history.replaceState(window.history.state, "", url);
  }

  return (
    <div>
      <div className="sticky top-[72px] z-30 -mx-4 mb-8 border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border sm:px-3">
        <div className="overflow-x-auto no-scrollbar">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex w-max gap-1.5 sm:w-auto sm:flex-wrap"
          >
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectTab(t.id)}
                  className={cn(
                    "relative isolate inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 font-heading text-[13px] font-semibold transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                    active ? "text-white" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(110deg,#2563eb,#4f46e5_55%,#7c3aed)] shadow-[0_8px_24px_-10px_rgba(79,70,229,0.8)]"
                      style={{ viewTransitionName: "case-tab-pill" }}
                    />
                  )}
                  {t.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 font-mono text-[10.5px]",
                      active ? "bg-white/20" : "bg-panel-2",
                    )}
                  >
                    {t.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        {tab === "automation" && (
          <div
            role="group"
            aria-label="Filter automation projects by platform"
            className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-border/60 pt-3"
          >
            <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-subtle">
              Platform
            </span>
            {[{ id: "all" as PlatformFilter, count: 0 }, ...platforms].map((p) => {
              const active = platform === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => withViewTransition(() => setPlatform(p.id))}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12.5px] font-semibold transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                    active
                      ? "border-transparent bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-cyan/50 hover:text-foreground",
                  )}
                >
                  {p.id === "all" ? "All platforms" : p.id}
                  {p.id !== "all" && (
                    <span className="font-mono text-[10.5px] opacity-70">{p.count}</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} projects
        {tab === "all" ? "" : ` in ${categoryLabels[tab]}`}
      </p>
      <CaseStudyGrid studies={visible} headingLevel={2} morph />
    </div>
  );
}
