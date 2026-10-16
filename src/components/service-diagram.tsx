import { ArrowDown, ArrowRight } from "lucide-react";
import type { ServiceDiagram as Diagram } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Service-specific architecture illustration. Three layouts — linear flow, hub and
 * layered stack — so each service page reads differently.
 */
export function ServiceDiagram({ diagram, className }: { diagram: Diagram; className?: string }) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-panel/70 p-5 sm:p-8",
        className,
      )}
    >
      <div aria-hidden className="tech-grid pointer-events-none absolute inset-0 opacity-70" />
      <figcaption className="relative mb-6 flex flex-wrap items-center justify-between gap-2">
        <span className="font-heading text-base font-semibold text-foreground">
          {diagram.title}
        </span>
        <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
          Illustrative architecture
        </span>
      </figcaption>
      <div className="relative">
        {diagram.kind === "flow" && <Flow steps={diagram.steps} />}
        {diagram.kind === "hub" && (
          <Hub inputs={diagram.inputs} hub={diagram.hub} outputs={diagram.outputs} />
        )}
        {diagram.kind === "layers" && <Layers layers={diagram.layers} />}
      </div>
    </figure>
  );
}

function Flow({ steps }: { steps: { label: string; detail: string }[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.label} className="glass relative rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--cyan),var(--violet))] font-mono text-xs font-semibold text-white">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-heading text-[15px] font-semibold text-foreground">
              {s.label}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
        </li>
      ))}
    </ol>
  );
}

function Hub({
  inputs,
  hub,
  outputs,
}: {
  inputs: string[];
  hub: { label: string; detail: string };
  outputs: string[];
}) {
  return (
    <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1.1fr_auto_1fr]">
      <NodeList title="Inputs" items={inputs} />
      <Connector />
      <div className="relative rounded-2xl p-[1px] [background:linear-gradient(135deg,var(--cyan),var(--violet))]">
        <div className="rounded-[15px] bg-panel px-5 py-6 text-center">
          <div
            className="mx-auto mb-3 h-2 w-2 rounded-full bg-cyan shadow-[0_0_16px_var(--cyan)]"
            aria-hidden
          />
          <div className="font-heading text-lg font-bold text-foreground">{hub.label}</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{hub.detail}</p>
        </div>
      </div>
      <Connector />
      <NodeList title="Outputs" items={outputs} />
    </div>
  );
}

function NodeList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="mb-2 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <ul className="flex flex-wrap gap-2 lg:flex-col">
        {items.map((i) => (
          <li
            key={i}
            className="glass rounded-xl px-3 py-2 text-[13px] font-medium text-foreground lg:w-full"
          >
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Connector() {
  return (
    <div aria-hidden className="flex justify-center text-cyan">
      <ArrowDown size={18} className="lg:hidden" />
      <ArrowRight size={18} className="hidden lg:block" />
    </div>
  );
}

function Layers({ layers }: { layers: { label: string; items: string[] }[] }) {
  return (
    <ol className="space-y-3">
      {layers.map((l, i) => (
        <li
          key={l.label}
          className="glass grid gap-3 rounded-2xl p-4 sm:grid-cols-[160px_1fr] sm:items-center"
        >
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="h-6 w-1.5 rounded-full"
              style={{
                background: `color-mix(in oklab, var(--cyan) ${100 - i * 22}%, var(--violet))`,
              }}
            />
            <span className="font-heading text-sm font-semibold text-foreground">{l.label}</span>
          </div>
          <ul className="flex flex-wrap gap-2">
            {l.items.map((it) => (
              <li
                key={it}
                className="rounded-lg border border-border bg-background/60 px-2.5 py-1.5 text-[13px] text-foreground"
              >
                {it}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
