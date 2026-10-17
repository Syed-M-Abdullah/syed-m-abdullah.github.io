import { lazy, Suspense, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarClock, Check, Expand } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container, Section } from "@/components/section";
import { CtaPanel } from "@/components/cta-panel";
import { ButtonAnchor } from "@/components/button-link";
import { Chip } from "@/components/badges";
import { WhatsAppIcon } from "@/components/floating-actions";
import { ToolChip } from "@/components/tech-marquee";
import { CoverFallback, ToolBadge } from "@/components/projects";
import { NotFoundPage } from "@/components/not-found";
import { getProject, projects, type ProjectDetail, type ProjectSummary } from "@/data/projects";
import { tools } from "@/data/tools";
import { site } from "@/data/site";
import { bandClass, type Tone } from "@/lib/band";
import { whatsappLink } from "@/lib/whatsapp";
import { seo } from "@/lib/seo";

// One small chunk per project: only this page's text and gallery are downloaded.
const detailModules = import.meta.glob<ProjectDetail>("../data/project-details/*.json", {
  import: "default",
});

const Lightbox = lazy(() => import("@/components/lightbox"));

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params }): Promise<{ project: ProjectSummary; detail: ProjectDetail }> => {
    const project = getProject(params.slug);
    const load = detailModules[`../data/project-details/${params.slug}.json`];
    if (!project || !load) throw notFound();
    return { project, detail: await load() };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData)
      return seo({ title: "Project not found", description: "", path: "/projects", noindex: true });
    const { project } = loaderData;
    return seo({
      title: project.title,
      description: project.excerpt || `${project.title} — a project by ${site.name}.`,
      path: `/projects/${params.slug}`,
      type: "article",
      ...(project.cover
        ? {
            image: project.cover.full,
            imageAlt: project.cover.alt,
            imageWidth: project.cover.width,
            imageHeight: project.cover.height,
          }
        : {}),
    });
  },
  component: ProjectPage,
  notFoundComponent: NotFoundPage,
});

/** Off-white and sage take turns between brand bands, so no two neighbours share a tone. */
function toneCycle() {
  let i = 0;
  return (): Tone => (i++ % 2 === 0 ? "light" : "sage");
}

function ToolsUsed({ project }: { project: ProjectSummary }) {
  const matched = project.toolIds
    .map((id) => tools.find((t) => t.id === id))
    .filter((t) => t !== undefined);
  const names = matched.map((t) => t.name.toLowerCase());
  const other = project.toolsUsed.filter(
    (n) => !names.some((m) => n.toLowerCase().includes(m.replace(/\.com$/, ""))),
  );
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tools used">
      {matched.map((t) => (
        <li key={t.id}>
          <ToolChip tool={t} size="sm" />
        </li>
      ))}
      {other.map((n) => (
        <li key={n}>
          <Chip className="py-1.5 text-[12px]">{n}</Chip>
        </li>
      ))}
    </ul>
  );
}

function ProjectPage() {
  const { project: p, detail } = Route.useLoaderData();
  const [open, setOpen] = useState<number | null>(null);
  const next = toneCycle();
  const i = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const after = projects[(i + 1) % projects.length];
  const images = detail.images;
  const intro = detail.overview[0] ?? p.excerpt;
  const restOverview = detail.overview.slice(1);

  return (
    <PageShell>
      {/* Hero */}
      <section
        data-pause-offscreen
        className={`${bandClass("brand")} overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20`}
      >
        <div aria-hidden className="aurora" />
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Projects", to: "/projects" },
              { label: p.title },
            ]}
          />
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div>
              <ToolBadge tool={p.tool} />
              <h1 className="mt-5 text-[2.1rem] font-extrabold leading-[1.08] text-foreground sm:text-5xl md:text-[3.1rem]">
                {p.title}
              </h1>
              {p.subtitle && <p className="mt-3 text-lg text-eyebrow">{p.subtitle}</p>}
              {intro && (
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {intro}
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonAnchor href={site.calendly} external size="lg">
                  <CalendarClock size={16} aria-hidden /> Book a Call
                </ButtonAnchor>
                <ButtonAnchor href={whatsappLink()} external variant="secondary" size="lg">
                  <WhatsAppIcon className="h-[18px] w-[18px] text-[#25d366]" /> WhatsApp
                </ButtonAnchor>
              </div>
            </div>
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--blue)_35%,transparent),transparent)] blur-2xl"
              />
              {p.cover ? (
                <button
                  type="button"
                  onClick={() => setOpen(0)}
                  className="group relative block w-full overflow-hidden rounded-3xl border border-border bg-panel shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]"
                  aria-label={`Open ${p.cover.alt} full size`}
                >
                  <img
                    src={p.cover.src}
                    srcSet={p.cover.srcSet}
                    sizes="(min-width: 1024px) 560px, 100vw"
                    alt={p.cover.alt}
                    width={p.cover.width}
                    height={p.cover.height}
                    fetchPriority="high"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[12px] font-semibold text-white">
                    <Expand size={13} aria-hidden /> View full size
                  </span>
                </button>
              ) : (
                <div className="aspect-[16/10] overflow-hidden rounded-3xl border border-border">
                  <CoverFallback project={p} />
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Overview + tools */}
      <Section tone={next()} eyebrow="Overview" title="What this project does">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-12">
          <div className="space-y-4 text-[16.5px] leading-relaxed text-muted-foreground">
            {(restOverview.length ? restOverview : [intro]).map((t, n) => (
              <p key={n} data-reveal="up" style={{ "--i": n } as React.CSSProperties}>
                {t}
              </p>
            ))}
            {detail.tags.length > 0 && (
              <ul data-reveal="up" className="flex flex-wrap gap-2 pt-2" aria-label="Focus areas">
                {detail.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border bg-panel px-3 py-1 font-heading text-[12.5px] font-semibold text-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <aside data-reveal="right" className="panel-border h-fit rounded-3xl p-6 sm:p-7">
            <h2 className="text-lg font-bold text-foreground">Tools used</h2>
            <div className="mt-4">
              <ToolsUsed project={p} />
            </div>
          </aside>
        </div>
      </Section>

      {/* What was built */}
      {(detail.sections.length > 0 || detail.result.length > 0) && (
        <Section tone={next()} eyebrow="What was built" title="How it was put together">
          <div className="grid gap-4 md:grid-cols-2">
            {detail.sections.map((s, n) => (
              <article
                key={s.heading + n}
                data-reveal={n % 2 ? "right" : "left"}
                style={{ "--i": n % 2 } as React.CSSProperties}
                className="panel-border rounded-3xl p-6"
              >
                <h3 className="text-lg font-bold text-foreground">{s.heading}</h3>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
                  {s.blocks.map((b, k) =>
                    "p" in b ? (
                      <p key={k}>{b.p}</p>
                    ) : (
                      <ul key={k} className="space-y-1.5">
                        {b.list.map((item) => (
                          <li key={item} className="flex gap-2.5 text-foreground/90">
                            <Check
                              size={15}
                              strokeWidth={2.5}
                              className="mt-1 shrink-0 text-cyan"
                              aria-hidden
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </article>
            ))}
            {detail.result.length > 0 && (
              <article
                data-reveal="zoom"
                className="gradient-border rounded-3xl border border-border bg-panel p-6 shadow-[var(--shadow-card)] md:col-span-2"
              >
                <h3 className="font-heading text-[13px] font-semibold uppercase tracking-[0.14em] text-eyebrow">
                  Result
                </h3>
                <div className="mt-3 space-y-2 text-[16px] leading-relaxed text-foreground">
                  {detail.result.map((r) => (
                    <p key={r}>{r}</p>
                  ))}
                </div>
              </article>
            )}
          </div>
        </Section>
      )}

      {/* Gallery */}
      {images.length > 1 && (
        <Section
          tone={next()}
          eyebrow="Gallery"
          title="Screenshots"
          intro="Select an image to view it full size."
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img, n) => (
              <li key={img.src} data-reveal="wipe" style={{ "--i": n % 3 } as React.CSSProperties}>
                <button
                  type="button"
                  onClick={() => setOpen(n)}
                  className="group block w-full overflow-hidden rounded-2xl border border-border bg-panel shadow-[var(--shadow-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                  aria-label={`Open image ${n + 1}: ${img.alt}`}
                >
                  <img
                    src={img.src}
                    srcSet={img.srcSet}
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover object-top group-hover:scale-[1.04]"
                  />
                </button>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Previous / next */}
      <nav aria-label="More projects" className={`${bandClass(next())} py-12 md:py-16`}>
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Previous project", project: prev, Icon: ArrowLeft },
              { label: "Next project", project: after, Icon: ArrowRight },
            ].map(({ label, project, Icon }, n) => (
              <Link
                key={label}
                to="/projects/$slug"
                params={{ slug: project.slug }}
                data-reveal={n ? "right" : "left"}
                className={`group panel-border panel-border-hover flex items-center gap-4 rounded-3xl p-5 ${n ? "sm:flex-row-reverse sm:text-right" : ""}`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-cyan transition-colors group-hover:bg-[linear-gradient(110deg,#2563eb,#7c3aed)] group-hover:text-white">
                  <Icon size={18} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
                    {label}
                  </span>
                  <span className="mt-0.5 block truncate font-heading text-[15px] font-semibold text-foreground">
                    {project.title}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </nav>

      <CtaPanel
        title="Want a system like this?"
        body="Share what you're working with and what should happen. I'll come back with questions and a suggested approach."
        service={p.services[0]}
      />

      {open !== null && images.length > 0 && (
        <Suspense fallback={null}>
          <Lightbox images={images} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
        </Suspense>
      )}
    </PageShell>
  );
}
