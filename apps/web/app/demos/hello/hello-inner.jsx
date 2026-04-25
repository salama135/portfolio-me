'use client';

/** @param {{ reducedMotion?: boolean }} _props */
export default function HelloInner(_props) {
  return (
    <div className="rounded-xl border border-apple-border-soft bg-apple-white px-6 py-8 text-apple-ink">
      <p className="text-lg font-semibold">Hello from the demo shell</p>
      <p className="mt-2 text-sm text-apple-gray-secondary">
        If you see this, the launcher imported this module on demand after you clicked Start demo.
      </p>
    </div>
  );
}
