/**
 * Abstract hero motif: signal grid + arc (no stock imagery; tech portfolio lane).
 */
export function HeroSignal() {
  const dots = [];
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const cx = 36 + col * 32;
      const cy = 36 + row * 32;
      const dist = Math.hypot(cx - 160, cy - 160);
      const active = dist > 52 && dist < 118;
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={cx}
          cy={cy}
          r={active ? 3.2 : 1.6}
          fill={active ? 'oklch(0.78 0.14 198 / 0.85)' : 'oklch(0.55 0.05 272 / 0.35)'}
        />,
      );
    }
  }

  return (
    <div className="relative aspect-square w-full max-w-md select-none opacity-90 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_75%)]">
      <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="hero-signal-arc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.78 0.14 198)" />
            <stop offset="100%" stopColor="oklch(0.74 0.17 158)" />
          </linearGradient>
        </defs>
        {dots}
        <path
          d="M 52 228 A 118 118 0 0 1 268 102"
          fill="none"
          stroke="url(#hero-signal-arc)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.9"
        />
        <circle cx="268" cy="102" r="6" fill="oklch(0.74 0.17 158)" opacity="0.95" />
      </svg>
    </div>
  );
}
