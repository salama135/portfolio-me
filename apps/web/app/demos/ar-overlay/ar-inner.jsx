'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * @param {{ reducedMotion?: boolean }} props
 */
export default function ArInner({ reducedMotion: _reducedMotion }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [starting, setStarting] = useState(true);

  useEffect(() => {
    let stream;
    (async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setError('This browser does not expose camera APIs from a secure context.');
        setStarting(false);
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false,
        });
        const v = videoRef.current;
        if (v) {
          v.srcObject = stream;
          await v.play();
        }
        setStarting(false);
      } catch (e) {
        const name = e && typeof e === 'object' && 'name' in e ? e.name : '';
        if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
          setError(
            'Camera permission was denied. Use your browser site settings to allow the camera for this origin, then reload and press Start demo again.',
          );
        } else {
          setError(e instanceof Error ? e.message : 'Camera could not start.');
        }
        setStarting(false);
      }
    })();

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  if (error) {
    return <p className="max-w-xl rounded-xl border border-apple-border-soft bg-apple-gray px-5 py-4 text-sm text-apple-ink">{error}</p>;
  }

  return (
    <div className="relative aspect-video w-full max-w-2xl overflow-hidden rounded-2xl border border-apple-border-soft bg-black">
      {starting ? (
        <p className="absolute inset-0 z-10 flex items-center justify-center bg-black/75 px-6 text-center text-sm text-white/95">
          Starting camera…
        </p>
      ) : null}
      <video
        ref={videoRef}
        muted
        playsInline
        className="h-full w-full object-cover"
        aria-label="Live camera preview for AR-style overlay demo"
      />
      <div className="pointer-events-none absolute inset-6 rounded-xl border-2 border-dashed border-white/70" aria-hidden />
      <p className="pointer-events-none absolute bottom-3 left-3 right-3 text-center text-xs leading-snug text-white/90">
        Live camera preview with framing overlay. Marker tracking with AR.js can mount on this surface when you need full AR
        semantics.
      </p>
    </div>
  );
}
