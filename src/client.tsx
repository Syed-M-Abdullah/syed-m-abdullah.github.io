// Client entry (registered in vite.config.ts). Same as TanStack Start's default entry, except
// that it waits one frame before hydrating: on a fast connection the scripts arrive while the
// HTML is still being parsed, and starting the (long) hydration straight away kept the browser
// from painting the server-rendered page and the loader until it finished.
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <StartClient />
      </StrictMode>,
    );
  });
}

// requestAnimationFrame runs just before the next paint; the timeout lands just after it.
requestAnimationFrame(() => setTimeout(hydrate, 0));
