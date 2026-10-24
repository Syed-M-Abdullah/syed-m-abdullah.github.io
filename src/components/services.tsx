import { Link } from "@tanstack/react-router";
import {
  AppWindow,
  ArrowUpRight,
  Check,
  Code2,
  Magnet,
  MessagesSquare,
  Mic,
  Newspaper,
  ShieldCheck,
  Smartphone,
  SquareKanban,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  groupOrder,
  serviceGroups,
  servicesInGroup,
  type Service,
  type ServiceGroup,
  type ServiceSlug,
} from "@/data/services";
import { tools, type Tool } from "@/data/tools";
import { cn } from "@/lib/utils";
import { serviceAccents } from "@/lib/service-accents";
import { ToolChip } from "./tool-logo";
import { DrawLine } from "./process";
import { MaskLines } from "./reveal-text";

const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  "workflow-automation": Workflow,
  "gohighlevel-automation": SquareKanban,
  "lead-generation": Magnet,
  "ai-content-automation": Newspaper,
  "voice-ai": Mic,
  "ai-chatbots": MessagesSquare,
  "website-development": AppWindow,
  "mobile-app-development": Smartphone,
  "custom-software": Code2,
  "website-maintenance": ShieldCheck,
};

/** The few tools shown on each service card (the full list lives on the service page). */
const cardToolIds: Record<ServiceSlug, string[]> = {
  "workflow-automation": ["n8n", "zapier", "make", "openai"],
  "gohighlevel-automation": ["gohighlevel", "twilio", "calendly"],
  "lead-generation": ["apollo", "apify", "hubspot"],
  "ai-content-automation": ["openai", "claude", "wordpress"],
  "voice-ai": ["vapi", "elevenlabs", "synthflow"],
  "ai-chatbots": ["whatsapp", "openai", "pinecone"],
  "website-development": ["react", "wordpress", "aspnetcore"],
  "mobile-app-development": ["reactnative", "firebase", "typescript"],
  "custom-software": ["aspnetcore", "sqlserver", "react"],
  "website-maintenance": ["wordpress", "googlecloud", "git"],
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

/** One service on /services: what it is, where clients are today and what they get. */
export function ServiceChooserCard({ service, index }: { service: Service; index: number }) {
  return (
    <article
      data-reveal={index % 2 ? "right" : "left"}
      className="panel-border relative grid gap-6 rounded-3xl p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-10"
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <ServiceIcon slug={service.slug} size="lg" />
          <span className="font-mono text-xs text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-5 text-2xl font-bold text-foreground sm:text-[1.75rem]">
          {service.title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{service.tagline}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5 lg:mt-auto lg:pt-6" aria-label="Main tools">
          {cardTools(service.slug).map((t) => (
            <li key={t.id}>
              <ToolChip tool={t} size="sm" />
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background/50 p-5">
          <div className="font-heading text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            The problem
          </div>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground">
            {service.problem.join(" ")}
          </p>
        </div>
        <div className="rounded-2xl border border-[color-mix(in_oklab,var(--cyan)_30%,transparent)] bg-[color-mix(in_oklab,var(--cyan)_6%,transparent)] p-5">
          <div className="font-heading text-xs font-semibold tracking-[0.14em] text-eyebrow uppercase">
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
          <p className="min-w-0 text-[13.5px] leading-snug text-muted-foreground">
            <span className="font-semibold text-foreground">Best for: </span>
            {service.audiences.slice(0, 2).join(" · ")}
          </p>
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

/** A stage heading on /services: big number, title, one line on the result, service count. */
export function StageHeading({ group, count }: { group: ServiceGroup; count: number }) {
  const g = serviceGroups[group];
  return (
    <div className="mb-10 grid gap-5 md:mb-12 md:grid-cols-[auto_minmax(0,1fr)] md:items-end md:gap-8">
      <span
        aria-hidden
        data-reveal="zoom"
        className="stage-number font-heading text-[4.5rem] leading-none font-extrabold md:text-[6.5rem]"
      >
        {g.n}
      </span>
      <div className="max-w-2xl md:pb-2">
        <p
          data-reveal="blur-up"
          className="font-mono text-[12px] tracking-[0.14em] text-subtle uppercase"
        >
          Stage {g.n} · {count} services
        </p>
        <h2
          id={`stage-${group}-title`}
          data-reveal="mask-lines"
          data-delay="100"
          className="mt-2 text-3xl font-bold text-foreground sm:text-4xl md:text-[2.75rem]"
        >
          <MaskLines>{g.title}</MaskLines>
        </h2>
        <p
          data-reveal="up"
          data-delay="300"
          className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {g.blurb}
        </p>
      </div>
    </div>
  );
}

/**
 * Home services as a client journey: 01 get more leads → 02 convert every enquiry → 03
 * automate and scale. A drawn line joins the stage numbers on wide screens.
 */
export function ServicesJourney() {
  return (
    <div className="relative grid gap-12 lg:grid-cols-3 lg:gap-5">
      <DrawLine className="absolute top-7 left-7 hidden w-[calc((100%_-_2.5rem)*2/3_+_2.5rem)] lg:block" />
      {groupOrder.map((g, gi) => {
        const list = servicesInGroup(g);
        return (
          <section
            key={g}
            aria-labelledby={`journey-${g}`}
            data-reveal="up"
            style={{ "--i": gi * 2 } as React.CSSProperties}
            className="flex min-w-0 flex-col"
          >
            <span className="relative grid h-14 w-14 place-items-center rounded-full border-4 border-[var(--background)] bg-[#2563eb] font-heading text-lg font-bold text-white">
              {serviceGroups[g].n}
            </span>
            <h3 id={`journey-${g}`} className="mt-5 text-2xl font-bold text-foreground">
              {serviceGroups[g].title}
            </h3>
            <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              {serviceGroups[g].blurb}
            </p>
            <ul className="journey-card mt-6 grid flex-1 divide-y divide-border lg:auto-rows-fr">
              {list.map((s) => (
                <li key={s.slug} className="flex">
                  <Link
                    to="/services/$slug/"
                    params={{ slug: s.slug }}
                    className="journey-item group flex w-full items-center gap-4 px-5 py-4 sm:px-6"
                  >
                    <ServiceIcon slug={s.slug} />
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-[16px] leading-snug font-bold text-foreground">
                        {s.title}
                      </span>
                      <span className="mt-1 block text-[14px] leading-snug text-muted-foreground">
                        {s.summary}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="bento-arrow grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-cyan"
                    >
                      <ArrowUpRight size={16} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
