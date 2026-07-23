import { site } from "@/data/site";
import { services } from "@/data/services";
import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, MessageCircle, CheckCircle2, Loader2, CalendarClock } from "lucide-react";


export function CTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 circuit-bg opacity-70" />
      <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
        <h2 className="font-display text-4xl font-extrabold leading-[1.05] text-foreground md:text-6xl">
          Ready to automate <span className="gradient-text">your whole business?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Tell me your biggest bottleneck. I'll tell you exactly how to fix it — then build it,
          test it and ship it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-blue px-7 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_20px_40px_-15px_rgba(59,130,246,0.6)] transition hover:bg-blue-deep"
          >
            Start a Project →
          </a>
          <a
            href={site.calendly}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-panel px-7 py-3.5 font-heading text-sm font-semibold text-foreground transition hover:border-blue/50"
          >
            Book a 30-min call →
          </a>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-panel px-7 py-3.5 font-heading text-sm font-semibold text-foreground transition hover:border-blue/50"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

type SubmitState = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    service: services[0].title,
    challenge: "",
  });
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New project inquiry — ${form.service} — ${form.name}`,
          _template: "table",
          _cc: site.emails.filter((e) => e !== site.email).join(","),
          Name: form.name,
          Company: form.company,
          Email: form.email,
          Service: form.service,
          Challenge: form.challenge,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.success === "true" || data.success === true)) {
        setStatus("success");
        setForm({
          name: "",
          company: "",
          email: "",
          service: services[0].title,
          challenge: "",
        });
      } else {
        throw new Error(data.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email me directly.",
      );
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 max-w-3xl" data-reveal>
          <div className="mb-3 font-heading text-[11px] uppercase tracking-[0.2em] text-blue">
            — Contact
          </div>
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] text-foreground md:text-5xl">
            Let's build something <span className="gradient-text">that ships.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Worldwide, remote-first. Response within 24 hours.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: contact details + Calendly */}
          <div data-reveal className="space-y-8">
            <div className="space-y-3">
              {site.emails.map((e) => (
                <a
                  key={e}
                  href={`mailto:${e}`}
                  className="flex items-center gap-3 text-foreground hover:text-blue"
                >
                  <Mail size={18} className="text-blue" /> {e}
                </a>
              ))}
              {/* <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-3 text-foreground hover:text-blue"
              >
                <Phone size={18} className="text-blue" /> {site.phone}
              </a> */}
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-foreground hover:text-blue"
              >
                <MessageCircle size={18} className="text-blue" /> WhatsApp · {site.phone}
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-foreground hover:text-blue"
              >
                <Linkedin size={18} className="text-blue" /> linkedin.com/in/syedabdullahbukhari
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin size={18} className="text-blue" /> {site.location}
              </div>
            </div>

            {/* Book a call CTA */}
            <a
              href="#book"
              className="panel-border panel-border-hover group flex items-center justify-between gap-4 rounded-2xl p-5"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue/10 text-blue">
                  <CalendarClock size={20} />
                </span>
                <div>
                  <div className="font-heading text-sm font-semibold text-foreground">
                    Prefer a live conversation?
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Book a free 30-min discovery call →
                  </div>
                </div>
              </div>
              <span className="hidden font-heading text-[11px] uppercase tracking-[0.2em] text-blue group-hover:translate-x-1 transition sm:inline">
                Open calendar
              </span>
            </a>

          </div>

          {/* Right: form */}
          <form
            onSubmit={handleSubmit}
            data-reveal
            className="panel-border h-fit rounded-2xl p-6 md:p-8"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <CheckCircle2 size={48} className="text-blue" />
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Message sent.
                </h3>
                <p className="max-w-sm text-muted-foreground">
                  Thanks — I'll get back to you within 24 hours. Prefer to talk sooner?
                  Grab a slot on the calendar or ping me on WhatsApp.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 rounded-full border border-border bg-panel px-5 py-2 font-heading text-xs font-semibold uppercase tracking-wider text-foreground hover:border-blue/50"
                >
                  Send another
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" required>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={fieldClass}
                    />
                  </Field>
                  <Field label="Company">
                    <input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={fieldClass}
                    />
                  </Field>
                </div>
                <Field label="Email" required>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={fieldClass}
                  />
                </Field>
                <Field label="Service">
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className={fieldClass}
                  >
                    {services.map((s) => (
                      <option key={s.title}>{s.title}</option>
                    ))}
                    <option>Not sure — let me explain</option>
                  </select>
                </Field>
                <Field label="What's your biggest bottleneck?" required>
                  <textarea
                    required
                    rows={5}
                    value={form.challenge}
                    onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                    className={`${fieldClass} resize-none`}
                  />
                </Field>
                {status === "error" && (
                  <div className="mb-3 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
                    {errorMsg}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-blue px-6 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_20px_40px_-15px_rgba(59,130,246,0.6)] transition hover:bg-blue-deep disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>Send Message →</>
                  )}
                </button>
                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  Or email directly:{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="text-blue hover:underline"
                  >
                    {site.email}
                  </a>
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

const fieldClass =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 font-body text-sm text-foreground outline-none transition focus:border-blue";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="mb-4 block last:mb-0">
      <span className="mb-1.5 block font-heading text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {label} {required && <span className="text-blue">*</span>}
      </span>
      {children}
    </label>
  );
}
