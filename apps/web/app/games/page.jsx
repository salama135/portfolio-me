import Link from 'next/link';
import { ContentEmptyState } from '../../components/content-empty-state.jsx';
import { routeGame } from '../../lib/constants/routes.js';
import { loadGamePacks } from '../../lib/content/load/games.js';

export const metadata = {
  title: 'Games',
  description: 'Light ice-breakers to learn more about me.',
};

export default async function GamesHubPage() {
  const packs = await loadGamePacks();

  return (
    <div className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
      <div className="max-w-[70ch]">
        <h1 className="text-apple-ink">Games</h1>
        <p className="mt-4 max-w-[60ch] text-pretty text-[17px] leading-[1.47] text-text-1">
          Short, in-browser games—no accounts, no saved data. Pick one to play.
        </p>
      </div>

      {packs.length === 0 ? (
        <div className="mt-14 max-w-[56rem]">
          <ContentEmptyState
            title="No games yet"
            description="Add JSON packs under content/games/*.json (see contracts in the portfolio spec kit). Each file must include gameId, title, intro, rounds, and outcomes."
          />
        </div>
      ) : (
        <ul className="mt-14 grid list-none gap-8 p-0 sm:grid-cols-2">
          {packs.map((g) => (
            <li key={g.gameId}>
              <Link
                href={routeGame(g.gameId)}
                className="block rounded-2xl border border-apple-border-soft bg-apple-white px-6 py-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <h2 className="text-lg font-semibold text-apple-ink">{g.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-text-1">{g.intro}</p>
                <span className="mt-6 inline-block text-sm font-medium text-apple-link">Play →</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
