'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * @param {{ reducedMotion?: boolean }} props
 */
export default function ThreeInner({ reducedMotion }) {
  const hostRef = useRef(null);
  const [unsupported, setUnsupported] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return undefined;

    const probe = document.createElement('canvas');
    const glProbe = probe.getContext('webgl') || probe.getContext('experimental-webgl');
    if (!glProbe) {
      setUnsupported(true);
      return undefined;
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const gl = renderer.getContext();
    if (!gl || gl.isContextLost?.()) {
      setUnsupported(true);
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 16 / 9, 0.1, 100);
    camera.position.z = 3.2;

    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshStandardMaterial({ color: 0x0071e3, metalness: 0.25, roughness: 0.42 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const dir = new THREE.DirectionalLight(0xffffff, 0.95);
    dir.position.set(2.5, 4, 3);
    scene.add(dir);

    el.textContent = '';
    el.appendChild(renderer.domElement);

    let raf = 0;
    let t = 0;

    const resize = () => {
      const w = el.clientWidth || 640;
      const h = Math.max(240, Math.round((w * 9) / 16));
      renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += reducedMotion ? 0 : 0.018;
      mesh.rotation.x = t * 0.55;
      mesh.rotation.y = t * 0.85;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  if (unsupported) {
    return (
      <p className="max-w-lg rounded-xl border border-apple-border-soft bg-apple-gray px-5 py-4 text-sm text-apple-ink">
        WebGL is not available or the GPU context could not be created. Try another browser or update your graphics drivers.
      </p>
    );
  }

  return (
    <div className="w-full max-w-3xl space-y-3">
      <p className="text-sm text-apple-gray-secondary">
        <strong className="text-apple-ink">Try it:</strong> resize the window—the canvas tracks width and keeps a stable aspect
        ratio until you navigate away (then WebGL resources dispose).
      </p>
      <div ref={hostRef} className="aspect-video w-full bg-black" />
    </div>
  );
}
