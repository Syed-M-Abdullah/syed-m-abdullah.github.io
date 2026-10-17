/**
 * True when the visitor's OS asks for reduced motion — unless motion preview is on
 * (`?motion=full`, remembered in localStorage; `?motion=os` turns it off), which lets the site
 * owner see every animation on a machine where Windows "Animation effects" is switched off.
 * The flag is applied as `html.force-motion` by the inline boot script (lib/reveal.ts).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (document.documentElement.classList.contains("force-motion")) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
