'use client';

import { useActionState } from 'react';
import { unlockPrivateDemos } from './actions.js';

/** @param {{ next?: string }} props */
export function UnlockForm({ next }) {
  const [state, action, pending] = useActionState(unlockPrivateDemos, null);

  return (
    <form action={action} className="mt-8 flex max-w-sm flex-col gap-3">
      <input type="hidden" name="next" value={next ?? ''} />
      <label htmlFor="private-demos-password" className="text-sm font-semibold text-apple-ink">
        Password
      </label>
      <input
        id="private-demos-password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        className="rounded-xl border border-apple-border-mid bg-apple-white px-4 py-2.5 text-apple-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        aria-describedby={state?.error ? 'private-demos-error' : undefined}
      />
      {state?.error ? (
        <p id="private-demos-error" role="alert" className="text-sm text-[#c9302c]">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-full bg-[#0071e3] px-5 py-2.5 text-sm font-semibold text-white motion-safe:transition-colors motion-safe:hover:bg-[#0077ed] disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
      >
        {pending ? 'Checking…' : 'Unlock'}
      </button>
    </form>
  );
}
