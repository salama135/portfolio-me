/**
 * @param {{ highlights: { id: string, title: string, description?: string, date?: string, icon?: string }[] }} props
 */
export function HighlightsList({ highlights }) {
  if (!highlights?.length) return null;

  return (
    <ul className="mt-10 grid list-none gap-5 p-0 sm:grid-cols-2">
      {highlights.map((h) => (
        <li
          key={h.id}
          className="rounded-2xl border border-apple-border-soft bg-apple-white px-5 py-5 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-apple-gray-secondary">
            {h.icon ? `${h.icon} · ` : ''}
            {h.date ?? 'Highlight'}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-apple-ink">{h.title}</h3>
          {h.description ? <p className="mt-2 text-[15px] leading-relaxed text-apple-gray-secondary">{h.description}</p> : null}
        </li>
      ))}
    </ul>
  );
}
