export default function ClubCard({ club }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="rc-club-card">
            <div className="rc-club-icon">{club.icon}</div>
            <div className="rc-club-location">{club.location} · est. {club.founded}</div>
            <h3 className="rc-club-name">{club.name}</h3>

            <div className="rc-club-tags">
                {club.tags.map(t => (
                    <span key={t} className="rc-tag">{t}</span>
                ))}
            </div>

            <div className="rc-club-meta">
                <div className="rc-club-stat">
                    <span className="rc-stat-val">{club.members.toLocaleString()}</span>
                    <span className="rc-stat-key">Members</span>
                </div>
                <div className="rc-club-stat">
                    <span className="rc-stat-val">{club.distanceRange}</span>
                    <span className="rc-stat-key">Weekly Dist.</span>
                </div>
                <div className="rc-club-stat">
                    <span className="rc-stat-val" style={{ color: levelColor[club.level] || "#111" }}>
                        {club.level.split(" ")[0]}
                    </span>
                    <span className="rc-stat-key">Level</span>
                </div>
            </div>

            {open && (
                <div className="rc-club-details">
                    <p className="rc-club-desc">{club.description}</p>
                    <div className="rc-club-info-grid">
                        <div>
                            <div className="rc-info-label">SCHEDULE</div>
                            {club.schedule.map(s => (
                                <div key={s.day} className="rc-info-val">{s.day} · {s.time}</div>
                            ))}
                        </div>
                        <div>
                            <div className="rc-info-label">MEETING POINT</div>
                            <div className="rc-info-val">{club.meetingPoint}</div>
                            <div className="rc-info-label" style={{ marginTop: 12 }}>AREAS</div>
                            <div className="rc-info-val">{club.areas.join(", ")}</div>
                        </div>
                    </div>
                    <a
                        href={`https://instagram.com/${club.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rc-ig-link"
                    >
                        {club.instagram} ↗
                    </a>
                </div>
            )}

            <button className="rc-ghost-btn" style={{ marginTop: 16 }} onClick={() => setOpen(!open)}>
                {open ? "COLLAPSE" : "VIEW CLUB"}
            </button>
        </div>
    );
}
