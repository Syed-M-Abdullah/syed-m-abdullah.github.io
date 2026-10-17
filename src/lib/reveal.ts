import { useEffect } from "react";

/**
 * Scroll reveal engine — native IntersectionObserver + CSS transitions (styles: "Scroll reveal
 * engine" in styles.css).
 *
 * Mark elements with `data-reveal="<type>"`:
 *   up (default) · down · left · right · zoom · blur-up · wipe (images) · mask-lines (headings,
 *   with <MaskLines> inside) · fade
 * Optional `data-delay="100|150|200|300|400|500"` and `style={{ "--i": n }}` for stagger.
 *
 * One shared observer adds `data-revealed` once an element enters the viewport (it never
 * replays), then `data-reveal-done` when the transition ends (dropping will-change). A
 * MutationObserver picks up elements added later (route changes, filtered lists).
 * Attributes, not classes, so React re-renders never undo a reveal.
 */

/**
 * Inline in <head>, before first paint:
 *  - `html.js`: hidden start states apply only when JavaScript runs (no-JS shows everything);
 *  - motion preview (`?motion=full` / `?motion=os`) → `html.force-motion`;
 *  - a failsafe that shows everything if the app never starts the engine.
 */
export const revealBootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var q=new URLSearchParams(location.search).get("motion");if(q==="full")localStorage.setItem("ab-motion","full");if(q==="os")localStorage.removeItem("ab-motion");if(localStorage.getItem("ab-motion")==="full")d.classList.add("force-motion")}catch(e){}setTimeout(function(){if(!window.__revealReady)d.classList.add("reveal-off")},6000)})();`;

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

/** Groups a mask-lines heading's words into visual lines (`--l`), so they rise line by line. */
function indexLines(el: HTMLElement) {
  let top: number | null = null;
  let line = -1;
  el.querySelectorAll<HTMLElement>(".rv-w").forEach((w) => {
    const t = w.offsetTop;
    if (top === null || Math.abs(t - top) > 4) {
      line++;
      top = t;
    }
    w.style.setProperty("--l", String(line));
  });
}

function reveal(el: HTMLElement) {
  if (el.hasAttribute("data-revealed")) return;
  if (el.dataset.reveal === "mask-lines") indexLines(el);
  el.setAttribute("data-revealed", "");
  const done = (e?: TransitionEvent) => {
    if (e && e.target !== el) return;
    el.setAttribute("data-reveal-done", "");
    el.removeEventListener("transitionend", done);
  };
  el.addEventListener("transitionend", done);
  window.setTimeout(done, 2400);
}

/** Starts the engine for the current page, after its content has hydrated (in PageShell). */
export function useRevealEngine() {
  useEffect(() => {
    if (window.__revealReady) return;
    window.__revealReady = true;
    const root = document.documentElement;
    if (!("IntersectionObserver" in window)) {
      root.classList.add("reveal-off");
      return;
    }
    const pending = new Set<Element>();
    // Above the viewport. An empty box means "not laid out" (display: none, or inside a section
    // the browser is skipping), never "above".
    const above = (r: DOMRectReadOnly, top = 0) => r.height > 0 && r.bottom <= top;
    const show = (el: Element) => {
      reveal(el as HTMLElement);
      pending.delete(el);
      io.unobserve(el);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // 15% visible — or a quarter of the screen for elements taller than the viewport.
          const enough =
            e.intersectionRatio >= 0.15 || e.intersectionRect.height > window.innerHeight * 0.25;
          // Already above the viewport when the engine starts (reload mid-page, anchor jump).
          const passed = above(e.boundingClientRect, e.rootBounds?.top);
          if ((e.isIntersecting && enough) || passed) show(e.target);
        }
      },
      { threshold: [0, 0.15, 0.3], rootMargin: "0px 0px -8% 0px" },
    );
    const watch = (node: Node) => {
      if (!(node instanceof Element)) return;
      const els = [...node.querySelectorAll("[data-reveal]:not([data-revealed])")];
      if (node.matches("[data-reveal]:not([data-revealed])")) els.push(node);
      for (const el of els) {
        pending.add(el);
        io.observe(el);
      }
    };
    watch(document.body);
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach(watch);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // A fast scroll can carry an element from below the viewport to above it between two
    // observer updates; its intersection never changes, so no callback fires. Once scrolling
    // settles, reveal whatever is now above the reader. A skipped (content-visibility) section is
    // measured as a whole, so its contents are never laid out just to be checked.
    let timer = 0;
    const sweep = () => {
      timer = 0;
      const boxes = new Map<Element, DOMRect>();
      for (const el of pending) {
        const box = el.closest(".cv-auto") ?? el;
        let rect = boxes.get(box);
        if (!rect) boxes.set(box, (rect = box.getBoundingClientRect()));
        if (above(rect)) show(el);
        else if (box !== el && rect.top < 0 && above(el.getBoundingClientRect())) show(el);
      }
    };
    const onScroll = () => {
      if (!pending.size) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(sweep, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
      window.__revealReady = false;
    };
  }, []);
}
