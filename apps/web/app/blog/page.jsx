import Link from 'next/link';
import { ContentEmptyState } from '../../components/content-empty-state.jsx';
import { loadArticles } from '../../lib/content/load/articles.js';
import { routeBlogPost } from '../../lib/constants/routes.js';

export const metadata = {
  title: 'Blog',
  description: 'Notes on engineering, teaching, and shipping static-first sites.',
};

function excerptFor(post) {
  if (post.excerpt) return post.excerpt;
  const flat = post.body.replace(/\s+/g, ' ').trim();
  return flat.length > 180 ? `${flat.slice(0, 180)}…` : flat;
}

export default async function BlogPage() {
  const posts = await loadArticles();

  return (
    <div className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
      <div className="max-w-[70ch]">
        <h1 className="text-apple-ink">Blog</h1>
        <p className="mt-4 max-w-[58ch] text-pretty text-[17px] leading-[1.47] text-text-1">
          Long-form posts live in <code>content/blog</code> as MDX with validated frontmatter.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="mt-14">
          <ContentEmptyState
            title="No posts yet"
            description="Add *.mdx files with slug, title, date, author, and body. The Article schema enforces the contract at build time."
          />
        </div>
      ) : (
        <ul className="mt-14 max-w-[min(52rem,100%)] list-none space-y-8 p-0">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-apple-border-soft pb-8 last:border-0">
              <p className="text-sm text-apple-gray-secondary">
                {post.date} · {post.author}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-apple-ink">
                <Link
                  href={routeBlogPost(post.slug)}
                  className="text-apple-ink no-underline hover:text-apple-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-[62ch] text-[17px] leading-[1.47] text-text-1">{excerptFor(post)}</p>
              {post.tags?.length ? (
                <p className="mt-3 text-sm text-apple-gray-secondary">{post.tags.join(' · ')}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
