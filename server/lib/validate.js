/**
 * Server-side validation. Never trust the browser: every field is type-checked, trimmed,
 * length-limited and stripped of control characters before it goes anywhere near an email.
 */

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const PHONE_RE = /^[+()\-.\s\d]+$/;
const URL_RE = /(https?:\/\/|www\.)/i;

/** One-line text: no control characters (blocks header injection), collapsed whitespace. */
function line(value) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Multi-line text: keeps line breaks, drops other control characters. */
function block(value) {
  if (typeof value !== "string") return "";
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

export function validateInquiry(body) {
  const errors = {};

  const name = line(body.name);
  if (!name) errors.name = "required";
  else if (name.length < 2 || name.length > 80) errors.name = "length";
  else if (URL_RE.test(name) || /[<>]/.test(name)) errors.name = "invalid";

  const email = line(body.email).toLowerCase();
  if (!email) errors.email = "required";
  else if (email.length > 254 || !EMAIL_RE.test(email)) errors.email = "invalid";

  const phone = line(body.phone);
  const digits = phone.replace(/\D/g, "");
  if (
    phone &&
    (!PHONE_RE.test(phone) || digits.length < 7 || digits.length > 15 || phone.length > 25)
  )
    errors.phone = "invalid";

  const company = line(body.company);
  if (company.length > 120) errors.company = "length";

  const service = line(body.service);
  if (service.length > 80) errors.service = "length";

  const message = block(body.message);
  if (message.length > 5000) errors.message = "length";

  let page = line(body.page);
  if (!/^https?:\/\//i.test(page) || page.length > 300) page = "";

  if (Object.keys(errors).length) return { errors };
  return {
    data: { name, email, phone, company, service: service || "Not sure yet", message, page },
  };
}
