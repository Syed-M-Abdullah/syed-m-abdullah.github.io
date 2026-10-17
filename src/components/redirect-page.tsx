import type { ReactNode } from "react";
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
