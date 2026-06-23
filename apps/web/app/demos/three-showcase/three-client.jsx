'use client';

import dynamic from 'next/dynamic';
import { DemoLauncher } from '../../../components/demo-launcher.jsx';

const ThreeInner = dynamic(() => import('./SegaRoom.jsx'), { ssr: false });

export function ThreeShowcaseClient() {
  return (
    <DemoLauncher
      Demo={ThreeInner}
      title="Three.js showcase"
      description="Rotating mesh with resize-aware camera and full renderer disposal when you leave the route."
    />
  );
}
