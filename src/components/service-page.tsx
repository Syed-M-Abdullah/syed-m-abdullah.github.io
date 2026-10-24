import { Link } from "@tanstack/react-router";
import {
  Activity,
  AppWindow,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BellRing,
  BookOpen,
  Bot,
  CalendarCheck,
  CalendarClock,
  Check,
  ClipboardList,
  CreditCard,
  Database,
  DatabaseBackup,
  FileText,
  Filter,
  Gauge,
  ImagePlus,
  Inbox,
  Layers,
  LayoutDashboard,
  LayoutTemplate,
  MapPin,
  MessageCircle,
  MessageSquare,
  MousePointerClick,
  PackageCheck,
  PenLine,
  PhoneForwarded,
  PhoneIncoming,
  PhoneOutgoing,
  PlugZap,
  Receipt,
  RefreshCw,
  Rocket,
  Search,
  Send,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Split,
  SquareKanban,
  Target,
  UserCheck,
  Users,
  WifiOff,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  serviceGroups,
  services,
  type FeatureIcon,
  type Service,
  type ServiceSlug,
} from "@/data/services";
import { site } from "@/data/site";
import type { Tool } from "@/data/tools";
import { cn } from "@/lib/utils";
import { serviceAccents } from "@/lib/service-accents";
import { ToolChip } from "./tool-logo";
import { DrawLine } from "./process";
import { TalkCard } from "./talk-card";
import { MaskLines } from "./reveal-text";

const featureIcons: Record<FeatureIcon, LucideIcon> = {
  target: Target,
  "map-pin": MapPin,
  inbox: Inbox,
  "badge-check": BadgeCheck,
  filter: Filter,
  "pen-line": PenLine,
  zap: Zap,
  "calendar-check": CalendarCheck,
  "layout-template": LayoutTemplate,
  "mouse-pointer-click": MousePointerClick,
  "app-window": AppWindow,
  "shopping-cart": ShoppingCart,
  gauge: Gauge,
  "plug-zap": PlugZap,
  search: Search,
  "book-open": BookOpen,
  "user-check": UserCheck,
  "image-plus": ImagePlus,
  send: Send,
  kanban: SquareKanban,
  "message-square": MessageSquare,
  bot: Bot,
  "credit-card": CreditCard,
  layers: Layers,
  "phone-incoming": PhoneIncoming,
  "phone-outgoing": PhoneOutgoing,
  "phone-forwarded": PhoneForwarded,
  database: Database,
  "clipboard-list": ClipboardList,
  "message-circle": MessageCircle,
  users: Users,
  "refresh-cw": RefreshCw,
  split: Split,
  "file-text": FileText,
  "bell-ring": BellRing,
  "layout-dashboard": LayoutDashboard,
  receipt: Receipt,
  server: Server,
  smartphone: Smartphone,
  "wifi-off": WifiOff,
  rocket: Rocket,
  "database-backup": DatabaseBackup,
  "shield-check": ShieldCheck,
  activity: Activity,
};

/** "Where you are today → where you'll be": one table, the result column highlighted. */
export function BeforeAfter({ items }: { items: Service["beforeAfter"] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-panel shadow-[var(--shadow-card)]">
      <div
        aria-hidden
        className="hidden border-b border-border md:grid md:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)]"
      >
        <div className="px-8 py-4 font-heading text-[12.5px] font-semibold uppercase tracking-[0.14em] text-subtle">
          Today
        </div>
        <div />
        <div className="ba-after px-8 py-4 font-heading text-[12.5px] font-semibold uppercase tracking-[0.14em] text-eyebrow">
          Once it's built
        </div>
      </div>
      <ul>
        {items.map((it, i) => (
          <li
            key={it.before}
            data-reveal="up"
            style={{ "--i": i } as React.CSSProperties}
            className="grid border-b border-border last:border-b-0 md:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)]"
          >
            <p className="flex gap-3 px-6 pt-5 text-[15.5px] leading-snug text-muted-foreground md:px-8 md:py-6">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[rgba(220,38,38,0.1)] text-[#b91c1c]">
                <X size={12} strokeWidth={3} aria-hidden />
              </span>
              <span>
                <span className="sr-only">Today: </span>
                {it.before}
              </span>
            </p>
            <span aria-hidden className="hidden place-items-center text-subtle md:grid">
              <ArrowRight size={18} />
            </span>
            <p className="ba-after flex gap-3 px-6 pt-3 pb-5 text-[15.5px] font-semibold leading-snug text-foreground md:px-8 md:py-6">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--success)_14%,transparent)] text-success">
                <Check size={12} strokeWidth={3} aria-hidden />
              </span>
              <span>
                <span className="sr-only">Once it's built: </span>
                {it.after}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * "What I build": one panel split by hairlines. When the list doesn't fill the last row, the
 * spare cell becomes an invitation to ask for something that isn't listed.
 */
export function CapabilityGrid({ service }: { service: Service }) {
  const items = service.build;
  const spare = items.length % 3 !== 0;
  return (
    <div className="cap-grid overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-card)]">
      <ul className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
        {items.map((b, i) => {
          const Icon = featureIcons[b.icon];
          return (
            <li
              key={b.title}
              data-reveal="up"
              style={{ "--i": i % 3 } as React.CSSProperties}
              className="cap-cell bg-panel p-7 sm:p-8"
            >
              <span
                aria-hidden
                className={cn(
                  "cap-icon grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]",
                  serviceAccents[service.slug],
                )}
              >
                <Icon size={22} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">{b.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{b.body}</p>
            </li>
          );
        })}
        {spare && (
          <li
            data-reveal="up"
            style={{ "--i": 2 } as React.CSSProperties}
            className="flex flex-col justify-center bg-panel-2 p-7 sm:p-8 md:col-span-2 lg:col-span-1"
          >
            <p className="font-heading text-lg font-bold text-foreground">
              Need something that isn't listed?
            </p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
              Bring the problem. I'll tell you honestly whether I can build it.
            </p>
            <a
              href={site.calendly}
              className="mt-4 inline-flex w-fit items-center gap-1.5 font-heading text-[14px] font-semibold text-eyebrow hover:underline"
            >
              <CalendarClock size={15} aria-hidden /> Ask on a call
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

/** Who it fits, the tools behind it, and the full package on a dark card. */
export function FitAndIncluded({ service, tools }: { service: Service; tools: Tool[] }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
      <div>
        <h2
          id="fit-title"
          data-reveal="mask-lines"
          className="text-3xl font-bold text-foreground sm:text-4xl md:text-[2.75rem]"
        >
          <MaskLines>Who it's for</MaskLines>
        </h2>
        <p
          data-reveal="up"
          data-delay="200"
          className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Built for businesses like these. If yours isn't listed, the approach still applies.
        </p>
        <ul className="mt-7 flex flex-wrap gap-2.5" aria-label="Best suited to">
          {service.audiences.map((a, i) => (
            <li
              key={a}
              data-reveal="up"
              style={{ "--i": i } as React.CSSProperties}
              className="rounded-full border border-border bg-panel px-4 py-2 font-heading text-[14px] font-semibold text-foreground shadow-[var(--shadow-card)]"
            >
              {a}
            </li>
          ))}
        </ul>
        {tools.length > 0 && (
          <div data-reveal="up" data-delay="200" className="mt-10">
            <h3 className="font-heading text-[15px] font-semibold text-foreground">
              Tools I use for this
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {tools.map((t) => (
                <li key={t.id}>
                  <ToolChip tool={t} size="sm" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div
        data-reveal="right"
        data-delay="150"
        className="included-card on-dark self-start rounded-3xl p-7 sm:p-9"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[rgba(255,255,255,0.08)] text-[#7dd3fc]">
            <PackageCheck size={22} aria-hidden />
          </span>
          <h3 className="text-xl font-bold text-foreground sm:text-2xl">Everything included</h3>
        </div>
        <ul className="mt-6 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
          {service.included.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-snug text-foreground">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[rgba(52,211,153,0.16)] text-[#6ee7b7]">
                <Check size={12} strokeWidth={3} aria-hidden />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-7 border-t border-border pt-5 text-[14px] leading-relaxed text-muted-foreground">
          Built in your accounts and documented, so you own every part of it.
        </p>
      </div>
    </div>
  );
}

/** Three steps on a drawn line; each says what the client receives at that point. */
export function StepsTimeline({ steps }: { steps: Service["steps"] }) {
  return (
    <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
      {/* Runs from the first step's centre to the last; the circles sit on top of it. */}
      <DrawLine className="absolute top-7 left-[16.6%] hidden w-[66.8%] md:block" />
      {steps.map((st, i) => (
        <li
          key={st.title}
          data-reveal="up"
          style={{ "--i": i * 2 } as React.CSSProperties}
          className="relative flex flex-col items-center text-center"
        >
          <span className="relative grid h-14 w-14 place-items-center rounded-full border-4 border-[var(--background)] bg-[#2563eb] font-heading text-lg font-bold text-white">
            {i + 1}
          </span>
          <h3 className="mt-5 text-xl font-bold text-foreground">{st.title}</h3>
          <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
            {st.body}
          </p>
          <p className="mt-4 inline-flex max-w-xs items-start gap-2 rounded-2xl border border-border bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-left text-[13.5px] leading-snug text-foreground">
            <PackageCheck size={16} aria-hidden className="mt-px shrink-0 text-[#7dd3fc]" />
            <span>
              <span className="font-semibold">You receive: </span>
              {st.deliverable}
            </span>
          </p>
        </li>
      ))}
    </ol>
  );
}

/** Three reasons to choose me for this service, next to the person you'd speak to. */
export function WhyThisService({ service }: { service: Service }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
      <div>
        <h2
          id="why-title"
          data-reveal="mask-lines"
          className="text-3xl font-bold text-foreground sm:text-4xl md:text-[2.75rem]"
        >
          <MaskLines>Why clients choose me for this</MaskLines>
        </h2>
        <ol className="mt-8 divide-y divide-border border-y border-border">
          {service.why.map((w, i) => (
            <li
              key={w.title}
              data-reveal="left"
              style={{ "--i": i } as React.CSSProperties}
              className="grid grid-cols-[3rem_minmax(0,1fr)] gap-2 py-6"
            >
              <span className="font-heading text-2xl font-bold text-eyebrow/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground">{w.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{w.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div data-reveal="right" data-delay="200">
        <TalkCard />
      </div>
    </div>
  );
}

/** Previous and next service in the journey order, so visitors can keep browsing. */
export function ServicePager({ slug }: { slug: ServiceSlug }) {
  const i = services.findIndex((s) => s.slug === slug);
  const prev = services[(i - 1 + services.length) % services.length];
  const next = services[(i + 1) % services.length];
  const item = (s: Service, dir: "prev" | "next") => (
    <Link
      to="/services/$slug/"
      params={{ slug: s.slug }}
      className={cn(
        "group flex min-w-0 flex-1 flex-col gap-1 rounded-2xl border border-border bg-panel p-5 transition-colors hover:border-[color-mix(in_oklab,var(--cyan)_45%,transparent)] sm:p-6",
        dir === "next" && "items-end text-right",
      )}
    >
      <span className="inline-flex items-center gap-1.5 font-heading text-[12.5px] font-semibold text-subtle">
        {dir === "prev" && <ArrowLeft size={14} aria-hidden />}
        {dir === "prev" ? "Previous service" : "Next service"}
        {dir === "next" && <ArrowRight size={14} aria-hidden />}
      </span>
      <span className="text-lg font-bold text-foreground group-hover:text-eyebrow">{s.title}</span>
      <span className="text-[13.5px] text-muted-foreground">
        {serviceGroups[s.group].n} · {serviceGroups[s.group].title}
      </span>
    </Link>
  );
  return (
    <nav aria-label="More services" className="mt-14 flex flex-col gap-3 sm:flex-row">
      {item(prev, "prev")}
      {item(next, "next")}
    </nav>
  );
}
