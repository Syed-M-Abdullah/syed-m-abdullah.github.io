import { createContext, useContext, useLayoutEffect } from "react";

/**
 * Tool logos appear many times per page (the marquee alone draws each one twice), and their SVG
 * paths are long. Inside a <ToolSpriteScope> (components/tool-sprite.tsx), every <ToolLogo>
 * registers its tool while rendering and draws `<use href="#tl-id">`; the scope then renders
 * each path once, in a hidden sprite after the page content. Render order is the same on the
 * server and the client, so the sprite hydrates cleanly. Outside a scope, logos draw inline.
 */
export type SpriteScope = {
  /** Tools registered by the logos rendered so far. */
  used: Set<string>;
  /** Tools the sprite has drawn. */
  drawn: Set<string>;
  /** Redraws the sprite (set by the sprite once it has mounted). */
  redraw: () => void;
};

export const SpriteContext = createContext<SpriteScope | null>(null);

export const toolSymbolId = (id: string) => `tl-${id}`;

/** Registers a tool for the sprite; returns the `<use>` href, or null without a scope. */
export function useToolSymbol(id: string): string | null {
  const scope = useContext(SpriteContext);
  scope?.used.add(id);
  // A logo that mounts after the sprite (a lazily mounted section, a filtered list) asks it to
  // draw the new symbol before the browser paints.
  useLayoutEffect(() => {
    if (scope && !scope.drawn.has(id)) scope.redraw();
  }, [scope, id]);
  return scope ? `#${toolSymbolId(id)}` : null;
}
