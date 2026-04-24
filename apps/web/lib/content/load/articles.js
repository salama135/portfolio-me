import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import { articleSchema } from '../schemas/article.js';

const BLOG_DIR = join(process.cwd(), 'content', 'blog');

/** @returns {Promise<import('zod').infer<typeof import('../schemas/article.js').articleSchema>[]>} */
export async function loadArticles() {
  let files = [];
  try {
    files = await readdir(BLOG_DIR);
  } catch {
    return [];
  }

  const posts = [];
  for (const file of files) {
    if (!file.endsWith('.mdx') && !file.endsWith('.md')) continue;
    const fullPath = join(BLOG_DIR, file);
    try {
      const raw = await readFile(fullPath, 'utf8');
      const { data, content } = matter(raw);
      posts.push(
        articleSchema.parse({
          ...data,
          body: typeof content === 'string' ? content.trim() : '',
        }),
      );
    } catch {
      /* skip invalid */
    }
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** @returns {Promise<string[]>} */
export async function loadArticleSlugs() {
  const posts = await loadArticles();
  return posts.map((p) => p.slug);
}

/**
 * @param {string} slug
 * @returns {Promise<import('zod').infer<typeof import('../schemas/article.js').articleSchema> | null>}
 */
export async function loadArticleBySlug(slug) {
  const posts = await loadArticles();
  return posts.find((p) => p.slug === slug) ?? null;
}
