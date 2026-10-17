import { flushSync } from "react-dom";
import { prefersReducedMotion } from "./motion-pref";

/**
 * Runs a state change inside a View Transition when the browser supports it, so pills slide
 * and cards glide to their new positions. Falls back to an instant update (and under reduced
 * motion).
 */
export function withViewTransition(update: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (!doc.startViewTransition || prefersReducedMotion()) {
    update();
    return;
  }
  doc.startViewTransition(() => flushSync(update));
}
