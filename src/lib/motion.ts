import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion-pref";

const reducedMotion = prefersReducedMotion;
const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * Magnetic buttons (`[data-magnetic]`) and 3D-tilt cards (`[data-tilt]`), driven by one
 * passive pointer listener for the whole page. Writes CSS custom properties only; the
 * transforms themselves live in styles.css. Off for touch and reduced motion.
 */
export function usePointerEffects() {
  useEffect(() => {
    if (reducedMotion() || !finePointer()) return;
    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;
    let frame = 0;
    let last: PointerEvent | null = null;

    const release = (el: HTMLElement | null, kind: "magnet" | "tilt") => {
      if (!el) return;
      if (kind === "magnet") {
        el.classList.remove("is-magnet-active");
        el.style.removeProperty("--tx");
        el.style.removeProperty("--ty");
      } else {
        el.classList.remove("is-tilting");
        el.style.removeProperty("--rx");
        el.style.removeProperty("--ry");
      }
    };

    const apply = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const target = e.target as Element | null;

      const m = target?.closest?.<HTMLElement>("[data-magnetic]") ?? null;
      if (m !== magnet) {
        release(magnet, "magnet");
        magnet = m;
      }
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        magnet.classList.add("is-magnet-active");
        magnet.style.setProperty("--tx", `${(dx * 0.22).toFixed(1)}px`);
        magnet.style.setProperty("--ty", `${(dy * 0.32).toFixed(1)}px`);
      }

      const t = target?.closest?.<HTMLElement>("[data-tilt]") ?? null;
      if (t !== tilt) {
        release(tilt, "tilt");
        tilt = t;
      }
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.classList.add("is-tilting");
        tilt.style.setProperty("--rx", `${(-py * 6).toFixed(2)}deg`);
        tilt.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      release(magnet, "magnet");
      release(tilt, "tilt");
      magnet = tilt = null;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, []);
}

/**
 * Counts from 0 to `target` the first time the element scrolls into view. The final value is
 * what's server-rendered, so no-JS visitors and crawlers see the real number.
 */
export function useCountUp(target: number, duration = 1600) {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(target);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    let frame = 0;
    let started = false;
    // Below the fold: reset to 0 now, while nobody can see it, so the count-up starts clean.
    if (el.getBoundingClientRect().top > window.innerHeight) setValue(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          setValue(Math.round(target * eased));
          if (p < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);
  return { ref, value };
}

/**
 * Pauses the CSS animations of `[data-pause-offscreen]` sections (the heroes) while they are
 * scrolled out of view, by toggling `data-offscreen` (see styles.css). Saves work on long pages.
 */
export function usePauseOffscreen(key?: string) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-pause-offscreen]");
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) el.removeAttribute("data-offscreen");
        else el.setAttribute("data-offscreen", "");
      });
    });
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      els.forEach((el) => el.removeAttribute("data-offscreen"));
    };
  }, [key]);
}
