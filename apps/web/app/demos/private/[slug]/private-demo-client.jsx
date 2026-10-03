'use client';

import dynamic from 'next/dynamic';
import { DemoLauncher } from '../../../../components/demo-launcher.jsx';

const PrivateDemoInner = dynamic(() => import('./private-demo-inner.jsx'), { ssr: false });

/** @param {{ slug: string, title: string, description: string }} props */
export function PrivateDemoClient({ slug, title, description }) {
  return <DemoLauncher Demo={PrivateDemoInner} title={title} description={description} demoProps={{ slug, title }} />;
}
