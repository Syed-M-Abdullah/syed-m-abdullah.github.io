import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion-pref";

/**
 * Hand-written eased page scroll (requestAnimationFrame + easeInOutCubic).
 *
 * Why not `scrollTo({ behavior: "smooth" })`? Browsers silently turn native smooth scrolling
 * into an instant jump when the OS has animations switched off or the browser's smooth-scroll
 * setting is disabled — so the "scroll to top" button jumped. This tween always animates
 * (anchor links jump under prefers-reduced-motion; the scroll-to-top button opts out with
 * `always`), and the user can take over at any moment: wheel, touch or a key press cancels it.
 */

export type ScrollOptions = {
  /** Duration bounds in ms; the tween takes ~msPerPx per pixel within them. */
  minMs?: number;
  maxMs?: number;
  msPerPx?: number;
  /** Animate even when the OS asks for reduced motion (used by the scroll-to-top button). */
  always?: boolean;
  onDone?: (completed: boolean) => void;
};

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

let cancelActive: (() => void) | null = null;

export function scrollToY(getTarget: () => number, options: ScrollOptions = {}): void {
  const { minMs = 800, maxMs = 1600, msPerPx = 0.35, always = false, onDone } = options;
  cancelActive?.();
  const html = document.documentElement;
  const reduce = prefersReducedMotion();
  const startY = window.scrollY;
  const distance = Math.abs(getTarget() - startY);
  if ((reduce && !always) || distance < 2) {
    window.scrollTo({ top: getTarget(), behavior: "instant" });
    onDone?.(true);
    return;
  }

  const duration = Math.min(maxMs, Math.max(minMs, distance * msPerPx));
  const t0 = performance.now();
  let frame = 0;
  let finished = false;

  const cleanup = () => {
    cancelAnimationFrame(frame);
    html.classList.remove("is-tweening");
    window.removeEventListener("wheel", userTakeover);
    window.removeEventListener("touchstart", userTakeover);
    window.removeEventListener("keydown", userTakeover);
    if (cancelActive === cancel) cancelActive = null;
  };
  const finish = (completed: boolean) => {
    if (finished) return;
    finished = true;
    cleanup();
    onDone?.(completed);
  };
  const cancel = () => finish(false);
  function userTakeover() {
    cancel();
  }

  // CSS `scroll-behavior: smooth` must not smooth each per-frame jump.
  html.classList.add("is-tweening");
  window.addEventListener("wheel", userTakeover, { passive: true });
  window.addEventListener("touchstart", userTakeover, { passive: true });
  window.addEventListener("keydown", userTakeover);
  cancelActive = cancel;

  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / duration);
    // Re-read the target every frame: sections rendered lazily (content-visibility) can move it.
    const target = getTarget();
    window.scrollTo({ top: startY + (target - startY) * easeInOutCubic(p), behavior: "instant" });
    if (p < 1) frame = requestAnimationFrame(step);
    else finish(true);
  };
  frame = requestAnimationFrame(step);
}

const scrollPadding = () =>
  parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;

/** Eased scroll that lands an element just below the fixed header. */
export function scrollToElement(el: Element, onDone?: (completed: boolean) => void) {
  scrollToY(() => el.getBoundingClientRect().top + window.scrollY - scrollPadding(), { onDone });
}

/**
 * Same-page anchor links (`href="#id"`) use the eased scroll, then update the URL hash and
 * move focus to the target for keyboard and screen-reader users.
 */
export function useAnchorScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = decodeURIComponent(a.getAttribute("href")!.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      scrollToElement(target, (completed) => {
        if (!completed) return;
        window.history.replaceState(window.history.state, "", `#${id}`);
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
