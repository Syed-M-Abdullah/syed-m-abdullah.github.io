import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Handshake, Users } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { ServiceChooserCard, ServiceIcon } from "@/components/services";
import { CtaPanel } from "@/components/cta-panel";
import { ButtonLink } from "@/components/button-link";
import { services } from "@/data/services";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () =>
    seo({
      title: "Business Automation & AI Services",
      description:
        "Business automation with n8n, Zapier and Make, GoHighLevel CRM, lead generation, AI content to WordPress, voice and chat agents and custom .NET software.",
      path: "/services",
    }),
  component: ServicesPage,
});

const audiences = [
  {
    icon: Building2,
    title: "Marketing & AI agencies",
    body: "Implementation capacity for client projects — CRM builds, automations and AI agents delivered to your standard.",
  },
  {
    icon: Handshake,
    title: "GHL providers & consultants",
    body: "A technical partner for the integrations, workflows and edge cases that slow your team down.",
  },
  {
    icon: Users,
    title: "Businesses",
    body: "Direct projects to automate sales, booking, support and operations — or build the software behind them.",
  },
];

function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
        eyebrow="Services"
        title={
          <>
            Choose the system <span className="gradient-text">you need built</span>
          </>
        }
        intro="Each service starts from a business problem, not a tool. Not sure which fits? Describe the problem and I'll point you in the right direction."
        actions={
          <>
            <ButtonLink to="/contact" size="lg">
              Discuss a Project <ArrowRight size={16} aria-hidden />
            </ButtonLink>
            <ButtonLink to="/projects" variant="secondary" size="lg">
              See related work
            </ButtonLink>
          </>
        }
        aside={
          <nav aria-label="Jump to a service" className="glass rounded-3xl p-5">
            <div className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Jump to a service
            </div>
            <ul className="space-y-1.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group flex items-center gap-3 rounded-2xl p-2 transition hover:bg-panel-2/70"
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
          </nav>
        }
      />

      <Section tone="light">
        <div className="space-y-5">
          {services.map((s, i) => (
            <ServiceChooserCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Who I work with"
        title="Agency delivery, white-label or direct"
        intro="Most of my work is with agencies that need dependable implementation — under their brand or alongside their team."
        tone="sage"
      >
        <ul className="grid gap-4 md:grid-cols-3">
          {audiences.map((a, i) => (
            <li
              key={a.title}
              data-reveal="zoom"
              style={{ "--i": i } as React.CSSProperties}
              className="panel-border rounded-3xl p-6"
            >
              <a.icon size={22} className="text-cyan" aria-hidden />
              <h3 className="mt-4 text-lg font-bold text-foreground">{a.title}</h3>
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
        body="Describe the problem in a few sentences — the tools involved and what should happen. I'll suggest the simplest system that solves it."
      />
    </PageShell>
  );
}
