import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { bandClass, type Tone } from "@/lib/band";
import { Eyebrow } from "./badges";
import { MaskLines } from "./reveal-text";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  align = "left",
  as: Tag = "h2",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
}) {
  // Choreography: eyebrow blurs in, the title rises line by line, then the intro and action.
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 md:mb-12",
        align === "center"
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <div data-reveal="blur-up">
            <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
          </div>
        )}
        <Tag
          id={id}
          data-reveal="mask-lines"
          data-delay="100"
          className="text-3xl font-bold text-foreground sm:text-4xl md:text-[2.75rem]"
        >
          <MaskLines>{title}</MaskLines>
        </Tag>
        {intro && (
          <p
            data-reveal="up"
            data-delay="300"
            className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {intro}
          </p>
        )}
      </div>
      {action && (
        <div data-reveal="right" data-delay="300" className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  action,
  align,
  tone,
  angle,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  /** Paints the section as a band in the alternating brand / off-white / sage rhythm. */
  tone?: Tone;
  /** With `tone`: an angled top edge instead of the soft curve. */
  angle?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn("relative py-16 md:py-24", tone && bandClass(tone, angle), className)}
    >
      <Container>
        {title && (
          <SectionHeading
            id={headingId}
            eyebrow={eyebrow}
            title={title}
            intro={intro}
            action={action}
            align={align}
          />
        )}
        {children}
      </Container>
    </section>
  );
}
