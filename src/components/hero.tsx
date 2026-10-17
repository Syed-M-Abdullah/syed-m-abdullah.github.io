import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, CalendarClock, Headphones } from "lucide-react";
import type { ServiceSlug } from "@/data/services";
import { headlineClaims, site } from "@/data/site";
import { buttonClass } from "@/lib/button-class";
import { Container } from "./section";
import { bandClass } from "@/lib/band";
import { HeroVisual } from "./hero-visual";
import { StatValue } from "./stat-value";

const lineOne = ["Automate", "Your", "Business", "Operations", "with"];
const lineGradient = ["Intelligent", "Systems"];

/** Capability chips under the subheadline — each opens its service page. */
const capabilities: { label: string; slug: ServiceSlug }[] = [
  { label: "Lead Generation", slug: "lead-generation" },
  { label: "CRM & GoHighLevel", slug: "gohighlevel-automation" },
  { label: "n8n / Zapier / Make", slug: "workflow-automation" },
  { label: "AI Content to WordPress", slug: "ai-content-automation" },
  { label: "AI Voice Agents", slug: "voice-ai" },
  { label: "Custom Software", slug: "custom-software" },
];

/**
 * Words reveal one by one after the page loader lifts (html[data-ready]); without JS they're
 * simply visible. With `gradient`, each word paints its slice of one wide gradient so the colour
 * flows across the phrase while every word animates independently.
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
        <Fragment key={w}>
          <span
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
          </span>
          {/* The space sits between the inline-blocks — inside one it would be trimmed. */}
          {i < n - 1 ? " " : ""}
        </Fragment>
      ))}
    </>
  );
}

export function Hero() {
  const claims = headlineClaims.filter((c) => c.verified);
  return (
    <section
      aria-labelledby="hero-title"
      data-pause-offscreen
      className={`${bandClass("brand")} overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20`}
    >
      <div aria-hidden className="hero-bg" />
      <div aria-hidden className="hero-grid" />
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-12">
          <div>
            <p className="hero-fade inline-flex items-center gap-2.5 rounded-full border border-border bg-[rgba(255,255,255,0.06)] px-3.5 py-1.5 font-heading text-[12.5px] font-semibold text-foreground">
              <span aria-hidden className="hero-live-dot" />
              AI Automation &amp; Intelligent Business Systems
            </p>
            <h1
              id="hero-title"
              className="mt-6 text-[2.3rem] font-extrabold leading-[1.07] tracking-[-0.035em] text-foreground sm:text-[3rem] lg:text-[3.05rem] xl:text-[3.4rem]"
            >
              <Words words={lineOne} />{" "}
              <Words words={lineGradient} offset={lineOne.length} gradient />
            </h1>
            <p
              className="hero-fade mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              style={{ "--d": 420 } as React.CSSProperties}
            >
              From lead generation and CRM follow-ups to AI content pipelines and voice agents, I
              build systems that run your operations without manual work.
            </p>

            <ul
              className="hero-fade mt-6 flex max-w-xl flex-wrap gap-2"
              aria-label="What I build"
              style={{ "--d": 500 } as React.CSSProperties}
            >
              {capabilities.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: c.slug }}
                    className="hero-cap inline-flex items-center rounded-full border border-border px-3 py-1.5 font-heading text-[12.5px] font-semibold text-foreground"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div
              className="hero-fade mt-8 flex flex-wrap items-center gap-3"
              style={{ "--d": 580 } as React.CSSProperties}
            >
              <a href="#services" data-magnetic className={buttonClass("primary", "lg")}>
                Explore Solutions <ArrowDown size={16} aria-hidden />
              </a>
              <a
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className={buttonClass("secondary", "lg")}
              >
                <CalendarClock size={16} aria-hidden /> Book a Call
              </a>
            </div>
            <a
              href="#voice-demos"
              className="hero-fade mt-4 inline-flex items-center gap-2 rounded-md font-heading text-[13.5px] font-semibold text-eyebrow hover:underline"
              style={{ "--d": 640 } as React.CSSProperties}
            >
              <Headphones size={15} aria-hidden /> Hear a live voice demo
            </a>

            {claims.length > 0 && (
              <dl
                className="hero-fade mt-9 grid max-w-lg grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-[rgba(255,255,255,0.05)] py-4"
                style={{ "--d": 720 } as React.CSSProperties}
              >
                {claims.map((c) => (
                  <div key={c.label} className="flex flex-col px-4 sm:px-5">
                    <dt className="text-[12px] leading-snug text-muted-foreground sm:text-[13px]">
                      {c.label}
                    </dt>
                    <dd className="order-first font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-[1.75rem]">
                      <StatValue value={c.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {/* Top-aligned with an offset (not centred): when the web fonts swap in and the
              headline re-wraps, the visual stays put instead of shifting. */}
          <div className="lg:pt-16">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
