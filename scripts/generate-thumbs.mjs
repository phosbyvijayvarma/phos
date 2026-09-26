// Builds small WebP thumbnails for every portfolio photo, plus a manifest with each photo's size.
// Run after adding or changing photos: pnpm thumbs
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PUBLIC_DIR = path.join(ROOT, 'public');
const THUMB_DIR = path.join(PUBLIC_DIR, 'thumbs');
const DATA_FILE = path.join(ROOT, 'src/lib/portfolio-data.ts');
const MANIFEST_FILE = path.join(ROOT, 'src/lib/image-manifest.json');
const THUMB_WIDTH = 640;

const data = await readFile(DATA_FILE, 'utf8');
const sources = [...new Set([...data.matchAll(/"(?:src|image)": "([^"]+)"/g)].map((match) => match[1]))];

const manifest = {};
let created = 0;

for (const src of sources) {
  const relative = decodeURI(src).replace(/^\//, '');
  const input = path.join(PUBLIC_DIR, relative);
  const outputRelative = relative.replace(/\.(jpe?g|png)$/i, '.webp');
  const output = path.join(THUMB_DIR, outputRelative);

  const { width, height } = await sharp(input).rotate().metadata().then((meta) =>
    // EXIF orientations 5-8 swap width and height.
    (meta.orientation ?? 1) >= 5 ? { width: meta.height, height: meta.width } : meta,
  );

  const upToDate = await Promise.all([stat(input), stat(output).catch(() => null)]).then(
    ([inStat, outStat]) => outStat && outStat.mtimeMs >= inStat.mtimeMs,
  );
  if (!upToDate) {
    await mkdir(path.dirname(output), { recursive: true });
    await sharp(input).rotate().resize({ width: THUMB_WIDTH, withoutEnlargement: true }).webp({ quality: 72 }).toFile(output);
    created++;
  }

  manifest[src] = { thumb: `/thumbs/${encodeURI(outputRelative)}`, width, height };
}

await writeFile(MANIFEST_FILE, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Thumbnails: ${created} created, ${sources.length - created} up to date. Manifest: ${sources.length} photos.`);
