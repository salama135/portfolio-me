import { loadDemosRegistry } from '../lib/content/load/demos-registry.js';
import { isDemoExperienceEnabled } from '../lib/config/feature-flags.js';

/**
 * Server gate: disabled demos never mount client bundles.
 * @param {{ slug: string, children: import('react').ReactNode }} props
 */
export async function DemoPageShell({ slug, children }) {
  const demos = await loadDemosRegistry();
  const demo = demos.find((d) => d.slug === slug);

  if (!demo || !isDemoExperienceEnabled(demo)) {
    return (
      <div className="page-shell py-[clamp(2rem,6vw,4rem)]">
        <h1 className="text-apple-ink">Demo unavailable</h1>
        <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-text-1">
          This experience is hidden by configuration. Set the matching <code>NEXT_PUBLIC_DEMO_*</code> flag in{' '}
          <code>.env.local</code> (see <code>.env.example</code>) and rebuild.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
