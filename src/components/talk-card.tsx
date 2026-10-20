import { CalendarClock } from "lucide-react";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { ButtonAnchor } from "./button-link";
import { WhatsAppIcon } from "./floating-actions";
import { Avatar } from "./portrait";

/** "Talk to Abdullah": the person behind the service, one step from a call. */
export function TalkCard({ className }: { className?: string }) {
  return (
    <aside
      aria-labelledby="talk-title"
      className={cn("panel-border rounded-3xl p-6 sm:p-7", className)}
    >
      <div className="flex items-center gap-4">
        <Avatar size={64} />
        <div>
          <h3 id="talk-title" className="text-lg font-bold text-foreground">
            Talk to Abdullah
          </h3>
          <p className="text-[13.5px] leading-snug text-muted-foreground">
            {site.name}, {site.title}
          </p>
        </div>
      </div>
      <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
        You speak with the engineer who will build it. Bring the process you want fixed.
      </p>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <ButtonAnchor href={site.calendly} external size="md">
          <CalendarClock size={15} aria-hidden /> Book a Call
        </ButtonAnchor>
        <ButtonAnchor href={whatsappLink()} external variant="secondary" size="md">
          <WhatsAppIcon className="h-[17px] w-[17px] text-[#25d366]" /> WhatsApp
        </ButtonAnchor>
      </div>
    </aside>
  );
}
