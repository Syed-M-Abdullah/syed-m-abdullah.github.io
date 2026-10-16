import { forwardRef, useEffect, useId, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CalendarClock,
  Check,
  CheckCircle2,
  HelpCircle,
  Loader2,
} from "lucide-react";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { buttonClass } from "@/lib/button-class";
import { sendInquiry, type SendResult } from "@/lib/contact";
import { ServiceIcon } from "./services";

// How long the thank-you message shows before the booking calendar opens.
const REDIRECT_MS = 1500;
const NOT_SURE = "not-sure";

type Status = "idle" | "loading" | "success" | "error";
type FailReason = Extract<SendResult, { ok: false }>["reason"];
type Fields = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
};
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", phone: "", company: "", service: "", message: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  const name = f.name.trim();
  if (!name) e.name = "Please enter your name.";
  else if (name.length < 2) e.name = "Please enter your full name.";
  if (!f.email.trim()) e.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
    e.email = "That email address doesn't look right.";
  const phone = f.phone.trim();
  const digits = phone.replace(/\D/g, "").length;
  if (phone && (!/^[+()\-.\s\d]+$/.test(phone) || digits < 7 || digits > 15))
    e.phone =
      "That phone number doesn't look right — include the country code, e.g. +1 555 010 0199.";
  return e;
}

const failMessage: Record<FailReason, string> = {
  rate_limited:
    "You've sent a few messages in a short time. Please wait a few minutes and try again,",
  invalid: "Something in the form couldn't be accepted. Please check your details and try again,",
  unavailable: "Your message couldn't be sent right now. Please try again in a moment,",
  offline: "Your message couldn't be sent right now. Please try again in a moment,",
};

const options = [
  ...services.map((s) => ({ value: s.slug, label: s.shortTitle, hint: s.tagline })),
  {
    value: NOT_SURE,
    label: "Not sure yet",
    hint: "Describe the problem and I'll suggest the right approach.",
  },
];

export function ContactForm({ preselect }: { preselect?: string }) {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failReason, setFailReason] = useState<FailReason>("unavailable");
  const [sentName, setSentName] = useState("");
  const [honey, setHoney] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  // Apply ?service= after hydration so server and client markup match.
  useEffect(() => {
    if (preselect && services.some((s) => s.slug === preselect)) {
      setFields((f) => (f.service ? f : { ...f, service: preselect }));
    }
  }, [preselect]);

  const update = (k: keyof Fields, v: string) => {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };
  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    update(k, e.target.value);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    // Bots fill hidden fields; humans never see this one.
    if (honey) {
      setStatus("success");
      return;
    }
    setStatus("loading");
    const serviceLabel = services.find((s) => s.slug === fields.service)?.title ?? "Not sure yet";
    const result = await sendInquiry({ ...fields, service: serviceLabel, website: honey });
    if (result.ok) {
      setSentName(fields.name.trim().split(/\s+/)[0] ?? "");
      setStatus("success");
      setFields(empty);
    } else {
      setFailReason(result.reason);
      setStatus("error");
    }
  }

  useEffect(() => {
    if (status === "success" || status === "error") statusRef.current?.focus();
  }, [status]);

  if (status === "success") {
    return <SuccessPanel ref={statusRef} name={sentName} />;
  }

  const fieldId = (k: string) => `${uid}-${k}`;
  const errId = (k: string) => `${uid}-${k}-error`;
  const inputClass = (k: keyof Fields) =>
    cn(
      "w-full rounded-xl border bg-background/70 px-4 py-3 text-[15px] text-foreground placeholder:text-subtle transition focus:border-cyan focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklab,var(--cyan)_30%,transparent)]",
      errors[k] ? "border-destructive" : "border-input",
    );

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      data-avoid-fab
      className="relative rounded-3xl border border-border bg-panel p-5 sm:p-8"
    >
      {/* 1. Service */}
      <fieldset>
        <legend className="flex w-full items-baseline gap-3 font-heading text-base font-semibold text-foreground">
          <span className="font-mono text-xs text-cyan">01</span>
          What can I help with?
          <span className="ml-auto font-sans text-xs font-normal text-subtle">Optional</span>
        </legend>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {options.map((o) => {
            const checked = fields.service === o.value;
            return (
              <label
                key={o.value}
                className={cn(
                  "group relative flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition",
                  checked
                    ? "border-[color-mix(in_oklab,var(--blue)_60%,transparent)] bg-[color-mix(in_oklab,var(--blue)_8%,transparent)] shadow-[0_0_0_4px_color-mix(in_oklab,var(--blue)_12%,transparent)]"
                    : "border-border bg-background/50 hover:border-[color-mix(in_oklab,var(--cyan)_45%,transparent)]",
                  "has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-[var(--ring)]",
                )}
              >
                <input
                  type="radio"
                  name="service"
                  value={o.value}
                  checked={checked}
                  onChange={() => update("service", o.value)}
                  className="sr-only"
                />
                {o.value === NOT_SURE ? (
                  <span
                    aria-hidden
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border bg-panel-2 text-muted-foreground"
                  >
                    <HelpCircle size={17} />
                  </span>
                ) : (
                  <ServiceIcon slug={o.value as (typeof services)[number]["slug"]} size="sm" />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-foreground">{o.label}</span>
                  <span className="mt-0.5 line-clamp-2 block text-[12.5px] leading-snug text-muted-foreground">
                    {o.hint}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition",
                    checked
                      ? "border-transparent bg-[linear-gradient(135deg,#2563eb,#7c3aed)] text-white"
                      : "border-border",
                  )}
                >
                  {checked && <Check size={12} strokeWidth={3} />}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* 2. About you */}
      <div className="mt-8">
        <p className="flex items-baseline gap-3 font-heading text-base font-semibold text-foreground">
          <span className="font-mono text-xs text-cyan">02</span>
          About you
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field
            id={fieldId("name")}
            label="Name"
            required
            error={errors.name}
            errorId={errId("name")}
          >
            <input
              id={fieldId("name")}
              name="name"
              autoComplete="name"
              value={fields.name}
              onChange={set("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? errId("name") : undefined}
              className={inputClass("name")}
            />
          </Field>
          <Field
            id={fieldId("email")}
            label="Email"
            required
            error={errors.email}
            errorId={errId("email")}
          >
            <input
              id={fieldId("email")}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={fields.email}
              onChange={set("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? errId("email") : undefined}
              className={inputClass("email")}
            />
          </Field>
          <Field
            id={fieldId("phone")}
            label="Phone / WhatsApp"
            optional
            error={errors.phone}
            errorId={errId("phone")}
          >
            <input
              id={fieldId("phone")}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+1 555 010 0199"
              value={fields.phone}
              onChange={set("phone")}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? errId("phone") : undefined}
              className={inputClass("phone")}
            />
          </Field>
          <Field id={fieldId("company")} label="Company / role" optional>
            <input
              id={fieldId("company")}
              name="company"
              autoComplete="organization"
              placeholder="e.g. Founder, Acme Agency"
              value={fields.company}
              onChange={set("company")}
              className={inputClass("company")}
            />
          </Field>
        </div>
      </div>

      {/* 3. Project */}
      <div className="mt-8">
        <Field
          id={fieldId("message")}
          label={
            <span className="flex items-baseline gap-3 text-base">
              <span className="font-mono text-xs text-cyan">03</span>
              Your project
            </span>
          }
          optional
          hint="A line or two helps — what are you trying to fix or build, and which tools are involved?"
        >
          <textarea
            id={fieldId("message")}
            name="message"
            rows={5}
            value={fields.message}
            onChange={set("message")}
            aria-describedby={`${fieldId("message")}-hint`}
            placeholder="e.g. We need our GoHighLevel leads to get an AI call within 5 minutes and book into the calendar."
            className={cn(inputClass("message"), "resize-y")}
          />
        </Field>
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input
            tabIndex={-1}
            autoComplete="off"
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
          />
        </label>
      </div>

      {status === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 flex gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground outline-none"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-destructive" aria-hidden />
          <div>
            <p>
              {failMessage[failReason]} or email me directly at{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-cyan underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
              .
            </p>
            {/* Development only — never shown on the live site. */}
            {import.meta.env.DEV && failReason === "offline" && (
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                Dev: the contact API isn't running on localhost:8787. Start the site with{" "}
                <code className="text-foreground">npm run dev:full</code> (API + site together).
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
          Used only to reply to your inquiry — never shared or added to a mailing list. After
          sending, you'll be taken to my calendar to pick a time.
        </p>
        <button
          type="submit"
          disabled={status === "loading"}
          className={buttonClass("primary", "lg", "w-full sm:w-auto")}
        >
          {status === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Send message <ArrowRight size={16} aria-hidden />
            </>
          )}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {status === "loading" ? "Sending your message" : ""}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  optional,
  hint,
  error,
  errorId,
  children,
}: {
  id: string;
  label: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  errorId?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="font-heading text-sm font-semibold text-foreground">
          {label}
          {required && <span className="sr-only"> (required)</span>}
        </label>
        {optional && <span className="text-xs text-subtle">Optional</span>}
      </div>
      {hint && (
        <p id={`${id}-hint`} className="-mt-0.5 mb-2 text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-[13px] text-destructive">
          <AlertCircle size={13} aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}

/**
 * Shown only after the server confirms the emails were sent: a short thank-you, then the booking
 * calendar opens in the same tab. The link is there in case the browser blocks the redirect.
 */
const SuccessPanel = forwardRef<HTMLDivElement, { name: string }>(function SuccessPanel(
  { name },
  ref,
) {
  useEffect(() => {
    const t = window.setTimeout(() => window.location.assign(site.calendly), REDIRECT_MS);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      className="relative overflow-hidden rounded-3xl border border-border bg-panel px-6 py-14 text-center outline-none sm:px-10"
    >
      <div aria-hidden className="aurora opacity-70" />
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[color-mix(in_oklab,var(--success)_14%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--success)_40%,transparent)]">
        <CheckCircle2 size={32} className="text-success" aria-hidden />
      </span>
      <h2 className="mt-6 text-2xl font-bold text-foreground sm:text-3xl">
        Thank you{name ? `, ${name}` : ""}!
      </h2>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        Your message has been sent and a confirmation is on its way to your inbox.
      </p>

      <div className="mx-auto mt-7 max-w-xs">
        <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <CalendarClock size={15} className="text-cyan" aria-hidden />
          Taking you to my calendar to pick a time…
        </p>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-panel-2">
          <div className="redirect-bar h-full rounded-full bg-[linear-gradient(90deg,#38bdf8,#7c3aed)]" />
        </div>
        <a
          href={site.calendly}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan underline-offset-4 hover:underline"
        >
          Continue to the calendar <ArrowRight size={14} aria-hidden />
        </a>
      </div>
    </div>
  );
});
