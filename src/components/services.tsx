import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Magnet,
  MessagesSquare,
  Mic,
  Newspaper,
  SquareKanban,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { services, type Service, type ServiceSlug } from "@/data/services";
import { tools, type Tool } from "@/data/tools";
import { cn } from "@/lib/utils";
import { ToolChip, ToolLogo } from "./tool-logo";

const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  "workflow-automation": Workflow,
  "gohighlevel-automation": SquareKanban,
  "lead-generation": Magnet,
  "ai-content-automation": Newspaper,
  "voice-ai": Mic,
  "ai-chatbots": MessagesSquare,
  "custom-software": Code2,
};

/** Icon gradients differ per service so cards are easy to tell apart. */
const serviceAccents: Record<ServiceSlug, string> = {
  "workflow-automation": "from-[#f97362] to-[#ec4899]",
  "gohighlevel-automation": "from-[#6366f1] to-[#8b5cf6]",
  "lead-generation": "from-[#f59e0b] to-[#f97316]",
  "ai-content-automation": "from-[#a855f7] to-[#d946ef]",
  "voice-ai": "from-[#2563eb] to-[#38bdf8]",
  "ai-chatbots": "from-[#10b981] to-[#14b8a6]",
  "custom-software": "from-[#0ea5e9] to-[#6366f1]",
};

/** The few tools shown on each service card (the full list lives on the service page). */
const cardToolIds: Record<ServiceSlug, string[]> = {
  "workflow-automation": ["n8n", "zapier", "make", "openai"],
  "gohighlevel-automation": ["gohighlevel", "twilio", "calendly"],
  "lead-generation": ["apollo", "apify", "hubspot"],
  "ai-content-automation": ["openai", "claude", "wordpress"],
  "voice-ai": ["vapi", "elevenlabs", "synthflow"],
  "ai-chatbots": ["whatsapp", "openai", "pinecone"],
  "custom-software": ["aspnetcore", "sqlserver", "react"],
};

const cardTools = (slug: ServiceSlug) =>
  cardToolIds[slug].map((id) => tools.find((t) => t.id === id)).filter((t): t is Tool => !!t);

export function ServiceIcon({
  slug,
  size = "md",
}: {
  slug: ServiceSlug;
  size?: "sm" | "md" | "lg";
}) {
  const Icon = serviceIcons[slug];
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]",
        serviceAccents[slug],
        size === "lg" ? "h-14 w-14" : size === "sm" ? "h-9 w-9 rounded-xl" : "h-12 w-12",
      )}
    >
      <Icon size={size === "lg" ? 26 : size === "sm" ? 17 : 22} />
    </span>
  );
}

/** Problem → outcome card used on /services to help buyers choose. */
export function ServiceChooserCard({ service, index }: { service: Service; index: number }) {
  return (
    <article
      data-reveal={index % 2 ? "right" : "left"}
      className="panel-border relative grid gap-6 rounded-3xl p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-10"
    >
      <div>
        <div className="flex items-center gap-4">
          <ServiceIcon slug={service.slug} size="lg" />
          <span className="font-mono text-xs text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h2 className="mt-5 text-2xl font-bold text-foreground sm:text-[1.75rem]">
          {service.title}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{service.tagline}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background/50 p-5">
          <div className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            The problem
          </div>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground">
            {service.problem.join(" ")}
          </p>
        </div>
        <div className="rounded-2xl border border-[color-mix(in_oklab,var(--cyan)_30%,transparent)] bg-[color-mix(in_oklab,var(--cyan)_6%,transparent)] p-5">
          <div className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-eyebrow">
            What you get
          </div>
          <ul className="mt-2 space-y-1.5">
            {service.outcomes.slice(0, 3).map((o) => (
              <li key={o} className="flex gap-2 text-[14.5px] leading-snug text-foreground">
                <Check
                  size={15}
                  strokeWidth={2.5}
                  className="mt-0.5 shrink-0 text-cyan"
                  aria-hidden
                />
                {o}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
          <ul className="flex flex-wrap gap-1.5" aria-label="Main tools">
            {cardTools(service.slug).map((t) => (
              <li key={t.id}>
                <ToolChip tool={t} size="sm" />
              </li>
            ))}
          </ul>
          <Link
            to="/services/$slug/"
            params={{ slug: service.slug }}
            className="group inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-foreground hover:text-cyan"
          >
            Explore {service.shortTitle}
            <ArrowUpRight
              size={16}
              aria-hidden
              className="text-cyan transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** n8n · Zapier · Make tiles with a data pulse running through them (featured card only). */
function PlatformStrip() {
  const ids = ["n8n", "zapier", "make"];
  const list = ids.map((id) => tools.find((t) => t.id === id)).filter((t): t is Tool => !!t);
  return (
    <div aria-hidden className="bento-platforms">
      <span className="bento-platforms-line">
        <span className="bento-platforms-pulse" />
      </span>
      {list.map((t) => (
        <span key={t.id} className="bento-platform">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)]">
            <ToolLogo tool={t} size={24} />
          </span>
          <span className="font-heading text-[12px] font-semibold text-muted-foreground">
            {t.name}
          </span>
        </span>
      ))}
    </div>
  );
}

const exampleFlows = [
  ["New form lead", "CRM + owner", "Slack alert"],
  ["Paid order", "Invoice", "Accounting"],
  ["Customer email", "AI summary", "Draft reply"],
];

/** A few everyday workflows, so the featured card shows what "automation" means in practice. */
function ExampleFlows() {
  return (
    <div className="mt-7 hidden sm:block">
      <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-subtle">
        Example workflows
      </div>
      <ul className="mt-3 space-y-2">
        {exampleFlows.map((flow) => (
          <li key={flow[0]} className="flex flex-wrap items-center gap-1.5">
            {flow.map((step, i) => (
              <Fragment key={step}>
                <span className="rounded-full border border-border bg-[rgba(255,255,255,0.05)] px-2.5 py-1 font-heading text-[12.5px] font-semibold text-foreground/90">
                  {step}
                </span>
                {i < flow.length - 1 && (
                  <>
                    <ArrowRight size={13} aria-hidden className="text-subtle" />
                    <span className="sr-only">then</span>
                  </>
                )}
              </Fragment>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Reveal direction per card: the right column slides in from the right, rows rise. */
const bentoReveal: Record<ServiceSlug, string> = {
  "workflow-automation": "zoom",
  "gohighlevel-automation": "right",
  "lead-generation": "right",
  "ai-content-automation": "up",
  "voice-ai": "up",
  "ai-chatbots": "up",
  "custom-software": "up",
};

const bentoLayout: Record<ServiceSlug, string> = {
  "workflow-automation": "md:col-span-2 lg:col-span-7 lg:row-span-2",
  "gohighlevel-automation": "lg:col-span-5",
  "lead-generation": "lg:col-span-5",
  "ai-content-automation": "md:col-span-2 lg:col-span-4",
  "voice-ai": "lg:col-span-4",
  "ai-chatbots": "lg:col-span-4",
  "custom-software": "md:col-span-2 lg:col-span-12",
};

/**
 * One bento card. The title link stretches over the whole card (one tab stop, valid HTML);
 * the featured card also has its own "compare platforms" link above that layer.
 */
function BentoCard({ service, index }: { service: Service; index: number }) {
  const featured = service.slug === "workflow-automation";
  const wide = service.slug === "custom-software";
  return (
    <div
      data-reveal={featured ? "zoom" : bentoReveal[service.slug]}
      className={cn("bento-cell min-w-0", bentoLayout[service.slug])}
      style={{ "--i": index } as React.CSSProperties}
    >
      <article
        className={cn(
          "bento-card beam-card group flex h-full flex-col p-6 sm:p-7",
          featured && "is-featured lg:p-9",
          wide && "lg:flex-row lg:items-center lg:gap-10 lg:py-7",
        )}
      >
        <div className={cn("flex items-start justify-between gap-4", wide && "lg:shrink-0")}>
          <ServiceIcon slug={service.slug} size={featured ? "lg" : "md"} />
        </div>

        <div className={cn("min-w-0", wide ? "mt-5 lg:mt-0 lg:w-[34%] lg:shrink-0" : "mt-5")}>
          <h3
            className={cn(
              "font-bold text-foreground",
              featured ? "text-2xl sm:text-[2rem]" : "text-xl",
            )}
          >
            <Link
              to="/services/$slug/"
              params={{ slug: service.slug }}
              className="rounded-md after:absolute after:inset-0 after:z-[1] after:rounded-[inherit] focus-visible:outline-none"
            >
              {service.title}
            </Link>
          </h3>
          <p
            className={cn(
              "mt-2.5 leading-relaxed text-muted-foreground",
              featured ? "max-w-xl text-base sm:text-[17px]" : "text-[15px]",
            )}
          >
            {service.tagline}
          </p>
        </div>

        {featured && <PlatformStrip />}
        {featured && <ExampleFlows />}

        <ul className={cn("space-y-2", wide ? "mt-5 lg:mt-0 lg:flex-1" : "mt-5")}>
          {service.bullets.slice(0, 3).map((b) => (
            <li key={b} className="flex gap-2.5 text-[14.5px] leading-snug text-foreground/90">
              <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--cyan)_18%,transparent)] text-cyan">
                <Check size={11} strokeWidth={3} aria-hidden />
              </span>
              {b}
            </li>
          ))}
        </ul>

        {featured && (
          <a
            href="/services/workflow-automation/#compare"
            className="relative z-[2] mt-5 inline-flex w-fit items-center gap-1.5 rounded-md font-heading text-[13.5px] font-semibold text-eyebrow hover:underline"
          >
            Compare n8n, Zapier &amp; Make <ArrowRight size={14} aria-hidden />
          </a>
        )}

        <div
          className={cn(
            "flex flex-wrap items-end justify-between gap-4 pt-6",
            wide ? "lg:shrink-0 lg:flex-col lg:items-end lg:pt-0" : "mt-auto",
          )}
        >
          <ul className="flex flex-wrap gap-1.5" aria-label={`Tools for ${service.shortTitle}`}>
            {cardTools(service.slug).map((t) => (
              <li key={t.id}>
                <ToolChip tool={t} size="xs" />
              </li>
            ))}
          </ul>
          <span
            aria-hidden
            className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground"
          >
            Explore
            <span className="bento-arrow grid h-9 w-9 place-items-center rounded-full border border-border text-cyan">
              <ArrowUpRight size={16} />
            </span>
          </span>
        </div>
      </article>
    </div>
  );
}

/** Home services: premium bento grid, automation first and featured. */
export function ServicesBento() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
      {services.map((s, i) => (
        <BentoCard key={s.slug} service={s} index={i} />
      ))}
    </div>
  );
}
