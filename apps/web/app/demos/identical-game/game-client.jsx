'use client';

import dynamic from 'next/dynamic';
import { DemoLauncher } from '../../../components/demo-launcher.jsx';

const IdenticalGameInner = dynamic(() => import('./game-inner.jsx'), { ssr: false });

export function IdenticalGameClient() {
  return (
    <DemoLauncher
      Demo={IdenticalGameInner}
      title="Identical Game"
      description="A demo showcasing the identical game experience."
    />
  );
}
