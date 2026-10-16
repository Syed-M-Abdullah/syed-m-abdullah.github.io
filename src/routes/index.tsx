import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageLoader } from "@/components/page-loader";
import { Hero } from "@/components/hero";
import { CredibilityStrip } from "@/components/credibility-strip";
import { VoiceSamplesSection } from "@/components/voice-samples";
import { Section } from "@/components/section";
import { ServicesGrid } from "@/components/services";
import { TechMarquee } from "@/components/tech-marquee";
import { CaseStudyGrid } from "@/components/case-studies";
import { ProcessOverview, Principles } from "@/components/process";
import { CtaPanel } from "@/components/cta-panel";
import { ButtonLink } from "@/components/button-link";
import { featuredCaseStudies } from "@/data/caseStudies";
import { jsonLd, personJsonLd, seo, websiteJsonLd } from "@/lib/seo";
import { site } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => {
    const s = seo({
      title: `${site.name} — AI Voice Agents & Automation Engineer`,
      description:
        "I build AI voice agents, n8n automations, GoHighLevel systems and API integrations for agencies and businesses — plus custom .NET software. Hear live demos.",
      path: "/",
      type: "profile",
    });
    return { ...s, scripts: [jsonLd(personJsonLd), jsonLd(websiteJsonLd)] };
  },
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <PageLoader />
      <Hero />
      <CredibilityStrip />

      <VoiceSamplesSection />

      <Section
        id="services"
        eyebrow="Services"
        title="What I help you build"
        intro="AI voice and chat agents, automation and the software behind them — for agencies and the businesses they serve."
        action={
          <ButtonLink to="/services" variant="secondary">
            View all services <ArrowRight size={15} aria-hidden />
          </ButtonLink>
        }
      >
        <ServicesGrid tilt />
      </Section>

      <TechMarquee />

      <Section
        id="work"
        eyebrow="Selected work"
        title="Featured projects"
        intro="Real systems, explained: the problem, the architecture and the tools behind each one."
        action={
          <ButtonLink to="/case-studies" variant="secondary">
            View all projects <ArrowRight size={15} aria-hidden />
          </ButtonLink>
        }
        className="border-y border-border bg-panel/30"
      >
        <CaseStudyGrid studies={featuredCaseStudies} reveal="view" />
      </Section>

      <Section
        id="process"
        eyebrow="How I work"
        title="A simple, transparent process"
        intro="From first call to a live system, you work directly with the engineer who designs and builds it."
        action={
          <ButtonLink to="/process" variant="secondary">
            See the full process <ArrowRight size={15} aria-hidden />
          </ButtonLink>
        }
      >
        <ProcessOverview />
      </Section>

      <Section
        id="approach"
        eyebrow="Engineering approach"
        title="Built to keep working after launch"
        intro="Demos are easy. Systems that survive messy data, API outages and staff changes take deliberate engineering."
        className="pt-0 md:pt-0"
      >
        <Principles />
      </Section>

      <CtaPanel />
    </PageShell>
  );
}
