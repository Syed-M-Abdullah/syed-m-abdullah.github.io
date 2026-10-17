import { ArrowRight, Check, X } from "lucide-react";
import { site } from "@/data/site";
import { Eyebrow } from "./badges";
import { MaskLines } from "./reveal-text";
import { Container } from "./section";
import { bandClass } from "@/lib/band";

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
            Trusted by agencies and businesses across the US, UK, Europe and the Middle East
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
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <div data-reveal="blur-up">
            <Eyebrow className="mb-3">Why automate</Eyebrow>
          </div>
          <h2
            id="why-automate-title"
            data-reveal="mask-lines"
            data-delay="100"
            className="text-3xl font-bold text-foreground sm:text-4xl md:text-[2.75rem]"
          >
            <MaskLines>
              Manual work quietly costs you <span className="gradient-text">leads</span>
            </MaskLines>
          </h2>
          <p
            data-reveal="up"
            data-delay="300"
            className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            You don't need more people for busywork. You need systems that never forget a step.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div
            data-reveal="left"
            className="rounded-3xl border border-border bg-[color-mix(in_oklab,var(--panel)_55%,transparent)] p-6 sm:p-7"
          >
            <h3 className="font-heading text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Without systems
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
            <span className="grid h-11 w-11 rotate-90 place-items-center rounded-full bg-[linear-gradient(135deg,#2563eb,#7c3aed)] text-white shadow-[0_10px_24px_-10px_rgba(79,70,229,0.8)] md:rotate-0">
              <ArrowRight size={18} />
            </span>
          </div>

          <div
            data-reveal="right"
            data-delay="300"
            className="gradient-border rounded-3xl border border-border bg-panel p-6 shadow-[var(--shadow-card)] sm:p-7"
          >
            <h3 className="font-heading text-[13px] font-semibold uppercase tracking-[0.14em] text-eyebrow">
              With intelligent systems
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
