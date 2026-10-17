import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, Check } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { type Tone } from "@/lib/band";
import { ProjectGrid } from "@/components/projects";
import { CtaPanel } from "@/components/cta-panel";
import { ButtonLink } from "@/components/button-link";
import { Eyebrow } from "@/components/badges";
import { MaskLines } from "@/components/reveal-text";
import { DrawLine } from "@/components/process";
import { automationPositioning, getService, type Service } from "@/data/services";
import { projectsForService, serviceTool, toolLabels } from "@/data/projects";
import { site } from "@/data/site";
import { toolsFor, tools } from "@/data/tools";
import { buttonClass } from "@/lib/button-class";
import { ServiceVisual } from "@/components/service-visuals";
import { VoiceSamples } from "@/components/voice-samples";
import { LazyMount } from "@/components/lazy-mount";
import { ToolChip } from "@/components/tech-marquee";
import { PlatformComparison } from "@/components/platform-comparison";
import { seo } from "@/lib/seo";
import { NotFoundPage } from "@/components/not-found";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }): { service: Service } => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? seo({
          title: loaderData.service.meta.title,
          description: loaderData.service.meta.description,
          path: `/services/${params.slug}`,
        })
      : seo({ title: "Service not found", description: "", path: "/services", noindex: true }),
  component: ServiceDetail,
  notFoundComponent: NotFoundPage,
});

/** Off-white and sage take turns between brand bands, so no two neighbours share a tone. */
function toneCycle() {
  let i = 0;
  return (): Tone => (i++ % 2 === 0 ? "light" : "sage");
}

/**
 * Service page: hero with its own animation → the problem → what I build → (comparison) →
 * how it works → what you get + tools → related projects → call to action.
 */
function ServiceDetail() {
  const { service: s } = Route.useLoaderData();
  const related = projectsForService(s.slug).slice(0, 3);
  const relatedTool = serviceTool[s.slug];
  const serviceTools = toolsFor(s.slug);
  const next = toneCycle();
  const isVoice = s.slug === "voice-ai";
  const isAutomation = s.slug === "workflow-automation";

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: s.shortTitle },
        ]}
        eyebrow={s.eyebrow}
        title={s.hero.title}
        intro={<p>{s.hero.intro}</p>}
        actions={
          <>
            <a href={site.calendly} data-magnetic className={buttonClass("primary", "lg")}>
              <CalendarClock size={16} aria-hidden /> Book a Call
            </a>
            <ButtonLink to="/contact" search={{ service: s.slug }} variant="secondary" size="lg">
              Discuss your project <ArrowRight size={16} aria-hidden />
            </ButtonLink>
          </>
        }
        aside={<ServiceVisual slug={s.slug} />}
      />

      {isVoice && (
        <Section
          id="voice-demos"
          tone={next()}
          eyebrow="Hear them live"
          title="Real voice agent recordings"
          intro="Press play — one sample plays at a time."
        >
          <LazyMount className="min-h-[440px] md:min-h-[270px]">
            <VoiceSamples />
          </LazyMount>
          <ul
            className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-2"
            aria-label="Voice platforms"
          >
            {["vapi", "elevenlabs", "synthflow"].map((id) => {
              const t = tools.find((x) => x.id === id);
              return t ? (
                <li key={id}>
                  <ToolChip tool={t} size="sm" />
                </li>
              ) : null;
            })}
          </ul>
        </Section>
      )}

      {/* The problem — two lines, in the client's words */}
      <section aria-labelledby="problem-title" className={`band tone-${next()} py-14 md:py-20`}>
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
          <div data-reveal="blur-up">
            <Eyebrow className="mb-4">
              <span id="problem-title">The problem</span>
            </Eyebrow>
          </div>
          <p
            data-reveal="mask-lines"
            data-delay="100"
            className="text-2xl font-bold leading-snug text-foreground sm:text-[2rem]"
          >
            <MaskLines>{s.problem[0]}</MaskLines>
          </p>
          <p
            data-reveal="up"
            data-delay="400"
            className="mt-3 text-xl leading-snug text-muted-foreground sm:text-[1.6rem]"
          >
            {s.problem[1]}
          </p>
        </div>
      </section>

      <Section tone={next()} eyebrow="What I build" title="Systems that fix it">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.build.map((b, i) => (
            <li
              key={b.title}
              data-reveal={i % 2 ? "right" : "left"}
              style={{ "--i": i % 3 } as React.CSSProperties}
              className="panel-border panel-border-hover rounded-3xl p-6"
            >
              <span className="font-mono text-xs text-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg font-bold text-foreground">{b.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{b.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {isAutomation && (
        <Section
          id="compare"
          tone={next()}
          eyebrow="n8n vs Zapier vs Make"
          title="Which platform fits your business?"
          intro={automationPositioning}
        >
          <PlatformComparison />
        </Section>
      )}

      <Section
        tone="brand"
        angle
        eyebrow="How it works"
        title="Three steps to a live system"
        align="center"
      >
        <ol className="relative grid gap-5 md:grid-cols-3">
          <DrawLine className="absolute top-7 right-[16%] left-[16%] hidden w-[68%] md:block" />
          {s.steps.map((st, i) => (
            <li
              key={st.title}
              data-reveal="up"
              style={{ "--i": i * 2 } as React.CSSProperties}
              className="relative flex flex-col items-center text-center"
            >
              <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[linear-gradient(135deg,#2563eb,#7c3aed)] font-heading text-lg font-bold text-white shadow-[0_0_0_6px_rgba(99,102,241,0.18),0_14px_30px_-12px_rgba(79,70,229,0.9)]">
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold text-foreground">{st.title}</h3>
              <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
                {st.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone={next()} eyebrow="What you get" title="Outcomes you can count on">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
          <ul className="grid h-fit gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {s.outcomes.map((o, i) => (
              <li
                key={o}
                data-reveal="left"
                style={{ "--i": i } as React.CSSProperties}
                className="flex gap-3 rounded-2xl border border-border bg-panel p-4 text-[15px] leading-snug text-foreground shadow-[var(--shadow-card)]"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--success)_14%,transparent)] text-success">
                  <Check size={12} strokeWidth={3} aria-hidden />
                </span>
                {o}
              </li>
            ))}
          </ul>
          {serviceTools.length > 0 && (
            <div
              data-reveal="right"
              data-delay="200"
              className="panel-border h-fit rounded-3xl p-6 sm:p-7"
            >
              <h3 className="text-lg font-bold text-foreground">Tools I use for this</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {serviceTools.map((t) => (
                  <li key={t.id}>
                    <ToolChip tool={t} size="sm" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Section>

      {related.length > 0 && (
        <Section
          tone={next()}
          eyebrow="Related work"
          title={`${s.shortTitle} projects`}
          action={
            <a
              href={relatedTool ? `/projects/?tool=${relatedTool}` : "/projects/"}
              className={buttonClass("secondary", "md")}
            >
              {relatedTool ? `All ${toolLabels[relatedTool]} projects` : "All projects"}{" "}
              <ArrowRight size={15} aria-hidden />
            </a>
          }
        >
          <ProjectGrid projects={related} />
        </Section>
      )}

      <CtaPanel title={s.cta.title} body={s.cta.body} service={s.slug} />
    </PageShell>
  );
}
