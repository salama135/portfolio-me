import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { hasPrivateDemoAccess } from '../../../../lib/private-demos/auth.js';
import { loadPrivateDemos, privateDemoFileExists } from '../../../../lib/private-demos/registry.js';
import { PrivateDemoClient } from './private-demo-client.jsx';

export const dynamic = 'force-dynamic';

export default async function PrivateDemoPage({ params }) {
  const { slug } = await params;

  if (!(await hasPrivateDemoAccess())) redirect(`/demos/private?next=${encodeURIComponent(`/demos/private/${slug}`)}`);

  const demo = (await loadPrivateDemos()).find((d) => d.slug === slug);
  if (!demo) notFound();
  const ready = await privateDemoFileExists(slug);

  return (
    <div className="page-shell-wide py-[clamp(2rem,6vw,3rem)]">
      <Link href="/demos/private" className="text-sm text-apple-link no-underline hover:underline">
        ← Private demos
      </Link>
      <div className="mt-4">
        {ready ? (
          <PrivateDemoClient slug={demo.slug} title={demo.title} description={demo.summary} />
        ) : (
          <div className="rounded-2xl border border-dashed border-apple-border-mid bg-apple-gray/50 px-6 py-8">
            <h1 className="text-lg font-semibold text-apple-ink">{demo.title}</h1>
            <p className="mt-2 max-w-[52ch] text-sm text-apple-gray-secondary">
              This demo is registered but its page has not been added yet. Put it at{' '}
              <code>apps/web/private-demos/{demo.slug}.html</code>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
