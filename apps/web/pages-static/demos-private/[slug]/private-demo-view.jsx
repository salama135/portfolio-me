'use client';

import Link from 'next/link';
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

export function PrivateDemoView({ demo }) {
  const [state, setState] = useUnlocked();

  return (
    <div className="page-shell-wide py-[clamp(2rem,6vw,3rem)]">
      <Link href="/demos/private" className="text-sm text-apple-link no-underline hover:underline">
        ← Private demos
      </Link>
      <div className="mt-4">
        {state === 'open' ? (
          <DemoLauncher
            Demo={Frame}
            title={demo.title}
            description={demo.summary}
            demoProps={{ src: `${BASE}/private-demos/${demo.slug}.html`, title: demo.title }}
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
