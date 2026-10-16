import { Link } from "@tanstack/react-router";
import { CalendarClock, Headphones } from "lucide-react";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { buttonClass } from "@/lib/button-class";
import { Container } from "./section";
import { Eyebrow } from "./badges";
import { Portrait } from "./portrait";
import { ServiceIcon } from "./services";

const lineOne = ["Systems", "That"];
const lineTwo = ["Turn", "Ideas", "Into", "Results."];

/**
 * Words reveal one by one after the page loader lifts (html[data-ready]); without JS they're
 * simply visible. The paragraph and portrait are never hidden, so they paint immediately.
 */
function Words({
  words,
  offset = 0,
  gradient = false,
}: {
  words: string[];
  offset?: number;
  gradient?: boolean;
}) {
  const n = words.length;
  return (
    <>
      {words.map((w, i) => (
        <span
          key={w}
          // With a gradient, each word paints its own slice of one wide gradient, so the colour
          // flows across the line while every word can still animate independently.
          className={gradient ? "hero-word gradient-text" : "hero-word"}
          style={
            {
              "--i": offset + i,
              ...(gradient && {
                backgroundSize: `${n * 100}% 100%`,
                backgroundPosition: `${n > 1 ? (i / (n - 1)) * 100 : 0}% 0`,
              }),
            } as React.CSSProperties
          }
        >
          {w}
          {i < n - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 pb-12 md:pt-36 md:pb-16"
    >
      <div aria-hidden className="aurora [&::after]:hidden" />
      <div aria-hidden className="hero-grid" />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-8">
          <div>
            <Eyebrow className="hero-fade rounded-full border border-border bg-panel/60 px-3.5 py-1.5 backdrop-blur">
              AI Voice Agents · Automation · Software
            </Eyebrow>
            <h1
              id="hero-title"
              className="mt-6 text-[2.5rem] font-extrabold leading-[1.06] tracking-[-0.035em] text-foreground sm:text-[3.25rem] lg:text-[3.05rem] xl:text-[3.3rem]"
            >
              <span className="block">
                <Words words={lineOne} />
              </span>{" "}
              <span className="block">
                <Words words={lineTwo} offset={lineOne.length} gradient />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I build AI voice agents, n8n automations and GoHighLevel systems for agencies and
              businesses — engineered for real-world operations, not just demos. With full-stack
              .NET engineering when a project needs it.
            </p>
            <div
              className="hero-fade mt-8 flex flex-wrap gap-3"
              style={{ "--d": 520 } as React.CSSProperties}
            >
              <a href="#voice-demos" data-magnetic className={buttonClass("primary", "lg")}>
                <Headphones size={17} aria-hidden /> Hear a Live Demo
              </a>
              <a href={site.calendly} data-magnetic className={buttonClass("secondary", "lg")}>
                <CalendarClock size={16} aria-hidden /> Book a Call
              </a>
            </div>

            <ul
              className="hero-fade mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
              style={{ "--d": 680 } as React.CSSProperties}
              aria-label="Core services"
            >
              {services.slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="glass flex h-full items-center gap-2.5 rounded-2xl p-2.5 transition hover:border-cyan/50"
                  >
                    <ServiceIcon slug={s.slug} size="sm" />
                    <span className="min-w-0 text-[12.5px] leading-tight">
                      <span className="block font-heading font-semibold text-foreground">
                        {s.shortTitle}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[460px] lg:mr-0 lg:max-w-[540px]">
            {/* glow + rings behind the cutout portrait (no overlays on the photo) */}
            <div
              aria-hidden
              className="absolute inset-[6%] -z-10 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--violet)_40%,transparent),transparent),radial-gradient(closest-side_at_35%_65%,color-mix(in_oklab,var(--blue)_38%,transparent),transparent)] blur-2xl"
            />
            <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 -z-10 h-full w-full">
              <circle
                cx="50"
                cy="52"
                r="46"
                fill="none"
                stroke="color-mix(in oklab, var(--blue) 30%, transparent)"
                strokeWidth="0.3"
              />
              <circle
                cx="50"
                cy="52"
                r="39"
                fill="none"
                stroke="color-mix(in oklab, var(--violet) 45%, transparent)"
                strokeWidth="0.35"
                strokeDasharray="0.6 2.2"
                className="ring-spin origin-center"
              />
            </svg>
            <div className="aspect-square [mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
              <Portrait priority sizes="(min-width: 1024px) 540px, 85vw" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
