export default function DemosLoading() {
  return (
    <div className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]" aria-busy="true" aria-live="polite">
      <div className="h-9 max-w-md animate-pulse rounded-lg bg-apple-gray/80" />
      <div className="mt-4 h-24 max-w-[62ch] animate-pulse rounded-xl bg-apple-gray/60" />
      <div className="mt-3 h-16 max-w-[58ch] animate-pulse rounded-xl bg-apple-gray/50" />
      <ul className="mt-12 grid list-none gap-6 p-0 md:grid-cols-2">
        {['alpha', 'beta', 'gamma', 'delta'].map((slot) => (
          <li
            key={slot}
            className="flex min-h-[280px] flex-col rounded-2xl border border-apple-border-soft bg-apple-gray/40 p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          >
            <div className="h-3 w-20 animate-pulse rounded bg-apple-gray/90" />
            <div className="mt-4 h-7 w-3/4 max-w-xs animate-pulse rounded-lg bg-apple-gray/80" />
            <div className="mt-3 h-16 w-full animate-pulse rounded-lg bg-apple-gray/60" />
            <div className="mt-4 grid flex-1 gap-2">
              <div className="h-10 animate-pulse rounded-md bg-apple-gray/50" />
              <div className="h-10 animate-pulse rounded-md bg-apple-gray/50" />
            </div>
            <div className="mt-5 h-10 w-28 animate-pulse rounded-full bg-apple-gray/70" />
          </li>
        ))}
      </ul>
    </div>
  );
}
