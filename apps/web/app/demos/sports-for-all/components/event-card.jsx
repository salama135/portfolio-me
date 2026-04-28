export default function EventCard({ ev }) {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const { label, color } = statusLabel(ev.registrationStatus, ev.date);
    const past = isPast(ev.date);

    function copyPromo() {
        navigator.clipboard.writeText(ev.promocode);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    return (
        <div className="rc-event-card" data-past={past}>
            <div className="rc-event-header">
                <div>
                    <div className="rc-event-distance">{ev.distance}</div>
                    <h3 className="rc-event-name">{ev.name}</h3>
                    <div className="rc-event-organizer">{ev.organizer}</div>
                </div>
                <div className="rc-event-status-pill" style={{ background: color }}>
                    {label}
                </div>
            </div>

            <div className="rc-event-meta">
                <span className="rc-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                    {formatDate(ev.date)}
                </span>
                <span className="rc-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    EGP {ev.price.toLocaleString()}
                </span>
            </div>

            {open && (
                <div className="rc-event-details">
                    <p>{ev.details}</p>
                    {ev.promocode && (
                        <div className="rc-promo-row">
                            <span className="rc-promo-label">PROMO CODE</span>
                            <button className="rc-promo-btn" onClick={copyPromo}>
                                {ev.promocode} {copied ? "✓" : "⧉"}
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="rc-event-actions">
                <button className="rc-ghost-btn" onClick={() => setOpen(!open)}>
                    {open ? "LESS" : "DETAILS"}
                </button>
                {!past && ev.registrationStatus === "open" && (
                    <a href={ev.link} target="_blank" rel="noopener noreferrer" className="rc-pill-btn">
                        REGISTER →
                    </a>
                )}
            </div>
        </div>
    );
}
