import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BarChart3,
  Code2,
  MessagesSquare,
  Mic,
  Share2,
  type LucideIcon,
} from "lucide-react";
import { services, type Service, type ServiceSlug } from "@/data/services";
import { cn } from "@/lib/utils";
import { Chip } from "./badges";

const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  "gohighlevel-automation": BarChart3,
  "workflow-automation": Share2,
  "voice-ai": Mic,
  "ai-chatbots": MessagesSquare,
  "custom-software": Code2,
};

/** Icon gradients differ per service so cards are easy to tell apart. */
const serviceAccents: Record<ServiceSlug, string> = {
  "gohighlevel-automation": "from-[#6366f1] to-[#8b5cf6]",
  "workflow-automation": "from-[#f97362] to-[#ec4899]",
  "voice-ai": "from-[#2563eb] to-[#38bdf8]",
  "ai-chatbots": "from-[#0ea5e9] to-[#14b8a6]",
  "custom-software": "from-[#10b981] to-[#0ea5e9]",
};

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
      data-reveal
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
        <p className="mt-2 text-sm text-eyebrow">{service.eyebrow}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background/50 p-5">
          <div className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            The problem
          </div>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground">{service.problem}</p>
        </div>
        <div className="rounded-2xl border border-[color-mix(in_oklab,var(--cyan)_30%,transparent)] bg-[color-mix(in_oklab,var(--cyan)_6%,transparent)] p-5">
          <div className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-eyebrow">
            What you get
          </div>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground">{service.outcome}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
          <div className="flex flex-wrap gap-1.5">
            {service.tools.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
          <Link
            to="/services/$slug"
            params={{ slug: service.slug }}
            className="group inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-foreground hover:text-cyan"
          >
            View {service.shortTitle} details
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

/**
 * Small signature animation for each service. Purely decorative: static by default and
 * animated only while its card is hovered or focused (see .svc-motion in styles.css).
 */
function ServiceMotion({ slug }: { slug: ServiceSlug }) {
  const base = "svc-motion pointer-events-none flex h-10 items-end";
  switch (slug) {
    case "gohighlevel-automation": // pipeline stages filling up
      return (
        <span aria-hidden className={cn(base, "gap-1")}>
          {[0.45, 0.7, 0.55, 0.9].map((h, i) => (
            <span
              key={i}
              className="w-2 origin-bottom rounded-sm bg-[linear-gradient(to_top,var(--violet),var(--blue-light))]"
              style={{
                height: `${h * 100}%`,
                animation: `bar-rise 1.6s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </span>
      );
    case "workflow-automation": // a pulse moving through connected nodes
      return (
        <span aria-hidden className={cn(base, "w-24 items-center")}>
          <span className="relative h-px w-full bg-[color-mix(in_oklab,var(--cyan)_40%,transparent)]">
            {[0, 50, 100].map((x) => (
              <span
                key={x}
                className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan bg-panel"
                style={{ left: `${x}%` }}
              />
            ))}
            <span
              className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_10px_var(--cyan)]"
              style={{ animation: "dot-travel 1.8s linear infinite" }}
            />
          </span>
        </span>
      );
    case "voice-ai": // voice waveform
      return (
        <span aria-hidden className={cn(base, "items-center gap-[3px]")}>
          {[0.4, 0.75, 1, 0.6, 0.85, 0.45, 0.7].map((h, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-[linear-gradient(to_top,var(--blue),var(--cyan))]"
              style={{
                height: `${h * 100}%`,
                animation: `wave 1.1s ease-in-out ${i * 0.09}s infinite`,
              }}
            />
          ))}
        </span>
      );
    case "ai-chatbots": // typing indicator in a chat bubble
      return (
        <span aria-hidden className={cn(base, "items-center")}>
          <span className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-border bg-panel-2 px-3 py-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-cyan"
                style={{ animation: `typing 1.2s ease-in-out ${i * 0.15}s infinite` }}
              />
            ))}
          </span>
        </span>
      );
    case "custom-software": // code lines with a blinking caret
      return (
        <span aria-hidden className={cn(base, "w-20 flex-col items-start justify-center gap-1.5")}>
          {[0.9, 0.6, 0.75].map((w, i) => (
            <span
              key={i}
              className="h-1 origin-left rounded-full bg-[color-mix(in_oklab,var(--success,#10b981)_70%,var(--cyan))]"
              style={{
                width: `${w * 100}%`,
                animation: `line-grow 1.8s ease-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
          <span
            className="h-3 w-[2px] bg-foreground"
            style={{ animation: "caret 1s steps(1) infinite" }}
          />
        </span>
      );
  }
}

/** Compact card used on the homepage. */
export function ServiceCard({
  service,
  className,
  index = 0,
  tilt = false,
}: {
  service: Service;
  className?: string;
  index?: number;
  /** Subtle 3D tilt toward the cursor (lib/motion.ts). */
  tilt?: boolean;
}) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      data-reveal
      data-tilt={tilt || undefined}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={cn(
        "group beam-card panel-border panel-border-hover relative flex flex-col rounded-3xl p-6 sm:p-7",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="transition duration-300 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_10px_18px_color-mix(in_oklab,var(--blue)_45%,transparent)]">
          <ServiceIcon slug={service.slug} />
        </span>
        <div className="flex items-center gap-3">
          {service.tier === "supporting" && (
            <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              Supporting capability
            </span>
          )}
          <ServiceMotion slug={service.slug} />
        </div>
      </div>
      <h3 className="mt-5 text-xl font-bold text-foreground">{service.title}</h3>
      <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{service.tagline}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {service.tools.slice(0, 4).map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
      <span className="mt-auto flex items-center justify-between gap-1.5 pt-6 font-heading text-sm font-semibold text-foreground">
        Explore service
        <span className="grid h-9 w-9 place-items-center rounded-full border border-border text-cyan transition duration-300 group-hover:border-transparent group-hover:bg-[linear-gradient(110deg,#2563eb_0%,#4f46e5_55%,#7c3aed_100%)] group-hover:text-white">
          <ArrowUpRight
            size={16}
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </span>
    </Link>
  );
}

/** Homepage services grid: three primary services on top, two on the second row. */
export function ServicesGrid({ tilt = false }: { tilt?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
      {services.map((s, i) => (
        <ServiceCard
          key={s.slug}
          service={s}
          index={i}
          tilt={tilt}
          className={cn(i < 3 ? "lg:col-span-2" : "lg:col-span-3", i === 4 && "md:col-span-2")}
        />
      ))}
    </div>
  );
}
