import profileAsset from "@/assets/profile.png";

const stats = [
  { v: "6+", l: "Yrs .NET" },
  { v: "2+", l: "Yrs AI Systems" },
  { v: "130+", l: "Systems Shipped" },
  { v: "25+", l: "Industries" },
  { v: "2", l: "Govt Tax Authorities" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10 circuit-bg" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] dark:opacity-[0.09]"
        style={{
          backgroundImage:
            "linear-gradient(var(--blue) 1px, transparent 1px), linear-gradient(90deg, var(--blue) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 md:px-10 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue/30 bg-blue/10 px-4 py-1.5 font-heading text-[11px] font-medium uppercase tracking-[0.14em] text-blue">
            <span className="h-2 w-2 rounded-full bg-blue animate-pulse" />
            Available for New Projects · Worldwide
          </span>
          <h1 className="mt-6 font-display font-extrabold text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] tracking-tight text-foreground">
            AI Systems That{" "}
            <span className="gradient-text">Scale.</span>
            <br />
            Software That{" "}
            <span className="gradient-text">Can't Fail.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            AI Voice Agents · Omnichannel Chatbots · Automation Systems · Enterprise Software.
            Production-grade systems that replace manual work — trusted by clients across the
            US, UK, Germany, UAE, Saudi Arabia, Singapore and Australia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full bg-blue px-6 py-3 font-heading text-sm font-semibold text-white shadow-[0_20px_40px_-15px_rgba(59,130,246,0.6)] transition hover:bg-blue-deep"
            >
              Explore Services →
            </a>
            <a
              href="#cases"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-panel px-6 py-3 font-heading text-sm font-semibold text-foreground transition hover:border-blue/50"
            >
              View Case Studies
            </a>
          </div>
        </div>

        {/* Portrait card */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-blue/40 via-blue-deep/20 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-panel">
            <img
              src={profileAsset}
              alt="Syed Abdullah Bukhari"
              className="aspect-square w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5">
              <div className="font-heading text-[10px] uppercase tracking-[0.2em] text-blue-light">
                Pakistan · Remote worldwide
              </div>
              <div className="mt-1 font-display text-xl font-bold text-white">
                Syed Abdullah Bukhari
              </div>
              <div className="font-heading text-xs text-white/70">
                AI Systems Architect · Sr. .NET Developer
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* stat bar */}
      <div className="mx-auto mt-16 max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <div
              key={s.l}
              className="bg-panel px-6 py-6 text-center transition hover:bg-panel-2"
            >
              <div className="font-display text-3xl font-extrabold gradient-text md:text-4xl">
                {s.v}
              </div>
              <div className="mt-1 font-heading text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
