/**
 * Voice-agent samples for the "Hear them live" section on the home page.
 *
 * ORDER IS EXPLICIT: the array order below is the display order (no runtime sorting).
 * The real-estate sample is first and featured.
 *
 * Audio files are web-ready copies in src/assets/voices/ of the originals in
 * src/assets/Portfolio/AI Voices/ — that folder is private and not committed, so the site
 * cannot ship it. The originals were not modified. The WAV taxi sample was re-encoded to a
 * 96 kbps mono MP3 (13.4 MB to 0.86 MB); the clinic and real-estate files were already
 * ~130 kbps AAC and are copied as-is. "Real Estate Agent.mp4" and "UK AI Voice Real
 * Estate.mp4" are byte-identical, so only one is used.
 *
 * `peaks` are real waveform peaks (120 bars, 0–1) pre-computed from each file with the Web
 * Audio API, so the waveform draws without downloading the audio. If you add a sample without
 * peaks, the player decodes the file on first interaction and computes them itself.
 *
 * To add a sample: drop an .mp3 (96–128 kbps) or .m4a into src/assets/voices/ and add an entry.
 */

const files = import.meta.glob("/src/assets/voices/*.{mp3,m4a,ogg,wav}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export type VoiceSample = {
  id: string;
  /** File name inside src/assets/voices/. */
  file: string;
  /** Original file name in src/assets/Portfolio/AI Voices/ (for reference). */
  source: string;
  title: string;
  useCase: string;
  /** Only set when known (from the file name). */
  language?: string;
  /** Voice platform, when known. Unknown is shown as the neutral "AI voice agent". */
  platform?: string;
  /** Seconds. */
  duration: number;
  featured?: boolean;
  blurb?: string;
  peaks?: number[];
};

const samples: VoiceSample[] = [
  {
    id: "real-estate",
    file: "real-estate-uk.m4a",
    source: "UK AI Voice Real Estate.mp4",
    title: "Real Estate Voice Agent",
    useCase: "Real estate enquiries",
    language: "English (UK)",
    duration: 188.9,
    featured: true,
    blurb:
      "A full UK property call, start to finish — listen for how naturally the agent handles the conversation.",
    peaks: [
      0.97, 0.96, 0.76, 0.74, 0.63, 0.69, 0.69, 0.6, 0.58, 0.04, 0.87, 0.93, 0.85, 0.89, 0.87, 0.87,
      0.66, 0.04, 0.79, 0.52, 0.69, 0.38, 0.04, 0.88, 0.71, 0.83, 0.88, 0.61, 0.71, 0.53, 0.21,
      0.04, 0.81, 1, 0.99, 0.81, 0.53, 0.57, 0.68, 0.78, 0.5, 0.46, 0.11, 0.07, 0.78, 0.51, 0.04,
      0.95, 0.81, 0.77, 0.71, 0.61, 0.57, 0.59, 0.55, 0.64, 0.61, 0.24, 0.04, 0.81, 0.84, 0.87,
      0.87, 0.56, 0.7, 0.68, 0.04, 0.04, 0.04, 0.44, 1, 0.73, 0.7, 0.84, 0.8, 0.72, 0.77, 0.73,
      0.82, 0.74, 0.75, 0.61, 0.72, 0.74, 0.68, 0.71, 0.76, 0.64, 0.76, 0.71, 0.57, 0.04, 0.95,
      0.95, 1, 0.93, 0.64, 0.65, 0.7, 0.56, 0.47, 0.04, 0.82, 0.92, 0.78, 0.68, 0.67, 0.04, 0.99,
      0.96, 0.73, 0.88, 0.86, 0.65, 0.55, 0.04, 0.92, 0.77, 0.79, 0.8,
    ],
  },
  {
    id: "clinic-demo",
    file: "clinic-demo.m4a",
    source: "Clinic Demo.mp4",
    title: "Clinic Receptionist — Full Demo",
    useCase: "Healthcare clinic",
    duration: 123.3,
    peaks: [
      0.95, 0.85, 0.92, 0.83, 0.9, 0.9, 0.71, 0.04, 0.56, 0.89, 0.78, 0.04, 0.92, 0.89, 0.78, 0.83,
      0.8, 0.79, 0.74, 0.85, 0.79, 0.04, 0.69, 0.58, 0.04, 0.88, 0.8, 0.77, 0.84, 0.39, 0.04, 0.87,
      0.83, 0.72, 0.05, 0.7, 0.81, 0.8, 0.9, 0.74, 0.83, 0.78, 0.69, 0.88, 0.87, 0.91, 0.95, 0.76,
      0.94, 1, 0.94, 0.67, 0.04, 0.86, 0.98, 0.72, 0.9, 0.79, 0.78, 0.07, 0.04, 0.87, 0.78, 0.04,
      0.85, 0.66, 0.86, 0.77, 0.85, 0.73, 0.93, 0.8, 0.75, 0.78, 0.85, 0.88, 0.92, 0.77, 0.04, 0.94,
      0.82, 0.95, 0.89, 0.72, 0.04, 0.85, 0.81, 0.86, 0.58, 0.96, 0.82, 0.86, 0.85, 0.79, 0.78,
      0.89, 0.85, 0.58, 0.69, 0.99, 0.81, 0.39, 0.84, 0.83, 0.88, 0.87, 0.77, 0.68, 0.83, 0.68,
      0.89, 0.84, 0.79, 0.51, 0.04, 0.73, 0.97, 0.67, 0.67, 0.04,
    ],
  },
  {
    id: "taxi-booking",
    file: "taxi-booking.mp3",
    source: "Taxi Voice.wav",
    title: "Taxi Booking Voice Agent",
    useCase: "Taxi & transport bookings",
    duration: 73,
    peaks: [
      0.04, 0.32, 0.47, 0.75, 0.56, 0.36, 0.26, 0.24, 0.3, 0.33, 0.26, 0.23, 0.17, 0.05, 0.04, 0.94,
      0.91, 0.65, 0.68, 0.87, 0.9, 0.95, 0.83, 0.76, 0.81, 0.32, 0.11, 0.04, 0.28, 0.43, 0.39, 0.33,
      0.24, 0.15, 0.3, 0.38, 0.26, 0.29, 0.2, 0.14, 0.4, 0.25, 0.3, 0.22, 0.19, 0.12, 0.24, 1, 0.87,
      0.04, 0.04, 0.41, 0.34, 0.39, 0.35, 0.34, 0.3, 0.2, 0.25, 0.24, 0.27, 0.28, 0.28, 0.22, 0.18,
      0.13, 0.04, 0.04, 0.67, 0.15, 0.04, 0.19, 0.32, 0.31, 0.29, 0.23, 0.24, 0.25, 0.22, 0.29,
      0.22, 0.24, 0.24, 0.21, 0.18, 0.15, 0.05, 0.04, 0.54, 0.13, 0.04, 0.04, 0.04, 0.04, 0.04,
      0.04, 0.04, 0.43, 0.21, 0.31, 0.4, 0.34, 0.3, 0.32, 0.21, 0.36, 0.21, 0.22, 0.22, 0.41, 0.28,
      0.32, 0.28, 0.23, 0.22, 0.18, 0.37, 0.28, 0.22, 0.45,
    ],
  },
  {
    id: "clinic-voice",
    file: "clinic-voice.m4a",
    source: "AI Voice Clinic.mp4",
    title: "Clinic Voice Agent",
    useCase: "Healthcare clinic",
    duration: 68.2,
    peaks: [
      0.86, 0.84, 0.72, 0.67, 0.8, 0.7, 0.05, 0.04, 0.58, 0.67, 0.72, 0.13, 0.04, 0.72, 0.8, 0.65,
      0.61, 0.81, 0.71, 0.71, 0.05, 0.41, 0.91, 0.71, 0.04, 0.04, 0.85, 0.77, 0.53, 0.04, 0.54,
      0.82, 0.65, 0.68, 0.9, 0.77, 0.7, 0.82, 0.6, 0.54, 0.85, 0.81, 0.72, 0.61, 0.76, 0.77, 0.49,
      0.67, 0.13, 0.04, 0.66, 0.7, 0.65, 0.85, 0.75, 0.77, 0.69, 0.74, 0.79, 0.62, 0.7, 0.75, 0.72,
      0.7, 0.67, 0.66, 0.76, 0.59, 0.04, 0.04, 0.41, 0.77, 0.15, 0.04, 0.58, 0.64, 0.73, 0.04, 0.75,
      0.72, 0.74, 0.8, 0.58, 0.84, 0.75, 0.79, 0.79, 0.75, 0.71, 0.81, 0.74, 0.72, 0.79, 0.69, 0.66,
      0.67, 0.77, 0.7, 0.72, 0.56, 0.66, 0.85, 0.04, 0.23, 1, 0.71, 0.78, 0.48, 0.66, 0.68, 0.69,
      0.85, 0.72, 0.71, 0.69, 0.79, 0.86, 0.73, 0.81, 0.81,
    ],
  },
  {
    id: "clinic-voice-agent",
    file: "clinic-voice-agent.m4a",
    source: "AI Voice Agent Clinic.mp4",
    title: "Clinic Voice Agent — Short Call",
    useCase: "Healthcare clinic",
    duration: 55.5,
    peaks: [
      0.74, 0.82, 0.74, 0.86, 0.8, 0.77, 0.3, 0.07, 0.81, 0.07, 0.05, 0.05, 0.83, 0.78, 0.85, 0.5,
      0.04, 0.92, 0.81, 0.91, 0.65, 0.63, 0.62, 0.06, 0.87, 0.79, 0.88, 0.83, 0.68, 0.73, 0.82,
      0.85, 0.75, 0.82, 0.7, 0.46, 0.75, 0.78, 0.27, 0.04, 0.04, 0.04, 0.76, 0.11, 0.04, 0.04, 0.93,
      0.86, 0.13, 0.85, 0.75, 0.85, 0.78, 0.8, 0.66, 0.89, 0.83, 0.83, 0.79, 0.75, 0.79, 0.79, 0.81,
      0.89, 0.68, 0.57, 0.67, 0.91, 0.91, 0.81, 0.52, 0.73, 0.74, 0.85, 0.75, 0.64, 0.04, 0.13,
      0.86, 0.06, 0.06, 0.41, 0.95, 0.76, 0.75, 0.73, 0.04, 0.05, 0.71, 0.78, 0.69, 0.92, 0.76,
      0.69, 0.67, 0.84, 0.85, 0.75, 0.65, 0.91, 0.74, 0.83, 0.75, 0.7, 0.83, 0.97, 0.76, 0.09, 0.89,
      0.8, 0.86, 0.55, 0.23, 1, 0.76, 0.09, 0.14, 0.16, 0.06, 0.04,
    ],
  },
];

export type PlayableVoiceSample = VoiceSample & { src: string };

export const voiceSamples: PlayableVoiceSample[] = samples
  .map((s) => ({ ...s, src: files[`/src/assets/voices/${s.file}`] }))
  .filter((s): s is PlayableVoiceSample => Boolean(s.src));

export const formatDuration = (seconds: number) => {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
