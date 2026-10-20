import avatar192 from "@/assets/portrait/photo-avatar-192.webp";
import cutout560 from "@/assets/portrait/cutout-560.webp";
import cutout880 from "@/assets/portrait/cutout-880.webp";
import cutout1254 from "@/assets/portrait/cutout-1254.webp";
import standing360 from "@/assets/portrait/standing-360.webp";
import standing560 from "@/assets/portrait/standing-560.webp";
import standing840 from "@/assets/portrait/standing-840.webp";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const ALT = `${site.name}, ${site.title}`;

const poses = {
  seated: {
    src: cutout880,
    srcSet: `${cutout560} 560w, ${cutout880} 880w, ${cutout1254} 1254w`,
    width: 880,
    height: 880,
  },
  standing: {
    src: standing560,
    srcSet: `${standing360} 360w, ${standing560} 560w, ${standing840} 840w`,
    width: 560,
    height: 840,
  },
};

/**
 * The background-removed photo standing in front of a layered brand card: a tilted back panel
 * for depth, a lit gradient card behind the figure, and the head and shoulders rising above the
 * card's top edge for a 3D look. Every layer sits behind the photo; nothing is drawn on it.
 */
export function PortraitStage({
  pose = "seated",
  className,
  sizes = "(min-width: 1024px) 420px, 80vw",
  priority = false,
}: {
  pose?: keyof typeof poses;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const p = poses[pose];
  return (
    <div className={cn("portrait-stage", `is-${pose}`, className)}>
      <div aria-hidden className="portrait-stage-back" />
      <div aria-hidden className="portrait-stage-card" />
      <img
        src={p.src}
        srcSet={p.srcSet}
        sizes={sizes}
        width={p.width}
        height={p.height}
        alt={ALT}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className="portrait-stage-img"
        draggable={false}
      />
    </div>
  );
}

/** Small round photo for name cards (the "Talk to Abdullah" card and the closing CTA). */
export function Avatar({ size = 56, className }: { size?: number; className?: string }) {
  return (
    <img
      src={avatar192}
      width={size}
      height={size}
      alt=""
      loading="lazy"
      decoding="async"
      className={cn("shrink-0 rounded-full border border-border object-cover", className)}
      style={{ width: size, height: size }}
    />
  );
}
