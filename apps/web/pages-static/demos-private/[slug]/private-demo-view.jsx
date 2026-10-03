'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DemoLauncher } from '../../../../components/demo-launcher.jsx';
import { UnlockForm, useUnlocked } from '../gate.jsx';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function Frame({ src, title }) {
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-apple-border-soft bg-black">
        <iframe src={src} title={title} className="block h-[min(80vh,860px)] w-full border-0" allow="fullscreen; clipboard-write; autoplay" allowFullScreen />
      </div>
      <a href={src} target="_blank" rel="noopener" className="mt-3 inline-flex text-sm text-apple-link no-underline hover:underline">
        Open full screen ↗
      </a>
    </div>
  );
}

/** Pages answers a missing file with the site's 404 page, so check before framing it. */
function useFileExists(src, enabled) {
  const [exists, setExists] = useState(null);
  useEffect(() => {
    if (!enabled) return;
    let live = true;
    fetch(src, { method: 'HEAD' })
      .then((r) => live && setExists(r.ok))
      .catch(() => live && setExists(false));
    return () => {
      live = false;
    };
  }, [src, enabled]);
  return exists;
}

export function PrivateDemoView({ demo }) {
  const [state, setState] = useUnlocked();
  const src = `${BASE}/private-demos/${demo.slug}.html`;
  const exists = useFileExists(src, state === 'open');

  return (
    <div className="page-shell-wide py-[clamp(2rem,6vw,3rem)]">
      <Link href="/demos/private" className="text-sm text-apple-link no-underline hover:underline">
        ← Private demos
      </Link>
      <div className="mt-4">
        {state === 'open' && exists === false ? (
          <div className="rounded-2xl border border-dashed border-apple-border-mid bg-apple-gray/50 px-6 py-8">
            <h1 className="text-lg font-semibold text-apple-ink">{demo.title}</h1>
            <p className="mt-2 max-w-[52ch] text-sm text-apple-gray-secondary">
              This demo is listed but its page has not been added to the site yet.
            </p>
          </div>
        ) : state === 'open' && exists ? (
          <DemoLauncher
            Demo={Frame}
            title={demo.title}
            description={demo.summary}
            demoProps={{ src, title: demo.title }}
          />
        ) : state === 'locked' ? (
          <>
            <h1 className="text-apple-ink">Private demo</h1>
            <UnlockForm onUnlock={() => setState('open')} />
          </>
        ) : null}
      </div>
    </div>
  );
}
