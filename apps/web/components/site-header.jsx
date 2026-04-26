'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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

function drawerLinkClass(pathname, href, onDark) {
  const active = pathname === href || (href !== '/' && pathname.startsWith(href));
  const focus =
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]';
  if (onDark) {
    return [
      'block rounded-xl px-4 py-3.5 text-base font-medium transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
      focus,
      active ? 'bg-white/12 text-white' : 'text-white/80 hover:bg-white/[0.08] hover:text-[#2997ff]',
    ].join(' ');
  }
  return [
    'block rounded-xl px-4 py-3.5 text-base font-medium transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
    focus,
    active ? 'bg-apple-gray text-apple-ink' : 'text-apple-ink hover:bg-apple-gray',
  ].join(' ');
}

export function SiteHeader() {
  const pathname = usePathname() ?? '';
  const onDark = pathname === '/' || pathname === '';
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef(null);
  const titleId = useId();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      closeMenu();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector('a')?.focus();
    }, 0);
    const onKey = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen, closeMenu]);

  const openMenu = useCallback(() => setMenuOpen(true), []);

  const shell = onDark
    ? 'sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-black/48'
    : 'sticky top-0 z-50 border-b border-apple-border-soft bg-white/85 backdrop-blur-xl supports-[backdrop-filter]:bg-white/72';

  const drawerSurface = onDark ? 'bg-[#0a0a0c] text-white' : 'bg-apple-white text-apple-ink';

  return (
    <header className={shell}>
      <div className="page-shell-wide flex items-center justify-between gap-3 py-3.5">
        <Link
          href={ROUTES.home}
          className={`shrink-0 text-lg font-semibold tracking-tight transition-opacity duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-[0.88] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${
            onDark ? 'text-white' : 'text-apple-ink'
          }`}
        >
          Portfolio
        </Link>

        <nav aria-label="Primary" className="hidden min-w-0 flex-1 items-center justify-end gap-1 lg:flex">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(pathname, href, onDark)}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <CtaHire href={ROUTES.contact} className="hidden sm:inline-flex">
            Hire me
          </CtaHire>
          <button
            type="button"
            className={`flex h-11 w-11 items-center justify-center rounded-full border text-base font-light leading-none transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] lg:hidden ${
              onDark
                ? 'border-white/20 bg-white/[0.06] text-white hover:bg-white/10'
                : 'border-apple-border-soft bg-apple-gray/50 text-apple-ink hover:bg-apple-gray'
            }`}
            aria-expanded={menuOpen}
            aria-controls="site-nav-drawer"
            onClick={() => (menuOpen ? closeMenu() : openMenu())}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            {menuOpen ? (
              <span aria-hidden className="block select-none text-2xl leading-none">
                ×
              </span>
            ) : (
              <span aria-hidden className="flex w-5 flex-col justify-center gap-[5px]">
                <span className="h-0.5 w-full rounded-full bg-current" />
                <span className="h-0.5 w-full rounded-full bg-current" />
                <span className="h-0.5 w-full rounded-full bg-current" />
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen
        ? createPortal(
            <div
              ref={panelRef}
              id="site-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className={`fixed inset-0 z-[60] flex min-h-dvh w-full max-w-none flex-col pt-[env(safe-area-inset-top,0px)] pl-[env(safe-area-inset-left,0px)] pr-[env(safe-area-inset-right,0px)] lg:hidden ${drawerSurface}`}
            >
              <div className={`flex shrink-0 items-center justify-between border-b px-4 py-3 ${onDark ? 'border-white/10' : 'border-apple-border-soft'}`}>
                <p id={titleId} className="text-sm font-semibold text-inherit">
                  Menu
                </p>
                <button
                  type="button"
                  onClick={closeMenu}
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${
                    onDark ? 'text-white/70 hover:bg-white/10 hover:text-white' : 'text-apple-gray-secondary hover:bg-apple-gray'
                  }`}
                >
                  Close
                </button>
              </div>
              <nav
                aria-label="Primary"
                className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto overscroll-contain px-3 py-4"
              >
                {NAV_ITEMS.map(({ href, label }) => (
                  <Link key={href} href={href} className={drawerLinkClass(pathname, href, onDark)} onClick={closeMenu}>
                    {label}
                  </Link>
                ))}
              </nav>
              <div
                className={`shrink-0 border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] ${onDark ? 'border-white/10' : 'border-apple-border-soft'}`}
              >
                <CtaHire href={ROUTES.contact} className="flex w-full justify-center" onClick={closeMenu}>
                  Hire me
                </CtaHire>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
