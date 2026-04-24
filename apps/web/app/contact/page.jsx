import { loadSiteProfile } from '../../lib/content/load/site-profile.js';
import { ROUTES } from '../../lib/constants/routes.js';

export const metadata = {
  title: 'Contact',
  description: 'Hiring pathways and ways to reach me.',
};

export default async function ContactPage() {
  const profile = await loadSiteProfile();
  const { social } = profile;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-white">Contact</h1>
      <p className="mt-2 text-zinc-400">Reach out for software engineering, instruction, or game development roles.</p>
      <ul className="mt-10 flex flex-col gap-4 text-lg">
        {social?.email ? (
          <li>
            <a className="text-cyan-400 underline-offset-4 hover:underline" href={social.email}>
              Email
            </a>
          </li>
        ) : null}
        {social?.linkedin ? (
          <li>
            <a className="text-cyan-400 underline-offset-4 hover:underline" href={social.linkedin} rel="noreferrer" target="_blank">
              LinkedIn
            </a>
          </li>
        ) : null}
        {social?.github ? (
          <li>
            <a className="text-cyan-400 underline-offset-4 hover:underline" href={social.github} rel="noreferrer" target="_blank">
              GitHub
            </a>
          </li>
        ) : null}
        {social?.calendar ? (
          <li>
            <a className="text-cyan-400 underline-offset-4 hover:underline" href={social.calendar} rel="noreferrer" target="_blank">
              Schedule time
            </a>
          </li>
        ) : null}
      </ul>
      <p className="mt-12 text-sm text-zinc-500">
        Edit paths and copy in <code className="text-zinc-400">content/site-profile.json</code> ·{' '}
        <a className="text-cyan-500" href={ROUTES.links}>
          More links
        </a>
      </p>
    </div>
  );
}
