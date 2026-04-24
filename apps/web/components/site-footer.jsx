import Link from 'next/link';
import { ROUTES } from '../lib/constants/routes.js';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-zinc-950/90 px-4 py-8 text-sm text-zinc-400 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} — Portfolio (work in progress).</p>
        <div className="flex flex-wrap gap-4">
          <Link
            href={ROUTES.contact}
            className="text-zinc-300 underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
          >
            Contact
          </Link>
          <Link
            href={ROUTES.links}
            className="text-zinc-300 underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
          >
            Links
          </Link>
        </div>
      </div>
    </footer>
  );
}
