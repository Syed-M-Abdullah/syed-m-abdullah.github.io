import { useEffect, useRef } from "react";
import abLogo from "@/assets/brand/ab-logo.webp";
import abLogo2x from "@/assets/brand/ab-logo@2x.webp";

const SEEN_KEY = "ab-loader-seen";
const MIN_MS = 1200;
const MAX_MS = 3000;

/**
 * Runs while the HTML is still being parsed (before the hero is painted) and decides whether
 * this visit gets the loader: only the first full page load of the home page per session.
 * Client-side navigation never runs it, so the loader never replays. A JS failsafe clears it
 * after 4.5s even if the app bundle never starts.
 */
const bootScript = `(function(){var d=document.documentElement;try{if(sessionStorage.getItem("${SEEN_KEY}")==="1"){d.setAttribute("data-ready","");return}}catch(e){}d.classList.add("loader-on","loader-lock","anim-ready-pending");setTimeout(function(){d.classList.remove("loader-lock","loader-on","anim-ready-pending");d.setAttribute("data-ready","");try{sessionStorage.setItem("${SEEN_KEY}","1")}catch(e){}},${MAX_MS + 1500})})();`;

/**
 * Full-screen preloader for the first visit: logo reveal, animated ring and a progress bar on
 * the site's aurora background. Leaves when the window has loaded and fonts are ready, after at
 * least 1.2s and at most 3s, with a curtain lift (a quick fade under reduced motion). The hero's
 * entrance animations start as the curtain lifts.
 */
export function PageLoader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!el) return;
    if (!root.classList.contains("loader-on")) {
      root.setAttribute("data-ready", "");
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minMs = reduce ? 300 : MIN_MS;
    let finished = false;
    const timers: number[] = [];
    const setProgress = (p: number) => el.style.setProperty("--p", String(p));
    setProgress(0.35);

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(1);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* private mode: the loader may show again next visit, which is harmless */
      }
      timers.push(
        window.setTimeout(
          () => {
            el.classList.add("is-exiting");
            root.classList.remove("loader-lock");
            // Start the hero's entrance as the curtain is lifting, so nothing plays unseen.
            timers.push(
              window.setTimeout(() => root.setAttribute("data-ready", ""), reduce ? 0 : 320),
            );
            timers.push(
              window.setTimeout(
                () => {
                  root.classList.remove("loader-on", "anim-ready-pending");
                },
                reduce ? 260 : 900,
              ),
            );
          },
          reduce ? 0 : 220,
        ),
      );
    };

    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true }));
    const fonts = (document.fonts?.ready ?? Promise.resolve()).then(() => setProgress(0.7));
    void loaded.then(() => setProgress(0.9));
    const minDelay = new Promise<void>((r) =>
      timers.push(window.setTimeout(r, Math.max(0, minMs - performance.now()))),
    );
    void Promise.all([loaded, fonts, minDelay]).then(finish);
    timers.push(window.setTimeout(finish, Math.max(0, MAX_MS - performance.now())));

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootScript }} suppressHydrationWarning />
      <div ref={ref} className="page-loader" role="status" aria-live="polite">
        <div aria-hidden className="page-loader-bg" />
        <div className="page-loader-inner">
          <div className="page-loader-mark" aria-hidden>
            <span className="page-loader-glow" />
            <svg className="page-loader-ring" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="loader-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#38bdf8" />
                  <stop offset="0.5" stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <circle className="track" cx="50" cy="50" r="46" />
              <circle className="arc" cx="50" cy="50" r="46" />
            </svg>
            <img
              src={abLogo}
              srcSet={`${abLogo} 1x, ${abLogo2x} 2x`}
              width={179}
              height={120}
              alt=""
              className="page-loader-logo"
            />
          </div>
          <div className="page-loader-bar" aria-hidden>
            <span />
          </div>
          <span className="sr-only">Loading</span>
        </div>
      </div>
    </>
  );
}
