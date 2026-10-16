import { GraduationCap } from "lucide-react";
import { education, experience } from "@/data/misc";

export function ExperienceTimeline() {
  return (
    <div>
      <ol className="relative space-y-6 border-l border-border pl-6">
        {experience.map((e) => (
          <li key={`${e.role}-${e.company}-${e.dates}`} className="relative">
            <span
              aria-hidden
              className={`absolute top-1.5 -left-[31px] h-3 w-3 rounded-full border-2 border-background ${e.active ? "bg-cyan" : "bg-subtle"}`}
            />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-heading text-base font-semibold text-foreground">{e.role}</h3>
              {e.active && (
                <span className="rounded-full bg-[color-mix(in_oklab,var(--cyan)_14%,transparent)] px-2 py-0.5 text-[11px] font-semibold text-cyan">
                  Current
                </span>
              )}
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {e.company} · {e.dates}
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-panel-2/60 p-4">
        <GraduationCap size={20} className="shrink-0 text-cyan" aria-hidden />
        <div className="text-sm">
          <div className="font-semibold text-foreground">{education.degree}</div>
          <div className="text-muted-foreground">
            {education.school} · {education.dates}
          </div>
        </div>
      </div>
    </div>
  );
}
