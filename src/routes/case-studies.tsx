import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { RedirectPage } from "@/components/redirect-page";
import { canonicalUrl } from "@/lib/seo";
import { site } from "@/data/site";

/** Old category filters → the tool tab that now holds that work. */
const categoryToTool: Record<string, string> = {
  voice: "voice",
  crm: "ghl",
  "erp-pos": "custom",
  web: "custom",
  chatbots: "n8n",
};

// Runs in <head> before anything renders, so an old filtered link lands on the matching tab.
const forwardScript = `(function(){var m=${JSON.stringify(categoryToTool)};var c=new URLSearchParams(location.search).get("category")||"";location.replace("/projects/"+(m[c]?"?tool="+m[c]:""))})();`;

// The projects list moved from /case-studies to /projects.
export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: `Projects | ${site.name}` },
      { name: "robots", content: "noindex" },
      // No-JavaScript fallback; the script below forwards first (keeping the old filter).
      { httpEquiv: "refresh", content: "1; url=/projects/" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/projects") }],
    scripts: [{ children: forwardScript }],
  }),
  component: MovedToProjects,
});

function MovedToProjects() {
  const navigate = useNavigate();
  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get("category") ?? "";
    const tool = categoryToTool[category];
    void navigate({ to: "/projects", search: tool ? { tool } : {}, replace: true });
  }, [navigate]);
  return (
    <RedirectPage>
      Projects have moved —{" "}
      <Link to="/projects" className="font-semibold text-eyebrow underline">
        view all projects
      </Link>
      .
    </RedirectPage>
  );
}
