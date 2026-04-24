import Link from 'next/link';

/**
 * Primary hiring CTA — used in hero and optionally in header.
 * @param {{ href: string, children: import('react').ReactNode, className?: string }} props
 */
export function CtaHire({ href, children, className = '' }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 min-w-[10rem] items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-accent-fg no-underline shadow-sm transition-[box-shadow,background-color,opacity] duration-200 ease-out hover:bg-[color:oklch(0.82_0.13_198)] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${className}`}
    >
      {children}
    </Link>
  );
}
