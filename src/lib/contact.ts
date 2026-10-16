import { site } from "@/data/site";

export type Inquiry = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  /** Honeypot value (should be empty for humans). */
  website: string;
};

export type SendResult =
  | { ok: true }
  | {
      ok: false;
      /** "offline": the API couldn't be reached at all (not running, wrong URL, no network). */
      reason: "rate_limited" | "invalid" | "unavailable" | "offline";
    };

const DEV_API = "http://localhost:8787/api/contact";
// Generous, so a host that was asleep (e.g. a free-tier server waking up) can still answer.
const TIMEOUT_MS = 60_000;

/** Contact API URL: an explicit VITE_CONTACT_API_URL, the local API in dev, else site.contactApi. */
function apiUrl(): string {
  const fromEnv = import.meta.env.VITE_CONTACT_API_URL as string | undefined;
  return fromEnv || (import.meta.env.DEV ? DEV_API : site.contactApi);
}

/**
 * Sends a contact-form inquiry to the contact API in /server, which emails you a lead alert and
 * the visitor a confirmation through Gmail SMTP. No credentials ever live in the browser.
 */
export async function sendInquiry(inquiry: Inquiry): Promise<SendResult> {
  const url = apiUrl();
  if (!url) return { ok: false, reason: "offline" };

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: inquiry.name.trim(),
        email: inquiry.email.trim(),
        phone: inquiry.phone.trim(),
        company: inquiry.company.trim(),
        service: inquiry.service,
        message: inquiry.message.trim(),
        website: inquiry.website,
        page: window.location.href,
      }),
      signal: controller.signal,
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
    if (res.ok && data.ok === true) return { ok: true };
    if (res.status === 429) return { ok: false, reason: "rate_limited" };
    if (res.status === 400) return { ok: false, reason: "invalid" };
    return { ok: false, reason: "unavailable" };
  } catch {
    return { ok: false, reason: "offline" };
  } finally {
    window.clearTimeout(timer);
  }
}
