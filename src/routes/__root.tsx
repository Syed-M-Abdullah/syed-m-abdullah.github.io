import { Outlet, createRootRoute, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import headlineFont from "../assets/fonts/plus-jakarta-sans-latin-wght-normal.woff2?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { buttonClass } from "@/lib/button-class";
import { NotFoundPage } from "@/components/not-found";
import { PageLoader } from "@/components/page-loader";
import { revealBootScript } from "@/lib/reveal";
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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: `${site.name} — AI Automation & Intelligent Business Systems` },
      {
        name: "description",
        content:
          "Business automation with n8n, Zapier and Make, GoHighLevel CRM, lead generation, AI content, voice and chat agents — plus custom .NET software.",
      },
      { name: "author", content: site.name },
      { name: "theme-color", content: "#0b1433" },
      { property: "og:site_name", content: site.name },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      // Self-hosted headline font (see @font-face in styles.css), fetched alongside the CSS.
      {
        rel: "preload",
        href: headlineFont,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
      </head>
      {/* Browser extensions (e.g. Grammarly) add attributes to <body> before React loads. */}
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      {/* Mounted once at the root: shows on reloads and fresh visits to any page. */}
      <PageLoader />
      <Outlet />
    </>
  );
}
