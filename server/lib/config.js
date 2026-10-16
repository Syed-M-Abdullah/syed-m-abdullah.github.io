/**
 * Runtime configuration. Credentials come ONLY from environment variables (the repo-root .env
 * locally, the host's environment settings in production) — never from code.
 */

const DEFAULT_ORIGINS = ["https://syed-m-abdullah.github.io"];

export const config = {
  port: Number(process.env.PORT) || 8787,
  smtp: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
    user: (process.env.SMTP_USER || "").trim(),
    // Google shows app passwords in groups of four ("abcd efgh ..."); SMTP needs them without spaces.
    pass: (process.env.SMTP_PASS || "").replace(/\s+/g, ""),
  },
  notifyTo: (process.env.NOTIFY_TO || process.env.SMTP_USER || "").trim(),
  allowedOrigins: (process.env.ALLOWED_ORIGINS || DEFAULT_ORIGINS.join(","))
    .split(",")
    .map((o) => o.trim().replace(/\/$/, ""))
    .filter(Boolean),
};

export const isConfigured = () => Boolean(config.smtp.user && config.smtp.pass && config.notifyTo);

/** Public details used in the emails. */
export const brand = {
  name: "Abdullah Bukhari",
  title: "AI Automation & Software Engineer",
  site: "https://syed-m-abdullah.github.io",
  calendly: "https://calendly.com/abdullahbukhari/30min",
  linkedin: "https://www.linkedin.com/in/syedabdullahbukhari",
  email: "bukhariabdullah034@gmail.com",
  whatsapp: "923166371847",
  phoneLabel: "+92 316 6371847",
  timeZone: "Asia/Karachi",
  timeZoneLabel: "PKT",
};

/** Browser origins allowed to call the API: the live site, plus any localhost port for development. */
export function isAllowedOrigin(origin) {
  if (!origin) return false;
  const o = origin.replace(/\/$/, "");
  return config.allowedOrigins.includes(o) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(o);
}
