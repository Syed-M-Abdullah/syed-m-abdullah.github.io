import { useEffect } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { RedirectPage } from "@/components/redirect-page";
import { NotFoundPage } from "@/components/not-found";
import { projectForLegacySlug, type ProjectSummary } from "@/data/projects";
import { canonicalUrl } from "@/lib/seo";
import { site } from "@/data/site";

// Old project URLs (/case/<slug>) forward to the project's new page under /projects.
export const Route = createFileRoute("/case/$slug")({
  loader: ({ params }): { project: ProjectSummary } => {
    const project = projectForLegacySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.project.title} | ${site.name}` },
            { name: "robots", content: "noindex" },
            { httpEquiv: "refresh", content: `0; url=/projects/${loaderData.project.slug}/` },
          ],
          links: [{ rel: "canonical", href: canonicalUrl(`/projects/${loaderData.project.slug}`) }],
        }
      : { meta: [{ title: `Page not found | ${site.name}` }] },
  component: MovedProject,
  notFoundComponent: NotFoundPage,
});

function MovedProject() {
  const { project } = Route.useLoaderData();
  const navigate = useNavigate();
  useEffect(() => {
    void navigate({ to: "/projects/$slug", params: { slug: project.slug }, replace: true });
  }, [navigate, project.slug]);
  return (
    <RedirectPage>
      This project has moved —{" "}
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        className="font-semibold text-eyebrow underline"
      >
        {project.title}
      </Link>
      .
    </RedirectPage>
  );
}
