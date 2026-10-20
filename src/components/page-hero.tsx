import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./badges";
import { Breadcrumbs } from "./breadcrumbs";
import { Container } from "./section";
import { bandClass } from "@/lib/band";

type Crumb = Parameters<typeof Breadcrumbs>[0]["items"][number];

/** Hero for inner pages: breadcrumbs, eyebrow, H1, intro, optional actions and aside. */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  actions,
  aside,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <section
      data-pause-offscreen
      className={cn(bandClass("brand"), "overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20", className)}
    >
      <Container>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div
          className={cn(
            "grid gap-10",
            aside && "lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center lg:gap-14",
          )}
        >
          <div className="max-w-3xl">
            {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
            <h1 className="text-[2.25rem] font-extrabold leading-[1.08] text-foreground sm:text-5xl md:text-[3.5rem]">
              {title}
            </h1>
            {intro && (
              <div className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {intro}
              </div>
            )}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside && <div className="min-w-0">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
