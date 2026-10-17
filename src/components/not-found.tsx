import { useEffect } from "react";
import { ArrowRight, Home, LayoutGrid, Mail } from "lucide-react";
import { site } from "@/data/site";
import { PageShell } from "./page-shell";
import { Container } from "./section";
import { bandClass } from "@/lib/band";
import { ButtonLink } from "./button-link";

/** Branded 404, also exported to 404.html for GitHub Pages. */
export function NotFoundPage() {
  useEffect(() => {
    document.title = `Page not found | ${site.name}`;
  }, []);
  return (
    <PageShell>
      <section className={`${bandClass("brand")} overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32`}>
        <div aria-hidden className="aurora" />
        <Container className="max-w-3xl text-center">
          <p className="font-mono text-sm text-eyebrow">Error 404</p>
          <h1 className="mt-4 text-4xl font-extrabold text-foreground sm:text-6xl">
            This page <span className="gradient-text">doesn't exist.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            The link may be out of date, or the page has moved. Here are the most useful places to
            go next.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <ButtonLink to="/" variant="secondary" size="lg">
              <Home size={16} aria-hidden /> Home
            </ButtonLink>
            <ButtonLink to="/projects" variant="secondary" size="lg">
              <LayoutGrid size={16} aria-hidden /> Case studies
            </ButtonLink>
            <ButtonLink to="/contact" size="lg">
              <Mail size={16} aria-hidden /> Contact
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Looking for a service?{" "}
            <ButtonLink to="/services" variant="ghost" className="text-sm text-cyan">
              Browse all services <ArrowRight size={14} aria-hidden />
            </ButtonLink>
          </p>
        </Container>
      </section>
    </PageShell>
  );
}
