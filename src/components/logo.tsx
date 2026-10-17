import abLogo from "@/assets/brand/ab-logo.webp";
import { cn } from "@/lib/utils";

/** The AB monogram (transparent cut of the official logo). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src={abLogo}
      width={179}
      height={120}
      alt=""
      decoding="async"
      className={cn(
        "h-9 w-auto shrink-0 object-contain drop-shadow-[0_4px_14px_rgba(59,130,246,0.35)] md:h-10",
        className,
      )}
    />
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-tight whitespace-nowrap text-foreground">
          Abdullah Bukhari
        </span>
        <span className="mt-1 hidden text-[11px] text-muted-foreground sm:block">
          AI Automation &amp; Software Engineer
        </span>
      </span>
    </span>
  );
}
