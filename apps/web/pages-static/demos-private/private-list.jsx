'use client';

import Link from 'next/link';
import { UnlockForm, useUnlocked } from './gate.jsx';

export function PrivateList({ demos }) {
  const [state, setState, lock] = useUnlocked();

  if (state !== 'open') {
    return (
      <div className="page-shell py-[clamp(2.5rem,6vw,4rem)]">
        <h1 className="text-apple-ink">Private demos</h1>
        <p className="mt-4 max-w-[56ch] text-pretty text-[17px] leading-[1.47] text-text-1">
          A collection of games, simulations and tools I have built that are not public yet. Enter the password to see
          them.
        </p>
        {state === 'locked' ? <UnlockForm onUnlock={() => setState('open')} /> : null}
      </div>
    );
  }

  return (
    <div className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="text-apple-ink">Private demos</h1>
        <button
          type="button"
          onClick={lock}
          className="rounded-full border border-apple-border-mid px-4 py-2 text-sm font-semibold text-apple-ink hover:bg-apple-gray"
        >
          Lock
        </button>
      </div>
      <ul className="mt-12 grid list-none gap-6 p-0 md:grid-cols-2">
        {demos.map((d) => (
          <li
            key={d.slug}
            className="flex flex-col rounded-2xl border border-apple-border-soft bg-apple-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-apple-gray-secondary">{d.category}</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-apple-ink">{d.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-apple-gray-secondary">{d.summary}</p>
            <p className="mt-4 text-sm text-text-1">
              {d.deviceNeeds} · {d.durationHint}
            </p>
            <Link
              href={`/demos/private/${d.slug}`}
              className="mt-5 inline-flex w-fit rounded-full bg-[#0071e3] px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-[#0077ed]"
            >
              Open demo
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
