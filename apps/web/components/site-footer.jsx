import Link from 'next/link';
import { ROUTES } from '../lib/constants/routes.js';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-apple-border-soft bg-apple-gray">
      <div className="page-shell-wide flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-apple-gray-secondary">
          © {new Date().getFullYear()} — Portfolio (work in progress).
        </p>
        <div className="flex max-w-2xl flex-wrap justify-end gap-x-6 gap-y-3 text-sm">
          <Link
            href={ROUTES.resume}
            className="text-apple-link transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-[#0077ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Resume
          </Link>
          <Link
            href={ROUTES.achievements}
            className="text-apple-link transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-[#0077ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Achievements
          </Link>
          <Link
            href={ROUTES.games}
            className="text-apple-link transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-[#0077ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Games
          </Link>
          <Link
            href={ROUTES.mobile}
            className="text-apple-link transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-[#0077ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Mobile
          </Link>
          <Link
            href={ROUTES.contact}
            className="text-apple-link transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-[#0077ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Contact
          </Link>
          <Link
            href={ROUTES.links}
            className="text-apple-link transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-[#0077ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Links
          </Link>
        </div>
      </div>
    </footer>
  );
}
