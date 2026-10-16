import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; to?: "/" | "/services" | "/case-studies" | "/process" | "/about" };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted-foreground">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.label} className="flex items-center gap-1.5">
              {c.to && !last ? (
                <Link to={c.to} className="rounded transition hover:text-foreground">
                  {c.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={last ? "text-foreground" : undefined}
                >
                  {c.label}
                </span>
              )}
              {!last && <ChevronRight size={13} aria-hidden className="opacity-60" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
