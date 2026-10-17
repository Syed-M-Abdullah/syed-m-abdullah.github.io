import cutout560 from "@/assets/portrait/cutout-560.webp";
import cutout880 from "@/assets/portrait/cutout-880.webp";
import cutout1254 from "@/assets/portrait/cutout-1254.webp";
import standing360 from "@/assets/portrait/standing-360.webp";
import standing560 from "@/assets/portrait/standing-560.webp";
import standing840 from "@/assets/portrait/standing-840.webp";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const ALT = `${site.name}, AI automation engineer`;

/** Background-removed portrait (transparent WebP), square. */
export function Portrait({
  className,
  sizes = "(min-width: 1024px) 560px, 90vw",
  priority = false,
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <img
      src={cutout880}
      srcSet={`${cutout560} 560w, ${cutout880} 880w, ${cutout1254} 1254w`}
      sizes={sizes}
      width={880}
      height={880}
      alt={ALT}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={cn("h-auto w-full select-none", className)}
      draggable={false}
    />
  );
}

/** Standing, arms-crossed photo (transparent WebP, 2:3) — used in the closing CTA band. */
export function PortraitStanding({
  className,
  sizes = "(min-width: 1024px) 340px, 300px",
}: {
  className?: string;
  sizes?: string;
}) {
  return (
    <img
      src={standing560}
      srcSet={`${standing360} 360w, ${standing560} 560w, ${standing840} 840w`}
      sizes={sizes}
      width={560}
      height={840}
      alt={ALT}
      loading="lazy"
      decoding="async"
      className={cn("h-auto w-full select-none", className)}
      draggable={false}
    />
  );
}
