import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play } from "lucide-react";
import { useReveal } from "@/lib/reveal";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WorkflowDiagram } from "@/components/workflow-diagram";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";

export const Route = createFileRoute("/case/$slug")({
  loader: ({ params }): { study: CaseStudy } => {
    const study = caseStudies.find((c) => c.slug === params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Case study not found" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const s = loaderData.study;
    const title = `${s.title} — Case Study · Syed Abdullah Bukhari`;
    return {
      meta: [
        { title },
        { name: "description", content: s.problem },
        { property: "og:title", content: title },
        { property: "og:description", content: s.problem },
      ],
    };
  },
  component: CaseDetail,
  notFoundComponent: () => (
    <div className="bg-background">
      <Nav />
      <div className="mx-auto max-w-3xl px-6 pt-40 pb-32 text-center">
        <h1 className="font-display text-5xl font-extrabold gradient-text">Case not found</h1>
        <p className="mt-4 text-muted-foreground">
          That case study doesn't exist. Head back to the full list.
        </p>
        <Link
          to="/"
          hash="cases"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue px-6 py-3 font-heading text-sm font-semibold text-white"
        >
          ← All Case Studies
        </Link>
      </div>
      <Footer />
    </div>
  ),
});

function CaseDetail() {
  useReveal();
  const { study } = Route.useLoaderData() as { study: CaseStudy };

  return (
    <div className="bg-background">
      <Nav />
      <article className="relative pt-32 pb-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] circuit-bg opacity-60" />
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Link
            to="/"
            hash="cases"
            className="inline-flex items-center gap-2 font-heading text-xs uppercase tracking-[0.18em] text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft size={14} /> All Case Studies
          </Link>

          {/* Header */}
          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-2 font-heading text-[11px] uppercase tracking-[0.18em] text-blue">
              <span>{study.category}</span>
              <span className="text-border">·</span>
              <span className="text-muted-foreground">{study.tag}</span>
              <span className="text-border">·</span>
              <span className="text-muted-foreground">{study.location}</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] text-foreground md:text-6xl">
              {study.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
              {study.problem}
            </p>
          </div>

          {/* Workflow */}
          <div className="mt-12 rounded-2xl border border-border bg-panel p-6 md:p-8">
            <div className="mb-4 font-heading text-[11px] uppercase tracking-[0.2em] text-blue">
              System Architecture
            </div>
            <WorkflowDiagram nodes={study.flow} />
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {study.stats.map((s) => (
              <div key={s.label} className="panel-border rounded-xl p-4 text-center">
                <div className="font-display text-2xl font-extrabold gradient-text">
                  {s.value}
                </div>
                <div className="mt-1 font-heading text-[10px] uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mt-12 max-w-3xl">
            <div className="mb-3 font-heading text-[11px] uppercase tracking-[0.2em] text-blue">
              The Build
            </div>
            <p className="text-lg leading-relaxed text-foreground/90">
              {study.description}
            </p>
          </div>

          {/* Screenshots slot */}
          <div className="mt-16">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-heading text-[11px] uppercase tracking-[0.2em] text-blue">
                Screenshots
              </div>
              {!study.screenshots?.length && (
                <span className="rounded-full border border-border bg-panel px-2 py-0.5 font-heading text-[10px] uppercase tracking-wider text-muted-foreground">
                  Placeholder
                </span>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {(study.screenshots?.length
                ? study.screenshots
                : [
                    `https://picsum.photos/seed/${study.slug}-1/960/540`,
                    `https://picsum.photos/seed/${study.slug}-2/960/540`,
                    `https://picsum.photos/seed/${study.slug}-3/960/540`,
                    `https://picsum.photos/seed/${study.slug}-4/960/540`,
                  ]
              ).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${study.title} screenshot ${i + 1}`}
                  className="aspect-video w-full rounded-xl border border-border object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          {/* Video slot */}
          <div className="mt-12">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-heading text-[11px] uppercase tracking-[0.2em] text-blue">
                Demo Video
              </div>
              {!study.videoUrl && (
                <span className="rounded-full border border-border bg-panel px-2 py-0.5 font-heading text-[10px] uppercase tracking-wider text-muted-foreground">
                  Placeholder
                </span>
              )}
            </div>
            <video
              controls
              preload="metadata"
              poster={`https://picsum.photos/seed/${study.slug}-poster/1280/720`}
              src={
                study.videoUrl ??
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              }
              className="aspect-video w-full rounded-xl border border-border bg-black"
            >
              <track kind="captions" />
            </video>
            {!study.videoUrl && (
              <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Play size={12} className="text-blue" />
                Sample video — swap in the real walkthrough later.
              </p>
            )}
          </div>


          {/* Tools */}
          <div className="mt-12">
            <div className="mb-3 font-heading text-[11px] uppercase tracking-[0.2em] text-blue">
              Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {study.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-border bg-panel px-3 py-2 font-heading text-sm text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-3 border-t border-border pt-8">
            <Link
              to="/"
              hash="cases"
              className="rounded-full border border-border bg-panel px-6 py-3 font-heading text-sm font-semibold text-foreground hover:border-blue/50"
            >
              ← All Case Studies
            </Link>
            <Link
              to="/"
              hash="contact"
              className="rounded-full bg-blue px-6 py-3 font-heading text-sm font-semibold text-white hover:bg-blue-deep"
            >
              Start a Similar Project →
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
