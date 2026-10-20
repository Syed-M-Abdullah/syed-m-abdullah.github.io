import { experienceStats } from "@/data/site";
import { cn } from "@/lib/utils";
import { StatValue } from "./stat-value";

/** Years of experience as one solid two-part card (under the home photo, in the About header). */
export function ExperienceBar({ className }: { className?: string }) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-panel shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {experienceStats.map((c, i) => (
        <div
          key={c.label}
          className={cn(
            "flex flex-col px-5 py-4 sm:px-6 sm:py-5",
            i > 0 && "border-l border-border",
          )}
        >
          <dt className="mt-1.5 text-[13.5px] leading-snug text-muted-foreground">{c.label}</dt>
          <dd className="order-first font-display text-[2rem] font-extrabold leading-none tracking-tight text-foreground">
            <StatValue value={c.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
