import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    // GitHub Pages serves every exported page as <path>/index.html and 301-redirects the
    // slash-less URL, so links use the trailing-slash form: no redirect, and the address bar,
    // canonical tags and sitemap all show the same URL.
    trailingSlash: "always",
    // Start loading a page's code on hover / focus, so clicks feel instant.
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });

  return router;
};
