import Link from 'next/link';
import { HighlightsList } from '../../components/highlights-list.jsx';
import { ROUTES } from '../../lib/constants/routes.js';
import { loadHighlights } from '../../lib/content/load/highlights.js';
import { loadSiteProfile } from '../../lib/content/load/site-profile.js';

export const metadata = {
  title: 'About',
  description: 'Background and how I work.',
};

export default async function AboutPage() {
  const [profile, highlights] = await Promise.all([loadSiteProfile(), loadHighlights()]);

  return (
    <div className="page-shell py-[clamp(2.5rem,6vw,4rem)]">
      <h1>About</h1>
      <p className="mt-5 max-w-[62ch] text-pretty text-[19px] font-semibold leading-snug text-text-1">{profile.tagline}</p>
      <p className="mt-4 max-w-[62ch] text-[17px] leading-[1.47] text-text-1">
        {profile.roles.join(' · ')}: {profile.seo?.description ?? 'Engineering, instruction, and playful systems.'}
      </p>

      <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.47] text-text-1">
        Hiring or collaboration: <Link href={ROUTES.contact}>Contact</Link> (email and calendar),{' '}
        <Link href={ROUTES.mentoring}>Mentoring</Link> for session shapes, and <Link href={ROUTES.links}>Links</Link> for every
        profile in one list. <Link href={ROUTES.resume}>Resume</Link> and <Link href={ROUTES.projects}>Projects</Link> carry
        the evidence.
      </p>

      <section className="mt-12 max-w-[62ch]">
        <h2 className="text-xl font-semibold text-apple-ink">How I work</h2>
        <p className="mt-4 text-[17px] leading-[1.47] text-text-1">
          I bias toward small, reviewable changes, contracts at the boundary (schemas, types, API shapes), and telemetry you can
          actually read when something misbehaves in production.
        </p>
        <p className="mt-4 text-[17px] leading-[1.47] text-text-1">
          Teaching forced the same habit: make the invisible visible, keep exercises honest about tradeoffs, and never confuse
          clever with clear.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-apple-ink">Highlights</h2>
        <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-apple-gray-secondary">
          Curated wins and signals; edit <code>content/highlights.json</code> to tune the story.
        </p>
        <HighlightsList highlights={highlights} />
      </section>
    </div>
  );
}
