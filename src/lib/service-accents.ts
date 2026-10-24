import type { ServiceSlug } from "@/data/services";

/** Icon gradients differ per service so cards are easy to tell apart. */
export const serviceAccents: Record<ServiceSlug, string> = {
  "workflow-automation": "from-[#f97362] to-[#ec4899]",
  "gohighlevel-automation": "from-[#6366f1] to-[#8b5cf6]",
  "lead-generation": "from-[#f59e0b] to-[#f97316]",
  "ai-content-automation": "from-[#a855f7] to-[#d946ef]",
  "voice-ai": "from-[#2563eb] to-[#38bdf8]",
  "ai-chatbots": "from-[#10b981] to-[#14b8a6]",
  "website-development": "from-[#06b6d4] to-[#2563eb]",
  "mobile-app-development": "from-[#8b5cf6] to-[#06b6d4]",
  "custom-software": "from-[#0ea5e9] to-[#6366f1]",
  "website-maintenance": "from-[#64748b] to-[#1e293b]",
};
