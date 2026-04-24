import Link from 'next/link';

/**
 * Primary hiring CTA — used in hero and optionally in header.
 * @param {{ href: string, children: import('react').ReactNode, className?: string }} props
 */
export function CtaHire({ href, children, className = '' }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-md bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow transition hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 ${className}`}
    >
      {children}
    </Link>
  );
}
