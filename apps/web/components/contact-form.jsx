'use client';

import { useCallback, useMemo, useState } from 'react';

/**
 * @param {{ mailtoHref: string | null }} props
 */
export function ContactForm({ mailtoHref }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [hint, setHint] = useState(null);

  const address = useMemo(() => {
    if (!mailtoHref || !mailtoHref.startsWith('mailto:')) return null;
    const raw = mailtoHref.slice('mailto:'.length);
    const q = raw.indexOf('?');
    return (q === -1 ? raw : raw.slice(0, q)).trim() || null;
  }, [mailtoHref]);

  const submitMailto = useCallback(() => {
    setError(null);
    setHint(null);
    const n = name.trim();
    const e = email.trim();
    const m = message.trim();
    if (!n) {
      setError('Please add your name.');
      return;
    }
    if (!e || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      setError('Please add a valid email address.');
      return;
    }
    if (m.length < 12) {
      setError('Please write a bit more context (at least a sentence or two).');
      return;
    }
    if (!address) {
      setError('Email is not configured for this site.');
      return;
    }
    const subject = encodeURIComponent(`Portfolio contact from ${n}`);
    const body = encodeURIComponent(
      [`From: ${n}`, `Reply email: ${e}`, '', m].join('\n'),
    );
    const href = `mailto:${address}?subject=${subject}&body=${body}`;
    window.location.href = href;
    setHint('If your mail app did not open, copy the address from the error state or use the direct email link below.');
  }, [address, name, email, message]);

  if (!mailtoHref || !address) {
    return (
      <div
        className="mt-10 rounded-2xl border border-amber-200/90 bg-amber-50 px-5 py-4 text-[15px] leading-relaxed text-amber-950"
        role="alert"
      >
        <p className="font-semibold">Contact is not fully configured</p>
        <p className="mt-2">
          Add a <code>mailto:…</code> value under <code>social.email</code> in <code>content/site-profile.json</code>, then
          rebuild.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-[36rem]">
      <h2 className="text-lg font-semibold text-apple-ink">Send a message</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-apple-gray-secondary">
        This form composes an email in your default mail client. Nothing is stored on this server.
      </p>
      <form
        className="mt-6 space-y-4"
        onSubmit={(ev) => {
          ev.preventDefault();
          submitMailto();
        }}
        noValidate
      >
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold text-apple-ink">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-apple-border-mid bg-apple-white px-4 py-3 text-[16px] text-apple-ink outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-semibold text-apple-ink">
            Your email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-apple-border-mid bg-apple-white px-4 py-3 text-[16px] text-apple-ink outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="block text-sm font-semibold text-apple-ink">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1.5 w-full resize-y rounded-xl border border-apple-border-mid bg-apple-white px-4 py-3 text-[16px] text-apple-ink outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          />
        </div>
        {error ? (
          <p className="rounded-xl border border-amber-200/90 bg-amber-50 px-4 py-3 text-sm text-amber-950" role="alert">
            {error}
          </p>
        ) : null}
        {hint ? <p className="text-sm text-apple-gray-secondary">{hint}</p> : null}
        <button
          type="submit"
          className="rounded-full bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0077ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        >
          Open mail app
        </button>
      </form>
    </div>
  );
}
