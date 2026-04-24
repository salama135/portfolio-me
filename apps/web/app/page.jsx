import { CtaHire } from '../components/cta-hire.jsx';
import { loadSiteProfile } from '../lib/content/load/site-profile.js';
import { ROUTES } from '../lib/constants/routes.js';

export async function generateMetadata() {
  const profile = await loadSiteProfile();
  return {
    title: 'Home',
    description: profile.seo?.description ?? profile.tagline,
  };
}

export default async function Page() {
  const profile = await loadSiteProfile();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">Open to opportunities</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">{profile.tagline}</h1>
      <p className="mt-4 text-lg text-zinc-400">
        {profile.roles.join(' · ')}
      </p>
      <p className="mt-6 text-zinc-300">{profile.seo?.description}</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <CtaHire href={ROUTES.contact}>Get in touch</CtaHire>
        <CtaHire href={ROUTES.projects} className="bg-transparent text-cyan-300 ring-1 ring-cyan-400/60 hover:bg-cyan-400/10">
          View projects
        </CtaHire>
      </div>
    </div>
  );
}
