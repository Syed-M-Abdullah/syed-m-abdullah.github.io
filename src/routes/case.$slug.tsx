import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Layers, ListChecks, Target, UserRound, Wrench } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container, Section } from "@/components/section";
import { WorkflowDiagram } from "@/components/workflow-diagram";
import { CaseStudyGrid } from "@/components/case-studies";
import { CtaPanel } from "@/components/cta-panel";
import { ButtonLink } from "@/components/button-link";
import { CategoryBadge, Chip, StatusBadge } from "@/components/badges";
import { NotFoundPage } from "@/components/not-found";
import {
  categoryLabels,
  getCaseStudy,
  relatedCaseStudies,
  verifiedMetrics,
  type CaseStudy,
} from "@/data/caseStudies";
import { services } from "@/data/services";
import { seo } from "@/lib/seo";
import { shotSrcSet } from "@/lib/images";

export const Route = createFileRoute("/case/$slug")({
  loader: ({ params }): { study: CaseStudy } => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return seo({
        title: "Case study not found",
        description: "",
        path: "/case-studies",
        noindex: true,
      });
    }
    const s = loaderData.study;
    const shot = s.screenshots?.[0];
    return seo({
      // Keep "— Case Study" only while the full title stays short enough not to be cut off in search results.
      title: s.title.length <= 28 ? `${s.title} — Case Study` : s.title,
      description: s.summary,
      path: `/case/${params.slug}`,
      type: "article",
      ...(shot
        ? { image: shot.src, imageAlt: shot.alt, imageWidth: shot.width, imageHeight: shot.height }
        : {}),
    });
  },
  component: CaseDetail,
  notFoundComponent: NotFoundPage,
});

function CaseDetail() {
  const { study } = Route.useLoaderData();
  const metrics = verifiedMetrics(study);
  const related = relatedCaseStudies(study);
  const studyServices = study.services
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s) => s !== undefined);
  const primaryService = studyServices[0];

  return (
    <PageShell>
      <article>
        <header className="relative isolate overflow-hidden pt-28 pb-12 md:pt-36 md:pb-16">
          <div aria-hidden className="aurora" />
          <Container>
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Case Studies", to: "/case-studies" },
                { label: study.title },
              ]}
            />
            <div className="flex flex-wrap items-center gap-2">
              <CategoryBadge>{categoryLabels[study.category]}</CategoryBadge>
              <StatusBadge status={study.status} />
            </div>
            <h1 className="mt-5 max-w-4xl text-[2.25rem] font-extrabold leading-[1.08] text-foreground sm:text-5xl md:text-[3.25rem]">
              {study.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {study.summary}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
              <Meta label="Industry" value={study.tag} />
              <Meta label="Location" value={study.location} />
              <Meta
                label="Service area"
                value={studyServices.map((s) => s.shortTitle).join(", ")}
              />
              <Meta
                label="Workflow"
                value={`${study.flow.length} steps · ${study.tools.length} tools`}
              />
            </dl>
          </Container>
        </header>

        <Container className="pb-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
            <div className="min-w-0 space-y-12">
              <Block icon={Target} title="The challenge">
                <p>{study.problem}</p>
              </Block>

              {study.role && (
                <Block icon={UserRound} title="My role">
                  <p>{study.role}</p>
                </Block>
              )}

              <Block icon={Layers} title="Solution & architecture">
                <p>{study.description}</p>
              </Block>

              <section aria-labelledby="workflow-title" data-reveal>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h2 id="workflow-title" className="text-2xl font-bold text-foreground">
                    Workflow
                  </h2>
                  <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
                    Illustrative diagram
                  </span>
                </div>
                <div className="rounded-3xl border border-border bg-panel/60 p-4 sm:p-6">
                  <WorkflowDiagram nodes={study.flow} />
                </div>
              </section>

              {study.screenshots && study.screenshots.length > 0 && (
                <section aria-labelledby="media-title" data-reveal>
                  <h2 id="media-title" className="mb-4 text-2xl font-bold text-foreground">
                    Screenshots
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {study.screenshots.map((img, i) => (
                      <figure
                        key={img.src}
                        className={
                          i === 0 && study.screenshots!.length % 2 === 1 ? "sm:col-span-2" : ""
                        }
                      >
                        <a
                          href={img.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block overflow-hidden rounded-2xl border border-border bg-panel"
                        >
                          <img
                            src={img.src}
                            srcSet={shotSrcSet(img)}
                            sizes={
                              i === 0 && study.screenshots!.length % 2 === 1
                                ? "(min-width: 1024px) 860px, 100vw"
                                : "(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
                            }
                            alt={img.alt}
                            width={img.width}
                            height={img.height}
                            loading="lazy"
                            decoding="async"
                            className="h-auto w-full"
                          />
                        </a>
                        {img.caption && (
                          <figcaption className="mt-2 text-sm text-muted-foreground">
                            {img.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </section>
              )}

              {study.video && (
                <section aria-labelledby="video-title" data-reveal>
                  <h2 id="video-title" className="mb-4 text-2xl font-bold text-foreground">
                    Walkthrough
                  </h2>
                  {study.video.kind === "file" ? (
                    <video
                      controls
                      preload="metadata"
                      poster={study.video.poster}
                      src={study.video.src}
                      className="aspect-video w-full rounded-2xl border border-border bg-black"
                    >
                      <track kind="captions" />
                    </video>
                  ) : (
                    <iframe
                      src={study.video.src}
                      title={study.video.title}
                      loading="lazy"
                      allow="fullscreen; picture-in-picture"
                      className="aspect-video w-full rounded-2xl border border-border"
                    />
                  )}
                </section>
              )}

              {metrics.length > 0 && (
                <section aria-labelledby="results-title" data-reveal>
                  <h2 id="results-title" className="mb-4 text-2xl font-bold text-foreground">
                    Results
                  </h2>
                  <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {metrics.map((m) => (
                      <div key={m.label} className="panel-border rounded-2xl p-5">
                        <dt className="text-sm text-muted-foreground">{m.label}</dt>
                        <dd className="mt-1 font-display text-2xl font-bold text-foreground">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {study.lessons && study.lessons.length > 0 && (
                <Block icon={ListChecks} title="Implementation notes">
                  <ul className="list-disc space-y-2 pl-5">
                    {study.lessons.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </Block>
              )}
            </div>

            <aside className="min-w-0 space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="panel-border rounded-3xl p-6">
                <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-foreground">
                  <Wrench size={16} className="text-cyan" aria-hidden /> Stack
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.tools.map((t) => (
                    <Chip key={t} className="text-[12.5px] text-foreground">
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="panel-border rounded-3xl p-6">
                <h2 className="font-heading text-base font-semibold text-foreground">
                  System details
                </h2>
                <dl className="mt-4 space-y-3">
                  {study.highlights.map((h) => (
                    <div
                      key={h.label}
                      className="flex items-baseline justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="text-sm text-muted-foreground">{h.label}</dt>
                      <dd className="text-right font-heading text-sm font-semibold text-foreground">
                        {h.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="gradient-border rounded-3xl border border-border bg-panel/80 p-6">
                <h2 className="font-heading text-base font-semibold text-foreground">
                  Need something similar?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Tell me about your setup and I'll outline how I'd approach it.
                </p>
                <ButtonLink
                  to="/contact"
                  search={primaryService ? { service: primaryService.slug } : undefined}
                  className="mt-5 w-full"
                >
                  Discuss a similar project <ArrowRight size={15} aria-hidden />
                </ButtonLink>
                {studyServices.map((s) => (
                  <ButtonLink
                    key={s.slug}
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    variant="ghost"
                    className="mt-3 flex w-full justify-start whitespace-normal text-left text-sm text-muted-foreground"
                  >
                    {s.shortTitle} service <ArrowRight size={14} aria-hidden />
                  </ButtonLink>
                ))}
              </div>
            </aside>
          </div>

          <div className="mt-14 border-t border-border pt-8">
            <ButtonLink to="/case-studies" variant="secondary">
              <ArrowLeft size={15} aria-hidden /> All case studies
            </ButtonLink>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <Section
          eyebrow="Related"
          title="Related projects"
          className="border-t border-border bg-panel/30"
        >
          <CaseStudyGrid studies={related} />
        </Section>
      )}

      <CtaPanel
        title="Want a system like this?"
        body="Share what you're working with and what should happen. I'll come back with questions and a suggested approach."
        service={primaryService?.slug}
      />
    </PageShell>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-panel p-4 sm:p-5">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-foreground sm:text-[15px]">{value}</dd>
    </div>
  );
}

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section data-reveal>
      <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--cyan)_12%,transparent)] text-cyan">
          <Icon size={18} aria-hidden />
        </span>
        {title}
      </h2>
      <div className="mt-4 text-[17px] leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
