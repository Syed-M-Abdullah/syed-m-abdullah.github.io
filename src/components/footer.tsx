import { Link } from "@tanstack/react-router";
import { Linkedin, Mail, MessageCircle, CalendarClock } from "lucide-react";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { Logo } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="band tone-deep cv-auto overflow-hidden [contain-intrinsic-size:auto_460px]">
      <div
        aria-hidden
        className="tech-grid pointer-events-none absolute inset-0 -z-10 opacity-60"
      />
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div data-reveal="up">
            <Link to="/" className="inline-block rounded-lg" aria-label={`${site.name} — home`}>
              <Logo />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Intelligent business systems — automation with n8n, Zapier and Make, GoHighLevel CRM,
              lead generation, AI content, voice and chat agents, and custom software.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">{site.location}</p>
          </div>

          <FooterCol title="Services" index={1}>
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {s.shortTitle}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Explore" index={2}>
            {(
              [
                { to: "/projects", label: "Projects" },
                { to: "/process", label: "How I work" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ] as const
            ).map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Connect" index={3}>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
              >
                <Mail size={14} aria-hidden /> Email
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
              >
                <Linkedin size={14} aria-hidden /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
              >
                <CalendarClock size={14} aria-hidden /> Book a call
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
              >
                <MessageCircle size={14} aria-hidden /> WhatsApp
              </a>
            </li>
            {site.fiverr && (
              <li>
                <a
                  href={site.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  Fiverr
                </a>
              </li>
            )}
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <a href={`mailto:${site.email}`} className="break-all hover:text-foreground">
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  index,
  children,
}: {
  title: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div data-reveal="up" style={{ "--i": index } as React.CSSProperties}>
      <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}
