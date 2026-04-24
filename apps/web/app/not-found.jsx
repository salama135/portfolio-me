import Link from 'next/link';
import { ROUTES } from '../lib/constants/routes.js';

export default function NotFound() {
  return (
    <div className="page-shell py-[clamp(4rem,12vw,8rem)] text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-2">404</p>
      <h1 className="mt-4">Page not found</h1>
      <p className="mx-auto mt-3 max-w-[40ch] text-text-1">That route does not exist yet.</p>
      <Link
        href={ROUTES.home}
        className="mt-10 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-accent-fg no-underline transition-[box-shadow,background-color] duration-200 ease-out hover:bg-[color:oklch(0.82_0.13_198)] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
      >
        Back home
      </Link>
    </div>
  );
}
