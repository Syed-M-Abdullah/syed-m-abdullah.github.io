import { ArrowRight, Check, ChevronDown, X } from "lucide-react";
import { site } from "@/data/site";
import { homeFaqs } from "@/data/misc";
import { MaskLines } from "./reveal-text";
import { Container } from "./section";
import { bandClass, type Tone } from "@/lib/band";
import { cn } from "@/lib/utils";

/** Off-white strip under the hero: where clients are and who they are (approved names only). */
export function TrustStrip() {
  if (!site.selectedClients.length) return null;
  return (
    <section aria-label="Selected clients" className={`${bandClass("light")} py-10 md:py-12`}>
      <Container>
        <div className="flex flex-col items-center gap-5 lg:flex-row lg:justify-between lg:gap-10">
          <p
            data-reveal="blur-up"
            className="max-w-xs text-center text-[13.5px] leading-snug text-muted-foreground lg:text-left"
          >
            Agencies and businesses I have built for, in the US, UK, Europe and the Middle East
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:justify-end">
            {site.selectedClients.map((c, i) => (
              <li
                key={c}
                data-reveal="up"
                style={{ "--i": i } as React.CSSProperties}
                className="font-heading text-[15px] font-bold tracking-tight whitespace-nowrap text-foreground/60"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

const without = [
  "Leads wait hours for a reply",
  "Data copied between apps by hand",
  "Follow-up depends on someone remembering",
];
const withSystems = [
  "Every lead gets an instant reply and an owner",
  "Apps stay in sync, with alerts if anything fails",
  "Follow-up runs on schedule until the lead replies",
];

/** Sage band: the cost of manual work, side by side with what a system changes. */
export function ProblemSolution() {
  return (
    <section
      aria-labelledby="why-automate-title"
      className={`${bandClass("sage")} cv-auto py-16 [contain-intrinsic-size:auto_640px] md:py-24`}
    >
      <Container>
        <div className="mb-10 max-w-2xl md:mb-12">
          <h2
            id="why-automate-title"
            data-reveal="mask-lines"
            className="text-3xl font-bold text-foreground sm:text-4xl md:text-[2.75rem]"
          >
            <MaskLines>Manual work quietly costs you leads</MaskLines>
          </h2>
          <p
            data-reveal="up"
            data-delay="200"
            className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            You don't need more people for busywork. You need a system that never forgets a step.
          </p>
        </div>

        <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div
            data-reveal="left"
            className="rounded-3xl border border-border bg-[color-mix(in_oklab,var(--panel)_55%,transparent)] p-6 sm:p-7"
          >
            <h3 className="font-heading text-[15px] font-semibold text-muted-foreground">
              Without a system
            </h3>
            <ul className="mt-4 space-y-3.5">
              {without.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] leading-snug text-muted-foreground">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[rgba(220,38,38,0.1)] text-[#b91c1c]">
                    <X size={12} strokeWidth={3} aria-hidden />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div aria-hidden data-reveal="zoom" data-delay="200" className="grid place-items-center">
            <span className="grid h-10 w-10 rotate-90 place-items-center rounded-full border border-border bg-panel text-eyebrow md:rotate-0">
              <ArrowRight size={18} />
            </span>
          </div>

          <div
            data-reveal="right"
            data-delay="300"
            className="rounded-3xl border border-border bg-panel p-6 shadow-[var(--shadow-card)] sm:p-7"
          >
            <h3 className="font-heading text-[15px] font-semibold text-foreground">
              With an automated system
            </h3>
            <ul className="mt-4 space-y-3.5">
              {withSystems.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] leading-snug text-foreground">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--success)_14%,transparent)] text-success">
                    <Check size={12} strokeWidth={3} aria-hidden />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Five questions clients ask first, answered from what the site already says. */
export function HomeFaq({ tone }: { tone?: Tone }) {
  return (
    <section
      aria-labelledby="faq-title"
      className={cn(
        "cv-auto py-16 [contain-intrinsic-size:auto_640px] md:py-24",
        tone && bandClass(tone),
      )}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <h2
              id="faq-title"
              data-reveal="mask-lines"
              className="text-3xl font-bold text-foreground sm:text-4xl md:text-[2.6rem]"
            >
              <MaskLines>Questions clients ask first</MaskLines>
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
            {homeFaqs.map((f) => (
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
      </Container>
    </section>
  );
}
