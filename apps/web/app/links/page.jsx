import { loadSiteProfile } from '../../lib/content/load/site-profile.js';

export const metadata = {
  title: 'Links',
  description: 'Professional profiles and outbound links.',
};

export default async function LinksPage() {
  const profile = await loadSiteProfile();
  const entries = Object.entries(profile.social ?? {}).filter(([, v]) => typeof v === 'string' && v.length > 0);

  return (
    <div className="page-shell">
      <h1>Links</h1>
      <p className="mt-3 max-w-[55ch] text-pretty text-lg text-text-1">Find me around the web.</p>
      <ul className="mt-12 space-y-5">
        {entries.map(([key, href]) => (
          <li key={key}>
            <a
              className="text-lg font-medium capitalize text-apple-link transition-opacity duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-85 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              href={href}
              rel="noreferrer"
              target="_blank"
            >
              {key}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
