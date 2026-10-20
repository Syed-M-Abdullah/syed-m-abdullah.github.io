import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Hero } from "@/components/hero";
import { HomeFaq, ProblemSolution, TrustStrip } from "@/components/home-sections";
import { VoiceSamplesSection } from "@/components/voice-samples";
import { Section } from "@/components/section";
import { ServicesBento } from "@/components/services";
import { TechMarquee } from "@/components/tech-marquee";
import { ComparisonTeaser } from "@/components/platform-comparison";
import { ProjectGrid, ToolLinks } from "@/components/projects";
import { WhyMe } from "@/components/why-me";
import { ProcessOverview } from "@/components/process";
import { CtaPanel } from "@/components/cta-panel";
import { ButtonLink } from "@/components/button-link";
import { featuredProjects, projects } from "@/data/projects";
import { homeFaqs } from "@/data/misc";
import { faqJsonLd, jsonLd, personJsonLd, seo, websiteJsonLd } from "@/lib/seo";
import { site } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => {
    const s = seo({
      title: `${site.name}, AI Automation Engineer for Agencies and Service Businesses`,
      description: `I build automations in n8n, Zapier and Make, GoHighLevel CRM workflows, lead generation, AI content pipelines, voice and chat agents, and custom .NET software. See ${projects.length} real projects.`,
      path: "/",
      type: "profile",
    });
    return {
      ...s,
      scripts: [jsonLd(personJsonLd), jsonLd(websiteJsonLd), jsonLd(faqJsonLd(homeFaqs))],
    };
  },
  component: Index,
});

/**
 * Section rhythm: brand → off-white → sage → brand …, never two of the same tone in a row
 * (see "Section rhythm" in styles.css).
 */
function Index() {
  return (
    <PageShell>
      <Hero />
      <TrustStrip />
      <ProblemSolution />

      <Section
        id="services"
        tone="brand"
        className="cv-auto"
        title="Systems that run your operations"
        intro="Automation first, then the CRM, leads, content, calls and chats it connects."
        action={
          <ButtonLink to="/services/" variant="secondary">
            All services <ArrowRight size={15} aria-hidden />
          </ButtonLink>
        }
      >
        <ServicesBento />
      </Section>

      <TechMarquee tone="light" />

      <Section
        id="platforms"
        tone="sage"
        className="cv-auto"
        eyebrow="Choosing a platform"
        title="n8n, Zapier or Make? I'll help you choose"
      >
        <ComparisonTeaser />
      </Section>

      <VoiceSamplesSection tone="brand" />

      <Section
        id="work"
        tone="light"
        title="Selected projects"
        intro="Real systems, explained: the problem, the build and the tools behind each one."
        action={
          <ButtonLink to="/projects/" variant="secondary">
            View all {projects.length} projects <ArrowRight size={15} aria-hidden />
          </ButtonLink>
        }
        className="cv-auto"
      >
        <ToolLinks className="-mt-2 mb-8" />
        <ProjectGrid projects={featuredProjects} />
      </Section>

      <Section
        id="process"
        tone="brand"
        angle
        className="cv-auto"
        title="How a project runs"
        intro="From first call to a live system, you work directly with the engineer who builds it."
        action={
          <ButtonLink to="/process/" variant="secondary">
            See the full process <ArrowRight size={15} aria-hidden />
          </ButtonLink>
        }
      >
        <ProcessOverview />
      </Section>

      <WhyMe tone="sage" />

      <HomeFaq tone="light" />

      <CtaPanel exclude={featuredProjects.map((p) => p.slug)} />
    </PageShell>
  );
}
