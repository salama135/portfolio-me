import { notFound } from 'next/navigation';
import { loadPrivateDemos } from '../../../../lib/private-demos/registry.js';
import { PrivateDemoView } from './private-demo-view.jsx';

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await loadPrivateDemos()).map((d) => ({ slug: d.slug }));
}

export default async function PrivateDemoPage({ params }) {
  const { slug } = await params;
  const demo = (await loadPrivateDemos()).find((d) => d.slug === slug);
  if (!demo) notFound();
  return <PrivateDemoView demo={demo} />;
}
