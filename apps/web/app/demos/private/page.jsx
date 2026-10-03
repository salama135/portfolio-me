import Link from 'next/link';
import { hasPrivateDemoAccess, isPrivateDemosConfigured } from '../../../lib/private-demos/auth.js';
import { loadPrivateDemos } from '../../../lib/private-demos/registry.js';
import { lockPrivateDemos } from './actions.js';
import { UnlockForm } from './unlock-form.jsx';

export const dynamic = 'force-dynamic';

export default async function PrivateDemosPage({ searchParams }) {
  const { next } = await searchParams;

  if (!(await hasPrivateDemoAccess())) {
    return (
      <div className="page-shell py-[clamp(2.5rem,6vw,4rem)]">
        <h1 className="text-apple-ink">Private demos</h1>
        <p className="mt-4 max-w-[56ch] text-pretty text-[17px] leading-[1.47] text-text-1">
          A collection of games, simulations and tools I have built that are not public yet. Enter the password to see
          them.
        </p>
        {isPrivateDemosConfigured() ? (
          <UnlockForm next={typeof next === 'string' ? next : undefined} />
        ) : (
          <p className="mt-8 max-w-[56ch] rounded-2xl border border-dashed border-apple-border-mid bg-apple-gray/50 px-6 py-5 text-sm text-apple-gray-secondary">
            Locked: no password is configured. Set <code>PRIVATE_DEMOS_PASSWORD</code> in the server environment.
          </p>
        )}
      </div>
    );
  }

  const demos = await loadPrivateDemos();

  return (
    <div className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="text-apple-ink">Private demos</h1>
        <form action={lockPrivateDemos}>
          <button
            type="submit"
            className="rounded-full border border-apple-border-mid px-4 py-2 text-sm font-semibold text-apple-ink hover:bg-apple-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Lock
          </button>
        </form>
      </div>
      <p className="mt-4 max-w-[62ch] text-pretty text-[17px] leading-[1.47] text-text-1">
        Each demo is a standalone page that loads only after you press <strong className="font-semibold">Start demo</strong>.
        Most need WebGL; progress is saved in your browser.
      </p>

      <ul className="mt-12 grid list-none gap-6 p-0 md:grid-cols-2">
        {demos.map((d) => (
          <li
            key={d.slug}
            className="flex flex-col rounded-2xl border border-apple-border-soft bg-apple-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-apple-gray-secondary">{d.category}</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-apple-ink">
              <Link
                href={`/demos/private/${d.slug}`}
                className="text-apple-ink no-underline hover:text-apple-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                {d.title}
              </Link>
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-apple-gray-secondary">{d.summary}</p>
            <dl className="mt-4 grid gap-2 text-sm text-text-1">
              <div>
                <dt className="font-semibold text-apple-ink">Device</dt>
                <dd>{d.deviceNeeds}</dd>
              </div>
              <div>
                <dt className="font-semibold text-apple-ink">Duration</dt>
                <dd>{d.durationHint}</dd>
              </div>
            </dl>
            <Link
              href={`/demos/private/${d.slug}`}
              className="mt-5 inline-flex w-fit rounded-full bg-[#0071e3] px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#0077ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            >
              Open demo
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
