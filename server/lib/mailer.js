import { readFileSync } from "node:fs";
import nodemailer from "nodemailer";
import { brand, config } from "./config.js";
import {
  confirmationHtml,
  confirmationText,
  firstName,
  notificationHtml,
  notificationText,
} from "./templates.js";

let transporter;

/** Gmail SMTP: smtp.gmail.com, port 465, TLS from the first byte (secure: true). */
export function getTransporter() {
  transporter ??= nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: { user: config.smtp.user, pass: config.smtp.pass },
  });
  return transporter;
}

// The logo travels inside each email as an inline (CID) attachment, so it shows without hosting
// and without "load remote images".
export const LOGO_CID = "logo@abdullahbukhari";
const logo = readFileSync(new URL("../assets/logo.png", import.meta.url));
const logoAttachment = () => ({
  filename: "abdullah-bukhari.png",
  content: logo,
  cid: LOGO_CID,
  contentType: "image/png",
  contentDisposition: "inline",
});

/** New-lead alert to you. Reply-To is the visitor, so "Reply" in Gmail answers them directly. */
export function sendNotification(lead) {
  return getTransporter().sendMail({
    from: { name: "Website contact form", address: config.smtp.user },
    to: config.notifyTo,
    replyTo: { name: lead.name, address: lead.email },
    subject: `New lead: ${lead.name} — ${lead.service}`,
    html: notificationHtml(lead, LOGO_CID),
    text: notificationText(lead),
    attachments: [logoAttachment()],
  });
}

/** Thank-you to the visitor, sent from your Gmail. Replies come back to you. */
export function sendConfirmation(lead) {
  const replyTo = config.notifyTo.split(",")[0].trim();
  return getTransporter().sendMail({
    from: { name: brand.name, address: config.smtp.user },
    to: { name: lead.name, address: lead.email },
    // Only add Reply-To when it differs from From — a redundant one is just noise.
    replyTo: replyTo && replyTo !== config.smtp.user ? replyTo : undefined,
    subject: `Thanks, ${firstName(lead.name)} — I've received your message`,
    html: confirmationHtml(lead, LOGO_CID),
    text: confirmationText(lead),
    attachments: [logoAttachment()],
    // Standard markers for an automatic reply (RFC 3834): mail systems treat it as a one-off
    // response, and Outlook won't fire out-of-office replies back at you.
    headers: { "Auto-Submitted": "auto-replied", "X-Auto-Response-Suppress": "All" },
  });
}
