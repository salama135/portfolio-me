export const metadata = {
  title: 'Projects',
  description: 'Selected work and case studies.',
};

export default function ProjectsPage() {
  return (
    <div className="page-shell">
      <h1>Projects</h1>
      <p className="mt-4 max-w-[60ch] text-pretty text-lg text-text-1">
        Project listings will load from <code>content/projects/*.json</code> (see tasks T027–T029).
      </p>
    </div>
  );
}
