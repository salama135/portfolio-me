'use client';

import dynamic from 'next/dynamic';
import { DemoLauncher } from '../../../components/demo-launcher.jsx';

const BrandInner = dynamic(() => import('./brand-inner.jsx'), { ssr: false });

export function BrandFieldClient() {
  return (
    <DemoLauncher
      Demo={BrandInner}
      title="Generative brand field"
      description="Streamlines plus advected particles on a curl-style field. Drag adds a vortex. Canvas only, loads after Start demo."
    />
  );
}
