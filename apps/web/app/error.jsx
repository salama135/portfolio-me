'use client';

export default function Error({ error, reset }) {
  return (
    <div className="page-shell py-[clamp(3rem,10vw,5rem)]">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-2">Error</p>
      <h1 className="mt-4">Something went wrong</h1>
      <p className="mt-3 max-w-[50ch] text-text-1">{error?.message ?? 'Unexpected error'}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#0071e3] px-6 py-2.5 text-sm font-semibold text-white transition-[box-shadow,background-color] duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-[#0077ed] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
      >
        Try again
      </button>
    </div>
  );
}
