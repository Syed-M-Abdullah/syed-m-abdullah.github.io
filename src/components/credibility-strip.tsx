import { Boxes, CalendarRange, Globe2, Layers3, type LucideIcon } from "lucide-react";
import { headlineClaims } from "@/data/site";
import { careerStart, yearsSince } from "@/data/misc";
import { useCountUp } from "@/lib/motion";
import { Container } from "./section";
import { cn } from "@/lib/utils";

type Item = { icon: LucideIcon; value: string; label: string };

const icons: LucideIcon[] = [Boxes, Layers3, Globe2];

/**
 * Stats row: the headline numbers you've confirmed in src/data/site.ts (verified: true), plus
 * years of experience derived from data. Numbers count up the first time the row scrolls into
 * view; the real value is what's server-rendered.
 */
function getItems(): Item[] {
  const claims: Item[] = headlineClaims
    .filter((c) => c.verified)
    .map((c, i) => ({ icon: icons[i] ?? Boxes, value: c.value, label: c.label }));
  const years: Item = {
    icon: CalendarRange,
    value: `${yearsSince(careerStart)}+`,
    label: "Years of engineering",
  };
  return [...claims, years].slice(0, 4);
}

function StatValue({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const { ref, value: n } = useCountUp(target);
  if (!match) return <>{value}</>;
  return (
    <span ref={ref as React.Ref<HTMLSpanElement>} className="stat-value">
      {/* Screen readers get the final value straight away. */}
      <span aria-hidden>
        {n}
        <span className="gradient-text">{suffix}</span>
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}

export function CredibilityStrip() {
  const items = getItems();
  return (
    <section aria-label="At a glance" className="relative pb-6">
      <Container>
        <ul className="glass grid grid-cols-2 overflow-hidden rounded-3xl lg:grid-cols-4">
          {items.map((it, i) => (
            <li
              key={it.label}
              className={cn(
                "flex flex-col items-start gap-3 border-border p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-6",
                i % 2 === 0 && "border-r",
                i < 2 && "border-b lg:border-b-0",
                i < items.length - 1 ? "lg:border-r" : "lg:border-r-0",
              )}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,color-mix(in_oklab,var(--blue)_22%,transparent),color-mix(in_oklab,var(--violet)_22%,transparent))] text-cyan sm:h-12 sm:w-12">
                <it.icon size={20} aria-hidden />
              </span>
              <div className="min-w-0">
                <div className="font-display text-2xl font-extrabold leading-none tracking-tight text-foreground sm:text-[1.9rem]">
                  <StatValue value={it.value} />
                </div>
                <div className="mt-1.5 text-[12.5px] leading-snug text-muted-foreground sm:text-[13px]">
                  {it.label}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
