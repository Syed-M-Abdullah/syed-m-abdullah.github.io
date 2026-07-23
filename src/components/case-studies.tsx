import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Section } from "./section";
import { WorkflowDiagram } from "./workflow-diagram";
import { caseStudies, categories, type Category } from "@/data/caseStudies";
import { ArrowUpRight } from "lucide-react";

export function CaseStudies() {
  const [active, setActive] = useState<Category | "All">("All");
  const filtered =
    active === "All" ? caseStudies : caseStudies.filter((c) => c.category === active);

  return (
    <Section
      id="cases"
      eyebrow="Selected Work"
      title={
        <>
          Systems in <span className="gradient-text">production.</span>
        </>
      }
      intro="Each engagement below is a live system — architecture, integrations and outcomes. Tap any project to open the full breakdown with screenshots and demo footage."
    >
      {/* Filter bar */}
      <div className="mb-10 -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
        <div className="inline-flex gap-1 rounded-full border border-border bg-panel p-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`shrink-0 rounded-full px-5 py-2.5 font-heading text-[11px] font-medium uppercase tracking-[0.16em] transition ${
                active === c
                  ? "bg-foreground text-background shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Cases */}
      <div className="grid gap-6 lg:grid-cols-2">
        {filtered.map((c, i) => (
          <Link
            key={c.slug}
            to="/case/$slug"
            params={{ slug: c.slug }}
            data-reveal
            style={{ transitionDelay: `${(i % 6) * 50}ms` }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-panel transition-all duration-500 hover:border-blue/60 hover:shadow-[0_30px_80px_-30px_rgba(59,130,246,0.35)] hover:-translate-y-1"
          >
            {/* gradient sheen on hover */}
            <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br from-blue/0 via-blue/0 to-blue/0 opacity-0 transition-opacity duration-500 group-hover:from-blue/10 group-hover:to-transparent group-hover:opacity-100" />

            {/* Header strip */}
            <div className="relative flex items-center justify-between border-b border-border bg-panel-2/60 px-6 py-3.5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-widest text-subtle">
                  {String(i + 1).padStart(2, "0")} /
                </span>
                <span className="font-heading text-[10px] uppercase tracking-[0.22em] text-blue">
                  {c.category}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                LIVE · {c.location}
              </div>
            </div>

            {/* Body */}
            <div className="relative flex flex-1 flex-col gap-6 p-7 md:p-9">
              <div>
                <div className="font-heading text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {c.tag}
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold leading-[1.15] tracking-tight text-foreground md:text-[26px]">
                  {c.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-muted-foreground">
                  {c.problem}
                </p>
              </div>

              {/* Architecture card */}
              <div className="rounded-xl border border-border bg-background/60 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue">
                    ▸ architecture.flow
                  </span>
                  <span className="font-mono text-[10px] text-subtle">
                    {c.flow.length} nodes
                  </span>
                </div>
                <WorkflowDiagram nodes={c.flow} compact />
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-3 gap-3">
                {c.stats.slice(0, 3).map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border bg-background/40 px-3 py-3.5"
                  >
                    <div className="font-display text-lg font-extrabold leading-none text-foreground md:text-xl">
                      {s.value}
                    </div>
                    <div className="mt-1.5 font-heading text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-end justify-between border-t border-border pt-5">
                <div className="flex flex-wrap gap-1.5">
                  {c.tools.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-panel-2 px-2 py-1 font-mono text-[10px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                  {c.tools.length > 4 && (
                    <span className="rounded-md px-2 py-1 font-mono text-[10px] text-subtle">
                      +{c.tools.length - 4}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-blue">
                  Case Study
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
