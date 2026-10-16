/**
 * Case-study screenshots wider than 900px also ship as an 800px copy ("<name>-800.webp", made
 * when the screenshot is added). Cards and gallery tiles use it via srcset, so browsers only
 * download the full-size file where it's actually shown large.
 */
export function shotSrcSet(shot: { src: string; width: number }): string | undefined {
  if (shot.width <= 900 || !shot.src.endsWith(".webp")) return undefined;
  return `${shot.src.replace(/\.webp$/, "-800.webp")} 800w, ${shot.src} ${shot.width}w`;
}
