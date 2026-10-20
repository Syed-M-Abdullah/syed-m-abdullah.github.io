import { useEffect, type ReactNode } from "react";
import { PageShell } from "./page-shell";
import { bandClass } from "@/lib/band";
import { Container } from "./section";

/**
 * Shown briefly for an old URL while it forwards to the new one (the route's head also adds a
 * meta refresh, so it works without JavaScript and on the static export).
 */
export function RedirectPage({ children }: { children: ReactNode }) {
  return (
    <PageShell>
      <section className={`${bandClass("brand")} pt-36 pb-24`}>
        <Container>
          <p className="text-center text-lg text-muted-foreground">{children}</p>
        </Container>
      </section>
    </PageShell>
  );
}

/** Page body for a retired URL: forwards straight away, with a link as a fallback. */
export function ForwardPage({ to, label }: { to: string; label: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return (
    <RedirectPage>
      This page has moved:{" "}
      <a href={to} className="font-semibold text-eyebrow underline">
        {label}
      </a>
      .
    </RedirectPage>
  );
}
