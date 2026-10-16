import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold whitespace-nowrap transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  // One primary treatment across the whole site.
  primary:
    "text-white bg-[linear-gradient(110deg,#2563eb_0%,#4f46e5_55%,#7c3aed_100%)] shadow-[0_10px_30px_-12px_rgba(79,70,229,0.75),inset_0_1px_0_rgba(255,255,255,0.22)] hover:brightness-110 hover:shadow-[0_14px_36px_-12px_rgba(79,70,229,0.9),inset_0_1px_0_rgba(255,255,255,0.22)]",
  secondary:
    "border border-border bg-panel/60 text-foreground backdrop-blur hover:border-cyan/60 hover:bg-panel",
  ghost: "text-foreground hover:text-cyan",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(base, variants[variant], variant !== "ghost" && sizes[size], className);
}
