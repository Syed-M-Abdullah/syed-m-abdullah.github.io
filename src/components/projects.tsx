import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Images, Mic } from "lucide-react";
import {
  projects as allProjects,
  toolLabels,
  toolLogoIds,
  toolOrder,
  type ProjectSummary,
  type ProjectTool,
} from "@/data/projects";
import { tools } from "@/data/tools";
import { cn } from "@/lib/utils";
import { withViewTransition } from "@/lib/view-transition";
import { ToolLogo } from "./tool-logo";

/** Brand tint per tool (badges, cover fallbacks). */
const toolTint: Record<ProjectTool, string> = {
  n8n: "#EA4B71",
  make: "#6D00CC",
  zapier: "#FF4F00",
  ghl: "#188BF6",
  voice: "#2563eb",
  custom: "#10b981",
};

export function ToolMark({ tool, size = 16 }: { tool: ProjectTool; size?: number }) {
  const logo = toolLogoIds[tool] && tools.find((t) => t.id === toolLogoIds[tool]);
  if (logo) return <ToolLogo tool={logo} size={size} />;
  const Icon = tool === "voice" ? Mic : Code2;
  return (
    <span
      aria-hidden
      className="grid shrink-0 place-items-center rounded-md text-white"
      style={{ width: size, height: size, background: toolTint[tool] }}
    >
      <Icon size={size * 0.62} strokeWidth={2.4} />
    </span>
  );
}

/** Tool badge: logo + name, on a light pill (readable over screenshots and dark bands). */
export function ToolBadge({ tool, className }: { tool: ProjectTool; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-white/95 py-1 pr-2.5 pl-1.5 font-heading text-[11.5px] font-semibold text-[#0b1224] shadow-[0_6px_18px_-8px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      <ToolMark tool={tool} size={15} />
      {toolLabels[tool]}
    </span>
  );
}

/** Cover for projects without a screenshot: a tool-tinted panel with the workflow or tools. */
export function CoverFallback({ project }: { project: ProjectSummary }) {
  const tint = toolTint[project.tool];
  const steps = project.flow?.slice(0, 4);
  return (
    <div
      className="relative isolate flex h-full w-full flex-col justify-end overflow-hidden p-5"
      style={{
        background: `radial-gradient(120% 90% at 0% 0%, color-mix(in oklab, ${tint} 26%, transparent), transparent 62%), radial-gradient(90% 80% at 100% 100%, color-mix(in oklab, var(--violet) 16%, transparent), transparent 60%), var(--panel-2)`,
      }}
    >
      <div aria-hidden className="tech-grid absolute inset-0 -z-10 opacity-70" />
      <span className="absolute top-4 right-4 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
        Overview
      </span>
      {steps?.length ? (
        <ol className="space-y-1.5" aria-label={`${project.title} workflow`}>
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2.5">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-border bg-panel font-mono text-[10px] font-semibold text-foreground">
                {i + 1}
              </span>
              <span className="truncate rounded-lg border border-border bg-panel/85 px-2.5 py-1 text-[12.5px] text-foreground">
                {s}
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="flex flex-wrap gap-1.5" aria-label="Tools used">
          {project.toolsUsed.slice(0, 5).map((t) => (
            <li
              key={t}
              className="rounded-full border border-border bg-panel/85 px-2.5 py-1 font-heading text-[12px] font-semibold text-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ProjectCard({
  project,
  index = 0,
  headingLevel = 3,
  morph = false,
  priority = false,
}: {
  project: ProjectSummary;
  /** Position in the grid: alternates the reveal direction and staggers by column. */
  index?: number;
  headingLevel?: 2 | 3;
  /** View-transition name, so filtering glides cards to their new place. */
  morph?: boolean;
  /**
   * Above the fold on load: the cover loads eagerly and the card enters with a CSS-only rise
   * (.card-rise) instead of a scroll reveal, so the page's largest image never waits for the
   * reveal engine, which starts after hydration.
   */
  priority?: boolean;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const style = {
    "--i": index % 3,
    ...(morph ? { viewTransitionName: `project-${project.slug}` } : {}),
  } as React.CSSProperties;
  return (
    <article
      data-reveal={priority ? undefined : index % 2 ? "right" : "left"}
      style={style}
      className={`group panel-border panel-border-hover relative flex flex-col overflow-hidden rounded-3xl${priority ? " card-rise" : ""}`}
    >
      <div
        data-reveal={priority ? undefined : "wipe"}
        style={{ "--i": index % 3 } as React.CSSProperties}
        className="relative aspect-[16/10] overflow-hidden border-b border-border bg-panel-2"
      >
        {project.cover ? (
          <img
            src={project.cover.src}
            srcSet={project.cover.srcSet}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority && index === 0 ? "high" : undefined}
            decoding="async"
            className="h-full w-full object-cover object-top group-hover:scale-[1.04]"
          />
        ) : (
          <CoverFallback project={project} />
        )}
        <ToolBadge tool={project.tool} className="absolute top-3 left-3" />
        {project.imageCount > 1 && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 font-mono text-[10.5px] text-white">
            <Images size={12} aria-hidden /> {project.imageCount}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <H className="text-lg font-bold leading-snug text-foreground sm:text-xl">
          <Link
            to="/projects/$slug/"
            params={{ slug: project.slug }}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </H>
        {project.subtitle && (
          <p className="mt-1 line-clamp-1 text-[13px] text-subtle">{project.subtitle}</p>
        )}
        {project.excerpt && (
          <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-muted-foreground">
            {project.excerpt}
          </p>
        )}
        <span className="mt-auto flex items-center gap-1.5 pt-5 font-heading text-sm font-semibold text-foreground">
          View project
          <ArrowRight
            size={15}
            aria-hidden
            className="text-cyan transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-transparent ring-inset group-has-[a:focus-visible]:ring-[var(--ring)]"
      />
    </article>
  );
}

export function ProjectGrid({
  projects,
  headingLevel,
  morph,
  priority = 0,
}: {
  projects: ProjectSummary[];
  headingLevel?: 2 | 3;
  morph?: boolean;
  /** How many leading cards are above the fold on load (see ProjectCard's `priority`). */
  priority?: number;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <ProjectCard
          key={p.slug}
          project={p}
          index={i}
          headingLevel={headingLevel}
          morph={morph}
          priority={i < priority}
        />
      ))}
    </div>
  );
}

type Tab = "all" | ProjectTool;
const isTool = (v: string | null): v is ProjectTool => !!v && (toolOrder as string[]).includes(v);

/** Tool shortcuts that deep-link into the filtered list (home page, service pages). */
export function ToolLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Browse projects by tool">
      {toolOrder.map((t, i) => (
        <li key={t} data-reveal="up" style={{ "--i": i } as React.CSSProperties}>
          <a
            href={`/projects/?tool=${t}`}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-panel py-1.5 pr-3.5 pl-2 font-heading text-[13px] font-semibold text-foreground transition-colors hover:border-[color-mix(in_oklab,var(--blue)_45%,transparent)] hover:text-blue"
          >
            <ToolMark tool={t} size={18} />
            {toolLabels[t]}
            <span className="rounded-full bg-panel-2 px-1.5 py-0.5 font-mono text-[10.5px] text-muted-foreground">
              {allProjects.filter((p) => p.tool === t).length}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Filterable list for /projects: one tab per tool (each project belongs to exactly one) with
 * counts; switching glides the pill and the cards (View Transitions). Deep link: ?tool=n8n.
 */
export function ProjectsBrowser({ tool }: { tool?: string }) {
  const [tab, setTab] = useState<Tab>("all");

  // Apply ?tool= after hydration so the pre-rendered HTML and the first client render match.
  useEffect(() => {
    if (isTool(tool ?? null)) setTab(tool as ProjectTool);
  }, [tool]);

  const tabs = useMemo(
    () => [
      { id: "all" as Tab, label: "All", count: allProjects.length },
      ...toolOrder.map((t) => ({
        id: t as Tab,
        label: toolLabels[t],
        count: allProjects.filter((p) => p.tool === t).length,
      })),
    ],
    [],
  );
  const visible = tab === "all" ? allProjects : allProjects.filter((p) => p.tool === tab);

  function select(next: Tab) {
    if (next === tab) return;
    withViewTransition(() => setTab(next));
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("tool");
    else url.searchParams.set("tool", next);
    window.history.replaceState(window.history.state, "", url);
  }

  return (
    <div>
      <div className="sticky top-[72px] z-30 -mx-4 mb-8 border-b border-border/60 bg-background/90 px-4 py-3 sm:mx-0 sm:rounded-2xl sm:border sm:px-3">
        <div className="no-scrollbar overflow-x-auto">
          <div
            role="group"
            aria-label="Filter projects by tool"
            className="flex w-max gap-1.5 sm:w-auto sm:flex-wrap"
          >
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => select(t.id)}
                  className={cn(
                    "relative isolate inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 font-heading text-[13px] font-semibold transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                    active ? "text-white" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(110deg,#2563eb,#4f46e5_55%,#7c3aed)] shadow-[0_8px_24px_-10px_rgba(79,70,229,0.8)]"
                      style={{ viewTransitionName: "project-tab-pill" }}
                    />
                  )}
                  {t.id !== "all" && (
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-white">
                      <ToolMark tool={t.id} size={14} />
                    </span>
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
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} projects{tab === "all" ? "" : ` built with ${toolLabels[tab]}`}
      </p>
      <ProjectGrid projects={visible} headingLevel={2} morph priority={3} />
    </div>
  );
}
