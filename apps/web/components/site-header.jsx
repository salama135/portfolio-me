'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CtaHire } from './cta-hire.jsx';
import { NAV_ITEMS, ROUTES } from '../lib/constants/routes.js';

function linkClass(pathname, href) {
  const active = pathname === href || (href !== '/' && pathname.startsWith(href));
  return [
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400',
    active ? 'text-white bg-white/10' : 'text-zinc-300 hover:text-white hover:bg-white/5',
  ].join(' ');
}

export function SiteHeader() {
  const pathname = usePathname() ?? '';

  return (
    <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href={ROUTES.home}
          className="font-semibold tracking-tight text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
        >
          Portfolio
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <nav aria-label="Primary" className="flex flex-wrap items-center gap-1">
            {NAV_ITEMS.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass(pathname, href)}>
                {label}
              </Link>
            ))}
          </nav>
          <CtaHire href={ROUTES.contact} className="hidden px-4 py-2 sm:inline-flex">
            Hire me
          </CtaHire>
        </div>
      </div>
    </header>
  );
}
