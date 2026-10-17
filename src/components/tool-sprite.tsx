import { useLayoutEffect, useReducer, useRef, type ReactNode } from "react";
import { tools } from "@/data/tools";
import { SpriteContext, toolSymbolId, type SpriteScope } from "@/lib/tool-sprite";

/** Every logo path used on the page, once, as <symbol>s (see lib/tool-sprite.ts). */
function ToolSprite({ scope }: { scope: SpriteScope }) {
  const [, redraw] = useReducer((n: number) => n + 1, 0);
  useLayoutEffect(() => {
    scope.redraw = redraw;
  }, [scope]);
  scope.drawn = new Set(scope.used);
  const list = tools.filter((t) => t.path && scope.used.has(t.id));
  if (!list.length) return null;
  return (
    <svg
      aria-hidden
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      {list.map((t) => (
        <symbol key={t.id} id={toolSymbolId(t.id)} viewBox="0 0 24 24">
          <path d={t.path} />
        </symbol>
      ))}
    </svg>
  );
}

/** Wraps a page: logos inside register themselves, and the sprite renders after them. */
export function ToolSpriteScope({ children }: { children: ReactNode }) {
  const ref = useRef<SpriteScope | null>(null);
  if (!ref.current) ref.current = { used: new Set(), drawn: new Set(), redraw: () => {} };
  return (
    <SpriteContext.Provider value={ref.current}>
      {children}
      <ToolSprite scope={ref.current} />
    </SpriteContext.Provider>
  );
}
