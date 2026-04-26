import Link from 'next/link';
import { MobileDemoCallout } from '../../components/mobile-demo-callout.jsx';
import { loadDemosRegistry } from '../../lib/content/load/demos-registry.js';
import { isDemoExperienceEnabled } from '../../lib/config/feature-flags.js';

export const metadata = {
  title: 'Demos',
  description:
    'Interactive live demos: creative coding, generative canvas, 3D, AR-style camera, and WebXR—each gated behind Start demo.',
};

export default async function DemosPage() {
  const all = await loadDemosRegistry();
  const demos = all.filter(isDemoExperienceEnabled);
  const helloDemo = all.find((d) => d.slug === 'hello');

  return (
    <div className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
      <h1 className="text-apple-ink">Demos</h1>
      <p className="mt-4 max-w-[62ch] text-pretty text-[17px] leading-[1.47] text-text-1">
        Heavy bundles load only after you press <strong className="font-semibold">Start demo</strong> on each route. Registry:
        <code className="mx-1">content/demos.json</code>. Flags: see <code>.env.example</code>.
      </p>
      <p className="mt-3 max-w-[62ch] text-pretty text-sm leading-relaxed text-apple-gray-secondary">
        Motion-sensitive users can enable reduced motion at the OS level. Demos that need camera or immersive capabilities
        show fallback copy when permission is denied or the browser lacks support.
      </p>

      <MobileDemoCallout deepLink={helloDemo?.mobileAppLink} />

      {demos.length === 0 ? (
        <p className="mt-14 rounded-2xl border border-dashed border-apple-border-mid bg-apple-gray/50 px-8 py-14 text-center text-apple-gray-secondary">
          No demos are enabled. Check <code>NEXT_PUBLIC_DEMO_*</code> values (non-<code>0</code> means on).
        </p>
      ) : (
        <ul className="mt-12 grid list-none gap-6 p-0 md:grid-cols-2">
          {demos.map((d) => (
            <li key={d.slug} className="flex flex-col rounded-2xl border border-apple-border-soft bg-apple-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
              <p className="text-xs font-semibold uppercase tracking-wide text-apple-gray-secondary">{d.category}</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-apple-ink">
                <Link
                  href={d.entryPath}
                  className="text-apple-ink no-underline hover:text-apple-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  {d.title}
                </Link>
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-apple-gray-secondary">{d.summary}</p>
              <dl className="mt-4 grid gap-2 text-sm text-text-1">
                <div>
                  <dt className="font-semibold text-apple-ink">Device</dt>
                  <dd>{d.deviceNeeds}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-apple-ink">Duration</dt>
                  <dd>{d.durationHint}</dd>
                </div>
              </dl>
              <Link
                href={d.entryPath}
                className="mt-5 inline-flex w-fit rounded-full bg-[#0071e3] px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#0077ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                Open demo
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
