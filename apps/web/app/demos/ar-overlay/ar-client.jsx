'use client';

import dynamic from 'next/dynamic';
import { DemoLauncher } from '../../../components/demo-launcher.jsx';

const ArInner = dynamic(() => import('./ar-inner.jsx'), { ssr: false });

export function ArOverlayClient() {
  return (
    <DemoLauncher
      Demo={ArInner}
      title="AR-style camera overlay"
      description="Starts only after you click Start demo so the camera prompt follows a clear user gesture. Requires HTTPS or localhost."
    />
  );
}
