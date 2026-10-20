import { headlineClaims, site } from "@/data/site";
import { principles } from "@/data/misc";
import { cn } from "@/lib/utils";
import { Container } from "./section";
import { bandClass, type Tone } from "@/lib/band";
import { MaskLines } from "./reveal-text";
import { PortraitStage } from "./portrait";
import { StatValue } from "./stat-value";
import { ExperienceBar } from "./experience-bar";

/**
 * Trust block for the home page, real facts only: the photo with years of experience under it,
 * who you work with, three confirmed numbers and four working principles. The photo stands on a
 * layered brand card (nothing drawn over it).
 */
export function WhyMe({ tone }: { tone?: Tone }) {
  return (
    <section
      aria-labelledby="why-title"
      className={cn(
        "cv-auto py-16 [contain-intrinsic-size:auto_900px] md:py-24",
        tone && bandClass(tone),
      )}
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="mx-auto w-full max-w-[400px]">
            <div data-reveal="wipe">
              <PortraitStage sizes="(min-width: 1024px) 400px, 80vw" />
            </div>
            <div data-reveal="up" data-delay="200" className="mt-8">
              <ExperienceBar />
            </div>
          </div>

          <div>
            <h2
              id="why-title"
              data-reveal="mask-lines"
              className="text-3xl font-bold text-foreground sm:text-4xl md:text-[2.6rem]"
            >
              <MaskLines>One engineer, from first call to handover</MaskLines>
            </h2>
            <p
              data-reveal="up"
              data-delay="200"
              className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              I'm {site.name}, a full-stack .NET engineer and AI automation architect. The person
              you talk to is the person who designs, builds, tests and documents your system. My
              clients are in the US, the UK and the Middle East.
            </p>

            <dl data-reveal="zoom" className="mt-8 grid max-w-lg grid-cols-3 gap-3">
              {headlineClaims
                .filter((c) => c.verified)
                .map((c) => (
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

            <ul className="mt-9 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {principles.slice(0, 4).map((p, i) => (
                <li
                  key={p.title}
                  data-reveal={i % 2 ? "right" : "left"}
                  style={{ "--i": i } as React.CSSProperties}
                  className="border-t border-border pt-4"
                >
                  <h3 className="font-heading text-[15px] font-semibold text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
