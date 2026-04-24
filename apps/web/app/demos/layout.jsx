/**
 * Demos segment layout: keep chrome light; no heavy client imports here (T039).
 */
export default function DemosLayout({ children }) {
  return <div className="demos-segment min-h-0">{children}</div>;
}
