'use client';

import dynamic from 'next/dynamic';
import { DemoLauncher } from '../../../components/demo-launcher.jsx';

const CreativeInner = dynamic(() => import('./creative-inner.jsx'), { ssr: false });

export function CreativeSketchClient() {
  return (
    <DemoLauncher
      Demo={CreativeInner}
      title="Creative sketch (p5)"
      description="Instance-mode p5 with animation paused when prefers-reduced-motion is set."
    />
  );
}
