import type { ReactNode } from "react";
import { ArrowRight, CalendarClock, Globe2, MapPin, Sparkles } from "lucide-react";
import { site } from "@/data/site";
import type { ServiceSlug } from "@/data/services";
import { ButtonAnchor, ButtonLink } from "./button-link";
import { Container } from "./section";
import { Avatar, Portrait } from "./portrait";

/** Closing call-to-action used at the bottom of most pages. */
export function CtaPanel({
  title = "Let's build a system your team can rely on",
  body = "Whether you need a GoHighLevel build, an n8n automation, a voice or chat agent, or custom software behind it — tell me what you're trying to fix.",
  service,
  extra,
}: {
  title?: ReactNode;
  body?: ReactNode;
  /** Pre-selects the service on the contact form. */
  service?: ServiceSlug;
  extra?: ReactNode;
}) {
  return (
    <section aria-labelledby="cta-title" className="py-16 md:py-24">
      <Container>
        <div
          data-reveal
          className="gradient-border relative isolate overflow-hidden rounded-[1.75rem] border border-border bg-panel/80 p-6 sm:p-10 lg:p-14"
        >
          <div aria-hidden className="aurora opacity-90" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.95fr)_minmax(0,0.8fr)] lg:items-center">
            <div>
              <div className="mb-6 flex items-center gap-3 lg:hidden">
                <Avatar
                  size={56}
                  className="h-14 w-14 ring-2 ring-[color-mix(in_oklab,var(--cyan)_45%,transparent)]"
                />
                <div className="text-sm">
                  <div className="font-heading font-semibold text-foreground">{site.name}</div>
                  <div className="text-muted-foreground">{site.role}</div>
                </div>
              </div>
              <h2 id="cta-title" className="text-3xl font-bold text-foreground sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {body}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink to="/contact" search={service ? { service } : undefined} size="lg">
                  Discuss a Project <ArrowRight size={16} aria-hidden />
                </ButtonLink>
                <ButtonAnchor href={site.calendly} external variant="secondary" size="lg">
                  <CalendarClock size={16} aria-hidden /> Book a call
                </ButtonAnchor>
              </div>
              {extra}
            </div>
            <div className="relative hidden self-end lg:-mb-14 lg:block">
              <div
                aria-hidden
                className="absolute inset-x-[6%] top-[12%] bottom-0 -z-10 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--violet)_40%,transparent),transparent)] blur-2xl"
              />
              <div className="[mask-image:linear-gradient(to_bottom,black_88%,transparent)]">
                <Portrait sizes="360px" />
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <InfoItem
                icon={<Globe2 size={18} aria-hidden />}
                title="Remote-first"
                body="Working with clients worldwide"
              />
              <InfoItem
                icon={<MapPin size={18} aria-hidden />}
                title={`Based in ${site.locality}`}
                body={site.country}
              />
              {site.availableForWork && (
                <InfoItem
                  icon={<Sparkles size={18} aria-hidden />}
                  title="Available"
                  body="Taking on new projects"
                />
              )}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function InfoItem({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <li className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--cyan)_14%,transparent)] text-cyan">
        {icon}
      </span>
      <div className="min-w-0 text-sm">
        <div className="font-heading font-semibold text-foreground">{title}</div>
        <div className="text-muted-foreground">{body}</div>
      </div>
    </li>
  );
}
