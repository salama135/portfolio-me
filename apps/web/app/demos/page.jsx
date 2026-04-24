import { loadDemosRegistry } from '../../lib/content/load/demos-registry.js';

export const metadata = {
  title: 'Demos',
  description: 'Interactive live demos.',
};

export default async function DemosPage() {
  const demos = await loadDemosRegistry();

  return (
    <div className="page-shell">
      <h1>Demos</h1>
      <p className="mt-3 max-w-[62ch] text-pretty text-lg text-text-1">
        Interactive showcases (VR, AR, 3D, creative coding) register in <code>content/demos.json</code>.
      </p>
      {demos.length === 0 ? (
        <p className="mt-14 rounded-2xl border border-dashed border-border bg-surface-1/50 px-8 py-14 text-center text-text-2">
          No demos published yet.
        </p>
      ) : (
        <ul className="mt-12 space-y-5">
          {demos.map((d) => (
            <li key={d.slug} className="rounded-2xl border border-border bg-surface-1/60 px-6 py-5">
              <h2 className="text-xl font-semibold text-text-0">{d.title}</h2>
              <p className="mt-2 text-sm text-text-2">{d.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
