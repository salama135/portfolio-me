'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CtaHire } from './cta-hire.jsx';
import { NAV_ITEMS, ROUTES } from '../lib/constants/routes.js';

function linkClass(pathname, href) {
  const active = pathname === href || (href !== '/' && pathname.startsWith(href));
  return [
    'whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 ease-out',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]',
    active
      ? 'bg-surface-2 text-text-0 ring-1 ring-[color:oklch(0.78_0.14_198_/0.35)]'
      : 'text-text-1 hover:bg-surface-1 hover:text-text-0',
  ].join(' ');
}

export function SiteHeader() {
  const pathname = usePathname() ?? '';

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-0/92">
      <div className="page-shell-wide flex flex-wrap items-center justify-between gap-4 py-4">
        <Link
          href={ROUTES.home}
          className="text-lg font-semibold tracking-tight text-text-0 [font-family:var(--font-portfolio-display),system-ui,sans-serif] transition-opacity duration-200 ease-out hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        >
          Portfolio
        </Link>
        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-3 sm:flex-none sm:justify-normal">
          <nav
            aria-label="Primary"
            className="-mx-1 flex max-w-[min(100%,52rem)] gap-1 overflow-x-auto overflow-y-hidden pb-1 sm:max-w-none sm:flex-wrap sm:overflow-visible sm:pb-0"
          >
            {NAV_ITEMS.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass(pathname, href)}>
                {label}
              </Link>
            ))}
          </nav>
          <CtaHire href={ROUTES.contact} className="hidden shrink-0 sm:inline-flex">
            Hire me
          </CtaHire>
        </div>
      </div>
    </header>
  );
}
