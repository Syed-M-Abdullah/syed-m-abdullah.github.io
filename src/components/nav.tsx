import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#cases", label: "Case Studies" },
  { href: "#stack", label: "Stack" },
  { href: "#book", label: "Book a Call" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-10">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>
        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-heading text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden shrink-0 items-center gap-2 rounded-full bg-blue px-5 py-2.5 font-heading text-[12px] font-semibold uppercase tracking-wider text-white shadow-[0_10px_30px_-10px_rgba(59,130,246,0.6)] transition hover:bg-blue-deep md:inline-flex"
          >
            Let's Build →
          </a>
          <button
            aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-panel lg:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur lg:hidden">
          <ul className="flex flex-col p-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 font-heading text-sm uppercase tracking-wider text-muted-foreground hover:bg-panel-2 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-blue px-4 py-3 text-center font-heading text-sm font-semibold text-white"
              >
                Let's Build →
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
