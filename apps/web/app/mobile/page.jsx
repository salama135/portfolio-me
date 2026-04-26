import Link from 'next/link';
import { ROUTES } from '../../lib/constants/routes.js';

export const metadata = {
  title: 'Mobile apps',
  description: 'React Native / Expo work in the monorepo workspace.',
};

export default function MobileAppsPage() {
  return (
    <div className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
      <div className="max-w-[70ch]">
        <h1 className="text-apple-ink">Mobile apps</h1>
        <p className="mt-4 max-w-[60ch] text-pretty text-[17px] leading-[1.47] text-text-1">
          Native apps live in the <code>apps/mobile</code> workspace (Expo). Run locally from the repo root with{' '}
          <code className="rounded bg-apple-gray px-1.5 py-0.5 text-[15px]">npm run mobile</code> after install.
        </p>
      </div>

      <section className="mt-12 max-w-[56rem] rounded-2xl border border-apple-border-soft bg-apple-white px-6 py-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <h2 className="text-lg font-semibold text-apple-ink">Workspace</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-text-1">
          Package name: <code>mobile</code> — see <code>apps/mobile/package.json</code> for scripts (<code>expo start</code>,{' '}
          <code>android</code>, <code>ios</code>).
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-apple-gray-secondary">
          Add store links, screenshots under <code>public/media</code>, and feature bullets here when you are ready to ship a
          public listing.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={ROUTES.demos}
            className="rounded-full bg-apple-ink px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Web demos
          </Link>
          <Link
            href={ROUTES.projects}
            className="rounded-full border border-apple-border-mid px-5 py-2.5 text-sm font-semibold text-apple-ink transition-colors hover:bg-apple-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Projects
          </Link>
        </div>
      </section>
    </div>
  );
}
