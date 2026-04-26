import Link from 'next/link';
import { ContentEmptyState } from '../../components/content-empty-state.jsx';
import { ROUTES } from '../../lib/constants/routes.js';
import { loadResume } from '../../lib/content/load/resume.js';

export const metadata = {
  title: 'Resume',
  description: 'Experience, education, and technical skills.',
};

function isPlaceholderResume(resume) {
  return [...resume.experiences, ...resume.education].some((row) => String(row.id).includes('placeholder'));
}

export default async function ResumePage() {
  const resume = await loadResume();
  const placeholder = isPlaceholderResume(resume);

  return (
    <div className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
      <div className="max-w-[70ch]">
        <h1 className="text-apple-ink">Resume</h1>
        <p className="mt-4 max-w-[60ch] text-pretty text-[17px] leading-[1.47] text-text-1">
          Anchored sections for hiring managers. Source: <code>content/resume.json</code>.
        </p>
        <nav aria-label="Resume sections" className="mt-8 flex flex-wrap gap-3 text-sm">
          <a
            href="#experience"
            className="rounded-full border border-apple-border-soft bg-apple-gray/60 px-4 py-2 font-medium text-apple-ink transition-colors hover:bg-apple-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Experience
          </a>
          <a
            href="#education"
            className="rounded-full border border-apple-border-soft bg-apple-gray/60 px-4 py-2 font-medium text-apple-ink transition-colors hover:bg-apple-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Education
          </a>
          <a
            href="#skills"
            className="rounded-full border border-apple-border-soft bg-apple-gray/60 px-4 py-2 font-medium text-apple-ink transition-colors hover:bg-apple-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Skills
          </a>
        </nav>
      </div>

      {placeholder ? (
        <div className="mt-12 max-w-[56rem]">
          <ContentEmptyState
            title="Resume content is still the placeholder"
            description="Replace the sample entries in content/resume.json with your real experience, education, and skill groups. Sections below preview the current file."
          />
        </div>
      ) : null}

      <section id="experience" className="mt-14 scroll-mt-24">
        <h2 className="text-xl font-semibold text-apple-ink">Experience</h2>
        {resume.experiences.length === 0 ? (
          <p className="mt-4 text-[15px] text-apple-gray-secondary">No experience entries yet.</p>
        ) : (
          <ul className="mt-6 list-none space-y-8 p-0">
            {resume.experiences.map((job) => (
              <li key={job.id} className="rounded-2xl border border-apple-border-soft bg-apple-white px-6 py-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <p className="text-lg font-semibold text-apple-ink">{job.title}</p>
                <p className="mt-1 text-[15px] text-apple-gray-secondary">
                  {job.organization}
                  {job.location ? ` · ${job.location}` : ''}
                  {job.startDate || job.endDate ? (
                    <>
                      {' '}
                      · {job.startDate ?? '?'} — {job.endDate ?? 'Present'}
                    </>
                  ) : null}
                </p>
                {job.summary ? <p className="mt-3 text-[17px] leading-relaxed text-text-1">{job.summary}</p> : null}
                {job.highlights?.length ? (
                  <ul className="mt-4 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-text-1">
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="education" className="mt-16 scroll-mt-24">
        <h2 className="text-xl font-semibold text-apple-ink">Education</h2>
        {resume.education.length === 0 ? (
          <p className="mt-4 text-[15px] text-apple-gray-secondary">No education entries yet.</p>
        ) : (
          <ul className="mt-6 list-none space-y-6 p-0">
            {resume.education.map((edu) => (
              <li key={edu.id} className="rounded-2xl border border-apple-border-soft bg-apple-gray/40 px-6 py-5">
                <p className="font-semibold text-apple-ink">{edu.degree}</p>
                <p className="mt-1 text-[15px] text-apple-gray-secondary">
                  {edu.institution}
                  {edu.location ? ` · ${edu.location}` : ''}
                  {edu.startDate || edu.endDate ? (
                    <>
                      {' '}
                      · {edu.startDate ?? '?'} — {edu.endDate ?? 'Present'}
                    </>
                  ) : null}
                </p>
                {edu.summary ? <p className="mt-3 text-[15px] leading-relaxed text-text-1">{edu.summary}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="skills" className="mt-16 scroll-mt-24">
        <h2 className="text-xl font-semibold text-apple-ink">Technical skills</h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          {[
            { title: 'Programming languages', items: resume.skillGroups.programmingLanguages },
            { title: 'Frameworks & platforms', items: resume.skillGroups.frameworks },
            { title: 'Development concepts', items: resume.skillGroups.concepts },
            { title: 'Tools & platforms', items: resume.skillGroups.tools },
          ].map((group) => (
            <div key={group.title} className="rounded-2xl border border-apple-border-soft bg-apple-white px-5 py-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-apple-gray-secondary">{group.title}</h3>
              {group.items.length === 0 ? (
                <p className="mt-3 text-[14px] text-apple-gray-secondary">—</p>
              ) : (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full bg-apple-gray px-3 py-1 text-[13px] font-medium text-apple-ink ring-1 ring-apple-border-soft"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <p className="mt-14 text-center text-sm text-apple-gray-secondary">
        Prefer a PDF? Add a link in{' '}
        <Link href={ROUTES.links} className="text-apple-link underline-offset-2 hover:underline">
          Links
        </Link>{' '}
        or <code>site-profile.json</code>.
      </p>
    </div>
  );
}
