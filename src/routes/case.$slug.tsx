import { useEffect } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ForwardPage, RedirectPage } from "@/components/redirect-page";
import { forwardHead } from "@/lib/seo";
import { NotFoundPage } from "@/components/not-found";
import { projectForLegacySlug, retiredUrls, type ProjectSummary } from "@/data/projects";

type CaseData = { kind: "project"; project: ProjectSummary } | { kind: "forward"; forward: string };

// Old project URLs (/case/<slug>) forward to the project's new page under /projects, or, for a
// project that was split up, to the list it now lives in.
export const Route = createFileRoute("/case/$slug")({
  loader: ({ params }): CaseData => {
    const forward = retiredUrls[`/case/${params.slug}`];
    if (forward) return { kind: "forward", forward };
    const project = projectForLegacySlug(params.slug);
    if (!project) throw notFound();
    return { kind: "project", project };
  },
  head: ({ loaderData }) =>
    loaderData
      ? loaderData.kind === "forward"
        ? forwardHead(loaderData.forward, "Projects")
        : forwardHead(`/projects/${loaderData.project.slug}/`, loaderData.project.title)
      : { meta: [{ title: "Page not found" }] },
  component: MovedProject,
  notFoundComponent: NotFoundPage,
});

function MovedProject() {
  const data = Route.useLoaderData();
  if (data.kind === "forward") return <ForwardPage to={data.forward} label="see the projects" />;
  return <MovedToProject project={data.project} />;
}

function MovedToProject({ project }: { project: ProjectSummary }) {
  const navigate = useNavigate();
  useEffect(() => {
    void navigate({ to: "/projects/$slug/", params: { slug: project.slug }, replace: true });
  }, [navigate, project.slug]);
  return (
    <RedirectPage>
      This project has moved:{" "}
      <Link
        to="/projects/$slug/"
        params={{ slug: project.slug }}
        className="font-semibold text-eyebrow underline"
      >
        {project.title}
      </Link>
      .
    </RedirectPage>
  );
}
