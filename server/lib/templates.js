/**
 * Email templates: table-based layout with inline CSS (safe in Gmail, Outlook and Apple Mail),
 * the site's navy / blue / violet palette, and a plain-text version of each email.
 * Every value that came from the visitor goes through esc() before it is placed in HTML.
 */
import { brand } from "./config.js";

const C = {
  page: "#eef1f8",
  card: "#ffffff",
  ink: "#0b1224",
  text: "#334155",
  muted: "#64748b",
  line: "#e2e8f0",
  soft: "#f6f8fc",
  navy: "#050816",
  navy2: "#0b1224",
  blue: "#2563eb",
  violet: "#7c3aed",
  cyan: "#38bdf8",
};
const FONT =
  "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif";

export function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** First name for greetings — letters only, so the name field can't smuggle links into emails. */
export function firstName(name) {
  const first = String(name).trim().split(/\s+/)[0] || "";
  return first.replace(/[^\p{L}\p{M}'-]/gu, "").slice(0, 30) || "there";
}

const host = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
const multiline = (text) => esc(text).replace(/\n/g, "<br>");

function button(href, label, variant = "primary") {
  const primary = variant === "primary";
  const bg = primary ? C.blue : C.card;
  const gradient = primary
    ? `background-image:linear-gradient(110deg,${C.blue},#4f46e5 55%,${C.violet});`
    : "";
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" class="btn" style="display:inline-table;margin:0 10px 10px 0;">
  <tr><td align="center" style="border-radius:999px;background:${bg};${gradient}border:1px solid ${primary ? C.blue : C.line};">
    <a href="${esc(href)}" target="_blank" style="display:inline-block;padding:13px 26px;font-family:${FONT};font-size:15px;font-weight:600;line-height:20px;color:${primary ? "#ffffff" : C.ink};text-decoration:none;border-radius:999px;">${label}</a>
  </td></tr>
</table>`;
}

function row(label, valueHtml) {
  return `<tr>
  <td class="label" valign="top" style="padding:13px 16px 13px 0;border-bottom:1px solid ${C.line};width:128px;font-family:${FONT};font-size:13px;line-height:20px;color:${C.muted};">${label}</td>
  <td valign="top" style="padding:13px 0;border-bottom:1px solid ${C.line};font-family:${FONT};font-size:15px;line-height:22px;color:${C.ink};word-break:break-word;">${valueHtml}</td>
</tr>`;
}

const link = (href, text) =>
  `<a href="${esc(href)}" target="_blank" style="color:${C.blue};text-decoration:none;font-weight:600;">${esc(text)}</a>`;

/**
 * Shared frame: navy header with the logo, gradient rule, white card, quiet footer.
 * Deliberately no hidden preheader text and no footer links — hidden text and link-heavy
 * footers are classic spam-filter signals for one-to-one emails like these.
 */
function layout({ title, body, footer, logoCid }) {
  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(title)}</title>
<style>
  @media only screen and (max-width:620px) {
    .outer { padding:16px 10px !important; }
    .px { padding-left:22px !important; padding-right:22px !important; }
    .h1 { font-size:22px !important; line-height:29px !important; }
    .label { width:96px !important; }
    .btn { display:table !important; width:100% !important; margin:0 0 10px 0 !important; }
    .btn a { display:block !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.page};-webkit-text-size-adjust:100%;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.page};">
<tr><td align="center" class="outer" style="padding:32px 16px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
    <tr><td class="px" style="background:${C.navy};background-image:linear-gradient(135deg,${C.navy} 0%,${C.navy2} 55%,#1e1b4b 100%);border-radius:16px 16px 0 0;padding:24px 32px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td valign="middle" style="padding-right:14px;"><img src="cid:${logoCid}" width="57" height="38" alt="AB" style="display:block;border:0;outline:none;width:57px;height:38px;"></td>
        <td valign="middle">
          <div style="font-family:${FONT};font-size:17px;font-weight:700;line-height:22px;color:#f5f7ff;">${esc(brand.name)}</div>
          <div style="font-family:${FONT};font-size:12px;line-height:18px;color:#aab6cc;">${esc(brand.title)}</div>
        </td>
      </tr></table>
    </td></tr>
    <tr><td style="height:4px;line-height:4px;font-size:0;background:${C.blue};background-image:linear-gradient(90deg,${C.cyan},${C.blue},${C.violet});">&nbsp;</td></tr>
    <tr><td class="px" style="background:${C.card};border:1px solid ${C.line};border-top:0;border-radius:0 0 16px 16px;padding:36px 32px 32px;">
${body}
    </td></tr>
    <tr><td align="center" style="padding:22px 16px 0;font-family:${FONT};font-size:12px;line-height:18px;color:${C.muted};">
      ${footer}
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

/* ---------------------------------------------------------------- notification (to you) */

export function notificationHtml(lead, logoCid) {
  const first = firstName(lead.name);
  const replyHref = `mailto:${lead.email}?subject=${encodeURIComponent(`Re: your ${lead.service} inquiry`)}`;
  const phoneDigits = lead.phone.replace(/\D/g, "");

  const rows = [
    row("Name", esc(lead.name)),
    row("Email", link(`mailto:${lead.email}`, lead.email)),
    lead.phone
      ? row(
          "Phone",
          `${link(`tel:${lead.phone.replace(/[^\d+]/g, "")}`, lead.phone)} &nbsp;<span style="color:${C.muted};">&middot;</span>&nbsp; ${link(`https://wa.me/${phoneDigits}`, "WhatsApp")}`,
        )
      : "",
    lead.company ? row("Company / role", esc(lead.company)) : "",
    row("Service", esc(lead.service)),
    lead.message ? row("Message", multiline(lead.message)) : "",
    lead.page ? row("Sent from", esc(host(lead.page))) : "",
  ].join("");

  const body = `
<div style="display:inline-block;padding:5px 12px;border-radius:999px;background:#eef2ff;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:${C.violet};">New lead</div>
<h1 class="h1" style="margin:16px 0 6px;font-family:${FONT};font-size:24px;line-height:31px;font-weight:700;color:${C.ink};">${esc(lead.name)} wants to talk about ${esc(lead.service)}</h1>
<p style="margin:0 0 22px;font-family:${FONT};font-size:14px;line-height:21px;color:${C.muted};">Received ${esc(lead.receivedAt)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.line};">${rows}</table>
<div style="height:26px;line-height:26px;font-size:0;">&nbsp;</div>
${button(replyHref, `Reply to ${esc(first)}`)}${lead.phone ? button(`https://wa.me/${phoneDigits}`, `WhatsApp ${esc(first)}`, "secondary") : ""}
<p style="margin:14px 0 0;font-family:${FONT};font-size:13px;line-height:20px;color:${C.muted};">Pressing Reply answers ${esc(lead.email)} directly. They were taken to your Calendly after sending &mdash; check for a booking too.</p>`;

  return layout({
    title: `New lead: ${lead.name}`,
    body,
    footer: "Sent by the contact form on your website.",
    logoCid,
  });
}

export function notificationText(lead) {
  return [
    `New lead — ${lead.service}`,
    "",
    `Name:      ${lead.name}`,
    `Email:     ${lead.email}`,
    lead.phone ? `Phone:     ${lead.phone}` : null,
    lead.company ? `Company:   ${lead.company}` : null,
    `Service:   ${lead.service}`,
    `Received:  ${lead.receivedAt}`,
    lead.page ? `Sent from: ${lead.page}` : null,
    "",
    lead.message ? `Message:\n${lead.message}` : "No message — only the basics were filled in.",
    "",
    `Reply to this email to answer ${lead.email} directly.`,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

/* ------------------------------------------------------------- confirmation (to the visitor) */

export function confirmationHtml(lead, logoCid) {
  const first = esc(firstName(lead.name));
  const about =
    lead.service && lead.service !== "Not sure yet"
      ? ` about <strong style="color:${C.ink};">${esc(lead.service)}</strong>`
      : "";
  const p = (html, mb = 16) =>
    `<p style="margin:0 0 ${mb}px;font-family:${FONT};font-size:16px;line-height:25px;color:${C.text};">${html}</p>`;
  const detail = (label, valueHtml) => `<tr>
  <td class="label" valign="top" style="padding:7px 16px 7px 0;width:96px;font-family:${FONT};font-size:13px;line-height:20px;color:${C.muted};">${label}</td>
  <td valign="top" style="padding:7px 0;font-family:${FONT};font-size:14px;line-height:20px;color:${C.ink};">${valueHtml}</td>
</tr>`;

  const body = `
<h1 class="h1" style="margin:0 0 16px;font-family:${FONT};font-size:26px;line-height:33px;font-weight:700;color:${C.ink};">Thanks, ${first} &mdash; I&rsquo;ve received your message.</h1>
${p(`Thank you for getting in touch${about}. I read every inquiry personally and I&rsquo;ll get back to you shortly.`)}
${p("If you&rsquo;d like to talk it through sooner, pick a time that suits you:", 24)}
${button(brand.calendly, "Book a 30-min call")}
<div style="height:1px;line-height:1px;font-size:0;background:${C.line};margin:26px 0 22px;">&nbsp;</div>
<div style="font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:${C.blue};margin:0 0 8px;">Contact details</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
  ${detail("Email", link(`mailto:${brand.email}`, brand.email))}
  ${detail("WhatsApp", esc(brand.phoneLabel))}
  ${detail("Website", link(brand.site, host(brand.site)))}
</table>
<div style="height:1px;line-height:1px;font-size:0;background:${C.line};margin:22px 0 20px;">&nbsp;</div>
<p style="margin:0;font-family:${FONT};font-size:15px;line-height:22px;color:${C.text};">Best regards,</p>
<p style="margin:2px 0 0;font-family:${FONT};font-size:15px;line-height:22px;font-weight:700;color:${C.ink};">${esc(brand.name)}</p>
<p style="margin:0;font-family:${FONT};font-size:13px;line-height:20px;color:${C.muted};">${esc(brand.title)}</p>`;

  return layout({
    title: `Thanks, ${firstName(lead.name)}`,
    body,
    footer: `You’re receiving this because you sent a message through the contact form on ${host(brand.site)}. If that wasn’t you, you can safely ignore this email.`,
    logoCid,
  });
}

export function confirmationText(lead) {
  const about = lead.service && lead.service !== "Not sure yet" ? ` about ${lead.service}` : "";
  return [
    `Hi ${firstName(lead.name)},`,
    "",
    `Thank you for getting in touch${about}. I read every inquiry personally and I'll get back to you shortly.`,
    "",
    `If you'd like to talk it through sooner, book a 30-min call: ${brand.calendly}`,
    "",
    "Contact details",
    `Email:    ${brand.email}`,
    `WhatsApp: ${brand.phoneLabel}`,
    `Website:  ${brand.site}`,
    "",
    "Best regards,",
    brand.name,
    brand.title,
  ].join("\n");
}
