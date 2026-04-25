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
          Galleries load from <code>content/adventures.json</code>. Every image carries required alt text for accessibility.
        </p>
      </div>

      <div className="mt-14 space-y-16">
        {adventures.map((adv) => (
          <section key={adv.slug} aria-labelledby={`adv-${adv.slug}`}>
            <div className="max-w-[70ch]">
              <h2 id={`adv-${adv.slug}`} className="text-2xl font-semibold tracking-tight text-apple-ink">
                {adv.title}
              </h2>
              {adv.description ? (
                <p className="mt-3 max-w-[60ch] text-[17px] leading-[1.47] text-text-1">{adv.description}</p>
              ) : null}
            </div>
            <ul className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {adv.media.map((m, i) => (
                <li key={`${adv.slug}-${i}`} className="flex flex-col">
                  {m.type === 'image' ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-apple-border-soft bg-apple-gray">
                      <Image src={m.src} alt={m.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-apple-border-mid bg-apple-gray text-sm text-apple-gray-secondary">
                      Video embed placeholder
                    </div>
                  )}
                  {m.caption ? <p className="mt-2 text-sm text-apple-gray-secondary">{m.caption}</p> : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
