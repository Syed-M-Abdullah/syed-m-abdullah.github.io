import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ScriptOnce,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { buttonClass } from "@/lib/button-class";
import { NotFoundPage } from "@/components/not-found";
import { site } from "@/data/site";

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try again, or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={buttonClass("primary", "md")}
          >
            Try again
          </button>
          <a href="/" className={buttonClass("secondary", "md")}>
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: `${site.name} — AI Automation Engineer for Agencies` },
      {
        name: "description",
        content:
          "GoHighLevel workflows, n8n automations, API integrations and AI voice and chat systems for agencies and businesses — with full-stack .NET engineering when a project needs it.",
      },
      { name: "author", content: site.name },
      { name: "theme-color", content: "#050816" },
      { property: "og:site_name", content: site.name },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // Loaded without blocking first paint: media="print" until it has loaded (see RootShell).
      { rel: "stylesheet", href: FONTS_CSS, media: "print" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorComponent,
});

const FONTS_CSS =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap";

// Switch the font stylesheet on once it has downloaded, so it never blocks first paint.
// (Without JavaScript the site simply keeps the system font stack.)
const fontSwap = `(function(){var l=document.querySelector('link[media="print"][href^="https://fonts.googleapis.com"]');if(!l)return;function on(){l.media="all"}if(l.sheet)on();else l.addEventListener("load",on)})();`;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: fontSwap }} />
      </head>
      {/* Browser extensions (e.g. Grammarly) add attributes to <body> before React loads. */}
      <body suppressHydrationWarning>
        <ScriptOnce>
          {`try{var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}`}
        </ScriptOnce>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
