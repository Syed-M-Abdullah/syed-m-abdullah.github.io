import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarClock, Globe2, Mic2, Timer } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { formatDuration, voiceSamples, type PlayableVoiceSample } from "@/data/voiceSamples";
import { site } from "@/data/site";
import { buttonClass } from "@/lib/button-class";
import { cn } from "@/lib/utils";
import { Container, SectionHeading } from "./section";

/* ------------------------------------------------------------------ shared audio graph */

// One AudioContext for the page; each <audio> gets one analyser (a media element can only be
// connected to a context once). Created lazily on the first play, which is a user gesture.
let audioCtx: AudioContext | null = null;
const analysers = new WeakMap<HTMLAudioElement, AnalyserNode>();

function analyserFor(audio: HTMLAudioElement): AnalyserNode | null {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    audioCtx ??= new Ctx();
    if (audioCtx.state === "suspended") void audioCtx.resume();
    let node = analysers.get(audio);
    if (!node) {
      const source = audioCtx.createMediaElementSource(audio);
      node = audioCtx.createAnalyser();
      node.fftSize = 256;
      node.smoothingTimeConstant = 0.8;
      source.connect(node);
      node.connect(audioCtx.destination);
      analysers.set(audio, node);
    }
    return node;
  } catch {
    return null;
  }
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Brand colours from the active theme's CSS variables (so light/dark both work). */
function themeColors() {
  const s = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) => s.getPropertyValue(name).trim() || fallback;
  return {
    cyan: v("--cyan", "#38bdf8"),
    blue: v("--blue", "#3b82f6"),
    violet: v("--violet", "#8b5cf6"),
    rest: document.documentElement.classList.contains("dark")
      ? "rgba(170, 182, 204, 0.28)"
      : "rgba(72, 83, 110, 0.28)",
  };
}

/** Real peaks, decoded from the file itself — used only for samples without pre-computed peaks. */
async function decodePeaks(src: string, bars = 120): Promise<number[]> {
  const buf = await (await fetch(src)).arrayBuffer();
  const ctx = new OfflineAudioContext(1, 1, 44100);
  const audio = await ctx.decodeAudioData(buf);
  const data = audio.getChannelData(0);
  const size = Math.floor(data.length / bars);
  const raw: number[] = [];
  for (let i = 0; i < bars; i++) {
    let sum = 0;
    for (let j = i * size; j < (i + 1) * size; j += 4) sum += data[j] * data[j];
    raw.push(Math.sqrt(sum / (size / 4)));
  }
  const max = Math.max(...raw) || 1;
  return raw.map((v) => Math.max(0.04, Math.sqrt(v / max)));
}

/* ------------------------------------------------------------------ player */

function VoicePlayer({
  sample,
  featured = false,
}: {
  sample: PlayableVoiceSample;
  featured?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveRef = useRef<HTMLCanvasElement>(null);
  const vizRef = useRef<HTMLCanvasElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const freqRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const draggingRef = useRef(false);
  const pendingSeekRef = useRef<number | null>(null);

  const [peaks, setPeaks] = useState<number[] | null>(sample.peaks ?? null);
  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(sample.duration);
  const [hoverX, setHoverX] = useState<number | null>(null);

  const timeRef = useRef(0);
  timeRef.current = time;
  const durationRef = useRef(duration);
  durationRef.current = duration;
  const hoverRef = useRef<number | null>(null);
  hoverRef.current = hoverX;

  /* ---- drawing */

  const drawWave = useCallback(() => {
    const canvas = waveRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const colors = themeColors();
    const source = peaks ?? [];
    const step = featured ? 4 : 3.5;
    const count = Math.max(24, Math.min(source.length || 96, Math.floor(w / step)));
    const barW = Math.max(1.5, w / count - 1.25);
    const values = Array.from({ length: count }, (_, i) => {
      if (!source.length) return 0.06;
      const a = Math.floor((i / count) * source.length);
      const b = Math.max(a + 1, Math.floor(((i + 1) / count) * source.length));
      let m = 0;
      for (let j = a; j < b; j++) m = Math.max(m, source[j]);
      return m;
    });

    const paint = (fill: string | CanvasGradient) => {
      ctx.fillStyle = fill;
      values.forEach((v, i) => {
        const bh = Math.max(2, v * (h - 4));
        const x = (i / count) * w;
        const y = (h - bh) / 2;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, bh, barW / 2);
        ctx.fill();
      });
    };

    paint(colors.rest);
    const progress = durationRef.current ? timeRef.current / durationRef.current : 0;
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, colors.cyan);
    grad.addColorStop(0.5, colors.blue);
    grad.addColorStop(1, colors.violet);
    if (hoverRef.current !== null && !draggingRef.current) {
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.rect(0, 0, hoverRef.current * w, h);
      ctx.clip();
      paint(grad);
      ctx.restore();
    }
    if (progress > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, progress * w, h);
      ctx.clip();
      paint(grad);
      ctx.restore();
    }
  }, [peaks, featured]);

  const drawViz = useCallback(
    (live: boolean) => {
      const canvas = vizRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      if (canvas.width !== Math.round(w * dpr)) canvas.width = Math.round(w * dpr);
      if (canvas.height !== Math.round(h * dpr)) canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      // Featured card: a wide "stage" with chunkier bars; other cards: a compact meter.
      const step = featured ? 9 : 6;
      const barW = featured ? 5 : 3;
      const bars = Math.floor(w / step);
      const colors = themeColors();
      let data: Uint8Array<ArrayBuffer> | null = null;
      const analyser = analyserRef.current;
      if (live && analyser) {
        // Reuse one buffer instead of allocating every frame.
        if (freqRef.current?.length !== analyser.frequencyBinCount)
          freqRef.current = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
        data = freqRef.current;
        analyser.getByteFrequencyData(data);
      }
      ctx.shadowColor = colors.cyan;
      ctx.shadowBlur = live ? 10 : 0;
      const grad = ctx.createLinearGradient(0, h, 0, 0);
      grad.addColorStop(0, colors.blue);
      grad.addColorStop(1, colors.cyan);
      ctx.fillStyle = live ? grad : colors.rest;
      for (let i = 0; i < bars; i++) {
        // Skip the very lowest bins (mostly rumble) and spread the voice range across the bars.
        // Voice energy sits in the lower half of the spectrum, so spread that range over the bars.
        const v = data
          ? data[Math.min(data.length - 1, 2 + Math.floor((i / bars) * (data.length * 0.5)))] / 255
          : 0.1 + 0.07 * Math.sin(i / 2.2);
        const bh = Math.max(3, v * h);
        ctx.beginPath();
        ctx.roundRect(i * step + (step - barW) / 2, (h - bh) / 2, barW, bh, barW / 2);
        ctx.fill();
      }
    },
    [featured],
  );

  /* ---- animation loop: only runs while this sample plays */

  const stopLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  }, []);

  const startLoop = useCallback(() => {
    stopLoop();
    const reduce = prefersReducedMotion();
    const tick = () => {
      const audio = audioRef.current;
      if (audio && !draggingRef.current) {
        timeRef.current = audio.currentTime;
        setTime(audio.currentTime);
      }
      drawWave();
      if (!reduce) drawViz(true);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [drawViz, drawWave, stopLoop]);

  useEffect(() => stopLoop, [stopLoop]);

  // Draw when the canvases get a size (the ResizeObserver also fires once the section is first
  // rendered — it's off-screen work skipped by content-visibility until then) and when the theme
  // actually flips. Draws are coalesced into one animation frame.
  useEffect(() => {
    let pending = 0;
    const redraw = () => {
      if (pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        drawWave();
        if (!rafRef.current) drawViz(false);
      });
    };
    const ro = new ResizeObserver(redraw);
    if (waveRef.current) ro.observe(waveRef.current);
    if (vizRef.current) ro.observe(vizRef.current);
    let dark = document.documentElement.classList.contains("dark");
    const mo = new MutationObserver(() => {
      const now = document.documentElement.classList.contains("dark");
      if (now !== dark) {
        dark = now;
        redraw();
      }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      cancelAnimationFrame(pending);
      ro.disconnect();
      mo.disconnect();
    };
  }, [drawViz, drawWave]);

  useEffect(() => {
    if (!rafRef.current) drawWave();
  }, [time, hoverX, drawWave]);

  /* ---- peaks fallback: decode lazily on first interaction */

  const ensurePeaks = useCallback(() => {
    if (peaks) return;
    decodePeaks(sample.src)
      .then(setPeaks)
      .catch(() => setPeaks(Array.from({ length: 96 }, () => 0.3)));
  }, [peaks, sample.src]);

  /* ---- playback */

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    ensurePeaks();
    if (audio.paused) {
      analyserRef.current = analyserFor(audio);
      setStarted(true);
      void audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [ensurePeaks]);

  const seekTo = useCallback((seconds: number) => {
    const audio = audioRef.current;
    const d = durationRef.current;
    const t = Math.max(0, Math.min(d, seconds));
    setTime(t);
    timeRef.current = t;
    if (!audio) return;
    if (audio.readyState >= 1) audio.currentTime = t;
    else {
      pendingSeekRef.current = t;
      audio.preload = "metadata";
      audio.load();
    }
    setStarted(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => {
      setPlaying(true);
      // Only one sample at a time.
      document.querySelectorAll<HTMLAudioElement>("audio[data-voice-sample]").forEach((a) => {
        if (a !== audio && !a.paused) a.pause();
      });
      startLoop();
    };
    const onPause = () => {
      setPlaying(false);
      setWaiting(false);
      stopLoop();
      drawWave();
      drawViz(false);
    };
    const onEnded = () => {
      onPause();
      setTime(0);
      timeRef.current = 0;
      audio.currentTime = 0;
      drawWave();
    };
    const onMeta = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) setDuration(audio.duration);
      if (pendingSeekRef.current !== null) {
        audio.currentTime = pendingSeekRef.current;
        pendingSeekRef.current = null;
      }
    };
    const onWaiting = () => setWaiting(true);
    const onPlaying = () => setWaiting(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
    };
  }, [drawViz, drawWave, startLoop, stopLoop]);

  /* ---- scrubbing: pointer + keyboard */

  const fractionAt = (clientX: number) => {
    const r = sliderRef.current?.getBoundingClientRect();
    if (!r || !r.width) return 0;
    return Math.max(0, Math.min(1, (clientX - r.left) / r.width));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    ensurePeaks();
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    seekTo(fractionAt(e.clientX) * durationRef.current);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const f = fractionAt(e.clientX);
    if (draggingRef.current) seekTo(f * durationRef.current);
    else if (e.pointerType === "mouse") setHoverX(f);
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onSliderKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const d = durationRef.current;
    const t = timeRef.current;
    const map: Record<string, number> = {
      ArrowRight: t + 5,
      ArrowUp: t + 5,
      ArrowLeft: t - 5,
      ArrowDown: t - 5,
      PageUp: t + d * 0.1,
      PageDown: t - d * 0.1,
      Home: 0,
      End: d - 0.5,
    };
    if (e.key in map) {
      e.preventDefault();
      seekTo(map[e.key]);
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle();
    }
  };

  const progress = duration ? time / duration : 0;
  const active = playing || started;

  return (
    <article
      className={cn(
        "voice-card group relative flex h-full flex-col overflow-hidden rounded-3xl p-5 transition-[box-shadow,transform] duration-500 sm:p-6",
        featured && "lg:p-8",
        playing && "is-playing",
      )}
      onPointerEnter={ensurePeaks}
    >
      <div aria-hidden className="voice-card-glow pointer-events-none absolute inset-0 -z-10" />
      <audio ref={audioRef} src={sample.src} preload="none" data-voice-sample="" aria-hidden />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-cyan">
            {sample.useCase}
          </p>
          <h3
            className={cn(
              "mt-2 font-heading font-bold leading-snug text-foreground",
              featured ? "text-2xl sm:text-[1.75rem]" : "text-lg",
            )}
          >
            {sample.title}
          </h3>
        </div>
        {!featured && (
          <canvas ref={vizRef} aria-hidden className="voice-viz h-8 w-[72px] shrink-0" />
        )}
      </div>

      {featured && sample.blurb && (
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          {sample.blurb}
        </p>
      )}

      <ul
        className="mt-4 flex flex-wrap gap-1.5 text-[12px] text-muted-foreground"
        aria-label="Sample details"
      >
        {sample.language && (
          <li className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-2.5 py-1">
            <Globe2 size={12} aria-hidden /> {sample.language}
          </li>
        )}
        <li className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-2.5 py-1">
          <Mic2 size={12} aria-hidden /> {sample.platform ?? "AI voice agent"}
        </li>
        <li className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-2.5 py-1">
          <Timer size={12} aria-hidden /> {formatDuration(sample.duration)}
        </li>
      </ul>

      {featured && (
        <div className="relative mt-8 flex-1">
          <canvas ref={vizRef} aria-hidden className="voice-viz h-full min-h-28 w-full" />
        </div>
      )}

      <div className={cn("mt-auto flex items-center gap-4", featured ? "pt-6" : "pt-6")}>
        <button
          type="button"
          onClick={toggle}
          aria-label={`${playing ? "Pause" : "Play"} ${sample.title} sample`}
          className={cn(
            "voice-play relative grid shrink-0 place-items-center rounded-full text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            featured ? "h-16 w-16" : "h-12 w-12",
            playing && "is-playing",
          )}
        >
          {waiting && (
            <span aria-hidden className="voice-play-spinner absolute -inset-1 rounded-full" />
          )}
          <span aria-hidden className={cn("voice-icon", featured ? "h-5 w-5" : "h-4 w-4")}>
            <span className="voice-icon-a" />
            <span className="voice-icon-b" />
          </span>
        </button>

        <div className="min-w-0 flex-1">
          <div
            ref={sliderRef}
            role="slider"
            tabIndex={0}
            aria-label={`Seek ${sample.title}`}
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(time)}
            aria-valuetext={`${formatDuration(time)} of ${formatDuration(duration)}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={() => setHoverX(null)}
            onKeyDown={onSliderKey}
            onFocus={ensurePeaks}
            className={cn(
              "voice-wave relative cursor-pointer touch-none rounded-lg outline-none",
              "focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-4 focus-visible:ring-offset-background",
              featured ? "h-20" : "h-12",
              !active && "is-idle",
            )}
          >
            <canvas ref={waveRef} aria-hidden className="block h-full w-full" />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[11px] tabular-nums text-subtle">
            <span>{formatDuration(time)}</span>
            <span>
              {progress > 0 ? "-" : ""}
              {formatDuration(duration - time)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
/* ------------------------------------------------------------------ section */

export function VoiceSamplesSection() {
  const [first, ...rest] = voiceSamples;
  if (!first) return null;
  return (
    <section
      id="voice-demos"
      aria-labelledby="voice-demos-title"
      className="cv-auto relative scroll-mt-24 py-20 md:py-28"
    >
      <div aria-hidden className="voice-section-bg pointer-events-none absolute inset-0 -z-10" />
      <Container>
        <SectionHeading
          id="voice-demos-title"
          eyebrow="Hear them live"
          title={
            <>
              Voice agents that <span className="gradient-text">sound human</span>
            </>
          }
          intro="Recordings of voice agents I've built, in conversation. Press play — one sample plays at a time, and nothing downloads until you do."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:row-span-2" data-reveal>
            <VoicePlayer sample={first} featured />
          </div>
          {rest.map((s) => (
            <div key={s.id} data-reveal>
              <VoicePlayer sample={s} />
            </div>
          ))}
          <div
            data-reveal
            className="voice-card relative flex flex-col justify-between overflow-hidden rounded-3xl p-6"
          >
            <div
              aria-hidden
              className="voice-card-glow pointer-events-none absolute inset-0 -z-10"
            />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-cyan">
                Your business next
              </p>
              <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-foreground">
                Want an agent like this answering your calls?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Booking, qualifying, follow-ups — connected to your calendar and CRM.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={site.calendly} className={buttonClass("primary", "md")}>
                <CalendarClock size={15} aria-hidden /> Book a call
              </a>
              <Link
                to="/services/$slug"
                params={{ slug: "voice-ai" }}
                className={buttonClass("secondary", "md")}
              >
                Voice AI service <ArrowRight size={15} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
