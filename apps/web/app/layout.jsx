import { Figtree } from 'next/font/google';
import { withBase } from '../lib/base-path.js';
import '../styles/globals.css';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { loadSiteProfile } from '../lib/content/load/site-profile.js';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
});

export async function generateMetadata() {
  const profile = await loadSiteProfile();
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    metadataBase: base ? new URL(base) : undefined,
    title: { default: profile.title, template: `%s | ${profile.title}` },
    description: profile.seo?.description ?? profile.tagline,
  };
}

export default async function RootLayout({ children }) {
  await loadSiteProfile();

  return (
    <html className={figtree.variable} lang="en">
      <head>
        <link rel="icon" href={withBase('/site.webmanifest')} sizes="any" />
      </head>
      <body className="min-h-screen overflow-x-clip antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full border border-apple-border-soft bg-apple-white px-4 py-2 text-sm font-semibold text-apple-ink shadow-md motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--focus-ring)]"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" className="min-w-0 flex-1 overflow-x-clip">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
