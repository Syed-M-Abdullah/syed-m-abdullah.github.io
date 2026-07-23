import { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 max-w-3xl" data-reveal>
          {eyebrow && (
            <div className="mb-3 inline-flex items-center gap-2 font-heading text-[11px] uppercase tracking-[0.2em] text-blue">
              <span className="h-px w-8 bg-blue" />
              {eyebrow}
            </div>
          )}
          <h2 className="font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-foreground md:text-6xl">
            {title}
          </h2>
          {intro && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {intro}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
