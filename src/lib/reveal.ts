import { useEffect } from "react";

/**
 * Fades in `[data-reveal]` elements as they scroll into view. Only elements that start
 * below the fold are hidden, so server-rendered content above the fold never flickers,
 * and nothing is hidden for users who prefer reduced motion.
 *
 * `[data-reveal="view"]` elements use a CSS scroll-driven animation (`animation-timeline:
 * view()`) where the browser supports it; this observer is their fallback elsewhere.
 */
export function useReveal(key?: string) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cssViewTimeline =
      typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()");
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
      (el) => !(cssViewTimeline && el.dataset.reveal === "view"),
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("reveal-pending");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => {
      // Inside a content-visibility section that has not rendered yet, measure the section.
      const host = el.closest<HTMLElement>(".cv-auto");
      const top = Math.max(
        el.getBoundingClientRect().top,
        host ? host.getBoundingClientRect().top : -Infinity,
      );
      if (top > window.innerHeight) {
        el.classList.add("reveal-pending");
        io.observe(el);
      }
    });
    return () => {
      io.disconnect();
      els.forEach((el) => el.classList.remove("reveal-pending"));
    };
  }, [key]);
}
