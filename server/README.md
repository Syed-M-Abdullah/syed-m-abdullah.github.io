# Contact API — Express + Nodemailer (Gmail SMTP)

The website is a static export on GitHub Pages, and browsers can't speak SMTP, so the contact form
posts to this small Node API. It sends two emails through **smtp.gmail.com:465 (TLS)** with
Nodemailer — no third-party email service:

1. **New-lead alert to you** — name, email, phone, company, service, message (when given) and the
   time received. Reply-To is the visitor, so pressing Reply answers them directly.
2. **Confirmation to the visitor** — thank-you, a "Book a 30-min call" button
   (https://calendly.com/abdullahbukhari/30min) and your contact details.

Both are table-based HTML with inline CSS (Gmail/Outlook/Apple Mail safe), responsive, with a
plain-text version. The logo is attached inline (CID), so nothing needs to be hosted.

```
server/
  index.js            Express app: CORS, JSON limit, POST /api/contact, GET /api/health
  lib/config.js       reads SMTP_* / NOTIFY_TO from the environment; public brand details
  lib/validate.js     server-side validation and sanitising
  lib/rate-limit.js   in-memory rate limiter
  lib/contact.js      request handler (honeypot, validation, limits, sending)
  lib/mailer.js       Nodemailer transport (smtp.gmail.com:465, secure) + inline logo
  lib/templates.js    the two HTML emails + plain-text versions (all input HTML-escaped)
  assets/logo.png     logo embedded in the emails
```

## Credentials

Only in `.env` at the repo root (git-ignored) locally, or in your host's environment settings in
production. Never in code. See `.env.example`.

| Variable          | Value                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------- |
| `SMTP_USER`       | the Gmail address that sends the emails                                                 |
| `SMTP_PASS`       | a Google **app password** for that account (spaces are fine)                            |
| `NOTIFY_TO`       | where lead alerts go                                                                    |
| `ALLOWED_ORIGINS` | optional; defaults to `https://syed-m-abdullah.github.io` (localhost is always allowed) |
| `PORT`            | optional; default `8787`                                                                |

App passwords need 2-Step Verification on the Google account: Google Account → Security →
2-Step Verification → **App passwords**. If you ever revoke one, create a new one and update
`SMTP_PASS` (in `.env` and on your host).

## Run locally

Run these from the repo root. The API and the site are two separate processes, so use **two
terminals** and keep both running while you test.

```bash
npm install --prefix server   # once — installs express + nodemailer into server/
```

Terminal 1 — the API (reads the repo-root `.env`):

```bash
npm run api
```

It prints `SMTP login OK (...)` when Gmail accepts the credentials. Terminal 2 — the site:

```bash
npm run dev
```

Open http://localhost:8080/contact/ — in development the form posts to
http://localhost:8787/api/contact. If the browser console shows `ERR_CONNECTION_REFUSED` for that
URL, the API in terminal 1 isn't running.

## Deploy (production)

GitHub Pages can't run Node, so the API needs a Node host. Either option works with this folder as-is.

### Option A — Vercel (recommended, free, no cold starts worth noticing)

1. Sign in at <https://vercel.com> with GitHub → **Add New… → Project** → import this repository.
2. **Root Directory:** `server` (Framework preset: Express / Other — auto-detected).
3. **Environment Variables:** add `SMTP_USER`, `SMTP_PASS`, `NOTIFY_TO`.
4. **Deploy.** Open `https://<your-project>.vercel.app/api/health` — you should see
   `{"ok":true,"configured":true}`.

### Option B — Render (or any Node host / VPS)

1. <https://render.com> → **New → Web Service** → this repository.
2. **Root Directory:** `server` · **Build:** `npm install` · **Start:** `npm start`.
3. Add the same environment variables → **Create**. (Free instances sleep when idle; the first
   submission after a pause can take ~30–50 s. The form waits up to 60 s.)

### Point the website at the API

In `src/data/site.ts` set:

```ts
contactApi: "https://<your-project>.vercel.app/api/contact",
```

Commit and push — GitHub Actions rebuilds the site with the new URL.

## Safeguards

- **Validation** on the server: name 2–80 chars (no links), valid email, optional phone (7–15
  digits), length limits on every field, control characters stripped (no header injection).
- **HTML escaping** of every visitor-supplied value in the emails.
- **Honeypot**: the hidden `website` field — bots that fill it get "ok" and nothing is sent.
- **Rate limiting**: 5 submissions per IP per 15 minutes; 100 per day overall (Gmail's limit is
  ~500 emails/day); one confirmation per visitor address per 10 minutes.
- **CORS**: only the live site and localhost can call the API from a browser.
- 32 KB request limit; errors return JSON, never stack traces.
- The confirmation never repeats the visitor's message, so the form can't be used to send
  arbitrary content from your address.

## Inbox placement (spam)

Sending through smtp.gmail.com with your account means Gmail signs every message for gmail.com,
so SPF, DKIM and DMARC pass automatically (check with **⋮ → Show original** in Gmail). The
templates also avoid common filter triggers: no hidden preview text, only three links in the
confirmation, a plain-text version, an inline logo instead of a remote image, and the standard
`Auto-Submitted: auto-replied` header.

What code can't control is a recipient's history with a brand-new sender. If a message lands in
Spam (Gmail also hides its images there — the logo "disappears"):

- open it and click **Report not spam** / **Looks safe**, and add the sender to Contacts;
- for the best long-term delivery, send from a mailbox on your own domain (e.g.
  `hello@yourdomain.com` via Google Workspace) with SPF, DKIM and DMARC set up — then point
  `SMTP_USER` / `SMTP_PASS` at that account. Nothing else in the code changes.

## Test checklist

- [ ] `npm run api` prints `SMTP login OK`.
- [ ] Submit the form **with** a message → "Thank you, …!" for ~1.5 s → Calendly opens.
- [ ] Your inbox: **New lead: …** with all details; pressing Reply addresses the visitor.
- [ ] The visitor inbox: **Thanks, … — I've received your message** with logo and booking button.
- [ ] Submit **without** a message (different email) → same flow; the lead alert has no message row.
- [ ] Stop the API and submit → an error message appears and the page does **not** redirect.
- [ ] After deploying: `/api/health` shows `configured: true`, then repeat the two submissions on
      the live site.
