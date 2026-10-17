import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders its children only once the placeholder comes within `rootMargin` of the viewport, so
 * heavy below-the-fold widgets (voice players, the tools marquee) cost nothing at page load.
 * The placeholder reserves the space (`className` sets a min-height) so nothing shifts.
 * Server and first client render match (both placeholders), so hydration stays clean.
 */
export function LazyMount({
  children,
  className,
  rootMargin = "600px 0px",
}: {
  children: ReactNode;
  /** Min-height classes for the placeholder. */
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return (
    <div ref={ref} className={cn(!show && className)}>
      {show ? children : null}
    </div>
  );
}
