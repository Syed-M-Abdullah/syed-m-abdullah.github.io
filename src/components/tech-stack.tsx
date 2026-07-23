import { useState } from "react";
import { techStack } from "@/data/misc";
import { Section } from "./section";

export function TechStack() {
  const tabs = Object.keys(techStack);
  const [active, setActive] = useState(tabs[0]);

  return (
    <Section
      id="stack"
      eyebrow="Tech Stack"
      title={<>Tools that <span className="gradient-text">actually ship</span>.</>}
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`rounded-full border px-4 py-2 font-heading text-[11px] font-medium uppercase tracking-[0.14em] transition ${
              active === t
                ? "border-blue bg-blue text-white"
                : "border-border bg-panel text-muted-foreground hover:border-blue/40 hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="panel-border rounded-2xl p-6 md:p-8">
        <div className="flex flex-wrap gap-2">
          {techStack[active].map((item) => (
            <span
              key={item}
              className="rounded-lg border border-border bg-panel-2 px-3 py-2 font-heading text-sm text-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
