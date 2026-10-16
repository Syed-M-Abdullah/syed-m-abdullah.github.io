import { site } from "@/data/site";

type SeoInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/services/voice-ai". */
  path: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
};

/**
 * GitHub Pages serves each exported route from <path>/index.html and redirects the
 * slash-less form, so the trailing-slash URL is the canonical one.
 */
export function canonicalUrl(path: string) {
  const clean = path.replace(/\/+$/, "");
  return clean ? `${site.url}${clean}/` : `${site.url}/`;
}

export function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${site.url}${path}`;
}

export function seo({
  title,
  description,
  path,
  image = "/og-image.jpg",
  imageAlt = `${site.name} — ${site.role}`,
  imageWidth = image === "/og-image.jpg" ? 1200 : undefined,
  imageHeight = image === "/og-image.jpg" ? 630 : undefined,
  type = "website",
  noindex,
}: SeoInput) {
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;
  const url = canonicalUrl(path);
  const img = absoluteUrl(image);
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:site_name", content: site.name },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:image", content: img },
      ...(imageWidth && imageHeight
        ? [
            { property: "og:image:width", content: String(imageWidth) },
            { property: "og:image:height", content: String(imageHeight) },
          ]
        : []),
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
      { name: "robots", content: noindex ? "noindex, follow" : "index, follow" },
    ],
    links: noindex ? [] : [{ rel: "canonical", href: url }],
  };
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.legalName,
  url: `${site.url}/`,
  image: `${site.url}/og-image.jpg`,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressCountry: "PK",
  },
  sameAs: [site.linkedin, site.fiverr].filter(Boolean),
  knowsAbout: [
    "GoHighLevel",
    "n8n",
    "Make.com",
    "Zapier",
    "Workflow automation",
    "API integration",
    "AI voice agents",
    "Chatbots",
    "ASP.NET",
    "SQL Server",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: `${site.url}/`,
};

/** JSON-LD as a head script entry (rendered by <Scripts />). */
export const jsonLd = (data: object) => ({
  type: "application/ld+json",
  // Escape < so the JSON can never close the surrounding script tag.
  children: JSON.stringify(data).replace(/</g, "\\u003c"),
});
