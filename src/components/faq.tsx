import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { site } from "@/data/site";
import { bandClass, type Tone } from "@/lib/band";
import { cn } from "@/lib/utils";
import { MaskLines } from "./reveal-text";
import { Container } from "./section";

/** Questions on the left, answers as native disclosure rows on the right. */
export function FaqSection({
  id = "faq",
  title = "Questions clients ask first",
  faqs,
  tone,
  children,
}: {
  id?: string;
  title?: string;
  faqs: { q: string; a: string }[];
  tone?: Tone;
  /** Extra content under the questions (for example, links to other services). */
  children?: ReactNode;
}) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className={cn(
        "cv-auto py-16 [contain-intrinsic-size:auto_640px] md:py-24",
        tone && bandClass(tone),
      )}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <h2
              id={`${id}-title`}
              data-reveal="mask-lines"
              className="text-3xl font-bold text-foreground sm:text-4xl md:text-[2.6rem]"
            >
              <MaskLines>{title}</MaskLines>
            </h2>
            <p
              data-reveal="up"
              data-delay="200"
              className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground"
            >
              Something else on your mind? Ask it on the call, or send it by email to{" "}
              <a href={`mailto:${site.email}`} className="text-eyebrow underline">
                {site.email}
              </a>
              .
            </p>
          </div>
          <div data-reveal="up" className="divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.q} className="faq group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-heading text-[16.5px] font-semibold text-foreground">
                  {f.q}
                  <ChevronDown
                    size={18}
                    aria-hidden
                    className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <p className="max-w-2xl pb-6 text-[15.5px] leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
        {children}
      </Container>
    </section>
  );
}
