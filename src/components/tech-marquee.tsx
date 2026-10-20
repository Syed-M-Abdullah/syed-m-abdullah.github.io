import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { toolGroups, toolsInGroup, toolUses, type Tool, type ToolGroup } from "@/data/tools";
import { projectCountForTool, toolTab } from "@/data/projects";
import { cn } from "@/lib/utils";
import { Container, SectionHeading } from "./section";
import { bandClass, type Tone } from "@/lib/band";
import { LazyMount } from "./lazy-mount";
import { ToolChip, ToolLogo } from "./tool-logo";
import { prefersReducedMotion } from "@/lib/motion-pref";

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

/** What the hover card shows for one tool: real project counts only, never invented. */
function toolInfo(tool: Tool) {
  const count = projectCountForTool(tool.id);
  const tab = toolTab[tool.id];
  return {
    use: toolUses[tool.id],
    count,
    href: tab && count > 0 ? `/projects/?tool=${tab}` : undefined,
  };
}

type Hover = { tool: Tool; x: number; y: number } | null;

/** A pill (row 1) or a tile (row 2); a link to that tool's projects when there are some. */
function Item({
  tool,
  kind,
  copy,
  onShow,
  onHide,
}: {
  tool: Tool;
  kind: "pill" | "tile";
  /** The looping duplicate: hidden from assistive tech and the tab order. */
  copy: boolean;
  onShow: (tool: Tool, el: HTMLElement) => void;
  onHide: () => void;
}) {
  const { use, href } = toolInfo(tool);
  const body =
    kind === "pill" ? (
      <ToolChip tool={tool} />
    ) : (
      <span className="tool-tile" style={{ ["--tool" as string]: tool.color }}>
        <ToolLogo tool={tool} size={30} />
        <span className="tool-tile-name mt-2.5 font-heading text-[13px] font-semibold whitespace-nowrap">
          {tool.name}
        </span>
      </span>
    );
  const events = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => onShow(tool, e.currentTarget),
    onMouseLeave: onHide,
    onFocus: (e: React.FocusEvent<HTMLElement>) => onShow(tool, e.currentTarget),
    onBlur: onHide,
  };
  const described = !copy && use ? <span className="sr-only">: {use}</span> : null;
  return (
    <li>
      {href ? (
        <a
          href={href}
          tabIndex={copy ? -1 : undefined}
          className="tool-item block rounded-2xl"
          {...events}
        >
          {body}
          {described}
        </a>
      ) : (
        <span className="tool-item block" {...events}>
          {body}
          {described}
        </span>
      )}
    </li>
  );
}

function Row({
  group,
  kind,
  caption,
  seconds,
  reverse,
  onShow,
  onHide,
}: {
  group: ToolGroup;
  kind: "pill" | "tile";
  caption: string;
  /** Seconds per item: the two rows run at different speeds. */
  seconds: number;
  /** true: content glides left to right. */
  reverse: boolean;
  onShow: (tool: Tool, el: HTMLElement) => void;
  onHide: () => void;
}) {
  const items = toolsInGroup(group);
  const loop = useLoopCopy();
  const list = (copy: boolean) => (
    <ul
      aria-hidden={copy || undefined}
      className={cn("flex shrink-0 items-center py-4", kind === "tile" ? "gap-4" : "gap-3")}
    >
      {items.map((t) => (
        <Item key={t.id} tool={t} kind={kind} copy={copy} onShow={onShow} onHide={onHide} />
      ))}
    </ul>
  );
  // Each group is its own panel: no-code on a light card, code on a dark navy card.
  const dark = kind === "tile";
  return (
    <div className={cn("tool-panel", dark ? "tool-panel-dark on-dark" : "tool-panel-light")}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 px-6 pt-6 sm:px-8 sm:pt-7">
        <div>
          <h3 className="font-heading text-[17px] font-semibold text-foreground">
            {toolGroups[group]}
          </h3>
          <p className="mt-0.5 text-[14px] text-muted-foreground">{caption}</p>
        </div>
        <span className="font-mono text-[12px] text-subtle">{items.length} tools</span>
      </div>
      <div className="marquee mt-2 pb-3 sm:pb-4">
        <div
          className={cn(
            "marquee-track",
            kind === "tile" && "is-tiles",
            reverse && "is-reverse",
            loop && "is-looping",
          )}
          style={{ ["--marquee-duration" as string]: `${items.length * seconds}s` }}
        >
          {list(false)}
          {loop && list(true)}
        </div>
      </div>
    </div>
  );
}

/** Floating card above the hovered / focused tool. Lives outside the clipped marquee. */
function ToolPopover({ hover }: { hover: Hover }) {
  if (!hover) return null;
  const { tool, x, y } = hover;
  const { use, count, href } = toolInfo(tool);
  return (
    <div
      role="tooltip"
      className="tool-popover pointer-events-none absolute z-20 w-[260px] rounded-2xl border border-border bg-panel p-4 text-left shadow-[0_24px_48px_-20px_rgba(11,18,36,0.45)]"
      style={{ left: x, top: y }}
    >
      <div className="flex items-center gap-2.5">
        <ToolLogo tool={tool} size={20} />
        <span className="font-heading text-[14.5px] font-semibold text-foreground">
          {tool.name}
        </span>
      </div>
      {use && <p className="mt-2 text-[13px] leading-snug text-muted-foreground">{use}</p>}
      {count > 0 && (
        <p className="mt-2.5 font-heading text-[12.5px] font-semibold text-eyebrow">
          Used in {count} {count === 1 ? "project" : "projects"}
          {href ? " · select to see them" : ""}
        </p>
      )}
    </div>
  );
}

/**
 * Tools: two separate panels, each a row moving the opposite way at its own speed (pure CSS).
 * No-code and AI platforms: a light card of brand-colour pills, left to right. Code and
 * infrastructure: a dark navy card of white tiles with a brand-colour top edge, right to left. Hovering or focusing a
 * tool pauses its row, bounces the tool and shows what I use it for, with a project count from
 * the generated project data where one exists. A pause button covers WCAG 2.2.2; static and
 * wrapped under reduced motion.
 */
export function TechMarquee({ tone }: { tone?: Tone }) {
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState<Hover>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef(0);

  const onShow = (tool: Tool, el: HTMLElement) => {
    window.clearTimeout(hideTimer.current);
    const area = areaRef.current;
    if (!area) return;
    const a = area.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const half = 130;
    const x = Math.min(Math.max(r.left + r.width / 2 - a.left, half + 8), a.width - half - 8);
    setHover({ tool, x, y: r.top - a.top - 10 });
  };
  const onHide = () => {
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setHover(null), 80);
  };
  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  return (
    <section
      aria-labelledby="stack-title"
      className={cn(
        "cv-auto py-16 [contain-intrinsic-size:auto_620px] md:py-24",
        tone && bandClass(tone),
      )}
    >
      <Container>
        <SectionHeading
          id="stack-title"
          align="center"
          title="The tools I build with"
          intro="No-code platforms when they are the fastest route. Real code when a project needs it."
        />
      </Container>
      <Container>
        <div
          ref={areaRef}
          data-reveal="up"
          data-delay="200"
          className={cn("relative", paused && "is-paused")}
        >
          <LazyMount className="min-h-[420px]">
            <div className="grid gap-5">
              <Row
                group="nocode"
                kind="pill"
                caption="For speed and flexibility"
                seconds={1.9}
                reverse
                onShow={onShow}
                onHide={onHide}
              />
              <Row
                group="code"
                kind="tile"
                caption="For scale and control"
                seconds={3.1}
                reverse={false}
                onShow={onShow}
                onHide={onHide}
              />
            </div>
          </LazyMount>
          <ToolPopover hover={hover} />
        </div>
      </Container>
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
