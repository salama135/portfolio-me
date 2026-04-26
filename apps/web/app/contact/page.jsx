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
    <div className="page-shell">
      <h1>Contact</h1>
      <p className="mt-3 max-w-[60ch] text-pretty text-lg text-text-1">
        Reach out for software engineering, instruction, or game development roles.
      </p>
      <ul className="mt-12 flex flex-col gap-5 text-lg">
        {social?.email ? (
          <li>
            <a
              className="font-medium text-apple-link transition-opacity duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-85 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              href={social.email}
            >
              Email
            </a>
          </li>
        ) : null}
        {social?.linkedin ? (
          <li>
            <a
              className="font-medium text-apple-link transition-opacity duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-85 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              href={social.linkedin}
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </li>
        ) : null}
        {social?.github ? (
          <li>
            <a
              className="font-medium text-apple-link transition-opacity duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-85 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              href={social.github}
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </li>
        ) : null}
        {social?.instagram ? (
          <li>
            <a
              className="font-medium text-apple-link transition-opacity duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-85 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              href={social.instagram}
              rel="noreferrer"
              target="_blank"
            >
              Instagram
            </a>
          </li>
        ) : null}
        {social?.pinterest ? (
          <li>
            <a
              className="font-medium text-apple-link transition-opacity duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-85 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              href={social.pinterest}
              rel="noreferrer"
              target="_blank"
            >
              Pinterest
            </a>
          </li>
        ) : null}
        {social?.calendar ? (
          <li>
            <a
              className="font-medium text-apple-link transition-opacity duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-85 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              href={social.calendar}
              rel="noreferrer"
              target="_blank"
            >
              Schedule time
            </a>
          </li>
        ) : null}
      </ul>
      <p className="mt-16 text-sm text-text-2">
        Edit copy in <code>content/site-profile.json</code>.{' '}
        <a className="text-apple-link hover:opacity-90" href={ROUTES.links}>
          More links
        </a>
      </p>
    </div>
  );
}
