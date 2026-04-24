/**
 * Product-forward hero device: dark glass chapter with subtle launch motion.
 * Decorative only; no live media (DESIGN.md: imagery carries narrative weight).
 */
export function HeroIphone() {
  return (
    <div className="relative mx-auto w-full max-w-[min(100%,280px)]">
      <div className="hero-device-glow" aria-hidden />
      <div className="hero-device-frame">
        <div className="hero-device-screen">
          <div className="hero-device-shimmer" aria-hidden />
          <div className="hero-device-island" aria-hidden />
          <div className="absolute inset-x-0 top-[22%] flex flex-col items-center gap-2 px-6 text-center">
            <span className="text-[11px] font-semibold tracking-[0.18em] text-white/45">PORTFOLIO</span>
            <span className="text-2xl font-semibold tracking-tight text-white/92">Pro</span>
          </div>
          <p className="hero-device-caption">Precision build</p>
        </div>
      </div>
    </div>
  );
}
