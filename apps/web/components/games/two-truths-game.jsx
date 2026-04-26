'use client';

import { useCallback, useMemo, useState } from 'react';

/**
 * @param {{
 *   title: string,
 *   intro: string,
 *   rounds: { id: string, statements?: { text: string, isLie?: boolean }[] }[],
 *   outcomes: { id: string, message: string }[],
 * }} pack
 */
export function TwoTruthsGame({ pack }) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [solved, setSolved] = useState(false);

  const round = pack.rounds[roundIndex];
  const statements = useMemo(() => {
    const raw = round?.statements;
    if (!Array.isArray(raw) || raw.length === 0) return [];
    return raw.filter((s) => s && typeof s.text === 'string');
  }, [round]);

  const outcomeById = useMemo(() => {
    const map = new Map();
    for (const o of pack.outcomes) map.set(o.id, o.message);
    return map;
  }, [pack.outcomes]);

  const pickStatement = useCallback(
    (index) => {
      if (solved) return;
      const st = statements[index];
      if (!st) return;
      const lie = Boolean(st.isLie);
      if (lie) {
        setFeedback({ tone: 'ok', text: outcomeById.get('correct') ?? 'Correct — that was the lie.' });
        setSolved(true);
      } else {
        setFeedback({ tone: 'bad', text: outcomeById.get('wrong') ?? 'Not quite — try another statement.' });
      }
    },
    [statements, outcomeById, solved],
  );

  const nextRound = useCallback(() => {
    setFeedback(null);
    setSolved(false);
    setRoundIndex((i) => Math.min(i + 1, pack.rounds.length - 1));
  }, [pack.rounds.length]);

  if (!round || statements.length === 0) {
    return (
      <p className="mt-8 rounded-xl border border-apple-border-soft bg-apple-gray/50 px-4 py-3 text-[15px] text-text-1">
        This game pack is missing <code>rounds[].statements</code> with <code>text</code> and <code>isLie</code> flags. Edit{' '}
        <code>content/games/two-truths.json</code>.
      </p>
    );
  }

  return (
    <div className="mt-10 max-w-[40rem]">
      <p className="text-sm font-medium text-apple-gray-secondary">
        Round {roundIndex + 1} of {pack.rounds.length}
      </p>
      <p className="mt-2 text-[17px] leading-relaxed text-text-1">{pack.intro}</p>

      <ul className="mt-8 list-none space-y-3 p-0" role="list">
        {statements.map((s, idx) => (
          <li key={`${round.id}-${idx}`}>
            <button
              type="button"
              disabled={solved}
              onClick={() => pickStatement(idx)}
              className="w-full rounded-2xl border border-apple-border-soft bg-apple-white px-5 py-4 text-left text-[16px] font-medium leading-snug text-apple-ink shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] disabled:pointer-events-none disabled:opacity-50"
            >
              {s.text}
            </button>
          </li>
        ))}
      </ul>

      {feedback ? (
        <output
          className={`mt-6 block rounded-2xl border px-4 py-3 text-[15px] leading-relaxed ${
            feedback.tone === 'ok'
              ? 'border-emerald-200/80 bg-emerald-50 text-emerald-950'
              : 'border-amber-200/80 bg-amber-50 text-amber-950'
          }`}
          aria-live="polite"
        >
          {feedback.text}
        </output>
      ) : null}

      {roundIndex < pack.rounds.length - 1 ? (
        <button
          type="button"
          onClick={nextRound}
          className="mt-8 rounded-full border border-apple-border-mid bg-apple-gray/60 px-5 py-2.5 text-sm font-semibold text-apple-ink transition-colors hover:bg-apple-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        >
          Next round
        </button>
      ) : null}
    </div>
  );
}
