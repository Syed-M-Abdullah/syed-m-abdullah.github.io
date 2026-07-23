import { site } from "@/data/site";
import { Linkedin, Mail, Phone } from "lucide-react";
import logoAsset from "@/assets/slogo.png";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-panel/60 pt-20 pb-8">
      <div className="pointer-events-none absolute inset-x-0 -top-1/2 -z-10 h-[200%] circuit-bg opacity-40" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Your trusted partner
            </div>

            <div className="mt-2 font-display text-4xl font-extrabold leading-none tracking-tight text-foreground md:text-5xl">
            <img
  src={logoAsset}
  alt="Abdullah Bukhari"
  className="w-auto object-contain"
  style={{ height: "95px", marginLeft: "-10px" }}
/>
              <span>ABDULLAH</span>{" "}
              <span className="gradient-text">BUKHARI</span>
            </div>
            <div className="mt-3 font-heading text-xs uppercase tracking-[0.3em] text-blue">
              Build · Automate · Scale
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              AI systems and enterprise software that live in production. Remote-first from
              Multan, shipping to clients worldwide.
            </p>
          </div>

          <FooterCol
            title="Services"
            links={[
              { label: "AI Voice Agents", href: "#services" },
              { label: "Omnichannel Chatbots", href: "#services" },
              { label: "Automation Systems", href: "#services" },
              { label: "Enterprise Software", href: "#services" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "Case Studies", href: "#cases" },
              { label: "Process", href: "#process" },
              { label: "Tech Stack", href: "#stack" },
              { label: "Experience", href: "#experience" },
            ]}
          />
          <FooterCol
            title="Connect"
            links={[
              { label: "LinkedIn", href: site.linkedin, external: true },
              { label: "Fiverr", href: site.fiverr, external: true },
              { label: "Email", href: `mailto:${site.email}` },
              { label: "WhatsApp", href: `https://wa.me/${site.whatsapp}`, external: true }
            ]}
          />
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Syed Abdullah Bukhari · Pakistan · Remote worldwide</div>
          <div className="flex flex-wrap items-center gap-5">
            {/* <a href={`tel:${site.phone}`} className="flex items-center gap-2 hover:text-foreground">
              <Phone size={13} /> {site.phone}
            </a> */}
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground">
              {site.whatsapp}
            </a>
            {site.emails.map((e) => (
              <a key={e} href={`mailto:${e}`} className="flex items-center gap-2 hover:text-foreground">
                <Mail size={13} /> {e}
              </a>
            ))}
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground">
              <Linkedin size={13} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <div className="font-heading text-[11px] uppercase tracking-[0.2em] text-blue">
        {title}
      </div>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noreferrer" : undefined}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
