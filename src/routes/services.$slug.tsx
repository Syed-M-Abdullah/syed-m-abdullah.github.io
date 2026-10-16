import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, CheckCircle2, Target } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { ServiceDiagram } from "@/components/service-diagram";
import { ServiceIcon } from "@/components/services";
import { CaseStudyGrid } from "@/components/case-studies";
import { Faq } from "@/components/faq";
import { CtaPanel } from "@/components/cta-panel";
import { ButtonLink } from "@/components/button-link";
import { Chip } from "@/components/badges";
import { getService, services, type Service } from "@/data/services";
import { caseStudiesForService } from "@/data/caseStudies";
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

function ServiceDetail() {
  const { service: s } = Route.useLoaderData();
  const related = caseStudiesForService(s.slug).slice(0, 3);
  const others = services.filter((o) => o.slug !== s.slug);

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
            <ButtonLink to="/contact" search={{ service: s.slug }} size="lg">
              Discuss your {s.shortTitle} project <ArrowRight size={16} aria-hidden />
            </ButtonLink>
            {related.length > 0 && (
              <ButtonLink to="/case-studies" variant="secondary" size="lg">
                Related case studies
              </ButtonLink>
            )}
          </>
        }
        aside={
          <div className="glass rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <ServiceIcon slug={s.slug} size="lg" />
              <div>
                <div className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Service
                </div>
                <div className="font-heading text-lg font-bold text-foreground">{s.title}</div>
              </div>
            </div>
            <div className="mt-6 font-heading text-sm font-semibold text-foreground">Best for</div>
            <ul className="mt-3 space-y-2.5">
              {s.hero.audience.map((a) => (
                <li key={a} className="flex gap-2.5 text-[15px] text-muted-foreground">
                  <Target size={16} className="mt-0.5 shrink-0 text-cyan" aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {/* What it does + when to use it */}
      <Section className="pt-2 md:pt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          <div data-reveal className="panel-border rounded-3xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground">What this service does</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{s.whatItDoes}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background/50 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Problem
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">{s.problem}</p>
              </div>
              <div className="rounded-2xl border border-[color-mix(in_oklab,var(--cyan)_30%,transparent)] bg-[color-mix(in_oklab,var(--cyan)_6%,transparent)] p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-eyebrow">
                  Outcome
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">{s.outcome}</p>
              </div>
            </div>
          </div>
          <div data-reveal className="panel-border rounded-3xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground">When it's the right fit</h2>
            <ul className="mt-5 space-y-3.5">
              {s.whenToUse.map((w) => (
                <li key={w} className="flex gap-3 text-[15px] leading-relaxed text-foreground">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-cyan" aria-hidden />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Use cases */}
      <Section eyebrow="Use cases" title="What I typically build" className="pt-0 md:pt-0">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.useCases.map((u, i) => (
            <li key={u.title} data-reveal className="panel-border rounded-3xl p-6">
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg font-bold text-foreground">{u.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{u.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Architecture + deliverables */}
      <Section
        eyebrow="How it fits together"
        title="Architecture & deliverables"
        className="border-y border-border bg-panel/30"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div data-reveal>
            <ServiceDiagram diagram={s.diagram} />
          </div>
          <div data-reveal className="panel-border rounded-3xl p-6 sm:p-7">
            <h3 className="text-lg font-bold text-foreground">What you receive</h3>
            <ul className="mt-4 space-y-3">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-[15px] leading-relaxed text-foreground">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--cyan)_18%,transparent)] text-cyan">
                    <Check size={12} strokeWidth={3} aria-hidden />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Integrations */}
      <Section eyebrow="Tools & integrations" title="What I work with">
        <div className="grid gap-4 md:grid-cols-3">
          {s.integrations.map((g) => (
            <div key={g.group} data-reveal className="panel-border rounded-3xl p-6">
              <h3 className="font-heading text-base font-semibold text-foreground">{g.group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <Chip key={it} className="text-[12.5px] text-foreground">
                    {it}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Approach */}
      <Section
        eyebrow="Testing & handover"
        title="How I make sure it works"
        className="pt-0 md:pt-0"
      >
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.approach.map((a, i) => (
            <li
              key={a.title}
              data-reveal
              className="relative rounded-3xl border border-border bg-panel/60 p-6"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(135deg,var(--blue),var(--violet))] font-mono text-xs font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-bold text-foreground">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Related work */}
      {related.length > 0 && (
        <Section
          eyebrow="Related work"
          title={`${s.shortTitle} case studies`}
          className="border-t border-border bg-panel/30"
          action={
            <ButtonLink to="/case-studies" variant="secondary">
              All case studies <ArrowRight size={15} aria-hidden />
            </ButtonLink>
          }
        >
          <CaseStudyGrid studies={related} />
        </Section>
      )}

      {/* FAQ */}
      <Section eyebrow="FAQ" title="Common questions">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div data-reveal>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Have a question that isn't here? Ask it in the contact form — there's no obligation.
            </p>
            <div className="mt-6">
              <div className="font-heading text-sm font-semibold text-foreground">
                Other services
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <ButtonLink
                      to="/services/$slug"
                      params={{ slug: o.slug }}
                      variant="secondary"
                      size="sm"
                    >
                      {o.shortTitle}
                    </ButtonLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div data-reveal>
            <Faq items={s.faqs} />
          </div>
        </div>
      </Section>

      <CtaPanel title={s.cta.title} body={s.cta.body} service={s.slug} />
    </PageShell>
  );
}
