import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, Mail } from "lucide-react";
import { site } from "@/data/site";
import type { ServiceSlug } from "@/data/services";
import {
  projectsForService,
  projectsFromDifferentTools,
  type ProjectSummary,
} from "@/data/projects";
import { ButtonAnchor } from "./button-link";
import { WhatsAppIcon } from "./floating-actions";
import { whatsappLink } from "@/lib/whatsapp";
import { Container } from "./section";
import { bandClass } from "@/lib/band";
import { Avatar } from "./portrait";
import { ToolBadge } from "./projects";

/** One compact, real project: cover, tool, title, one line, link to the full write-up. */
function CtaProject({ project: p, index }: { project: ProjectSummary; index: number }) {
  return (
    <article
      data-reveal="up"
      style={{ "--i": index } as React.CSSProperties}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-panel shadow-[var(--shadow-card)]"
    >
      {p.cover && (
        <div
          data-reveal="wipe"
          style={{ "--i": index } as React.CSSProperties}
          className="aspect-[16/10] overflow-hidden border-b border-border bg-panel-2"
        >
          <img
            src={p.cover.src}
            srcSet={p.cover.srcSet}
            sizes="(min-width: 1024px) 240px, (min-width: 640px) 33vw, 100vw"
            alt={p.cover.alt}
            width={p.cover.width}
            height={p.cover.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <ToolBadge tool={p.tool} className="self-start" />
        <h3 className="mt-3 line-clamp-2 text-[15px] font-semibold leading-snug text-foreground">
          {p.title}
        </h3>
        {p.excerpt && (
          <p className="mt-1.5 line-clamp-1 text-[13px] text-muted-foreground">{p.excerpt}</p>
        )}
        <Link
          to="/projects/$slug/"
          params={{ slug: p.slug }}
          className="mt-auto inline-flex items-center gap-1 pt-3 font-heading text-[13px] font-semibold text-eyebrow after:absolute after:inset-0 after:content-[''] hover:underline"
        >
          Read case study <ArrowRight size={13} aria-hidden />
        </Link>
      </div>
    </article>
  );
}

/**
 * Closing call-to-action, a brand band at the bottom of every page: who you talk to and how to
 * reach me on the left; three real projects from three different tools on the right, so the
 * decision sits next to work you can inspect.
 */
export function CtaPanel({
  title = "Tell me what is slowing your team down.",
  body = "Book a 30-minute call. We will go through the process, and I will tell you honestly whether automation is the right fix.",
  service,
  exclude = [],
}: {
  title?: ReactNode;
  body?: ReactNode;
  /** A service page: its own projects come first. */
  service?: ServiceSlug;
  /** Projects already shown on the page, so the cards add something new. */
  exclude?: string[];
}) {
  const preferred = service ? projectsForService(service) : [];
  const work = projectsFromDifferentTools(preferred, 3, exclude);
  return (
    <section
      aria-labelledby="cta-title"
      className={`${bandClass("brand")} cv-auto py-16 [contain-intrinsic-size:auto_720px] md:py-24`}
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
          <div data-reveal="up">
            <div className="flex items-center gap-3">
              <Avatar size={52} />
              <div className="text-[13.5px] leading-snug">
                <div className="font-heading font-semibold text-foreground">{site.name}</div>
                <div className="text-muted-foreground">{site.title}</div>
              </div>
            </div>
            <h2
              id="cta-title"
              className="mt-7 text-3xl font-bold text-foreground sm:text-4xl md:text-[2.6rem]"
            >
              {title}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              {body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonAnchor href={site.calendly} external size="lg">
                <CalendarClock size={16} aria-hidden /> Book a Call
              </ButtonAnchor>
              <ButtonAnchor href={whatsappLink()} external variant="secondary" size="lg">
                <WhatsAppIcon className="h-[18px] w-[18px] text-[#25d366]" /> WhatsApp
              </ButtonAnchor>
            </div>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-flex items-center gap-2 rounded-md text-[14.5px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail size={15} aria-hidden /> {site.email}
            </a>
          </div>

          {work.length > 0 && (
            <div>
              <h3 className="mb-4 font-heading text-[13.5px] font-semibold text-muted-foreground">
                Work you can inspect
              </h3>
              <ul className="grid gap-4 sm:grid-cols-3">
                {work.map((p, i) => (
                  <li key={p.slug}>
                    <CtaProject project={p} index={i} />
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[14px] leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">What happens after you book: </span>
                1. We talk for 30 minutes. 2. I map the process and recommend an approach. 3. You
                decide.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
