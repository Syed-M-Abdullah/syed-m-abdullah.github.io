import abLogo from "@/assets/brand/ab-logo.webp";
import { site } from "@/data/site";

const MIN_MS = 1300;
const MAX_MS = 2200;

/**
 * The whole loader runs from this inline script, while the HTML is still being parsed — it
 * never waits for the app's JavaScript, so it lifts on time even on slow phones.
 *
 * - Shown on every reload and every fresh visit (no same-site referrer), on any page. Plain
 *   links between pages of the site and back/forward skip it; client-side navigation never
 *   runs it.
 * - Leaves once the page is parsed and fonts are ready, after at least 1.3s and at most 2.2s
 *   (it does not wait for every script and image).
 * - State lives on <html> (classes and data-loader-p), which React does not manage, so
 *   hydration never sees a changed attribute.
 */
const bootScript = `(function(){
var d=document.documentElement;
var n=performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];
var t=n&&n.type;var r=document.referrer;var inside=r&&r.indexOf(location.origin)===0;
if(t==="back_forward"||(t!=="reload"&&inside)){d.setAttribute("data-ready","");return}
var reduce=!d.classList.contains("force-motion")&&window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
d.classList.add("loader-on","loader-lock","anim-ready-pending");
function p(v){d.setAttribute("data-loader-p",v)}p(35);
var done=false,loaded=false,fonts=false,min=false;
function finish(){if(done)return;done=true;p(100);setTimeout(function(){
d.classList.add("loader-exit");d.classList.remove("loader-lock");
setTimeout(function(){d.setAttribute("data-ready","")},reduce?150:320);
setTimeout(function(){d.classList.remove("loader-on","loader-exit","anim-ready-pending");d.removeAttribute("data-loader-p")},900)},200)}
function check(){if(loaded&&fonts&&min)finish()}
setTimeout(function(){min=true;check()},Math.max(0,${MIN_MS}-performance.now()));
setTimeout(finish,Math.max(0,${MAX_MS}-performance.now()));
function ready(){loaded=true;p(90);check()}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ready);else ready();
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){fonts=true;p(70);check()});
})();`.replace(/\n/g, "");

/**
 * Full-screen brand preloader: the AB mark draws in with a ring, the name rises, a progress
 * bar fills, then the curtain lifts into the page (a soft fade under reduced motion). The
 * hero's entrance animations start as the curtain lifts (html[data-ready]).
 */
export function PageLoader() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootScript }} suppressHydrationWarning />
      <div className="page-loader on-dark" role="status" aria-live="polite">
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
              width={179}
              height={120}
              alt=""
              fetchPriority="high"
              className="page-loader-logo"
            />
          </div>
          <div aria-hidden className="page-loader-text">
            <span className="page-loader-name">{site.name}</span>
            <span className="page-loader-tag">
              AI Automation &amp; Intelligent Business Systems
            </span>
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
