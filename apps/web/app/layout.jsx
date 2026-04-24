import '../styles/globals.css';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { loadSiteProfile } from '../lib/content/load/site-profile.js';

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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body className="min-h-screen bg-zinc-950 text-zinc-50 antialiased">
        <a
          href="#main-content"
          className="absolute left-4 top-4 z-[100] -translate-y-24 rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-lg transition-transform focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-cyan-200"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
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
