import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion-pref";
import {
  CalendarCheck,
  Check,
  Database,
  Inbox,
  PenLine,
  Search,
  Send,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { tools } from "@/data/tools";
import { ToolLogo } from "./tech-marquee";

const steps: { label: string; sub: string; icon: LucideIcon }[] = [
  { label: "Lead captured", sub: "Web form · Ads · WhatsApp", icon: Inbox },
  { label: "AI qualified", sub: "Budget, intent and timing", icon: Sparkles },
  { label: "CRM updated", sub: "GoHighLevel · HubSpot", icon: Database },
  { label: "Follow-up sent", sub: "Email · SMS · WhatsApp", icon: Send },
  { label: "Meeting booked", sub: "Calendar invite sent", icon: CalendarCheck },
];

const contentSteps: { label: string; icon: LucideIcon }[] = [
  { label: "Research", icon: Search },
  { label: "Write", icon: PenLine },
];

const bars = [0.45, 0.85, 0.6, 1, 0.7, 0.9, 0.5];

const tool = (id: string) => tools.find((t) => t.id === id);

/**
 * Hero visual: a business workflow running live — a lead moves from capture to a booked
 * meeting (steps light up in sequence while a data pulse travels down the line), a content
 * pipeline publishes to WordPress, and glass chips drift with the pointer (parallax).
 * Decorative (aria-hidden); CSS-only animation, static under reduced motion.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);

  // Pointer parallax: one rAF-throttled listener writes --px / --py (-1..1) on the wrapper.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    const host = el.closest("section") ?? el;
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    };
    const onMove = (e: Event) => {
      const p = e as PointerEvent;
      const r = el.getBoundingClientRect();
      x = Math.max(-1, Math.min(1, (p.clientX - (r.left + r.width / 2)) / (r.width / 2)));
      y = Math.max(-1, Math.min(1, (p.clientY - (r.top + r.height / 2)) / (r.height / 2)));
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      x = 0;
      y = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const wordpress = tool("wordpress");
  const platforms = ["n8n", "zapier", "make"].map(tool);

  return (
    <div ref={ref} aria-hidden className="hero-visual relative mx-auto w-full max-w-[540px]">
      <div className="hero-visual-glow absolute -inset-10 -z-10" />

      <div className="wf-panel relative overflow-hidden rounded-[1.75rem] p-5 sm:p-6">
        <div className="hero-visual-grid absolute inset-0 -z-10" />

        {/* header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="hero-live-dot" />
            <span className="font-heading text-[13px] font-semibold text-foreground">
              Lead-to-meeting workflow
            </span>
          </div>
          <span className="rounded-full border border-[rgba(52,211,153,0.35)] bg-[rgba(16,185,129,0.12)] px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-wide text-[#6ee7b7]">
            RUNNING
          </span>
        </div>

        {/* lead pipeline */}
        <ol className="wf-steps relative mt-5">
          <span className="wf-line">
            <span className="wf-pulse-track">
              <span className="wf-pulse" />
            </span>
          </span>
          {steps.map((s, i) => (
            <li key={s.label} className="wf-step" style={{ "--i": i } as React.CSSProperties}>
              <span className="wf-node">
                <s.icon size={16} strokeWidth={2.2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading text-[14px] font-semibold text-foreground">
                  {s.label}
                </span>
                <span className="hidden truncate text-[12px] text-subtle sm:block">{s.sub}</span>
              </span>
              <span className="wf-check">
                <Check size={12} strokeWidth={3} />
              </span>
            </li>
          ))}
        </ol>

        {/* content pipeline */}
        <div className="mt-4 rounded-2xl border border-border bg-[rgba(255,255,255,0.035)] p-3.5">
          <div className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-subtle">
            Content pipeline
          </div>
          <div className="wf-content relative flex items-center justify-between gap-2">
            <span className="wf-content-line">
              <span className="wf-content-pulse" />
            </span>
            {contentSteps.map((c) => (
              <span key={c.label} className="wf-chip">
                <c.icon size={13} strokeWidth={2.4} className="text-[#7dd3fc]" />
                {c.label}
              </span>
            ))}
            <span className="wf-chip is-publish">
              {wordpress && (
                <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-white">
                  <ToolLogo tool={wordpress} size={16} />
                </span>
              )}
              <span className="sm:hidden">Publish</span>
              <span className="hidden sm:inline">Publish to WordPress</span>
            </span>
          </div>
        </div>
      </div>

      {/* floating chips (parallax depth via --d) */}
      <div
        className="hero-chip hidden sm:block"
        style={{ ["--d" as string]: 1.3, right: "-5%", top: "-5%" }}
      >
        <span className="hero-chip-inner">
          <span className="hero-chip-icon bg-[linear-gradient(135deg,#2563eb,#7c3aed)]">
            <span className="flex h-3.5 items-center gap-[2px]">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="wf-bar w-[2px] rounded-full bg-white"
                  style={{ height: `${h * 100}%`, animationDelay: `${-i * 0.11}s` }}
                />
              ))}
            </span>
          </span>
          AI voice agent · on a call
        </span>
      </div>
      <div
        className="hero-chip hidden sm:block"
        style={{ ["--d" as string]: 0.8, left: "-6%", bottom: "-5%" }}
      >
        <span className="hero-chip-inner" style={{ animationDelay: "-1.6s" }}>
          <span className="flex -space-x-1.5 pl-1">
            {platforms.map(
              (t) =>
                t && (
                  <span
                    key={t.id}
                    className="grid h-6 w-6 place-items-center rounded-full bg-white ring-2 ring-white"
                  >
                    <ToolLogo tool={t} size={15} />
                  </span>
                ),
            )}
          </span>
          Built on n8n · Zapier · Make
        </span>
      </div>
    </div>
  );
}
