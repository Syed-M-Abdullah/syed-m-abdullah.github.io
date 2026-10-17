import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-eyebrow",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Small neutral tag for tools / technologies. */
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-panel-2/70 px-2.5 py-1 font-heading text-[11px] font-medium text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Category label (e.g. "Voice AI"). */
export function CategoryBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-[linear-gradient(110deg,color-mix(in_oklab,var(--blue)_22%,transparent),color-mix(in_oklab,var(--violet)_22%,transparent))] px-2.5 py-1 font-heading text-[11px] font-semibold text-foreground ring-1 ring-inset ring-[color-mix(in_oklab,var(--blue)_35%,transparent)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
