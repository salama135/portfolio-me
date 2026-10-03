'use client';

import { useEffect, useState } from 'react';
import { PASSWORD_HASH } from './password-hash.js';

/**
 * Browser-side password check for the static (GitHub Pages) build.
 * This only hides the collection from casual visitors: the demo files themselves are
 * public static files. The real server-checked gate is the Netlify build.
 */
const KEY = 'private-demos-unlocked';

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

export function useUnlocked() {
  const [state, setState] = useState('checking');
  useEffect(() => {
    let ok = false;
    try {
      ok = PASSWORD_HASH !== '' && sessionStorage.getItem(KEY) === PASSWORD_HASH;
    } catch {}
    // reading sessionStorage has to wait for the browser
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(ok ? 'open' : 'locked');
  }, []);
  const lock = () => {
    try {
      sessionStorage.removeItem(KEY);
    } catch {}
    setState('locked');
  };
  return [state, setState, lock];
}

export function UnlockForm({ onUnlock }) {
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  if (!PASSWORD_HASH) {
    return (
      <p className="mt-8 max-w-[56ch] rounded-2xl border border-dashed border-apple-border-mid bg-apple-gray/50 px-6 py-5 text-sm text-apple-gray-secondary">
        Locked: no password was set for this build.
      </p>
    );
  }

  async function submit(e) {
    e.preventDefault();
    setPending(true);
    const given = await sha256(`private-demos:${new FormData(e.currentTarget).get('password')}`);
    setPending(false);
    if (given !== PASSWORD_HASH) {
      setError('That password is not right.');
      return;
    }
    try {
      sessionStorage.setItem(KEY, PASSWORD_HASH);
    } catch {}
    onUnlock();
  }

  return (
    <form onSubmit={submit} className="mt-8 flex max-w-sm flex-col gap-3">
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
      />
      {error ? (
        <p id="private-demos-error" role="alert" className="text-sm text-[#c9302c]">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-full bg-[#0071e3] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? 'Checking…' : 'Unlock'}
      </button>
    </form>
  );
}
