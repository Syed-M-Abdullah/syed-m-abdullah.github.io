import { process } from "@/data/misc";
import { Section } from "./section";

export function Process() {
  return (
    <Section
      id="process"
      eyebrow="How I Work"
      title={
        <>
          Four steps. <span className="gradient-text">Zero guesswork.</span>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {process.map((p, i) => (
          <div
            key={p.n}
            data-reveal
            style={{ transitionDelay: `${i * 80}ms` }}
            className="panel-border relative overflow-hidden rounded-2xl p-7"
          >
            <div className="font-display text-6xl font-extrabold text-blue/15">
              {p.n}
            </div>
            <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">
              {p.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
