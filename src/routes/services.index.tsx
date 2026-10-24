import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { Container, Section } from "@/components/section";
import { ServiceChooserCard, ServiceIcon, StageHeading } from "@/components/services";
import { CtaPanel } from "@/components/cta-panel";
import { ButtonLink } from "@/components/button-link";
import { groupOrder, serviceGroups, services, servicesInGroup } from "@/data/services";
import { bandClass } from "@/lib/band";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () =>
    seo({
      title: "Services: Lead Generation, CRM, AI Agents, Automation and Software",
      description:
        "Ten services in three stages: lead generation, websites and AI content to get more leads; GoHighLevel CRM, voice and chat agents to convert them; automation, custom .NET software, React Native apps and website care to run the business.",
      path: "/services",
    }),
  component: ServicesPage,
});

const audiences = [
  {
    title: "Marketing & AI agencies",
    body: "Implementation capacity for client projects: CRM builds, automations and AI agents delivered to your standard.",
  },
  {
    title: "GHL providers & consultants",
    body: "A technical partner for the integrations, workflows and edge cases that slow your team down.",
  },
  {
    title: "Businesses",
    body: "Direct projects to automate sales, booking, support and operations, or to build the software behind them.",
  },
];

/** Global position in the journey order, so cards are numbered 01 to 10 across the stages. */
const position = (slug: string) => services.findIndex((s) => s.slug === slug);

function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
        title="Ten services, organised by the result you need"
        intro="Find your stage: getting more leads, converting every enquiry, or automating the work behind them. Each service is built in your accounts, documented and handed over. Not sure where you fit? Describe the problem and I'll point you to the right one."
        actions={
          <>
            <ButtonLink to="/contact/" size="lg">
              Discuss a Project <ArrowRight size={16} aria-hidden />
            </ButtonLink>
            <ButtonLink to="/projects/" variant="secondary" size="lg">
              See related work
            </ButtonLink>
          </>
        }
        aside={
          <nav aria-label="Services by stage" className="panel-border rounded-3xl p-5">
            <ol className="space-y-4">
              {groupOrder.map((g) => (
                <li key={g}>
                  <a
                    href={`#stage-${g}`}
                    className="flex items-center gap-2.5 rounded-lg px-2 font-heading text-[13px] font-semibold text-subtle hover:text-foreground"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-[#2563eb] text-[11px] font-bold text-white">
                      {serviceGroups[g].n}
                    </span>
                    {serviceGroups[g].title}
                  </a>
                  <ul className="mt-1.5 space-y-0.5">
                    {servicesInGroup(g).map((s) => (
                      <li key={s.slug}>
                        <Link
                          to="/services/$slug/"
                          params={{ slug: s.slug }}
                          className="group flex items-center gap-3 rounded-2xl p-1.5 transition hover:bg-panel-2/70"
                        >
                          <ServiceIcon slug={s.slug} size="sm" />
                          <span className="flex-1 font-heading text-sm font-semibold text-foreground">
                            {s.title}
                          </span>
                          <ArrowRight
                            size={15}
                            aria-hidden
                            className="text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-cyan"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </nav>
        }
      />

      {groupOrder.map((g, gi) => {
        const list = servicesInGroup(g);
        return (
          <section
            key={g}
            id={`stage-${g}`}
            aria-labelledby={`stage-${g}-title`}
            className={`${bandClass(gi % 2 ? "sage" : "light")} scroll-mt-20 py-16 md:py-24`}
          >
            <Container>
              <StageHeading group={g} count={list.length} />
              <div className="space-y-5">
                {list.map((s) => (
                  <ServiceChooserCard key={s.slug} service={s} index={position(s.slug)} />
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      <Section
        title="Agency delivery, white-label or direct"
        intro="Most of my work is with agencies that need dependable implementation, under their brand or alongside their team."
        tone="sage"
      >
        <ul className="grid gap-x-10 gap-y-8 md:grid-cols-3">
          {audiences.map((a, i) => (
            <li
              key={a.title}
              data-reveal="up"
              style={{ "--i": i } as React.CSSProperties}
              className="border-t-2 border-[color-mix(in_oklab,var(--eyebrow)_45%,transparent)] pt-5"
            >
              <h3 className="text-lg font-bold text-foreground">{a.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{a.body}</p>
            </li>
          ))}
        </ul>
        <p
          data-reveal="up"
          className="mt-8 max-w-3xl text-[15px] leading-relaxed text-muted-foreground"
        >
          <strong className="font-semibold text-foreground">How white-label works:</strong> I build
          inside the accounts you or your client provide, follow your naming and handover
          conventions, and we agree up front whether I speak to your client directly or only through
          you.
        </p>
      </Section>

      <CtaPanel
        title="Not sure which service fits?"
        body="Describe the problem in a few sentences: the tools involved and what should happen. I'll suggest the simplest system that solves it."
      />
    </PageShell>
  );
}
