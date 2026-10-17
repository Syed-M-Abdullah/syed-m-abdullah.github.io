// Minimal .docx reader (no dependencies): unzips word/document.xml with node:zlib and returns
// paragraphs with their style, list membership and text. Used by scripts/sync-projects.mjs.
import fs from "node:fs";
import zlib from "node:zlib";

/** Reads one entry from a zip archive (central directory lookup, stored or deflated). */
function readZipEntry(buf, name) {
  // End of central directory record: scan backwards for its signature.
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error("not a zip file");
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  for (let n = 0; n < count; n++) {
    const method = buf.readUInt16LE(p + 10);
    const compSize = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const localOffset = buf.readUInt32LE(p + 42);
    const entryName = buf.toString("utf8", p + 46, p + 46 + nameLen);
    if (entryName === name) {
      const lNameLen = buf.readUInt16LE(localOffset + 26);
      const lExtraLen = buf.readUInt16LE(localOffset + 28);
      const start = localOffset + 30 + lNameLen + lExtraLen;
      const data = buf.subarray(start, start + compSize);
      return method === 0 ? data : zlib.inflateRawSync(data);
    }
    p += 46 + nameLen + extraLen + commentLen;
  }
  return null;
}

const decode = (s) =>
  s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&amp;/g, "&");

/**
 * @returns {{ text: string, style: string, list: boolean, bold: boolean }[]}
 */
export function readDocxParagraphs(file) {
  const xml = readZipEntry(fs.readFileSync(file), "word/document.xml")?.toString("utf8");
  if (!xml) return [];
  const out = [];
  for (const m of xml.matchAll(/<w:p[ >][\s\S]*?<\/w:p>/g)) {
    const p = m[0];
    const style = /<w:pStyle w:val="([^"]+)"/.exec(p)?.[1] ?? "";
    const list = /<w:numPr>/.test(p) || /List/i.test(style);
    const runs = [...p.matchAll(/<w:r[ >][\s\S]*?<\/w:r>/g)].map((r) => r[0]);
    const text = runs
      .map((r) =>
        [...r.matchAll(/<w:t(?: [^>]*)?>([\s\S]*?)<\/w:t>|<w:tab\/>|<w:br\/>/g)]
          .map((t) => (t[1] !== undefined ? decode(t[1]) : " "))
          .join(""),
      )
      .join("")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) continue;
    const textRuns = runs.filter((r) => /<w:t[ >]/.test(r));
    const bold =
      textRuns.length > 0 && textRuns.every((r) => /<w:b\/>|<w:b w:val="(1|true)"\/>/.test(r));
    out.push({ text, style, list, bold });
  }
  return out;
}
