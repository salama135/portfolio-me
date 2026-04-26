'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { ROUTES } from '../../lib/constants/routes.js';

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

  const roundIssue = useMemo(() => {
    const raw = round?.statements;
    if (!Array.isArray(raw)) return 'This round is missing a statements array.';
    if (raw.length !== 3) return 'Two truths and a lie needs exactly three statements per round.';
    const valid = raw.filter((s) => s && typeof s.text === 'string' && s.text.trim().length > 0);
    if (valid.length !== 3) return 'Each statement needs non-empty text.';
    const lies = valid.filter((s) => Boolean(s.isLie)).length;
    if (lies !== 1) return 'Exactly one statement must have isLie: true.';
    return null;
  }, [round]);

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
      if (solved || roundIssue) return;
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
    [statements, outcomeById, solved, roundIssue],
  );

  const nextRound = useCallback(() => {
    setFeedback(null);
    setSolved(false);
    setRoundIndex((i) => Math.min(i + 1, pack.rounds.length - 1));
  }, [pack.rounds.length]);

  const isLastRound = roundIndex >= pack.rounds.length - 1;

  if (!round) {
    return (
      <p className="mt-8 rounded-xl border border-apple-border-soft bg-apple-gray/50 px-4 py-3 text-[15px] text-text-1">
        This pack has no rounds. Edit <code>content/games/two-truths.json</code>.
      </p>
    );
  }

  if (roundIssue) {
    return (
      <p className="mt-8 rounded-xl border border-amber-200/90 bg-amber-50 px-4 py-3 text-[15px] text-amber-950" role="alert">
        {roundIssue}
      </p>
    );
  }

  return (
    <div className="mt-10 max-w-[40rem]">
      <p className="text-sm font-medium text-apple-gray-secondary">
        Round {roundIndex + 1} of {pack.rounds.length}
      </p>
      <ul className="mt-8 list-none space-y-3 p-0" role="list">
        {statements.map((s, idx) => (
          <li key={`${round.id}-${idx}`}>
            <button
              type="button"
              disabled={solved}
              onClick={() => pickStatement(idx)}
              className="w-full rounded-2xl border border-apple-border-soft bg-apple-white px-5 py-4 text-left text-[16px] font-medium leading-snug text-apple-ink shadow-[0_2px_12px_rgba(0,0,0,0.04)] motion-safe:transition-shadow motion-safe:hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] disabled:pointer-events-none disabled:opacity-50"
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

      {solved && isLastRound ? (
        <p className="mt-6 text-[15px] leading-relaxed text-text-1">
          {outcomeById.get('complete') ?? 'You finished all rounds.'}
        </p>
      ) : null}

      {solved && !isLastRound ? (
        <button
          type="button"
          onClick={nextRound}
          className="mt-8 rounded-full border border-apple-border-mid bg-apple-gray/60 px-5 py-2.5 text-sm font-semibold text-apple-ink transition-colors hover:bg-apple-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        >
          Next round
        </button>
      ) : null}

      {solved && isLastRound ? (
        <p className="mt-8">
          <Link
            href={ROUTES.games}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0071e3] px-6 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#0077ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Back to games
          </Link>
        </p>
      ) : null}
    </div>
  );
}
