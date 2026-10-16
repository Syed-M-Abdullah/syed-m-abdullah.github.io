// Keep value imports out of this file: scripts/export-static.mjs loads it with Node's
// TypeScript type-stripping to build the static route list and sitemap.
import type { ServiceSlug } from "./services";

/**
 * One exclusive category per project, derived from how the project folders are organised
 * (src/assets/Portfolio/<Voice Agent | N8n | Make.com | Zapier | GHL | Custom Code>).
 * The /case-studies tabs filter on this field only, so a project appears under exactly one tab.
 */
export type Category = "voice" | "automation" | "crm" | "chatbots" | "erp-pos" | "web";

/** Only set when known. Projects without a status show no status badge. */
export type CaseStatus = "client" | "internal" | "concept";

export type CaseStudy = {
  slug: string;
  category: Category;
  title: string;
  /** Industry / domain label. */
  tag: string;
  location: string;
  /** One-sentence summary for cards. */
  summary: string;
  /** The challenge, as the client experienced it. */
  problem: string;
  /** What was built and how it works. */
  description: string;
  /** Simplified system workflow, rendered as an illustrative diagram. */
  flow: string[];
  tools: string[];
  services: ServiceSlug[];
  /** Descriptive facts about the system (design choices, scope) — not outcome claims. */
  highlights: { value: string; label: string }[];
  /** Outcome numbers. Shown only when `verified: true`. */
  metrics?: { value: string; label: string; verified: boolean }[];
  /** Your role on the project, e.g. "Sole engineer: architecture, build and handover". */
  role?: string;
  status?: CaseStatus;
  featured?: boolean;
  /**
   * Real screenshots only. Put files in public/case-media/<slug>/ and reference them as
   * "/case-media/<slug>/01.webp". Leave empty rather than using placeholders.
   */
  screenshots?: { src: string; alt: string; width: number; height: number; caption?: string }[];
  /** Real walkthrough only: an mp4 in public/case-media/<slug>/ or a YouTube/Loom embed URL. */
  video?: { src: string; title: string; kind: "file" | "embed"; poster?: string };
  lessons?: string[];
};

export const statusLabels: Record<CaseStatus, string> = {
  client: "Client project",
  internal: "Internal build",
  concept: "Concept / demo",
};

export const categoryLabels: Record<Category, string> = {
  voice: "AI Voice Agents",
  automation: "AI Automation & Workflows",
  crm: "CRM & GoHighLevel",
  chatbots: "Chatbots & WhatsApp Agents",
  "erp-pos": "ERP & POS Systems",
  web: "Web & Mobile Platforms",
};

/** Tab order on /case-studies. */
export const categoryOrder: Category[] = [
  "voice",
  "automation",
  "crm",
  "chatbots",
  "erp-pos",
  "web",
];

export const caseStudies: CaseStudy[] = [
  // ---------------- GoHighLevel & Voice (from project reports) ----------------
  {
    slug: "white-label-voice-agents",
    category: "voice",
    title: "White-Label Voice Agents for an AI Agency",
    tag: "Agency delivery · GoHighLevel",
    location: "Global",
    status: "client",
    featured: true,
    summary:
      "Inbound and outbound Synthflow voice agents built per client sub-account inside an AI agency's white-labelled GoHighLevel.",
    problem:
      "The agency needed voice agents for many client businesses — each with its own sub-account, call flows, booking and CRM updates — delivered under its own brand.",
    description:
      "Inside the agency's white-labelled GoHighLevel (Mavera.ai), each client got a dedicated sub-account with Synthflow voice agents and a standard set of workflows. Inbound setups handle the call, book the appointment and process post-call data; outbound setups run initial calls, booking and post-call updates. Confirmation emails with appointment details and rescheduling links are sent and stored on the contact record. The same pattern was rolled out for a barber shop, beauty and hair salons, a café, a restaurant, a car-rental business, a real-estate agent, a social-media agency and a German-language outbound campaign — each one is written up as its own project below.",
    flow: [
      "Call in / out",
      "Synthflow agent",
      "Book appointment",
      "Post-call data",
      "CRM + confirmation",
    ],
    highlights: [
      { value: "Inbound + outbound", label: "Agent pairs per business" },
      { value: "Per sub-account", label: "Workflows & agents" },
      { value: "White-label", label: "Delivered under agency brand" },
    ],
    tools: ["GoHighLevel", "Synthflow", "Voice agents", "Email automation"],
    services: ["voice-ai", "gohighlevel-automation"],
    screenshots: [
      {
        src: "/case-media/white-label-voice-agents/01.webp",
        alt: "Synthflow agent list for a café sub-account with inbound and outbound agents",
        width: 1600,
        height: 828,
        caption: "Synthflow: dedicated inbound and outbound agents for a café sub-account.",
      },
      {
        src: "/case-media/white-label-voice-agents/02.webp",
        alt: "GoHighLevel outbound workflows: initial outbound calls, appointment booked, post outbound called data",
        width: 1600,
        height: 727,
        caption:
          "Outbound workflows in GoHighLevel: initial calls, appointment booked, post-call data.",
      },
      {
        src: "/case-media/white-label-voice-agents/03.webp",
        alt: "GoHighLevel inbound workflows for a restaurant sub-account",
        width: 1600,
        height: 735,
        caption: "Inbound workflows for a restaurant sub-account.",
      },
      {
        src: "/case-media/white-label-voice-agents/04.webp",
        alt: "Synthflow German outbound assistant agent",
        width: 1600,
        height: 822,
        caption: "A German-language outbound assistant for one of the agency's clients.",
      },
    ],
  },
  // ---- Individual voice builds (src/assets/Portfolio/Voice Agent/<business>) ----
  {
    slug: "voice-barber-shop",
    category: "voice",
    title: "Barber Shop Inbound & Outbound Voice Agents",
    tag: "Barber shop · GoHighLevel",
    location: "United Kingdom",
    status: "client",
    summary:
      "A Synthflow inbound and outbound agent pair that books barber appointments and logs every call outcome in GoHighLevel.",
    problem:
      "Booking calls and outbound follow-ups were handled by hand, and call outcomes weren't recorded consistently against the customer.",
    description:
      "Dedicated inbound and outbound voice agents were configured for the barber's own GoHighLevel sub-account. Inbound calls are answered, appointments booked and post-call data processed into the CRM; outbound calls run from an initial-call workflow through booking to a post-call update. Appointment-related messages go out from GoHighLevel, so every booking and conversation sits on the contact record.",
    flow: [
      "Inbound / outbound call",
      "Synthflow agent",
      "Appointment booked",
      "Post-call data",
      "CRM update",
    ],
    highlights: [
      { value: "Inbound + outbound", label: "Dedicated agents" },
      { value: "Per sub-account", label: "GoHighLevel workflows" },
    ],
    tools: ["Synthflow", "GoHighLevel", "Voice agents", "Appointment booking"],
    services: ["voice-ai", "gohighlevel-automation"],
  },
  {
    slug: "voice-beauty-salon",
    category: "voice",
    title: "Beauty Salon Voice Agents & Appointment Booking",
    tag: "Beauty salon · GoHighLevel",
    location: "United Kingdom",
    status: "client",
    summary:
      "Inbound and outbound voice agents that book salon appointments, trigger follow-up emails and keep the whole customer journey in the CRM.",
    problem:
      "Lead calls, bookings and follow-ups were handled manually, with no single place to see where each customer stood.",
    description:
      "A dedicated Beauty Salon sub-account in GoHighLevel holds separate workflows for inbound calls, outbound calls, appointment booking, post-call data and customer follow-ups. Synthflow handles the conversations; once an appointment is booked the contact is updated and the right email goes out from the CRM, so the journey from first call to confirmed booking is tracked in one place.",
    flow: [
      "Call in / out",
      "Synthflow agent",
      "Book appointment",
      "Post-call data",
      "Email follow-up",
    ],
    highlights: [
      { value: "5", label: "Workflow areas" },
      { value: "Inbound + outbound", label: "Voice agents" },
    ],
    tools: ["Synthflow", "GoHighLevel", "Voice agents", "Email automation"],
    services: ["voice-ai", "gohighlevel-automation"],
  },
  {
    slug: "voice-social-agency-inbound",
    category: "voice",
    title: "Inbound Voice Assistant for a Social Media Agency",
    tag: "Marketing agency · GoHighLevel",
    location: "United Kingdom",
    status: "client",
    summary:
      "A Synthflow inbound assistant that answers calls, books appointments and files caller details and emails against the contact in GoHighLevel.",
    problem:
      "Incoming calls had to be answered and booked by hand, and caller details weren't captured consistently.",
    description:
      "A dedicated inbound agent in Synthflow is connected to the agency's GoHighLevel sub-account. Two workflows — Appointment Booked and Post Inbound Data — process each call: the booking updates the contact record, post-call data is stored automatically, and appointment emails are sent and logged from GoHighLevel, giving a complete view of every interaction.",
    flow: [
      "Inbound call",
      "Synthflow agent",
      "Appointment booked",
      "Post-call data",
      "Email from CRM",
    ],
    highlights: [
      { value: "Inbound", label: "Dedicated assistant" },
      { value: "2", label: "Call workflows" },
    ],
    tools: ["Synthflow", "GoHighLevel", "Voice agent", "Email automation"],
    services: ["voice-ai", "gohighlevel-automation"],
  },
  {
    slug: "voice-cafe",
    category: "voice",
    title: "Café Inbound & Outbound Voice Agents",
    tag: "Café · GoHighLevel",
    location: "United Kingdom",
    status: "client",
    summary:
      "Separate Synthflow agents for incoming and outgoing calls, with bookings confirmed by email and every call logged in GoHighLevel.",
    problem:
      "Customer calls, bookings and follow-ups relied on staff being available, and booking details weren't confirmed consistently.",
    description:
      "Two Synthflow agents — Café Inbound and Café Outbound — are connected to a dedicated GoHighLevel sub-account. Inbound calls are handled and booked; outbound calls run from an initial-call workflow through booking to post-call data. When an appointment is booked, the customer record is updated and a confirmation email with the meeting details is sent automatically.",
    flow: [
      "Call in / out",
      "Synthflow agent",
      "Book appointment",
      "Post-call data",
      "Confirmation email",
    ],
    highlights: [
      { value: "2", label: "Synthflow agents" },
      { value: "Auto", label: "Booking confirmation email" },
    ],
    tools: ["Synthflow", "GoHighLevel", "Voice agents", "Email automation"],
    services: ["voice-ai", "gohighlevel-automation"],
  },
  {
    slug: "voice-german-outbound",
    category: "voice",
    title: "German-Language Outbound Appointment Setter",
    tag: "Dental clinic · Outbound",
    location: "Germany",
    status: "client",
    summary:
      "A German-speaking outbound voice agent that calls leads, books appointments and writes each call result back to GoHighLevel.",
    problem:
      "Calling every new lead by hand in German was slow, and the outcome of each call wasn't recorded in one place.",
    description:
      "A dedicated German outbound assistant in Synthflow is connected to the client's GoHighLevel account. Three workflows split the process — initial outbound calls, appointment booked, and post-call data — so each lead moves from first call to booking with the result of every interaction recorded on the contact.",
    flow: ["Lead", "Initial outbound call", "Appointment booking", "Post-call data", "CRM update"],
    highlights: [
      { value: "German", label: "Agent language" },
      { value: "3", label: "Outbound workflows" },
    ],
    tools: ["Synthflow", "GoHighLevel", "Voice agent", "Outbound calling"],
    services: ["voice-ai", "gohighlevel-automation"],
  },
  {
    slug: "voice-hair-salon",
    category: "voice",
    title: "Hair Salon Voice Agents & Appointment Booking",
    tag: "Hair salon · GoHighLevel",
    location: "United Kingdom",
    status: "client",
    summary:
      "Inbound and outbound voice agents that book salon appointments and send confirmations with date, time and rescheduling details.",
    problem:
      "Leads and booking calls were handled manually, and customers didn't always receive clear appointment details.",
    description:
      "The salon runs in its own GoHighLevel sub-account with contacts, voice agents and separate inbound and outbound workflows. Inbound interactions are booked and processed into the customer record; outbound calls move leads from an initial call through booking and follow-up. Booked appointments trigger a confirmation email with the customer's name, date and time, booking details and rescheduling information, all stored on the contact.",
    flow: ["Call in / out", "Voice agent", "Book appointment", "Confirmation email", "CRM record"],
    highlights: [
      { value: "Inbound + outbound", label: "Workflows" },
      { value: "Auto", label: "Confirmation with reschedule info" },
    ],
    tools: ["Synthflow", "GoHighLevel", "Voice agents", "Email automation"],
    services: ["voice-ai", "gohighlevel-automation"],
  },
  {
    slug: "voice-real-estate-inbound",
    category: "voice",
    title: "Real Estate Inbound Voice Assistant",
    tag: "Real estate · GoHighLevel",
    location: "United Kingdom",
    status: "client",
    summary:
      "An inbound voice assistant that qualifies property callers, books appointments and sends confirmation emails from GoHighLevel.",
    problem:
      "Calls from property enquiries needed answering, qualifying and booking without someone on the phone all day.",
    description:
      "A dedicated inbound assistant in Synthflow guides each caller through the conversation, collects their details and books the appointment. The real-estate sub-account in GoHighLevel runs Appointment Booked and Post Inbound Data workflows that update the contact, track the appointment and send a confirmation email with the date, time, meeting details and rescheduling instructions.",
    flow: [
      "Inbound call",
      "Synthflow assistant",
      "Lead details",
      "Appointment booked",
      "Confirmation email",
    ],
    highlights: [
      { value: "Inbound", label: "Lead capture & booking" },
      { value: "Auto", label: "Confirmation email" },
    ],
    tools: ["Synthflow", "GoHighLevel", "Voice agent", "Email automation"],
    services: ["voice-ai", "gohighlevel-automation"],
  },
  {
    slug: "voice-car-rental-inbound",
    category: "voice",
    title: "Car Rental Inbound Booking Agent",
    tag: "Car rental · GoHighLevel",
    location: "United Kingdom",
    status: "client",
    summary:
      "An inbound voice agent that takes rental enquiries, books appointments and sends confirmations automatically.",
    problem: "Rental enquiries came in by phone and needed booking and follow-up by hand.",
    description:
      "A dedicated inbound agent in Synthflow handles incoming calls and connects to the business's GoHighLevel sub-account. Workflows for the inbound agent, appointment booked, post-inbound data and campaigns keep caller information and call outcomes organised, and each booking triggers a confirmation email that's recorded on the customer's CRM record.",
    flow: [
      "Inbound call",
      "Synthflow agent",
      "Appointment booked",
      "Post-call data",
      "Confirmation email",
    ],
    highlights: [
      { value: "Inbound", label: "Booking agent" },
      { value: "4", label: "GoHighLevel workflows" },
    ],
    tools: ["Synthflow", "GoHighLevel", "Voice agent", "Email automation"],
    services: ["voice-ai", "gohighlevel-automation"],
  },
  {
    slug: "voice-restaurant",
    category: "voice",
    title: "Restaurant Inbound & Outbound Voice Agents",
    tag: "Restaurant · GoHighLevel",
    location: "United Kingdom",
    status: "client",
    summary:
      "Separate inbound and outbound agents that handle restaurant enquiries, run follow-up calls and confirm bookings by email.",
    problem:
      "New enquiries and follow-ups depended on manual replies, and booking details weren't confirmed consistently.",
    description:
      "Inside a dedicated restaurant sub-account, separate inbound and outbound agents keep the two processes apart. Outbound workflows run initial calls, appointment booking and post-call handling, moving each lead on based on the outcome; inbound interactions connect to the same booking and follow-up workflows. Confirmation emails carry the appointment details, and every contact keeps its full conversation history.",
    flow: [
      "Lead / call",
      "Inbound or outbound agent",
      "Book appointment",
      "Follow-up",
      "Confirmation email",
    ],
    highlights: [
      { value: "Inbound + outbound", label: "Separate agents" },
      { value: "Outcome-based", label: "Lead follow-up" },
    ],
    tools: ["Synthflow", "GoHighLevel", "Voice agents", "Email automation"],
    services: ["voice-ai", "gohighlevel-automation"],
  },
  {
    slug: "ghl-workflow-library",
    category: "crm",
    title: "GoHighLevel Workflows: Leads, Appointments & Payments",
    tag: "CRM automation",
    location: "Global",
    featured: true,
    summary:
      "A set of GoHighLevel workflows covering lead nurturing, appointment management, payment processing and instalment plans.",
    problem:
      "Lead follow-up, appointment confirmations and payment chasing were handled by hand, so leads went cold and payments slipped.",
    description:
      "Lead nurturing creates or updates the contact, sends a welcome email, then value emails and SMS on a schedule — waiting for engagement and sending an offer or case study when the lead replies. Appointment management confirms bookings by email and SMS after a short processing delay, checks the contact and appointment are valid and handles reschedules. Payment processing updates the customer and payment records, applies the payment to the invoice or subscription and branches on success or failure before sending a receipt. Instalment management generates the schedule, confirms the first payment by email and SMS, and tracks each due date with paid-on-time, overdue and final-reminder branches. Further workflows cover lead generation, follow-up, newsletter onboarding, Facebook posting and SMS campaigns.",
    flow: [
      "Trigger (form / booking / payment)",
      "Update contact",
      "Email + SMS",
      "Wait & detect",
      "Branch & follow up",
    ],
    highlights: [
      { value: "8+", label: "Workflows in the set" },
      { value: "Reply detection", label: "In nurturing" },
      { value: "Instalments", label: "Due-date & overdue logic" },
    ],
    tools: ["GoHighLevel", "Workflows", "Email", "SMS", "Payments"],
    services: ["gohighlevel-automation"],
    screenshots: [
      {
        src: "/case-media/ghl-workflow-library/03.webp",
        alt: "GoHighLevel payment processing workflow with success, failure and receipt branches",
        width: 850,
        height: 1500,
        caption: "Automated payment processing with success / failure branches.",
      },
      {
        src: "/case-media/ghl-workflow-library/04.webp",
        alt: "GoHighLevel instalment payment workflow with due date, overdue and final reminder branches",
        width: 860,
        height: 1500,
        caption: "Instalment management: schedule, due-date checks and overdue handling.",
      },
      {
        src: "/case-media/ghl-workflow-library/01.webp",
        alt: "GoHighLevel lead nurturing workflow with welcome, value emails, SMS and reply detection",
        width: 596,
        height: 865,
        caption: "Lead nurturing with engagement (reply) detection.",
      },
      {
        src: "/case-media/ghl-workflow-library/02.webp",
        alt: "GoHighLevel appointment management workflow with confirmation and reschedule checks",
        width: 736,
        height: 877,
        caption: "Appointment confirmations by email and SMS, with reschedule checks.",
      },
    ],
  },
  {
    slug: "elevenlabs-voice-receptionist",
    category: "voice",
    title: "AI Voice Receptionist with ElevenLabs, n8n & GoHighLevel",
    tag: "Home & estate services",
    location: "United States",
    summary:
      "An ElevenLabs receptionist that answers calls for a home and estate management company and passes caller details to GoHighLevel through n8n.",
    problem:
      "Incoming calls needed answering consistently — questions about services, caller details and appointment requests — without a receptionist on every line.",
    description:
      "A named ElevenLabs receptionist answers inbound calls, understands the request, answers service questions from the company's knowledge base and collects the caller's details. n8n processes the call data and sends it to GoHighLevel, where the contact is created or updated and appointment requests connect to the booking process.",
    flow: [
      "Inbound call",
      "ElevenLabs receptionist",
      "Caller details",
      "n8n",
      "GoHighLevel contact & booking",
    ],
    highlights: [
      { value: "Knowledge base", label: "Service answers" },
      { value: "n8n → GHL", label: "CRM hand-off" },
    ],
    tools: ["ElevenLabs", "n8n", "GoHighLevel"],
    services: ["voice-ai", "gohighlevel-automation", "workflow-automation"],
    screenshots: [
      {
        src: "/case-media/elevenlabs-voice-receptionist/01.webp",
        alt: "ElevenLabs agent configuration with system prompt and first message (client name blurred)",
        width: 1600,
        height: 728,
        caption: "Agent configuration in ElevenLabs — client name blurred.",
      },
    ],
  },
  {
    slug: "skin-clinic-chatbot",
    category: "chatbots",
    title: "Lead Handling & Booking Chatbot for a Skin Clinic",
    tag: "Healthcare & aesthetics",
    location: "Global",
    status: "client",
    featured: true,
    summary:
      "AI chatbot that answers Facebook Ads and CRM leads, handles treatment and pricing questions and moves qualified prospects to booking.",
    problem:
      "The clinic was slow to reply to new leads, missed follow-ups, answered the same treatment and pricing questions repeatedly, and its previous chatbot gave poor answers.",
    description:
      "Messages from Facebook Ads and existing GoHighLevel leads reach an n8n webhook, where an AI agent with conversation memory answers treatment, pricing and course questions, qualifies the lead and guides it towards an appointment or course enrolment. Replies go back over SMS / WhatsApp through Twilio, and the lead's progress is pushed to GoHighLevel's booking workflows. The team stays involved when a person is needed.",
    flow: [
      "Lead message",
      "n8n webhook",
      "AI agent + memory",
      "Reply via SMS / WhatsApp",
      "GoHighLevel booking",
    ],
    highlights: [
      { value: "First contact", label: "For every new lead" },
      { value: "Memory", label: "Conversation context" },
      { value: "GHL", label: "Booking workflows" },
    ],
    tools: ["n8n", "OpenAI", "GoHighLevel", "Twilio", "Facebook Ads"],
    services: ["ai-chatbots", "gohighlevel-automation", "workflow-automation"],
    screenshots: [
      {
        src: "/case-media/skin-clinic-chatbot/01.webp",
        alt: "n8n chatbot workflow: webhook, AI agent with memory, reply and SMS/WhatsApp send",
        width: 1600,
        height: 696,
        caption:
          "The chatbot workflow: webhook → AI agent with memory → reply over SMS / WhatsApp.",
      },
      {
        src: "/case-media/skin-clinic-chatbot/02.webp",
        alt: "n8n workflow forwarding treatment messages to Twilio and GoHighLevel",
        width: 1600,
        height: 688,
        caption: "Message relay between Twilio and GoHighLevel.",
      },
    ],
  },
  {
    slug: "therapy-invoices-swiss-qr",
    category: "automation",
    title: "HubSpot to Swiss QR Invoices & Therapy Confirmations",
    tag: "Healthcare · Finance",
    location: "Switzerland",
    status: "client",
    summary:
      "Two n8n workflows that turn HubSpot deals into Swiss QR invoices and therapy confirmation PDFs, filed to Drive and logged in Sheets.",
    problem:
      "A healthcare business prepared invoices and therapy confirmations by hand from CRM data, which was slow and error-prone.",
    description:
      "Every morning the invoice workflow pulls eligible HubSpot deals by stage, doctor and appointment type, calculates the amount, generates a Swiss QR payment code through a custom .NET Swiss QR service on Google Cloud Run, renders the PDF with PDFMonkey, uploads it to Google Drive with a shareable link and records it in Google Sheets with unique invoice numbering. A second workflow builds therapy confirmation documents from completed deals, matching doctor details from Sheets.",
    flow: [
      "HubSpot deals",
      "Amount & config",
      "Swiss QR (.NET API)",
      "PDFMonkey PDF",
      "Drive + Sheets",
    ],
    highlights: [
      { value: "Daily", label: "Scheduled invoice run" },
      { value: ".NET on Cloud Run", label: "Swiss QR service" },
      { value: "Unique", label: "Invoice numbering" },
    ],
    tools: ["n8n", "HubSpot API", "PDFMonkey", ".NET", "Google Cloud Run", "Google Sheets"],
    services: ["workflow-automation", "custom-software"],
  },

  // ---------------- Zapier ----------------
  {
    slug: "zapier-new-lead-ghl",
    category: "automation",
    title: "New Lead → GoHighLevel CRM & Follow-up (Zapier)",
    tag: "Lead management",
    location: "Global",
    summary:
      "Typeform leads checked, routed and followed up in GoHighLevel, with Sheets logging, email, SMS, Slack and Asana tasks.",
    problem:
      "New and returning leads were handled the same way, and follow-ups depended on someone remembering.",
    description:
      "Each Typeform submission finds or creates the contact in GoHighLevel. New leads get an opportunity, a Sheets row, a welcome email, an SMS via Twilio, a Slack alert and an Asana task. Existing leads are routed by last-contact date: after 30 days they're re-engaged by email and list; otherwise a note is added and the team is notified. Two days later a follow-up reminder is created in GoHighLevel.",
    flow: [
      "Typeform entry",
      "Find / create in GHL",
      "New vs existing",
      "Notify & message",
      "Follow-up reminder",
    ],
    highlights: [
      { value: "30-day", label: "Re-engagement rule" },
      { value: "6 apps", label: "Connected in one Zap" },
    ],
    tools: ["Zapier", "GoHighLevel", "Typeform", "Twilio", "Slack", "Asana"],
    services: ["workflow-automation", "gohighlevel-automation"],
    screenshots: [
      {
        src: "/case-media/zapier-new-lead-ghl/01.webp",
        alt: "Zapier editor showing new-lead and existing-lead paths into GoHighLevel",
        width: 1536,
        height: 978,
        caption: "The Zap: new and existing lead paths, notifications and the follow-up reminder.",
      },
    ],
  },
  {
    slug: "zapier-lead-crm-integrations",
    category: "crm",
    title: "Lead & CRM Integrations with Zapier",
    tag: "Sales ops",
    location: "Global",
    summary:
      "A set of Zaps moving leads from Typeform, Calendly, ManyChat, Yelp and Airtable into Pipedrive, Mailchimp, GoHighLevel and ClickFunnels.",
    problem:
      "Leads arrived in several tools and were copied into the CRM and email lists by hand, creating duplicates.",
    description:
      "Typeform submissions are cleaned with Code by Zapier, stored in Airtable and created as Pipedrive people and deals with a follow-up email. Calendly bookings check Pipedrive for an existing person and deal before updating or creating, to avoid duplicates. ManyChat contacts sync to Mailchimp. Yelp leads are routed by conditions to a GoHighLevel (LeadConnector) workflow or a Python step. A student-enrolment Zap separates parents and students, syncs Mailchimp and Google Contacts, sends a welcome email, creates a spreadsheet and enrols the student in ClickFunnels.",
    flow: [
      "Form / booking / chat lead",
      "Clean with code",
      "Find existing record",
      "Create or update",
      "Notify / enrol",
    ],
    highlights: [
      { value: "6", label: "Production Zaps" },
      { value: "Duplicate-aware", label: "Pipedrive logic" },
    ],
    tools: ["Zapier", "Pipedrive", "Typeform", "Calendly", "Mailchimp", "GoHighLevel"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/zapier-lead-crm-integrations/01.webp",
        alt: "Zapier Yelp lead routing with paths to LeadConnector and Code by Zapier",
        width: 1009,
        height: 720,
        caption: "Yelp leads routed to a GoHighLevel workflow or a Python step.",
      },
      {
        src: "/case-media/zapier-lead-crm-integrations/02.webp",
        alt: "Zapier Calendly to Pipedrive flow with existing person and deal checks",
        width: 945,
        height: 654,
        caption: "Calendly → Pipedrive with duplicate-aware person and deal handling.",
      },
      {
        src: "/case-media/zapier-lead-crm-integrations/03.webp",
        alt: "Zapier student enrolment flow with parent and student paths",
        width: 1546,
        height: 675,
        caption:
          "Student enrolment: parent and student paths across Mailchimp, Google Contacts and ClickFunnels.",
      },
      {
        src: "/case-media/zapier-lead-crm-integrations/04.webp",
        alt: "Zapier Typeform to Airtable and Pipedrive flow with code steps",
        width: 920,
        height: 689,
        caption: "Typeform → Code → Airtable → Pipedrive person and deal.",
      },
    ],
  },
  {
    slug: "zapier-support-escalation",
    category: "automation",
    title: "AI Support Escalation & Resolution (Zapier + Zendesk)",
    tag: "Customer support",
    location: "Global",
    summary:
      "Zendesk tickets analysed by AI, routed by category and customer type, monitored against SLA and escalated when needed.",
    problem:
      "Support requests were triaged by hand, VIP and critical issues waited in the same queue, and SLA breaches went unnoticed.",
    description:
      "Requests from email, forms or chat become Zendesk tickets that OpenAI analyses for category, urgency, customer type, sentiment and department. Critical issues go to senior support with a Slack alert, billing to finance, technical to tech support, VIP customers to priority handling, and simple questions get an automated answer. Complex cases get a draft for an agent. Tickets are re-checked after two hours and escalated if unresolved; resolved tickets trigger a CSAT survey and are logged to Airtable and Sheets.",
    flow: ["Request in", "Zendesk ticket", "AI analysis", "Route by rules", "SLA check & CSAT"],
    highlights: [
      { value: "5", label: "Routing paths" },
      { value: "2-hour", label: "SLA check" },
    ],
    tools: ["Zapier", "Zendesk", "OpenAI", "Slack", "Airtable", "Gmail"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/zapier-support-escalation/01.webp",
        alt: "Zapier support escalation Zap with routing paths",
        width: 1312,
        height: 1199,
        caption: "The Zap, branching by issue type and customer priority.",
      },
    ],
  },
  {
    slug: "zapier-lead-qualification",
    category: "automation",
    title: "AI Lead Qualification & Sales Automation (Zapier)",
    tag: "Sales",
    location: "Global",
    summary:
      "Leads enriched and scored by AI, routed as hot, warm, cold or enterprise, then followed through booking, proposal, payment and onboarding.",
    problem:
      "Every lead got the same treatment, so sales time went to poor-fit leads while hot ones waited.",
    description:
      "Leads from webhooks, forms and ads are found or created in HubSpot, enriched with Clearbit and scored by OpenAI on fit, decision-maker status, budget, urgency and engagement. Hot leads get an opportunity, a personalised email, a Slack alert and a booking link; warm and cold leads enter nurture campaigns in Mailchimp; enterprise leads get a high-priority opportunity and an account brief. Scores change with engagement, and the sales follow-up continues through Calendly, proposals, e-signature, Xero invoicing and onboarding.",
    flow: [
      "Lead in",
      "HubSpot + Clearbit",
      "AI score",
      "Hot / warm / cold / enterprise",
      "Sales follow-up",
    ],
    highlights: [
      { value: "4", label: "Lead tiers" },
      { value: "Dynamic", label: "Re-scoring on engagement" },
    ],
    tools: ["Zapier", "HubSpot", "OpenAI", "Clearbit", "Mailchimp", "Xero"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/zapier-lead-qualification/01.webp",
        alt: "Zapier lead qualification Zap with tier paths",
        width: 1312,
        height: 1199,
        caption: "The qualification Zap with hot, warm, cold and enterprise paths.",
      },
    ],
  },
  {
    slug: "zapier-ecommerce-recovery",
    category: "automation",
    title: "E-commerce Order Recovery & Retention (Zapier)",
    tag: "E-commerce",
    location: "Global",
    summary:
      "Abandoned carts, failed payments, delivery issues and churn risk detected and handled automatically, with VIP routing and upsells.",
    problem:
      "Revenue leaked through abandoned carts, failed payments and unhappy customers nobody followed up with.",
    description:
      "Orders from Shopify or WooCommerce are scored on order value, lifetime value, frequency and refund history. VIP customers are tagged in HubSpot and passed to customer success. Abandoned checkouts are re-checked after 30 minutes and followed up; failed Stripe payments get recovery emails and a finance alert if still unpaid. Delivery problems create Zendesk tickets by customer value, feedback is analysed for churn risk, and successful orders trigger related-product recommendations and review requests. Events are logged to Airtable.",
    flow: [
      "Order event",
      "Score customer",
      "Recovery path",
      "Retention / upsell",
      "Log to Airtable",
    ],
    highlights: [
      { value: "30-min", label: "Cart re-check" },
      { value: "VIP", label: "Customer routing" },
    ],
    tools: ["Zapier", "Shopify", "Stripe", "HubSpot", "Zendesk", "OpenAI"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/zapier-ecommerce-recovery/01.webp",
        alt: "Zapier e-commerce recovery Zap with multiple branches",
        width: 1600,
        height: 751,
        caption: "Recovery and retention paths in the Zap.",
      },
    ],
  },
  {
    slug: "zapier-real-estate-lifecycle",
    category: "automation",
    title: "Real Estate Deal Lifecycle Automation (Zapier)",
    tag: "Real Estate",
    location: "Global",
    summary:
      "From property inquiry to closing: qualification, property matching, viewings with reminders, offers, contracts and commission invoicing.",
    problem:
      "Agents juggled inquiries, matching, viewings and paperwork manually, so follow-ups slipped between stages.",
    description:
      "Inquiries from websites, ads and portals are found or created in HubSpot, analysed and scored, then split into buyer, seller and renter paths. Buyers and renters are matched to Airtable listings by budget, location, type, bedrooms, amenities and timeline and sent personalised property emails. Viewings create Google Calendar events with confirmation, 24-hour and 1-hour reminders; post-viewing feedback routes the next step. Offers move through deal, contract, e-signature and closing, after which the commission is calculated and invoiced in Xero.",
    flow: [
      "Inquiry",
      "Score & classify",
      "Match properties",
      "Viewing + reminders",
      "Offer → close → commission",
    ],
    highlights: [
      { value: "3", label: "Client paths" },
      { value: "24h + 1h", label: "Viewing reminders" },
    ],
    tools: ["Zapier", "HubSpot", "OpenAI", "Airtable", "Google Calendar", "Xero"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/zapier-real-estate-lifecycle/01.webp",
        alt: "Zapier real estate lifecycle Zap with buyer, seller and renter paths",
        width: 1024,
        height: 1536,
        caption: "Buyer, seller and renter paths through to closing.",
      },
    ],
  },
  {
    slug: "zapier-legal-case-routing",
    category: "automation",
    title: "Legal Case Stage Emails (Zapier)",
    tag: "Legal",
    location: "United States",
    summary:
      "Case data arrives by webhook and the right email goes out automatically for each stage of the case.",
    problem:
      "Stage emails — from draft demand to disbursement — were chosen and sent by hand, so they went out late or inconsistently.",
    description:
      "A Zap receives case data through a webhook, checks it and routes it through a path per case stage — draft demand, demand sent, negotiations, disbursement, review for litigation and no match. Each path has its own conditions and sends the matching email through Gmail, with no manual routing.",
    flow: ["Case data (webhook)", "Check case info", "Path per stage", "Send stage email"],
    highlights: [
      { value: "6", label: "Case stages" },
      { value: "Webhook", label: "Trigger" },
    ],
    tools: ["Zapier", "Webhooks", "Paths", "Gmail"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/zapier-legal-case-routing/01.webp",
        alt: "Zapier legal case email Zap branching by case stage",
        width: 1120,
        height: 620,
        caption: "Stage-based routing paths.",
      },
    ],
  },
  {
    slug: "zapier-case-manager-routing",
    category: "automation",
    title: "Case Manager Detection & Email Routing (Zapier)",
    tag: "Legal",
    location: "United States",
    summary:
      "A reusable sub-Zap that finds each case's assigned manager and sends them the case details — with a fallback when nobody is assigned.",
    problem:
      "Case information was forwarded by hand to whichever case manager owned it, and unassigned cases slipped through.",
    description:
      "Built as a sub-Zap so other Zaps can call it, the workflow splits incoming case data into paths — one per case manager plus a 'no case manager found' path. Each path checks its condition and sends the case information to the matching manager through Gmail, so nothing needs forwarding manually and unassigned cases are still handled.",
    flow: [
      "Case data (sub-Zap)",
      "Paths per manager",
      "Match assigned manager",
      "Email the case",
      "Fallback if none",
    ],
    highlights: [
      { value: "7 + fallback", label: "Routing paths" },
      { value: "Sub-Zap", label: "Reusable from other Zaps" },
    ],
    tools: ["Zapier", "Sub-Zaps", "Paths", "Gmail"],
    services: ["workflow-automation"],
  },

  // ---------------- Make.com ----------------
  {
    slug: "make-monday-xero",
    category: "automation",
    title: "Monday.com → Xero Finance Automation (Make.com)",
    tag: "Finance operations",
    location: "Global",
    status: "client",
    featured: true,
    summary:
      "Approved POs, client invoices and supplier bills created and matched in Xero from Monday.com, with errors flagged back on the item.",
    problem:
      "Finance data was entered twice — once in Monday.com and again in Xero — and supplier PDFs were attached by hand.",
    description:
      "When a PO is approved in Monday.com, Make.com creates the purchase order in Xero with all line items, downloads the PDF and creates the related bill. Client invoices are created in Xero from Monday.com data, the PDF is attached back to the item and emailed to the client. Supplier invoice PDFs uploaded in Monday.com are matched to the right Xero bill by PO reference and attached. If anything fails, the Monday.com item gets a comment explaining why. The workflows were tested and are running in production.",
    flow: [
      "PO approved / file uploaded",
      "Create in Xero",
      "Download / attach PDF",
      "Match bill by PO ref",
      "Flag errors on item",
    ],
    highlights: [
      { value: "Production", label: "Running live" },
      { value: "3", label: "Finance flows" },
      { value: "Errors in Monday", label: "No need to open Make" },
    ],
    tools: ["Make.com", "Monday.com", "Xero API", "PDF processing"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/make-monday-xero/01.webp",
        alt: "Make.com scenario attaching supplier invoices from Monday.com to Xero bills with error handlers",
        width: 1080,
        height: 669,
        caption: "Supplier invoice scenario: Monday.com → Xero bill, with error handlers.",
      },
      {
        src: "/case-media/make-monday-xero/02.webp",
        alt: "Make.com scenario creating Xero purchase orders and bills from Monday.com",
        width: 1080,
        height: 427,
        caption: "Purchase order and bill creation scenario.",
      },
    ],
  },
  {
    slug: "freightflow-control-tower",
    category: "automation",
    title: "FreightFlow Control Tower (Make.com)",
    tag: "Logistics",
    location: "Global",
    featured: true,
    summary:
      "Shipment booking, carrier scoring, live ETA tracking, exception alerts and proof of delivery — one Make.com logistics system.",
    problem:
      "Operations teams coordinated carriers, pickups, delays and delivery paperwork across email and spreadsheets.",
    description:
      "New shipment requests are validated, routed with Google Maps and sent to suitable carriers for quotes. Quotes are normalised and scored on price, availability, reliability, damage rate and on-time performance, with an AI recommendation and manager approval where needed. Bookings generate documents for DocuSign, pickups are monitored, tracking data recalculates ETA, and at-risk shipments trigger customer updates and Slack alerts. Proof of delivery is reconciled against the order, problems route to claims, and carrier performance and weekly audits update analytics.",
    flow: [
      "Shipment request",
      "Carrier quotes & scoring",
      "Book + documents",
      "Track ETA & exceptions",
      "POD & performance",
    ],
    highlights: [
      { value: "5-factor", label: "Carrier scoring" },
      { value: "Live", label: "ETA & exception alerts" },
    ],
    tools: ["Make.com", "Airtable", "Google Maps API", "DocuSign", "Slack", "OpenAI"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/freightflow-control-tower/01.webp",
        alt: "Make.com FreightFlow scenario with booking, tracking and delivery sections",
        width: 1600,
        height: 759,
        caption:
          "The scenario: booking & dispatch, pickup & tracking, delivery & close, analytics.",
      },
      {
        src: "/case-media/freightflow-control-tower/02.webp",
        alt: "Slack delivery risk alert posted by the automation (test data)",
        width: 1448,
        height: 1086,
        caption: "A delivery-risk alert in Slack during testing (sample data).",
      },
    ],
  },
  {
    slug: "garageflow-360",
    category: "automation",
    title: "GarageFlow 360 — Auto Repair Operations (Make.com)",
    tag: "Automotive services",
    location: "Global",
    summary:
      "Workshop system from WhatsApp inquiry to booking, inspection, estimate approval, parts, repair tracking, pickup and service reminders.",
    problem:
      "Workshop staff coordinated bookings, estimates, parts and customer updates by phone and messages.",
    description:
      "Customer inquiries from WhatsApp or the website are matched to existing customer and vehicle records and booked into Google Calendar with reminders. Check-in records mileage, condition and photos to a Drive folder per repair order. Technicians are assigned by skill and workload, inspection reports are summarised by AI, and estimates go to the customer for approval with automatic follow-up. Approved work generates a parts list, checks inventory and orders from suppliers if needed. Customers get delay updates and pickup notifications on WhatsApp, followed by maintenance reminders, review requests and re-engagement for dormant customers.",
    flow: [
      "Inquiry",
      "Book & check-in",
      "Inspect & estimate",
      "Parts & repair",
      "Pickup & retention",
    ],
    highlights: [
      { value: "WhatsApp", label: "Customer channel" },
      { value: "End-to-end", label: "Inquiry to review" },
    ],
    tools: ["Make.com", "WhatsApp Business", "Airtable", "Google Calendar", "OpenAI", "Slack"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/garageflow-360/01.webp",
        alt: "Make.com GarageFlow scenarios for repair intake and customer retention",
        width: 1600,
        height: 726,
        caption: "Intake-to-completion and retention scenarios.",
      },
      {
        src: "/case-media/garageflow-360/02.webp",
        alt: "Google Calendar with workshop appointments created by the automation",
        width: 1600,
        height: 900,
        caption: "Workshop appointments created in Google Calendar (test data).",
      },
    ],
  },
  {
    slug: "stockpulse-command-center",
    category: "automation",
    title: "StockPulse — Inventory Replenishment (Make.com)",
    tag: "E-commerce · Inventory",
    location: "Global",
    summary:
      "Multi-warehouse stock health, demand forecasting, transfers, supplier orders and slow-stock detection from every sale.",
    problem:
      "Stockouts and overstock across several warehouses were spotted too late, and reorders were guesswork.",
    description:
      "Each Shopify or WooCommerce sale updates warehouse stock and calculates stock health, daily demand and days remaining. Critically low items first look for a transfer from another warehouse without breaking its safety stock; otherwise demand is forecast and a reorder quantity is calculated from safety stock, lead time, MOQ and incoming stock. High-value orders need manager and finance approval in Slack, suppliers get orders by Gmail, deliveries are reconciled on receipt and supplier performance is tracked. A weekly scan flags slow-moving and dead stock with redistribution suggestions.",
    flow: [
      "Sale",
      "Update stock & health",
      "Transfer or reorder",
      "Approve & order",
      "Receive & analyse",
    ],
    highlights: [
      { value: "Multi-warehouse", label: "Transfers first" },
      { value: "Forecast", label: "Reorder quantities" },
    ],
    tools: ["Make.com", "Shopify", "Airtable", "Google Sheets", "Slack", "OpenAI"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/stockpulse-command-center/01.webp",
        alt: "Make.com StockPulse scenario routing products by stock condition",
        width: 1600,
        height: 535,
        caption: "Routing by stock condition: healthy, reorder, critical, out of stock.",
      },
      {
        src: "/case-media/stockpulse-command-center/02.webp",
        alt: "Airtable inventory table with stock, reorder points and status",
        width: 1600,
        height: 650,
        caption: "Inventory records in Airtable (sample products).",
      },
    ],
  },
  {
    slug: "make-support-sla",
    category: "automation",
    title: "AI Customer Support SLA & Escalation (Make.com)",
    tag: "Customer support",
    location: "Global",
    summary:
      "Multi-channel support requests turned into prioritised CRM tickets with knowledge-base answers, SLA tracking and Slack escalation.",
    problem:
      "Requests from forms, Gmail and WhatsApp were handled inconsistently, and urgent issues weren't escalated in time.",
    description:
      "Requests are matched to existing customers, cleaned and classified by AI for category, urgency, sentiment, language and department, with critical risks such as outages or legal complaints flagged. A weighted priority score drives routing and SLA deadlines. Tickets are created in HubSpot or SmartSuite with a Drive folder for attachments; Notion knowledge is checked before an AI reply is validated and sent on the original channel, and uncertain cases go to people. Approaching deadlines trigger warnings, resolved tickets get AI summaries and satisfaction requests.",
    flow: [
      "Request in",
      "Identify & classify",
      "Priority score",
      "Answer or escalate",
      "SLA monitor & close",
    ],
    highlights: [
      { value: "3", label: "Inbound channels" },
      { value: "Weighted", label: "Priority scoring" },
    ],
    tools: ["Make.com", "HubSpot", "Notion", "OpenAI / Claude", "Slack", "WhatsApp"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/make-support-sla/01.webp",
        alt: "Make.com customer support SLA scenario",
        width: 1600,
        height: 614,
        caption: "The support scenario from intake to SLA tracking.",
      },
    ],
  },
  {
    slug: "make-field-service",
    category: "automation",
    title: "Field Service & Technician Dispatch (Make.com)",
    tag: "Maintenance operations",
    location: "Global",
    summary:
      "Equipment alerts turned into scored work orders, technician dispatch, parts reservation, repair reports and preventive maintenance.",
    problem:
      "Maintenance teams coordinated faults, technicians and parts by hand, and preventive work was missed.",
    description:
      "IoT alerts and service requests arrive by webhook, duplicates are filtered, and AI analyses the fault and probable cause to set a risk score and priority. A work order and evidence folder are created, qualified technicians are ranked by skills, region, certification, calendar availability and travel time, and critical jobs can require supervisor approval. Technicians are notified by SMS, parts are predicted and reserved, repair reports are summarised by AI, parts are reconciled and asset health and next maintenance dates are updated.",
    flow: [
      "Alert in",
      "AI fault analysis",
      "Rank & dispatch",
      "Parts & repair",
      "Report & preventive",
    ],
    highlights: [
      { value: "Travel-time", label: "Technician ranking" },
      { value: "Preventive", label: "Maintenance orders" },
    ],
    tools: ["Make.com", "Airtable", "Google Calendar", "Google Maps API", "Twilio", "OpenAI"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/make-field-service/01.webp",
        alt: "Make.com field service scenario",
        width: 1600,
        height: 566,
        caption: "The dispatch and maintenance scenario.",
      },
      {
        src: "/case-media/make-field-service/02.webp",
        alt: "Google Sheets work order log produced by the automation",
        width: 1600,
        height: 900,
        caption: "Work-order log written by the automation (test data).",
      },
    ],
  },
  {
    slug: "make-procurement",
    category: "automation",
    title: "Procurement & Vendor Management (Make.com)",
    tag: "Procurement",
    location: "Global",
    summary:
      "Purchase requests through budget checks, vendor onboarding, RFQs, AI quote comparison, approvals, DocuSign and delivery tracking.",
    problem:
      "Purchasing ran on email threads, so budgets, quotes and approvals were hard to track.",
    description:
      "Purchase requests arrive by webhook and are checked against the department budget. Approved vendors are found by category — or onboarded with compliance documents analysed by AI. RFQs go out automatically, quotes are parsed for price, delivery, warranty and payment terms and compared with weighted scoring and an AI recommendation. Purchases route through manager, finance and director approvals, the PO is generated and signed in DocuSign, deliveries are tracked with reminders, and received goods are verified before vendor performance is updated.",
    flow: ["Request", "Budget check", "Vendors & RFQs", "Compare & approve", "PO, sign & deliver"],
    highlights: [
      { value: "3-level", label: "Approvals" },
      { value: "Weighted", label: "Quote comparison" },
    ],
    tools: ["Make.com", "Airtable", "OpenAI", "DocuSign", "Gmail", "Slack"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/make-procurement/01.webp",
        alt: "Make.com procurement scenario",
        width: 1600,
        height: 532,
        caption: "The procurement scenario.",
      },
    ],
  },
  {
    slug: "make-recruitment",
    category: "automation",
    title: "AI Recruitment & Candidate Screening (Make.com)",
    tag: "HR",
    location: "Global",
    summary:
      "Applications parsed and scored against the role, shortlisted candidates briefed and invited to interview automatically.",
    problem: "HR read every résumé by hand and scheduled interviews over email.",
    description:
      "New applications are checked against open roles and existing candidates, résumés are stored in Drive and analysed by AI for experience, education, skills and projects, then scored against the job's requirements. High scorers are shortlisted with personalised interview questions and an HR brief, HR is notified in Slack, invitations go out by Gmail and interviews are created in Google Calendar. Medium scores go to manual review.",
    flow: [
      "Application",
      "Parse résumé",
      "AI match score",
      "Shortlist & brief",
      "Invite & schedule",
    ],
    highlights: [
      { value: "Weighted", label: "Match score" },
      { value: "Auto", label: "Interview scheduling" },
    ],
    tools: ["Make.com", "Airtable", "OpenAI", "Google Drive", "Google Calendar", "Slack"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/make-recruitment/01.webp",
        alt: "Make.com recruitment screening scenario",
        width: 1600,
        height: 533,
        caption: "The screening scenario.",
      },
    ],
  },
  {
    slug: "make-document-generation",
    category: "automation",
    title: "Agreements, Invoices & Client Documents (Make.com)",
    tag: "Operations",
    location: "Global",
    summary:
      "Pending client records turned into agreements, invoices, sales pitches and organised Drive folders, with status synced to SmartSuite.",
    problem:
      "Every new client meant preparing agreements, invoices and folders by hand from the same data.",
    description:
      "A webhook starts processing: pending agreement and invoice records are read from Google Sheets and generated from Google Docs templates, a standard customer name is created, the client's Drive folder is found or created and a sales pitch is generated. Each record is marked processed in Sheets and SmartSuite is updated with success or failure, with handling for existing folders and Drive errors.",
    flow: ["Webhook", "Read pending rows", "Generate documents", "Folder & pitch", "Update status"],
    highlights: [{ value: "Templates", label: "Docs generated" }],
    tools: ["Make.com", "Google Docs", "Google Sheets", "Google Drive", "SmartSuite"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/make-document-generation/01.webp",
        alt: "Make.com document generation scenario with routers",
        width: 816,
        height: 376,
        caption: "Agreement and invoice queues with routers.",
      },
    ],
  },
  {
    slug: "make-youtube-scheduling",
    category: "automation",
    title: "YouTube Content & Scheduling Pipeline (Make.com)",
    tag: "Content",
    location: "Global",
    summary:
      "Videos uploaded with AI-written titles, descriptions and hashtags, validated and scheduled weeks ahead.",
    problem:
      "Uploading and optimising each video in YouTube Studio took hours and publishing was irregular.",
    description:
      "Video files and details come from Drive, Sheets or Airtable. AI writes the title, SEO description and hashtags; the workflow validates length and limits and stops with an alert if content fails. Videos are uploaded with metadata and visibility and scheduled with fixed gaps — for example every 7–10 days — so weeks of content can be queued at once.",
    flow: ["Video + details", "AI metadata", "Validate", "Upload", "Schedule & log"],
    highlights: [{ value: "7–10 day", label: "Publishing cadence" }],
    tools: ["Make.com", "YouTube API", "Google Drive", "Airtable", "OpenAI"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/make-youtube-scheduling/01.webp",
        alt: "Make.com YouTube scheduling scenario",
        width: 1080,
        height: 270,
        caption: "The publishing scenario.",
      },
    ],
  },

  // ---------------- n8n content ----------------
  {
    slug: "law-firm-social-graphics",
    category: "automation",
    title: "Branded Social Graphics for a Law Firm (n8n)",
    tag: "Legal marketing",
    location: "United States",
    summary:
      "Approved content ideas turned into branded 1080×1080 graphics with copy and hashtags, rotating across 12 templates.",
    problem: "Designing a branded graphic for every social post took time the firm didn't have.",
    description:
      "Pending ideas are read from Google Sheets; Claude writes the image prompt, headline, description and hashtags, which are checked against requirements. Gemini generates the image, the workflow picks one of 12 branded templates by schedule, applies logo, text and colours, and renders a 1080×1080 PNG with Browserless. The file goes to Drive, temporary files are cleaned up and the sheet is updated for review.",
    flow: [
      "Idea from Sheets",
      "AI copy & prompt",
      "Generate image",
      "Apply template",
      "Drive + review",
    ],
    highlights: [{ value: "12", label: "Rotating templates" }],
    tools: ["n8n", "Claude", "Gemini", "Browserless", "Google Sheets"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/law-firm-social-graphics/01.webp",
        alt: "n8n image generation workflow",
        width: 1600,
        height: 685,
        caption: "The image-generation workflow.",
      },
    ],
  },
  {
    slug: "law-firm-legal-reels",
    category: "automation",
    title: "Legal Reel Video Automation (n8n)",
    tag: "Legal marketing",
    location: "United States",
    summary:
      "Short-form vertical reels generated from approved ideas, with script, scenes, branding, music, caption and hashtags.",
    problem: "Producing regular short-form video for Facebook and Instagram was too slow by hand.",
    description:
      "Approved ideas are read from Google Sheets; Gemini writes the script and scene structure, scenes are built and formatted for vertical video, then combined with JSON2Video along with branding, logo, text overlays, transitions and music. Captions and hashtags are generated and the finished video is logged back to the sheet.",
    flow: ["Idea", "Script & scenes", "Render video", "Caption & hashtags", "Log"],
    highlights: [{ value: "Vertical", label: "Reels for FB / IG" }],
    tools: ["n8n", "Gemini", "JSON2Video", "Google Sheets"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/law-firm-legal-reels/01.webp",
        alt: "n8n video generation sub-workflow",
        width: 1600,
        height: 709,
        caption: "The video-generation sub-workflow.",
      },
    ],
  },
  // ---------------- Voice AI ----------------
  {
    slug: "tristrum-sales-lettings",
    category: "voice",
    title: "Property-Search Voice Agent — Tristrum Sales & Lettings",
    tag: "Real Estate",
    location: "United Kingdom",
    status: "client",
    summary:
      "Inbound voice agent that searches the agency's live property data during the call and books valuations.",
    problem:
      "Staff searched the Jupix ERP by hand while on the phone to find properties matching each caller's criteria, which slowed calls down and tied up the team.",
    description:
      "A Synthflow voice agent with an ElevenLabs voice handles incoming valuation and property enquiries. During the call it queries the agency's Jupix data through a Firebase / Google Cloud layer, matches listings against what the caller asks for, and books the valuation into the calendar.",
    flow: ["Call in", "Query Jupix data", "Match listings", "Book valuation"],
    highlights: [
      { value: "24/7", label: "Call coverage" },
      { value: "Live", label: "ERP lookups mid-call" },
    ],
    tools: ["Synthflow", "ElevenLabs", "Firebase", "GCP", "Jupix ERP"],
    services: ["voice-ai"],
  },
  {
    slug: "neo-taxi",
    category: "voice",
    title: "Taxi Booking Voice Agent — NEO Taxi",
    tag: "Transport",
    location: "Germany",
    status: "client",
    summary:
      "Voice agent that books taxi rides in a single call and sends the caller a live Google Maps link.",
    problem:
      "Manual phone dispatch was slow at busy times, and bookings were lost while callers waited.",
    description:
      "The voice agent takes the booking details, confirms pickup and destination, and generates a Google Maps link that is sent to the caller during the conversation. The build combines Synthflow, ElevenLabs, the Google Maps API and GoHighLevel.",
    flow: ["Call in", "AI takes booking", "Generate Maps link", "Send to caller"],
    highlights: [
      { value: "1 call", label: "Booking completed" },
      { value: "Live", label: "Maps link sent mid-call" },
    ],
    tools: ["Synthflow", "Google Maps API", "GoHighLevel", "ElevenLabs"],
    services: ["voice-ai", "gohighlevel-automation"],
  },
  {
    slug: "mavera-ai",
    category: "voice",
    title: "AI Outbound Calling Pipeline — Mavera.ai",
    tag: "AI Agency",
    location: "Global",
    status: "client",
    summary:
      "Outbound pipeline that sources leads, calls them with an AI agent, books appointments and hands off to GoHighLevel follow-up.",
    problem:
      "The agency wanted to grow client acquisition without hiring more SDRs to source and call leads.",
    description:
      "Leads are scraped from LinkedIn and Google Maps with Apify and Apollo, then called by a Synthflow voice agent that qualifies them and books appointments. Leads continue into GoHighLevel follow-up sequences orchestrated with n8n, and follow-up stops automatically once a lead answers.",
    flow: ["Scrape leads", "AI calls lead", "Book appointment", "GHL follow-up"],
    highlights: [
      { value: "In + Out", label: "Call coverage" },
      { value: "Auto-stop", label: "Follow-up ends on answer" },
    ],
    tools: ["Synthflow", "GoHighLevel", "Apify", "Apollo", "n8n"],
    services: ["voice-ai", "gohighlevel-automation", "workflow-automation"],
  },
  {
    slug: "dental-clinic",
    category: "voice",
    title: "Dental Clinic 24/7 Receptionist",
    tag: "Healthcare",
    location: "United States",
    summary:
      "AI receptionist that answers calls around the clock, books dental appointments and runs a three-stage reminder sequence.",
    problem:
      "Front-desk staff were stretched by booking calls at peak times, and missed appointments were a recurring problem.",
    description:
      "A Vapi voice agent answers calls at any hour and books appointments, with records handed to GoHighLevel. n8n then runs an escalating three-stage reminder sequence before each visit, designed to cut down on no-shows.",
    flow: ["Call in", "AI books appointment", "Escalating reminders", "Confirmed visit"],
    highlights: [
      { value: "24/7", label: "Reception coverage" },
      { value: "3-stage", label: "Reminder sequence" },
    ],
    tools: ["Vapi", "GoHighLevel", "n8n"],
    services: ["voice-ai", "gohighlevel-automation", "workflow-automation"],
  },
  {
    slug: "car-rental-fleet",
    category: "voice",
    title: "Car Rental Fleet Sales Agent",
    tag: "Fleet Sales",
    location: "United States",
    summary:
      "Inbound agent that qualifies callers, identifies the decision-maker, dials them and creates the GoHighLevel opportunity.",
    problem:
      "Fleet sales reps spent hours reaching drivers instead of the owners who make purchasing decisions.",
    description:
      "The ElevenLabs voice agent qualifies each inbound caller and works out who actually owns the decision. It then dials the owner directly, and n8n creates the deal in the GoHighLevel pipeline so reps start from a qualified opportunity.",
    flow: ["AI qualifies caller", "Identify owner", "Auto-dial owner", "Create GHL deal"],
    highlights: [
      { value: "Owner", label: "Hand-off to decision-maker" },
      { value: "Auto", label: "GHL pipeline entry" },
    ],
    tools: ["ElevenLabs", "GoHighLevel", "n8n"],
    services: ["voice-ai", "gohighlevel-automation", "workflow-automation"],
  },
  {
    slug: "my360agents",
    category: "voice",
    title: "Industry Voice Agent Library — My360Agents.ai",
    tag: "AI Agency",
    location: "Global",
    status: "client",
    summary:
      "Library of pre-built, industry-specific voice agents with an embeddable inbound-call widget and a live demo.",
    problem:
      "The agency needed specialised voice agents for many verticals, plus a way for prospects to try them live on its website.",
    description:
      "Pre-built voice agents for a wide range of industries, deployable per client, packaged with an embeddable inbound-call widget and a live demo on the agency's site. Built with Synthflow, Vapi, ElevenLabs, GoHighLevel and n8n.",
    flow: ["Select industry", "Deploy pre-built agent", "Embed widget", "Live on site"],
    highlights: [
      { value: "Multi-vertical", label: "Agent library" },
      { value: "1", label: "Embeddable call widget" },
    ],
    metrics: [{ value: "21+", label: "Industry agents", verified: false }],
    tools: ["Synthflow", "Vapi", "GoHighLevel", "ElevenLabs", "n8n"],
    services: ["voice-ai", "gohighlevel-automation"],
  },

  // ---------------- Automation ----------------
  {
    slug: "lead-processing-engine",
    category: "automation",
    title: "Lead Processing Engine",
    tag: "B2B Sales",
    location: "Global",
    summary:
      "n8n pipeline that verifies, classifies, researches and personalises large lead lists in batch.",
    problem:
      "Cleaning, verifying and personalising large monthly lead lists took the team days of manual work.",
    description:
      "The workflow verifies email addresses with MillionVerifier, classifies each lead's industry, runs AI research with OpenAI and writes personalised copy for every lead, exporting the results to Google Sheets. Four processing modes cover different list types.",
    flow: ["Verify emails", "Classify industry", "AI research", "Personalise", "Export"],
    highlights: [
      { value: "4", label: "Processing modes" },
      { value: "Per lead", label: "Personalised copy" },
    ],
    metrics: [{ value: "100k+", label: "Leads per month", verified: false }],
    tools: ["n8n", "MillionVerifier", "OpenAI", "Google Sheets"],
    services: ["workflow-automation"],
  },
  {
    slug: "gmail-triage-rag",
    category: "automation",
    title: "Gmail Triage + RAG",
    tag: "Email Ops",
    location: "Global",
    summary:
      "Inbox automation that sorts email into seven categories, routes it and drafts knowledge-base replies for human approval.",
    problem:
      "A high-volume inbox consumed hours every day, and important messages were easy to miss.",
    description:
      "Each incoming email is first checked against messages already processed, so nothing is handled twice. It's then classified into one of seven categories, labelled in Gmail and routed to the right team member. When a reply is needed, a draft is written from a Pinecone-backed knowledge base, personalised with the sender's details and saved as a Gmail draft — a person reviews it before anything is sent.",
    flow: ["Email in", "Classify (7 categories)", "Route to team", "RAG draft", "Human approves"],
    highlights: [
      { value: "7", label: "Email categories" },
      { value: "Human", label: "Approval before sending" },
      { value: "Dedup", label: "Already-processed check" },
    ],
    tools: ["n8n", "Gmail API", "OpenAI", "Pinecone", "JavaScript"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/gmail-triage-rag/01.webp",
        alt: "n8n workflow canvas for the Gmail triage automation",
        width: 1600,
        height: 576,
        caption:
          "The n8n workflow: Gmail trigger, classification, routing and knowledge-base draft generation.",
      },
    ],
  },
  {
    slug: "b2b-outreach-pipeline",
    category: "automation",
    title: "Apollo Lead Generation & AI Outreach Pipeline",
    tag: "Outbound sales",
    location: "Global",
    summary:
      "A form starts an n8n pipeline: Apollo search, LinkedIn enrichment, validation, a personalised five-email sequence and Zoho CRM sync.",
    problem:
      "There was no outbound system; the sales team built lead lists and wrote emails from spreadsheets.",
    description:
      "Two connected n8n workflows. The first takes a target job title and location from a form, searches Apollo across multiple result pages, keeps leads with LinkedIn profiles and stores them in Google Sheets — de-duplicated by LinkedIn URL — then triggers the second. That one enriches each profile through Apify, validates business email, company, size and location, drops incomplete records, writes a personalised five-email sequence with subjects, pushes complete leads into Zoho CRM and clears temporary data.",
    flow: [
      "Form: title + location",
      "Apollo search",
      "Apify enrichment",
      "Validate & dedupe",
      "5 emails → Zoho CRM",
    ],
    highlights: [
      { value: "5-email", label: "Personalised sequence" },
      { value: "LinkedIn URL", label: "Duplicate key" },
      { value: "2", label: "Chained workflows" },
    ],
    tools: ["n8n", "Apollo", "Apify", "OpenAI", "Google Sheets", "Zoho CRM"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/b2b-outreach-pipeline/01.webp",
        alt: "n8n workflow 1: form, Apollo scraper loop and Google Sheets",
        width: 1600,
        height: 737,
        caption: "Workflow 1: lead discovery from Apollo into Google Sheets.",
      },
      {
        src: "/case-media/b2b-outreach-pipeline/02.webp",
        alt: "n8n workflow 2: enrichment, AI email writing and Zoho CRM",
        width: 1600,
        height: 756,
        caption: "Workflow 2: enrichment, AI-written sequence and Zoho CRM sync.",
      },
    ],
  },
  {
    slug: "linkedin-lead-enrichment",
    category: "automation",
    title: "LinkedIn Lead Enrichment",
    tag: "LinkedIn Ops",
    location: "Global",
    summary:
      "Three-stage enrichment that turns LinkedIn profile URLs into a sheet of direct email addresses.",
    problem:
      "Enrichment meant copy-pasting between tools, emails were often missing, and nothing was tracked.",
    description:
      "The workflow collects LinkedIn URLs, enriches them through the SalesQL API, keeps only direct (non-generic) email addresses and stores the results in Google Sheets.",
    flow: ["Collect URLs", "SalesQL enrich", "Filter direct emails", "Store in Sheets"],
    highlights: [
      { value: "3-stage", label: "Enrichment" },
      { value: "Direct", label: "Emails only" },
    ],
    tools: ["n8n", "SalesQL API", "Google Sheets"],
    services: ["workflow-automation"],
  },
  {
    slug: "real-estate-deal-pages",
    category: "automation",
    title: "Real Estate Deal Pages",
    tag: "Real Estate",
    location: "United States",
    summary:
      "Turns property deal submissions into dedicated investor landing pages and shares them automatically.",
    problem: "Every deal needed a landing page built by hand, and distribution wasn't tracked.",
    description:
      "Each of five investment strategies — BRRR, BTL, HMO, Flip and Rent-to-Rent — has its own dynamic form capturing property details, purchase price, rental and resale projections and deal notes. Submitting a deal creates a unique deal ID and a landing page with a shareable URL, stores the deal in Google Sheets and shares it with investors or the internal team.",
    flow: ["Deal form submitted", "Generate deal ID", "Build landing page", "Share with investors"],
    highlights: [
      { value: "5", label: "Investment strategies" },
      { value: "35+", label: "Deal inputs per page" },
    ],
    tools: ["n8n", "Dynamic web forms", "Google Sheets", "OpenAI", "Webhooks"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/real-estate-deal-pages/01.webp",
        alt: "n8n workflow canvas for the BTL deal form",
        width: 1600,
        height: 740,
        caption: "Workflow behind the BTL (buy-to-let) deal form.",
      },
      {
        src: "/case-media/real-estate-deal-pages/02.webp",
        alt: "n8n workflow canvas for the HMO deal form",
        width: 1600,
        height: 742,
        caption:
          "Workflow behind the HMO deal form — each strategy has its own form and page logic.",
      },
    ],
  },
  {
    slug: "cancellation-recovery",
    category: "automation",
    title: "Cancellation Recovery",
    tag: "Scheduling",
    location: "Global",
    summary:
      "Detects cancelled appointments and offers the slot to a waitlist through an automatic campaign.",
    problem: "Cancelled appointment slots went unfilled because there was no recovery process.",
    description:
      "When a cancellation is detected, the workflow launches a recovery campaign by email (SendGrid and Gmail API), offers the freed slot to people on the waitlist and logs the result.",
    flow: ["Detect cancellation", "Recovery campaign", "Refill from waitlist", "Log"],
    highlights: [
      { value: "Auto", label: "Cancellation detection" },
      { value: "Waitlist", label: "Slot refill" },
    ],
    tools: ["n8n", "SendGrid", "Gmail API"],
    services: ["workflow-automation"],
  },
  {
    slug: "shopify-financial-automation",
    category: "automation",
    title: "Shopify Financial Automation",
    tag: "E-Commerce",
    location: "Global",
    summary:
      "Calculates fees, payouts and net profit for each Shopify order and files the records to Drive.",
    problem: "Fees, payouts and profit were tracked by hand across inconsistent spreadsheets.",
    description:
      "Each new Shopify order is captured and categorised, and variant and cost data is pulled from Shopify. JavaScript inside n8n calculates platform and payment fees, streamer payouts, shipping, packaging and net profit or loss, with handling for repeat customers. The workflow then finds — or creates — the right Drive folder, spreadsheet and sheet, and adds or updates the order record.",
    flow: [
      "Order in",
      "Categorise & pull costs",
      "Fees, payouts & profit",
      "File to Drive / Sheets",
    ],
    highlights: [
      { value: "Per order", label: "Fee & payout calculation" },
      { value: "Auto", label: "Creates folders & sheets" },
    ],
    tools: ["n8n", "Shopify API", "Google Drive", "Google Sheets", "JavaScript"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/shopify-financial-automation/01.webp",
        alt: "n8n workflow canvas for Shopify order processing",
        width: 1600,
        height: 743,
        caption:
          "The n8n workflow, branching by product category before writing to the right sheet.",
      },
    ],
  },
  {
    slug: "seo-pipeline",
    category: "automation",
    title: "Self-Improving SEO Pipeline",
    tag: "SEO Content",
    location: "Global",
    summary:
      "Content pipeline that drafts articles and revises them against NeuronWriter guidelines until they reach a target score.",
    problem: "Writers spent days revising content to hit SEO score targets.",
    description:
      "Primary and secondary keywords are read from Google Sheets and sent to NeuronWriter, which returns guidelines for headings, keyword usage and topic coverage. An AI draft (OpenAI and Gemini) is scored against those guidelines and refined in a loop until it reaches the configured content score — 80 in the original setup — then the final content and score are saved back to the sheet.",
    flow: ["Keywords in", "Pull guidelines", "AI draft", "Refine until target score"],
    highlights: [
      { value: "80", label: "Target content score" },
      { value: "Loop", label: "Automatic refinement" },
    ],
    tools: ["n8n", "NeuronWriter API", "OpenAI", "Gemini", "Google Sheets"],
    services: ["workflow-automation"],
    screenshots: [
      {
        src: "/case-media/seo-pipeline/01.webp",
        alt: "n8n workflow canvas for the NeuronWriter SEO content pipeline",
        width: 1600,
        height: 637,
        caption: "The n8n workflow: keyword intake, guidelines, AI drafting and the scoring loop.",
      },
    ],
  },
  {
    slug: "crm-sync-dedup",
    category: "automation",
    title: "CRM Sync & Dedup",
    tag: "CRM Ops",
    location: "Global",
    summary:
      "Uploaded lists are AI-enriched, matched by company domain and created or updated in Zoho CRM.",
    problem: "Manual imports created duplicate records and left CRM data stale.",
    description:
      "Files uploaded to Google Drive are enriched with OpenAI, matched against existing records by company domain, and then either update the existing Zoho record or create a new one — preventing duplicates up front instead of cleaning them up later.",
    flow: ["File upload", "AI enrichment", "Domain-based match", "Create / update CRM"],
    highlights: [
      { value: "Domain-level", label: "Deduplication" },
      { value: "Upsert", label: "Create or update logic" },
    ],
    tools: ["n8n", "OpenAI", "Zoho CRM", "Google Drive"],
    services: ["workflow-automation"],
  },
  {
    slug: "universal-receptionist-builder",
    category: "voice",
    title: "Universal Receptionist Builder",
    tag: "AI Agency Tooling",
    location: "Global",
    summary:
      "Enter a website URL and the pipeline builds a knowledge base and deploys a receptionist voice agent.",
    problem:
      "Setting up a receptionist agent for each new client took hours of manual prompting and configuration.",
    description:
      "A one-form setup: the pipeline scrapes the client's website, builds the agent's knowledge base from the content and deploys an ElevenLabs receptionist connected to GoHighLevel.",
    flow: ["Enter URL", "Scrape content", "Build knowledge base", "Deploy agent"],
    highlights: [
      { value: "1 form", label: "Setup input" },
      { value: "Auto", label: "Knowledge-base build" },
    ],
    metrics: [{ value: "Minutes", label: "To deploy", verified: false }],
    tools: ["n8n", "ElevenLabs", "GoHighLevel"],
    services: ["voice-ai", "workflow-automation"],
  },

  // ---------------- Chatbot ----------------
  {
    slug: "hospital-whatsapp-bot",
    category: "chatbots",
    title: "Hospital WhatsApp Bot",
    tag: "Healthcare",
    location: "Global",
    summary:
      "WhatsApp assistant for booking imaging and lab tests, with 48h / 12h / 3h reminders and knowledge-base answers.",
    problem:
      "Imaging and lab-test bookings and reminders were handled manually, with no automated channel for patients.",
    description:
      "Patients book through WhatsApp; bookings are written to Airtable, reminders go out 48, 12 and 3 hours before the appointment, rescheduling is handled in the chat, and patient questions are answered from a RAG knowledge base.",
    flow: ["Book via WhatsApp", "Airtable entry", "Reminders 48h / 12h / 3h", "RAG Q&A"],
    highlights: [
      { value: "3-stage", label: "Reminder cadence" },
      { value: "RAG", label: "Grounded answers" },
    ],
    tools: ["n8n", "Airtable", "RAG", "Meta API"],
    services: ["ai-chatbots", "workflow-automation"],
  },

  // ---------------- Omnichannel & Ads ----------------
  {
    slug: "omnichannel-bot",
    category: "chatbots",
    title: "Omnichannel Assistant (6 Platforms)",
    tag: "Multi-Platform",
    location: "Global",
    summary:
      "One AI assistant answering across six messaging platforms, with intent detection and GoHighLevel sync.",
    problem:
      "The business needed consistent AI replies on every channel, with conversations synced to the CRM.",
    description:
      "A single assistant (OpenAI with a Pinecone knowledge base) answers on WhatsApp, Instagram, Messenger, Telegram, Slack and Discord. It qualifies leads, detects when a person should take over, and syncs conversations to GoHighLevel through n8n.",
    flow: ["Message in (any channel)", "LLM responds", "Qualify", "Escalate on intent", "CRM sync"],
    highlights: [
      { value: "6", label: "Platforms, one assistant" },
      { value: "Intent", label: "Escalation detection" },
    ],
    tools: ["n8n", "OpenAI", "Meta API", "Pinecone", "GoHighLevel"],
    services: ["ai-chatbots", "gohighlevel-automation", "workflow-automation"],
  },
  {
    slug: "linkedin-outreach-bot",
    category: "automation",
    title: "LinkedIn Outreach Bot",
    tag: "Growth Ops",
    location: "Global",
    summary:
      "Automates connection requests, scores replies with AI and triggers the right CRM follow-up.",
    problem:
      "The team sent 30–40 connection requests a day by hand, with no way of prioritising replies.",
    description:
      "The workflow sends connection requests, scores each reply with OpenAI, syncs the graded lead to Zoho CRM and triggers the matching follow-up sequence.",
    flow: ["Auto-connect", "AI scores reply", "Sync to CRM", "Trigger follow-up"],
    highlights: [
      { value: "AI", label: "Reply scoring" },
      { value: "Auto", label: "CRM follow-up trigger" },
    ],
    tools: ["n8n", "LinkedIn API", "OpenAI", "Zoho CRM"],
    services: ["workflow-automation"],
  },
  {
    slug: "social-content-machine",
    category: "automation",
    title: "Social Content Machine",
    tag: "Content",
    location: "Global",
    summary:
      "Generates posts, captions and hashtags, then schedules and publishes them to Facebook, Instagram and LinkedIn.",
    problem: "Creating and posting content took many hours of manual work every week.",
    description:
      "Posts, captions and hashtags are generated with OpenAI using the brand's voice guidelines, scheduled, and published automatically to three platforms through the Meta and LinkedIn APIs.",
    flow: ["Generate post + caption", "Schedule", "Publish to FB / IG / LinkedIn"],
    highlights: [
      { value: "3", label: "Platforms published" },
      { value: "Brand", label: "Voice guidelines in prompts" },
    ],
    metrics: [{ value: "15h → 1h", label: "Weekly content time", verified: false }],
    tools: ["n8n", "OpenAI", "Meta API", "LinkedIn API"],
    services: ["workflow-automation"],
  },
  {
    slug: "ai-ad-creative-pipeline",
    category: "automation",
    title: "AI Ad Creative Pipeline",
    tag: "Performance Marketing",
    location: "Global",
    summary:
      "Generates ad creatives in three formats, checks them against brand rules and schedules them.",
    problem: "Clients needed a high volume of ad creatives on tight deadlines.",
    description:
      "From a prompt, the pipeline generates creatives in three formats with OpenAI / DALL·E, checks them against brand guidelines, then schedules and posts them through the Meta Ads API with tracking.",
    flow: ["Prompt in", "Generate creative", "Brand check", "Schedule & post"],
    highlights: [
      { value: "3", label: "Creative formats" },
      { value: "Brand", label: "Guideline check" },
    ],
    tools: ["n8n", "OpenAI / DALL·E", "Meta Ads API"],
    services: ["workflow-automation"],
  },

  // ---------------- Software ----------------
  {
    slug: "hisabdaar",
    category: "erp-pos",
    title: "Hisabdaar ERP",
    tag: "ERP",
    location: "Pakistan",
    summary:
      "ERP covering inventory, multi-warehouse, manufacturing, HR, payroll, sales, purchasing and financial statements.",
    problem:
      "The business needed one system for inventory, warehouses, manufacturing, HR, sales, purchasing and full financial reporting.",
    description:
      "An ASP.NET MVC and SQL Server business management system. Sales and purchase invoices — with discounts, taxes, returns and parked transactions — update inventory with barcode support across multiple warehouses, including stock transfers, goods receive notes and a COGS ledger. Manufacturing is tracked through production, and the accounting module produces a full reporting suite: trial balance, income statement, general ledger, cash flow, balance sheet, receivables and payables. Sales analytics cover top products, category sales and salesperson performance.",
    flow: [
      "Purchase / sales order",
      "Inventory & barcode update",
      "Manufacturing tracking",
      "Financial statements",
    ],
    highlights: [
      { value: "Multi-warehouse", label: "Inventory" },
      { value: "Full suite", label: "Financial & inventory reports" },
    ],
    tools: ["ASP.NET MVC", "SQL Server", "jQuery", "Bootstrap"],
    services: ["custom-software"],
    screenshots: [
      {
        src: "/case-media/hisabdaar/01.webp",
        alt: "Hisabdaar dashboard with sales trend and top-selling products",
        width: 1400,
        height: 611,
        caption: "Business dashboard (demo data).",
      },
      {
        src: "/case-media/hisabdaar/02.webp",
        alt: "Hisabdaar sales invoice screen",
        width: 1400,
        height: 585,
        caption: "Sales invoice entry with discounts, taxes and payment.",
      },
      {
        src: "/case-media/hisabdaar/03.webp",
        alt: "Hisabdaar report library listing financial, inventory and sales reports",
        width: 1400,
        height: 636,
        caption: "Report library: financial, inventory and sales reports.",
      },
    ],
  },
  {
    slug: "ziafat-pos",
    category: "erp-pos",
    title: "Ziafat Restaurant POS",
    tag: "POS · E-invoicing",
    location: "Saudi Arabia",
    status: "client",
    featured: true,
    summary:
      "Restaurant POS for a restaurant in Makkah, with ZATCA Phase 2 e-invoicing and QR-coded invoices.",
    problem:
      "A restaurant in Makkah needed its POS to meet Saudi Arabia's ZATCA Phase 2 e-invoicing requirements.",
    description:
      "A WinForms POS for dine-in and takeaway orders, with a categorised menu, on-screen keypad, VAT calculation, a visual table layout, receipt and kitchen-ticket printing, and date-range sales reports. ZATCA Phase 2 e-invoicing is integrated through the ZATCA SDK: invoices carry the required QR code and are reported electronically, and the order list shows each invoice's ZATCA submission status.",
    flow: ["Order taken", "Table management", "ZATCA QR invoice", "E-invoice reporting"],
    highlights: [
      { value: "Phase 2", label: "ZATCA e-invoicing" },
      { value: "QR", label: "Coded invoices" },
    ],
    tools: ["WinForms", "ZATCA SDK", "Crystal Reports"],
    services: ["custom-software"],
    screenshots: [
      {
        src: "/case-media/ziafat-pos/01.webp",
        alt: "Restaurant POS sales screen with menu categories, order lines and VAT",
        width: 960,
        height: 516,
        caption: "Sales screen: categorised menu, order lines, VAT and payment summary.",
      },
      {
        src: "/case-media/ziafat-pos/02.webp",
        alt: "Order receipts list with ZATCA status column",
        width: 960,
        height: 516,
        caption: "Order list with the ZATCA submission status of each invoice.",
      },
      {
        src: "/case-media/ziafat-pos/03.webp",
        alt: "Table layout showing available and occupied tables",
        width: 960,
        height: 516,
        caption: "Table view: available and occupied tables at a glance.",
      },
    ],
  },
  {
    slug: "ahmad-sweets-pos",
    category: "erp-pos",
    title: "Ahmad Sweets POS",
    tag: "POS · E-invoicing",
    location: "Pakistan",
    status: "client",
    summary:
      "Multi-location retail POS integrated with Pakistan's FBR invoicing API, with automatic tax calculation.",
    problem: "A retail chain needed FBR-integrated invoicing across its locations.",
    description:
      "A WinForms POS deployed across multiple retail locations. Each sale authenticates with the FBR API, tax is calculated automatically, and the invoice is generated and reported.",
    flow: ["Sale made", "FBR API auth", "Tax calculated", "Invoice generated"],
    highlights: [
      { value: "FBR", label: "API integration" },
      { value: "Multi-location", label: "Deployment" },
    ],
    tools: ["WinForms", "FBR API", "Crystal Reports"],
    services: ["custom-software"],
  },
  {
    slug: "medzah-ecommerce",
    category: "web",
    title: "Medzah E-Commerce",
    tag: "B2B E-Commerce",
    location: "Global",
    status: "client",
    summary:
      "B2B ordering portal and admin system for a medical-products supplier, with JWT-secured APIs, Stripe payments and FedEx shipping.",
    problem:
      "A medical-products supplier needed business customers to order online — with purchase orders, shipping details and flexible payment — and a back office to manage it.",
    description:
      "Two connected portals. Business customers configure products by size, variant and packaging, save shopping lists, and check out with purchase-order numbers, shipping instructions and pay-now or pay-later options, then track orders and payments. Administrators manage the catalogue (categories, sizes, units, price points), orders, customer-wise reports, messaging and role-based permissions. Built on ASP.NET MVC 5 and ASP.NET Core with JWT-secured APIs, Stripe payments and FedEx shipping.",
    flow: [
      "Configure products",
      "Cart & shopping lists",
      "Checkout with PO",
      "Payment & shipping",
      "Order tracking",
    ],
    highlights: [
      { value: "2", label: "Portals: customer & admin" },
      { value: "Stripe + FedEx", label: "Payments & shipping" },
      { value: "Role-based", label: "Admin permissions" },
    ],
    tools: ["ASP.NET MVC 5 / Core", "JWT", "Stripe", "FedEx API"],
    services: ["custom-software"],
    screenshots: [
      {
        src: "/case-media/medzah-ecommerce/01.webp",
        alt: "Medzah customer portal product page with size and packaging options",
        width: 1600,
        height: 783,
        caption: "Customer portal: configuring a product by size and packaging.",
      },
      {
        src: "/case-media/medzah-ecommerce/02.webp",
        alt: "Medzah customer dashboard with order counts and top products",
        width: 1600,
        height: 783,
        caption: "Customer dashboard with order counts and top ordered products.",
      },
      {
        src: "/case-media/medzah-ecommerce/03.webp",
        alt: "Medzah order list with purchase order number and payment status",
        width: 1600,
        height: 783,
        caption: "Order list with purchase-order references and payment status.",
      },
      {
        src: "/case-media/medzah-ecommerce/04.webp",
        alt: "Medzah admin product creation form",
        width: 1600,
        height: 783,
        caption: "Admin portal: creating a product with categories, sizes and units.",
      },
    ],
  },
  {
    slug: "ruda-erp",
    category: "erp-pos",
    title: "RUDA Real Estate ERP",
    tag: "Public Sector · Real Estate",
    location: "Pakistan",
    status: "client",
    summary:
      "Real-estate ERP for a development authority: balloting, payment plans, challans, waivers and investor reporting.",
    problem:
      "A public-sector development authority needed software for plot balloting, payment plans, challans, waivers and investor reporting.",
    description:
      "An ASP.NET MVC and ADO.NET application on SQL Server 2022, with a React front-end and JWT-secured APIs, covering the flow from application and balloting to payment plans, challan issuance and investor reports. Administrators track applications by status and applicant type, manage offerings, configure payment plans with down payments and instalments in rupees or dollars, verify payments, and control access through role-based permissions.",
    flow: ["Application", "Balloting", "Payment plan", "Challan issued", "Investor reports"],
    highlights: [
      { value: "React", label: "Front-end on .NET APIs" },
      { value: "JWT", label: "Secured APIs" },
      { value: "Role-based", label: "Module permissions" },
    ],
    tools: ["ASP.NET MVC", "ADO.NET", "SQL Server 2022", "React"],
    services: ["custom-software"],
  },
  {
    slug: "privont",
    category: "web",
    title: "Privont",
    tag: "PropTech",
    location: "United States",
    status: "client",
    summary:
      "PropTech platform that syncs leads from Follow Up Boss, automates investor messages and gives agents a mobile app.",
    problem:
      "The platform needed CRM lead sync, automated investor communication and a mobile app for agents.",
    description:
      "A real-estate relationship and lead platform that centralises agents, lenders, vendors and leads, with lead-expiry tracking, favourite lenders and exportable records behind a members login. Leads sync from Follow Up Boss through its API, investor invitations go out automatically by SMS and email, and agents use a cross-platform React Native app backed by ASP.NET MVC APIs secured with JWT.",
    flow: ["Lead in (Follow Up Boss)", "Sync to platform", "Auto SMS / email", "Mobile app access"],
    highlights: [
      { value: "FUB", label: "API lead sync" },
      { value: "iOS + Android", label: "Mobile app" },
    ],
    tools: ["ASP.NET MVC", "React Native", "JWT", "Follow Up Boss API"],
    services: ["custom-software"],
    screenshots: [
      {
        src: "/case-media/privont/01.webp",
        alt: "Privont members landing page",
        width: 1600,
        height: 783,
        caption: "Members landing page.",
      },
      {
        src: "/case-media/privont/02.webp",
        alt: "Privont lender profile form filled with test data",
        width: 1600,
        height: 783,
        caption: "Lender profile form in the admin dashboard (test data).",
      },
    ],
  },
  {
    slug: "order-take-app",
    category: "web",
    title: "Order Take App",
    tag: "Mobile",
    location: "Global",
    summary:
      "Offline-first field ordering app that stores orders on the device and syncs when the connection returns.",
    problem: "Field sales reps lost orders when they had no connectivity.",
    description:
      "A Xamarin.Forms app stores orders in SQLite while offline and syncs them to an ASP.NET Web API automatically when the device reconnects.",
    flow: ["Rep takes order (offline)", "Stored locally", "Device reconnects", "Sync to API"],
    highlights: [
      { value: "Offline", label: "Order capture" },
      { value: "Auto", label: "Sync on reconnect" },
    ],
    tools: ["Xamarin.Forms", "ASP.NET Web API", "SQLite"],
    services: ["custom-software"],
  },
];

export type Platform =
  "GoHighLevel" | "n8n" | "Make.com" | "Zapier" | "Voice AI" | "Chatbots" | "Custom software";

export const platformOrder: Platform[] = [
  "GoHighLevel",
  "n8n",
  "Make.com",
  "Zapier",
  "Voice AI",
  "Chatbots",
  "Custom software",
];

/** Platforms a project used, derived from its tools and service areas. */
export function platformsOf(c: CaseStudy): Platform[] {
  const tools = c.tools.join(" ").toLowerCase();
  const out: Platform[] = [];
  if (tools.includes("gohighlevel") || c.services.includes("gohighlevel-automation"))
    out.push("GoHighLevel");
  if (tools.includes("n8n")) out.push("n8n");
  if (tools.includes("make.com")) out.push("Make.com");
  if (tools.includes("zapier")) out.push("Zapier");
  if (c.services.includes("voice-ai")) out.push("Voice AI");
  if (c.services.includes("ai-chatbots")) out.push("Chatbots");
  if (c.services.includes("custom-software")) out.push("Custom software");
  return out;
}

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

/** Featured first (in data order), then the rest. */
export const sortedCaseStudies = [
  ...caseStudies.filter((c) => c.featured),
  ...caseStudies.filter((c) => !c.featured),
];

export const featuredCaseStudies = caseStudies.filter((c) => c.featured);

export const verifiedMetrics = (c: CaseStudy) => (c.metrics ?? []).filter((m) => m.verified);

export function relatedCaseStudies(study: CaseStudy, limit = 3) {
  return caseStudies
    .filter((c) => c.slug !== study.slug)
    .map((c) => ({
      c,
      score:
        c.services.filter((s) => study.services.includes(s)).length * 2 +
        (c.category === study.category ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.c);
}

/** Which categories are a service's own work (listed first on that service's page). */
const serviceCategories: Record<ServiceSlug, Category[]> = {
  "voice-ai": ["voice"],
  "gohighlevel-automation": ["crm"],
  "workflow-automation": ["automation"],
  "ai-chatbots": ["chatbots"],
  "custom-software": ["erp-pos", "web"],
};

/** Projects for a service page: its own category first, then projects that also use it. */
export const caseStudiesForService = (slug: ServiceSlug) => {
  const own = serviceCategories[slug] ?? [];
  const matches = sortedCaseStudies.filter((c) => c.services.includes(slug));
  return [
    ...matches.filter((c) => own.includes(c.category)),
    ...matches.filter((c) => !own.includes(c.category)),
  ];
};

export type AutomationPlatform = "n8n" | "Make.com" | "Zapier";
export const automationPlatforms: AutomationPlatform[] = ["n8n", "Make.com", "Zapier"];

/** The workflow platform an automation project was built on (its first matching tool). */
export function automationPlatformOf(c: CaseStudy): AutomationPlatform | undefined {
  for (const tool of c.tools) {
    const t = tool.toLowerCase();
    if (t === "n8n") return "n8n";
    if (t === "make.com") return "Make.com";
    if (t === "zapier") return "Zapier";
  }
  return undefined;
}
