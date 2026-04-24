import { loadSiteProfile } from '../../lib/content/load/site-profile.js';

export const metadata = {
  title: 'Links',
  description: 'Professional profiles and outbound links.',
};

export default async function LinksPage() {
  const profile = await loadSiteProfile();
  const entries = Object.entries(profile.social ?? {}).filter(([, v]) => typeof v === 'string' && v.length > 0);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-white">Links</h1>
      <p className="mt-2 text-zinc-400">Find me around the web.</p>
      <ul className="mt-10 space-y-4">
        {entries.map(([key, href]) => (
          <li key={key}>
            <a className="text-lg text-cyan-400 capitalize underline-offset-4 hover:underline" href={href} rel="noreferrer" target="_blank">
              {key}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
