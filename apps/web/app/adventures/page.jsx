import Image from 'next/image';
import { loadAdventures } from '../../lib/content/load/adventures.js';

export const metadata = {
  title: 'Adventures',
  description: 'Photo-forward notes from the trail and road.',
};

export default async function AdventuresPage() {
  const adventures = await loadAdventures();

  return (
    <div className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
      <div className="max-w-[70ch]">
        <h1 className="text-apple-ink">Adventures</h1>
        <p className="mt-4 max-w-[58ch] text-pretty text-[17px] leading-[1.47] text-text-1">
          Life chapters from <code>content/adventures.json</code>. Each image includes required <code>alt</code> text; cards use a
          calm grid so the photography leads.
        </p>
      </div>

      <div className="mt-12 space-y-12 sm:space-y-16">
        {adventures.map((adv) => (
          <section
            key={adv.slug}
            aria-labelledby={`adv-${adv.slug}`}
            className="rounded-2xl border border-apple-border-soft bg-apple-gray/25 px-5 py-8 sm:px-8 sm:py-10"
          >
            <header className="max-w-[70ch]">
              <h2 id={`adv-${adv.slug}`} className="text-2xl font-semibold tracking-tight text-apple-ink">
                {adv.title}
              </h2>
              {adv.description ? (
                <p className="mt-3 max-w-[60ch] text-[17px] leading-[1.47] text-text-1">{adv.description}</p>
              ) : null}
            </header>

            <ul className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {adv.media.map((m, i) => (
                <li key={`${adv.slug}-${i}`} className="flex min-w-0 flex-col">
                  {m.type === 'image' ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-apple-border-soft bg-apple-white shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                      <Image src={m.src} alt={m.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                    </div>
                  ) : (
                    <div
                      className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-apple-border-mid bg-apple-white text-sm text-apple-gray-secondary"
                      role="img"
                      aria-label={m.alt || 'Video placeholder'}
                    >
                      Video embed placeholder
                    </div>
                  )}
                  {m.caption ? (
                    <p className="mt-3 text-[15px] leading-snug text-apple-gray-secondary">{m.caption}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
