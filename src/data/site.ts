export const site = {
  name: "Abdullah Bukhari",
  /** Full legal name, used only in structured data so search engines connect both. */
  legalName: "Syed Abdullah Bukhari",
  role: "AI Automation Engineer",
  positioning:
    "AI Automation Engineer for agencies — GoHighLevel, n8n, Make.com, Zapier, Voice AI and custom .NET integrations",
  location: "Multan, Pakistan · Remote worldwide",
  locality: "Multan",
  country: "Pakistan",
  // Deployed GitHub Pages URL (user site, served from the domain root). Used for canonical/OG/sitemap.
  url: "https://syed-m-abdullah.github.io",
  emails: ["bukhariabdullah034@gmail.com", "syedabdullahbukhari321@gmail.com"],
  email: "bukhariabdullah034@gmail.com",
  phone: "+92-316-6371847",
  whatsapp: "923166371847",
  calendly: "https://calendly.com/abdullahbukhari/30min",
  /**
   * Public URL of the contact API in /server (Express + Gmail SMTP) once it's deployed, e.g.
   * "https://abdullah-contact-api.vercel.app/api/contact". During `npm run dev` the form uses
   * http://localhost:8787/api/contact instead. Not a secret — never put passwords in this file.
   */
  contactApi: "" as string,
  linkedin: "https://www.linkedin.com/in/syedabdullahbukhari",
  // Add the real Fiverr seller-profile URL here to show it in the footer/contact page.
  fiverr: "" as string,
  availableForWork: true,
  /** Named clients shown under the hero. Only list clients you're allowed to name publicly. */
  selectedClients: [
    "Mavera.ai",
    "My360Agents",
    "Tristrum Sales & Lettings",
    "NEO Taxi",
    "Medzah",
    "Privont",
    "Ziafat",
    "Ahmad Sweets",
  ],
};

/**
 * Headline numbers. Anything with `verified: false` is hidden from the site.
 * Flip to `true` only once you can stand behind the number if a client asks.
 */
export type Claim = { value: string; label: string; detail?: string; verified: boolean };

// Confirmed by Abdullah as his real numbers (Oct 2026) — shown in the home page stats row.
export const headlineClaims: Claim[] = [
  { value: "130+", label: "Projects delivered", verified: true },
  { value: "25+", label: "Industries served", verified: true },
  { value: "10+", label: "Countries", verified: true },
];
