import { processOverview } from "@/data/misc";

/**
 * A connector that draws itself left to right (scaleX) after its step appears. A plain element,
 * not an SVG line: a stretched SVG with pathLength dashes and a non-scaling stroke rendered as
 * broken dashes in Chrome.
 */
export function DrawLine({ className, index = 0 }: { className?: string; index?: number }) {
  return (
    <span
      aria-hidden
      data-reveal="draw"
      className={`rv-draw ${className ?? ""}`}
      style={{ "--i": index } as React.CSSProperties}
    />
  );
}

/** Compact horizontal process used on the homepage. */
export function ProcessOverview() {
  return (
    <ol className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
      {processOverview.map((p, i) => (
        <li
          key={p.n}
          data-reveal="up"
          style={{ "--i": i } as React.CSSProperties}
          className="relative"
        >
          <div className="flex items-center">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-panel font-mono text-sm font-semibold text-foreground">
              {p.n}
            </span>
            {/* Runs across the column gap and stops just short of the next step. */}
            {i < processOverview.length - 1 && (
              <DrawLine className="relative -mr-3 ml-3 hidden flex-1 lg:block" index={i} />
            )}
          </div>
          <h3 className="mt-4 text-lg font-bold text-foreground">{p.title}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
        </li>
      ))}
    </ol>
  );
}
