import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { ButtonLink } from "./button-link";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home", match: (p: string) => p === "/" },
  { to: "/services", label: "Services", match: (p: string) => p.startsWith("/services") },
  {
    to: "/case-studies",
    label: "Case Studies",
    match: (p: string) => p.startsWith("/case-studies") || p.startsWith("/case/"),
  },
  { to: "/process", label: "Process", match: (p: string) => p.startsWith("/process") },
  { to: "/about", label: "About", match: (p: string) => p.startsWith("/about") },
  { to: "/contact", label: "Contact", match: (p: string) => p.startsWith("/contact") },
] as const;

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (match: (p: string) => boolean) => match(pathname.replace(/\/+$/, "") || "/");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-panel focus:px-4 focus:py-2 focus:text-sm focus:text-foreground"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link to="/" className="shrink-0 rounded-lg" aria-label="Syed Abdullah Bukhari — home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = isActive(l.match);
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 font-heading text-[13.5px] font-medium transition-colors",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l.label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--violet))]"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink to="/contact" size="sm" className="hidden md:inline-flex">
            Discuss a Project <ArrowRight size={15} aria-hidden />
          </ButtonLink>
          <button
            ref={buttonRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-panel/70 text-foreground lg:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6 sm:px-6">
          {links.map((l) => {
            const active = isActive(l.match);
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3.5 font-heading text-lg font-semibold transition-colors",
                    active
                      ? "bg-panel-2 text-foreground"
                      : "text-muted-foreground hover:bg-panel hover:text-foreground",
                  )}
                >
                  {l.label}
                  {active && <span aria-hidden className="h-2 w-2 rounded-full bg-cyan" />}
                </Link>
              </li>
            );
          })}
          <li className="mt-4">
            <ButtonLink to="/contact" size="lg" className="w-full">
              Discuss a Project <ArrowRight size={16} aria-hidden />
            </ButtonLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
