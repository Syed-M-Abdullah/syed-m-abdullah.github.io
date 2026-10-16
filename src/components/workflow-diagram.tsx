import { cn } from "@/lib/utils";

/**
 * Renders a case study's `flow` as numbered steps. Vertical on small screens, horizontal
 * when there's room. It's an illustration of the workflow, not a product screenshot.
 */
export function WorkflowDiagram({
  nodes,
  compact = false,
  className,
}: {
  nodes: string[];
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return (
      <ol className={cn("flex flex-wrap items-center gap-x-1 gap-y-2", className)}>
        {nodes.map((n, i) => (
          <li key={n} className="flex items-center gap-1">
            <span className="rounded-md border border-[color-mix(in_oklab,var(--blue)_35%,transparent)] bg-[color-mix(in_oklab,var(--blue)_10%,transparent)] px-2 py-1 font-mono text-[10.5px] leading-none text-foreground">
              {n}
            </span>
            {i < nodes.length - 1 && <Arrow />}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className={cn("grid gap-3", lgCols[nodes.length] ?? "lg:grid-cols-4", className)}>
      {nodes.map((n, i) => (
        <li key={n} className="relative">
          <div className="flex h-full items-center gap-3 rounded-xl border border-border bg-background/60 p-4 lg:flex-col lg:items-start lg:gap-2">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--blue),var(--violet))] font-mono text-[11px] font-semibold text-white">
              {i + 1}
            </span>
            <span className="text-sm font-medium leading-snug text-foreground">{n}</span>
          </div>
          {i < nodes.length - 1 && (
            <span
              aria-hidden
              className="absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 text-cyan lg:block"
            >
              <Arrow />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

const lgCols: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

function Arrow() {
  return (
    <svg width="14" height="8" viewBox="0 0 20 8" className="shrink-0 text-cyan/80" aria-hidden>
      <path
        d="M0 4 H15 M12 1 L15 4 L12 7"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
