import { useEffect, useId, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, ChevronDown, Menu, X } from "lucide-react";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { Logo } from "./logo";
import { ButtonLink } from "./button-link";
import { ServiceIcon } from "./services";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home", match: (p: string) => p === "/" },
  {
    to: "/projects/",
    label: "Projects",
    match: (p: string) => p.startsWith("/projects") || p.startsWith("/case"),
  },
  { to: "/process/", label: "Process", match: (p: string) => p.startsWith("/process") },
  { to: "/about/", label: "About", match: (p: string) => p.startsWith("/about") },
  { to: "/contact/", label: "Contact", match: (p: string) => p.startsWith("/contact") },
] as const;

const linkClass = (active: boolean) =>
  cn(
    "relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 font-heading text-[13.5px] font-semibold transition-colors",
    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
  );

function ActiveBar() {
  return (
    <span
      aria-hidden
      className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--violet))]"
    />
  );
}

/**
 * Desktop Services mega-menu. Opens on hover (with a short intent delay) and on click /
 * Enter / Space / ArrowDown. Arrow keys move between services, Esc closes and returns focus,
 * clicking outside, tabbing away or navigating closes. Hidden menus are `visibility: hidden`,
 * so they're out of the tab order.
 */
function ServicesMenu({ active, pathname }: { active: boolean; pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number>(0);
  // How the menu was opened. Hovering opens it a moment before the click that usually follows;
  // that click must keep it open, not toggle it shut (the old "menu doesn't work" bug).
  const openedBy = useRef<"hover" | "other">("other");
  const menuId = useId();

  const items = () =>
    Array.from(wrapRef.current?.querySelectorAll<HTMLElement>("[data-menu-item]") ?? []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Any navigation (menu item, back/forward, another link) closes the menu.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const hoverOpen = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setOpen((o) => {
        if (!o) openedBy.current = "hover";
        return true;
      });
    }, 70);
  };
  const hoverClose = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 160);
  };

  const onTriggerClick = () => {
    window.clearTimeout(timer.current);
    if (open && openedBy.current === "hover") {
      openedBy.current = "other";
      return;
    }
    openedBy.current = "other";
    setOpen((o) => !o);
  };

  const onTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      openedBy.current = "other";
      setOpen(true);
      requestAnimationFrame(() => items()[0]?.focus());
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
    }
  };

  // Tabbing out of the menu (forwards or backwards) closes it.
  const onBlur = (e: React.FocusEvent) => {
    if (!wrapRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
  };

  const onMenuKey = (e: React.KeyboardEvent) => {
    const list = items();
    const i = list.indexOf(document.activeElement as HTMLElement);
    const move = (n: number) => {
      e.preventDefault();
      list[(n + list.length) % list.length]?.focus();
    };
    if (e.key === "ArrowDown" || e.key === "ArrowRight") move(i + 1);
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") move(i - 1);
    else if (e.key === "Home") move(0);
    else if (e.key === "End") move(list.length - 1);
    else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "Tab" && !e.shiftKey && i === list.length - 1) setOpen(false);
  };

  return (
    <li
      ref={wrapRef}
      className="relative"
      onMouseEnter={hoverOpen}
      onMouseLeave={hoverClose}
      onBlur={onBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={onTriggerClick}
        onKeyDown={onTriggerKey}
        className={cn(
          linkClass(active || open),
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        )}
      >
        Services
        <ChevronDown
          size={15}
          aria-hidden
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
        {active && <ActiveBar />}
      </button>

      <div
        id={menuId}
        onKeyDown={onMenuKey}
        className={cn(
          "mega-menu absolute top-full left-1/2 z-50 w-[720px] pt-3",
          open && "is-open",
        )}
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-panel shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
          <ul className="grid grid-cols-2 gap-1 p-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug/"
                  params={{ slug: s.slug }}
                  data-menu-item
                  onClick={() => setOpen(false)}
                  className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-panel-2 focus-visible:bg-panel-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                >
                  <ServiceIcon slug={s.slug} size="sm" />
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 font-heading text-[14px] font-semibold text-foreground">
                      {s.title}
                      <ArrowRight
                        size={13}
                        aria-hidden
                        className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </span>
                    <span className="mt-0.5 line-clamp-2 block text-[12.5px] leading-snug text-muted-foreground">
                      {s.tagline}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
            <li className="flex">
              <a
                href={site.calendly}
                data-menu-item
                className="flex w-full flex-col justify-center gap-1 rounded-xl bg-[linear-gradient(135deg,color-mix(in_oklab,var(--blue)_10%,transparent),color-mix(in_oklab,var(--violet)_12%,transparent))] p-3 transition-colors hover:bg-panel-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              >
                <span className="flex items-center gap-1.5 font-heading text-[14px] font-semibold text-foreground">
                  <CalendarClock size={15} aria-hidden className="text-eyebrow" /> Not sure which
                  fits?
                </span>
                <span className="text-[12.5px] leading-snug text-muted-foreground">
                  Book a 30-minute call. I'll tell you which service, if any, fits the problem.
                </span>
              </a>
            </li>
          </ul>
          <div className="flex items-center justify-between border-t border-border bg-panel-2/60 px-5 py-3">
            <span className="text-[12.5px] text-muted-foreground">
              Seven services, one engineer from first call to handover.
            </span>
            <Link
              to="/services/"
              data-menu-item
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1 rounded-md font-heading text-[13px] font-semibold text-eyebrow hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              View all services <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
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

  const path = pathname.replace(/\/+$/, "") || "/";
  const isActive = (match: (p: string) => boolean) => match(path);
  const servicesActive = path.startsWith("/services");

  return (
    <header
      className={cn(
        // Every page opens on a brand band, so the header is always on the dark tokens.
        "on-dark fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || open
          ? "border-b border-border bg-[rgba(9,14,40,0.9)] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)] backdrop-blur-md"
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
        <Link to="/" className="shrink-0 rounded-lg" aria-label="Abdullah Bukhari, home page">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          <li>
            <Link
              to="/"
              aria-current={isActive(links[0].match) ? "page" : undefined}
              className={linkClass(isActive(links[0].match))}
            >
              Home
              {isActive(links[0].match) && <ActiveBar />}
            </Link>
          </li>
          <ServicesMenu active={servicesActive} pathname={path} />
          {links.slice(1).map((l) => {
            const active = isActive(l.match);
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  aria-current={active ? "page" : undefined}
                  className={linkClass(active)}
                >
                  {l.label}
                  {active && <ActiveBar />}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ButtonLink to="/contact/" size="sm" className="hidden md:inline-flex">
            Discuss a Project <ArrowRight size={15} aria-hidden />
          </ButtonLink>
          <button
            ref={buttonRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-panel text-foreground lg:hidden"
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
        className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-border bg-background lg:hidden"
      >
        {/* Rendered only while open: keeps every page's initial DOM and hydration smaller.
            Any link inside closes it, even one to the page you're already on. */}
        {open && (
          <ul
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6 sm:px-6"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) setOpen(false);
            }}
          >
            <li>
              <Link
                to="/"
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3.5 font-heading text-lg font-semibold",
                  isActive(links[0].match) ? "bg-panel-2 text-foreground" : "text-muted-foreground",
                )}
              >
                Home
              </Link>
            </li>
            {/* Services accordion */}
            <li>
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="mobile-services"
                onClick={() => setServicesOpen((o) => !o)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-4 py-3.5 font-heading text-lg font-semibold",
                  servicesActive ? "bg-panel-2 text-foreground" : "text-muted-foreground",
                )}
              >
                Services
                <ChevronDown
                  size={20}
                  aria-hidden
                  className={cn("transition-transform", servicesOpen && "rotate-180")}
                />
              </button>
              <ul id="mobile-services" hidden={!servicesOpen} className="mt-1 space-y-1 pl-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to="/services/$slug/"
                      params={{ slug: s.slug }}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-foreground hover:bg-panel"
                    >
                      <ServiceIcon slug={s.slug} size="sm" />
                      <span className="font-heading text-[15px] font-semibold">{s.title}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/services/"
                    className="flex items-center gap-1 rounded-xl px-3 py-2.5 font-heading text-[15px] font-semibold text-eyebrow"
                  >
                    View all services <ArrowRight size={15} aria-hidden />
                  </Link>
                </li>
              </ul>
            </li>
            {links.slice(1).map((l) => {
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
              <ButtonLink to="/contact/" size="lg" className="w-full">
                Discuss a Project <ArrowRight size={16} aria-hidden />
              </ButtonLink>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
