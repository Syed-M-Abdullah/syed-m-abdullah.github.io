import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CaseStudiesBrowser } from "@/components/case-studies";
import { CtaPanel } from "@/components/cta-panel";
import { caseStudies } from "@/data/caseStudies";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/case-studies")({
  head: () =>
    seo({
      title: "Case Studies: Automation & AI Projects",
      description:
        "Voice agents, n8n and GoHighLevel automations, AI chatbots and .NET systems — each case study covers the problem, the workflow and the stack.",
      path: "/case-studies",
    }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Case Studies" }]}
        eyebrow="Selected work"
        title={
          <>
            Systems I've designed <span className="gradient-text">and built</span>
          </>
        }
        intro={
          <p>
            {caseStudies.length} projects across AI voice agents, workflow automation, CRM, chatbots
            and custom software. Pick a category, then open any project for the problem, workflow
            and stack.
          </p>
        }
      />
      <Section className="pt-0 md:pt-0">
        <CaseStudiesBrowser />
        <p className="mt-10 flex max-w-3xl gap-2.5 text-sm leading-relaxed text-muted-foreground">
          <Info size={16} className="mt-0.5 shrink-0 text-cyan" aria-hidden />
          Cards show a real screenshot where one can be shared. Otherwise they show a simplified
          diagram of the system's workflow — an illustration, not a product screenshot.
        </p>
      </Section>
      <CtaPanel
        title="Have a similar project in mind?"
        body="Tell me what you're trying to automate or build. I'll tell you how I'd approach it and what it would involve."
      />
    </PageShell>
  );
}
