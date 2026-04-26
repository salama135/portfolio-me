import Link from 'next/link';
import { ContentEmptyState } from '../../components/content-empty-state.jsx';
import { ROUTES, routeBlogPost } from '../../lib/constants/routes.js';
import { loadArticles } from '../../lib/content/load/articles.js';

export const metadata = {
  title: 'Blog',
  description: 'Notes on engineering, teaching, and shipping static-first sites.',
};

/** @type {Array<'tech' | 'life' | 'health' | 'hobbies'>} */
const CATEGORY_ORDER = ['tech', 'life', 'health', 'hobbies'];
const CATEGORY_LABEL = {
  tech: 'Tech',
  life: 'Life',
  health: 'Health',
  hobbies: 'Hobbies',
};

function excerptFor(post) {
  if (post.excerpt) return post.excerpt;
  const flat = post.body.replace(/\s+/g, ' ').trim();
  return flat.length > 180 ? `${flat.slice(0, 180)}…` : flat;
}

function PostRow({ post }) {
  return (
    <li className="border-b border-apple-border-soft pb-8 last:border-0">
      <p className="text-sm text-apple-gray-secondary">
        {post.date} · {post.author}
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-apple-ink sm:text-2xl">
        <Link
          href={routeBlogPost(post.slug)}
          className="text-apple-ink no-underline hover:text-apple-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 max-w-[62ch] text-[17px] leading-[1.47] text-text-1">{excerptFor(post)}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(post.categories ?? []).map((c) => (
          <span
            key={c}
            className="rounded-full bg-apple-gray px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-apple-ink ring-1 ring-apple-border-soft"
          >
            {CATEGORY_LABEL[c]}
          </span>
        ))}
        {post.tags?.length ? (
          <span className="text-sm text-apple-gray-secondary">{post.tags.join(' · ')}</span>
        ) : null}
      </div>
    </li>
  );
}

export default async function BlogPage() {
  const posts = await loadArticles();

  return (
    <div className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
      <div className="max-w-[70ch]">
        <h1 className="text-apple-ink">Blog</h1>
        <p className="mt-4 max-w-[58ch] text-pretty text-[17px] leading-[1.47] text-text-1">
          Long-form posts live in <code>content/blog</code> as MDX. Each post can declare <code>categories</code> (tech, life,
          health, hobbies) for the index below. Tags stay free-form for finer keywords.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="mt-14">
          <ContentEmptyState
            title="No posts yet"
            description="Add *.mdx files with slug, title, date, author, optional categories[], and body. The Article schema enforces the contract at build time."
          />
        </div>
      ) : (
        <>
          <nav aria-label="Blog categories" className="mt-12 flex flex-wrap gap-2">
            <a
              href="#all-posts"
              className="rounded-full border border-apple-border-soft bg-apple-gray/60 px-4 py-2 text-sm font-semibold text-apple-ink transition-colors hover:bg-apple-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            >
              All posts
            </a>
            {CATEGORY_ORDER.map((cat) => (
              <a
                key={cat}
                href={`#category-${cat}`}
                className="rounded-full border border-apple-border-soft bg-apple-white px-4 py-2 text-sm font-semibold text-apple-ink transition-colors hover:bg-apple-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                {CATEGORY_LABEL[cat]}
              </a>
            ))}
          </nav>

          {CATEGORY_ORDER.map((cat) => {
            const inCat = posts.filter((p) => (p.categories ?? []).includes(cat));
            if (inCat.length === 0) return null;
            return (
              <section key={cat} id={`category-${cat}`} className="mt-14 scroll-mt-24" aria-labelledby={`cat-${cat}`}>
                <h2 id={`cat-${cat}`} className="text-xl font-semibold text-apple-ink">
                  {CATEGORY_LABEL[cat]}
                </h2>
                <ul className="mt-8 max-w-[min(52rem,100%)] list-none space-y-8 p-0">
                  {inCat.map((post) => (
                    <PostRow key={post.slug} post={post} />
                  ))}
                </ul>
              </section>
            );
          })}

          <section id="all-posts" className="mt-16 scroll-mt-24" aria-labelledby="all-heading">
            <h2 id="all-heading" className="text-xl font-semibold text-apple-ink">
              All posts
            </h2>
            <p className="mt-2 max-w-[60ch] text-[15px] text-apple-gray-secondary">
              Newest first. Posts without a category still appear here.
            </p>
            <ul className="mt-8 max-w-[min(52rem,100%)] list-none space-y-8 p-0">
              {posts.map((post) => (
                <PostRow key={`all-${post.slug}`} post={post} />
              ))}
            </ul>
          </section>
        </>
      )}

      <p className="mt-12 text-sm text-apple-gray-secondary">
        <Link href={ROUTES.home} className="text-apple-link underline-offset-2 hover:underline">
          Home
        </Link>
      </p>
    </div>
  );
}
