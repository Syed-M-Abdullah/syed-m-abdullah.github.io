import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarClock } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container, Section } from "@/components/section";
import { MaskLines } from "@/components/reveal-text";
import { bandClass } from "@/lib/band";
import { PortraitStage } from "@/components/portrait";
import { CtaPanel } from "@/components/cta-panel";
import { ButtonAnchor, ButtonLink } from "@/components/button-link";
import { ProjectGrid } from "@/components/projects";
import { ToolChip } from "@/components/tool-logo";
import { ExperienceBar } from "@/components/experience-bar";
import { principles } from "@/data/misc";
import { projectsFromDifferentTools } from "@/data/projects";
import { tools } from "@/data/tools";
import { site } from "@/data/site";
import { jsonLd, personJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => {
    const s = seo({
      title: "About Abdullah Bukhari, AI Automation and .NET Engineer",
      description:
        "Full-stack .NET engineer and AI automation architect: 6+ years building business software, 3+ years in AI automation. GoHighLevel, n8n, Make, Zapier, voice AI and custom .NET systems.",
      path: "/about",
      type: "profile",
    });
    return { ...s, scripts: [jsonLd(personJsonLd)] };
  },
  component: AboutPage,
});

/** Three working principles, picked from the full list in data/misc.ts. */
const howIWork = [
  "Written scope before work starts",
  "Built for the unhappy path",
  "You own everything",
].map((t) => principles.find((p) => p.title === t)!);

/** The main tools, one compact row (the full list is on the home page). */
const mainTools = [
  "gohighlevel",
  "n8n",
  "make",
  "zapier",
  "vapi",
  "elevenlabs",
  "openai",
  "claude",
  "aspnetcore",
  "sqlserver",
  "react",
].flatMap((id) => tools.filter((t) => t.id === id));

function AboutPage() {
  const work = projectsFromDifferentTools();
  return (
    <PageShell>
      <section className={`${bandClass("brand")} pt-28 pb-16 md:pt-36 md:pb-20`}>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16">
            <div>
              <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />
              <h1 className="text-[2.4rem] font-extrabold leading-[1.05] text-foreground sm:text-5xl md:text-[3.4rem]">
                {site.name}
              </h1>
              <p className="mt-3 font-heading text-lg font-semibold text-eyebrow md:text-xl">
                {site.title}
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                I build the automation, CRM, voice and chat systems that agencies and service
                businesses run on, and the custom .NET software behind them when a tool runs out of
                road. You work with me directly, from the first call to handover.
              </p>
              <ExperienceBar className="mt-8 max-w-md" />
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonAnchor href={site.calendly} external size="lg">
                  <CalendarClock size={16} aria-hidden /> Book a Call
                </ButtonAnchor>
                <ButtonLink to="/projects/" variant="secondary" size="lg">
                  View My Work <ArrowRight size={16} aria-hidden />
                </ButtonLink>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[400px] lg:mx-0 lg:justify-self-end">
              <PortraitStage priority sizes="(min-width: 1024px) 400px, 80vw" />
            </div>
          </div>
        </Container>
      </section>

      {/* The heading sits with the story (not above the whole grid), so it never floats
          far above the text next to the tall photo. */}
      <Section tone="light" id="story">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
          <div className="max-w-2xl">
            <h2
              id="story-title"
              data-reveal="mask-lines"
              className="text-3xl font-bold text-foreground sm:text-4xl md:text-[2.75rem]"
            >
              <MaskLines>How I got here</MaskLines>
            </h2>
            <div
              data-reveal="up"
              data-delay="200"
              className="mt-6 space-y-5 text-[17px] leading-relaxed text-muted-foreground"
            >
              <p>
                I started in 2020 as a .NET developer, building the software businesses run on: ERP
                modules, point-of-sale systems, web APIs and mobile apps, including e-invoicing for
                Pakistan's FBR and Saudi Arabia's ZATCA.
              </p>
              <p>
                Then I moved into AI automation: GoHighLevel builds, n8n, Make and Zapier workflows,
                voice agents and chatbots. The problems are familiar. Data has to stay consistent
                across systems, integrations fail at the worst moment, and people need to trust what
                the system does.
              </p>
              <p>
                Most of my work now is for agencies and service businesses that need dependable
                implementation. The engineering background is why I treat workflows as software, and
                why I can build a custom API when a no-code tool runs out of road.
              </p>
            </div>
          </div>
          <div data-reveal="right" data-delay="200" className="mx-auto w-full max-w-[320px]">
            <PortraitStage pose="standing" sizes="(min-width: 1024px) 320px, 70vw" />
          </div>
        </div>
      </Section>

      <Section title="How I work" tone="sage">
        <ol className="grid gap-x-10 gap-y-8 md:grid-cols-3">
          {howIWork.map((p, i) => (
            <li
              key={p.title}
              data-reveal="up"
              style={{ "--i": i } as React.CSSProperties}
              className="border-t-2 border-[color-mix(in_oklab,var(--eyebrow)_45%,transparent)] pt-5"
            >
              <span className="font-mono text-xs text-subtle">0{i + 1}</span>
              <h3 className="mt-1 text-lg font-bold text-foreground">{p.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        title="Selected work"
        tone="light"
        action={
          <ButtonLink to="/projects/" variant="secondary">
            All projects <ArrowRight size={15} aria-hidden />
          </ButtonLink>
        }
      >
        <ProjectGrid projects={work} />
        <div data-reveal="up" className="mt-12 border-t border-border pt-8">
          <h3 className="font-heading text-[15px] font-semibold text-foreground">
            Tools I use most
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {mainTools.map((t) => (
              <li key={t.id}>
                <ToolChip tool={t} size="sm" />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaPanel exclude={work.map((p) => p.slug)} />
    </PageShell>
  );
}
