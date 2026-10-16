import { processOverview, principles } from "@/data/misc";
import { ShieldCheck, Network, FileText, KeyRound, type LucideIcon } from "lucide-react";

/** Compact horizontal process used on the homepage. */
export function ProcessOverview() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {processOverview.map((p, i) => (
        <li key={p.n} data-reveal className="relative">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-panel font-mono text-sm font-semibold text-foreground shadow-[0_0_0_4px_color-mix(in_oklab,var(--violet)_10%,transparent)]">
              {p.n}
            </span>
            {i < processOverview.length - 1 && (
              <span
                aria-hidden
                className="hidden h-px flex-1 bg-[linear-gradient(90deg,var(--cyan),transparent)] opacity-60 lg:block"
              />
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
          <li key={p.title} data-reveal className="panel-border flex gap-4 rounded-3xl p-6">
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
