'use client';

import dynamic from 'next/dynamic';
import { DemoLauncher } from '../../../components/demo-launcher.jsx';

const VrInner = dynamic(() => import('./vr-inner.jsx'), { ssr: false });

export function VrRoomClient() {
  return (
    <DemoLauncher
      Demo={VrInner}
      title="VR room (A-Frame)"
      description="Loads A-Frame only after start. Box animation respects prefers-reduced-motion."
    />
  );
}
