'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Curl-style velocity field with streamlines (structure) + advected particles (motion).
 * Palette: Apple blues on a near-black ground (no rainbow dye).
 * @param {{ reducedMotion?: boolean }} props
 */
export default function BrandFieldInner({ reducedMotion }) {
  const canvasRef = useRef(null);
  const swirlRef = useRef({ x: 0, y: 0, strength: 0 });
  const rafRef = useRef(0);
  const dimsRef = useRef({ rw: 640, rh: 400 });
  const particlesRef = useRef([]);
  const [seed, setSeed] = useState(42);

  const resetSwirl = useCallback(() => {
    swirlRef.current = { x: 0, y: 0, strength: 0 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const DPR_CAP = 2;
    let t = 0;

    /** Curl-like field: perpendicular-ish components, seed shifts phase. */
    const fieldAt = (x, y, time) => {
      const k = seed * 0.0009;
      const vx = Math.cos(x * 0.011 + k) * Math.sin(y * 0.013 + time * 0.22);
      const vy = -Math.sin(x * 0.012 + time * 0.18 + k * 0.7) * Math.cos(y * 0.011 + k);
      let fx = vx;
      let fy = vy;
      const { x: sx, y: sy, strength } = swirlRef.current;
      if (strength > 0.02) {
        const dx = x - sx;
        const dy = y - sy;
        const dist = Math.hypot(dx, dy) + 48;
        fx += (-dy / dist) * strength * 1.8;
        fy += (dx / dist) * strength * 1.8;
      }
      const mag = Math.hypot(fx, fy) + 1e-6;
      return { vx: fx, vy: fy, mag };
    };

    const initParticles = () => {
      const { rw, rh } = dimsRef.current;
      const n = reducedMotion ? 500 : 1100;
      const rnd = mulberry32(seed ^ 0x9e3779b9);
      const arr = [];
      for (let i = 0; i < n; i += 1) {
        arr.push({ x: rnd() * rw, y: rnd() * rh, vx: 0, vy: 0 });
      }
      particlesRef.current = arr;
    };

    const drawStreamlines = (time) => {
      const { rw, rh } = dimsRef.current;
      if (!rw || !rh) return;
      const cols = Math.min(14, Math.max(6, Math.floor(rw / 56)));
      const rows = Math.min(11, Math.max(5, Math.floor(rh / 56)));
      const step = 2.1;
      const maxSteps = reducedMotion ? 85 : 100;

      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = 'rgba(41, 151, 255, 0.13)';
      ctx.lineWidth = 0.9;
      ctx.beginPath();

      for (let ci = 0; ci < cols; ci += 1) {
        for (let ri = 0; ri < rows; ri += 1) {
          let x = ((ci + 0.5) / cols) * rw;
          let y = ((ri + 0.5) / rows) * rh;
          ctx.moveTo(x, y);
          for (let s = 0; s < maxSteps; s += 1) {
            const { vx, vy, mag } = fieldAt(x, y, time);
            const nx = vx / mag;
            const ny = vy / mag;
            x += nx * step;
            y += ny * step;
            if (x < 0 || x > rw || y < 0 || y > rh) break;
            ctx.lineTo(x, y);
          }
        }
      }
      ctx.stroke();
      ctx.restore();
    };

    const step = (dt) => {
      const { rw, rh } = dimsRef.current;
      if (!rw || !rh) return;
      t += dt;

      if (swirlRef.current.strength > 0.02) {
        swirlRef.current = { ...swirlRef.current, strength: swirlRef.current.strength * 0.93 };
      }

      const dpr = Math.min(window.devicePixelRatio ?? 1, DPR_CAP);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.fillStyle = 'rgb(11, 12, 16)';
      ctx.fillRect(0, 0, rw, rh);

      const streamT = reducedMotion ? 0 : t * 0.12;
      drawStreamlines(streamT);

      ctx.fillStyle = 'rgba(8, 10, 14, 0.35)';
      ctx.fillRect(0, 0, rw, rh);

      const particles = particlesRef.current;
      const speed = reducedMotion ? 0.28 : 1;
      for (const p of particles) {
        const { vx, vy, mag } = fieldAt(p.x, p.y, t);
        const nx = vx / mag;
        const ny = vy / mag;
        p.vx = p.vx * 0.82 + nx * speed;
        p.vy = p.vy * 0.82 + ny * speed;
        p.x += p.vx * 2.2;
        p.y += p.vy * 2.2;
        if (p.x < 0) p.x += rw;
        if (p.x > rw) p.x -= rw;
        if (p.y < 0) p.y += rh;
        if (p.y > rh) p.y -= rh;
      }

      for (const p of particles) {
        const m = Math.min(1, Math.hypot(p.vx, p.vy) / 1.8);
        const a = 0.08 + m * 0.38;
        ctx.fillStyle = `rgba(0, 113, 227, ${a * 0.85})`;
        ctx.fillRect(p.x, p.y, 1.25, 1.25);
        ctx.fillStyle = `rgba(255, 255, 255, ${a * 0.2})`;
        ctx.fillRect(p.x - 0.2, p.y - 0.2, 0.9, 0.9);
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const rw = Math.min(parent?.clientWidth ?? 640, 720);
      const rh = Math.round((rw * 10) / 16);
      dimsRef.current = { rw, rh };
      const dpr = Math.min(window.devicePixelRatio ?? 1, DPR_CAP);
      canvas.width = Math.floor(rw * dpr);
      canvas.height = Math.floor(rh * dpr);
      canvas.style.width = `${rw}px`;
      canvas.style.height = `${rh}px`;
      initParticles();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);
    resize();

    if (reducedMotion) {
      t = 0;
      for (let i = 0; i < 36; i += 1) {
        step(0.05);
      }
      return () => {
        ro.disconnect();
      };
    }

    const loop = () => {
      step(0.016);
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [seed, reducedMotion]);

  const onPointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    swirlRef.current = { x, y, strength: Math.min(2.4, swirlRef.current.strength + 0.28) };
  };

  return (
    <div className="w-full max-w-3xl space-y-4">
      <p className="text-sm leading-relaxed text-apple-gray-secondary">
        <strong className="text-apple-ink">What you are seeing:</strong> a sampled velocity field (blue streamlines) plus
        particles advected along the same field. Drag to inject a temporary vortex. Change the seed to rephase the whole
        flow. No accounts, no save.
      </p>
      <div className="flex flex-col gap-4 text-sm sm:flex-row sm:flex-wrap sm:items-center">
        <label className="flex min-w-0 flex-1 flex-col gap-2 font-medium text-apple-ink sm:max-w-xs sm:flex-row sm:items-center sm:gap-2">
          <span className="shrink-0">Seed</span>
          <input
            type="range"
            min={1}
            max={999}
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            className="min-h-11 w-full accent-[#0071e3] sm:w-44"
          />
          <span className="tabular-nums text-apple-gray-secondary">{seed}</span>
        </label>
        <button
          type="button"
          onClick={() => {
            setSeed((s) => (s % 997) + 1);
            resetSwirl();
          }}
          className="min-h-11 w-full shrink-0 rounded-full border border-apple-border-mid bg-apple-gray/60 px-4 py-2 text-sm font-semibold text-apple-ink transition-colors hover:bg-apple-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] sm:w-auto"
        >
          New seed
        </button>
      </div>
      <div
        className="relative touch-none overflow-hidden rounded-2xl border border-apple-border-soft bg-[#0b0c10]"
        onPointerMove={onPointerMove}
        onPointerLeave={resetSwirl}
      >
        <canvas ref={canvasRef} aria-label="Flow field: streamlines and particle advection" className="block w-full" />
      </div>
    </div>
  );
}

function mulberry32(a) {
  return function mul() {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
