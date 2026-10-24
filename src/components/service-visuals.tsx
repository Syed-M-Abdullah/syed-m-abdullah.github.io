import { useEffect, useRef, useState } from "react";
import {
  Activity,
  BarChart3,
  BellRing,
  Bot,
  CalendarCheck,
  Check,
  ContactRound,
  DatabaseBackup,
  Gauge,
  Lock,
  MessageCircle,
  MessageSquareText,
  PenLine,
  PhoneMissed,
  RefreshCw,
  Search,
  Sheet,
  ShieldCheck,
  Star,
  UserCheck,
  Webhook,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ServiceSlug } from "@/data/services";
import { getProject, type ProjectSummary } from "@/data/projects";
import { tools } from "@/data/tools";
import { useCountUp } from "@/lib/motion";
import { prefersReducedMotion } from "@/lib/motion-pref";
import { ToolLogo } from "./tool-logo";

/**
 * One hero animation per service — SVG/CSS only, decorative (aria-hidden), and static under
 * prefers-reduced-motion. Sample data inside the mockups is illustrative and labelled as such.
 */

function Panel({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[520px]">
      <div className="wf-panel on-dark relative overflow-hidden rounded-[1.75rem]">
        <div className="hero-visual-grid absolute inset-0 -z-10" />
        <div className="relative">{children}</div>
        {label && (
          <span className="absolute right-3 bottom-3 rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/60">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

/** White tool chips under a visual (the platforms the service is built on). */
function PlatformChips({ ids }: { ids: string[] }) {
  return (
    <div className="relative z-[2] flex flex-wrap justify-center gap-2 px-5 pb-11">
      {ids.map((id) => {
        const t = tools.find((x) => x.id === id);
        return t ? (
          <span
            key={id}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 font-heading text-[12.5px] font-semibold text-[#0b1224]"
          >
            <ToolLogo tool={t} size={18} /> {t.name}
          </span>
        ) : null;
      })}
    </div>
  );
}

/* ---- AI Voice Agents: orb with waveform rings + voice platforms */
const voicePlatforms = ["vapi", "elevenlabs", "synthflow"];
function VoiceVisual() {
  const bars = [0.45, 0.8, 0.6, 1, 0.7, 0.95, 0.55, 0.4];
  return (
    <Panel>
      <svg viewBox="0 0 520 360" className="block h-auto w-full">
        <defs>
          <radialGradient id="svc-orb" cx="38%" cy="32%" r="75%">
            <stop offset="0" stopColor="#7dd3fc" />
            <stop offset="0.45" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#6d28d9" />
          </radialGradient>
        </defs>
        {[90, 122, 154].map((r, i) => (
          <circle
            key={r}
            cx="260"
            cy="170"
            r={r}
            className="orb-ring"
            style={{ animationDelay: `${-i * 0.9}s` }}
          />
        ))}
        <circle cx="260" cy="170" r="80" className="orb-halo" />
        <circle cx="260" cy="170" r="62" fill="url(#svc-orb)" className="orb-core" />
        <ellipse cx="243" cy="148" rx="28" ry="15" fill="#fff" opacity="0.18" />
        {bars.map((h, i) => (
          <rect
            key={i}
            x={260 - 38 + i * 10}
            y={170 - 21}
            width="5"
            height="42"
            rx="2.5"
            fill="#fff"
            className="orb-bar"
            style={{ animationDelay: `${-i * 0.11}s`, ["--h" as string]: h }}
          />
        ))}
      </svg>
      <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white">
        <span className="hero-live-dot" /> Live call · AI receptionist
      </div>
      <PlatformChips ids={voicePlatforms} />
    </Panel>
  );
}

/* ---- Business Automation: node graph with data pulses. Each node draws its icon (the boxes
   used to hold only a coloured square, which read as missing icons). */
function WorkflowVisual() {
  const nodes: { x: number; y: number; label: string; color: string; Icon: LucideIcon }[] = [
    { x: 40, y: 150, label: "Webhook", color: "#ea4b71", Icon: Webhook },
    { x: 170, y: 150, label: "AI agent", color: "#7c3aed", Icon: Bot },
    { x: 300, y: 60, label: "CRM", color: "#2563eb", Icon: ContactRound },
    { x: 300, y: 150, label: "Sheets", color: "#16a34a", Icon: Sheet },
    { x: 300, y: 240, label: "Slack", color: "#d97706", Icon: MessageSquareText },
    { x: 430, y: 150, label: "Done", color: "#059669", Icon: Check },
  ];
  const edges = [
    "M100 150 L170 150",
    "M230 150 C 265 150, 265 60, 300 60",
    "M230 150 L300 150",
    "M230 150 C 265 150, 265 240, 300 240",
    "M360 60 C 395 60, 395 150, 430 150",
    "M360 150 L430 150",
    "M360 240 C 395 240, 395 150, 430 150",
  ];
  return (
    <Panel>
      <svg viewBox="0 0 520 320" className="block h-auto w-full">
        <defs>
          <linearGradient id="pulse-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        {edges.map((d, i) => (
          <g key={d}>
            <path d={d} className="flow-path" />
            <path d={d} className="flow-pulse" style={{ animationDelay: `${-(i % 4) * 0.45}s` }} />
          </g>
        ))}
        {nodes.map((n, i) => (
          <g key={n.label} className="flow-node" style={{ animationDelay: `${-i * 0.35}s` }}>
            <rect x={n.x} y={n.y - 30} width="60" height="60" rx="16" className="flow-node-box" />
            <rect x={n.x + 13} y={n.y - 17} width="34" height="34" rx="10" fill={n.color} />
            <n.Icon x={n.x + 21} y={n.y - 9} width={18} height={18} color="#fff" strokeWidth={2} />
            <text x={n.x + 30} y={n.y + 48} textAnchor="middle" className="flow-node-sub">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <PlatformChips ids={["n8n", "zapier", "make"]} />
    </Panel>
  );
}

/* ---- GoHighLevel & CRM: lead cards moving through pipeline stages */
/** Base counts per stage (illustrative); the cards currently in a stage are added live. */
const STAGE_BASE = [12, 8, 5, 3];
const CYCLE = 7.2; // seconds — matches .pipeline-card in styles.css
const OFFSET = 2.4; // each lead card is a third of a cycle ahead of the previous one

function stageCounts(seconds: number) {
  const counts = [...STAGE_BASE];
  for (let k = 0; k < 3; k++) {
    const p = ((((seconds + k * OFFSET) % CYCLE) + CYCLE) % CYCLE) / CYCLE;
    counts[p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3]++;
  }
  return counts;
}

/** Live stage counters, read from the first card's CSS animation clock so they stay in sync. */
function useStageCounts(track: React.RefObject<HTMLDivElement | null>) {
  const [counts, setCounts] = useState(() => stageCounts(0));
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      const anim = track.current?.querySelector(".pipeline-card")?.getAnimations()[0];
      const t = anim?.currentTime;
      if (typeof t !== "number") return;
      const next = stageCounts(t / 1000);
      setCounts((prev) => (prev.every((v, i) => v === next[i]) ? prev : next));
    }, 200);
    return () => window.clearInterval(id);
  }, [track]);
  return counts;
}

const automations = [
  { label: "Missed-Call Text-Back", sub: "Auto SMS to the caller", Icon: PhoneMissed },
  { label: "Booking Reminder", sub: "Before the appointment", Icon: BellRing },
  { label: "Review Request", sub: "After the visit", Icon: Star },
];

/* ---- GoHighLevel & CRM: lead cards move through the pipeline, counters update live, three
   automations fire in turn and the calendar ticks each time a lead is booked. */
function PipelineVisual() {
  const stages = ["New", "Contacted", "Booked", "Won"];
  const colors = ["#38bdf8", "#60a5fa", "#a78bfa", "#34d399"];
  const leads = [
    { name: "Café enquiry", tag: "Voice call" },
    { name: "Salon lead", tag: "Facebook ad" },
    { name: "Clinic lead", tag: "Web form" },
  ];
  const track = useRef<HTMLDivElement>(null);
  const counts = useStageCounts(track);
  return (
    <Panel label="Illustration">
      <div className="p-5 pb-10">
        <div className="grid grid-cols-4 gap-2">
          {stages.map((s, i) => (
            <div key={s} className="relative rounded-xl bg-white/5 px-2 py-2 text-center">
              <div className="font-heading text-[12px] font-semibold text-white">{s}</div>
              <div className="stat-value mt-0.5 font-heading text-[17px] font-bold text-white">
                {counts[i]}
              </div>
              <div
                className="mx-auto mt-1 h-1 w-8 rounded-full"
                style={{ background: colors[i] }}
              />
              {i === 2 && (
                <span className="ghl-tick">
                  <CalendarCheck size={12} strokeWidth={2.5} />
                </span>
              )}
            </div>
          ))}
        </div>
        <div ref={track} className="pipeline-track relative mt-3 h-[186px]">
          {stages.map((s) => (
            <div key={s} className="pipeline-col" />
          ))}
          {leads.map((l, i) => (
            <div
              key={l.name}
              className="pipeline-card"
              style={{ top: `${10 + i * 58}px`, animationDelay: `${-i * OFFSET}s` }}
            >
              <div className="rounded-lg bg-white px-2.5 py-2 shadow-lg">
                <div className="truncate font-heading text-[11.5px] font-semibold text-[#0b1224]">
                  {l.name}
                </div>
                <div className="truncate text-[10px] text-[#475069]">{l.tag}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {automations.map((a, i) => (
            <div
              key={a.label}
              className="ghl-auto relative rounded-xl border border-white/10 bg-white/5 p-2.5"
              style={{ animationDelay: `${[0, -4.8, -2.4][i]}s` }}
            >
              <span className="ghl-auto-icon">
                <a.Icon size={13} strokeWidth={2.3} />
              </span>
              <div className="mt-1.5 font-heading text-[11px] font-semibold leading-tight text-white">
                {a.label}
              </div>
              <div className="text-[10px] leading-tight text-[#95a2bc]">{a.sub}</div>
              <span className="ghl-auto-check" style={{ animationDelay: `${[0, -4.8, -2.4][i]}s` }}>
                <Check size={10} strokeWidth={3} /> Sent
              </span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ---- WhatsApp & Chat AI Agents: chat thread with typing indicator */
function ChatVisual() {
  const msgs = [
    { from: "user", text: "Hi, can I book a consultation for Saturday?" },
    { from: "bot", text: "Of course. I have 10:00 or 14:30 on Saturday. Which suits you?" },
    { from: "user", text: "14:30 please" },
    { from: "bot", text: "Booked for Saturday 14:30. A confirmation is on its way." },
  ];
  return (
    <Panel label="Illustration">
      <div className="px-5 pt-5 pb-7">
        <div className="mb-3 flex items-center gap-2.5 border-b border-white/10 pb-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#25d366] text-white">
            <MessageCircle size={14} />
          </span>
          <div>
            <div className="font-heading text-[13px] font-semibold text-white">AI assistant</div>
            <div className="text-[11px] text-[#34d399]">online</div>
          </div>
        </div>
        <div className="chat-thread flex flex-col gap-2">
          {msgs.map((m, i) => (
            <div key={m.text} className="contents">
              {m.from === "bot" && (
                <div className={`chat-typing chat-typing-${i}`}>
                  <span />
                  <span />
                  <span />
                </div>
              )}
              <div
                className={`chat-bubble chat-step-${i} ${m.from === "user" ? "is-user" : "is-bot"}`}
              >
                {m.text}
                {i === msgs.length - 1 && (
                  <Check size={12} className="ml-1 inline text-[#34d399]" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ---- Lead Generation: prospects drop through a narrowing funnel into booked calls */
const funnel = [
  { label: "Prospects found", top: 440, bottom: 360 },
  { label: "Enriched & verified", top: 352, bottom: 272 },
  { label: "Personalised outreach", top: 264, bottom: 184 },
  { label: "Replies", top: 176, bottom: 104 },
];
// Each dot starts somewhere across the top and falls to the layer where it drops out.
const drops = [
  { x0: -170, depth: 1 },
  { x0: 150, depth: 1 },
  { x0: -60, depth: 2 },
  { x0: 90, depth: 1 },
  { x0: -130, depth: 3 },
  { x0: 30, depth: 2 },
  { x0: 165, depth: 4 },
  { x0: -20, depth: 4 },
];
/** Where the leads come from: outbound, local and inbound channels into one funnel. */
const leadSources = ["Apollo.io", "LinkedIn", "Google Maps", "Website & ads"];
function LeadGenVisual() {
  const layerY = (i: number) => 26 + i * 66;
  return (
    <Panel label="Illustration">
      <ul className="flex flex-wrap justify-center gap-1.5 px-5 pt-5">
        {leadSources.map((src, i) => (
          <li
            key={src}
            className="lead-source rounded-full border border-white/15 bg-white/10 px-2.5 py-1 font-heading text-[11.5px] font-semibold text-white"
            style={{ "--i": i } as React.CSSProperties}
          >
            {src}
          </li>
        ))}
      </ul>
      <svg viewBox="0 0 520 300" className="block h-auto w-full">
        <defs>
          <linearGradient id="funnel-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.42" />
          </linearGradient>
        </defs>
        {funnel.map((f, i) => {
          const y = layerY(i);
          const pts = [
            [260 - f.top / 2, y],
            [260 + f.top / 2, y],
            [260 + f.bottom / 2, y + 58],
            [260 - f.bottom / 2, y + 58],
          ]
            .map((pt) => pt.join(","))
            .join(" ");
          return (
            <g key={f.label}>
              <polygon
                points={pts}
                fill="url(#funnel-grad)"
                stroke="rgba(165,180,252,0.35)"
                strokeWidth="1"
                className="funnel-layer"
                style={{ animationDelay: `${-i * 0.5}s` }}
              />
              <text x="260" y={y + 34} textAnchor="middle" className="flow-node-label">
                {f.label}
              </text>
            </g>
          );
        })}
        {drops.map((d, i) => (
          <circle
            key={i}
            cx="260"
            cy="16"
            r="4.5"
            className="funnel-drop"
            style={
              {
                "--x0": `${d.x0}px`,
                "--x1": `${Math.round(d.x0 * (1 - d.depth * 0.22))}px`,
                "--y1": `${d.depth * 66}px`,
                animationDelay: `${-i * 0.55}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </svg>
      <div className="flex justify-center px-5 pt-1 pb-6">
        <span className="funnel-booked inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-heading text-[13px] font-semibold text-[#0b1224]">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#10b981] text-white">
            <CalendarCheck size={13} />
          </span>
          Booked calls in your calendar
        </span>
      </div>
    </Panel>
  );
}

/* ---- AI Content: Research → Draft → Review → SEO → Publish to WordPress */
function ContentVisual() {
  const wp = tools.find((t) => t.id === "wordpress");
  const stepsList = [
    { label: "Research", icon: <Search size={15} strokeWidth={2.3} /> },
    { label: "Draft", icon: <PenLine size={15} strokeWidth={2.3} /> },
    { label: "Review", icon: <UserCheck size={15} strokeWidth={2.3} /> },
    { label: "SEO", icon: <BarChart3 size={15} strokeWidth={2.3} /> },
    {
      label: "Publish",
      icon: wp ? (
        <span className="grid h-[22px] w-[22px] place-items-center rounded-full bg-white">
          <ToolLogo tool={wp} size={20} />
        </span>
      ) : null,
    },
  ];
  return (
    <Panel label="Illustration">
      <div className="p-5 pb-10 sm:p-6 sm:pb-11">
        {/* the article taking shape */}
        <div className="rounded-2xl bg-white p-4 text-[#0b1224] shadow-[0_20px_40px_-24px_rgba(0,0,0,0.7)]">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#5c667f]">
              Blog post
            </span>
            <span className="relative h-6 w-[124px]">
              <span className="cs-badge-a absolute inset-0 inline-flex items-center justify-center rounded-full bg-[#fef3c7] font-heading text-[11px] font-semibold text-[#92400e]">
                Awaiting review
              </span>
              <span className="cs-badge-b absolute inset-0 inline-flex items-center justify-center gap-1 rounded-full bg-[#d1fae5] font-heading text-[11px] font-semibold text-[#065f46]">
                <Check size={11} strokeWidth={3} /> Published
              </span>
            </span>
          </div>
          <div className="mt-3 flex gap-3">
            <span className="cs-image h-[74px] w-[96px] shrink-0 rounded-xl" />
            <span className="flex flex-1 flex-col justify-center gap-2">
              <span className="cs-line h-2.5 w-[88%] rounded-full bg-[#0b1224]" />
              <span
                className="cs-line h-2 w-full rounded-full bg-[#cbd2e0]"
                style={{ animationDelay: "0.3s" }}
              />
              <span
                className="cs-line h-2 w-[92%] rounded-full bg-[#cbd2e0]"
                style={{ animationDelay: "0.6s" }}
              />
              <span
                className="cs-line h-2 w-[64%] rounded-full bg-[#cbd2e0]"
                style={{ animationDelay: "0.9s" }}
              />
            </span>
          </div>
        </div>

        {/* stepper: steps light in order while a pulse runs along the line */}
        <ol className="relative mt-6 grid grid-cols-5">
          <span className="cs-line-track">
            <span className="cs-pulse-track">
              <span className="cs-pulse" />
            </span>
          </span>
          {stepsList.map((st, i) => (
            <li
              key={st.label}
              className="relative flex flex-col items-center gap-2"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="wf-node">{st.icon}</span>
              <span className="font-heading text-[12px] font-semibold text-white">{st.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </Panel>
  );
}

/* ---- Custom ERP/POS & Web: dashboard with bars, counters and rows sliding in */
function Counter({ to, prefix = "" }: { to: number; prefix?: string }) {
  const { ref, value } = useCountUp(to, 1800);
  return (
    <span ref={ref as React.Ref<HTMLSpanElement>} className="stat-value">
      {prefix}
      {value.toLocaleString("en-US")}
    </span>
  );
}
function DashboardVisual() {
  const bars = [0.42, 0.58, 0.5, 0.72, 0.64, 0.86, 0.78];
  const rows = [
    ["INV-1042", "Table 7", "Paid"],
    ["INV-1043", "Takeaway", "Paid"],
    ["INV-1044", "Table 2", "Open"],
  ];
  return (
    <Panel label="Illustration">
      <div className="p-5">
        <div className="grid grid-cols-3 gap-2">
          {[
            ["Sales today", 128, ""],
            ["Invoices", 342, ""],
            ["Low stock", 6, ""],
          ].map(([label, n]) => (
            <div key={label as string} className="rounded-xl bg-white/5 p-3">
              <div className="text-[10.5px] text-[#95a2bc]">{label}</div>
              <div className="mt-1 font-heading text-xl font-bold text-white">
                <Counter to={n as number} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex h-[96px] items-end gap-2 rounded-xl bg-white/5 px-3 pt-3 pb-2">
          {bars.map((h, i) => (
            <span
              key={i}
              className="dash-bar flex-1 rounded-t-md bg-[linear-gradient(180deg,#60a5fa,#7c3aed)]"
              style={{ height: `${h * 100}%`, animationDelay: `${-i * 0.12}s` }}
            />
          ))}
        </div>
        <div className="mt-3 space-y-1.5">
          {rows.map((r, i) => (
            <div
              key={r[0]}
              className="dash-row flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-[11.5px] text-[#b4bfd4]"
              style={{ animationDelay: `${0.5 + i * 0.25}s` }}
            >
              <span className="font-mono text-white">{r[0]}</span>
              <span>{r[1]}</span>
              <span className={r[2] === "Paid" ? "text-[#34d399]" : "text-[#fbbf24]"}>{r[2]}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ---- Website Development: a page assembles itself in the browser, then an enquiry is
   delivered to the CRM. Illustration only: no client data, no numbers. */
function WebsiteVisual() {
  const bar = (w: string, c = "#cbd2e0", h = "h-2") => (
    <span className={`block ${h} rounded-full`} style={{ width: w, background: c }} />
  );
  return (
    <Panel label="Illustration">
      <div className="p-5 pb-11">
        <div className="overflow-hidden rounded-xl bg-white shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-1.5 border-b border-[#e5e7eb] bg-[#f3f4f6] px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
            <span className="ml-3 flex flex-1 items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-[10.5px] text-[#475069]">
              <Lock size={10} strokeWidth={2.5} /> yourbusiness.com
            </span>
          </div>
          <div className="relative space-y-4 p-4">
            <div
              className="web-el flex items-center justify-between"
              style={{ "--d": 0 } as React.CSSProperties}
            >
              <span className="block h-3 w-14 rounded bg-[#0b1224]" />
              <span className="flex items-center gap-2.5">
                {bar("26px")}
                {bar("26px")}
                {bar("26px")}
                <span className="block h-5 w-14 rounded-full bg-[#2563eb]" />
              </span>
            </div>
            <div className="web-el space-y-2" style={{ "--d": 1 } as React.CSSProperties}>
              {bar("78%", "#0b1224", "h-3.5")}
              {bar("56%", "#0b1224", "h-3.5")}
              {bar("68%")}
              <span className="flex gap-2 pt-1.5">
                <span className="block h-6 w-20 rounded-full bg-[#2563eb]" />
                <span className="block h-6 w-16 rounded-full border border-[#cbd2e0]" />
              </span>
            </div>
            <div
              className="web-el grid grid-cols-3 gap-2"
              style={{ "--d": 2 } as React.CSSProperties}
            >
              {[0, 1, 2].map((i) => (
                <span key={i} className="block space-y-1.5 rounded-lg border border-[#eef0f4] p-2">
                  <span className="web-img block h-9 rounded-md" />
                  {bar("80%", "#94a3b8", "h-1.5")}
                  {bar("60%", "#cbd2e0", "h-1.5")}
                </span>
              ))}
            </div>
            <div className="web-el flex gap-2" style={{ "--d": 3 } as React.CSSProperties}>
              <span className="block h-7 flex-1 rounded-md border border-[#cbd2e0]" />
              <span className="flex h-7 items-center rounded-md bg-[#0b1224] px-3 text-[10.5px] font-semibold text-white">
                Send enquiry
              </span>
            </div>
            <div className="web-toast absolute right-3 bottom-3 flex items-center gap-2 rounded-lg bg-[#0b1224] px-3 py-2 text-[11px] font-semibold text-white shadow-lg">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-[#10b981]">
                <Check size={10} strokeWidth={3} />
              </span>
              New enquiry sent to your CRM
            </div>
          </div>
        </div>
      </div>
      <PlatformChips ids={["react", "wordpress", "aspnetcore"]} />
    </Panel>
  );
}

/* ---- Mobile Apps: one React Native app on two phones. The order flow follows a real project
   (orders saved offline, synced when the signal returns); the order lines are illustrative. */
const orderLines = [
  ["Bottled water, 24-pack", "× 4"],
  ["Cleaning supplies", "× 2"],
  ["Office paper, A4", "× 10"],
];
function MobileVisual() {
  return (
    <Panel label="Illustration">
      <div className="relative flex justify-center px-5 pt-7 pb-10">
        {/* second phone behind: the same app on Android */}
        <div
          aria-hidden
          className="absolute top-12 left-[calc(50%-150px)] h-[240px] w-[160px] -rotate-[8deg] rounded-[1.8rem] border-[5px] border-[#1e293b] bg-[#e2e8f0] opacity-80 shadow-xl"
        >
          <div className="space-y-2 p-4 pt-7">
            <span className="block h-2.5 w-16 rounded-full bg-[#94a3b8]" />
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-7 rounded-lg bg-white" />
            ))}
          </div>
        </div>
        <div className="relative z-[1] w-[210px] rounded-[2rem] border-[6px] border-[#0b1224] bg-white shadow-[0_30px_60px_-24px_rgba(0,0,0,0.85)]">
          <div className="absolute top-0 left-1/2 h-4 w-20 -translate-x-1/2 rounded-b-xl bg-[#0b1224]" />
          <div className="px-3.5 pt-7 pb-4 text-[#0b1224]">
            <div className="flex items-center justify-between">
              <span className="font-heading text-[13.5px] font-bold">New order</span>
              <span className="relative h-5 w-[86px]">
                <span className="app-offline absolute inset-0 inline-flex items-center justify-center gap-1 rounded-full bg-[#fef3c7] text-[9.5px] font-semibold text-[#92400e]">
                  <WifiOff size={10} strokeWidth={2.5} /> Saved offline
                </span>
                <span className="app-synced absolute inset-0 inline-flex items-center justify-center gap-1 rounded-full bg-[#d1fae5] text-[9.5px] font-semibold text-[#065f46]">
                  <Check size={10} strokeWidth={3} /> Synced
                </span>
              </span>
            </div>
            <ul className="mt-3 space-y-2">
              {orderLines.map(([name, qty], i) => (
                <li
                  key={name}
                  className="app-row flex items-center justify-between rounded-lg bg-[#f3f4f6] px-2.5 py-2 text-[10.5px]"
                  style={{ "--d": i } as React.CSSProperties}
                >
                  <span className="truncate">{name}</span>
                  <span className="font-semibold">{qty}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 rounded-lg bg-[#2563eb] py-2 text-center text-[11px] font-semibold text-white">
              Save order
            </div>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#cbd2e0]" />
          </div>
        </div>
      </div>
      <PlatformChips ids={["reactnative", "typescript", "firebase"]} />
    </Panel>
  );
}

/* ---- Website Care: this month's checks tick off one by one while the site stays online. */
const careChecks: { label: string; status: string; Icon: LucideIcon }[] = [
  { label: "Uptime monitoring", status: "Online", Icon: Activity },
  { label: "Daily backup", status: "Completed", Icon: DatabaseBackup },
  { label: "Security scan", status: "No issues", Icon: ShieldCheck },
  { label: "Updates", status: "Tested and applied", Icon: RefreshCw },
  { label: "Speed check", status: "Passed", Icon: Gauge },
];
function MaintenanceVisual() {
  return (
    <Panel label="Illustration">
      <div className="p-5 pb-11">
        <div className="relative overflow-hidden rounded-2xl bg-white p-4 text-[#0b1224] shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)]">
          <span aria-hidden className="care-scan" />
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-[#5c667f] uppercase">
              Website care · this month
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#047857]">
              <span className="hero-live-dot" /> Online
            </span>
          </div>
          <ul className="mt-2 divide-y divide-[#eef0f4]">
            {careChecks.map((c, i) => (
              <li
                key={c.label}
                className="flex items-center justify-between gap-3 py-2.5 text-[12.5px]"
              >
                <span className="flex items-center gap-2 text-[#334155]">
                  <c.Icon size={14} strokeWidth={2.2} /> {c.label}
                </span>
                <span
                  className="care-check inline-flex items-center gap-1 rounded-full bg-[#d1fae5] px-2 py-0.5 text-[10.5px] font-semibold text-[#065f46]"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <Check size={10} strokeWidth={3} /> {c.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="care-report mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-[12px] text-white">
          <span>Monthly report</span>
          <span className="inline-flex items-center gap-1 font-semibold text-[#34d399]">
            <Check size={12} strokeWidth={3} /> Sent
          </span>
        </div>
      </div>
      <PlatformChips ids={["wordpress", "react", "aspnetcore"]} />
    </Panel>
  );
}

/* ---- Custom Software: real screens from two delivered systems (not a mock dashboard). */
const screenSlugs = ["restaurant-pos-zatca-integrated", "hisabdaar"];
function ScreensVisual() {
  const shots = screenSlugs
    .map((s) => getProject(s))
    .filter((p): p is ProjectSummary => !!p?.cover);
  if (!shots.length) return <DashboardVisual />;
  const [main, second] = shots;
  return (
    <figure className="relative mx-auto w-full max-w-[540px] pb-14 sm:pb-16">
      <Link
        to="/projects/$slug/"
        params={{ slug: main.slug }}
        className="block overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]"
      >
        <img
          src={main.cover!.src}
          srcSet={main.cover!.srcSet}
          sizes="(min-width: 1024px) 540px, 92vw"
          alt={main.cover!.alt}
          width={main.cover!.width}
          height={main.cover!.height}
          fetchPriority="high"
          className="aspect-[16/10] w-full object-cover object-top"
        />
      </Link>
      {second && (
        <Link
          to="/projects/$slug/"
          params={{ slug: second.slug }}
          className="absolute right-[-4%] bottom-0 block w-[56%] overflow-hidden rounded-xl border border-white/20 bg-white shadow-[0_24px_50px_-24px_rgba(0,0,0,0.85)]"
        >
          <img
            src={second.cover!.src}
            srcSet={second.cover!.srcSet}
            sizes="(min-width: 1024px) 300px, 50vw"
            alt={second.cover!.alt}
            width={second.cover!.width}
            height={second.cover!.height}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </Link>
      )}
      <figcaption className="absolute bottom-0 left-0 max-w-[40%] text-[12.5px] leading-snug text-muted-foreground">
        Real screens: {main.title}
        {second ? ` and ${second.title}` : ""}
      </figcaption>
    </figure>
  );
}

export function ServiceVisual({ slug }: { slug: ServiceSlug }) {
  switch (slug) {
    case "voice-ai":
      return <VoiceVisual />;
    case "workflow-automation":
      return <WorkflowVisual />;
    case "gohighlevel-automation":
      return <PipelineVisual />;
    case "lead-generation":
      return <LeadGenVisual />;
    case "ai-content-automation":
      return <ContentVisual />;
    case "ai-chatbots":
      return <ChatVisual />;
    case "custom-software":
      return <ScreensVisual />;
    case "website-development":
      return <WebsiteVisual />;
    case "mobile-app-development":
      return <MobileVisual />;
    case "website-maintenance":
      return <MaintenanceVisual />;
    default:
      return null;
  }
}
