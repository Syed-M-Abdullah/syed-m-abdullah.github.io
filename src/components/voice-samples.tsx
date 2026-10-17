import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarClock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { formatDuration, voiceSamples, type PlayableVoiceSample } from "@/data/voiceSamples";
import { site } from "@/data/site";
import { buttonClass } from "@/lib/button-class";
import { cn } from "@/lib/utils";
import { Container, SectionHeading } from "./section";
import { bandClass, type Tone } from "@/lib/band";
import { LazyMount } from "./lazy-mount";
import { prefersReducedMotion } from "@/lib/motion-pref";

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
      node.fftSize = 64;
      node.smoothingTimeConstant = 0.78;
      source.connect(node);
      node.connect(audioCtx.destination);
      analysers.set(audio, node);
    }
    return node;
  } catch {
    return null;
  }
}

/** Brand colours from the theme tokens in scope (rows also sit on dark brand bands). */
function brandColors(el: Element) {
  const s = getComputedStyle(el);
  const v = (name: string, fallback: string) => s.getPropertyValue(name).trim() || fallback;
  const fg = v("--foreground", "#0b1224");
  const onDark = /^#[0-9a-f]{6}$/i.test(fg) && parseInt(fg.slice(1, 3), 16) > 160;
  return {
    cyan: v("--cyan", "#0369a1"),
    blue: v("--blue", "#2563eb"),
    violet: v("--violet", "#7c3aed"),
    rest: onDark ? "rgba(245, 247, 255, 0.24)" : "rgba(11, 18, 36, 0.2)",
  };
}

/** Real peaks, decoded from the file itself — only for samples without pre-computed peaks. */
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

/* ------------------------------------------------------------------ compact player row */

/**
 * One sample as a compact row (~80px): play button · title + use case · waveform · time.
 * Waveform scrubbing by click/drag/keys, live mini meter while playing, nothing downloaded
 * until play (preload="none").
 */
function VoiceRow({ sample }: { sample: PlayableVoiceSample }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveRef = useRef<HTMLCanvasElement>(null);
  const meterRef = useRef<HTMLCanvasElement>(null);
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

  const fit = (canvas: HTMLCanvasElement) => {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return null;
    if (canvas.width !== Math.round(w * dpr)) canvas.width = Math.round(w * dpr);
    if (canvas.height !== Math.round(h * dpr)) canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    return { ctx, w, h };
  };

  const drawWave = useCallback(() => {
    const canvas = waveRef.current;
    if (!canvas) return;
    const f = fit(canvas);
    if (!f) return;
    const { ctx, w, h } = f;
    const colors = brandColors(canvas);
    const source = peaks ?? [];
    const count = Math.max(24, Math.min(source.length || 80, Math.floor(w / 3.5)));
    const barW = Math.max(1.5, w / count - 1.25);
    const values = Array.from({ length: count }, (_, i) => {
      if (!source.length) return 0.08;
      const a = Math.floor((i / count) * source.length);
      const b = Math.max(a + 1, Math.floor(((i + 1) / count) * source.length));
      let m = 0;
      for (let j = a; j < b; j++) m = Math.max(m, source[j]);
      return m;
    });
    const paint = (fill: string | CanvasGradient) => {
      ctx.fillStyle = fill;
      values.forEach((v, i) => {
        const bh = Math.max(2, v * (h - 2));
        ctx.beginPath();
        ctx.roundRect((i / count) * w, (h - bh) / 2, barW, bh, barW / 2);
        ctx.fill();
      });
    };
    paint(colors.rest);
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
    const progress = durationRef.current ? timeRef.current / durationRef.current : 0;
    if (progress > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, progress * w, h);
      ctx.clip();
      paint(grad);
      ctx.restore();
    }
  }, [peaks]);

  const drawMeter = useCallback((live: boolean) => {
    const canvas = meterRef.current;
    if (!canvas) return;
    const f = fit(canvas);
    if (!f) return;
    const { ctx, w, h } = f;
    const colors = brandColors(canvas);
    const analyser = analyserRef.current;
    let data: Uint8Array<ArrayBuffer> | null = null;
    if (live && analyser) {
      if (freqRef.current?.length !== analyser.frequencyBinCount)
        freqRef.current = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
      data = freqRef.current;
      analyser.getByteFrequencyData(data);
    }
    ctx.fillStyle = live ? colors.blue : colors.rest;
    for (let i = 0; i < 4; i++) {
      const v = data ? data[2 + i * 3] / 255 : 0.25;
      const bh = Math.max(2, v * h);
      ctx.beginPath();
      ctx.roundRect(i * 5, h - bh, 3, bh, 1.5);
      ctx.fill();
    }
  }, []);

  /* ---- animation loop: only while this sample plays */

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
      if (!reduce) drawMeter(true);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [drawMeter, drawWave, stopLoop]);

  useEffect(() => stopLoop, [stopLoop]);

  // Draw once the canvases get a size (also fires when an off-screen section first renders).
  useEffect(() => {
    let pending = 0;
    const redraw = () => {
      if (pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        drawWave();
        if (!rafRef.current) drawMeter(false);
      });
    };
    const ro = new ResizeObserver(redraw);
    if (waveRef.current) ro.observe(waveRef.current);
    return () => {
      cancelAnimationFrame(pending);
      ro.disconnect();
    };
  }, [drawMeter, drawWave]);

  useEffect(() => {
    if (!rafRef.current) drawWave();
  }, [time, hoverX, drawWave]);

  /* ---- peaks fallback: decode lazily on first interaction */

  const ensurePeaks = useCallback(() => {
    if (peaks) return;
    decodePeaks(sample.src)
      .then(setPeaks)
      .catch(() => setPeaks(Array.from({ length: 80 }, () => 0.3)));
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
    const t = Math.max(0, Math.min(durationRef.current, seconds));
    setTime(t);
    timeRef.current = t;
    setStarted(true);
    if (!audio) return;
    if (audio.readyState >= 1) audio.currentTime = t;
    else {
      pendingSeekRef.current = t;
      audio.preload = "metadata";
      audio.load();
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => {
      setPlaying(true);
      // Only one sample at a time, across every player on the page.
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
      drawMeter(false);
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
  }, [drawMeter, drawWave, startLoop, stopLoop]);

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

  const meta = [sample.useCase, sample.language].filter(Boolean).join(" · ");

  return (
    <article
      className={cn("voice-row group relative rounded-2xl", playing && "is-playing")}
      onPointerEnter={ensurePeaks}
    >
      <audio ref={audioRef} src={sample.src} preload="none" data-voice-sample="" aria-hidden />
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3 py-3.5 sm:gap-4 sm:px-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={`${playing ? "Pause" : "Play"} ${sample.title} sample`}
          className={cn(
            "voice-play relative grid h-11 w-11 shrink-0 place-items-center rounded-full text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            playing && "is-playing",
          )}
        >
          {waiting && (
            <span aria-hidden className="voice-play-spinner absolute -inset-1 rounded-full" />
          )}
          <span aria-hidden className="voice-icon h-3.5 w-3.5">
            <span className="voice-icon-a" />
            <span className="voice-icon-b" />
          </span>
        </button>

        <div className="grid min-w-0 gap-1.5 sm:grid-cols-[minmax(0,15.5rem)_minmax(0,1fr)] sm:items-center sm:gap-4">
          <div className="min-w-0">
            <p className="truncate font-heading text-[14.5px] font-semibold text-foreground">
              {sample.title}
            </p>
            <p className="flex min-w-0 items-center gap-1.5 text-[12.5px] text-muted-foreground">
              {sample.featured && (
                <span className="shrink-0 rounded-full bg-[linear-gradient(110deg,#2563eb,#7c3aed)] px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide text-white">
                  Featured
                </span>
              )}
              <span className="truncate">{meta}</span>
            </p>
          </div>
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
              "voice-wave relative h-7 cursor-pointer touch-none rounded-md outline-none sm:h-9",
              "focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-panel",
              !started && "is-idle",
            )}
          >
            <canvas ref={waveRef} aria-hidden className="block h-full w-full" />
          </div>
        </div>

        <div className="flex w-12 flex-col items-end gap-1">
          <canvas
            ref={meterRef}
            aria-hidden
            className={cn(
              "h-3.5 w-[18px] transition-opacity",
              playing ? "opacity-100" : "opacity-0",
            )}
          />
          <span className="font-mono text-[11.5px] tabular-nums text-subtle">
            {formatDuration(started ? time : duration)}
          </span>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ public components */

/**
 * The compact voice-sample list — one component used on the home page and on the AI Voice
 * Agents service page. Real estate is first (explicit order in src/data/voiceSamples.ts).
 */
export function VoiceSamples({ className }: { className?: string }) {
  if (!voiceSamples.length) return null;
  return (
    <div className={cn("mx-auto grid max-w-5xl gap-3 md:grid-cols-2", className)}>
      {voiceSamples.map((s, i) => (
        <div
          key={s.id}
          data-reveal={i % 2 ? "right" : "left"}
          style={{ "--i": Math.floor(i / 2) } as React.CSSProperties}
          className="min-w-0"
        >
          <VoiceRow sample={s} />
        </div>
      ))}
    </div>
  );
}

/** Home page section: heading, the compact list and a short call to action. */
export function VoiceSamplesSection({ tone }: { tone?: Tone }) {
  return (
    <section
      id="voice-demos"
      aria-labelledby="voice-demos-title"
      className={cn(
        "cv-auto relative scroll-mt-24 py-20 [contain-intrinsic-size:auto_700px] md:py-24",
        tone && bandClass(tone),
      )}
    >
      <Container>
        <SectionHeading
          id="voice-demos-title"
          eyebrow="Hear them live"
          align="center"
          title={
            <>
              Voice agents that <span className="gradient-text">sound human</span>
            </>
          }
          intro="Recordings of voice agents I've built, in real conversation. Press play — one plays at a time, and nothing downloads until you do."
        />
        <LazyMount className="min-h-[440px] md:min-h-[270px]">
          <VoiceSamples />
        </LazyMount>
        <div
          data-reveal="up"
          data-delay="200"
          className="mx-auto mt-8 flex max-w-5xl flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-panel px-5 py-4 sm:flex-row"
        >
          <p className="text-center text-[15px] text-foreground sm:text-left">
            <span className="font-semibold">Want an agent like this answering your calls?</span>{" "}
            <span className="text-muted-foreground">
              Booking, qualifying and follow-ups, connected to your CRM.
            </span>
          </p>
          <div className="flex shrink-0 flex-wrap justify-center gap-2">
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
      </Container>
    </section>
  );
}
