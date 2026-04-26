'use client';

import { useEffect, useRef } from 'react';

/**
 * @param {{ reducedMotion?: boolean }} props
 */
export default function CreativeInner({ reducedMotion }) {
  const hostRef = useRef(null);

  useEffect(() => {
    let p5inst;
    let cancelled = false;

    (async () => {
      const mod = await import('p5');
      if (cancelled || !hostRef.current) return;
      const P5 = mod.default;
      const host = hostRef.current;

      const sketch = (p) => {
        let t = 0;
        p.setup = () => {
          const w = Math.min(520, host.clientWidth || 400);
          p.createCanvas(w, 320).parent(host);
          p.noStroke();
        };
        p.draw = () => {
          p.background(18, 18, 20);
          t += reducedMotion ? 0 : 0.018;
          p.fill(0, 113, 227);
          const pulse = 36 + p.sin(t) * 12;
          p.circle(p.width / 2, p.height / 2, pulse);
        };
      };

      p5inst = new P5(sketch);
    })();

    return () => {
      cancelled = true;
      if (p5inst) {
        p5inst.remove();
        p5inst = undefined;
      }
    };
  }, [reducedMotion]);

  return (
    <div className="w-full max-w-xl space-y-3">
      <p className="text-sm text-apple-gray-secondary">
        <strong className="text-apple-ink">Try it:</strong> start the demo and watch the pulse—no drawing required; leaving the
        route tears the sketch down cleanly.
      </p>
      <div ref={hostRef} className="w-full" role="img" aria-label="p5.js creative sketch canvas" />
    </div>
  );
}
