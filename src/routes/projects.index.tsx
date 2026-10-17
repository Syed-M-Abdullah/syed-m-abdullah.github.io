import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { ProjectsBrowser } from "@/components/projects";
import { CtaPanel } from "@/components/cta-panel";
import { projects } from "@/data/projects";
import { seo } from "@/lib/seo";

type ProjectsSearch = { tool?: string };

export const Route = createFileRoute("/projects/")({
  validateSearch: (search: Record<string, unknown>): ProjectsSearch =>
    typeof search.tool === "string" ? { tool: search.tool } : {},
  head: () =>
    seo({
      title: "Projects — Automation, CRM, Voice & Custom Software",
      description: `${projects.length} projects built with n8n, Make, Zapier, GoHighLevel, AI voice agents and custom .NET software — with screenshots and what was built.`,
      path: "/projects",
    }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { tool } = Route.useSearch();
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Projects" }]}
        eyebrow="Selected work"
        title={
          <>
            Systems I've designed <span className="gradient-text">and built</span>
          </>
        }
        intro={
          <p>
            {projects.length} projects, grouped by the tool they were built with. Open any project
            for the overview, what was built, the tools and screenshots.
          </p>
        }
      />
      <Section tone="light" className="pt-12 md:pt-16">
        <ProjectsBrowser tool={tool} />
      </Section>
      <CtaPanel
        title="Have a similar project in mind?"
        body="Tell me what you're trying to automate or build. I'll tell you how I'd approach it and what it would involve."
      />
    </PageShell>
  );
}
