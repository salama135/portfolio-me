import { CtaHire } from '../components/cta-hire.jsx';
import { HeroIphone } from '../components/hero-iphone.jsx';
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
    <>
      {/* LCP guardrail: text-first hero avoids remote media on first paint. */}
      <section className="apple-chapter-dark relative overflow-hidden pb-[clamp(3.5rem,11vw,6.5rem)] pt-[clamp(1.25rem,4vw,2.5rem)]">
        <div className="page-shell-wide">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="apple-reveal apple-reveal-1 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/55">
                Open to opportunities
              </p>
              <h1 className="apple-reveal apple-reveal-2 mt-4 max-w-[18ch] text-balance text-white">{profile.tagline}</h1>
              <p className="apple-reveal apple-reveal-3 mt-5 max-w-[52ch] text-[19px] font-semibold leading-snug text-white/88">
                {profile.roles.join(' · ')}
              </p>
              <p className="apple-reveal apple-reveal-4 mt-6 max-w-[60ch] text-pretty text-[17px] leading-[1.47] text-white/72">
                {profile.seo?.description}
              </p>
              <div className="apple-reveal apple-reveal-5 mt-10 flex flex-wrap items-center gap-4">
                <CtaHire href={ROUTES.contact}>Get in touch</CtaHire>
                <CtaHire
                  href={ROUTES.projects}
                  className="border border-white/35 bg-transparent shadow-none hover:bg-white/10 hover:shadow-none"
                >
                  View projects
                </CtaHire>
              </div>
            </div>
            <div className="apple-reveal apple-reveal-6 flex justify-center lg:col-span-5 lg:justify-end">
              <HeroIphone />
            </div>
          </div>
        </div>
      </section>

      <section className="apple-chapter-gray py-[clamp(3.5rem,10vw,6rem)]">
        <div className="page-shell-wide">
          <h2 className="max-w-[20ch] text-balance text-apple-ink">Built like a launch, not a template.</h2>
          <p className="mt-5 max-w-[62ch] text-pretty text-[17px] leading-[1.47] text-apple-gray-secondary">
            Engineering samples, teaching notes, and experiments live behind the same quiet chrome: strong type, one
            accent family, and room for the work to read first.
          </p>
          <p className="mt-4 max-w-[58ch] text-[17px] leading-[1.47] text-apple-gray-secondary">
            Start with <span className="font-semibold text-apple-ink">Projects</span> for case studies, or{' '}
            <span className="font-semibold text-apple-ink">Demos</span> for interactive proofs.
          </p>
        </div>
      </section>
    </>
  );
}
