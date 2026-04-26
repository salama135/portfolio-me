import Link from 'next/link';
import Markdown from 'markdown-to-jsx';
import { notFound } from 'next/navigation';
import { loadArticleBySlug, loadArticleSlugs } from '../../../lib/content/load/articles.js';
import { ROUTES } from '../../../lib/constants/routes.js';

const CATEGORY_LABEL = {
  tech: 'Tech',
  life: 'Life',
  health: 'Health',
  hobbies: 'Hobbies',
};

export async function generateStaticParams() {
  const slugs = await loadArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await loadArticleBySlug(slug);
  if (!post) return { title: 'Blog' };
  return {
    title: post.title,
    description: post.excerpt ?? post.body.slice(0, 155),
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await loadArticleBySlug(slug);
  if (!post) notFound();

  return (
    <article className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
      <p className="text-sm font-medium text-apple-link">
        <Link href={ROUTES.blog} className="no-underline hover:underline">
          Blog
        </Link>
        <span className="text-apple-gray-secondary"> / </span>
        <span className="text-apple-gray-secondary">{post.title}</span>
      </p>

      <header className="mt-6 max-w-[62ch]">
        <h1 className="text-apple-ink">{post.title}</h1>
        <p className="mt-4 text-sm text-apple-gray-secondary">
          {post.date} · {post.author}
        </p>
        {(post.categories ?? []).length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Categories">
            {(post.categories ?? []).map((c) => (
              <li key={c}>
                <span className="inline-flex rounded-full bg-apple-gray px-3 py-1 text-xs font-semibold uppercase tracking-wide text-apple-ink ring-1 ring-apple-border-soft">
                  {CATEGORY_LABEL[c]}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
        {post.tags?.length ? (
          <p className="mt-3 text-sm text-apple-gray-secondary">Tags: {post.tags.join(' · ')}</p>
        ) : null}
      </header>

      <div className="markdown mt-10 max-w-[62ch]">
        <Markdown>{post.body}</Markdown>
      </div>
    </article>
  );
}
