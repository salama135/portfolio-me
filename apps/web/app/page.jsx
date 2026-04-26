import Link from 'next/link';
import { CtaHire } from '../components/cta-hire.jsx';
import { HeroIphone } from '../components/hero-iphone.jsx';
import { HeroShowcase } from '../components/hero-showcase.jsx';
import { ROUTES } from '../lib/constants/routes.js';
import { loadSiteProfile } from '../lib/content/load/site-profile.js';

export async function generateMetadata() {
  const profile = await loadSiteProfile();
  return {
    title: 'Home',
    description: profile.seo?.description ?? profile.tagline,
  };
}

const ghostCtaClass =
  'inline-flex min-h-11 min-w-[10rem] items-center justify-center rounded-full border border-white/35 bg-transparent px-6 py-2.5 text-sm font-semibold text-white no-underline shadow-none transition-[background-color,opacity] duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]';

const quickLinkClass =
  'text-sm font-semibold text-white/78 underline-offset-4 transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-[#2997ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]';

export default async function Page() {
  const profile = await loadSiteProfile();
  const hero = profile.hero ?? {};

  const eyebrow = hero.eyebrow ?? 'Open to opportunities';
  const bodyLine = hero.subcopy ?? profile.seo?.description ?? '';
  const primaryLabel = hero.primaryCtaLabel ?? 'Get in touch';
  const secondaryLabel = hero.secondaryCtaLabel ?? 'View projects';
  const demosLabel = hero.demosCtaLabel ?? 'Live demos';
  const resumeLabel = hero.resumeLinkLabel ?? 'Resume';
  const aboutLabel = hero.aboutLinkLabel ?? 'About';

  return (
    <>
      <section className="apple-chapter-dark relative overflow-hidden pb-[clamp(3.5rem,11vw,6.5rem)] pt-[clamp(1.25rem,4vw,2.5rem)]">
        <HeroShowcase>
          <div className="page-shell-wide">
            <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="apple-reveal apple-reveal-1 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/55">
                  {eyebrow}
                </p>
                <h1 className="apple-reveal apple-reveal-2 mt-4 max-w-[18ch] text-balance text-white">{profile.tagline}</h1>
                <p className="apple-reveal apple-reveal-3 mt-5 max-w-[52ch] text-[19px] font-semibold leading-snug text-white/88">
                  {profile.roles.join(' · ')}
                </p>
                <p className="apple-reveal apple-reveal-4 mt-6 max-w-[60ch] text-pretty text-[17px] leading-[1.47] text-white/72">
                  {bodyLine}
                </p>
                <div className="apple-reveal apple-reveal-5 mt-10 flex flex-col gap-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <CtaHire href={ROUTES.contact}>{primaryLabel}</CtaHire>
                    <CtaHire
                      href={ROUTES.projects}
                      className="border border-white/35 bg-transparent shadow-none hover:bg-white/10 hover:shadow-none"
                    >
                      {secondaryLabel}
                    </CtaHire>
                    <Link href={ROUTES.demos} className={ghostCtaClass}>
                      {demosLabel}
                    </Link>
                  </div>
                  <nav aria-label="Quick links" className="flex flex-wrap gap-x-6 gap-y-2">
                    <Link href={ROUTES.resume} className={quickLinkClass}>
                      {resumeLabel}
                    </Link>
                    <Link href={ROUTES.about} className={quickLinkClass}>
                      {aboutLabel}
                    </Link>
                    <Link href={ROUTES.achievements} className={quickLinkClass}>
                      Achievements
                    </Link>
                  </nav>
                </div>
              </div>
              <div className="apple-reveal apple-reveal-6 flex justify-center lg:col-span-5 lg:justify-end">
                <HeroIphone />
              </div>
            </div>
          </div>
        </HeroShowcase>
      </section>

      <section className="apple-chapter-gray py-[clamp(3.5rem,10vw,6rem)]">
        <div className="page-shell-wide">
          <h2 className="max-w-[20ch] text-balance text-apple-ink">Built like a launch, not a template.</h2>
          <p className="mt-5 max-w-[62ch] text-pretty text-[17px] leading-[1.47] text-apple-gray-secondary">
            Engineering samples, teaching notes, and experiments live behind the same quiet chrome: strong type, one
            accent family, and room for the work to read first.
          </p>
          <p className="mt-4 max-w-[58ch] text-[17px] leading-[1.47] text-apple-gray-secondary">
            Start with{' '}
            <Link href={ROUTES.projects} className="font-semibold text-apple-ink underline-offset-2 hover:underline">
              Projects
            </Link>{' '}
            for case studies, or{' '}
            <Link href={ROUTES.demos} className="font-semibold text-apple-ink underline-offset-2 hover:underline">
              Demos
            </Link>{' '}
            for interactive proofs — or jump to{' '}
            <Link href={ROUTES.resume} className="font-semibold text-apple-ink underline-offset-2 hover:underline">
              Resume
            </Link>{' '}
            and{' '}
            <Link href={ROUTES.about} className="font-semibold text-apple-ink underline-offset-2 hover:underline">
              About
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
