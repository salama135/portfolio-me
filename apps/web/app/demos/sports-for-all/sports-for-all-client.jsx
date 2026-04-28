'use client';

import dynamic from 'next/dynamic';
import { DemoLauncher } from '../../../components/demo-launcher.jsx';

const SportsForAllInner = dynamic(() => import('./sports-for-all-inner.jsx'), { ssr: false });

export function SportsForAllClient() {
  return (
    <DemoLauncher
      Demo={SportsForAllInner}
      title="Sports For All"
      description="a demo for all sports events happening in egypt that include running, endurance sports, cycling, crossfitt and other activites and events."
    />
  );
}
