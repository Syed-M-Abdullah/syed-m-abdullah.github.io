import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, CalendarClock } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { Container, Section } from "@/components/section";
import { bandClass, type Tone } from "@/lib/band";
import { ProjectGrid } from "@/components/projects";
import { CtaPanel } from "@/components/cta-panel";
import { ButtonLink } from "@/components/button-link";
import { FaqSection } from "@/components/faq";
import {
  BeforeAfter,
  CapabilityGrid,
  FitAndIncluded,
  ServicePager,
  StepsTimeline,
  WhyThisService,
} from "@/components/service-page";
import { automationPositioning, getService, type Service } from "@/data/services";
import { projectsForService, serviceTool, toolLabels } from "@/data/projects";
import { site } from "@/data/site";
import { toolsFor, tools } from "@/data/tools";
import { buttonClass } from "@/lib/button-class";
import { ServiceVisual } from "@/components/service-visuals";
import { VoiceSamples } from "@/components/voice-samples";
import { LazyMount } from "@/components/lazy-mount";
import { ToolChip } from "@/components/tool-logo";
import { PlatformComparison } from "@/components/platform-comparison";
import { canonicalUrl, faqJsonLd, jsonLd, seo } from "@/lib/seo";
import { NotFoundPage } from "@/components/not-found";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }): { service: Service } => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return seo({ title: "Service not found", description: "", path: "/services", noindex: true });
    }
    const s = loaderData.service;
    const path = `/services/${params.slug}`;
    return {
      ...seo({ title: s.meta.title, description: s.meta.description, path }),
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          serviceType: s.shortTitle,
          description: s.meta.description,
          url: canonicalUrl(path),
          provider: { "@type": "Person", name: site.name, url: `${site.url}/` },
        }),
        jsonLd(faqJsonLd(s.faqs)),
      ],
    };
  },
  component: ServiceDetail,
  notFoundComponent: NotFoundPage,
});

/** Off-white and sage take turns between brand bands, so no two neighbours share a tone. */
function toneCycle() {
  let i = 0;
  return (): Tone => (i++ % 2 === 0 ? "light" : "sage");
}

/**
 * Service page, in the order a buyer decides: the promise (hero) → what changes → what I build
 * → (comparison) → who it's for and what's included → real work → how it works → why me → FAQ
 * → call to action.
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
          { label: "Services", to: "/services/" },
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
            <ButtonLink to="/contact/" search={{ service: s.slug }} variant="secondary" size="lg">
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
          title="Real voice agent recordings"
          intro="Press play. One sample plays at a time."
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

      <Section id="changes" tone={next()} title="What changes for your business">
        <BeforeAfter items={s.beforeAfter} />
      </Section>

      <Section id="build" tone={next()} title="What I build">
        <CapabilityGrid service={s} />
      </Section>

      {isAutomation && (
        <Section
          id="compare"
          tone={next()}
          title="n8n, Zapier or Make: which fits your business?"
          intro={automationPositioning}
        >
          <PlatformComparison />
        </Section>
      )}

      <section aria-labelledby="fit-title" className={`${bandClass(next())} py-16 md:py-24`}>
        <Container>
          <FitAndIncluded service={s} tools={serviceTools} />
        </Container>
      </section>

      {related.length > 0 && (
        <Section
          id="work"
          tone={next()}
          title="Recent work like this"
          intro="Real projects, with screenshots and a short write-up of each."
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

      <Section
        id="steps"
        tone="brand"
        angle
        title="Three steps to a live system"
        intro="Clear milestones, and something you can see and test at every step."
        align="center"
      >
        <StepsTimeline steps={s.steps} />
      </Section>

      <section aria-labelledby="why-title" className={`${bandClass(next())} py-16 md:py-24`}>
        <Container>
          <WhyThisService service={s} />
        </Container>
      </section>

      <FaqSection id="service-faq" title="Common questions" faqs={s.faqs} tone={next()}>
        <ServicePager slug={s.slug} />
      </FaqSection>

      <CtaPanel
        title={s.cta.title}
        body={s.cta.body}
        service={s.slug}
        exclude={related.map((p) => p.slug)}
      />
    </PageShell>
  );
}
