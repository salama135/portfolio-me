export const metadata = {
  title: 'Projects',
  description: 'Selected work and case studies.',
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-white">Projects</h1>
      <p className="mt-2 text-zinc-400">Project listings will load from `content/projects/*.json` (see tasks T027–T029).</p>
    </div>
  );
}
