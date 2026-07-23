export type Service = {
  title: string;
  blurb: string;
  bullets: string[];
  tools: string[];
};

export const services: Service[] = [
  {
    title: "AI Voice Agents",
    blurb:
      "Enterprise-grade voice agents for inbound sales, FAQs, appointment booking, lead qualification and support. Real-time intent detection and CRM handoff.",
    bullets: [
      "Inbound & outbound agents",
      "Real-time CRM handoff",
      "Smart GHL follow-up (Day 0→3→5)",
      "Auto pipeline creation",
      "Reminder & reschedule flows",
    ],
    tools: ["Vapi", "Synthflow", "ElevenLabs", "GoHighLevel", "n8n"],
  },
  {
    title: "Omnichannel AI Chatbots",
    blurb:
      "LLM-powered bots across every major channel with full CRM integration and RAG-backed accuracy.",
    bullets: [
      "WhatsApp / Telegram / IG / Facebook",
      "Slack & Discord",
      "CRM + Sheets integration",
      "Auto-qualify & trigger workflows",
      "Human escalation on intent",
      "RAG knowledge base",
    ],
    tools: ["n8n", "OpenAI", "Meta API", "Pinecone", "GHL"],
  },
  {
    title: "AI Automation Systems",
    blurb:
      "End-to-end automation replacing manual sales, marketing and ops work.",
    bullets: [
      "Lead scraping & enrichment",
      "AI-personalized outreach at scale",
      "LinkedIn outreach engines",
      "Lead scoring & CRM sync",
      "SEO pipelines",
    ],
    tools: ["n8n", "Make.com", "OpenAI", "Zapier", "Pinecone"],
  },
  {
    title: "AI Advertisement Generation",
    blurb:
      "Automated creative pipelines: banners, social creatives, AI video ads — brand-aware, auto-posted with tracking.",
    bullets: [
      "Banner & social creatives",
      "AI video ads",
      "Brand-consistency validation",
      "Auto-schedule & publish",
      "Built-in performance tracking",
    ],
    tools: ["n8n", "OpenAI", "DALL·E", "Meta Ads API"],
  },
  {
    title: "Social Media Automation",
    blurb:
      "Full content orchestration: AI posts, captions, hashtags, auto-publish, LinkedIn outreach and content calendars.",
    bullets: [
      "AI captions + hashtags",
      "Auto-publish FB / IG / LinkedIn",
      "LinkedIn outreach engine",
      "Content calendar generation",
    ],
    tools: ["n8n", "OpenAI", "LinkedIn API", "Meta API"],
  },
  {
    title: "Enterprise Software",
    blurb:
      "Custom ERP, POS, e-commerce and mobile apps. Government compliance (FBR · ZATCA Phase 2).",
    bullets: [
      "Full ERP (inventory / HR / payroll / financials)",
      "POS with e-invoicing",
      "Web APIs & Xamarin mobile",
      "E-commerce with Stripe / FedEx / JWT",
      "Multi-warehouse support",
    ],
    tools: ["ASP.NET MVC", "SQL Server", "Azure", "Xamarin"],
  },
];
