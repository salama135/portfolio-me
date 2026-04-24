import { loadDemosRegistry } from '../../lib/content/load/demos-registry.js';

export const metadata = {
  title: 'Demos',
  description: 'Interactive live demos.',
};

export default async function DemosPage() {
  const demos = await loadDemosRegistry();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-white">Demos</h1>
      <p className="mt-2 text-zinc-400">Interactive showcases (VR, AR, 3D, creative coding) will register in `content/demos.json`.</p>
      {demos.length === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed border-zinc-700 p-8 text-center text-zinc-500">No demos published yet.</p>
      ) : (
        <ul className="mt-10 space-y-4">
          {demos.map((d) => (
            <li key={d.slug} className="rounded-lg border border-white/10 p-4">
              <h2 className="font-semibold text-white">{d.title}</h2>
              <p className="text-sm text-zinc-400">{d.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
