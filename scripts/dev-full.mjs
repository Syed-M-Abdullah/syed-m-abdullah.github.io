/**
 * `npm run dev:full` — runs the contact API (server/, reads .env) and the website dev server
 * together in one terminal, so the contact form always has an API to talk to.
 * Ctrl+C stops both.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

if (!existsSync(path.join(ROOT, "server", "node_modules", "nodemailer"))) {
  console.error(
    "[dev:full] Contact API dependencies are missing. Run once:  npm install --prefix server",
  );
  process.exit(1);
}
if (!existsSync(path.join(ROOT, ".env"))) {
  console.warn(
    "[dev:full] No .env file — the API will start but can't send email (see .env.example).",
  );
}

const procs = [];
let stopping = false;

function run(name, color, args, cwd) {
  const child = spawn(process.execPath, args, {
    cwd,
    env: process.env,
    stdio: ["inherit", "pipe", "pipe"],
  });
  const tag = `\x1b[${color}m[${name}]\x1b[0m `;
  const pipe = (stream, out) => {
    let buf = "";
    stream.on("data", (chunk) => {
      buf += chunk;
      const lines = buf.split(/\r?\n/);
      buf = lines.pop();
      for (const line of lines) out.write(tag + line + "\n");
    });
  };
  pipe(child.stdout, process.stdout);
  pipe(child.stderr, process.stderr);
  child.on("exit", (code) => {
    if (stopping) return;
    console.error(`${tag}stopped (exit code ${code}) — stopping the other process too.`);
    stopAll(code ?? 1);
  });
  procs.push(child);
}

function stopAll(code = 0) {
  stopping = true;
  for (const p of procs) if (p.exitCode === null) p.kill();
  setTimeout(() => process.exit(code), 300);
}

process.on("SIGINT", () => stopAll(0));
process.on("SIGTERM", () => stopAll(0));

run("api", "36", ["--env-file-if-exists=../.env", "index.js"], path.join(ROOT, "server"));
run("site", "35", [path.join(ROOT, "node_modules", "vite", "bin", "vite.js"), "dev"], ROOT);
