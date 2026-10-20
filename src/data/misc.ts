export type ProcessStep = {
  n: string;
  title: string;
  summary: string;
  body: string;
  youProvide: string[];
  youGet: string[];
};

export const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Discovery & requirements",
    summary: "Understand the goal, the current setup and what “done” looks like.",
    body: "We talk through the business problem, the tools you already use and the people affected. I ask about edge cases early: what happens when data is missing, a lead replies at midnight, or an API is down.",
    youProvide: [
      "A short description of the problem and the goal",
      "Which tools and accounts are involved",
      "Who makes decisions and who will use the system",
    ],
    youGet: [
      "A clear problem statement",
      "Early questions and risks, raised up front",
      "A view on whether automation, custom software or both fits",
    ],
  },
  {
    n: "02",
    title: "Architecture & plan",
    summary: "Map the data flow, integrations and failure points before building.",
    body: "I map how data moves between systems, where it can fail and how each failure is handled. You get a written scope and plan to agree on before any build starts.",
    youProvide: [
      "Feedback on the proposed flow",
      "Sample data or example records",
      "Confirmation of scope and priorities",
    ],
    youGet: [
      "A workflow / architecture map",
      "A written scope: what's in and what's out",
      "An estimate and milestones",
    ],
  },
  {
    n: "03",
    title: "Build & integration",
    summary: "Implement in small, reviewable pieces inside your accounts.",
    body: "I build in your accounts, or in a staging copy where the tools allow it, in increments you can see. Naming, notes and structure stay consistent so the system remains understandable as it grows.",
    youProvide: [
      "Access to the required accounts and tools",
      "Answers to questions as they come up",
    ],
    youGet: [
      "Working pieces to review as they're ready",
      "Progress updates at the agreed milestones",
    ],
  },
  {
    n: "04",
    title: "Testing & edge cases",
    summary: "Prove it works on realistic data, including the awkward cases.",
    body: "Each main path is tested with realistic data, then the edge cases: duplicates, missing fields, odd formats, API errors and timeouts. Error handling, retries and alerts are checked, not assumed.",
    youProvide: ["Help defining realistic test scenarios", "Time to try it yourself before launch"],
    youGet: ["The test scenarios and their results", "Fixes for anything that fails"],
  },
  {
    n: "05",
    title: "Deployment & handover",
    summary: "Go live deliberately and leave you in control.",
    body: "We agree a go-live moment, switch it on and check the first real runs. Handover covers how the system works, what to check if something stops, and how to make changes safely.",
    youProvide: ["A go-live window", "The people who will own the system day to day"],
    youGet: [
      "The live system, running in your accounts",
      "Handover documentation",
      "A walkthrough of the build",
    ],
  },
  {
    n: "06",
    title: "Support & iteration",
    summary: "Improvements once real usage shows what's next.",
    body: "Real usage usually reveals improvements. Ongoing support, changes and new phases can be scoped separately, so you only commit to what you actually need.",
    youProvide: ["Feedback from the people using the system"],
    youGet: ["A scoped proposal for follow-on work, if you want one"],
  },
];

/** Condensed version for the homepage. */
export const processOverview = [
  { n: "01", title: "Discovery", body: "Understand your goals, current setup and requirements." },
  {
    n: "02",
    title: "Architecture",
    body: "Design the data flow, integrations and failure handling.",
  },
  {
    n: "03",
    title: "Build & test",
    body: "Implement, then test against realistic data and edge cases.",
  },
  {
    n: "04",
    title: "Deploy & hand over",
    body: "Launch, check the first runs and document everything.",
  },
];

export const principles = [
  {
    title: "Written scope before work starts",
    body: "You get a clear outline of what will be built, how it will be tested and what it costs before anything begins.",
  },
  {
    title: "You own everything",
    body: "Workflows, code, sub-accounts and credentials live in your accounts. Nothing is held back.",
  },
  {
    title: "Built for the unhappy path",
    body: "Retries, duplicate checks, error branches and alerts are part of the build, not an afterthought.",
  },
  {
    title: "Tested on real scenarios",
    body: "Every main path and the awkward edge cases are run with realistic data before go-live.",
  },
  {
    title: "Documented handover",
    body: "Plain-language notes and a walkthrough, so your team or another developer can maintain it.",
  },
  {
    title: "White-label ready",
    body: "I work inside your agency's accounts and process, under your brand, with client contact handled your way.",
  },
];

/** Home page FAQ: answered only from what the site already says (no prices or timelines). */
export const homeFaqs = [
  {
    q: "Which platform should I use: n8n, Zapier or Make?",
    a: "It depends on your budget, team and volume. Zapier is the fastest to set up for simple automations. Make is visual and affordable for complex logic. n8n is the most flexible for AI, high volume and data control. I build on all three and recommend one after we look at your process.",
  },
  {
    q: "Can you work with the tools I already use?",
    a: "Yes. I build inside your own accounts, such as your CRM, GoHighLevel, Google Sheets or inbox, and connect them through their APIs. Where no ready-made connector exists, I write the webhook or custom code.",
  },
  {
    q: "How does a project work?",
    a: "Four steps: discovery, architecture, build and test, then deployment and handover. You get a written scope before any work starts, see working pieces as they are ready, and get documentation and a walkthrough at the end.",
  },
  {
    q: "Which industries have you worked with?",
    a: "Clinics, salons and barbers, restaurants and cafes, real estate, car and home rentals, logistics, auto repair, legal, e-commerce and recruitment, among others. The projects page has examples for each tool.",
  },
  {
    q: "How do I start?",
    a: "Book a 30-minute call or send a short message about the problem. I come back with questions, then a written scope and estimate. Work starts only once you have agreed to it.",
  },
];

export const collaboration = {
  inputs: [
    "A decision-maker who can confirm scope and priorities",
    "Access to the relevant accounts (CRM, n8n, voice platform, APIs)",
    "Sample data, scripts or documents the system should use",
    "Someone to test with before go-live",
  ],
  communication: [
    "Written updates at the milestones agreed in the plan",
    "Questions raised as they come up, not saved for the end",
    "Calls when a decision is easier to make live",
    "For white-label work: client contact handled the way your agency prefers",
  ],
  handover: [
    "The live system in your accounts, with credentials you control",
    "A map of the workflows or architecture",
    "Notes on what each part does and what it depends on",
    "What to check first if something stops working",
    "A walkthrough so your team can make safe changes",
  ],
};

export const careerStart = new Date("2020-06-01");
export const automationStart = new Date("2024-08-01");

export const yearsSince = (start: Date, now = new Date()) =>
  Math.floor((now.getTime() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

export const experience = [
  {
    role: "AI System Architect",
    company: "Fiverr (freelance)",
    dates: "May 2026 – Present",
    active: true,
  },
  {
    role: "AI Automation Engineer",
    company: "Self-employed",
    dates: "Aug 2024 – Present",
    active: true,
  },
  {
    role: "Senior .NET Developer",
    company: "Softinn Solutions",
    dates: "Sep 2024 – Present",
    active: true,
  },
  {
    role: "Senior .NET Developer",
    company: "Ali G Essential",
    dates: "Jan 2022 – Sep 2024",
    active: false,
  },
  {
    role: "Junior .NET Developer",
    company: "Softinn Solutions",
    dates: "Jun 2020 – Jan 2022",
    active: false,
  },
];

export const education = {
  degree: "BS Computer Science",
  school: "Virtual University of Pakistan",
  dates: "2020 – 2024",
};
