import Image from 'next/image';
import { withBase } from '../../../lib/base-path.js';
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';
import { notFound } from 'next/navigation';
import { loadProjectBySlug, loadProjectSlugs } from '../../../lib/content/load/projects.js';
import { ROUTES } from '../../../lib/constants/routes.js';

export async function generateStaticParams() {
  const slugs = await loadProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await loadProjectBySlug(slug);
  if (!project) return { title: 'Project' };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await loadProjectBySlug(slug);
  if (!project) notFound();

  const { title, summary, role, scope, outcomes, techLabels, links, coverImage, body } = project;

  return (
    <article className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
      <p className="text-sm font-medium text-apple-link">
        <Link href={ROUTES.projects} className="no-underline hover:underline">
          Projects
        </Link>
        <span className="text-apple-gray-secondary"> / </span>
        <span className="text-apple-gray-secondary">{title}</span>
      </p>

      <header className="mt-6 max-w-[70ch]">
        <h1 className="text-apple-ink">{title}</h1>
        <p className="mt-4 text-[19px] font-semibold leading-snug text-text-1">{role}</p>
        {scope ? (
          <p className="mt-3 max-w-[62ch] text-[17px] leading-[1.47] text-apple-gray-secondary">
            <span className="font-semibold text-apple-ink">Scope.</span> {scope}
          </p>
        ) : null}
        <p className="mt-4 text-[17px] leading-[1.47] text-text-1">{summary}</p>
        {techLabels?.length ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {techLabels.map((t) => (
              <li key={t} className="rounded-full border border-apple-border-soft bg-apple-gray px-3 py-1 text-sm text-apple-ink">
                {t}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      {coverImage ? (
        <div className="relative mt-10 aspect-[16/9] w-full max-w-[min(100%,56rem)] overflow-hidden rounded-2xl border border-apple-border-soft bg-apple-gray">
          <Image src={withBase(coverImage)} alt={`${title} cover`} fill className="object-cover" sizes="(max-width: 900px) 100vw, 900px" priority />
        </div>
      ) : null}

      {outcomes ? (
        <section className="mt-10 max-w-[62ch]">
          <h2 className="text-xl font-semibold text-apple-ink">Outcomes</h2>
          <p className="mt-3 whitespace-pre-wrap text-[17px] leading-[1.47] text-text-1">{outcomes}</p>
        </section>
      ) : null}

      {links?.repo || links?.demo || links?.caseStudy ? (
        <ul className="mt-8 flex flex-wrap gap-4 text-sm font-semibold">
          {links.repo ? (
            <li>
              <a className="text-apple-link hover:underline" href={links.repo} rel="noreferrer" target="_blank">
                Repository
              </a>
            </li>
          ) : null}
          {links.demo ? (
            <li>
              <a className="text-apple-link hover:underline" href={withBase(links.demo)}>
                Demo
              </a>
            </li>
          ) : null}
          {links.caseStudy ? (
            <li>
              <a className="text-apple-link hover:underline" href={links.caseStudy} rel="noreferrer" target="_blank">
                Case study
              </a>
            </li>
          ) : null}
        </ul>
      ) : null}

      {body ? (
        <div className="markdown mt-12 max-w-[62ch]">
          <Markdown>{body}</Markdown>
        </div>
      ) : null}
    </article>
  );
}
