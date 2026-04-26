/**
 * Per-route metadata with distinct Open Graph / Twitter cards (Phase 8 T034).
 * @param {{ title: string, description: string, siteTitle: string }} p
 */
export function segmentMetadata({ title, description, siteTitle }) {
  const ogTitle = `${title} · ${siteTitle}`;
  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title: ogTitle,
      description,
    },
    twitter: {
      card: 'summary',
      title: ogTitle,
      description,
    },
  };
}
