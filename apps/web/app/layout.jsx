import { Lexend, Sora } from 'next/font/google';
import '../styles/globals.css';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { loadSiteProfile } from '../lib/content/load/site-profile.js';

const fontBody = Lexend({
  subsets: ['latin'],
  variable: '--font-portfolio-body',
  display: 'swap',
});

const fontDisplay = Sora({
  subsets: ['latin'],
  variable: '--font-portfolio-display',
  display: 'swap',
});

export async function generateMetadata() {
  const profile = await loadSiteProfile();
  return {
    title: { default: profile.title, template: `%s | ${profile.title}` },
    description: profile.seo?.description ?? profile.tagline,
  };
}

export default async function RootLayout({ children }) {
  await loadSiteProfile();

  return (
    <html className={`${fontBody.variable} ${fontDisplay.variable}`} lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body className="relative min-h-screen antialiased">
        <div className="site-backdrop fixed inset-0 -z-20" aria-hidden />
        <div
          className="site-backdrop-orb -z-20 h-[min(42rem,55vw)] w-[min(42rem,55vw)]"
          style={{ top: '-8%', right: '-6%', background: 'oklch(0.42 0.14 285 / 0.35)' }}
          aria-hidden
        />
        <div
          className="site-backdrop-orb -z-20 h-[min(32rem,45vw)] w-[min(32rem,45vw)] [animation-delay:-6s]"
          style={{ bottom: '-4%', left: '-8%', background: 'oklch(0.38 0.12 198 / 0.22)' }}
          aria-hidden
        />
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full border border-border bg-surface-1 px-4 py-2 text-sm font-semibold text-text-0 shadow-md transition-transform duration-200 ease-out focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--focus-ring)]"
        >
          Skip to content
        </a>
        <div className="relative z-0 flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
