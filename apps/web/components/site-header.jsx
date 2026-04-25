'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CtaHire } from './cta-hire.jsx';
import { NAV_ITEMS, ROUTES } from '../lib/constants/routes.js';

function linkClass(pathname, href, onDark) {
  const active = pathname === href || (href !== '/' && pathname.startsWith(href));
  const focus =
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]';

  if (onDark) {
    return [
      'whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
      focus,
      active
        ? 'bg-white/14 text-white ring-1 ring-white/22'
        : 'text-white/72 hover:bg-white/[0.08] hover:text-[#2997ff]',
    ].join(' ');
  }

  return [
    'whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
    focus,
    active
      ? 'bg-apple-gray text-apple-ink ring-1 ring-apple-border-soft'
      : 'text-text-1 hover:bg-apple-gray hover:text-apple-ink',
  ].join(' ');
}

export function SiteHeader() {
  const pathname = usePathname() ?? '';
  const onDark = pathname === '/' || pathname === '';

  return (
    <header
      className={
        onDark
          ? 'sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-black/48'
          : 'sticky top-0 z-50 border-b border-apple-border-soft bg-white/85 backdrop-blur-xl supports-[backdrop-filter]:bg-white/72'
      }
    >
      <div className="page-shell-wide flex flex-wrap items-center justify-between gap-4 py-3.5">
        <Link
          href={ROUTES.home}
          className={`text-lg font-semibold tracking-tight transition-opacity duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-[0.88] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${
            onDark ? 'text-white' : 'text-apple-ink'
          }`}
        >
          Portfolio
        </Link>
        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-3 sm:flex-none sm:justify-normal">
          <nav
            aria-label="Primary"
            className="-mx-1 flex max-w-[min(100%,52rem)] gap-1 overflow-x-auto overflow-y-hidden pb-1 sm:max-w-none sm:flex-wrap sm:overflow-visible sm:pb-0"
          >
            {NAV_ITEMS.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass(pathname, href, onDark)}>
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
