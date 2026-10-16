/**
 * Contact API for the portfolio — Express + Nodemailer over Gmail SMTP (smtp.gmail.com:465).
 *
 *   POST /api/contact   send the inquiry: a lead alert to you + a confirmation to the visitor
 *   GET  /api/health    {"ok":true,"configured":true} when SMTP credentials are present
 *
 * Run locally:  npm --prefix server install && npm run api   (reads the repo-root .env)
 * See server/README.md for deployment.
 */
import express from "express";
import { config, isAllowedOrigin, isConfigured } from "./lib/config.js";
import { contactHandler } from "./lib/contact.js";
import { getTransporter } from "./lib/mailer.js";

const app = express();
app.disable("x-powered-by");
// Behind Vercel/Render/NGINX the visitor's IP is in X-Forwarded-For; needed for rate limiting.
app.set("trust proxy", 1);

// CORS: only the live site (and localhost during development) may call the API from a browser.
app.use((req, res, next) => {
  const origin = req.get("origin");
  if (origin && isAllowedOrigin(origin)) {
    res.set({
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    });
  }
  if (req.method === "OPTIONS")
    return res.sendStatus(origin && isAllowedOrigin(origin) ? 204 : 403);
  if (origin && !isAllowedOrigin(origin)) {
    return res.status(403).json({ ok: false, error: "origin_not_allowed" });
  }
  next();
});

app.use(express.json({ limit: "32kb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true, configured: isConfigured() }));
app.post("/api/contact", contactHandler);

app.use((_req, res) => res.status(404).json({ ok: false, error: "not_found" }));

// Malformed JSON, oversized bodies and unexpected errors all return JSON, never a stack trace.
app.use((err, _req, res, _next) => {
  if (err?.type === "entity.too.large")
    return res.status(413).json({ ok: false, error: "too_large" });
  if (err?.type === "entity.parse.failed")
    return res.status(400).json({ ok: false, error: "bad_json" });
  console.error("[api] unexpected error:", err);
  res.status(500).json({ ok: false, error: "server" });
});

export default app;

// On Vercel the platform runs the exported app; everywhere else, start a normal HTTP server.
if (!process.env.VERCEL) {
  app.listen(config.port, () => {
    console.log(`Contact API ready on http://localhost:${config.port}/api/contact`);
    if (!isConfigured()) {
      console.warn("SMTP_USER / SMTP_PASS / NOTIFY_TO are missing — add them to .env");
      return;
    }
    getTransporter()
      .verify()
      .then(() => console.log(`SMTP login OK (${config.smtp.user} via ${config.smtp.host})`))
      .catch((err) => console.error(`SMTP login FAILED: ${err.message}`));
  });
}
