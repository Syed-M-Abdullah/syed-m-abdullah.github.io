import { cn } from "./utils";

export type Tone = "light" | "sage" | "brand";

/** Classes for a full-width band in the page rhythm (see "Section rhythm" in styles.css). */
export const bandClass = (tone: Tone, angle = false) =>
  cn("band", `tone-${tone}`, angle && "band-angle");
