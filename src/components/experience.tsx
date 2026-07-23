import { experience, whyMe } from "@/data/misc";
import { Section } from "./section";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={<>Six years <span className="gradient-text">in production</span>.</>}
    >
      <div className="relative border-l border-border pl-6 md:pl-10">
        {experience.map((e, i) => (
          <div
            key={i}
            data-reveal
            style={{ transitionDelay: `${i * 60}ms` }}
            className="relative mb-8 last:mb-0"
          >
            <div className="absolute -left-[31px] top-2 h-3 w-3 rounded-full border-2 border-background bg-blue md:-left-[43px]" />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {e.role}
              </h3>
              {e.active && (
                <span className="rounded-full bg-blue/15 px-2 py-0.5 font-heading text-[10px] uppercase tracking-wider text-blue">
                  ● Active
                </span>
              )}
            </div>
            <div className="mt-0.5 font-heading text-sm text-muted-foreground">
              {e.company}
              <span className="mx-2 text-border">·</span>
              {e.dates}
            </div>
          </div>
        ))}
        <div className="mt-10 rounded-xl border border-border bg-panel-2 p-5">
          <div className="font-heading text-[10px] uppercase tracking-[0.18em] text-blue">
            Education
          </div>
          <div className="mt-1 font-heading text-sm font-semibold text-foreground">
            BS Computer Science
          </div>
          <div className="text-sm text-muted-foreground">
            Virtual University of Pakistan · 2020–2024
          </div>
        </div>
      </div>
    </Section>
  );
}

export function WhyMe() {
  return (
    <Section
      eyebrow="Why Me"
      title={<>The <span className="gradient-text">reason</span> the pipeline actually holds.</>}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {whyMe.map((w, i) => (
          <div
            key={w.title}
            data-reveal
            style={{ transitionDelay: `${i * 60}ms` }}
            className="panel-border rounded-2xl p-6"
          >
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-blue/15 font-display text-lg font-bold text-blue">
              0{i + 1}
            </div>
            <h3 className="font-heading text-base font-semibold text-foreground">
              {w.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{w.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
