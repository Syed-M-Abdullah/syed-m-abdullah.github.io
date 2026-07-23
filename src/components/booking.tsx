import { useEffect } from "react";
import { site } from "@/data/site";
import { CalendarClock, Video, Clock, CheckCircle2 } from "lucide-react";

export function Booking() {
  useEffect(() => {
    const id = "calendly-widget-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <section id="book" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 circuit-bg opacity-60" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div data-reveal>
            <div className="mb-3 font-heading text-[11px] uppercase tracking-[0.2em] text-blue">
              — Book a discovery call
            </div>
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] text-foreground md:text-6xl">
              Grab a <span className="gradient-text">free 30-min</span> strategy call.
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Zero-pressure discovery call. We map your bottleneck, sketch the
              automation, and you walk away with a clear plan — even if we never work together.
            </p>
          </div>
          <ul data-reveal className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Clock, label: "30 minutes", sub: "Focused & efficient" },
              { icon: Video, label: "Google Meet", sub: "Link auto-shared" },
              { icon: CalendarClock, label: "Your timezone", sub: "Auto-detected" },
              { icon: CheckCircle2, label: "No hard sell", sub: "Strategy first" },
            ].map((f) => (
              <li
                key={f.label}
                className="panel-border flex items-center gap-3 rounded-xl px-4 py-3"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue/10 text-blue">
                  <f.icon size={16} />
                </span>
                <div>
                  <div className="font-heading text-sm font-semibold text-foreground">
                    {f.label}
                  </div>
                  <div className="text-xs text-muted-foreground">{f.sub}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-reveal
          className="panel-border overflow-hidden rounded-3xl shadow-[0_40px_80px_-40px_rgba(59,130,246,0.35)]"
        >
          <div className="flex items-center justify-between border-b border-border bg-panel-2/60 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                calendly.com / abdullahbukhari
              </span>
            </div>
            <span className="hidden font-heading text-[10px] uppercase tracking-[0.2em] text-blue sm:inline">
              ▸ Live availability
            </span>
          </div>
          <div
            className="calendly-inline-widget"
            data-url={site.calendly}
            style={{ minWidth: "320px", height: "760px" }}
          />
        </div>
      </div>
    </section>
  );
}
