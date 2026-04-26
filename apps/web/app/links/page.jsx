import Link from 'next/link';
import { ROUTES } from '../../lib/constants/routes.js';
import { loadSiteProfile } from '../../lib/content/load/site-profile.js';

export const metadata = {
  title: 'Links',
  description: 'Professional profiles and outbound links.',
};

/** @type {Record<string, string>} */
const SOCIAL_LABELS = {
  email: 'Email',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  calendar: 'Schedule time',
  credly: 'Credly',
  instagram: 'Instagram',
  pinterest: 'Pinterest',
};

const LINK_ORDER = ['email', 'calendar', 'linkedin', 'github', 'credly', 'instagram', 'pinterest'];

export default async function LinksPage() {
  const profile = await loadSiteProfile();
  const social = profile.social ?? {};
  const entries = LINK_ORDER.map((key) => {
    const href = social[key];
    if (typeof href !== 'string' || !href.length) return null;
    return { key, href, label: SOCIAL_LABELS[key] ?? key };
  }).filter(Boolean);

  return (
    <div className="page-shell py-[clamp(2.5rem,6vw,4rem)]">
      <h1 className="text-apple-ink">Links</h1>
      <p className="mt-3 max-w-[58ch] text-pretty text-lg leading-[1.47] text-text-1">
        Fast paths for recruiters and collaborators: email and calendar first, then profiles and proof.
      </p>
      <ul className="mt-12 space-y-4">
        {entries.map(({ key, href, label }) => (
          <li key={key}>
            <a
              className="text-lg font-medium text-apple-link transition-opacity duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-85 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              href={href}
              rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-14 max-w-[56ch] text-[15px] leading-relaxed text-apple-gray-secondary">
        Ready to talk scope? Start at <Link href={ROUTES.contact}>Contact</Link> or{' '}
        <Link href={ROUTES.mentoring}>Mentoring</Link> for session types and booking.
      </p>
    </div>
  );
}
