import Link from 'next/link';
import { ROUTES } from '../lib/constants/routes.js';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-1/80">
      <div className="page-shell-wide flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-2">© {new Date().getFullYear()} — Portfolio (work in progress).</p>
        <div className="flex flex-wrap gap-6 text-sm">
          <Link
            href={ROUTES.contact}
            className="text-text-1 transition-colors duration-200 ease-out hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Contact
          </Link>
          <Link
            href={ROUTES.links}
            className="text-text-1 transition-colors duration-200 ease-out hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Links
          </Link>
        </div>
      </div>
    </footer>
  );
}
