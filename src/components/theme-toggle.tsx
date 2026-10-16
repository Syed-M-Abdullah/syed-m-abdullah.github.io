import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, mounted, toggle } = useTheme();
  const isDark = !mounted || theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-panel/70 text-foreground transition hover:border-cyan/60 hover:text-cyan"
    >
      {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
    </button>
  );
}
