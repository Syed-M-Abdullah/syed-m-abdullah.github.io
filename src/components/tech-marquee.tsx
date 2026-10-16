import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./section";

const stack = [
  "ASP.NET Core",
  "C#",
  "SQL Server",
  "n8n",
  "Vapi",
  "ElevenLabs",
  "Synthflow",
  "GoHighLevel",
  "Pinecone",
  "React",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3">
      {stack.map((t) => (
        <li
          key={t}
          className="glass flex items-center gap-2.5 rounded-full px-5 py-2.5 font-heading text-sm font-semibold whitespace-nowrap text-foreground/85"
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(135deg,var(--cyan),var(--violet))]"
          />
          {t}
        </li>
      ))}
    </ul>
  );
}

/**
 * Infinite tech-stack marquee (pure CSS). Pauses on hover and has a pause button (WCAG 2.2.2
 * for moving content); static under reduced motion.
 */
export function TechMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <section
      aria-labelledby="stack-title"
      className="cv-auto py-10 [contain-intrinsic-size:auto_200px] md:py-14"
    >
      <Container>
        <div className="mb-5 flex items-center justify-center gap-3">
          <p
            id="stack-title"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle"
          >
            The stack behind the systems
          </p>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={paused ? "Play the technology marquee" : "Pause the technology marquee"}
            className="grid h-7 w-7 place-items-center rounded-full border border-border text-subtle transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            {paused ? <Play size={12} aria-hidden /> : <Pause size={12} aria-hidden />}
          </button>
        </div>
      </Container>
      <div className={cn("marquee", paused && "is-paused")}>
        <div className="marquee-track">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
