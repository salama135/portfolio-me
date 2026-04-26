import Link from 'next/link';
import { AchievementsBoard } from '../../components/achievements-board.jsx';
import { ContentEmptyState } from '../../components/content-empty-state.jsx';
import { ROUTES } from '../../lib/constants/routes.js';
import { loadAchievements } from '../../lib/content/load/achievements.js';

export const metadata = {
  title: 'Achievements',
  description: 'Credentials and certifications (Credly embeds and manual certificates).',
};

export default async function AchievementsPage() {
  const achievements = await loadAchievements();

  return (
    <div className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
      <div className="max-w-[70ch]">
        <h1 className="text-apple-ink">Achievements</h1>
        <p className="mt-4 max-w-[62ch] text-pretty text-[17px] leading-[1.47] text-text-1">
          Entries come from <code>content/achievements.json</code>: each row is either a <strong>Credly embed</strong> (official
          iframe via <code>shareBadgeId</code>) or a <strong>manual</strong> certificate with image, title, description, issue
          date, issuer, and skills. Filter by issuer and skill below. If the file is empty, URLs from <code>poc/credly-badges.json</code>{' '}
          are converted automatically until you publish a curated list.
        </p>
      </div>

      {achievements.length === 0 ? (
        <div className="mt-14 max-w-[56rem]">
          <ContentEmptyState
            title="No achievements yet"
            description="Create content/achievements.json with an { achievements: [...] } array, or add badge URLs to poc/credly-badges.json for a temporary Credly-only list."
          />
        </div>
      ) : (
        <AchievementsBoard achievements={achievements} />
      )}

      <p className="mt-14 text-center text-sm text-apple-gray-secondary">
        Milestones from <Link href={ROUTES.about}>About</Link> can be merged into this file over time.
      </p>
    </div>
  );
}
