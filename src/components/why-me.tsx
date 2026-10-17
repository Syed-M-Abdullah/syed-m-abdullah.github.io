import { ClipboardCheck, FileText, KeyRound, ShieldCheck, type LucideIcon } from "lucide-react";
import { headlineClaims, site } from "@/data/site";
import { principles } from "@/data/misc";
import { cn } from "@/lib/utils";
import { Container } from "./section";
import { bandClass, type Tone } from "@/lib/band";
import { Eyebrow } from "./badges";
import { MaskLines } from "./reveal-text";
import { Portrait } from "./portrait";
import { StatValue } from "./stat-value";

const icons: LucideIcon[] = [ClipboardCheck, KeyRound, ShieldCheck, FileText];

/**
 * Trust block for the home page — real facts only: role, confirmed headline numbers, regions
 * served and working principles (named clients sit in the trust strip under the hero).
 */
export function WhyMe({ tone }: { tone?: Tone }) {
  const claims = headlineClaims.filter((c) => c.verified);
  return (
    <section
      aria-labelledby="why-title"
      className={cn(
        "cv-auto py-20 [contain-intrinsic-size:auto_900px] md:py-28",
        tone && bandClass(tone),
      )}
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div data-reveal="wipe" className="relative mx-auto w-full max-w-[420px]">
            {/* glow + ring behind the cutout portrait (no overlays on the photo) */}
            <div
              aria-hidden
              className="absolute inset-[8%] -z-10 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--blue)_28%,transparent),transparent),radial-gradient(closest-side_at_40%_70%,color-mix(in_oklab,var(--violet)_24%,transparent),transparent)] blur-2xl"
            />
            <div
              aria-hidden
              className="absolute inset-[4%] -z-10 rounded-full border border-[color-mix(in_oklab,var(--blue)_25%,transparent)]"
            />
            <div className="aspect-square [mask-image:linear-gradient(to_bottom,black_82%,transparent)]">
              <Portrait sizes="(min-width: 1024px) 420px, 80vw" />
            </div>
          </div>

          <div>
            <div data-reveal="blur-up">
              <Eyebrow>Why work with me</Eyebrow>
            </div>
            <h2
              id="why-title"
              data-reveal="mask-lines"
              data-delay="100"
              className="mt-3 text-3xl font-bold text-foreground sm:text-4xl md:text-[2.6rem]"
            >
              <MaskLines>One senior engineer, from first call to handover</MaskLines>
            </h2>
            <p
              data-reveal="up"
              data-delay="300"
              className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              I'm {site.name}, a senior .NET developer and AI systems architect. You work directly
              with the person who designs, builds, tests and documents your system — for clients
              across the US, the UK and the Middle East.
            </p>

            {claims.length > 0 && (
              <dl data-reveal="zoom" className="mt-8 grid max-w-lg grid-cols-3 gap-3">
                {claims.map((c) => (
                  <div
                    key={c.label}
                    className="flex flex-col rounded-2xl border border-border bg-panel p-4 shadow-[var(--shadow-card)]"
                  >
                    <dt className="text-[12.5px] leading-snug text-muted-foreground">{c.label}</dt>
                    <dd className="order-first font-display text-2xl font-extrabold tracking-tight text-foreground">
                      <StatValue value={c.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {principles.slice(0, 4).map((p, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <li
                    key={p.title}
                    data-reveal={i % 2 ? "right" : "left"}
                    style={{ "--i": i } as React.CSSProperties}
                    className="flex gap-3"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--blue)_10%,transparent)] text-blue">
                      <Icon size={17} aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-heading text-[15px] font-semibold text-foreground">
                        {p.title}
                      </h3>
                      <p className="mt-0.5 text-[13.5px] leading-relaxed text-muted-foreground">
                        {p.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
