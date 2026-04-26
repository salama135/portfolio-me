/**
 * Layered hero backdrop: soft mesh + floating orbs (CSS only, no canvas).
 * Motion is disabled via globals.css when `prefers-reduced-motion: reduce`.
 * @param {{ children: import('react').ReactNode }} props
 */
export function HeroShowcase({ children }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="hero-showcase-mesh" />
        <div className="hero-showcase-orb hero-showcase-orb-a" />
        <div className="hero-showcase-orb hero-showcase-orb-b" />
        <div className="hero-showcase-vignette" />
      </div>
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
