/**
 * Editorial empty state for list routes when content folders are bare.
 * @param {{ title: string, description: string, children?: import('react').ReactNode }} props
 */
export function ContentEmptyState({ title, description, children }) {
  return (
    <div className="rounded-2xl border border-dashed border-apple-border-mid bg-apple-gray/50 px-8 py-14 text-center">
      <h2 className="text-lg font-semibold text-apple-ink">{title}</h2>
      <p className="mx-auto mt-3 max-w-[46ch] text-sm leading-relaxed text-apple-gray-secondary">{description}</p>
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}
