import { CtaHire } from '../components/cta-hire.jsx';
import { HeroSignal } from '../components/hero-signal.jsx';
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
    <section className="page-shell-wide">
      <div className="grid items-center gap-12 py-[clamp(3rem,10vw,5.5rem)] lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-2">Open to opportunities</p>
          <h1 className="mt-4 max-w-[18ch] text-balance">{profile.tagline}</h1>
          <p className="mt-5 max-w-[52ch] text-lg text-text-1">{profile.roles.join(' · ')}</p>
          <p className="mt-6 max-w-[60ch] text-pretty text-text-1">{profile.seo?.description}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <CtaHire href={ROUTES.contact}>Get in touch</CtaHire>
            <CtaHire
              href={ROUTES.projects}
              className="border border-border bg-transparent text-text-0 shadow-none hover:bg-surface-2 hover:shadow-none"
            >
              View projects
            </CtaHire>
          </div>
        </div>
        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <HeroSignal />
        </div>
      </div>
    </section>
  );
}
