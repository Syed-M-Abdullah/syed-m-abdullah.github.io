import { Plus } from "lucide-react";

/**
 * FAQ list built on native <details>, so answers are in the server-rendered HTML,
 * keyboard accessible, and work without JavaScript.
 */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-panel/60">
      {items.map((f) => (
        <details key={f.q} className="group px-5 sm:px-7">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-heading text-[15px] font-semibold text-foreground marker:hidden sm:text-base [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden
              className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-transform duration-200 group-open:rotate-45 group-open:text-cyan"
            >
              <Plus size={14} />
            </span>
          </summary>
          <p className="-mt-1 pb-5 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
