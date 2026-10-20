import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold whitespace-nowrap transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  // One primary treatment across the whole site.
  primary:
    "text-white bg-[#2563eb] shadow-[0_8px_20px_-12px_rgba(37,99,235,0.9)] hover:bg-[#1d4ed8]",
  secondary: "border border-border bg-panel text-foreground hover:border-cyan/60",
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
