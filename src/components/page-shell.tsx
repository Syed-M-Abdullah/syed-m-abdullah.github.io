import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useReveal } from "@/lib/reveal";
import { useSpotlight } from "@/lib/spotlight";
import { usePointerEffects } from "@/lib/motion";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { FloatingActions, ScrollProgress } from "./floating-actions";

/** Shared page frame: header, main landmark, footer, floating actions and motion helpers. */
export function PageShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useReveal(pathname);
  useSpotlight();
  usePointerEffects();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScrollProgress />
      <Nav />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
