// import n8n from "https://n8n.io/brandguidelines/logo-white.svg";
// import ghl from "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/knES3eSWYIsc5YSZ3YLl/media/6a3d48e8e4daecfbb47f2a0b.svg";
// import vapi from "https://vapi.ai/assets/images/vapi-logo.svg";
// import synthflow from "https://synthflow.com/assets/images/synthflow-logo.svg";
// import elevenlabs from "https://elevenlabs.io/assets/images/elevenlabs-logo.svg";
// import dotnet from "https://upload.wikimedia.org/wikipedia/commons/e/ee/.NET_Core_Logo.svg";
// import sql from "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_SQL_Server_Logo.svg";
// import openai from "https://upload.wikimedia.org/wikipedia/commons/4/4e/OpenAI_Logo.svg";
// import zapier from "https://upload.wikimedia.org/wikipedia/commons/2/2f/Zapier_logo.svg";
// import make from "https://upload.wikimedia.org/wikipedia/commons/3/3c/Make.com_logo.svg";
// import pinecone from "https://upload.wikimedia.org/wikipedia/commons/3/3e/Pinecone_Logo.svg";
// import airtable from "https://upload.wikimedia.org/wikipedia/commons/0/0e/Airtable_Logo.svg";
// import bubble from "https://upload.wikimedia.org/wikipedia/commons/3/3b/Bubble_logo.svg";
// import lovable from "https://upload.wikimedia.org/wikipedia/commons/5/5e/Lovable_logo.svg";
// import firebase from "https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg";
// import gcp from "https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Cloud_Logo.svg";
// import stripe from "https://upload.wikimedia.org/wikipedia/commons/9/9e/Stripe_Logo%2C_revised_2016.svg";
// import azure from "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure_Logo.svg";

// export interface TechItem {
//   name: string;
//   logo: string;
// }

export const process = [
  {
    n: "01",
    title: "Discovery",
    body: "Deep dive into business, bottlenecks and goals. No assumptions before the problem is precisely defined.",
  },
  {
    n: "02",
    title: "Architecture",
    body: "Full system design — data flows, integrations, edge cases — mapped before any code.",
  },
  {
    n: "03",
    title: "Build & Test",
    body: "Production-grade build with error handling, rate limits, deduplication and fallback logic.",
  },
  {
    n: "04",
    title: "Deploy & Scale",
    body: "Live deployment, team onboarding, support. Built to grow without a rebuild.",
  },
];

export const countries = [
  { flag: "🇺🇸", name: "USA", note: "AI automation & outreach" },
  { flag: "🇬🇧", name: "UK", note: "Real estate voice AI, live ERP integrations" },
  { flag: "🇩🇪", name: "Germany", note: "Taxi AI booking, live Maps mid-call" },
  { flag: "🇦🇪", name: "Dubai", note: "Automation & voice deployments" },
  { flag: "🇸🇦", name: "Saudi Arabia", note: "Makkah POS, ZATCA Phase 2" },
  { flag: "🇪🇸", name: "Spain", note: "Automation for EU clients" },
  { flag: "🇸🇬", name: "Singapore", note: "Enterprise software, APAC" },
  { flag: "🇦🇺", name: "Australia", note: "Lead gen, voice, CRM automation" },
  { flag: "🇵🇰", name: "Pakistan — Base", note: "Multan · 6+ yrs ERP/POS/AI" },
];

export const industries = [
  "Real Estate", "Dental", "Taxi & Transport", "Restaurants",
  "Healthcare", "Solar", "Law Firms", "Financial Services",
  "Car Rental & Fleet", "MedSpa & Beauty", "E-Commerce", "Fitness & Gym",
  "Tax & Accounting", "Limo Services", "Barbers & Salons", "AI Agencies",
  "Chiropractors", "Tattoo Studios", "ERP & Enterprise", "SaaS & Tech",
];

export const techStack: Record<string, string[]> = {
  "Voice AI": ["Vapi", "Synthflow", "ElevenLabs", "GoHighLevel", "GHL Marketplace", "GHL Workflows", "GHL Pipelines", "Custom LLM Flows"],
  "Automation & AI": ["n8n", "Make.com", "Zapier", "OpenAI / GPT-4o", "Pinecone", "Apify", "Apollo", "MillionVerifier", "NeuronWriter API", "SalesQL API", "RAG", "SendGrid"],
  "Bots & Messaging": ["WhatsApp (Meta API)", "Telegram", "Instagram", "Facebook Messenger", "Slack", "Discord", "LinkedIn API", "Gmail API", "Pinecone RAG"],
  "CRM & Data": ["GoHighLevel", "Zoho CRM", "Follow Up Boss", "Airtable", "Google Sheets", "Drive", "Calendar", "Shopify API", "Maps API"],
  "No-Code / Cloud": ["Bubble", "Lovable", "Firebase", "GCP", "REST APIs", "Webhooks", "DALL·E", "Meta Ads API"],
  ".NET & Enterprise": ["ASP.NET MVC", "SQL Server", "ADO.NET", "ASP.NET Core", "Web APIs", "Xamarin", "WinForms", "Azure", "Crystal Reports", "JWT", "Stripe API", "FedEx API", "FBR API", "ZATCA SDK", "Git"],
};

export const experience = [
  { role: "AI System Architect", company: "Fiverr", dates: "May 2026 – Present", active: true },
  { role: "AI Automation Engineer", company: "Self-Employed", dates: "Aug 2024 – Present", active: true },
  { role: "Senior .NET Developer", company: "Softinn Solutions", dates: "Sep 2024 – Present", active: true },
  { role: "Senior .NET Developer", company: "Ali G Essential", dates: "Jan 2022 – Sep 2024", active: false },
  { role: "Junior .NET Developer", company: "Softinn Solutions", dates: "Jun 2020 – Jan 2022", active: false },
];

export const whyMe = [
  { title: "Internationally Proven", body: "Live production systems across the US, UK, Germany, Dubai, Saudi Arabia, Spain, Singapore and Australia — real deployments, not demos." },
  { title: "End-to-End Ownership", body: "No outsourcing, no hand-offs. Architecture through deployment and team training, one point of contact." },
  { title: "Production-Grade Always", body: "Error handling, caching, rate-limit protection, deduplication and fallback logic from day one." },
  { title: "AI + Software Combined", body: "AI automation and enterprise software from one hand — AI embedded into real business systems, not bolted on." },
];
// export const toolsItems: TechItem[] = [
//   { name: "n8n", logo: n8n },
//   { name: "GoHighLevel", logo: ghl },
//   { name: "Vapi", logo: vapi },
//   { name: "Synthflow", logo: synthflow },
//   { name: "ElevenLabs", logo: elevenlabs },
//   { name: ".NET", logo: dotnet },
//   { name: "SQL Server", logo: sql },
//   { name: "OpenAI", logo: openai },
//   { name: "Zapier", logo: zapier },
//   { name: "Make", logo: make },
//   { name: "Pinecone", logo: pinecone },
//   { name: "Airtable", logo: airtable },
//   { name: "Bubble", logo: bubble },
//   { name: "Lovable", logo: lovable },
//   { name: "Firebase", logo: firebase },
//   { name: "Google Cloud", logo: gcp },
//   { name: "Stripe", logo: stripe },
//   { name: "Azure", logo: azure },
// ];
export const countryItems = [
  "🇺🇸 USA",
  "🇨🇦 Canada",
  "🇬🇧 UK",
  "🇦🇺 Australia",
  "🇩🇪 Germany",
  "🇫🇷 France",
  "🇪🇸 Spain",
  "🇳🇱 Netherlands",
  "🇸🇬 Singapore",
  "🇦🇪 UAE",
  "🇸🇦 Saudi Arabia",
  "🇶🇦 Qatar",
  "🇮🇹 Italy",
  "🇨🇭 Switzerland",
  "🇸🇪 Sweden",
  "🇳🇴 Norway",
  "🇩🇰 Denmark",
  "🇮🇪 Ireland",
  "🇧🇪 Belgium",
  "🇳🇿 New Zealand",
];
export const tickerItems = [
  "n8n", 
  "GoHighLevel", 
  "Vapi", 
  "Synthflow", 
  "ElevenLabs", 
  "ASP.NET", 
  "SQL Server", 
  "OpenAI", 
  "Zapier", 
  "Make.com", 
  "Pinecone", 
  "Airtable", 
  "Bubble", 
  "Lovable", 
  "Firebase", 
  "GCP", 
  "REST APIs", 
  "Webhooks", 
  "DALL·E", 
  "Meta Ads API", 
  "ASP.NET MVC", 
  "ADO.NET", 
  "ASP.NET Core", 
  "Xamarin", 
  "WinForms", 
  "Azure", 
  "Crystal Reports", 
  "JWT", 
  "Stripe API", 
  "FedEx API", 
  "FBR API", 
  "ZATCA SDK",
];