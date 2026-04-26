import Link from 'next/link';
import { AchievementsBoard } from '../../components/achievements-board.jsx';
import { ContentEmptyState } from '../../components/content-empty-state.jsx';
import { ROUTES } from '../../lib/constants/routes.js';
import { loadAchievements } from '../../lib/content/load/achievements.js';
import { loadAchievementsMeta } from '../../lib/content/load/achievements-meta.js';
import { loadHighlights } from '../../lib/content/load/highlights.js';

export const metadata = {
  title: 'Achievements',
  description: 'Credentials and certifications (Credly embeds and manual certificates).',
};

export default async function AchievementsPage() {
  const achievements = await loadAchievements();
  const meta = await loadAchievementsMeta();
  const highlights = await loadHighlights();

  const h1 = meta?.headline ?? 'Achievements';

  return (
    <div className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
      <div className="max-w-[70ch]">
        <h1 className="text-apple-ink">{h1}</h1>
        {meta?.intro ? (
          <p className="mt-4 max-w-[62ch] text-pretty text-[17px] leading-[1.47] text-text-1">{meta.intro}</p>
        ) : (
          <p className="mt-4 max-w-[62ch] text-pretty text-[17px] leading-[1.47] text-text-1">
            Entries come from <code>content/achievements.json</code>: each row is either a <strong>Credly embed</strong>{' '}
            (official iframe via <code>shareBadgeId</code>) or a <strong>manual</strong> certificate with image, title,
            description, issue date, issuer, and skills. Filter by issuer and skill below. Optional copy lives in{' '}
            <code>content/achievements-meta.json</code>.
          </p>
        )}
      </div>

      {highlights.length > 0 ? (
        <section className="mt-14 max-w-[min(56rem,100%)]" aria-labelledby="milestones-heading">
          <h2 id="milestones-heading" className="text-xl font-semibold text-apple-ink">
            {meta?.milestonesHeading ?? 'Milestones'}
          </h2>
          <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-apple-gray-secondary">
            Narrative highlights from <code>content/highlights.json</code>. They complement badges but do not replace verified
            credentials.
          </p>
          <ul className="mt-8 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h) => (
              <li
                key={h.id}
                className="flex flex-col rounded-2xl border border-apple-border-soft bg-apple-gray/35 px-5 py-5 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
              >
                <p className="text-[12px] font-semibold uppercase tracking-wide text-apple-gray-secondary">
                  {h.date ?? 'Milestone'}
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-apple-ink">{h.title}</h3>
                {h.description ? <p className="mt-3 text-[15px] leading-relaxed text-text-1">{h.description}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {achievements.length === 0 ? (
        <div className="mt-14 max-w-[56rem]">
          <ContentEmptyState
            title="No achievements yet"
            description="Create content/achievements.json with an { achievements: [...] } array, or add badge URLs to poc/credly-badges.json for a temporary Credly-only list."
          />
        </div>
      ) : (
        <div className="mt-14">
          <h2 className="sr-only">Badges and certificates</h2>
          <AchievementsBoard achievements={achievements} />
        </div>
      )}

      <p className="mt-14 text-center text-sm text-apple-gray-secondary">
        More context in <Link href={ROUTES.about}>About</Link> and <Link href={ROUTES.resume}>Resume</Link>.
      </p>
    </div>
  );
}
