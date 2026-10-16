import cutout560 from "@/assets/portrait/cutout-560.webp";
import cutout880 from "@/assets/portrait/cutout-880.webp";
import cutout1254 from "@/assets/portrait/cutout-1254.webp";
import cutoutAvatar from "@/assets/portrait/cutout-avatar.webp";
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

/** Round avatar: cutout portrait on a soft accent backdrop. */
export function Avatar({ className, size = 56 }: { className?: string; size?: number }) {
  return (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_30%,#2a3b5c,#0d131b_70%)] ring-1 ring-white/10",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <img
        src={cutoutAvatar}
        width={size}
        height={size}
        alt={ALT}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </span>
  );
}
