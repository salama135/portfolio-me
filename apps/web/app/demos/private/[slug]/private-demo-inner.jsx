'use client';

/**
 * Standalone demos are full HTML documents, so they run in a same-origin iframe served by the
 * gated `raw` route. Same origin keeps their localStorage saves working.
 * @param {{ slug: string, title: string }} props
 */
export default function PrivateDemoInner({ slug, title }) {
  const src = `/demos/private/${slug}/raw`;
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-apple-border-soft bg-black">
        <iframe
          src={src}
          title={title}
          className="block h-[min(80vh,860px)] w-full border-0"
          allow="fullscreen; clipboard-write; autoplay"
          allowFullScreen
        />
      </div>
      <a
        href={src}
        target="_blank"
        rel="noopener"
        className="mt-3 inline-flex text-sm text-apple-link no-underline hover:underline"
      >
        Open full screen ↗
      </a>
    </div>
  );
}
