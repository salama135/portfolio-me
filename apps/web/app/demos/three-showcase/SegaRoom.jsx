'use client';

/**
 * SegaRoom — drop-in Three.js experience for your Next.js portfolio
 *
 * Usage:
 *   import SegaRoom from '@/components/SegaRoom';
 *   <SegaRoom />
 *
 * The inner scene is lazy-loaded so Three.js doesn't bloat the initial bundle.
 * Add this to your next.config.js if you see ssr errors:
 *   transpilePackages: ['three']
 */

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// Lazy-load the heavy Three.js scene — no SSR
const SegaRoomScene = dynamic(() => import('./SegaRoomScene'), { ssr: false });

export default function SegaRoom() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);

    // Quick WebGL probe
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) setWebGLSupported(false);

    return () => mq.removeEventListener('change', handler);
  }, []);

  if (!webGLSupported) {
    return (
      <div style={{
        maxWidth: 720, padding: '1.5rem', borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.1)',
        background: '#111', color: '#aaa',
        fontFamily: 'monospace', fontSize: 13,
      }}>
        WebGL is not available on this device. Try a different browser or update your graphics drivers.
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: 960, margin: '0 auto' }}>
      <SegaRoomScene reducedMotion={reducedMotion} />
    </div>
  );
}
