import { countries, industries } from "@/data/misc";
import { Section } from "./section";

export function GlobalReach() {
  return (
    <Section
      id="reach"
      eyebrow="Global Reach"
      title={<>Live deployments across <span className="gradient-text">3 continents</span>.</>}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map((c, i) => (
          <div
            key={c.name}
            data-reveal
            style={{ transitionDelay: `${i * 40}ms` }}
            className="panel-border panel-border-hover flex items-center gap-4 rounded-xl p-5"
          >
            <div className="text-3xl">{c.flag}</div>
            <div className="min-w-0">
              <div className="font-heading text-sm font-semibold text-foreground">
                {c.name}
              </div>
              <div className="text-xs text-muted-foreground truncate">{c.note}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Industries() {
  return (
    <Section
      id="industries"
      eyebrow="Industries"
      title={<>25+ industries. <span className="gradient-text">Same discipline every time.</span></>}
    >
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {industries.map((ind, i) => (
          <div
            key={ind}
            data-reveal
            style={{ transitionDelay: `${(i % 10) * 30}ms` }}
            className="panel-border panel-border-hover rounded-lg px-4 py-3 font-heading text-sm text-foreground"
          >
            {ind}
          </div>
        ))}
      </div>
    </Section>
  );
}
