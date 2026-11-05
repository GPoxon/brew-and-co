#!/usr/bin/env node
// Downloads an image, resizes it, converts it to WebP and saves it under public/.
// Run from the project root. See ../SKILL.md for usage.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";

const PRESETS = {
  hero: { width: 2400 },
  section: { width: 1400 },
  menu: { width: 640, height: 640 },
};
const DEFAULT_QUALITY = 80;
const MAX_DOWNLOAD_BYTES = 50 * 1024 * 1024;
const DOWNLOAD_TIMEOUT_MS = 60_000;
const ACCEPTED_FORMATS = new Set(["jpeg", "png", "webp", "avif", "tiff", "gif", "heif"]);
const CREDITS_FILE = "docs/image-credits.csv";
const CREDITS_HEADER = "file,source_url,photographer,source,licence,shows";
const CREDIT_FLAGS = ["source-url", "photographer", "source", "licence", "shows"];

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function positiveInt(value, flag, max = Infinity) {
  if (value === undefined) return undefined;
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1 || number > max) {
    fail(`--${flag} must be a whole number from 1 to ${max}.`);
  }
  return number;
}

function parseCliArgs() {
  const { values } = parseArgs({
    options: {
      url: { type: "string" },
      out: { type: "string" },
      preset: { type: "string" },
      width: { type: "string" },
      height: { type: "string" },
      quality: { type: "string" },
      force: { type: "boolean", default: false },
      ...Object.fromEntries(CREDIT_FLAGS.map((flag) => [flag, { type: "string" }])),
    },
  });

  if (!values.url || !values.out) fail("--url and --out are both required.");
  if (values.preset && !PRESETS[values.preset]) {
    fail(`--preset must be one of: ${Object.keys(PRESETS).join(", ")}.`);
  }

  const preset = PRESETS[values.preset] ?? {};
  const width = positiveInt(values.width, "width") ?? preset.width;
  const height = positiveInt(values.height, "height") ?? preset.height;
  if (!width && !height) fail("Give a --preset, or at least one of --width and --height.");

  const provided = CREDIT_FLAGS.filter((flag) => values[flag]);
  if (provided.length > 0 && provided.length < CREDIT_FLAGS.length) {
    const missing = CREDIT_FLAGS.filter((flag) => !values[flag]);
    fail(`Credit details are incomplete. Also give: ${missing.map((f) => `--${f}`).join(", ")}.`);
  }

  return {
    url: parseUrl(values.url),
    ...resolveOutput(values.out),
    width,
    height,
    quality: positiveInt(values.quality, "quality", 100) ?? DEFAULT_QUALITY,
    force: values.force,
    credit: provided.length ? values : null,
  };
}

function parseUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    fail(`Not a valid URL: ${value}`);
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    fail("--url must start with https:// or http://.");
  }
  return url;
}

// Accepts "images/menu/x.webp" or "public/images/menu/x.webp" and keeps it inside public/.
function resolveOutput(value) {
  const publicDir = path.resolve("public");
  if (!existsSync(publicDir)) fail("No public/ folder here. Run this from the project root.");

  const normalised = value.replaceAll("\\", "/").replace(/^\.\//, "").replace(/^public\//, "");
  const filePath = path.resolve(publicDir, normalised);
  const relative = path.relative(publicDir, filePath);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
    fail("--out must be a file inside public/.");
  }
  if (path.extname(filePath).toLowerCase() !== ".webp") fail("--out must end in .webp.");

  const webPath = relative.split(path.sep).join("/");
  return { filePath, webPath };
}

async function download(url) {
  let response;
  try {
    response = await fetch(url, {
      headers: { "User-Agent": "brew-and-co-image-optimizer/1.0" },
      signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS),
    });
  } catch (error) {
    fail(`Download failed: ${error.cause?.message ?? error.message}`);
  }
  if (!response.ok) fail(`Download failed: the server replied ${response.status}.`);

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("text/html")) {
    fail("The URL returned a web page, not an image. Use the direct image file URL.");
  }

  const chunks = [];
  let total = 0;
  for await (const chunk of response.body) {
    total += chunk.length;
    if (total > MAX_DOWNLOAD_BYTES) {
      fail(`The file is larger than the ${MAX_DOWNLOAD_BYTES / 1024 / 1024} MB download limit.`);
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function loadSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    fail("Could not load sharp, which is installed with Next.js. Run npm install, then try again.");
  }
}

async function convert(sharp, input, { width, height, quality }) {
  let metadata;
  try {
    metadata = await sharp(input).metadata();
  } catch {
    fail("The downloaded file is not a readable image.");
  }
  if (!ACCEPTED_FORMATS.has(metadata.format)) {
    fail(`Unsupported image format: ${metadata.format}.`);
  }

  // Sharp drops EXIF and other metadata by default, so orientation is applied first.
  const { data, info } = await sharp(input)
    .autoOrient()
    .resize({ width, height, fit: "cover", withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer({ resolveWithObject: true });

  return { data, info, metadata };
}

function csvRow(fields) {
  return fields.map((field) => `"${String(field).replaceAll('"', '""')}"`).join(",");
}

// Adds a row, or replaces the row already held for this file.
function recordCredit(webPath, credit) {
  const creditsPath = path.resolve(CREDITS_FILE);
  const file = `public/${webPath}`;
  const row = csvRow([
    file,
    credit["source-url"],
    credit.photographer,
    credit.source,
    credit.licence,
    credit.shows,
  ]);

  const existing = existsSync(creditsPath) ? readFileSync(creditsPath, "utf8") : "";
  const eol = existing.includes("\r\n") ? "\r\n" : "\n";
  const lines = existing ? existing.split(/\r?\n/) : [CREDITS_HEADER];
  if (lines.at(-1) === "") lines.pop();

  const index = lines.findIndex((line) => line.startsWith(`"${file}",`));
  if (index === -1) lines.push(row);
  else lines[index] = row;

  writeFileSync(creditsPath, lines.join(eol) + eol);
  return index === -1 ? "added" : "updated";
}

async function main() {
  const options = parseCliArgs();
  if (existsSync(options.filePath) && !options.force) {
    fail(`public/${options.webPath} already exists. Use --force to replace it.`);
  }

  const sharp = await loadSharp();
  const input = await download(options.url);
  const { data, info, metadata } = await convert(sharp, input, options);

  await mkdir(path.dirname(options.filePath), { recursive: true });
  await writeFile(options.filePath, data);

  const warnings = [];
  if (
    (options.width && info.width < options.width) ||
    (options.height && info.height < options.height)
  ) {
    warnings.push(
      `The source is smaller than the requested size, so the output is ${info.width}x${info.height} and may look soft.`,
    );
  }

  const credit = options.credit ? recordCredit(options.webPath, options.credit) : "not recorded";
  if (!options.credit) warnings.push(`No credit details given, so ${CREDITS_FILE} was not updated.`);

  console.log(
    JSON.stringify(
      {
        file: `public/${options.webPath}`,
        src: `/${options.webPath}`,
        width: info.width,
        height: info.height,
        sourceSize: `${metadata.width}x${metadata.height}`,
        sourceKB: Math.round(input.length / 1024),
        outputKB: Math.round(data.length / 1024),
        credit,
        warnings,
      },
      null,
      2,
    ),
  );
}

await main();
