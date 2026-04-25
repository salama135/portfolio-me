import { readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import sharp from 'sharp';

const MEDIA_DIR = join(process.cwd(), 'public', 'media');
const CONVERTIBLE = new Set(['.jpg', '.jpeg', '.png']);

const files = await readdir(MEDIA_DIR);
let converted = 0;

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!CONVERTIBLE.has(ext)) continue;
  const input = join(MEDIA_DIR, file);
  const output = join(MEDIA_DIR, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
  await sharp(input).webp({ quality: 72 }).toFile(output);
  converted += 1;
}

console.log(`optimized media: ${converted} file(s)`);
