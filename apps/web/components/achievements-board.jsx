'use client';

import Image from 'next/image';
import Script from 'next/script';
import { useMemo, useState } from 'react';

const ALL = '__all__';
const ISSUER_UNSET = '__issuer_unset__';

export function AchievementsBoard({ achievements }) {
  const [issuerFilter, setIssuerFilter] = useState(ALL);
  const [skillFilter, setSkillFilter] = useState(ALL);

  const issuerOptions = useMemo(() => {
    const set = new Set();
    for (const a of achievements) {
      const issuer = 'issuer' in a && a.issuer?.trim() ? a.issuer.trim() : ISSUER_UNSET;
      set.add(issuer);
    }
    return [...set].sort((x, y) => x.localeCompare(y));
  }, [achievements]);

  const skillOptions = useMemo(() => {
    const set = new Set();
    for (const a of achievements) {
      for (const s of a.skills ?? []) {
        if (s.trim()) set.add(s.trim());
      }
    }
    return [...set].sort((x, y) => x.localeCompare(y));
  }, [achievements]);

  const isVisible = useMemo(() => {
    return (a) => {
      const issuer = 'issuer' in a && a.issuer?.trim() ? a.issuer.trim() : ISSUER_UNSET;
      if (issuerFilter !== ALL && issuer !== issuerFilter) return false;
      if (skillFilter === ALL) return true;
      return (a.skills ?? []).some((s) => s.trim() === skillFilter);
    };
  }, [achievements, issuerFilter, skillFilter]);

  const visibleCount = useMemo(() => achievements.filter(isVisible).length, [achievements, isVisible]);

  return (
    <>
      <Script src="https://cdn.credly.com/assets/utilities/embed.js" strategy="lazyOnload" />

      <div className="mt-10 flex max-w-[56rem] flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
        <label className="flex min-w-[12rem] flex-1 flex-col gap-1.5 text-sm font-medium text-apple-ink">
          Issuer
          <select
            value={issuerFilter}
            onChange={(e) => setIssuerFilter(e.target.value)}
            className="rounded-xl border border-apple-border-soft bg-apple-white px-3 py-2.5 text-[15px] text-apple-ink shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            <option value={ALL}>All issuers</option>
            {issuerOptions.map((iss) => (
              <option key={iss} value={iss}>
                {iss === ISSUER_UNSET ? '(Issuer not set)' : iss}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-[12rem] flex-1 flex-col gap-1.5 text-sm font-medium text-apple-ink">
          Skill
          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="rounded-xl border border-apple-border-soft bg-apple-white px-3 py-2.5 text-[15px] text-apple-ink shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            <option value={ALL}>All skills</option>
            {skillOptions.map((sk) => (
              <option key={sk} value={sk}>
                {sk}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visibleCount === 0 ? (
        <p className="mt-10 text-center text-[15px] text-apple-gray-secondary">No achievements match these filters.</p>
      ) : null}

      <ul className="mt-10 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a) => (
            <li key={a.id} className="flex flex-col" hidden={!isVisible(a)}>
              {a.kind === 'credly_embed' ? (
                <div className="flex flex-col items-center rounded-2xl border border-apple-border-soft bg-apple-white px-3 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <div
                    className="credly-badge-embed flex min-h-[270px] w-full items-center justify-center"
                    data-iframe-width="150"
                    data-iframe-height="270"
                    data-share-badge-id={a.shareBadgeId}
                    data-share-badge-host="https://www.credly.com"
                  />
                  {a.issuer ? <p className="mt-3 text-center text-[13px] text-apple-gray-secondary">{a.issuer}</p> : null}
                  {a.skills?.length ? (
                    <ul className="mt-2 flex flex-wrap justify-center gap-1">
                      {a.skills.map((s) => (
                        <li
                          key={s}
                          className="rounded-full bg-apple-gray px-2 py-0.5 text-[11px] font-medium text-apple-ink ring-1 ring-apple-border-soft"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : (
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-apple-border-soft bg-apple-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <div className="relative aspect-[4/3] w-full bg-apple-gray">
                    <Image
                      src={a.certificateImage}
                      alt={a.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-4 py-4">
                    <h2 className="text-[16px] font-semibold leading-snug text-apple-ink">{a.title}</h2>
                    <p className="mt-1 text-[12px] font-medium text-apple-gray-secondary">{a.issuer}</p>
                    <p className="mt-1 text-[12px] text-apple-gray-secondary">Issued {a.issueDate}</p>
                    {a.description ? (
                      <p className="mt-3 text-[14px] leading-relaxed text-text-1">{a.description}</p>
                    ) : null}
                    {a.skills?.length ? (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {a.skills.map((s) => (
                          <li
                            key={s}
                            className="rounded-full bg-apple-gray px-2.5 py-0.5 text-[11px] font-medium text-apple-ink ring-1 ring-apple-border-soft"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              )}
            </li>
          ))}
      </ul>
    </>
  );
}
