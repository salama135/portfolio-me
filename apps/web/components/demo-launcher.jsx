'use client';

import { useState } from 'react';
import { DemoErrorBoundary } from './demo-error-boundary.jsx';

/**
 * Defers heavy demo bundles until explicit user intent (contracts/demo-module-interface.md).
 * Pass a `next/dynamic(..., { ssr: false })` component as `Demo` from a parent module scope so the import stays stable.
 *
 * **Registry contract**: every slug in `content/demos.json` that ships a heavy client bundle must mount through
 * `DemoPageShell` on the server and a `*Client` module that wraps the dynamic inner demo in `DemoLauncher` (which
 * includes `DemoErrorBoundary`). The thin `hello` demo follows the same pattern for parity.
 *
 * `demoProps` are forwarded to `Demo` (for one inner component shared by several routes).
 *
 * @param {{ Demo: import('react').ComponentType<any>, title: string, description?: string, demoProps?: object }} props
 */
export function DemoLauncher({ Demo, title, description, demoProps }) {
  const [started, setStarted] = useState(false);

  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (!started) {
    return (
      <div className="rounded-2xl border border-apple-border-soft bg-apple-gray/60 px-6 py-8">
        <h2 className="text-lg font-semibold text-apple-ink">{title}</h2>
        {description ? <p className="mt-2 max-w-[52ch] text-sm text-apple-gray-secondary">{description}</p> : null}
        <button
          type="button"
          className="mt-6 rounded-full bg-[#0071e3] px-5 py-2.5 text-sm font-semibold text-white motion-safe:transition-colors motion-safe:hover:bg-[#0077ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          onClick={() => setStarted(true)}
        >
          Start demo
        </button>
      </div>
    );
  }

  return (
    <DemoErrorBoundary>
      <Demo {...demoProps} reducedMotion={reducedMotion} />
    </DemoErrorBoundary>
  );
}
