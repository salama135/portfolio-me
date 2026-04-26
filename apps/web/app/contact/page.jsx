import Link from 'next/link';
import { ContactForm } from '../../components/contact-form.jsx';
import { ROUTES } from '../../lib/constants/routes.js';
import { loadSiteProfile } from '../../lib/content/load/site-profile.js';

export const metadata = {
  title: 'Contact',
  description: 'Hiring pathways and ways to reach me.',
};

export default async function ContactPage() {
  const profile = await loadSiteProfile();
  const { social } = profile;
  const mailtoHref = social?.email && typeof social.email === 'string' ? social.email : null;

  return (
    <div className="page-shell py-[clamp(2.5rem,6vw,4rem)]">
      <h1 className="text-apple-ink">Contact</h1>
      <p className="mt-3 max-w-[60ch] text-pretty text-lg leading-[1.47] text-text-1">
        Reach out for software engineering, instruction, or game development roles. Use the form to compose mail locally, or
        jump straight to social links.
      </p>

      <ContactForm mailtoHref={mailtoHref} />

      <section className="mt-14" aria-labelledby="direct-heading">
        <h2 id="direct-heading" className="text-lg font-semibold text-apple-ink">
          Direct links
        </h2>
        <ul className="mt-5 flex flex-col gap-4 text-[17px]">
          {mailtoHref ? (
            <li>
              <a
                className="font-medium text-apple-link transition-opacity duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-85 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                href={mailtoHref}
              >
                Email (same as form)
              </a>
            </li>
          ) : (
            <li className="text-sm text-amber-900">
              Email link missing in <code>site-profile.json</code>.
            </li>
          )}
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
          {social?.credly ? (
            <li>
              <a
                className="font-medium text-apple-link transition-opacity duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-85 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                href={social.credly}
                rel="noreferrer"
                target="_blank"
              >
                Credly
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
        </ul>
      </section>

      <p className="mt-14 text-sm text-apple-gray-secondary">
        Prefer structured mentoring blocks? See <Link href={ROUTES.mentoring}>Mentoring</Link>. More outbound links on{' '}
        <Link href={ROUTES.links}>Links</Link>. Edit social keys in <code>content/site-profile.json</code>.
      </p>
    </div>
  );
}
