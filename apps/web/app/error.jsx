'use client';

export default function Error({ error, reset }) {
  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <h1 className="text-2xl font-semibold text-white">Something went wrong</h1>
      <p className="mt-2 text-zinc-400">{error?.message ?? 'Unexpected error'}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-md bg-cyan-500 px-4 py-2 text-sm font-medium text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
      >
        Try again
      </button>
    </div>
  );
}
