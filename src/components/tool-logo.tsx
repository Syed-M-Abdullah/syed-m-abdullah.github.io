import type { Tool } from "@/data/tools";
import { cn } from "@/lib/utils";
import { useToolSymbol } from "@/lib/tool-sprite";

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
  if (tool.svg) {
    // Official multi-colour mark: drawn as published, in its own colours.
    return (
      <span className="grid shrink-0 place-items-center">
        <svg
          aria-hidden
          viewBox={tool.svg.viewBox}
          width={size}
          height={size}
          {...(symbol ? {} : { dangerouslySetInnerHTML: { __html: tool.svg.body } })}
        >
          {symbol ? <use href={symbol} /> : null}
        </svg>
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
