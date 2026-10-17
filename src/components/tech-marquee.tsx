import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { toolGroups, toolsInGroup, type Tool, type ToolGroup } from "@/data/tools";
import { cn } from "@/lib/utils";
import { Container, SectionHeading } from "./section";
import { bandClass, type Tone } from "@/lib/band";
import { useToolSymbol } from "@/lib/tool-sprite";
import { LazyMount } from "./lazy-mount";
import { prefersReducedMotion } from "@/lib/motion-pref";

/** Darkens a brand colour just enough for white badge text to reach 4.5:1 (WCAG AA). */
function badgeColor(hex: string) {
  const ch = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  let [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  for (let i = 0; i < 20; i++) {
    const lum = 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
    if (1.05 / (lum + 0.05) >= 4.6) break;
    [r, g, b] = [r, g, b].map((v) => Math.round(v * 0.92));
  }
  return `rgb(${r}, ${g}, ${b})`;
}

/** A tool's logo in its own brand colour (official glyph, or a monogram badge placeholder). */
export function ToolLogo({ tool, size = 22 }: { tool: Tool; size?: number }) {
  // Hooks first: registers the glyph in the page's shared sprite (components/tool-sprite.tsx).
  const symbol = useToolSymbol(tool.id);
  if (tool.monogram) {
    return (
      <span
        aria-hidden
        className="grid shrink-0 place-items-center rounded-md font-heading font-extrabold leading-none text-white"
        style={{
          width: size,
          height: size,
          background: badgeColor(tool.color),
          fontSize: tool.monogram.length > 2 ? size * 0.36 : size * 0.46,
        }}
      >
        {tool.monogram}
      </span>
    );
  }
  const glyph = (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={tool.tile ? size * 0.68 : size}
      height={tool.tile ? size * 0.68 : size}
      fill={tool.tile?.fg ?? tool.color}
    >
      {symbol ? <use href={symbol} /> : <path d={tool.path} />}
    </svg>
  );
  if (!tool.tile) return <span className="grid shrink-0 place-items-center">{glyph}</span>;
  return (
    <span
      aria-hidden
      className="grid shrink-0 place-items-center rounded-md"
      style={{ width: size, height: size, background: tool.tile.bg }}
    >
      {glyph}
    </span>
  );
}

const chipSizes = {
  md: { cls: "gap-2.5 px-4 py-2.5 text-sm", logo: 22 },
  sm: { cls: "gap-2 px-3 py-1.5 text-[13px]", logo: 17 },
  xs: { cls: "gap-1.5 px-2.5 py-1 text-[12px]", logo: 14 },
};

export function ToolChip({
  tool,
  size = "md",
  className,
}: {
  tool: Tool;
  size?: keyof typeof chipSizes;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "tool-chip inline-flex items-center rounded-full border border-border bg-panel font-heading font-semibold whitespace-nowrap text-foreground",
        chipSizes[size].cls,
        className,
      )}
      style={{ ["--tool" as string]: tool.color }}
    >
      <ToolLogo tool={tool} size={chipSizes[size].logo} />
      {tool.name}
    </span>
  );
}

/**
 * The looping copy is added after the page has loaded (idle time), so the first render and
 * hydration only handle one set of chips; the row starts moving once the copy exists.
 */
function useLoopCopy() {
  const [loop, setLoop] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setLoop(true), { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setLoop(true), 600);
    return () => clearTimeout(id);
  }, []);
  return loop;
}

function Row({ group, speed = 3.2 }: { group: ToolGroup; speed?: number }) {
  const items = toolsInGroup(group);
  const loop = useLoopCopy();
  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 py-3">
      {items.map((t) => (
        <li key={t.id}>
          <ToolChip tool={t} />
        </li>
      ))}
    </ul>
  );
  return (
    <div>
      <p className="mb-1 px-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
        {toolGroups[group]}
      </p>
      <div className="marquee">
        <div
          className={cn("marquee-track is-reverse", loop && "is-looping")}
          style={{ ["--marquee-duration" as string]: `${items.length * speed}s` }}
        >
          {list(false)}
          {loop && list(true)}
        </div>
      </div>
    </div>
  );
}

/**
 * Tools & technologies: two infinite marquees, both gliding left to right at slightly different
 * speeds (pure CSS), logos in brand colour. Hovering a row pauses it and the hovered tool
 * bounces. A pause button covers WCAG 2.2.2; static and wrapped under reduced motion.
 */
export function TechMarquee({ tone }: { tone?: Tone }) {
  const [paused, setPaused] = useState(false);
  return (
    <section
      aria-labelledby="stack-title"
      className={cn(
        "cv-auto py-16 [contain-intrinsic-size:auto_560px] md:py-20",
        tone && bandClass(tone),
      )}
    >
      <Container>
        <SectionHeading
          id="stack-title"
          eyebrow="Tools & technologies"
          align="center"
          title="The stack behind the systems"
          intro="No-code platforms where they're the fastest route, real code where a project needs it."
        />
      </Container>
      <div data-reveal="up" data-delay="200" className={cn("space-y-4", paused && "is-paused")}>
        <LazyMount className="min-h-[200px]">
          <Row group="nocode" />
          <Row group="code" speed={3.8} />
        </LazyMount>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-panel px-3.5 py-1.5 text-[12.5px] font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        >
          {paused ? <Play size={12} aria-hidden /> : <Pause size={12} aria-hidden />}
          {paused ? "Play animation" : "Pause animation"}
        </button>
      </div>
    </section>
  );
}
