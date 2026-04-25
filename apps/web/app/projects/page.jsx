import Image from 'next/image';
import Link from 'next/link';
import { ContentEmptyState } from '../../components/content-empty-state.jsx';
import { loadProjects } from '../../lib/content/load/projects.js';
import { routeProject } from '../../lib/constants/routes.js';

export const metadata = {
  title: 'Projects',
  description: 'Selected work and case studies.',
};

export default async function ProjectsPage() {
  const projects = await loadProjects();

  return (
    <div className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
      <div className="max-w-[70ch]">
        <h1 className="text-apple-ink">Projects</h1>
        <p className="mt-4 max-w-[60ch] text-pretty text-[17px] leading-[1.47] text-text-1">
          Case studies load from <code>content/projects</code> as JSON or MDX with shared frontmatter.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="mt-14">
          <ContentEmptyState
            title="No projects yet"
            description="Add files under content/projects (*.json or *.mdx). Each entry is validated at build time with the Project schema."
          />
        </div>
      ) : (
        <ul className="mt-14 grid list-none gap-10 p-0 lg:grid-cols-2">
          {projects.map((p) => (
            <li key={p.slug} className="flex flex-col">
              <Link
                href={routeProject(p.slug)}
                className="group block overflow-hidden rounded-2xl border border-apple-border-soft bg-apple-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                {p.coverImage ? (
                  <div className="relative aspect-[16/10] w-full bg-apple-gray">
                    <Image
                      src={p.coverImage}
                      alt={`${p.title} cover`}
                      fill
                      className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ) : null}
                <div className="px-6 py-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {p.featured ? (
                      <span className="rounded-full bg-apple-gray px-2.5 py-0.5 text-xs font-semibold text-apple-ink">
                        Featured
                      </span>
                    ) : null}
                    {p.techLabels?.slice(0, 3).map((t) => (
                      <span key={t} className="text-xs font-medium text-apple-gray-secondary">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-apple-ink group-hover:text-apple-link">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-apple-gray-secondary">{p.summary}</p>
                  <p className="mt-3 text-sm font-medium text-apple-ink">{p.role}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
