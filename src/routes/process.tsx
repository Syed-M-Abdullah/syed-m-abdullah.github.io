import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Inbox, MessagesSquare, PackageCheck } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CtaPanel } from "@/components/cta-panel";
import { ButtonLink } from "@/components/button-link";
import { collaboration, processSteps } from "@/data/misc";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/process")({
  head: () =>
    seo({
      title: "How I Work — From Discovery to Handover",
      description:
        "A six-step delivery process — discovery, architecture, build, real-world testing, deployment and handover — plus what I need from you and what you get.",
      path: "/process",
    }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Process" }]}
        eyebrow="How I work"
        title={
          <>
            A delivery process <span className="gradient-text">without surprises</span>
          </>
        }
        intro={
          <p>
            Most automation projects go wrong in the gaps: unclear scope, untested edge cases and a
            handover nobody can follow. This is how I close those gaps — step by step, with what I
            need from you and what you get at each stage.
          </p>
        }
        actions={
          <ButtonLink to="/contact" size="lg">
            Start with a discovery call <ArrowRight size={16} aria-hidden />
          </ButtonLink>
        }
        aside={
          <ol className="glass rounded-3xl p-5" aria-label="Process steps">
            {processSteps.map((p) => (
              <li key={p.n}>
                <a
                  href={`#step-${p.n}`}
                  className="flex items-center gap-3 rounded-2xl p-2.5 transition hover:bg-panel-2/70"
                >
                  <span className="font-mono text-xs text-cyan">{p.n}</span>
                  <span className="font-heading text-sm font-semibold text-foreground">
                    {p.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        }
      />

      <Section tone="light">
        <ol className="relative space-y-6 before:absolute before:top-4 before:bottom-4 before:left-[22px] before:w-px before:bg-[linear-gradient(var(--cyan),var(--violet))] before:opacity-40 md:before:left-[30px]">
          {processSteps.map((p, i) => (
            <li
              key={p.n}
              id={`step-${p.n}`}
              data-reveal={i % 2 ? "right" : "left"}
              className="relative scroll-mt-28 pl-14 md:pl-20"
            >
              <span className="absolute top-0 left-0 grid h-11 w-11 place-items-center rounded-full border border-border bg-panel font-mono text-sm font-semibold text-foreground shadow-[0_0_0_6px_var(--background)] md:h-[60px] md:w-[60px] md:text-base">
                {p.n}
              </span>
              <div className="panel-border rounded-3xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground">{p.title}</h2>
                <p className="mt-1 text-[15px] font-medium text-eyebrow">{p.summary}</p>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <List title="What I'll need from you" items={p.youProvide} />
                  <List title="What you get" items={p.youGet} accent />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Working together" title="Inputs, communication and handover" tone="sage">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card icon={Inbox} title="What helps me start" items={collaboration.inputs} />
          <Card
            icon={MessagesSquare}
            title="How we communicate"
            items={collaboration.communication}
          />
          <Card
            icon={PackageCheck}
            title="What you receive at handover"
            items={collaboration.handover}
          />
        </div>
        <p
          data-reveal="up"
          className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground"
        >
          Timelines, communication cadence and any post-launch support are agreed per project in the
          written scope — nothing here is a fixed package.
        </p>
      </Section>

      <CtaPanel
        title="Ready to map out your project?"
        body="The first step is a conversation about the problem. You'll leave it with a clearer picture of what to build, whether or not we work together."
      />
    </PageShell>
  );
}

function List({ title, items, accent }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <div
      className={
        accent
          ? "rounded-2xl border border-[color-mix(in_oklab,var(--cyan)_30%,transparent)] bg-[color-mix(in_oklab,var(--cyan)_6%,transparent)] p-5"
          : "rounded-2xl border border-border bg-background/50 p-5"
      }
    >
      <h3
        className={`font-heading text-sm font-semibold ${accent ? "text-eyebrow" : "text-foreground"}`}
      >
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-foreground">
            <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Card({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Inbox;
  title: string;
  items: string[];
}) {
  return (
    <div data-reveal="zoom" className="panel-border rounded-3xl p-6">
      <Icon size={22} className="text-cyan" aria-hidden />
      <h3 className="mt-4 text-lg font-bold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-muted-foreground">
            <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
