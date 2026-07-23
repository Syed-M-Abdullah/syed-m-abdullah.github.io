export type Category =
  | "Voice AI"
  | "Automation"
  | "Chatbot"
  | "Omnichannel & Ads"
  | "Software";

export type CaseStudy = {
  slug: string;
  category: Category;
  title: string;
  tag: string;
  location: string;
  problem: string;
  flow: string[];
  stats: { label: string; value: string }[];
  tools: string[];
  description: string;
  screenshots?: string[];
  videoUrl?: string;
};

export const caseStudies: CaseStudy[] = [
  // ---------------- Voice AI ----------------
  {
    slug: "tristrum-sales-lettings",
    category: "Voice AI",
    title: "Tristrum Sales & Lettings",
    tag: "Real Estate",
    location: "🇬🇧 UK",
    problem:
      "Staff manually searched the ERP mid-call to find matching properties.",
    flow: ["Call In", "Query Jupix (Firebase + GCP)", "Match Listings", "Book Valuation"],
    stats: [
      { value: "24/7", label: "Live coverage" },
      { value: "0", label: "Staff required" },
      { value: "—", label: "Valuations / mo" },
    ],
    tools: ["Synthflow", "ElevenLabs", "Firebase", "GCP", "Jupix ERP"],
    description:
      "A UK real-estate firm needed a voice agent that could handle incoming valuation calls end-to-end. The agent queries their Jupix ERP live during the call, matches available listings against the caller's criteria, and books the valuation into the calendar — no human staff required.",
  },
  {
    slug: "neo-taxi",
    category: "Voice AI",
    title: "NEO Taxi",
    tag: "Transport",
    location: "🇩🇪 Germany",
    problem: "Slow manual dispatch losing bookings.",
    flow: ["Call In", "AI Books Ride", "Generate Live Maps Link", "Send to Caller"],
    stats: [
      { value: "1-call", label: "Booking" },
      { value: "Live", label: "Maps link" },
      { value: "—", label: "Faster dispatch" },
    ],
    tools: ["Synthflow", "Google Maps API", "GHL", "ElevenLabs"],
    description:
      "German taxi dispatch was losing bookings to slower manual handling. The voice agent books rides in one call and sends the caller a live Google Maps link during the conversation.",
  },
  {
    slug: "mavera-ai",
    category: "Voice AI",
    title: "Mavera.ai",
    tag: "AI Agency",
    location: "🌐 Global",
    problem:
      "Needed to scale client acquisition without hiring more SDRs.",
    flow: [
      "Scrape Leads (LinkedIn + Maps)",
      "AI Cold-Calls",
      "Books Appointment",
      "GHL Auto Follow-Up",
    ],
    stats: [
      { value: "In+Out", label: "Coverage" },
      { value: "Auto-Stop", label: "On pickup" },
      { value: "—", label: "Appts / mo" },
    ],
    tools: ["Synthflow", "GHL", "Apify", "Apollo", "n8n"],
    description:
      "AI agency needed to scale outbound without hiring. Pipeline scrapes leads from LinkedIn and Maps, cold-calls them with the AI agent, books appointments, then hands off to GHL for follow-up.",
  },
  {
    slug: "dental-clinic",
    category: "Voice AI",
    title: "Dental Clinic 24/7 Receptionist",
    tag: "Healthcare",
    location: "🦷 US",
    problem:
      "Staff overwhelmed by bookings and a high no-show rate.",
    flow: ["Call In", "AI Books Appointment", "Escalating Reminders", "Confirmed Visit"],
    stats: [
      { value: "24/7", label: "Reception" },
      { value: "3-stage", label: "Reminders" },
      { value: "—", label: "No-shows ↓" },
    ],
    tools: ["Vapi", "GHL", "n8n"],
    description:
      "A busy dental clinic was losing 30–40% of inbound calls during peak hours. The 24/7 AI receptionist books appointments, sends escalating reminders and dramatically cuts no-shows.",
  },
  {
    slug: "car-rental-fleet",
    category: "Voice AI",
    title: "Car Rental Fleet",
    tag: "Fleet Sales",
    location: "🚗 US",
    problem: "Reps wasted hours reaching drivers instead of owners.",
    flow: [
      "AI Qualifies Caller",
      "Identifies Owner",
      "Auto-Dials Owner",
      "Creates GHL Pipeline",
    ],
    stats: [
      { value: "Instant", label: "Owner hand-off" },
      { value: "Auto", label: "Pipeline entry" },
      { value: "—", label: "Rep time saved" },
    ],
    tools: ["ElevenLabs", "GHL", "n8n"],
    description:
      "Fleet sales reps were spending hours reaching drivers instead of the actual decision-makers. The AI qualifies inbound callers, identifies the real owner, dials them and drops the deal straight into the GHL pipeline.",
  },
  {
    slug: "my360agents",
    category: "Voice AI",
    title: "My360Agents.ai",
    tag: "Multi-Industry",
    location: "🌐 21 Industries",
    problem:
      "Agency needed specialized agents across many verticals plus a live demo.",
    flow: [
      "Select Industry",
      "Deploy Pre-Built Agent",
      "Embed Widget",
      "Live on Site",
    ],
    stats: [
      { value: "21+", label: "Industry agents" },
      { value: "1", label: "Inbound widget" },
      { value: "Live", label: "Client demo" },
    ],
    tools: ["Synthflow", "Vapi", "GHL", "ElevenLabs", "n8n"],
    description:
      "Full platform of pre-built voice agents for 21+ industries, packaged with an embeddable inbound-call widget and a live-on-site demo.",
  },

  // ---------------- Automation ----------------
  {
    slug: "lead-processing-engine",
    category: "Automation",
    title: "Lead Processing Engine",
    tag: "B2B Sales",
    location: "📊 Global",
    problem:
      "Days spent cleaning, verifying and personalizing 100k+ leads / month.",
    flow: [
      "Verify Emails",
      "Classify Industry",
      "AI Research",
      "Personalize",
      "Export",
    ],
    stats: [
      { value: "100k+", label: "Leads / month" },
      { value: "4", label: "Processing modes" },
      { value: "Unique", label: "Copy / lead" },
    ],
    tools: ["n8n", "MillionVerifier", "OpenAI", "Sheets"],
    description:
      "Processes 100k+ leads per month end-to-end: verifies emails, classifies industry, runs AI research and writes unique personalized copy for every lead.",
  },
  {
    slug: "gmail-triage-rag",
    category: "Automation",
    title: "Gmail Triage + RAG",
    tag: "Email Ops",
    location: "📧 Global",
    problem:
      "High-volume inbox eating hours, key messages getting missed.",
    flow: [
      "Email In",
      "Classify (7 cats)",
      "Route to Team",
      "RAG Draft",
      "Human Approves",
    ],
    stats: [
      { value: "7", label: "Auto categories" },
      { value: "RAG", label: "Pinecone drafts" },
      { value: "0", label: "Missed messages" },
    ],
    tools: ["n8n", "Gmail API", "OpenAI", "Pinecone"],
    description:
      "Auto-classifies every incoming email into 7 categories, routes it to the right team, drafts a Pinecone-backed RAG reply and waits for a one-click human approval.",
  },
  {
    slug: "b2b-outreach-pipeline",
    category: "Automation",
    title: "B2B Outreach Pipeline",
    tag: "Outreach",
    location: "🏢 Global",
    problem:
      "No outbound system, sales working from spreadsheets.",
    flow: [
      "Form",
      "LinkedIn Scrape",
      "Email Discovery",
      "AI 5-Email Sequence",
      "Zoho Sync",
    ],
    stats: [
      { value: "End-to-end", label: "Pipeline" },
      { value: "5-step", label: "AI sequence" },
      { value: "Auto", label: "CRM sync" },
    ],
    tools: ["n8n", "LinkedIn Scraper", "OpenAI", "Zoho"],
    description:
      "One form kicks off a full outbound pipeline — LinkedIn scrape, email discovery, 5-step AI sequence and Zoho sync.",
  },
  {
    slug: "linkedin-lead-enrichment",
    category: "Automation",
    title: "LinkedIn Lead Enrichment",
    tag: "LinkedIn Ops",
    location: "📋 Global",
    problem:
      "Manual copy-paste, missing emails, no tracking.",
    flow: [
      "Collect URLs",
      "SalesQL Enrich",
      "Filter Direct Emails",
      "Store in Sheets",
    ],
    stats: [
      { value: "3-stage", label: "Enrichment" },
      { value: "0", label: "Manual input" },
      { value: "Direct", label: "Emails only" },
    ],
    tools: ["n8n", "SalesQL API", "Sheets"],
    description:
      "3-stage enrichment pipeline that turns raw LinkedIn URLs into a Sheets-ready list of verified direct emails with zero manual work.",
  },
  {
    slug: "real-estate-deal-pages",
    category: "Automation",
    title: "Real Estate Deal Pages",
    tag: "Real Estate",
    location: "🏘 US",
    problem: "Manual landing pages per deal, no tracking.",
    flow: [
      "Input Deal Data",
      "Generate Deal ID",
      "Auto-Build Page",
      "Distribute to Investors",
    ],
    stats: [
      { value: "5", label: "Deal types" },
      { value: "35+", label: "Inputs automated" },
      { value: "Auto", label: "Investor blast" },
    ],
    tools: ["n8n", "Sheets", "OpenAI", "SendGrid"],
    description:
      "Turns deal data into fully-built investor landing pages and distributes them automatically to the investor list.",
  },
  {
    slug: "cancellation-recovery",
    category: "Automation",
    title: "Cancellation Recovery",
    tag: "Scheduling",
    location: "📅 Global",
    problem:
      "Cancelled slots going empty, no recovery process.",
    flow: [
      "Detect Cancellation",
      "Launch Recovery Campaign",
      "Refill From Waitlist",
      "Log",
    ],
    stats: [
      { value: "Auto", label: "Detection" },
      { value: "Waitlist", label: "Refill" },
      { value: "—", label: "Slots recovered" },
    ],
    tools: ["n8n", "SendGrid", "Gmail API"],
    description:
      "Detects cancellations the moment they happen, launches a recovery campaign and auto-refills the slot from the waitlist.",
  },
  {
    slug: "shopify-financial-automation",
    category: "Automation",
    title: "Shopify Financial Automation",
    tag: "E-Commerce",
    location: "🛒 Global",
    problem:
      "Fees, payouts and profit tracked manually across messy sheets.",
    flow: [
      "Order In",
      "Calculate Fees & Payouts",
      "Compute Net Profit",
      "File to Drive",
    ],
    stats: [
      { value: "Auto", label: "Fee calc" },
      { value: "Self-filing", label: "System" },
      { value: "Real-time", label: "Profit tracking" },
    ],
    tools: ["n8n", "Shopify API", "Drive", "JS"],
    description:
      "Ingests every Shopify order, calculates fees and payouts, computes net profit and files clean records to Drive in real time.",
  },
  {
    slug: "seo-pipeline",
    category: "Automation",
    title: "Self-Improving SEO Pipeline",
    tag: "SEO Content",
    location: "✍️ Global",
    problem:
      "Days spent revising content to hit SEO score targets.",
    flow: [
      "Keywords In",
      "Pull Guidelines",
      "AI Draft",
      "Auto-Refine Until Score ≥ 80",
    ],
    stats: [
      { value: "80+", label: "Score guaranteed" },
      { value: "0", label: "Human revisions" },
      { value: "Auto", label: "Refine loop" },
    ],
    tools: ["n8n", "NeuronWriter API", "OpenAI", "Gemini"],
    description:
      "Drafts SEO content and auto-refines it against NeuronWriter guidelines until the score clears 80 — no human revisions required.",
  },
  {
    slug: "crm-sync-dedup",
    category: "Automation",
    title: "CRM Sync & Dedup",
    tag: "CRM Ops",
    location: "🔄 Global",
    problem:
      "Duplicate entries and stale data from manual imports.",
    flow: [
      "File Upload",
      "AI Enrichment",
      "Domain-Based Dedup",
      "Create / Update CRM",
    ],
    stats: [
      { value: "Domain", label: "Level dedup" },
      { value: "Auto", label: "Enrichment" },
      { value: "0", label: "Duplicates" },
    ],
    tools: ["n8n", "OpenAI", "Zoho", "Drive"],
    description:
      "Uploaded lists get AI-enriched, deduplicated at the domain level and pushed to Zoho with zero duplicates.",
  },
  {
    slug: "universal-receptionist-builder",
    category: "Automation",
    title: "Universal Receptionist Builder",
    tag: "Universal",
    location: "🤖 Global",
    problem:
      "Hours of manual setup per client receptionist.",
    flow: [
      "Enter URL",
      "Scrape Content",
      "Auto-Build KB",
      "Deploy Live Agent",
    ],
    stats: [
      { value: "Minutes", label: "To deploy" },
      { value: "0", label: "Manual prompting" },
      { value: "1", label: "Form setup" },
    ],
    tools: ["n8n", "ElevenLabs", "GHL"],
    description:
      "Drop in a URL and the pipeline scrapes the site, builds the knowledge base and deploys a live receptionist agent in minutes.",
  },

  // ---------------- Chatbot ----------------
  {
    slug: "hospital-whatsapp-bot",
    category: "Chatbot",
    title: "Hospital WhatsApp Bot",
    tag: "Healthcare",
    location: "🏥 Global",
    problem:
      "No automated booking or reminders for imaging & lab tests.",
    flow: [
      "Book via WhatsApp",
      "Airtable Entry",
      "Reminders 48h / 12h / 3h",
      "RAG Q&A",
    ],
    stats: [
      { value: "3-stage", label: "Reminder cadence" },
      { value: "RAG", label: "Backed Q&A" },
      { value: "Auto", label: "Reschedule" },
    ],
    tools: ["n8n", "Airtable", "RAG", "Meta API"],
    description:
      "Full WhatsApp booking bot for imaging and lab tests, with a 3-stage reminder cadence and RAG-backed answers to patient questions.",
  },

  // ---------------- Omnichannel & Ads ----------------
  {
    slug: "omnichannel-bot",
    category: "Omnichannel & Ads",
    title: "Omnichannel Bot (6 Platforms)",
    tag: "Multi-Platform",
    location: "🌐 Global",
    problem:
      "Needed consistent AI across every channel with live CRM sync.",
    flow: [
      "Message In (Any Channel)",
      "LLM Responds",
      "Qualifies",
      "Escalates on Intent",
      "CRM Sync",
    ],
    stats: [
      { value: "6", label: "Platforms, 1 brain" },
      { value: "Real-time", label: "Intent detection" },
      { value: "Unified", label: "CRM sync" },
    ],
    tools: ["n8n", "OpenAI", "Meta API", "Pinecone", "GHL"],
    description:
      "Single LLM brain answering across WhatsApp, IG, Messenger, Telegram, Slack and Discord with real-time intent detection and unified CRM sync.",
  },
  {
    slug: "linkedin-outreach-bot",
    category: "Omnichannel & Ads",
    title: "LinkedIn Outreach Bot",
    tag: "Growth Ops",
    location: "📊 Global",
    problem:
      "30–40 manual connection requests / day, no scoring.",
    flow: [
      "Auto-Connect",
      "AI Scores Lead",
      "Sync to CRM",
      "Trigger Follow-Up",
    ],
    stats: [
      { value: "24/7", label: "Prospecting" },
      { value: "AI", label: "Lead scoring" },
      { value: "—", label: "Conversion lift" },
    ],
    tools: ["n8n", "LinkedIn API", "OpenAI", "Zoho"],
    description:
      "Auto-connects, scores every reply with AI, syncs the graded lead to Zoho and triggers the right follow-up sequence.",
  },
  {
    slug: "social-content-machine",
    category: "Omnichannel & Ads",
    title: "Social Content Machine",
    tag: "Content",
    location: "📲 Global",
    problem:
      "15+ hrs / week on manual content creation and posting.",
    flow: [
      "Generate Post + Caption + Hashtags",
      "Schedule",
      "Auto-Publish (FB / IG / LinkedIn)",
    ],
    stats: [
      { value: "15h → 1h", label: "Week" },
      { value: "3", label: "Platforms auto" },
      { value: "Brand", label: "Consistent" },
    ],
    tools: ["n8n", "OpenAI", "Meta API"],
    description:
      "Full content orchestration: generates posts, captions and hashtags, schedules them and auto-publishes across three platforms.",
  },
  {
    slug: "ai-ad-creative-pipeline",
    category: "Omnichannel & Ads",
    title: "AI Ad Creative Pipeline",
    tag: "Performance",
    location: "🎯 Global",
    problem:
      "High-volume creative demand across clients, tight deadlines.",
    flow: [
      "Prompt In",
      "Generate Creative",
      "Brand-Validate",
      "Auto-Schedule & Post",
    ],
    stats: [
      { value: "3", label: "Creative formats" },
      { value: "Brand", label: "Consistency check" },
      { value: "Built-in", label: "Tracking" },
    ],
    tools: ["n8n", "OpenAI / DALL·E", "Meta Ads API"],
    description:
      "Generates ad creatives in three formats, validates against brand guardrails, auto-schedules and tracks performance.",
  },

  // ---------------- Software ----------------
  {
    slug: "hisabdaar",
    category: "Software",
    title: "Hisabdaar (Flagship ERP)",
    tag: "ERP",
    location: "🇵🇰 Pakistan",
    problem:
      "Business needed one system for inventory, multi-warehouse, manufacturing, HR, sales, purchases and full financial reporting.",
    flow: [
      "Purchase / Sales Order",
      "Inventory & Barcode Update",
      "Manufacturing Tracking",
      "Financial Statements",
    ],
    stats: [
      { value: "Multi-WH", label: "Support" },
      { value: "6", label: "Financial reports" },
      { value: "—", label: "Businesses live" },
    ],
    tools: ["ASP.NET MVC", "SQL Server", "jQuery", "Bootstrap"],
    description:
      "Flagship ERP covering inventory, multi-warehouse, manufacturing, HR, payroll and 6 financial statement types — Income, Trial Balance, Cash Flow, Ledger and more.",
  },
  {
    slug: "ziafat-pos",
    category: "Software",
    title: "Ziafat Restaurant POS",
    tag: "POS",
    location: "🇸🇦 Saudi Arabia",
    problem:
      "Mandatory ZATCA Phase 2 compliance for a Makkah restaurant.",
    flow: [
      "Order Taken",
      "Table Management",
      "ZATCA QR Invoice",
      "Government Reporting",
    ],
    stats: [
      { value: "ZATCA", label: "Phase 2 certified" },
      { value: "Makkah", label: "Live deployment" },
      { value: "Real-time", label: "QR invoicing" },
    ],
    tools: ["WinForms", "ZATCA SDK", "Crystal Reports"],
    description:
      "ZATCA Phase 2 certified POS live at a Makkah restaurant — orders, table management, government-compliant QR invoicing and reporting.",
  },
  {
    slug: "ahmad-sweets-pos",
    category: "Software",
    title: "Ahmad Sweets POS",
    tag: "POS",
    location: "🇵🇰 Pakistan",
    problem:
      "Retail chain needed FBR-integrated invoicing across locations.",
    flow: [
      "Sale Made",
      "FBR API Auth",
      "VAT Auto-Calculated",
      "Invoice Generated",
    ],
    stats: [
      { value: "Live", label: "FBR integration" },
      { value: "Multi", label: "Location" },
      { value: "Full", label: "VAT automation" },
    ],
    tools: ["WinForms", "FBR API", "Crystal Reports"],
    description:
      "FBR-integrated POS deployed across multiple retail locations with fully-automated VAT calculation on every sale.",
  },
  {
    slug: "medzah-ecommerce",
    category: "Software",
    title: "Medzah E-Commerce",
    tag: "E-Commerce",
    location: "🌐 Global",
    problem:
      "Needed a full-stack store with secure APIs, payments and shipping.",
    flow: [
      "Customer Orders",
      "JWT-Secured API",
      "Stripe Payment",
      "FedEx Shipping",
    ],
    stats: [
      { value: "JWT", label: "Secured" },
      { value: "Stripe+FedEx", label: "Integrated" },
      { value: "Fully", label: "Responsive" },
    ],
    tools: ["ASP.NET MVC 5 / Core", "JWT", "Stripe"],
    description:
      "Full-stack e-commerce platform with JWT-secured APIs, Stripe payments, FedEx shipping and a fully-responsive storefront.",
  },
  {
    slug: "ruda-erp",
    category: "Software",
    title: "RUDA Real Estate ERP",
    tag: "Government",
    location: "🇵🇰 Pakistan",
    problem:
      "Authority needed balloting, payment plans, challans, waivers and investor reporting.",
    flow: [
      "Application",
      "Balloting",
      "Payment Plan",
      "Challan Issued",
      "Investor Reports",
    ],
    stats: [
      { value: "Gov", label: "Deployment" },
      { value: "React", label: "Frontend" },
      { value: "JWT", label: "Secured APIs" },
    ],
    tools: ["ASP.NET MVC", "ADO.NET", "SQL Server 2022", "React"],
    description:
      "Government-linked real estate ERP covering balloting, payment plans, challans, waivers and full investor reporting.",
  },
  {
    slug: "privont",
    category: "Software",
    title: "Privont",
    tag: "PropTech",
    location: "🏠 US",
    problem:
      "Needed CRM lead sync + investor comms + a mobile agent app.",
    flow: [
      "Lead In (Follow Up Boss)",
      "Sync to Platform",
      "Auto SMS / Email",
      "Mobile App Access",
    ],
    stats: [
      { value: "FUB", label: "API sync" },
      { value: "Auto", label: "Investor invites" },
      { value: "iOS+Android", label: "Mobile app" },
    ],
    tools: ["ASP.NET MVC", "React Native", "JWT"],
    description:
      "PropTech platform syncing leads from Follow Up Boss, automating investor comms and shipping a cross-platform mobile app for agents.",
  },
  {
    slug: "order-take-app",
    category: "Software",
    title: "Order Take App",
    tag: "Mobile",
    location: "📱 Global",
    problem:
      "Field reps losing orders due to no connectivity.",
    flow: [
      "Rep Takes Order (Offline)",
      "Stored Locally",
      "Reconnects",
      "Syncs to API",
    ],
    stats: [
      { value: "Full", label: "Offline capability" },
      { value: "Auto", label: "Sync on reconnect" },
      { value: "0", label: "Lost orders" },
    ],
    tools: ["Xamarin Forms", "ASP.NET Web API", "SQLite"],
    description:
      "Offline-first field ordering app — reps take orders with no connectivity, stored in SQLite and auto-synced when the connection returns.",
  },
];

export const categories: (Category | "All")[] = [
  "All",
  "Voice AI",
  "Automation",
  "Software",
  "Chatbot",
  "Omnichannel & Ads",
];
