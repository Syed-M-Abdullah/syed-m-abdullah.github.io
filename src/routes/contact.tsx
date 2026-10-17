import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/section";
import { bandClass } from "@/lib/band";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/data/site";
import { seo } from "@/lib/seo";

type ContactSearch = { service?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch =>
    typeof search.service === "string" ? { service: search.service } : {},
  head: () =>
    seo({
      title: "Contact — Discuss a Project",
      description:
        "Tell me about your GoHighLevel, n8n, voice AI, chatbot or custom software project. Send a short message or book a call.",
      path: "/contact",
    }),
  component: ContactPage,
});

const nextSteps = [
  {
    title: "You get a confirmation",
    body: "An email lands in your inbox straight away, so you know it arrived.",
  },
  {
    title: "Pick a time to talk",
    body: "You're taken to my calendar to book a 30-minute call — or reply by email if you prefer.",
  },
  {
    title: "You get a clear plan",
    body: "If it's a fit, a written scope and estimate before any work starts.",
  },
];

function ContactPage() {
  const { service } = Route.useSearch();
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title={
          <>
            Let's talk about <span className="gradient-text">your project</span>
          </>
        }
        intro={
          <p>
            A few sentences is enough to start: what you're trying to automate or build, and which
            tools are involved. Agencies are welcome to describe a client project in general terms.
          </p>
        }
      />

      <section
        aria-label="Contact form and details"
        className={`${bandClass("light")} pt-12 pb-20 md:pt-16 md:pb-28`}
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12">
            <div>
              <ContactForm preselect={service} />
            </div>

            <aside data-reveal="right" data-delay="200" className="space-y-5">
              <div className="panel-border rounded-3xl p-6">
                <h2 className="font-heading text-base font-semibold text-foreground">
                  Prefer a direct route?
                </h2>
                <ul className="mt-4 space-y-3 text-[15px]">
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="flex items-center gap-3 text-foreground hover:text-cyan"
                    >
                      <Mail size={18} className="shrink-0 text-cyan" aria-hidden />
                      <span className="break-all">{site.email}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-foreground hover:text-cyan"
                    >
                      <CalendarClock size={18} className="shrink-0 text-cyan" aria-hidden />
                      Book a 30-minute call
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://wa.me/${site.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-foreground hover:text-cyan"
                    >
                      <MessageCircle size={18} className="shrink-0 text-cyan" aria-hidden />
                      WhatsApp
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-foreground hover:text-cyan"
                    >
                      <Linkedin size={18} className="shrink-0 text-cyan" aria-hidden />
                      LinkedIn
                    </a>
                  </li>
                  {site.fiverr && (
                    <li>
                      <a
                        href={site.fiverr}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-cyan"
                      >
                        Fiverr profile
                      </a>
                    </li>
                  )}
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <MapPin size={18} className="shrink-0 text-cyan" aria-hidden />
                    {site.location}
                  </li>
                </ul>
              </div>

              <div className="panel-border rounded-3xl p-6">
                <h2 className="font-heading text-base font-semibold text-foreground">
                  What happens next
                </h2>
                <ol className="mt-4 space-y-4">
                  {nextSteps.map((s, i) => (
                    <li key={s.title} className="flex gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--blue),var(--violet))] font-mono text-xs font-semibold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <div className="text-[15px] font-semibold text-foreground">{s.title}</div>
                        <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-3xl border border-border bg-panel-2/50 p-6 text-sm leading-relaxed text-muted-foreground">
                <h2 className="font-heading text-sm font-semibold text-foreground">Privacy</h2>
                <p className="mt-2">
                  What you send is used only to reply to your inquiry and discuss the project. It's
                  sent straight to my inbox and isn't shared or added to any mailing list. Please
                  don't include passwords or API keys.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
