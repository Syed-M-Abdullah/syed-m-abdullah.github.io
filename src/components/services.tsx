import { services } from "@/data/services";
import { Section } from "./section";
import { Check } from "lucide-react";

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="What I Build"
      title={
        <>
          Services with a <span className="gradient-text">production floor</span>, not a demo stage.
        </>
      }
      intro="Six deep verticals. Every engagement ships to a live production environment — with error handling, rate limits, and fallback logic from day one."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <div
            key={s.title}
            data-reveal
            style={{ transitionDelay: `${i * 60}ms` }}
            className="panel-border panel-border-hover flex flex-col rounded-2xl p-7"
          >
            <div className="mb-1 font-heading text-[10px] uppercase tracking-[0.2em] text-blue">
              0{i + 1}
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">
              {s.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {s.blurb}
            </p>
            <ul className="mt-5 space-y-2">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check size={14} className="mt-1 shrink-0 text-blue" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-1.5 pt-5 border-t border-border">
              {s.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-panel-2 px-2 py-1 font-heading text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
