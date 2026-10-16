import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Linkedin, MapPin } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container, Section } from "@/components/section";
import { Eyebrow, Chip } from "@/components/badges";
import { Portrait } from "@/components/portrait";
import { Principles } from "@/components/process";
import { ExperienceTimeline } from "@/components/experience";
import { CtaPanel } from "@/components/cta-panel";
import { ButtonAnchor, ButtonLink } from "@/components/button-link";
import { automationStart, careerStart, toolGroups, yearsSince } from "@/data/misc";
import { site } from "@/data/site";
import { jsonLd, personJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => {
    const s = seo({
      title: "About — AI Automation & .NET Engineer",
      description: `${site.name} is an AI automation engineer and .NET developer in ${site.locality}, Pakistan, building GoHighLevel, n8n, voice AI and custom software for agencies.`,
      path: "/about",
      type: "profile",
    });
    return { ...s, scripts: [jsonLd(personJsonLd)] };
  },
  component: AboutPage,
});

const problems = [
  "Integrations between tools that were never designed to talk to each other",
  "Lead flows where speed matters and nothing can fall through the cracks",
  "Voice and chat agents that need real business data, not just a script",
  "Processes that have outgrown spreadsheets and copy-paste",
];

function AboutPage() {
  const years = yearsSince(careerStart);
  const automationYears = yearsSince(automationStart);
  return (
    <PageShell>
      <section className="relative isolate overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20">
        <div aria-hidden className="aurora" />
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
            <div className="relative mx-auto w-full max-w-md lg:order-last">
              <div
                aria-hidden
                className="absolute inset-[6%] -z-10 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--violet)_38%,transparent),transparent),radial-gradient(closest-side_at_35%_65%,color-mix(in_oklab,var(--blue)_36%,transparent),transparent)] blur-2xl"
              />
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                className="absolute inset-0 -z-10 h-full w-full"
              >
                <circle
                  cx="50"
                  cy="52"
                  r="45"
                  fill="none"
                  stroke="color-mix(in oklab, var(--violet) 45%, transparent)"
                  strokeWidth="0.35"
                  strokeDasharray="0.6 2.2"
                  className="ring-spin origin-center"
                />
              </svg>
              <div className="aspect-square [mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
                <Portrait priority sizes="(min-width: 1024px) 448px, 90vw" />
              </div>
            </div>
            <div>
              <Eyebrow className="mb-4">About</Eyebrow>
              <h1 className="text-[2.25rem] font-extrabold leading-[1.08] text-foreground sm:text-5xl md:text-[3.25rem]">
                Engineer first. <span className="gradient-text">Automation specialist</span> by
                focus.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                I'm {site.name} — an AI automation engineer and full-stack .NET developer based in{" "}
                {site.locality}, Pakistan, working remotely with agencies and businesses. I build
                GoHighLevel systems, n8n workflows, voice and chat agents, and the custom software
                behind them when it's needed.
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
                <li className="glass rounded-2xl p-4">
                  <div className="font-display text-2xl font-bold text-foreground">
                    {years}+ yrs
                  </div>
                  <div className="text-sm text-muted-foreground">Software development</div>
                </li>
                <li className="glass rounded-2xl p-4">
                  <div className="font-display text-2xl font-bold text-foreground">
                    {automationYears}+ yrs
                  </div>
                  <div className="text-sm text-muted-foreground">AI & automation focus</div>
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink to="/contact" size="lg">
                  Discuss a Project <ArrowRight size={16} aria-hidden />
                </ButtonLink>
                <ButtonAnchor href={site.linkedin} external variant="secondary" size="lg">
                  <Linkedin size={16} aria-hidden /> LinkedIn
                </ButtonAnchor>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={15} className="text-cyan" aria-hidden /> {site.location}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Section
        eyebrow="My path"
        title="From business software to automation"
        className="pt-4 md:pt-8"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div data-reveal className="space-y-5 text-[17px] leading-relaxed text-muted-foreground">
            <p>
              I started in 2020 as a .NET developer, building the software businesses run on: ERP
              modules, point-of-sale systems, web APIs and mobile apps. That work covered
              multi-warehouse inventory, financial reporting, payment and shipping integrations, and
              e-invoicing integrations with Pakistan's FBR and Saudi Arabia's ZATCA.
            </p>
            <p>
              In 2024 I began focusing on AI automation — GoHighLevel builds, n8n workflows, voice
              agents and chatbots. The tools are newer, but the problems are familiar: data that has
              to stay consistent across systems, integrations that fail at the worst moment, and
              people who need to trust what the system does.
            </p>
            <p>
              Today most of my work is with agencies that need dependable implementation for their
              clients. The engineering background still matters: it's why I treat workflows as
              software, and why I can build a custom API when a no-code tool runs out of road.
            </p>
          </div>
          <div data-reveal className="panel-border h-fit rounded-3xl p-6 sm:p-7">
            <h3 className="text-lg font-bold text-foreground">Problems I like solving</h3>
            <ul className="mt-4 space-y-3">
              {problems.map((p) => (
                <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-foreground">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Engineering values"
        title="How I approach every build"
        className="border-y border-border bg-panel/30"
      >
        <Principles />
      </Section>

      <Section
        eyebrow="Toolkit"
        title="Tools I work with"
        intro="Grouped by what they're used for — not a logo wall."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {toolGroups.map((g) => (
            <div key={g.title} data-reveal className="panel-border rounded-3xl p-6">
              <h3 className="font-heading text-base font-semibold text-foreground">{g.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((t) => (
                  <Chip key={t} className="text-[12.5px] text-foreground">
                    {t}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Experience" title="Where I've worked" className="pt-0 md:pt-0">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div data-reveal>
            <ExperienceTimeline />
          </div>
          <div data-reveal className="glass h-fit rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-foreground">Working with me</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              You work directly with me from the first call to handover — no account managers in
              between. I'm comfortable working inside an agency's process and brand, or directly
              with a business owner.
            </p>
            <ButtonLink to="/process" variant="secondary" className="mt-6">
              See how I work <ArrowRight size={15} aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </Section>

      <CtaPanel />
    </PageShell>
  );
}
