import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const TIP_KEY = "ab-wa-tip-seen";

/**
 * Scroll-to-top (with a scroll-progress ring) stacked above a WhatsApp button, bottom-right.
 * One passive, rAF-throttled scroll listener also feeds --scroll to the top progress bar.
 * The stack fades out while an element marked `data-avoid-fab` (e.g. the contact form) sits
 * under its corner, so it never covers form fields or buttons.
 */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [avoid, setAvoid] = useState(false);
  const [tip, setTip] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      doc.style.setProperty("--scroll", max > 0 ? Math.min(1, y / max).toFixed(4) : "0");
      setShowTop(y > 400);
      let hit = false;
      document.querySelectorAll<HTMLElement>("[data-avoid-fab]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (
          r.right > window.innerWidth - 96 &&
          r.bottom > window.innerHeight - 176 &&
          r.top < window.innerHeight - 16
        )
          hit = true;
      });
      setAvoid(hit);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Tooltip: appears after a short delay, dismisses itself, once per session.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(TIP_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    const show = window.setTimeout(() => setTip(true), 4500);
    const hide = window.setTimeout(() => {
      setTip(false);
      try {
        sessionStorage.setItem(TIP_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 10500);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <aside aria-label="Quick actions" className={cn("fab-stack", avoid && "is-avoiding")}>
      <button
        type="button"
        onClick={toTop}
        aria-label="Scroll to top"
        aria-hidden={!showTop}
        tabIndex={showTop ? 0 : -1}
        className={cn(
          "fab-top glass relative grid h-12 w-12 place-items-center rounded-full text-foreground shadow-[var(--shadow-card)] transition-colors hover:text-cyan",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          showTop && "is-visible",
        )}
      >
        <svg
          aria-hidden
          viewBox="0 0 44 44"
          className="fab-top-ring absolute inset-0 h-full w-full"
        >
          <circle cx="22" cy="22" r="20" fill="none" stroke="var(--border)" strokeWidth="2" />
          <circle
            className="arc"
            cx="22"
            cy="22"
            r="20"
            fill="none"
            stroke="var(--cyan)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <ArrowUp size={18} aria-hidden />
      </button>

      <div className="relative flex items-center">
        <span
          aria-hidden
          className={cn(
            "fab-tip glass absolute right-[calc(100%+12px)] whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-medium text-foreground shadow-[var(--shadow-card)]",
            tip && "is-visible",
          )}
        >
          {tip ? "Chat with me on WhatsApp" : ""}
        </span>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          onMouseEnter={() => setTip(true)}
          onMouseLeave={() => setTip(false)}
          onFocus={() => setTip(true)}
          onBlur={() => setTip(false)}
          className={cn(
            "fab-wa relative isolate grid h-14 w-14 place-items-center rounded-full text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </aside>
  );
}

/** Thin gradient bar at the very top showing reading progress. */
export function ScrollProgress() {
  return <div aria-hidden className="scroll-progress" />;
}
