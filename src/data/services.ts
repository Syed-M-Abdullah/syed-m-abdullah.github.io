// Keep this file free of value imports: scripts/export-static.mjs loads it with Node's
// TypeScript type-stripping to build the static route list and sitemap.
//
// Copy rules: speak to the buyer's problem and the result they get, in plain English. No
// invented numbers, clients or testimonials; no em dashes or exclamation marks.

export type ServiceSlug =
  | "lead-generation"
  | "website-development"
  | "ai-content-automation"
  | "gohighlevel-automation"
  | "voice-ai"
  | "ai-chatbots"
  | "workflow-automation"
  | "custom-software"
  | "mobile-app-development"
  | "website-maintenance";

/**
 * Services follow the client's journey, so people find what they need by the result they want:
 * 01 get more leads, 02 convert every enquiry, 03 automate and scale.
 */
export type ServiceGroup = "leads" | "convert" | "operate";

export const serviceGroups: Record<ServiceGroup, { n: string; title: string; blurb: string }> = {
  leads: {
    n: "01",
    title: "Get more leads",
    blurb: "Fill your pipeline and turn your website into your best salesperson.",
  },
  convert: {
    n: "02",
    title: "Convert every enquiry",
    blurb: "Answer, qualify and follow up with every lead by phone, chat and CRM.",
  },
  operate: {
    n: "03",
    title: "Automate and scale",
    blurb: "Take manual work off your team and build the software your business runs on.",
  },
};

export const groupOrder: ServiceGroup[] = ["leads", "convert", "operate"];

/** Icons are named here and drawn by the service page (this file must stay import-free). */
export type FeatureIcon =
  | "target"
  | "map-pin"
  | "inbox"
  | "badge-check"
  | "filter"
  | "pen-line"
  | "zap"
  | "calendar-check"
  | "layout-template"
  | "mouse-pointer-click"
  | "app-window"
  | "shopping-cart"
  | "gauge"
  | "plug-zap"
  | "search"
  | "book-open"
  | "user-check"
  | "image-plus"
  | "send"
  | "kanban"
  | "message-square"
  | "bot"
  | "credit-card"
  | "layers"
  | "phone-incoming"
  | "phone-outgoing"
  | "phone-forwarded"
  | "database"
  | "clipboard-list"
  | "message-circle"
  | "users"
  | "refresh-cw"
  | "split"
  | "file-text"
  | "bell-ring"
  | "layout-dashboard"
  | "receipt"
  | "server"
  | "smartphone"
  | "wifi-off"
  | "rocket"
  | "database-backup"
  | "shield-check"
  | "activity";

export type Service = {
  slug: ServiceSlug;
  group: ServiceGroup;
  /** Full name: menu, cards and the services page. */
  title: string;
  /** Short name: breadcrumbs, footer links and the contact form. */
  shortTitle: string;
  /** A few words for menus and compact lists (fits one line). */
  summary: string;
  /** One-line promise for cards. */
  tagline: string;
  /** Three short bullets for cards. */
  bullets: string[];
  /** Small label above the page title. */
  eyebrow: string;
  hero: { title: string; intro: string };
  /** The pain in two short lines (services overview cards). */
  problem: [string, string];
  /** What life looks like today, and with the system in place. */
  beforeAfter: { before: string; after: string }[];
  /** "What I build": the deliverables this service covers. */
  build: { title: string; body: string; icon: FeatureIcon }[];
  /** Who it's for: the kinds of businesses this fits best. */
  audiences: string[];
  /** "How it works": three steps, each with what the client receives. */
  steps: [Step, Step, Step];
  /** Everything included, as a checklist. */
  included: string[];
  /** Results the client can count on (overview cards). */
  outcomes: string[];
  /** Why work with me on this, specifically. */
  why: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  cta: { title: string; body: string };
  meta: { title: string; description: string };
};

type Step = { title: string; body: string; deliverable: string };

export const services: Service[] = [
  /* ============================== 01 Get more leads ============================== */
  {
    slug: "lead-generation",
    group: "leads",
    title: "Lead Generation Systems",
    shortTitle: "Lead Generation",
    summary: "Qualified B2B, local and inbound leads",
    tagline:
      "A steady flow of qualified leads from B2B lists, local search and your website, delivered to your CRM ready to call.",
    bullets: [
      "B2B and local prospect lists, verified before outreach",
      "Inbound leads from forms, ads and chat captured and scored",
      "Personalised outreach that stops the moment they reply",
    ],
    eyebrow: "Outbound · Inbound · Local",
    hero: {
      title: "Qualified leads, delivered to your CRM on autopilot",
      intro:
        "I build lead systems that find the right buyers, whether they are decision-makers on LinkedIn, local businesses on Google Maps or visitors on your website. Every lead is checked, scored and sent to your CRM with a personalised first message, so your team spends its time on conversations, not spreadsheets.",
    },
    problem: [
      "Building prospect lists by hand eats hours, and the data goes stale fast.",
      "Leads arrive from several places, and many of them never get a second follow-up.",
    ],
    beforeAfter: [
      {
        before: "Hours lost building prospect lists by hand",
        after: "Fresh, verified lists built on a schedule you choose",
      },
      {
        before: "Generic cold emails that get ignored",
        after: "Messages written from each prospect's profile",
      },
      {
        before: "Website and ad leads stuck in inboxes",
        after: "Every inbound lead in your CRM with an owner",
      },
      {
        before: "Warm leads forgotten after one follow-up",
        after: "Follow-up that continues until they reply or book",
      },
    ],
    build: [
      {
        title: "B2B prospect lists",
        body: "Decision-makers by industry, role and company size, pulled from Apollo.io and LinkedIn.",
        icon: "target",
      },
      {
        title: "Local business leads",
        body: "Businesses by category and area from Google Maps, with phone, website and reviews.",
        icon: "map-pin",
      },
      {
        title: "Inbound lead capture",
        body: "Website forms, landing pages, chat and ad lead forms flowing straight into your CRM.",
        icon: "inbox",
      },
      {
        title: "Enrichment & verification",
        body: "Company data added and every email verified before anyone is contacted.",
        icon: "badge-check",
      },
      {
        title: "Scoring & routing",
        body: "Leads ranked by fit and intent, then assigned to the right person straight away.",
        icon: "filter",
      },
      {
        title: "AI-personalised outreach",
        body: "Email and LinkedIn sequences written from each prospect's profile, paused on a reply.",
        icon: "pen-line",
      },
      {
        title: "Speed-to-lead follow-up",
        body: "New inbound leads get an SMS, email or AI call while they are still interested.",
        icon: "zap",
      },
      {
        title: "Booking hand-off",
        body: "Interested leads receive a calendar link, or a call from a voice agent.",
        icon: "calendar-check",
      },
    ],
    audiences: [
      "B2B service businesses",
      "Agencies running outbound for clients",
      "Real estate teams",
      "Local service businesses",
    ],
    steps: [
      {
        title: "Define your ideal customer",
        body: "We agree who you sell to, where they can be found and what makes a lead worth a call.",
        deliverable: "Ideal customer profile and lead sources",
      },
      {
        title: "Build and test the engine",
        body: "Sources, enrichment, scoring and outreach built in your accounts, then tested on a small batch.",
        deliverable: "A working pipeline and your first verified leads",
      },
      {
        title: "Launch and improve",
        body: "The system runs on schedule while we review replies and sharpen targeting and messaging.",
        deliverable: "A live lead flow and a simple results view",
      },
    ],
    included: [
      "Lead sources set up and scheduled",
      "Enrichment and email verification",
      "Scoring and routing rules",
      "Outreach sequences and templates",
      "CRM sync with owners and stages",
      "Documentation and a handover walkthrough",
    ],
    outcomes: [
      "One pipeline for outbound, inbound and local leads",
      "Fresh, verified lists without manual research",
      "Every new lead contacted quickly, with an owner",
      "A repeatable system you own and can scale",
    ],
    why: [
      {
        title: "Built in your accounts",
        body: "Your lists, sequences and CRM data stay yours, long after the project ends.",
      },
      {
        title: "Engineered to keep running",
        body: "Duplicate checks, error alerts and retries, so the pipeline runs without babysitting.",
      },
      {
        title: "Connected end to end",
        body: "From first touch to booked call, with voice and chat agents ready to follow up.",
      },
    ],
    faqs: [
      {
        q: "Which channels can you generate leads from?",
        a: "B2B databases such as Apollo.io, LinkedIn, Google Maps for local businesses, and your own website, ads and forms. We choose the mix based on where your buyers actually are.",
      },
      {
        q: "How do you keep outreach out of spam?",
        a: "Every address is verified before it is contacted, and outreach runs at a steady, safe volume from sending accounts set up for it. We plan this together during the build.",
      },
      {
        q: "Do I need a CRM already?",
        a: "No. I connect GoHighLevel, HubSpot, Zoho or Pipedrive if you use one, or set one up as part of the project.",
      },
      {
        q: "Who owns the data and the system?",
        a: "You do. Everything is built inside your own accounts, with documentation your team can follow.",
      },
    ],
    cta: {
      title: "Ready for a steadier lead flow?",
      body: "Tell me who your ideal customer is and where leads come from today. I'll map a lead system around them.",
    },
    meta: {
      title: "Lead Generation Systems: B2B, Local and Inbound",
      description:
        "Lead generation systems that find, verify, score and route B2B, local and inbound leads into your CRM, with AI-personalised outreach and fast follow-up.",
    },
  },
  {
    slug: "website-development",
    group: "leads",
    title: "Website Development",
    shortTitle: "Websites",
    summary: "Fast sites that turn visitors into enquiries",
    tagline:
      "Websites that win trust in seconds, load fast on any phone and turn visitors into enquiries in your CRM.",
    bullets: [
      "Business sites, landing pages and web apps",
      "Built mobile-first to load fast and rank on search",
      "Forms, booking and chat connected to your CRM",
    ],
    eyebrow: "React · WordPress · ASP.NET",
    hero: {
      title: "A website that turns visitors into customers",
      intro:
        "Most business websites look fine and do nothing. I design and build sites that explain your offer in seconds, load fast on every phone and make the next step obvious. Every form, booking and chat lands in your CRM with an instant reply, so no enquiry goes cold.",
    },
    problem: [
      "Your website looks dated, loads slowly and undersells the quality of your work.",
      "Visitors leave without enquiring, and the enquiries you do get sit in an inbox.",
    ],
    beforeAfter: [
      {
        before: "A dated site that undersells your work",
        after: "A modern site that matches the quality you deliver",
      },
      {
        before: "Slow pages that lose visitors on mobile",
        after: "Fast pages designed for phones first",
      },
      {
        before: "Visitors unsure what to do next",
        after: "One clear next step on every page",
      },
      {
        before: "Enquiries buried in an inbox",
        after: "Every enquiry in your CRM with an instant reply",
      },
    ],
    build: [
      {
        title: "Business websites",
        body: "Clear pages for your services, your proof and how to reach you, written for the customers you want.",
        icon: "layout-template",
      },
      {
        title: "Landing pages",
        body: "Focused pages for one offer or campaign, built around a single call to action.",
        icon: "mouse-pointer-click",
      },
      {
        title: "Web apps & portals",
        body: "Customer portals, dashboards and booking systems on a secure backend.",
        icon: "app-window",
      },
      {
        title: "E-commerce",
        body: "Catalogues, carts and checkout, with Stripe payments and shipping integrations.",
        icon: "shopping-cart",
      },
      {
        title: "Speed & SEO foundations",
        body: "Fast loading, clean structure, meta tags and a sitemap from the first release.",
        icon: "gauge",
      },
      {
        title: "Enquiries into your CRM",
        body: "Forms, booking and chat wired to your CRM and follow-up automations.",
        icon: "plug-zap",
      },
    ],
    audiences: [
      "Service businesses",
      "Agencies and consultants",
      "Clinics and professional practices",
      "Suppliers that need a customer portal",
    ],
    steps: [
      {
        title: "Plan the pages",
        body: "Your goals, your customers and the pages that move them to enquire.",
        deliverable: "Sitemap and a page-by-page plan",
      },
      {
        title: "Design and build",
        body: "A design you approve first, then a working site you can try on your own phone.",
        deliverable: "A tested site on a private preview link",
      },
      {
        title: "Launch and connect",
        body: "Domain, hosting, analytics and CRM connected, with a walkthrough for your team.",
        deliverable: "Your live site and a handover walkthrough",
      },
    ],
    included: [
      "Responsive design for phone, tablet and desktop",
      "On-page SEO basics and a sitemap",
      "Forms and booking connected to your CRM",
      "Analytics set up",
      "Hosting and domain in your name",
      "Handover walkthrough and documentation",
    ],
    outcomes: [
      "A site that works on every screen size",
      "Pages that load fast and are ready for search",
      "Every enquiry delivered to your CRM with an alert",
      "Code, hosting and domain in your name",
    ],
    why: [
      {
        title: "Engineer-built",
        body: "Real code where it matters, so the site stays fast and secure as it grows.",
      },
      {
        title: "Built to capture leads",
        body: "Forms, booking and chat connect to your CRM and follow-up from day one.",
      },
      {
        title: "Yours outright",
        body: "Code, hosting and domain in your name. No lock-in, no surprises.",
      },
    ],
    faqs: [
      {
        q: "WordPress or custom code?",
        a: "WordPress when you want to edit pages yourself and rely on plugins; React or ASP.NET when the site needs custom features, a portal or speed at scale. I recommend one after we talk.",
      },
      {
        q: "Can you redesign my existing site?",
        a: "Yes. I rebuild it on the same domain and plan the move carefully, so existing pages and links keep working.",
      },
      {
        q: "Can I update the content myself?",
        a: "Yes. On WordPress you edit pages directly; on custom builds I set up a simple way to change the content you update often.",
      },
      {
        q: "What happens after launch?",
        a: "I can look after updates, backups and changes through a Website Care plan, or hand everything over to your team.",
      },
    ],
    cta: {
      title: "Want a website that brings in enquiries?",
      body: "Tell me about your business and what the site needs to do. I'll suggest the pages and the right platform.",
    },
    meta: {
      title: "Website Development for Businesses and Agencies",
      description:
        "Fast, mobile-first websites, landing pages, web apps and e-commerce built with React, WordPress and ASP.NET, with every enquiry delivered to your CRM.",
    },
  },
  {
    slug: "ai-content-automation",
    group: "leads",
    title: "AI Content & Blog Automation",
    shortTitle: "AI Content & Blogs",
    summary: "Researched articles, published on schedule",
    tagline:
      "Researched, on-brand articles published to your blog on schedule, with your approval before anything goes live.",
    bullets: [
      "Topic and keyword research on autopilot",
      "Brand-voice drafts with a review step",
      "SEO, featured image and scheduled publishing",
    ],
    eyebrow: "Research · Write · Publish",
    hero: {
      title: "Expert articles on schedule, without the writing time",
      intro:
        "Your blog should bring in search traffic and build trust, but writing takes time nobody has. I build content pipelines that research topics, draft in your brand voice, wait for your approval, then handle SEO, images and publishing to WordPress.",
    },
    problem: [
      "Your blog is out of date because writing takes time nobody has.",
      "AI drafts sound generic, miss facts and still need hours of formatting.",
    ],
    beforeAfter: [
      {
        before: "A blog last updated months ago",
        after: "New posts on a steady publishing schedule",
      },
      {
        before: "Generic AI text that sounds like everyone else",
        after: "Drafts researched and written in your voice",
      },
      {
        before: "Hours lost formatting and uploading",
        after: "SEO, images and publishing handled for you",
      },
      {
        before: "Worry about what goes live",
        after: "Nothing publishes without your approval",
      },
    ],
    build: [
      {
        title: "Topic & keyword research",
        body: "Ideas and keywords pulled from search data and competitor content.",
        icon: "search",
      },
      {
        title: "Article research",
        body: "Sources gathered and summarised before a single word is drafted.",
        icon: "book-open",
      },
      {
        title: "Brand-voice drafting",
        body: "Drafts written to your tone, structure and do-and-don't rules.",
        icon: "pen-line",
      },
      {
        title: "Review checkpoint",
        body: "You approve, edit or reject each draft before anything goes live.",
        icon: "user-check",
      },
      {
        title: "SEO & featured images",
        body: "Meta tags, headings, internal links and a generated featured image.",
        icon: "image-plus",
      },
      {
        title: "Scheduled publishing",
        body: "Posts formatted and scheduled in WordPress, with categories and tags.",
        icon: "send",
      },
    ],
    audiences: [
      "Agencies producing content for clients",
      "Service businesses growing through search",
      "Legal and professional firms",
      "Brands publishing on social media",
    ],
    steps: [
      {
        title: "Set the strategy",
        body: "Topics, keywords, tone and the sources the pipeline may use.",
        deliverable: "A topic plan and voice guide",
      },
      {
        title: "Build the pipeline",
        body: "Research, drafting, review and publishing steps, tested on real posts.",
        deliverable: "A tested pipeline and sample posts",
      },
      {
        title: "Publish on schedule",
        body: "Drafts arrive for your review; approved posts go live automatically.",
        deliverable: "Posts going live after your approval",
      },
    ],
    included: [
      "Topic and keyword research workflow",
      "Brand-voice and style rules",
      "Approval step before publishing",
      "SEO fields and featured images",
      "Scheduled WordPress publishing",
      "Documentation and a handover walkthrough",
    ],
    outcomes: [
      "A consistent publishing schedule without a writing team",
      "Articles grounded in research, not generic AI text",
      "Full control: nothing publishes without your approval",
      "SEO basics handled on every post",
    ],
    why: [
      {
        title: "Research first",
        body: "Drafts start from sources and keywords, not from a blank prompt.",
      },
      {
        title: "You stay in control",
        body: "Every post waits for your approval before it publishes.",
      },
      {
        title: "Runs in your accounts",
        body: "Your WordPress, your AI keys and your content library.",
      },
    ],
    faqs: [
      {
        q: "Will the content sound like AI?",
        a: "Drafts follow your tone, structure and do-and-don't rules, and they start from research. You review every post before it goes live.",
      },
      {
        q: "Where can it publish?",
        a: "WordPress is the main destination. The same pipeline can also prepare social media posts and branded images.",
      },
      {
        q: "Is the content good for SEO?",
        a: "Every post gets keyword research, clear headings, meta tags and internal links. Rankings depend on your site and competition, so the focus is on doing the basics right every time.",
      },
      {
        q: "Can I edit drafts before they publish?",
        a: "Yes. You can edit, approve or reject each draft.",
      },
    ],
    cta: {
      title: "Want your blog publishing on schedule?",
      body: "Share your site and topics. I'll outline a pipeline from research to WordPress.",
    },
    meta: {
      title: "AI Content & Blog Automation for WordPress",
      description:
        "AI content pipelines that research topics, draft in your brand voice, wait for your approval and publish to WordPress with SEO and featured images.",
    },
  },

  /* ============================ 02 Convert every enquiry ============================ */
  {
    slug: "gohighlevel-automation",
    group: "convert",
    title: "GoHighLevel Automation & CRM",
    shortTitle: "GoHighLevel & CRM",
    summary: "Pipelines and follow-up that run themselves",
    tagline:
      "Pipelines, follow-ups and calendars in GoHighLevel, set up so every lead gets a fast reply and a clear next step.",
    bullets: [
      "Clean pipelines with owners and stages",
      "SMS, email and WhatsApp follow-up",
      "Bookings, reminders and payments automated",
    ],
    eyebrow: "For agencies & service businesses",
    hero: {
      title: "A GoHighLevel CRM that follows up for you",
      intro:
        "I set up, rebuild and repair GoHighLevel accounts so every lead gets an instant reply, a clear owner and follow-up that runs until they book. Pipelines, workflows, calendars, payments and AI agents, built cleanly and documented.",
    },
    problem: [
      "Leads sit in the CRM without a reply, or get stuck between stages.",
      "Workflows are half-finished, and follow-up depends on someone remembering.",
    ],
    beforeAfter: [
      {
        before: "Leads sitting in the CRM with no reply",
        after: "An instant SMS and email to every new lead",
      },
      {
        before: "Half-finished workflows nobody trusts",
        after: "Clean, tested workflows with clear names",
      },
      {
        before: "Missed appointments and no-shows",
        after: "Confirmations, reminders and easy rescheduling",
      },
      {
        before: "Payments chased by hand",
        after: "Payment links, instalments and receipts automated",
      },
    ],
    build: [
      {
        title: "Pipelines & stages",
        body: "Clear stages with automatic moves, owners and tasks for your team.",
        icon: "kanban",
      },
      {
        title: "Follow-up sequences",
        body: "SMS, email and WhatsApp nurtures that stop as soon as the lead replies.",
        icon: "message-square",
      },
      {
        title: "Calendars & reminders",
        body: "Booking links, confirmations, reminders and no-show recovery.",
        icon: "calendar-check",
      },
      {
        title: "AI voice & chat in GHL",
        body: "Agents that answer, qualify and book straight into your calendars.",
        icon: "bot",
      },
      {
        title: "Payments & instalments",
        body: "Payment links, instalment plans and receipts tied to each contact.",
        icon: "credit-card",
      },
      {
        title: "Snapshots for agencies",
        body: "Reusable sub-account builds you can roll out to every client.",
        icon: "layers",
      },
    ],
    audiences: [
      "Marketing agencies and resellers",
      "Clinics, salons and local services",
      "Real estate teams",
      "Businesses taking payments in instalments",
    ],
    steps: [
      {
        title: "Audit the account",
        body: "I review your pipelines, workflows and lead sources, and find the gaps.",
        deliverable: "A gap list and rebuild plan",
      },
      {
        title: "Rebuild and connect",
        body: "Stages, automations and integrations, tested on real lead journeys.",
        deliverable: "Tested workflows on real lead journeys",
      },
      {
        title: "Walk through and hand over",
        body: "A recorded walkthrough and notes on how every workflow works.",
        deliverable: "Recorded walkthrough and documentation",
      },
    ],
    included: [
      "Pipelines and stages",
      "Follow-up and nurture workflows",
      "Calendars, reminders and no-show recovery",
      "Payment and invoice automations",
      "Integrations with your forms, ads and tools",
      "Recorded walkthrough and documentation",
    ],
    outcomes: [
      "Every new lead gets a reply and an owner",
      "Follow-up runs on schedule until the lead responds",
      "Fewer missed appointments, with reminders and easy rescheduling",
      "A setup your team understands and can maintain",
    ],
    why: [
      {
        title: "Tested, not hoped",
        body: "Every workflow runs against real lead journeys before it goes live.",
      },
      {
        title: "Agency-ready",
        body: "Snapshots and white-label delivery inside your agency's accounts.",
      },
      {
        title: "Beyond GoHighLevel",
        body: "When GHL can't do it alone, I connect n8n, Make, Zapier or custom code.",
      },
    ],
    faqs: [
      {
        q: "Can you fix an account someone else set up?",
        a: "Yes. I start with an audit, keep what works and rebuild what doesn't, without losing your contacts or history.",
      },
      {
        q: "Do you work white-label for agencies?",
        a: "Yes. I build inside your agency's accounts under your brand, and we agree up front whether I speak to your client.",
      },
      {
        q: "Can you add AI voice or chat agents?",
        a: "Yes. Voice and chat agents can answer, qualify and book straight into your GoHighLevel calendars.",
      },
      {
        q: "Will my team understand the setup?",
        a: "Every workflow is named clearly and documented, and you get a recorded walkthrough.",
      },
    ],
    cta: {
      title: "Want your GoHighLevel account working for you?",
      body: "Share what's set up today and where leads get stuck. I'll suggest a clear fix plan.",
    },
    meta: {
      title: "GoHighLevel Automation & CRM Setup",
      description:
        "GoHighLevel setup, rebuilds and automation: pipelines, follow-up workflows, calendars, payments and AI agents for agencies and service businesses.",
    },
  },
  {
    slug: "voice-ai",
    group: "convert",
    title: "AI Voice Agents",
    shortTitle: "Voice AI",
    summary: "An AI receptionist that answers every call",
    tagline:
      "AI receptionists and callers that answer every call, qualify leads and book appointments, day and night.",
    bullets: [
      "Every call answered, nights and weekends included",
      "Live lookups in your CRM and calendar",
      "Outbound calls that follow up new leads",
    ],
    eyebrow: "Vapi · ElevenLabs · Synthflow",
    hero: {
      title: "An AI receptionist that answers every call",
      intro:
        "Every missed call is a customer calling someone else. I build AI voice agents that answer instantly, sound natural, check your calendar and CRM while they talk, and book the appointment before the caller hangs up. Hear real recordings below.",
    },
    problem: [
      "Calls go unanswered after hours or whenever the team is busy.",
      "Staff spend the day on repeat questions, and new leads go cold.",
    ],
    beforeAfter: [
      {
        before: "Calls missed after hours and on busy days",
        after: "Every call answered, nights and weekends included",
      },
      {
        before: "Staff tied up with the same questions",
        after: "Common questions handled by the agent",
      },
      {
        before: "New leads waiting hours for a call back",
        after: "Outbound calls to new leads within minutes",
      },
      {
        before: "Call notes lost or never written",
        after: "A summary and next step logged in your CRM",
      },
    ],
    build: [
      {
        title: "24/7 AI receptionist",
        body: "Answers every call, handles common questions and takes messages.",
        icon: "phone-incoming",
      },
      {
        title: "Appointment booking",
        body: "Checks live availability and books straight into your calendar.",
        icon: "calendar-check",
      },
      {
        title: "Outbound follow-up",
        body: "Calls new leads quickly and qualifies them with your questions.",
        icon: "phone-outgoing",
      },
      {
        title: "Live data lookups",
        body: "Pulls order, listing or account details during the call.",
        icon: "database",
      },
      {
        title: "Smart call transfer",
        body: "Hands the call to the right person when a human is needed.",
        icon: "phone-forwarded",
      },
      {
        title: "CRM call logging",
        body: "Summary, outcome and next step written back after every call.",
        icon: "clipboard-list",
      },
    ],
    audiences: [
      "Clinics and dental practices",
      "Salons and barbers",
      "Restaurants and cafes",
      "Real estate and rentals",
      "Agencies selling voice agents",
    ],
    steps: [
      {
        title: "Script the calls",
        body: "We define what the agent says, asks and must never do.",
        deliverable: "Call scripts and rules",
      },
      {
        title: "Build and connect",
        body: "Voice, knowledge and integrations, tested on real call scenarios.",
        deliverable: "A tested agent on a test number",
      },
      {
        title: "Go live and tune",
        body: "Launch on your number, then refine from real call recordings.",
        deliverable: "Live on your number, tuned from real calls",
      },
    ],
    included: [
      "Voice agent with a natural voice",
      "Calendar and CRM connections",
      "Call transfer rules",
      "Call summaries in your CRM",
      "Inbound and outbound call flows",
      "Testing on real scenarios and a handover",
    ],
    outcomes: [
      "Every call answered, including nights and weekends",
      "Appointments booked without staff on the phone",
      "Leads contacted while they're still interested",
      "Call summaries in your CRM, ready for follow-up",
    ],
    why: [
      {
        title: "Hear it before you buy",
        body: "Real recordings of agents I've built are on this page.",
      },
      {
        title: "Connected to your systems",
        body: "Live lookups and bookings, not a scripted answering machine.",
      },
      {
        title: "The right platform for you",
        body: "Vapi, Synthflow or ElevenLabs, chosen for your calls and budget.",
      },
    ],
    faqs: [
      {
        q: "Will callers know it's AI?",
        a: "The voices are natural, and you decide how the agent introduces itself. Many businesses tell callers they are speaking with an AI assistant.",
      },
      {
        q: "What happens when a caller needs a person?",
        a: "The agent transfers the call to the right person or takes a message, based on rules you set.",
      },
      {
        q: "Can it book into my calendar?",
        a: "Yes. It checks live availability in your calendar or CRM and books during the call.",
      },
      {
        q: "Which languages can it speak?",
        a: "English and the other languages your voice platform supports. One of the agents in my portfolio makes outbound calls in German.",
      },
    ],
    cta: {
      title: "Want to hear it on your use case?",
      body: "Tell me how calls reach you today. I'll suggest the simplest agent that handles them.",
    },
    meta: {
      title: "AI Voice Agents for Bookings & Lead Qualification",
      description:
        "Inbound and outbound AI voice agents built with Vapi, ElevenLabs and Synthflow that answer every call, qualify leads and book into your calendar. Hear real recordings.",
    },
  },
  {
    slug: "ai-chatbots",
    group: "convert",
    title: "WhatsApp & Chat AI Agents",
    shortTitle: "Chat AI Agents",
    summary: "Instant replies on WhatsApp, Instagram and web",
    tagline:
      "AI assistants on WhatsApp, Instagram and your website that answer from your knowledge, qualify leads and book them.",
    bullets: [
      "WhatsApp, Instagram, Messenger and web chat",
      "Answers grounded in your own documents",
      "Lead qualification, booking and human hand-off",
    ],
    eyebrow: "WhatsApp · Instagram · Website",
    hero: {
      title: "Reply to every message in seconds",
      intro:
        "Customers expect an answer now, on the channel they chose. I build AI chat agents that reply instantly on WhatsApp, Instagram, Messenger and your website, answer from your own documents, qualify the lead and book the appointment, then hand over to your team when it matters.",
    },
    problem: [
      "Messages pile up across WhatsApp, Instagram and the website.",
      "Replies are slow or inconsistent, and conversations never reach the CRM.",
    ],
    beforeAfter: [
      {
        before: "Messages waiting hours across several apps",
        after: "Instant replies on every channel",
      },
      {
        before: "Different answers from different staff",
        after: "Consistent answers from your own documents",
      },
      {
        before: "Hot leads lost in chat history",
        after: "Qualified leads tagged and synced to your CRM",
      },
      {
        before: "Staff answering the same questions all day",
        after: "Your team steps in only when it matters",
      },
    ],
    build: [
      {
        title: "WhatsApp booking assistant",
        body: "Answers questions, offers available times and sends reminders.",
        icon: "message-circle",
      },
      {
        title: "Omnichannel inbox agent",
        body: "One assistant across WhatsApp, Instagram, Messenger and web chat.",
        icon: "inbox",
      },
      {
        title: "Knowledge-base answers",
        body: "Replies grounded in your documents, prices and policies.",
        icon: "book-open",
      },
      {
        title: "Lead qualification",
        body: "Asks the right questions and tags hot leads in your CRM.",
        icon: "filter",
      },
      {
        title: "Human hand-off",
        body: "Escalates to your team with the full conversation attached.",
        icon: "users",
      },
      {
        title: "CRM sync",
        body: "Contacts, tags and conversation summaries kept in your CRM.",
        icon: "refresh-cw",
      },
    ],
    audiences: [
      "Clinics and hospitals",
      "Salons and wellness businesses",
      "E-commerce stores",
      "Agencies offering chat to clients",
    ],
    steps: [
      {
        title: "Collect the knowledge",
        body: "FAQs, services, prices and policies the agent is allowed to use.",
        deliverable: "A knowledge base the agent can use",
      },
      {
        title: "Build and connect",
        body: "Channels, CRM and booking wired up and tested with real questions.",
        deliverable: "A tested agent on your channels",
      },
      {
        title: "Launch and improve",
        body: "Go live, review real conversations and refine the answers.",
        deliverable: "A live agent, refined from real chats",
      },
    ],
    included: [
      "AI agent on your chosen channels",
      "Knowledge base from your documents",
      "Booking and qualification flows",
      "CRM sync and tagging",
      "Human hand-off rules",
      "Testing and a handover walkthrough",
    ],
    outcomes: [
      "Instant replies, any time of day",
      "Consistent answers that match your policies",
      "Qualified conversations synced to your CRM",
      "Your team steps in only when it matters",
    ],
    why: [
      {
        title: "Grounded answers",
        body: "Replies come from your documents, prices and policies, not guesses.",
      },
      {
        title: "One agent, every channel",
        body: "WhatsApp, Instagram, Messenger and web chat share one knowledge base.",
      },
      {
        title: "Your team stays in control",
        body: "Clear hand-off rules and the full conversation in front of them.",
      },
    ],
    faqs: [
      {
        q: "Will it make things up?",
        a: "It answers from the documents and rules you provide, and hands the conversation to your team when it isn't sure.",
      },
      {
        q: "Which channels can it run on?",
        a: "WhatsApp, Instagram, Messenger and your website, from one agent.",
      },
      {
        q: "Can it book appointments?",
        a: "Yes. It offers available times and books them into your calendar or CRM.",
      },
      {
        q: "Can my team take over a chat?",
        a: "Yes. Your team can step in at any point, with the full conversation in front of them.",
      },
    ],
    cta: {
      title: "Answering the same messages all day?",
      body: "Send me the questions you get most. I'll outline an agent that handles them.",
    },
    meta: {
      title: "WhatsApp & AI Chat Agents",
      description:
        "AI chat agents for WhatsApp, Instagram, Messenger and websites that answer from your knowledge base, qualify leads, book appointments and hand off to your team.",
    },
  },

  /* ============================== 03 Automate and scale ============================== */
  {
    slug: "workflow-automation",
    group: "operate",
    title: "Business Automation",
    shortTitle: "Business Automation",
    summary: "Connected apps, without the copy-paste",
    tagline:
      "Connect your apps and take the repetitive work off your team with n8n, Zapier or Make, built to keep running.",
    bullets: [
      "Lead routing, CRM sync and reporting",
      "AI steps that sort, summarise and draft",
      "Error alerts, retries and clear handover",
    ],
    eyebrow: "n8n · Zapier · Make",
    hero: {
      title: "Take the busywork off your team for good",
      intro:
        "Copying data between apps, creating invoices and sending the same updates every day costs your team hours each week. I build workflows on n8n, Zapier and Make that do it for them, with AI where it helps and alerts if anything fails. I build on all three and recommend the right one for your budget and volume.",
    },
    problem: [
      "Your team copies data between apps, inboxes and spreadsheets every day.",
      "Automations break quietly, and nobody notices until a lead or invoice is lost.",
    ],
    beforeAfter: [
      {
        before: "Data copied between apps by hand",
        after: "Apps that stay in sync on their own",
      },
      {
        before: "Invoices and documents created one by one",
        after: "Documents generated, sent and filed automatically",
      },
      {
        before: "Automations that break silently",
        after: "Alerts and retries the moment something fails",
      },
      {
        before: "Reports built manually every week",
        after: "Daily summaries delivered to Slack or email",
      },
    ],
    build: [
      {
        title: "Lead capture & routing",
        body: "Form, ad and inbox leads cleaned, de-duplicated and sent to the right person.",
        icon: "split",
      },
      {
        title: "CRM & app sync",
        body: "Contacts, deals and orders kept in step across your CRM, sheets and tools.",
        icon: "refresh-cw",
      },
      {
        title: "Documents & finance",
        body: "Invoices, agreements and reports generated, sent and filed automatically.",
        icon: "file-text",
      },
      {
        title: "AI inside your workflows",
        body: "Classify emails, summarise calls and draft replies with OpenAI or Claude.",
        icon: "bot",
      },
      {
        title: "Alerts & daily summaries",
        body: "Updates in Slack or email, so your team sees problems before customers do.",
        icon: "bell-ring",
      },
      {
        title: "Custom API integrations",
        body: "Webhooks and custom code wherever a ready-made connector doesn't exist.",
        icon: "plug-zap",
      },
    ],
    audiences: [
      "Operations teams in growing businesses",
      "Logistics and field service companies",
      "E-commerce and retail",
      "Agencies automating for clients",
    ],
    steps: [
      {
        title: "Map the process",
        body: "We walk through the manual steps and choose the right platform together.",
        deliverable: "A process map and platform recommendation",
      },
      {
        title: "Build and test",
        body: "I build the workflows and test them against real, messy data.",
        deliverable: "Workflows tested on real data",
      },
      {
        title: "Launch and hand over",
        body: "Go live with monitoring, alerts and a short guide for your team.",
        deliverable: "Live workflows, monitoring and a guide",
      },
    ],
    included: [
      "Workflow map and platform recommendation",
      "Built and tested workflows",
      "Error alerts and retries",
      "AI steps where they add value",
      "Documentation your team can follow",
      "Handover walkthrough",
    ],
    outcomes: [
      "Repetitive copy-paste work taken off your team",
      "Leads and data moving between apps without missed steps",
      "Alerts when something fails, before customers notice",
      "Documentation your team can follow and adjust",
    ],
    why: [
      {
        title: "Platform-neutral advice",
        body: "I build on n8n, Zapier and Make, so the recommendation fits your business.",
      },
      {
        title: "Built for the unhappy path",
        body: "Duplicates, missing data and API errors are handled, not ignored.",
      },
      {
        title: "Code when it's needed",
        body: "Custom APIs and webhooks wherever a ready-made connector doesn't exist.",
      },
    ],
    faqs: [
      {
        q: "n8n, Zapier or Make: which should I use?",
        a: "Zapier is the fastest to set up for simple automations. Make is visual and affordable for complex logic. n8n is the most flexible for AI, high volume and data control. I recommend one after looking at your process.",
      },
      {
        q: "What can be automated?",
        a: "Any repeated, rule-based step: moving data between apps, documents and invoices, notifications, reports, and AI steps such as sorting emails or summarising calls.",
      },
      {
        q: "What happens if a workflow fails?",
        a: "Workflows include retries and error alerts, so failures are caught and fixed instead of discovered weeks later.",
      },
      {
        q: "Can you fix automations someone else built?",
        a: "Yes. I review what exists, fix what's broken and document how it works.",
      },
    ],
    cta: {
      title: "Not sure which platform fits?",
      body: "Tell me what you want automated. I'll recommend n8n, Zapier or Make and explain why.",
    },
    meta: {
      title: "Business Automation with n8n, Zapier & Make",
      description:
        "Business process automation with n8n, Zapier and Make.com: lead routing, CRM sync, documents, AI steps and alerts, plus an honest comparison of the three platforms.",
    },
  },
  {
    slug: "custom-software",
    group: "operate",
    title: "Custom Software, ERP/POS & Web Platforms",
    shortTitle: "Custom Software",
    summary: "ERP, POS and portals built around you",
    tagline:
      "Custom .NET applications, ERP and POS systems and portals, built when off-the-shelf tools don't fit your business.",
    bullets: [
      "ERP and POS with e-invoicing",
      "Secure web APIs and integrations",
      "Admin portals and dashboards",
    ],
    eyebrow: "ASP.NET · SQL Server · React",
    hero: {
      title: "Software built around how your business works",
      intro:
        "When spreadsheets and off-the-shelf tools stop fitting, you need software shaped around your process. I build ERP modules, point-of-sale systems with e-invoicing, secure APIs and admin portals in .NET, delivered in phases you can test from early on.",
    },
    problem: [
      "Your process doesn't fit any off-the-shelf tool you've tried.",
      "An integration needs a real backend, or invoicing must meet e-invoicing rules.",
    ],
    beforeAfter: [
      {
        before: "Processes squeezed into tools that don't fit",
        after: "Software shaped around your workflow",
      },
      {
        before: "Spreadsheets as your system of record",
        after: "One secure database with roles and permissions",
      },
      {
        before: "Invoicing that misses e-invoicing rules",
        after: "POS and invoicing built for ZATCA and FBR",
      },
      {
        before: "Integrations no automation tool can handle",
        after: "Custom APIs that connect your systems",
      },
    ],
    build: [
      {
        title: "ERP modules",
        body: "Inventory, accounts, sales and reporting built around your process.",
        icon: "layout-dashboard",
      },
      {
        title: "POS with e-invoicing",
        body: "Point-of-sale systems that meet ZATCA and FBR e-invoicing requirements.",
        icon: "receipt",
      },
      {
        title: "Secure web APIs",
        body: "ASP.NET APIs with authentication, logging and documentation.",
        icon: "server",
      },
      {
        title: "Portals & dashboards",
        body: "Customer and admin portals with roles, permissions and reports.",
        icon: "app-window",
      },
      {
        title: "E-commerce backends",
        body: "Catalogue, checkout, payments and shipping integrations.",
        icon: "shopping-cart",
      },
      {
        title: "System integrations",
        body: "Connections to CRMs, payment providers, couriers and government APIs.",
        icon: "plug-zap",
      },
    ],
    audiences: [
      "Retailers and restaurants",
      "Distributors and suppliers",
      "Property and real estate organisations",
      "Growing businesses replacing spreadsheets",
    ],
    steps: [
      {
        title: "Scope the system",
        body: "Requirements, data model and a phased plan with clear milestones.",
        deliverable: "A written scope and phased plan",
      },
      {
        title: "Build in phases",
        body: "Working releases you can test early, not one big reveal.",
        deliverable: "Working releases to test at each phase",
      },
      {
        title: "Deploy and support",
        body: "Deployment, documentation and handover to your team.",
        deliverable: "A deployed system and full documentation",
      },
    ],
    included: [
      "Requirements and data model",
      "Phased releases with testing",
      "Roles, permissions and audit trails",
      "Admin dashboards and reports",
      "Deployment and documentation",
      "Source code you own",
    ],
    outcomes: [
      "Software shaped around your process, not the other way round",
      "Integrations that automation tools can't handle alone",
      "Compliant invoicing where your market requires it",
      "Clean code and documentation that you own",
    ],
    why: [
      {
        title: "Years of .NET delivery",
        body: "ERP, POS and portals built for a retail chain, a property authority and growing businesses.",
      },
      {
        title: "E-invoicing experience",
        body: "Integrations built for Saudi Arabia's ZATCA and Pakistan's FBR.",
      },
      {
        title: "Automation-ready",
        body: "Systems built to connect with your CRM and automation tools.",
      },
    ],
    faqs: [
      {
        q: "How is custom software priced?",
        a: "Every project starts with scoping. You get a written scope and estimate before any work begins, and work is delivered in phases.",
      },
      {
        q: "Can you extend our existing system?",
        a: "Yes. I can extend an existing .NET application or connect a new system to it through APIs.",
      },
      {
        q: "Who owns the code?",
        a: "You do, along with the documentation and deployment details.",
      },
      {
        q: "Do you support the system after launch?",
        a: "Yes. Support, changes and new phases can be scoped separately, so you only commit to what you need.",
      },
    ],
    cta: {
      title: "Need something built from scratch?",
      body: "Describe the process and the systems involved. I'll suggest a scope and approach.",
    },
    meta: {
      title: "Custom ERP, POS & .NET Software Development",
      description:
        "Custom .NET software: ERP modules, POS with ZATCA and FBR e-invoicing, secure APIs, admin portals and e-commerce backends, delivered in tested phases.",
    },
  },
  {
    slug: "mobile-app-development",
    group: "operate",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    summary: "iOS and Android apps from one codebase",
    tagline:
      "iOS and Android apps from one React Native codebase, connected to your backend, CRM and payments.",
    bullets: [
      "One React Native codebase for iOS and Android",
      "Offline mode, push notifications and payments",
      "Backend, admin panel and store launch included",
    ],
    eyebrow: "React Native · iOS · Android",
    hero: {
      title: "Launch on iPhone and Android with one app",
      intro:
        "One React Native codebase, two app stores. I build mobile apps for customers and field teams that feel native, keep working offline, connect to a secure backend and come with the admin panel your team needs to run them.",
    },
    problem: [
      "You need an app for customers or staff, but two separate builds cost twice as much.",
      "Field teams lose work when the signal drops, and the data never reaches the office.",
    ],
    beforeAfter: [
      {
        before: "Two separate apps, twice the cost",
        after: "One React Native codebase for iOS and Android",
      },
      {
        before: "Field teams losing work without signal",
        after: "Offline mode that syncs when they reconnect",
      },
      {
        before: "App data stuck away from the office",
        after: "Data flowing into your CRM and back office",
      },
      {
        before: "No way to manage users and content",
        after: "An admin panel to run the app day to day",
      },
    ],
    build: [
      {
        title: "Cross-platform apps",
        body: "iOS and Android from one React Native codebase, with a native look and feel.",
        icon: "smartphone",
      },
      {
        title: "Offline-first data",
        body: "Orders, forms and records saved on the device and synced when the connection returns.",
        icon: "wifi-off",
      },
      {
        title: "Secure backend & APIs",
        body: "ASP.NET or Node.js APIs with sign-in, user roles and audit logs.",
        icon: "server",
      },
      {
        title: "Admin panels",
        body: "A web dashboard to manage users, content and orders behind the app.",
        icon: "layout-dashboard",
      },
      {
        title: "Push, payments & location",
        body: "Notifications, Stripe payments, maps and camera, where the app needs them.",
        icon: "bell-ring",
      },
      {
        title: "Store launch & updates",
        body: "App Store and Google Play submission, then updates as your users ask for more.",
        icon: "rocket",
      },
    ],
    audiences: [
      "Field sales and service teams",
      "Property and real estate platforms",
      "Businesses adding an app for customers",
      "Founders launching a first version",
    ],
    steps: [
      {
        title: "Scope the first version",
        body: "Who uses the app, the screens they need and the data behind them.",
        deliverable: "Screens, user roles and a data plan",
      },
      {
        title: "Build in short sprints",
        body: "A working build on your own phone after every sprint, so you see progress early.",
        deliverable: "A working build on your phone every sprint",
      },
      {
        title: "Launch and support",
        body: "Store submission, monitoring after launch and a plan for the next release.",
        deliverable: "Live in the stores, with a release plan",
      },
    ],
    included: [
      "iOS and Android app from one codebase",
      "Backend API and database",
      "Admin panel",
      "Push notifications and payments where needed",
      "App Store and Google Play submission",
      "Source code and store accounts in your name",
    ],
    outcomes: [
      "One codebase to maintain instead of two",
      "An app that keeps working without a signal",
      "Data flowing into the systems you already use",
      "Source code and store accounts in your name",
    ],
    why: [
      {
        title: "Full-stack, not just screens",
        body: "App, API, database and admin panel from one engineer.",
      },
      {
        title: "Offline-first, done before",
        body: "I've shipped a field ordering app that keeps orders on the device and syncs when the signal returns.",
      },
      {
        title: "Connected to your systems",
        body: "CRM, payments and automations wired in from the start.",
      },
    ],
    faqs: [
      {
        q: "Why React Native?",
        a: "One codebase runs on iPhone and Android, which saves time and cost, and the result looks and feels native.",
      },
      {
        q: "Do you publish the app to the stores?",
        a: "Yes. I handle App Store and Google Play submission and the updates that follow.",
      },
      {
        q: "Can the app work offline?",
        a: "Yes. Data can be saved on the device and synced when the connection returns.",
      },
      {
        q: "Do you build the backend too?",
        a: "Yes. The API, database and admin panel are part of the build.",
      },
    ],
    cta: {
      title: "Have an app in mind?",
      body: "Describe who will use it and what it should do. I'll suggest the first version worth building.",
    },
    meta: {
      title: "React Native Mobile App Development for iOS and Android",
      description:
        "Mobile apps for iOS and Android from one React Native codebase: offline-first data, secure APIs, admin panels, push notifications, payments and store launch.",
    },
  },
  {
    slug: "website-maintenance",
    group: "operate",
    title: "Website Maintenance & Care",
    shortTitle: "Website Care",
    summary: "Updates, backups and security, every month",
    tagline:
      "Updates, backups, security and speed checks every month, so your site stays fast, safe and online.",
    bullets: [
      "Updates tested before they go live",
      "Daily off-site backups and uptime monitoring",
      "A short monthly report in plain English",
    ],
    eyebrow: "WordPress · React · ASP.NET",
    hero: {
      title: "Your website, kept fast, safe and online",
      intro:
        "A website is never finished. Plugins age, backups fail quietly and pages slow down until a customer notices. I look after your site every month: updates tested before they go live, daily backups, security and uptime monitoring, speed checks and a plain-English report. If something breaks, fixing it is my job.",
    },
    problem: [
      "Nobody updates the site, so plugins age and security holes stay open.",
      "When the site goes down or slows, you hear it from a customer first.",
    ],
    beforeAfter: [
      {
        before: "Plugins and updates months out of date",
        after: "Updates tested on a staging copy, then applied",
      },
      {
        before: "No idea whether backups even work",
        after: "Daily off-site backups with tested restores",
      },
      {
        before: "Downtime discovered by customers",
        after: "Uptime monitoring with instant alerts",
      },
      {
        before: "Small changes waiting weeks",
        after: "Edits and fixes handled on request",
      },
    ],
    build: [
      {
        title: "Updates, tested first",
        body: "Core, theme, plugin and framework updates checked on a staging copy before they go live.",
        icon: "refresh-cw",
      },
      {
        title: "Backups you can restore",
        body: "Daily off-site backups, with restores tested so they work when you need one.",
        icon: "database-backup",
      },
      {
        title: "Security monitoring",
        body: "Malware scans, firewall rules and login protection, with a fix if anything is found.",
        icon: "shield-check",
      },
      {
        title: "Uptime monitoring",
        body: "Your site checked around the clock, with an alert to me the moment it goes down.",
        icon: "activity",
      },
      {
        title: "Speed checks",
        body: "Page speed reviewed regularly, with images, caching and code tuned when it slips.",
        icon: "gauge",
      },
      {
        title: "Edits & fixes on request",
        body: "Text, image and page changes, plus bug fixes, handled by the person who knows the site.",
        icon: "pen-line",
      },
    ],
    audiences: [
      "Businesses without an in-house developer",
      "Agencies with client sites to look after",
      "WordPress sites with many plugins",
      "Custom React and .NET sites",
    ],
    steps: [
      {
        title: "Health check",
        body: "Updates, backups, security and speed reviewed, with a list of what needs attention.",
        deliverable: "A health report and fix list",
      },
      {
        title: "Fix and set up",
        body: "The backlog cleared, then backups, monitoring and alerts switched on.",
        deliverable: "Backups, monitoring and alerts live",
      },
      {
        title: "Look after it monthly",
        body: "Updates, checks and fixes every month, and a short report of what was done.",
        deliverable: "Monthly care and a plain-English report",
      },
    ],
    included: [
      "Tested core, theme and plugin updates",
      "Daily off-site backups",
      "Security scans and firewall rules",
      "Uptime monitoring and alerts",
      "Speed checks and tuning",
      "Monthly report in plain English",
    ],
    outcomes: [
      "A site that stays up, secure and current",
      "Problems caught before customers notice",
      "Backups ready if anything goes wrong",
      "One person to contact when something needs changing",
    ],
    why: [
      {
        title: "The engineer who can fix it",
        body: "Problems are solved, not just reported back to you.",
      },
      {
        title: "Staging first",
        body: "Updates are tested before they touch your live site.",
      },
      {
        title: "One point of contact",
        body: "Edits, fixes and questions go to one person who knows your site.",
      },
    ],
    faqs: [
      {
        q: "Which websites can you look after?",
        a: "WordPress, React and ASP.NET sites, whether I built them or not.",
      },
      {
        q: "What if an update breaks something?",
        a: "Updates are tested on a staging copy first. If something still breaks, fixing it is part of the service.",
      },
      {
        q: "Do you make content changes?",
        a: "Yes. Text, image and page edits are handled on request.",
      },
      {
        q: "Will I know what was done?",
        a: "Yes. You get a short monthly report of updates, backups, checks and fixes.",
      },
    ],
    cta: {
      title: "Is your website looked after?",
      body: "Send me the address. I'll check its updates, backups, security and speed, and tell you what needs attention.",
    },
    meta: {
      title: "Website Maintenance and Care Plans",
      description:
        "Website care for WordPress, React and ASP.NET sites: tested updates, daily off-site backups, security and uptime monitoring, speed checks, edits and a monthly report.",
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Services in one stage, in page order. */
export const servicesInGroup = (group: ServiceGroup) => services.filter((s) => s.group === group);

/* ------------------------------------------------------------------------------------------
   n8n vs Zapier vs Make: shown on the Business Automation page (full table) and the home
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
