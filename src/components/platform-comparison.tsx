import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  automationPositioning,
  comparisonPlatforms,
  comparisonRows,
  type AutomationPlatformId,
} from "@/data/services";
import { tools } from "@/data/tools";
import { cn } from "@/lib/utils";
import { ToolLogo } from "./tool-logo";

function PlatformLogo({ id, size = 22 }: { id: AutomationPlatformId; size?: number }) {
  const tool = tools.find((t) => t.id === id);
  if (!tool) return null;
  return (
    <span
      aria-hidden
      className="grid shrink-0 place-items-center rounded-xl border border-border bg-white shadow-[var(--shadow-card)]"
      style={{ width: size + 18, height: size + 18 }}
    >
      <ToolLogo tool={tool} size={size} />
    </span>
  );
}

const cell = (id: AutomationPlatformId, label: string) =>
  comparisonRows.find((r) => r.label === label)?.cells[id] ?? "";

/**
 * n8n vs Zapier vs Make. A real table from md up; on phones, tabs with one platform's card at a
 * time (no sideways scrolling). Every cell is a few words — see comparisonRows in data/services.
 */
export function PlatformComparison() {
  const [active, setActive] = useState<AutomationPlatformId>("zapier");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const n = comparisonPlatforms.length;
    const next =
      e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(comparisonPlatforms[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      {/* md and up: table */}
      <div className="hidden overflow-hidden rounded-3xl border border-border bg-panel shadow-[var(--shadow-card)] md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Zapier, Make and n8n compared</caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="w-[19%] p-5 align-bottom">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                  Compare
                </span>
              </th>
              {comparisonPlatforms.map((p) => (
                <th key={p.id} scope="col" className="w-[27%] p-5 align-bottom">
                  <span className="flex items-center gap-3">
                    <PlatformLogo id={p.id} />
                    <span>
                      <span className="block font-heading text-lg font-bold text-foreground">
                        {p.name}
                      </span>
                      <span className="block text-[13px] font-normal leading-snug text-muted-foreground">
                        {p.summary}
                      </span>
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((r, i) => (
              <tr
                key={r.label}
                data-reveal={i % 2 ? "right" : "left"}
                style={{ "--i": i } as React.CSSProperties}
                className={cn(
                  "border-b border-border last:border-0",
                  i % 2 === 1 && "bg-[color-mix(in_oklab,var(--panel-2)_45%,transparent)]",
                )}
              >
                <th
                  scope="row"
                  className="p-5 font-heading text-[13.5px] font-semibold text-foreground"
                >
                  {r.label}
                </th>
                {comparisonPlatforms.map((p) => (
                  <td key={p.id} className="p-5 text-[14.5px] leading-snug text-muted-foreground">
                    {r.cells[p.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* phones: tabs + one card */}
      <div className="md:hidden">
        <div
          role="tablist"
          aria-label="Choose a platform"
          className="grid grid-cols-3 gap-1 rounded-full border border-border bg-panel p-1"
        >
          {comparisonPlatforms.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`cmp-tab-${p.id}`}
              aria-selected={active === p.id}
              aria-controls={`cmp-panel-${p.id}`}
              tabIndex={active === p.id ? 0 : -1}
              onClick={() => setActive(p.id)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={cn(
                "rounded-full px-3 py-2 font-heading text-sm font-semibold transition-colors",
                active === p.id
                  ? "bg-[linear-gradient(110deg,#2563eb_0%,#4f46e5_55%,#7c3aed_100%)] text-white"
                  : "text-muted-foreground",
              )}
            >
              {p.name}
            </button>
          ))}
        </div>
        {comparisonPlatforms.map((p) => (
          <div
            key={p.id}
            role="tabpanel"
            data-reveal="up"
            id={`cmp-panel-${p.id}`}
            aria-labelledby={`cmp-tab-${p.id}`}
            hidden={active !== p.id}
            className="mt-3 rounded-3xl border border-border bg-panel p-5 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center gap-3">
              <PlatformLogo id={p.id} />
              <div>
                <div className="font-heading text-lg font-bold text-foreground">{p.name}</div>
                <div className="text-[13px] text-muted-foreground">{p.summary}</div>
              </div>
            </div>
            <dl className="mt-4 divide-y divide-border">
              {comparisonRows.map((r) => (
                <div key={r.label} className="grid grid-cols-[7.5rem_1fr] gap-3 py-2.5">
                  <dt className="font-heading text-[13px] font-semibold text-foreground">
                    {r.label}
                  </dt>
                  <dd className="text-[14px] leading-snug text-muted-foreground">
                    {r.cells[p.id]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-subtle">
        Pricing models as published by each platform (October 2026). Plans change, so I confirm
        current pricing when we scope your project.
      </p>
    </div>
  );
}

/** Home page teaser: one card per platform and a link to the full comparison. */
export function ComparisonTeaser() {
  return (
    <div>
      <ul className="grid gap-4 md:grid-cols-3">
        {comparisonPlatforms.map((p, i) => (
          <li
            key={p.id}
            data-reveal="zoom"
            style={{ "--i": i } as React.CSSProperties}
            className="bento-cell rounded-3xl border border-border bg-panel p-6 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center gap-3">
              <PlatformLogo id={p.id} />
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">{p.name}</h3>
                <p className="text-[13px] leading-snug text-muted-foreground">{p.summary}</p>
              </div>
            </div>
            <dl className="mt-5 space-y-3 text-[14px] leading-snug">
              <div>
                <dt className="font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-eyebrow">
                  Best for
                </dt>
                <dd className="mt-0.5 text-foreground">{cell(p.id, "Best for")}</dd>
              </div>
              <div>
                <dt className="font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-eyebrow">
                  Pricing
                </dt>
                <dd className="mt-0.5 text-foreground">{cell(p.id, "Pricing model")}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
      <div
        data-reveal="up"
        data-delay="300"
        className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-panel/70 px-5 py-4 sm:flex-row sm:items-center"
      >
        <p className="text-[15px] text-foreground">{automationPositioning}</p>
        <Link
          to="/services/$slug/"
          params={{ slug: "workflow-automation" }}
          hash="compare"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md font-heading text-sm font-semibold text-blue hover:underline"
        >
          See the full comparison <ArrowRight size={15} aria-hidden />
        </Link>
      </div>
    </div>
  );
}
