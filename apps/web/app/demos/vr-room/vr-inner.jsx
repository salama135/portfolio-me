'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * @param {{ reducedMotion?: boolean }} props
 */
export default function VrInner({ reducedMotion }) {
  const hostRef = useRef(null);
  const [sceneLoading, setSceneLoading] = useState(true);

  useEffect(() => {
    let sceneEl;
    let cancelled = false;
    setSceneLoading(true);

    (async () => {
      try {
        await import('aframe');
        if (cancelled || !hostRef.current) return;
        const host = hostRef.current;
        host.innerHTML = '';

        sceneEl = document.createElement('a-scene');
        sceneEl.setAttribute('embedded', '');
        sceneEl.setAttribute('vr-mode-ui', 'enabled: true');
        sceneEl.setAttribute('background', 'color: #0b0b10');

        const sky = document.createElement('a-sky');
        sky.setAttribute('color', '#1a1a2e');

        const floor = document.createElement('a-plane');
        floor.setAttribute('position', '0 0 -2');
        floor.setAttribute('rotation', '-90 0 0');
        floor.setAttribute('width', '8');
        floor.setAttribute('height', '8');
        floor.setAttribute('color', '#242428');

        const box = document.createElement('a-box');
        box.setAttribute('position', '0 0.6 -2');
        box.setAttribute('depth', '0.45');
        box.setAttribute('height', '0.45');
        box.setAttribute('width', '0.45');
        box.setAttribute('color', '#0071e3');
        if (!reducedMotion) {
          box.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 9000; easing: linear');
        }

        const amb = document.createElement('a-light');
        amb.setAttribute('type', 'ambient');
        amb.setAttribute('color', '#bbbbcc');
        amb.setAttribute('intensity', '0.5');

        const dir = document.createElement('a-light');
        dir.setAttribute('type', 'directional');
        dir.setAttribute('position', '1 3 2');
        dir.setAttribute('color', '#ffffff');
        dir.setAttribute('intensity', '0.55');

        sceneEl.appendChild(sky);
        sceneEl.appendChild(floor);
        sceneEl.appendChild(box);
        sceneEl.appendChild(amb);
        sceneEl.appendChild(dir);
        host.appendChild(sceneEl);
      } finally {
        if (!cancelled) setSceneLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      setSceneLoading(true);
      if (sceneEl?.parentNode) {
        sceneEl.parentNode.removeChild(sceneEl);
      }
    };
  }, [reducedMotion]);

  return (
    <div className="w-full max-w-3xl space-y-3">
      <p className="text-sm text-apple-gray-secondary">
        <strong className="text-apple-ink">Try it:</strong> look for the VR goggles control on the scene. WebXR-capable
        browsers can enter immersive mode; others still get a draggable 3D view. Leaving the route removes the embedded scene.
      </p>
      <div className="relative aspect-video w-full min-h-[280px] overflow-hidden rounded-2xl border border-apple-border-soft bg-black">
        {sceneLoading ? (
          <p className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 px-6 text-center text-sm text-white/95">
            Loading scene…
          </p>
        ) : null}
        <div ref={hostRef} className="h-full w-full" aria-busy={sceneLoading} />
      </div>
    </div>
  );
}
