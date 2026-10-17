import { processOverview, principles } from "@/data/misc";
import { ShieldCheck, Network, FileText, KeyRound, type LucideIcon } from "lucide-react";

/** A connector that draws itself (SVG stroke-dashoffset) after its step appears. */
export function DrawLine({ className, index = 0 }: { className?: string; index?: number }) {
  return (
    <svg
      aria-hidden
      data-reveal="draw"
      viewBox="0 0 100 2"
      preserveAspectRatio="none"
      className={`rv-draw h-[2px] ${className ?? ""}`}
      style={{ "--i": index } as React.CSSProperties}
    >
      <line x1="0" y1="1" x2="100" y2="1" pathLength={1} />
    </svg>
  );
}

/** Compact horizontal process used on the homepage. */
export function ProcessOverview() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {processOverview.map((p, i) => (
        <li
          key={p.n}
          data-reveal="up"
          style={{ "--i": i } as React.CSSProperties}
          className="relative"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-panel font-mono text-sm font-semibold text-foreground shadow-[0_0_0_4px_color-mix(in_oklab,var(--violet)_10%,transparent)]">
              {p.n}
            </span>
            {i < processOverview.length - 1 && (
              <DrawLine className="hidden flex-1 lg:block" index={i} />
            )}
          </div>
          <h3 className="mt-4 text-lg font-bold text-foreground">{p.title}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
        </li>
      ))}
    </ol>
  );
}

const principleIcons: LucideIcon[] = [ShieldCheck, Network, FileText, KeyRound];

export function Principles() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {principles.map((p, i) => {
        const Icon = principleIcons[i % principleIcons.length];
        return (
          <li
            key={p.title}
            data-reveal={i % 2 ? "right" : "left"}
            style={{ "--i": i } as React.CSSProperties}
            className="panel-border flex gap-4 rounded-3xl p-6"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[color-mix(in_oklab,var(--cyan)_12%,transparent)] text-cyan">
              <Icon size={20} aria-hidden />
            </span>
            <div>
              <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
