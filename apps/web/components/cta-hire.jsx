import Link from 'next/link';

/**
 * Primary action (DESIGN.md): Apple action blue pill on decisive paths.
 * @param {{ href: string, children: import('react').ReactNode, className?: string }} props
 */
export function CtaHire({ href, children, className = '' }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 min-w-[10rem] items-center justify-center rounded-full bg-[#0071e3] px-6 py-2.5 text-sm font-semibold text-white no-underline shadow-sm transition-[box-shadow,background-color,opacity] duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-[#0077ed] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${className}`}
    >
      {children}
    </Link>
  );
}
