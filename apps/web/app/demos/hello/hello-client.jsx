'use client';

import dynamic from 'next/dynamic';
import { DemoLauncher } from '../../../components/demo-launcher.jsx';

const HelloInner = dynamic(() => import('./hello-inner.jsx'), { ssr: false });

export function HelloDemoClient() {
  return (
    <DemoLauncher
      Demo={HelloInner}
      title="Hello pipeline"
      description="Confirms deferred import, error boundary, and teardown without loading graphics libraries."
    />
  );
}
