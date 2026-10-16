// Keep this file free of value imports: scripts/export-static.mjs loads it with Node's
// TypeScript type-stripping to build the static route list and sitemap.

export type ServiceSlug =
  "gohighlevel-automation" | "workflow-automation" | "voice-ai" | "ai-chatbots" | "custom-software";

export type ServiceDiagram =
  | { kind: "flow"; title: string; steps: { label: string; detail: string }[] }
  | {
      kind: "hub";
      title: string;
      inputs: string[];
      hub: { label: string; detail: string };
      outputs: string[];
    }
  | { kind: "layers"; title: string; layers: { label: string; items: string[] }[] };

export type Service = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  /** Primary agency services are listed first; supporting capabilities after. */
  tier: "primary" | "supporting";
  eyebrow: string;
  tagline: string;
  problem: string;
  outcome: string;
  tools: string[];
  hero: { title: string; intro: string; audience: string[] };
  whatItDoes: string;
  whenToUse: string[];
  useCases: { title: string; body: string }[];
  deliverables: string[];
  diagram: ServiceDiagram;
  integrations: { group: string; items: string[] }[];
  approach: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  cta: { title: string; body: string };
  meta: { title: string; description: string };
};

export const services: Service[] = [
  // Order = display order everywhere (home, nav, footer, contact form). AI voice leads.
  {
    slug: "voice-ai",
    title: "AI Voice Agents",
    shortTitle: "Voice AI",
    tier: "primary",
    eyebrow: "For businesses that can't answer every call",
    tagline: "Inbound and outbound voice agents connected to your calendar and CRM.",
    problem:
      "Missed calls after hours, staff tied up with repetitive questions, and leads that go cold before anyone calls back.",
    outcome:
      "A voice agent that answers, qualifies, books and hands off — writing each call's outcome back to your CRM.",
    tools: ["Vapi", "Synthflow", "ElevenLabs", "GoHighLevel", "n8n"],
    hero: {
      title: "Voice agents that do real work during the call",
      intro:
        "I build inbound and outbound AI voice agents with Vapi, Synthflow and ElevenLabs — connected to calendars, CRMs and live business data, so the agent can check availability, look up records and book appointments while the caller is still on the line.",
      audience: [
        "Agencies selling AI receptionists to local businesses",
        "Clinics, real-estate and service businesses with high call volume",
        "Sales teams running outbound qualification",
      ],
    },
    whatItDoes:
      "A useful voice agent is mostly integration work. The conversation design matters, but so do the lookups it makes mid-call, the data it writes afterwards and what happens when it can't help. I design the call flow, connect the tools, and set explicit rules for when to transfer to a person.",
    whenToUse: [
      "Calls go unanswered outside business hours or at peak times",
      "Most calls are bookings, FAQs or qualification questions",
      "Staff look things up in another system while on the phone",
      "You want outbound follow-up calls on new or stale leads",
      "You're an agency packaging AI receptionists for several clients",
    ],
    useCases: [
      {
        title: "24/7 receptionist",
        body: "Answers common questions, books appointments into the calendar and triggers confirmations and reminders.",
      },
      {
        title: "Live data lookups mid-call",
        body: "Queries an ERP or property database during the call and matches results to what the caller is asking for.",
      },
      {
        title: "Booking with live links",
        body: "Completes a booking and sends the caller a confirmation or live Google Maps link during the conversation.",
      },
      {
        title: "Outbound qualification",
        body: "Calls new leads, qualifies them, books appointments and hands off to CRM follow-up.",
      },
      {
        title: "Routing to the decision-maker",
        body: "Identifies who the caller is, connects the person who can decide, and creates the CRM opportunity.",
      },
      {
        title: "Agent templates for agencies",
        body: "Industry-specific agents and an embeddable call widget for agencies serving several verticals.",
      },
    ],
    deliverables: [
      "Call flow and script design, including fallback paths",
      "Agent configured in Vapi, Synthflow or ElevenLabs",
      "Calendar, CRM and data integrations",
      "Human transfer and escalation rules",
      "Call outcome logging to your CRM or a sheet",
      "Test call scenarios and a handover walkthrough",
    ],
    diagram: {
      kind: "flow",
      title: "Anatomy of an inbound call",
      steps: [
        { label: "Answer", detail: "Greets the caller and identifies what they need" },
        { label: "Look up", detail: "Checks calendar, CRM or business data mid-call" },
        { label: "Act", detail: "Books, reschedules or answers from the knowledge base" },
        { label: "Escalate", detail: "Transfers to a person when the rules say so" },
        { label: "Log", detail: "Writes the outcome and next step to the CRM" },
        { label: "Follow up", detail: "Triggers SMS / email confirmations or reminders" },
      ],
    },
    integrations: [
      { group: "Voice platforms", items: ["Vapi", "Synthflow", "ElevenLabs", "Custom LLM flows"] },
      {
        group: "CRM & scheduling",
        items: ["GoHighLevel", "Google Calendar", "Zoho CRM", "Follow Up Boss"],
      },
      {
        group: "Data & logic",
        items: ["n8n", "Webhooks", "REST APIs", "Google Maps API", "Firebase / GCP"],
      },
    ],
    approach: [
      {
        title: "Script the edge cases",
        body: "Unclear requests, wrong numbers, frustrated callers and out-of-scope questions get a defined path rather than improvisation.",
      },
      {
        title: "Test calls before go-live",
        body: "We run realistic call scenarios together and adjust prompts, voice and timing before real customers hear it.",
      },
      {
        title: "Explicit escalation",
        body: "You decide when the agent should transfer or take a message, and those rules are written into the configuration.",
      },
      {
        title: "Outcomes logged from day one",
        body: "Every call's outcome is recorded, so you can see what the agent handles and where it hands off.",
      },
    ],
    faqs: [
      {
        q: "Which voice platform do you use?",
        a: "Mainly Vapi, Synthflow and ElevenLabs. The right choice depends on the integrations you need, voice quality, latency and per-minute cost — I'll recommend one after discovery.",
      },
      {
        q: "Will callers know they're speaking to an AI?",
        a: "That's your decision, and disclosure rules vary by country and industry. Many businesses disclose it up front; I'll build whichever approach you choose and recommend you confirm local requirements.",
      },
      {
        q: "What happens when the agent can't help?",
        a: "It follows the escalation rules we define — transfer to a person, take a message or book a callback — and logs what happened.",
      },
      {
        q: "Can the agent use our existing phone number?",
        a: "Usually, through call forwarding or by connecting the number to the voice platform. The exact setup depends on your telephony provider.",
      },
      {
        q: "Do you build agents for agencies to resell?",
        a: "Yes. I can build and maintain agents for your clients under your agency's brand.",
      },
    ],
    cta: {
      title: "Thinking about an AI receptionist or outbound agent?",
      body: "Tell me what callers usually need and which systems the agent should use. I'll outline the call flow.",
    },
    meta: {
      title: "AI Voice Agents (Vapi, Synthflow, ElevenLabs)",
      description:
        "Inbound and outbound AI voice agents that book appointments, look up live data mid-call and log outcomes to your CRM — built with Vapi, Synthflow and ElevenLabs.",
    },
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation — n8n, Make.com & Zapier",
    shortTitle: "n8n · Make · Zapier",
    tier: "primary",
    eyebrow: "For teams whose tools don't talk to each other",
    tagline:
      "n8n, Make.com and Zapier workflows that move data between your tools — with error handling built in.",
    problem:
      "Copy-paste between CRM, sheets, inboxes and apps — or fragile automations that fail silently.",
    outcome:
      "Production workflows with retries, deduplication and alerts, on the platform that fits your team — plus custom API integrations where no connector exists.",
    tools: ["n8n", "Make.com", "Zapier", "REST APIs", "OpenAI"],
    hero: {
      title: "Automations that keep working when the data gets messy",
      intro:
        "I build workflows in n8n, Make.com and Zapier that capture and route leads, sync CRMs, generate documents, process orders and run support, finance and operations processes end to end. The difference between a demo and a production workflow is what happens on bad input, rate limits and duplicate records — so that's where the engineering time goes.",
      audience: [
        "Agencies automating delivery across several clients",
        "Sales, support and ops teams working out of spreadsheets",
        "E-commerce, finance and service businesses with multi-step processes",
      ],
    },
    whatItDoes:
      "An automation platform sits between your systems and handles the work nobody should do by hand: receiving webhooks and form submissions, transforming data, calling APIs, applying AI where it helps, routing by rules, and writing results back where your team works. I pick the platform that suits the job — n8n for complex logic and self-hosting, Make.com for visual multi-branch scenarios, Zapier for quick, maintainable integrations your team can own — and write direct API integrations when a tool has no connector.",
    whenToUse: [
      "The same data is typed into two or more systems by hand",
      "Leads need capturing, enriching, scoring or routing before they reach the CRM",
      "Documents, invoices or purchase orders are created manually from data you already have",
      "An existing Zapier or Make scenario has grown too complex to trust",
      "Support tickets, orders or requests need routing and follow-up by rules and deadlines",
    ],
    useCases: [
      {
        title: "Lead capture, scoring & routing",
        body: "Forms, ads, Calendly, Typeform or Yelp leads enriched, scored and routed into GoHighLevel, HubSpot, Pipedrive or Zoho — duplicate-aware.",
      },
      {
        title: "Finance & document automation",
        body: "Purchase orders, invoices and bills synced between Monday.com and Xero; agreements and invoices generated from templates; Swiss QR invoices from HubSpot.",
      },
      {
        title: "Support desks with SLAs",
        body: "Tickets classified by AI, prioritised, routed to the right team, escalated in Slack and tracked against SLA deadlines.",
      },
      {
        title: "Operations control systems",
        body: "Field service dispatch, procurement approvals, inventory replenishment and shipment tracking run as connected, auditable workflows.",
      },
      {
        title: "Inbox triage with RAG drafts",
        body: "Classify incoming email, route it to the right person and draft a reply from your knowledge base for a person to approve.",
      },
      {
        title: "Content & publishing pipelines",
        body: "Branded social graphics, short-form video, SEO articles and YouTube uploads generated, checked and scheduled automatically.",
      },
    ],
    deliverables: [
      "A workflow map agreed before building",
      "Workflows with clear naming, notes and routers you can follow",
      "Error branches, retries and alerts for failed runs",
      "Matching / deduplication wherever records are created",
      "Custom API and webhook integrations where needed",
      "Handover documentation, with credentials owned by you",
    ],
    diagram: {
      kind: "hub",
      title: "How an integration workflow is structured",
      inputs: ["Webhooks & forms", "CRM events", "Email inbox", "Schedules", "Files & sheets"],
      hub: {
        label: "n8n · Make · Zapier",
        detail:
          "Validate → transform → enrich → dedupe → route, with an error branch at each external call",
      },
      outputs: [
        "CRM create / update",
        "Team notifications",
        "Documents & invoices",
        "AI drafts for review",
        "Third-party APIs",
      ],
    },
    integrations: [
      {
        group: "Automation platforms",
        items: ["n8n", "Make.com", "Zapier", "Webhooks", "REST APIs"],
      },
      {
        group: "CRM, finance & data",
        items: [
          "GoHighLevel",
          "HubSpot",
          "Pipedrive",
          "Zoho CRM",
          "Airtable",
          "SmartSuite",
          "Monday.com",
          "Xero",
          "Shopify",
          "Google Sheets",
        ],
      },
      {
        group: "AI & content",
        items: [
          "OpenAI",
          "Claude",
          "Gemini",
          "Pinecone (RAG)",
          "Apollo",
          "Apify",
          "PDFMonkey",
          "JSON2Video",
        ],
      },
      {
        group: "Messaging & support",
        items: ["Gmail", "Slack", "Twilio", "WhatsApp", "Zendesk", "Mailchimp", "DocuSign"],
      },
    ],
    approach: [
      {
        title: "Design for failure",
        body: "Every workflow has a plan for bad input, API errors and rate limits: retries where safe, error branches, and a notification when a person needs to look.",
      },
      {
        title: "Safe to re-run",
        body: "Records are matched before they're created, so re-running a workflow after a failure doesn't create duplicates.",
      },
      {
        title: "Tested with realistic data",
        body: "I test with representative samples — anonymised where needed — including missing fields, odd formats and duplicates.",
      },
      {
        title: "Errors where your team works",
        body: "Failures surface where people already look — a Slack alert or a comment on the Monday.com item — instead of hiding in the automation tool.",
      },
    ],
    faqs: [
      {
        q: "n8n, Make.com or Zapier — which should we use?",
        a: "It depends on the logic, volume and who will maintain it. Zapier is quickest for straightforward integrations your team can own, Make.com handles visual multi-branch scenarios well, and n8n suits complex logic, AI agents and self-hosting. I'll recommend one after discovery — or work in the platform you already use.",
      },
      {
        q: "Can you take over automations someone else built?",
        a: "Yes. I review and document what they do first, then recommend whether to repair, refactor or rebuild.",
      },
      {
        q: "How are API keys and credentials handled?",
        a: "Credentials live in your accounts and your automation platform's credential store, not in shared documents, and access can be revoked when the project ends.",
      },
      {
        q: "Do you work white-label for agencies?",
        a: "Yes. I can build inside your clients' tools under your agency's name, with communication handled the way you prefer.",
      },
    ],
    cta: {
      title: "Have a process that's still done by hand?",
      body: "Describe the tools involved and where the data needs to go. I'll sketch how I'd automate it.",
    },
    meta: {
      title: "Workflow Automation with n8n, Make.com & Zapier",
      description:
        "Production workflows in n8n, Make.com and Zapier — lead routing, CRM sync, finance and document automation, support desks and operations systems with retries, deduplication and alerts.",
    },
  },
  {
    slug: "ai-chatbots",
    title: "WhatsApp & Chat AI Agents",
    shortTitle: "Chat AI Agents",
    tier: "primary",
    eyebrow: "For businesses answering the same messages all day",
    tagline: "WhatsApp, Instagram, Messenger and web assistants that qualify, book and hand off.",
    problem:
      "Messages across WhatsApp, Instagram and the website get slow or inconsistent replies, and conversations never reach the CRM.",
    outcome:
      "One assistant across your channels, grounded in your own knowledge base, syncing qualified conversations to the CRM.",
    tools: ["WhatsApp API", "OpenAI", "Pinecone", "n8n", "Airtable"],
    hero: {
      title: "Chat assistants grounded in your business — not generic answers",
      intro:
        "I build conversational assistants for WhatsApp, Instagram, Facebook Messenger, Telegram, Slack, Discord and websites. They answer from your own knowledge base, qualify leads, book appointments and hand the conversation to a person when it needs one.",
      audience: [
        "Clinics and service businesses booking over WhatsApp",
        "Agencies offering chat automation to their clients",
        "Teams supporting customers across several messaging channels",
      ],
    },
    whatItDoes:
      "The language model is the easy part. The work is in grounding answers in your content, deciding what the assistant should never answer, connecting it to booking and CRM tools, and making the hand-off to a person smooth. I build the conversation logic in n8n so it stays visible and editable rather than hidden in a black box.",
    whenToUse: [
      "Most inbound messages are FAQs, booking requests or pricing questions",
      "You're active on several channels and replies are inconsistent",
      "Bookings and reminders are handled manually over WhatsApp",
      "Conversations should create or update CRM records",
      "You want answers drawn from your documents, not the open internet",
    ],
    useCases: [
      {
        title: "WhatsApp booking & reminders",
        body: "Customers book through WhatsApp, with a multi-stage reminder cadence and reschedule handling in the chat.",
      },
      {
        title: "Omnichannel assistant",
        body: "One assistant answering across WhatsApp, Instagram, Messenger, Telegram, Slack and Discord, with CRM sync.",
      },
      {
        title: "Knowledge-base answers (RAG)",
        body: "Answers retrieved from your documents through a vector store such as Pinecone, with clear limits on scope.",
      },
      {
        title: "Lead qualification",
        body: "Asks the qualifying questions, scores the lead and triggers the right CRM workflow.",
      },
      {
        title: "Human escalation",
        body: "Hands the conversation to your team when intent, sentiment or a keyword says a person should take over.",
      },
    ],
    deliverables: [
      "Conversation design: intents, guardrails and tone",
      "Knowledge-base ingestion and retrieval setup",
      "Channel connections (Meta API, Telegram, Slack and others)",
      "CRM, calendar and Airtable / Sheets integration",
      "Escalation and human hand-off rules",
      "A test conversation set and handover documentation",
    ],
    diagram: {
      kind: "hub",
      title: "One assistant, many channels",
      inputs: ["WhatsApp", "Instagram", "Messenger", "Telegram", "Website chat", "Slack / Discord"],
      hub: {
        label: "Conversation engine",
        detail: "LLM + your knowledge base (RAG), with intent detection and guardrails",
      },
      outputs: [
        "Grounded answer",
        "Book or reschedule",
        "Qualify & score lead",
        "CRM create / update",
        "Escalate to a person",
      ],
    },
    integrations: [
      {
        group: "Channels",
        items: [
          "WhatsApp (Meta API)",
          "Instagram",
          "Facebook Messenger",
          "Telegram",
          "Slack",
          "Discord",
        ],
      },
      { group: "AI & knowledge", items: ["OpenAI", "Pinecone (RAG)", "Custom LLM flows"] },
      {
        group: "Business systems",
        items: ["GoHighLevel", "Airtable", "Google Sheets", "Google Calendar", "Zoho CRM", "n8n"],
      },
    ],
    approach: [
      {
        title: "Decide what it must not say",
        body: "Out-of-scope topics, pricing rules and sensitive boundaries are written down and tested, not left to the model.",
      },
      {
        title: "Grounded answers",
        body: "Responses come from your approved content. When the knowledge base doesn't cover a question, the assistant says so or escalates.",
      },
      {
        title: "A conversation test set",
        body: "Realistic questions — including awkward ones — are used to check behaviour before launch and after every change.",
      },
      {
        title: "Visible logic",
        body: "Flows live in n8n, so your team can see and adjust the logic without rebuilding the assistant.",
      },
    ],
    faqs: [
      {
        q: "Which channels can the assistant run on?",
        a: "WhatsApp (through Meta's API), Instagram, Facebook Messenger, Telegram, Slack, Discord and website chat. Some channels need business verification on Meta's side, which I can guide you through.",
      },
      {
        q: "How do you stop it making things up?",
        a: "By grounding answers in your knowledge base, limiting scope in its instructions, and testing against a set of difficult questions. When it doesn't know, it should say so or hand off.",
      },
      {
        q: "Can it book appointments?",
        a: "Yes, when connected to your calendar or booking tool. It can also send reminders and handle reschedules.",
      },
      {
        q: "Where does customer data end up?",
        a: "In tools you own, such as your CRM or Airtable. We agree what is stored, and where, before building.",
      },
    ],
    cta: {
      title: "Want one assistant across your messaging channels?",
      body: "Tell me which channels you use and what customers usually ask. I'll suggest a sensible first scope.",
    },
    meta: {
      title: "AI Chatbots for WhatsApp, Instagram & Web",
      description:
        "AI chat assistants for WhatsApp, Instagram, Messenger and websites — grounded in your knowledge base, connected to booking and CRM, with human hand-off.",
    },
  },
  {
    slug: "gohighlevel-automation",
    title: "GoHighLevel Automation",
    shortTitle: "GoHighLevel",
    tier: "primary",
    eyebrow: "For agencies & GHL service providers",
    tagline: "CRM builds, pipelines and workflows your clients can actually run.",
    problem:
      "Sub-accounts with half-finished workflows, leads that stall between stages, and follow-up that depends on someone remembering.",
    outcome:
      "A documented GoHighLevel setup — pipelines, workflows, calendars and integrations — tested against real lead scenarios.",
    tools: ["Workflows", "Pipelines", "Payments", "Synthflow", "Zapier"],
    hero: {
      title: "GoHighLevel builds that hold up after handover",
      intro:
        "I implement and repair GoHighLevel systems for agencies and their clients: lead capture, pipelines, follow-up workflows, calendars and the integrations around them. You get a setup your team understands — not a maze of triggers nobody wants to touch.",
      audience: [
        "Marketing agencies delivering GoHighLevel to clients",
        "GHL consultants who need implementation capacity",
        "Businesses moving their sales process into GoHighLevel",
      ],
    },
    whatItDoes:
      "GoHighLevel is powerful because it combines CRM, calendars, messaging and automation in one place — and fragile for the same reason. I design the pipeline stages and workflow logic first, then build them with naming, tags and custom fields that stay consistent across sub-accounts. When native features stop short, I extend them with webhooks, n8n or direct API calls.",
    whenToUse: [
      "You're onboarding a client and want their sub-account built properly from day one",
      "Existing workflows overlap, double-send messages, or nobody is sure which one fires",
      "Leads arrive from forms, ads, calls and chat but don't land in the right pipeline stage",
      "You want voice or chat AI connected to GoHighLevel calendars and contacts",
      "Data needs to move between GoHighLevel and a tool it doesn't integrate with natively",
    ],
    useCases: [
      {
        title: "Lead capture to booked appointment",
        body: "Forms, funnels and inbound calls create or update the contact, place the opportunity in the right stage and trigger follow-up until the lead books or opts out.",
      },
      {
        title: "Lead nurturing with reply detection",
        body: "Welcome, value and offer emails and SMS on a schedule, waiting for engagement and branching the moment a lead replies.",
      },
      {
        title: "Reminders & rescheduling",
        body: "Reminder and reschedule flows tied to GoHighLevel calendars, so the team isn't chasing confirmations by hand.",
      },
      {
        title: "AI voice & chat inside GHL",
        body: "Voice agents and chatbots that read and write contacts, book into calendars and create pipeline opportunities.",
      },
      {
        title: "White-label sub-account builds",
        body: "Voice agents, appointment and post-call workflows set up per client sub-account inside an agency's white-labelled GoHighLevel.",
      },
      {
        title: "Payments & instalments",
        body: "Payment processing, receipts, instalment schedules, due-date reminders and overdue handling inside GoHighLevel.",
      },
    ],
    deliverables: [
      "Pipeline and stage design agreed before building",
      "Workflows with clear names, triggers and exit conditions",
      "Custom fields, tags and calendar configuration",
      "Integrations via webhooks, n8n or APIs where native features stop",
      "Test runs with sample contacts for each main path",
      "Handover notes: what each workflow does and how to change it safely",
    ],
    diagram: {
      kind: "flow",
      title: "Typical lead lifecycle in GoHighLevel",
      steps: [
        {
          label: "Capture",
          detail: "Form, funnel, ad, call or chat creates or updates the contact",
        },
        { label: "Qualify", detail: "Tags and custom fields set; rules or AI assess intent" },
        { label: "Pipeline", detail: "Opportunity placed in the right stage with an owner" },
        { label: "Follow up", detail: "SMS / email cadence that stops on reply or booking" },
        { label: "Book", detail: "Calendar booking, reminders and reschedule handling" },
        { label: "Report", detail: "Stage changes feed reporting and connected tools" },
      ],
    },
    integrations: [
      {
        group: "Inside GoHighLevel",
        items: [
          "Workflows",
          "Pipelines",
          "Calendars",
          "Custom fields & tags",
          "Forms & funnels",
          "Marketplace apps",
        ],
      },
      {
        group: "Automation & AI",
        items: ["n8n", "Make.com", "Zapier", "OpenAI", "Vapi", "Synthflow", "ElevenLabs"],
      },
      {
        group: "Data & messaging",
        items: ["Webhooks", "REST APIs", "Google Sheets", "Google Calendar", "WhatsApp (Meta API)"],
      },
    ],
    approach: [
      {
        title: "Map before building",
        body: "We agree the pipeline stages, lead sources and what should happen at each step before I change anything in the sub-account.",
      },
      {
        title: "Test with real scenarios",
        body: "Each main path — new lead, reply, booking, no-show, opt-out — is run with test contacts so you can watch it behave.",
      },
      {
        title: "Guardrails against double-sends",
        body: "Workflows get explicit entry and exit conditions so a contact isn't enrolled in two sequences at once.",
      },
      {
        title: "A handover your team can use",
        body: "Notes on what each workflow does, which fields it depends on, and what's safe to edit later.",
      },
    ],
    faqs: [
      {
        q: "Can you work inside my clients' sub-accounts under my agency's brand?",
        a: "Yes. White-label delivery is a common setup: I work in the sub-accounts you give me access to, and we agree up front how client communication is handled — through you, or directly if you prefer.",
      },
      {
        q: "Do you fix existing GoHighLevel setups or only build new ones?",
        a: "Both. For an existing account I start by mapping what's there — workflows, triggers, tags — so we fix the cause rather than adding another workflow on top.",
      },
      {
        q: "What access do you need?",
        a: "Usually user access to the relevant sub-account(s), plus any connected tools such as calendars, phone numbers or n8n. Credentials stay in your accounts.",
      },
      {
        q: "What if GoHighLevel can't do something natively?",
        a: "That's where webhooks, n8n or a small custom API come in. I'll tell you when a workaround inside GoHighLevel is reasonable and when the logic is better moved outside it.",
      },
      {
        q: "How is pricing worked out?",
        a: "It depends on scope. After a discovery conversation I outline what I'd build and give an estimate, so you can decide before any work starts.",
      },
    ],
    cta: {
      title: "Need a GoHighLevel build you can hand to a client?",
      body: "Tell me about the account, the lead sources and what should happen to each lead. I'll suggest a structure.",
    },
    meta: {
      title: "GoHighLevel Automation for Agencies",
      description:
        "GoHighLevel pipelines, workflows, calendars and integrations built and documented for agencies and their clients — tested against real lead scenarios.",
    },
  },
  {
    slug: "custom-software",
    title: "Custom ERP, POS & Web Platforms",
    shortTitle: "Custom Software",
    tier: "supporting",
    eyebrow: "Supporting capability · full-stack .NET",
    tagline: "ERP, POS, APIs and integrations for when off-the-shelf tools stop short.",
    problem:
      "Your process doesn't fit a SaaS tool, an integration needs a real backend, or invoicing must meet e-invoicing requirements.",
    outcome:
      "Production .NET applications and APIs — ERP / POS modules, integrations and e-invoicing — on ASP.NET and SQL Server.",
    tools: ["ASP.NET Core", "SQL Server", "Web APIs", "JWT", "Azure"],
    hero: {
      title: "Custom software for when automation tools aren't enough",
      intro:
        "Before automation, I spent years building business software in .NET — ERP and POS systems, web APIs, e-commerce and mobile apps. That background is why my automations are engineered rather than improvised, and it means I can build the custom backend a project sometimes needs.",
      audience: [
        "Agencies whose automation projects need a custom API or backend",
        "Businesses that need ERP, POS or internal tools",
        "Teams adding e-invoicing to existing systems",
      ],
    },
    whatItDoes:
      "I build and extend ASP.NET MVC and ASP.NET Core applications on SQL Server: business modules, secure web APIs, reporting, and integrations with payment, shipping and e-invoicing APIs. Projects range from a single integration service to complete ERP and POS systems.",
    whenToUse: [
      "An automation needs logic or storage that doesn't belong in a no-code tool",
      "You need a secure API for a mobile app, portal or partner integration",
      "Your ERP or POS needs new modules or integrations",
      "Invoices must be reported to a tax authority's e-invoicing system",
      "An existing .NET application needs maintenance or new features",
    ],
    useCases: [
      {
        title: "ERP modules",
        body: "Inventory, multi-warehouse, manufacturing, HR, payroll and financial statements.",
      },
      {
        title: "POS with e-invoicing",
        body: "Point-of-sale systems integrated with Saudi Arabia's ZATCA Phase 2 and Pakistan's FBR e-invoicing.",
      },
      {
        title: "Secure web APIs",
        body: "JWT-secured ASP.NET APIs for web apps, mobile apps and partner integrations.",
      },
      {
        title: "E-commerce backends",
        body: "Stripe payments and FedEx shipping behind a responsive storefront.",
      },
      {
        title: "Offline-first mobile",
        body: "Xamarin field apps that keep working without connectivity and sync when back online.",
      },
      {
        title: "CRM-connected platforms",
        body: "Platforms that sync leads from CRMs such as Follow Up Boss and automate messaging.",
      },
    ],
    deliverables: [
      "Requirements and data model agreed before development",
      "ASP.NET MVC / ASP.NET Core application or API",
      "SQL Server schema, migrations and reports",
      "Third-party and e-invoicing API integrations",
      "Testing against agreed scenarios",
      "Deployment support and technical documentation",
    ],
    diagram: {
      kind: "layers",
      title: "Typical application architecture",
      layers: [
        {
          label: "Clients",
          items: ["Web app", "Mobile app", "POS terminal", "Automation workflows"],
        },
        {
          label: "API layer",
          items: ["ASP.NET Core / Web API", "JWT authentication", "Validation & logging"],
        },
        {
          label: "Business logic",
          items: ["Inventory & orders", "Invoicing & tax rules", "Reporting"],
        },
        {
          label: "Data & integrations",
          items: ["SQL Server", "Stripe / FedEx", "FBR / ZATCA e-invoicing", "CRM & webhooks"],
        },
      ],
    },
    integrations: [
      {
        group: ".NET & data",
        items: [
          "ASP.NET MVC",
          "ASP.NET Core",
          "Web API",
          "ADO.NET",
          "SQL Server",
          "Crystal Reports",
        ],
      },
      {
        group: "Apps & platforms",
        items: ["Xamarin", "WinForms", "React", "React Native", "Azure"],
      },
      {
        group: "Integrations",
        items: ["Stripe API", "FedEx API", "FBR API", "ZATCA SDK", "JWT", "REST APIs"],
      },
    ],
    approach: [
      {
        title: "Model the data first",
        body: "Entities, relationships and reporting needs are agreed before screens are built, because they're the hardest thing to change later.",
      },
      {
        title: "Small, reviewable releases",
        body: "Work is delivered in increments you can test, rather than one large drop at the end.",
      },
      {
        title: "Specifications drive compliance work",
        body: "For e-invoicing, the tax authority's published specifications define the build, and testing uses their sandbox environments where they're available.",
      },
      {
        title: "Code another developer can pick up",
        body: "Consistent structure, meaningful naming and documentation, so you're not locked in to me.",
      },
    ],
    faqs: [
      {
        q: "Is custom software your main focus?",
        a: "My main focus today is automation for agencies, but .NET development is where I started and still practise. Many automation projects benefit from it — for example when a workflow needs its own API or database.",
      },
      {
        q: "What have you built for FBR and ZATCA?",
        a: "E-invoicing integrations inside POS software: FBR's API for a multi-location retail POS in Pakistan, and ZATCA Phase 2 invoicing with QR codes for a restaurant POS in Saudi Arabia. These are technical integrations with the authorities' systems — they don't imply any endorsement by those authorities.",
      },
      {
        q: "Can you work on an existing .NET codebase?",
        a: "Yes. I review the code and architecture first, then we agree what to change, in what order, and how it will be tested.",
      },
      {
        q: "Do you build front-ends too?",
        a: "Yes — ASP.NET MVC views, and I've worked with React and React Native front-ends on top of .NET APIs.",
      },
    ],
    cta: {
      title: "Need a backend, API or business system?",
      body: "Describe the process and the systems involved. I'll tell you honestly whether custom software is the right answer.",
    },
    meta: {
      title: "Custom ERP, POS & Web Platforms in .NET",
      description:
        "ASP.NET and SQL Server development: ERP and POS modules, secure web APIs, Stripe / FedEx integrations and FBR / ZATCA e-invoicing integrations.",
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
