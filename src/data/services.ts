// Keep this file free of value imports: scripts/export-static.mjs loads it with Node's
// TypeScript type-stripping to build the static route list and sitemap.
//
// Copy rules (busy business owners, plain English): headings ≤ 8 words, card lines ≤ 20 words,
// at most 3 bullets per card. No outcome numbers unless they are verified.

export type ServiceSlug =
  | "workflow-automation"
  | "gohighlevel-automation"
  | "lead-generation"
  | "ai-content-automation"
  | "voice-ai"
  | "ai-chatbots"
  | "custom-software";

export type Service = {
  slug: ServiceSlug;
  /** Full name: mega-menu, cards and the services page. */
  title: string;
  /** Short name: breadcrumbs, footer links and the contact form. */
  shortTitle: string;
  /** One-line outcome for cards and menus (≤ 20 words). */
  tagline: string;
  /** Up to three short bullets for the home services grid. */
  bullets: string[];
  /** Small label above the page title (usually the main tools). */
  eyebrow: string;
  hero: { title: string; intro: string };
  /** The pain in two short lines, in the client's words. */
  problem: [string, string];
  /** "What I build": the systems this service covers. */
  build: { title: string; body: string }[];
  /** "How it works": three steps from first call to live system. */
  steps: [Step, Step, Step];
  /** "What you get": outcomes, described without invented numbers. */
  outcomes: string[];
  cta: { title: string; body: string };
  meta: { title: string; description: string };
};

type Step = { title: string; body: string };

export const services: Service[] = [
  {
    slug: "workflow-automation",
    title: "Business Automation",
    shortTitle: "Business Automation",
    tagline:
      "Connect your apps and remove manual work with n8n, Zapier or Make, built to keep running.",
    bullets: [
      "Lead routing, CRM sync and reporting",
      "AI steps that sort, summarise and draft",
      "Error alerts, retries and clear handover",
    ],
    eyebrow: "n8n · Zapier · Make",
    hero: {
      title: "Automate the busywork between your apps",
      intro:
        "I build workflows that move data, trigger follow-ups and run AI steps across your tools. I implement on all three platforms and recommend the right one for your budget, team and volume.",
    },
    problem: [
      "Your team copies data between apps, inboxes and spreadsheets every day.",
      "Automations break quietly, and nobody notices until a lead or invoice is lost.",
    ],
    build: [
      {
        title: "Lead capture & routing",
        body: "Form, ad and inbox leads cleaned, de-duplicated and sent to the right person.",
      },
      {
        title: "CRM & app sync",
        body: "Contacts, deals and orders kept in step across your CRM, sheets and tools.",
      },
      {
        title: "Documents & finance",
        body: "Invoices, agreements and reports generated, sent and filed automatically.",
      },
      {
        title: "AI inside your workflows",
        body: "Classify emails, summarise calls and draft replies with OpenAI or Claude.",
      },
      {
        title: "Alerts & daily summaries",
        body: "Updates in Slack or email, so your team sees problems before customers do.",
      },
      {
        title: "Custom API integrations",
        body: "Webhooks and custom code wherever a ready-made connector doesn't exist.",
      },
    ],
    steps: [
      {
        title: "Map the process",
        body: "We walk through the manual steps and choose the right platform together.",
      },
      {
        title: "Build and test",
        body: "I build the workflow and test it against real, messy data.",
      },
      {
        title: "Launch and hand over",
        body: "Go live with monitoring, alerts and a short guide for your team.",
      },
    ],
    outcomes: [
      "Repetitive copy-paste work taken off your team",
      "Leads and data moving between apps without missed steps",
      "Alerts when something fails, before customers notice",
      "Documentation your team can follow and adjust",
    ],
    cta: {
      title: "Not sure which platform fits?",
      body: "Tell me what you want automated. I'll recommend n8n, Zapier or Make and explain why.",
    },
    meta: {
      title: "Business Automation with n8n, Zapier & Make",
      description:
        "Business process automation with n8n, Zapier and Make.com: lead routing, CRM sync, documents and AI steps, plus an honest comparison of the three platforms.",
    },
  },
  {
    slug: "gohighlevel-automation",
    title: "GoHighLevel Automation & CRM",
    shortTitle: "GoHighLevel & CRM",
    tagline:
      "Pipelines, follow-ups and calendars in GoHighLevel, set up so every lead gets a reply.",
    bullets: [
      "Lead capture into clean pipelines",
      "SMS, email and WhatsApp follow-up",
      "Booking, reminders and no-show recovery",
    ],
    eyebrow: "For agencies & service businesses",
    hero: {
      title: "A GoHighLevel CRM that follows up for you",
      intro:
        "I set up and repair GoHighLevel accounts: pipelines, workflows, calendars and integrations. Every lead gets a fast reply and a clear next step, without anyone chasing it.",
    },
    problem: [
      "Leads sit in the CRM without a reply, or get stuck between stages.",
      "Workflows are half-finished, and follow-up depends on someone remembering.",
    ],
    build: [
      {
        title: "Pipelines & lead stages",
        body: "Clear stages with automatic moves, owners and tasks for your team.",
      },
      {
        title: "Follow-up sequences",
        body: "SMS, email and WhatsApp nurtures that stop as soon as the lead replies.",
      },
      {
        title: "Calendars & reminders",
        body: "Booking links, reminders, rescheduling and no-show follow-up.",
      },
      {
        title: "AI voice & chat in GHL",
        body: "Agents that answer, qualify and book straight into your calendar.",
      },
      {
        title: "Payments & invoices",
        body: "Payment links, instalments and receipts tied to each contact.",
      },
      {
        title: "Snapshots for agencies",
        body: "Reusable sub-account builds you can roll out to every client.",
      },
    ],
    steps: [
      {
        title: "Audit the account",
        body: "I review your pipelines, workflows and lead sources, and find the gaps.",
      },
      {
        title: "Rebuild and connect",
        body: "Stages, automations and integrations, tested on real lead journeys.",
      },
      {
        title: "Walk through and hand over",
        body: "A recorded walkthrough and notes on how every workflow works.",
      },
    ],
    outcomes: [
      "Every new lead gets a reply and an owner",
      "Follow-up runs on schedule until the lead responds",
      "Fewer missed appointments, with reminders and easy rescheduling",
      "A setup your team understands and can maintain",
    ],
    cta: {
      title: "Want your GoHighLevel account fixed?",
      body: "Share what's set up today and where leads get stuck. I'll suggest a clear fix plan.",
    },
    meta: {
      title: "GoHighLevel Automation & CRM Setup",
      description:
        "GoHighLevel CRM setup and automation: pipelines, follow-up workflows, calendars, AI agents and integrations for agencies and service businesses.",
    },
  },
  {
    slug: "lead-generation",
    title: "Lead Generation Systems",
    shortTitle: "Lead Generation",
    tagline:
      "Find, enrich and contact the right prospects automatically, then sync replies and bookings to your CRM.",
    bullets: [
      "Prospect lists from Apollo.io, LinkedIn and Maps",
      "Verified emails before any outreach",
      "Personalised sequences synced to your CRM",
    ],
    eyebrow: "Apify · Apollo.io · CRM sync",
    hero: {
      title: "Find and reach the right prospects automatically",
      intro:
        "I build lead systems that scrape and enrich prospects, verify contact details, write personalised outreach and sync every reply and booking to your CRM.",
    },
    problem: [
      "Building prospect lists by hand takes hours, and the data goes stale fast.",
      "Outreach feels generic, replies get lost, and nobody knows which leads are warm.",
    ],
    build: [
      {
        title: "Prospect scraping",
        body: "Targeted lists from Apollo.io, LinkedIn and Google Maps using Apify.",
      },
      {
        title: "Enrichment & verification",
        body: "Company data added and emails verified before anyone is contacted.",
      },
      {
        title: "AI personalisation",
        body: "Opening lines and sequences written from each prospect's profile.",
      },
      {
        title: "CRM sync",
        body: "Leads, replies and stages pushed to GoHighLevel, HubSpot or Zoho.",
      },
      {
        title: "Outreach sequences",
        body: "Multi-step email follow-up that stops automatically on a reply.",
      },
      {
        title: "Booking hand-off",
        body: "Interested leads get a calendar link, or a call from a voice agent.",
      },
    ],
    steps: [
      {
        title: "Define your ideal customer",
        body: "Industries, roles, locations and the buying signals that matter.",
      },
      {
        title: "Build the pipeline",
        body: "Scraping, enrichment, verification and outreach, tested on a small batch.",
      },
      {
        title: "Run and refine",
        body: "Scheduled runs, clean data in your CRM and a simple progress view.",
      },
    ],
    outcomes: [
      "Fresh, verified prospect lists without manual research",
      "Personalised outreach at a steady, safe volume",
      "Every reply and booking tracked in your CRM",
      "A repeatable system you own and can scale",
    ],
    cta: {
      title: "Ready for a steadier lead flow?",
      body: "Tell me who your ideal customer is. I'll map a lead system around them.",
    },
    meta: {
      title: "Automated Lead Generation Systems",
      description:
        "Automated lead generation with Apify, Apollo.io and n8n: prospect scraping, enrichment, email verification, AI-personalised outreach and CRM sync.",
    },
  },
  {
    slug: "ai-content-automation",
    title: "AI Content & Blog Automation",
    shortTitle: "AI Content & Blogs",
    tagline:
      "From keyword research to a published WordPress post: researched, written in your voice and reviewed.",
    bullets: [
      "Topic and keyword research",
      "Brand-voice drafts with a review step",
      "SEO, featured image and scheduled publishing",
    ],
    eyebrow: "Research → Write → Publish",
    hero: {
      title: "From keyword to published post, automated",
      intro:
        "I build AI content pipelines that research topics, draft articles in your brand voice, wait for your approval, handle the SEO and publish to WordPress on schedule.",
    },
    problem: [
      "Your blog is out of date because writing takes time nobody has.",
      "AI drafts sound generic, miss facts and still need hours of formatting.",
    ],
    build: [
      {
        title: "Topic & keyword research",
        body: "Ideas and keywords pulled from search data and competitor content.",
      },
      {
        title: "Article research",
        body: "Sources gathered and summarised before a single word is drafted.",
      },
      {
        title: "Brand-voice drafting",
        body: "Drafts written to your tone, structure and do-and-don't rules.",
      },
      {
        title: "Review checkpoint",
        body: "You approve, edit or reject each draft before anything goes live.",
      },
      {
        title: "SEO & featured image",
        body: "Meta tags, headings, internal links and a generated featured image.",
      },
      {
        title: "WordPress auto-publishing",
        body: "Posts formatted and scheduled in WordPress, with categories and tags.",
      },
    ],
    steps: [
      {
        title: "Set the strategy",
        body: "Topics, keywords, tone and the sources the pipeline may use.",
      },
      {
        title: "Build the pipeline",
        body: "Research, drafting, review and publishing steps, tested on real posts.",
      },
      {
        title: "Publish on schedule",
        body: "Drafts arrive for review; approved posts go live automatically.",
      },
    ],
    outcomes: [
      "A consistent publishing schedule without a writing team",
      "Articles grounded in research, not generic AI text",
      "Full control: nothing publishes without your approval",
      "SEO basics handled on every post",
    ],
    cta: {
      title: "Want your blog publishing on schedule?",
      body: "Share your site and topics. I'll outline a pipeline from research to WordPress.",
    },
    meta: {
      title: "AI Content & Blog Automation for WordPress",
      description:
        "AI blog automation: keyword and article research, brand-voice drafting, a human review step, SEO and scheduled publishing to WordPress.",
    },
  },
  {
    slug: "voice-ai",
    title: "AI Voice Agents",
    shortTitle: "Voice AI",
    tagline:
      "Inbound and outbound voice agents that answer, qualify and book appointments, day or night.",
    bullets: [
      "24/7 call answering and booking",
      "Live lookups in your CRM or calendar",
      "Outbound calls that follow up new leads",
    ],
    eyebrow: "Vapi · ElevenLabs · Synthflow",
    hero: {
      title: "Voice agents that answer, qualify and book",
      intro:
        "I build AI voice agents connected to your calendar, CRM and business data, so callers get answers and appointments while they're still on the line.",
    },
    problem: [
      "Calls go unanswered after hours or whenever the team is busy.",
      "Staff spend the day on repeat questions, and new leads go cold.",
    ],
    build: [
      {
        title: "24/7 AI receptionist",
        body: "Answers every call, handles common questions and takes messages.",
      },
      {
        title: "Appointment booking",
        body: "Checks live availability and books straight into your calendar.",
      },
      {
        title: "Outbound follow-up",
        body: "Calls new leads quickly and qualifies them with your questions.",
      },
      {
        title: "Live data lookups",
        body: "Pulls order, listing or account details during the call.",
      },
      {
        title: "Smart call transfer",
        body: "Hands the call to the right person when a human is needed.",
      },
      {
        title: "CRM call logging",
        body: "Summary, outcome and next step written back after every call.",
      },
    ],
    steps: [
      {
        title: "Script the calls",
        body: "We define what the agent says, asks and must never do.",
      },
      {
        title: "Build and connect",
        body: "Voice, knowledge and integrations, tested on real call scenarios.",
      },
      {
        title: "Go live and tune",
        body: "Launch on your number, then refine from real call recordings.",
      },
    ],
    outcomes: [
      "Every call answered, including nights and weekends",
      "Appointments booked without staff on the phone",
      "Leads contacted while they're still interested",
      "Call summaries in your CRM, ready for follow-up",
    ],
    cta: {
      title: "Want to hear it on your use case?",
      body: "Tell me how calls reach you today. I'll suggest the simplest agent that handles them.",
    },
    meta: {
      title: "AI Voice Agents for Bookings & Lead Qualification",
      description:
        "Inbound and outbound AI voice agents built with Vapi, ElevenLabs and Synthflow, connected to your calendar and CRM. Hear real recordings.",
    },
  },
  {
    slug: "ai-chatbots",
    title: "WhatsApp & Chat AI Agents",
    shortTitle: "Chat AI Agents",
    tagline:
      "AI assistants on WhatsApp, Instagram and your website that answer from your knowledge and book leads.",
    bullets: [
      "WhatsApp, Instagram, Messenger and web chat",
      "Answers grounded in your own documents",
      "Lead qualification and human hand-off",
    ],
    eyebrow: "WhatsApp · Instagram · Website",
    hero: {
      title: "Chat agents that reply instantly, on every channel",
      intro:
        "I build AI chat assistants that answer from your own knowledge base, qualify leads, book appointments and pass the conversation to a person when needed.",
    },
    problem: [
      "Messages pile up across WhatsApp, Instagram and the website.",
      "Replies are slow or inconsistent, and conversations never reach the CRM.",
    ],
    build: [
      {
        title: "WhatsApp booking assistant",
        body: "Answers questions, offers available times and sends reminders.",
      },
      {
        title: "Omnichannel inbox agent",
        body: "One assistant across WhatsApp, Instagram, Messenger and web chat.",
      },
      {
        title: "Knowledge-base answers",
        body: "Replies grounded in your documents, prices and policies.",
      },
      {
        title: "Lead qualification",
        body: "Asks the right questions and tags hot leads in your CRM.",
      },
      {
        title: "Human hand-off",
        body: "Escalates to your team with the full conversation attached.",
      },
    ],
    steps: [
      {
        title: "Collect the knowledge",
        body: "FAQs, services, prices and policies the agent is allowed to use.",
      },
      {
        title: "Build and connect",
        body: "Channels, CRM and booking wired up and tested with real questions.",
      },
      {
        title: "Launch and improve",
        body: "Go live, review conversations and refine the answers.",
      },
    ],
    outcomes: [
      "Instant replies, any time of day",
      "Consistent answers that match your policies",
      "Qualified conversations synced to your CRM",
      "Your team steps in only when it matters",
    ],
    cta: {
      title: "Answering the same messages all day?",
      body: "Send me the questions you get most. I'll outline an agent that handles them.",
    },
    meta: {
      title: "WhatsApp & AI Chat Agents",
      description:
        "AI chat agents for WhatsApp, Instagram, Messenger and websites, grounded in your knowledge base, with lead qualification, booking and human hand-off.",
    },
  },
  {
    slug: "custom-software",
    title: "Custom Software, ERP/POS & Web Platforms",
    shortTitle: "Custom Software",
    tagline:
      "Custom .NET applications, ERP and POS systems and web platforms when off-the-shelf tools don't fit.",
    bullets: [
      "ERP and POS with e-invoicing",
      "Secure web APIs and integrations",
      "Web and mobile platforms",
    ],
    eyebrow: "ASP.NET · SQL Server · React",
    hero: {
      title: "Custom software when automation isn't enough",
      intro:
        "Before automation, I spent years building business software in .NET: ERP and POS systems, APIs, e-commerce and mobile apps. I build the custom backend a project needs.",
    },
    problem: [
      "Your process doesn't fit any off-the-shelf tool you've tried.",
      "An integration needs a real backend, or invoicing must meet e-invoicing rules.",
    ],
    build: [
      {
        title: "ERP modules",
        body: "Inventory, accounts, sales and reporting built around your process.",
      },
      {
        title: "POS with e-invoicing",
        body: "Point-of-sale systems that meet ZATCA and FBR e-invoicing requirements.",
      },
      {
        title: "Secure web APIs",
        body: "ASP.NET APIs with authentication, logging and documentation.",
      },
      {
        title: "E-commerce backends",
        body: "Catalogue, checkout, payments and shipping integrations.",
      },
      {
        title: "Web & mobile apps",
        body: "React and React Native front ends on a reliable .NET backend.",
      },
    ],
    steps: [
      {
        title: "Scope the system",
        body: "Requirements, data model and a phased plan with clear milestones.",
      },
      {
        title: "Build in phases",
        body: "Working releases you can test early, not one big reveal.",
      },
      {
        title: "Deploy and support",
        body: "Deployment, documentation and handover to your team.",
      },
    ],
    outcomes: [
      "Software shaped around your process, not the other way round",
      "Integrations that automation tools can't handle alone",
      "Compliant invoicing where your market requires it",
      "Clean code and documentation that you own",
    ],
    cta: {
      title: "Need something built from scratch?",
      body: "Describe the process and the systems involved. I'll suggest a scope and approach.",
    },
    meta: {
      title: "Custom ERP, POS & .NET Software Development",
      description:
        "Custom .NET software: ERP modules, POS with ZATCA and FBR e-invoicing, secure APIs, e-commerce backends, and web and mobile platforms.",
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/* ------------------------------------------------------------------------------------------
   n8n vs Zapier vs Make — shown on the Business Automation page (full table) and the home
   page (teaser). Pricing models as published by each platform; plans change, so the page
   says pricing is confirmed during scoping. Keep every cell under 12 words.
   ------------------------------------------------------------------------------------------ */

export const automationPositioning =
  "I implement on all three and recommend the right one for your budget, team and volume.";

export type AutomationPlatformId = "zapier" | "make" | "n8n";

export const comparisonPlatforms: { id: AutomationPlatformId; name: string; summary: string }[] = [
  { id: "zapier", name: "Zapier", summary: "Fastest to set up for simple automations." },
  { id: "make", name: "Make", summary: "Visual and affordable for complex logic." },
  { id: "n8n", name: "n8n", summary: "Most flexible for AI, scale and data control." },
];

export const comparisonRows: { label: string; cells: Record<AutomationPlatformId, string> }[] = [
  {
    label: "Best for",
    cells: {
      zapier: "Quick, simple app-to-app automations",
      make: "Complex visual workflows at a fair price",
      n8n: "Advanced, AI-heavy, high-volume or data-sensitive work",
    },
  },
  {
    label: "Pricing model",
    cells: {
      zapier: "Per task: every action step counts",
      make: "Per operation: every module run counts",
      n8n: "Per workflow run on Cloud; steps don't add cost",
    },
  },
  {
    label: "Cost as volume grows",
    cells: {
      zapier: "Rises fastest with long, multi-step workflows",
      make: "Moderate; grows with operations used",
      n8n: "Lowest at scale; self-hosted has no per-run fee",
    },
  },
  {
    label: "Hosting & data control",
    cells: {
      zapier: "Cloud only",
      make: "Cloud only",
      n8n: "Cloud, or self-hosted on your own server",
    },
  },
  {
    label: "AI & custom code",
    cells: {
      zapier: "AI steps plus JavaScript or Python code steps",
      make: "AI modules and flexible data functions",
      n8n: "AI agent nodes plus full JavaScript and Python",
    },
  },
  {
    label: "App integrations",
    cells: {
      zapier: "Largest ready-made app library",
      make: "Large library plus flexible HTTP requests",
      n8n: "Fewer ready-made apps; connects to any API",
    },
  },
  {
    label: "Learning curve",
    cells: {
      zapier: "Easiest to start",
      make: "Moderate: visual but detailed",
      n8n: "Steepest, and the most flexible",
    },
  },
  {
    label: "When I recommend it",
    cells: {
      zapier: "Small teams that need quick wins",
      make: "Growing teams with complex logic and tight budgets",
      n8n: "AI agents, high volume or strict data requirements",
    },
  },
];
