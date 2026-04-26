import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const pocPath = join(root, 'poc', 'credly-badges.json');
const outPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'content', 'achievements.json');

const poc = JSON.parse(readFileSync(pocPath, 'utf8'));

const manual = {
  kind: 'manual',
  id: 'sample-certificate',
  certificateImage: '/media/cover-teachable-engine.webp',
  title: 'Sample certificate (edit achievements.json)',
  description:
    'Replace this block with a real certificate. You can remove it once you add your own rows.',
  issueDate: '2026-04-26',
  skills: ['Documentation'],
  issuer: 'Example issuer',
};

const credly = poc.badge_urls.map((url) => {
  const m = url.match(/badges\/([a-f0-9-]{36})/i);
  if (!m) throw new Error(`Bad URL: ${url}`);
  const id = m[1];
  return {
    kind: 'credly_embed',
    id: `credly-${id}`,
    shareBadgeId: id,
    issuer: '',
    skills: [],
  };
});

writeFileSync(outPath, JSON.stringify({ achievements: [manual, ...credly] }, null, 2));
console.log('Wrote', 1 + credly.length, 'rows to', outPath);
