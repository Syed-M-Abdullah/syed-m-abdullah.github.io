import { brand, isConfigured } from "./config.js";
import { createRateLimiter } from "./rate-limit.js";
import { validateInquiry } from "./validate.js";
import { sendConfirmation, sendNotification } from "./mailer.js";

// Per visitor IP: 5 submissions per 15 minutes.
const perIp = createRateLimiter({ windowMs: 15 * 60_000, max: 5 });
// Whole API: 100 inquiries a day keeps well inside Gmail's sending limits (each uses 2 emails).
const perDay = createRateLimiter({ windowMs: 24 * 60 * 60_000, max: 100 });
// One confirmation per visitor address every 10 minutes, so nobody can flood an inbox with them.
const confirmations = createRateLimiter({ windowMs: 10 * 60_000, max: 1 });

const timestamp = new Intl.DateTimeFormat("en-GB", {
  timeZone: brand.timeZone,
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

/** POST /api/contact */
export async function contactHandler(req, res) {
  const ipLimit = perIp(req.ip || "unknown");
  if (!ipLimit.allowed) {
    res.set("Retry-After", String(ipLimit.retryAfterSeconds));
    return res.status(429).json({ ok: false, error: "rate_limited" });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};

  // Honeypot: real visitors never see the "website" field. Bots that fill it get a normal-looking
  // success response, and nothing is sent.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return res.json({ ok: true });
  }

  const { data, errors } = validateInquiry(body);
  if (errors) return res.status(400).json({ ok: false, error: "invalid", fields: errors });

  if (!isConfigured()) {
    console.error("[contact] SMTP_USER, SMTP_PASS or NOTIFY_TO is not set — cannot send.");
    return res.status(500).json({ ok: false, error: "not_configured" });
  }

  if (!perDay("all").allowed) {
    return res.status(429).json({ ok: false, error: "busy" });
  }

  const when = timestamp.format(new Date()).replace(/\b(am|pm)\b/, (m) => m.toUpperCase());
  const lead = { ...data, receivedAt: `${when} ${brand.timeZoneLabel}` };

  try {
    await sendNotification(lead);
  } catch (err) {
    console.error("[contact] notification failed:", err?.message || err);
    return res.status(502).json({ ok: false, error: "send_failed" });
  }

  // The lead is safely in your inbox at this point; a failed confirmation shouldn't fail the
  // request (the visitor still gets the success screen), so it is only logged.
  if (confirmations(lead.email).allowed) {
    try {
      await sendConfirmation(lead);
    } catch (err) {
      console.error("[contact] confirmation failed:", err?.message || err);
    }
  }

  return res.json({ ok: true });
}
