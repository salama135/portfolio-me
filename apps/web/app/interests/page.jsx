import Image from 'next/image';
import { withBase } from '../../lib/base-path.js';
import { loadInterests } from '../../lib/content/load/interests.js';

export const metadata = {
  title: 'Interests',
  description: 'Hobbies and curiosity outside of work.',
};

export default async function InterestsPage() {
  const interests = await loadInterests();

  return (
    <div className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
      <div className="max-w-[70ch]">
        <h1 className="text-apple-ink">Interests</h1>
        <p className="mt-4 max-w-[55ch] text-pretty text-[17px] leading-[1.47] text-text-1">
          Short notes on what keeps energy high when the screen turns off. Content loads from <code>content/interests.json</code>.
        </p>
      </div>

      <ul className="mt-14 grid list-none gap-10 p-0 md:grid-cols-2">
        {interests.map((item) => (
          <li key={item.id} className="flex flex-col rounded-2xl border border-apple-border-soft bg-apple-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
            {item.image ? (
              <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden rounded-xl bg-apple-gray">
                <Image
                  src={withBase(item.image)}
                  alt={`${item.title} (interest photo)`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            ) : null}
            <h2 className="text-xl font-semibold tracking-tight text-apple-ink">{item.title}</h2>
            {item.body ? <p className="mt-3 text-[17px] leading-[1.47] text-text-1">{item.body}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
