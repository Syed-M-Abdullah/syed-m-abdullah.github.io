import type { ReactNode } from "react";
import { ArrowRight, CalendarClock, Globe2, MapPin, Sparkles } from "lucide-react";
import { site } from "@/data/site";
import type { ServiceSlug } from "@/data/services";
import { ButtonAnchor, ButtonLink } from "./button-link";
import { WhatsAppIcon } from "./floating-actions";
import { whatsappLink } from "@/lib/whatsapp";
import { Container } from "./section";
import { bandClass } from "@/lib/band";
import { PortraitStanding } from "./portrait";

/** Closing call-to-action: a full-width brand band at the bottom of every page. */
export function CtaPanel({
  title = "Let's automate the work that slows you down",
  body = "Tell me what eats your team's time — leads, follow-ups, content or calls. I'll suggest the simplest system that fixes it.",
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
    <section
      aria-labelledby="cta-title"
      className={`${bandClass("brand")} cv-auto overflow-hidden pt-16 pb-12 [contain-intrinsic-size:auto_640px] md:pt-24 md:pb-14`}
    >
      <div aria-hidden className="aurora opacity-90" />
      <Container>
        <div data-reveal="zoom" className="relative">
          <span aria-hidden className="cta-sweep" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.85fr)_minmax(0,0.85fr)] lg:items-center lg:gap-12">
            <div>
              <h2 id="cta-title" className="text-3xl font-bold text-foreground sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {body}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonAnchor href={site.calendly} external size="lg">
                  <CalendarClock size={16} aria-hidden /> Book a call
                </ButtonAnchor>
                <ButtonAnchor href={whatsappLink()} external variant="secondary" size="lg">
                  <WhatsAppIcon className="h-[18px] w-[18px] text-[#25d366]" /> WhatsApp
                </ButtonAnchor>
                <ButtonLink
                  to="/contact"
                  search={service ? { service } : undefined}
                  variant="ghost"
                  size="lg"
                  className="px-2"
                >
                  Discuss a project <ArrowRight size={16} aria-hidden />
                </ButtonLink>
              </div>
              {extra}
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
            {/* Photo last (after the badges); it stands on the bottom edge of the band. */}
            <div className="relative mx-auto -mb-12 w-full max-w-[260px] self-end sm:max-w-[300px] md:-mb-14 lg:max-w-[340px]">
              <div
                aria-hidden
                className="absolute inset-x-[2%] top-[8%] bottom-[4%] -z-10 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--violet)_42%,transparent),transparent),radial-gradient(closest-side_at_50%_35%,color-mix(in_oklab,var(--blue)_38%,transparent),transparent)] blur-2xl"
              />
              <div className="cta-photo [mask-image:linear-gradient(to_bottom,black_86%,transparent)]">
                <PortraitStanding />
              </div>
            </div>
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
