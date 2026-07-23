import { tickerItems, countryItems } from "@/data/ticker";

export function TrustTicker() {
  return (
    <section className="overflow-hidden border-y border-border bg-panel/50 py-8">
      <div className="marquee">
        {[1, 2].map((group) => (
          <div
            key={group}
            className="flex shrink-0 items-center gap-14 px-10"
          >
            {tickerItems.map((item, index) => (
              <div
                key={`${group}-${index}`}
                className="group flex w-[120px] shrink-0 flex-col items-center justify-center"
              >
                <span className="text-center font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white/70 transition-all duration-300 group-hover:scale-105 group-hover:text-cyan-400">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function CountryTicker() {
  return (
    <section className="overflow-hidden border-y border-border bg-panel/50 py-5">
      <div className="marquee_reverse">
        {[1, 2].map((group) => (
          <div
            key={group}
            className="flex shrink-0 items-center gap-12 px-8"
          >
            {countryItems.map((country, index) => (
              <span
                key={`${group}-${index}`}
                className="shrink-0 font-heading text-sm uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-cyan-400"
              >
                {country}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}