import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TwoTruthsGame } from '../../../components/games/two-truths-game.jsx';
import { ROUTES } from '../../../lib/constants/routes.js';
import { loadGamePackById, loadGamePacks } from '../../../lib/content/load/games.js';

export async function generateStaticParams() {
  const packs = await loadGamePacks();
  return packs.map((p) => ({ gameId: p.gameId }));
}

/** @param {{ params: Promise<{ gameId: string }> }} props */
export async function generateMetadata({ params }) {
  const { gameId } = await params;
  const pack = await loadGamePackById(gameId);
  if (!pack) return { title: 'Game' };
  return {
    title: pack.title,
    description: pack.intro.slice(0, 160),
  };
}

/** @param {{ params: Promise<{ gameId: string }> }} props */
export default async function GamePlayPage({ params }) {
  const { gameId } = await params;
  const pack = await loadGamePackById(gameId);
  if (!pack) notFound();

  const serializablePack = JSON.parse(JSON.stringify(pack));
  const isTwoTruths = pack.gameId === 'two-truths';

  return (
    <div className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
      <p className="text-sm text-apple-gray-secondary">
        <Link href={ROUTES.games} className="text-apple-link underline-offset-2 hover:underline">
          ← All games
        </Link>
      </p>
      <h1 className="mt-6 text-apple-ink">{pack.title}</h1>
      <p className="mt-4 max-w-[62ch] text-[17px] leading-relaxed text-text-1">{pack.intro}</p>

      {isTwoTruths ? (
        <TwoTruthsGame pack={serializablePack} />
      ) : (
        <>
          <section className="mt-12" aria-labelledby="rounds-heading">
            <h2 id="rounds-heading" className="text-lg font-semibold text-apple-ink">
              Rounds
            </h2>
            <ol className="mt-6 list-decimal space-y-6 pl-6 text-[15px] leading-relaxed text-text-1">
              {pack.rounds.map((round) => (
                <li key={round.id}>
                  <span className="font-medium text-apple-ink">Round {round.id}</span>
                  <pre className="mt-2 max-w-full overflow-x-auto rounded-xl bg-apple-gray/80 p-4 text-[13px] text-apple-ink">
                    {JSON.stringify(round, null, 2)}
                  </pre>
                </li>
              ))}
            </ol>
          </section>
          <p className="mt-10 text-[14px] text-apple-gray-secondary">
            Add a dedicated client game component for this <code>gameId</code>, or reuse the Two Truths pattern in{' '}
            <code>components/games/two-truths-game.jsx</code>.
          </p>
        </>
      )}
    </div>
  );
}
