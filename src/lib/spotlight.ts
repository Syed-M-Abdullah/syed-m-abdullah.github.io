import { useEffect } from "react";

/**
 * Feeds the pointer position to `.beam-card` elements as --mx / --my so the CSS
 * radial highlight follows the cursor. One listener for the whole page.
 */
export function useSpotlight() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let frame = 0;
    let last: PointerEvent | null = null;
    // At most one style write per frame, however fast the pointer events arrive.
    const apply = () => {
      frame = 0;
      const e = last;
      const el = (e?.target as Element | null)?.closest?.<HTMLElement>(".beam-card");
      if (!e || !el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
}
