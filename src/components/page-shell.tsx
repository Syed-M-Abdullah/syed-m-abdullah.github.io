import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useSpotlight } from "@/lib/spotlight";
import { usePauseOffscreen, usePointerEffects } from "@/lib/motion";
import { useRevealEngine } from "@/lib/reveal";
import { useAnchorScroll } from "@/lib/smooth-scroll";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { FloatingActions, ScrollProgress } from "./floating-actions";
import { ToolSpriteScope } from "./tool-sprite";

/** Shared page frame: header, main landmark, footer, floating actions and motion helpers. */
export function PageShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useSpotlight();
  usePointerEffects();
  // Per page (not at the root): its effect runs only after this page's content has hydrated.
  useRevealEngine();
  usePauseOffscreen(pathname);
  useAnchorScroll();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ToolSpriteScope>
        <ScrollProgress />
        <Nav />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <FloatingActions />
      </ToolSpriteScope>
    </div>
  );
}
