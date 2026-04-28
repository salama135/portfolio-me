"use client";
import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const EVENTS = [
  {
    id: 1,
    name: "Sahara Ultra Challenge",
    distance: "50K",
    date: "2025-02-14",
    price: 850,
    details: "A grueling 50K trail run through the Eastern Desert. Aid stations every 10K. Finisher medal + tee included.",
    promocode: "SAHARA10",
    registrationStatus: "open",
    link: "https://raceyalla.com",
    organizer: "Desert Runners EG",
  },
  {
    id: 2,
    name: "Cairo Night Run",
    distance: "10K",
    date: "2025-01-25",
    price: 300,
    details: "A 10K road race through lit-up downtown Cairo streets. Flat course, perfect for beginners and PRs alike.",
    promocode: "NIGHT25",
    registrationStatus: "open",
    link: "https://raceyalla.com",
    organizer: "Cairo Road Runners",
  },
  {
    id: 3,
    name: "Alexandria Half Marathon",
    distance: "21.1K",
    date: "2025-03-07",
    price: 500,
    details: "Scenic coastal half marathon along the Corniche. One of Egypt's most beloved races. AIMS certified course.",
    promocode: "",
    registrationStatus: "coming_soon",
    link: "https://raceyalla.com",
    organizer: "Alex Sports Club",
  },
  {
    id: 4,
    name: "Red Sea Endurance Festival",
    distance: "5K / 10K / 21K",
    date: "2025-04-11",
    price: 650,
    details: "Three distances, one epic weekend in Hurghada. Beach finish line. Includes Saturday pasta party.",
    promocode: "REDSEA15",
    registrationStatus: "open",
    link: "https://raceyalla.com",
    organizer: "Hurghada Run Crew",
  },
  {
    id: 5,
    name: "Giza Pyramid Race",
    distance: "10K / 42.2K",
    date: "2025-05-02",
    price: 1200,
    details: "The iconic Pyramids Marathon. Run in the shadow of the last ancient wonder. International field welcome.",
    promocode: "",
    registrationStatus: "sold_out",
    link: "https://pyramidsmarathon.com",
    organizer: "Marathon Egypt",
  },
  {
    id: 6,
    name: "Maadi CrossFit & Run Challenge",
    distance: "5K + WOD",
    date: "2025-01-31",
    price: 400,
    details: "Hybrid event — run 5K then tackle a 20-minute CrossFit WOD. Scored combined. Team or solo entry.",
    promocode: "CROSS20",
    registrationStatus: "open",
    link: "https://raceyalla.com",
    organizer: "Box & Run Cairo",
  },
  {
    id: 7,
    name: "Sinai Trail Run",
    distance: "25K",
    date: "2025-03-22",
    price: 900,
    details: "Mountain trail run through St. Catherine's wilderness. Technical terrain, 1400m elevation gain. Gear list required.",
    promocode: "SINAI25",
    registrationStatus: "open",
    link: "https://sinaitrail.com",
    organizer: "Sinai Trail",
  },
  {
    id: 8,
    name: "New Cairo 5K Fun Run",
    distance: "5K",
    date: "2024-12-20",
    price: 150,
    details: "Community fun run in New Cairo's parks. Family friendly, no timing chip. Free for kids under 12.",
    promocode: "",
    registrationStatus: "closed",
    link: "https://raceyalla.com",
    organizer: "New Cairo Runners",
  },
];

const CLUBS = [
  {
    id: 1,
    name: "Cairo Road Runners",
    icon: "🏙️",
    founded: "2019",
    location: "Cairo",
    areas: ["Zamalek", "Corniche", "Maadi"],
    schedule: [
      { day: "Tuesday", time: "6:00 AM" },
      { day: "Friday", time: "6:30 AM" },
    ],
    distanceRange: "5K – 21K",
    level: "All Levels",
    members: 1200,
    instagram: "@cairoroadrunners",
    meetingPoint: "Shooting Club, Dokki",
    description: "Cairo's largest running community. Weekly group runs, coaching sessions, and monthly time trials for all paces.",
    tags: ["Road", "Social", "Coaching"],
  },
  {
    id: 2,
    name: "Desert Runners EG",
    icon: "🏜️",
    founded: "2021",
    location: "Cairo",
    areas: ["Eastern Desert", "Wadi Degla"],
    schedule: [
      { day: "Saturday", time: "5:30 AM" },
    ],
    distanceRange: "15K – 50K",
    level: "Intermediate / Advanced",
    members: 340,
    instagram: "@desertrunnerseg",
    meetingPoint: "Wadi Degla Protectorate Entrance",
    description: "For those who crave dirt, elevation, and silence. Trail running community focused on ultra preparation and desert exploration.",
    tags: ["Trail", "Ultra", "Adventure"],
  },
  {
    id: 3,
    name: "Alex Run Crew",
    icon: "🌊",
    founded: "2020",
    location: "Alexandria",
    areas: ["Corniche", "Montazah", "Stanley"],
    schedule: [
      { day: "Friday", time: "7:00 AM" },
      { day: "Sunday", time: "6:30 AM" },
    ],
    distanceRange: "5K – 15K",
    level: "All Levels",
    members: 620,
    instagram: "@alexruncrew",
    meetingPoint: "Stanley Bridge, Alexandria",
    description: "Alexandria's most active run crew. Coastal routes, sea breeze guaranteed. Big on vibes, community events, and post-run breakfast.",
    tags: ["Road", "Social", "Beginner Friendly"],
  },
  {
    id: 4,
    name: "Sinai Trail Collective",
    icon: "⛰️",
    founded: "2022",
    location: "South Sinai",
    areas: ["St. Catherine", "Sharm Trails", "Nuweiba"],
    schedule: [
      { day: "Monthly Expedition", time: "Varies" },
    ],
    distanceRange: "10K – 100K",
    level: "Advanced",
    members: 180,
    instagram: "@sinaitrailco",
    meetingPoint: "St. Catherine's Monastery Village",
    description: "Elite mountain trail collective organizing monthly multi-day expeditions through Sinai's ancient mountain routes.",
    tags: ["Trail", "Mountain", "Ultra", "Expedition"],
  },
  {
    id: 5,
    name: "Maadi Morning Milers",
    icon: "🌅",
    founded: "2018",
    location: "Cairo",
    areas: ["Maadi Corniche", "Degla"],
    schedule: [
      { day: "Monday", time: "6:00 AM" },
      { day: "Wednesday", time: "6:00 AM" },
      { day: "Saturday", time: "6:30 AM" },
    ],
    distanceRange: "3K – 12K",
    level: "Beginner / Intermediate",
    members: 890,
    instagram: "@maadimorningmilers",
    meetingPoint: "Maadi Corniche, Gate 3",
    description: "The OGs of Cairo's running scene. Friendly, consistent, and incredibly welcoming. 3x a week runs followed by coffee.",
    tags: ["Road", "Beginner Friendly", "Social"],
  },
  {
    id: 6,
    name: "Hurghada Run Crew",
    icon: "🔴",
    founded: "2023",
    location: "Hurghada",
    areas: ["Sahl Hasheesh", "El Gouna", "Marina"],
    schedule: [
      { day: "Thursday", time: "6:00 AM" },
      { day: "Sunday", time: "6:00 AM" },
    ],
    distanceRange: "5K – 21K",
    level: "All Levels",
    members: 210,
    instagram: "@hurghadaruncrew",
    meetingPoint: "Sahl Hasheesh Main Entrance",
    description: "Red Sea's fastest growing run crew. Routes along resort promenades and desert paths. Monthly beach run events open to visitors.",
    tags: ["Road", "Trail", "Social", "Expat Friendly"],
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function isPast(d) {
  return new Date(d) < new Date();
}

function statusLabel(status, date) {
  if (isPast(date) && status !== "closed") return { label: "PAST", color: "#707072" };
  const map = {
    open: { label: "OPEN", color: "#007D48" },
    coming_soon: { label: "COMING SOON", color: "#D33918" },
    sold_out: { label: "SOLD OUT", color: "#D30005" },
    closed: { label: "CLOSED", color: "#707072" },
  };
  return map[status] || { label: status.toUpperCase(), color: "#707072" };
}

const levelColor = {
  "All Levels": "#007D48",
  "Beginner / Intermediate": "#1151FF",
  "Intermediate / Advanced": "#D33918",
  Advanced: "#D30005",
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function EventCard({ ev }) {
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          {formatDate(ev.date)}
        </span>
        <span className="rc-meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
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

function ClubCard({ club }) {
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

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function SportsForAllInner() {
  const [tab, setTab] = useState("events");
  const [filter, setFilter] = useState("all");
  const [clubFilter, setClubFilter] = useState("all");
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => { setMounted(true); }, []);

  const filteredEvents = EVENTS.filter(ev => {
    if (filter === "open") return ev.registrationStatus === "open" && !isPast(ev.date);
    if (filter === "upcoming") return !isPast(ev.date);
    if (filter === "past") return isPast(ev.date);
    return true;
  });

  const allLocations = ["all", ...new Set(CLUBS.map(c => c.location))];
  const filteredClubs = CLUBS.filter(c => clubFilter === "all" || c.location === clubFilter);

  const openCount = EVENTS.filter(e => e.registrationStatus === "open" && !isPast(e.date)).length;

  return (
    <div className="rc-root" data-theme={dark ? "dark" : "light"}>
      <style>{`
        /* ── RESET & BASE ── */
        .rc-root *, .rc-root *::before, .rc-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* dark (default) */
        .rc-root[data-theme="dark"] {
          --rc-bg:          #0a0a0a;
          --rc-surface:     #111111;
          --rc-surface-hov: #161616;
          --rc-border:      #1f1f1f;
          --rc-border-mid:  #2a2a2a;
          --rc-text-pri:    #f0f0f0;
          --rc-text-sec:    #9E9EA0;
          --rc-text-mute:   #707072;
          --rc-accent:      #D30005;
          --rc-pill-bg:     #FFFFFF;
          --rc-pill-txt:    #111111;
          --rc-pill-hov:    #E5E5E5;
          --rc-tag-txt:     #9E9EA0;
          --rc-hero-acc:    rgba(238,0,5,0.12);
        }

        /* light */
        .rc-root[data-theme="light"] {
          --rc-bg:          #F5F5F5;
          --rc-surface:     #FFFFFF;
          --rc-surface-hov: #FAFAFA;
          --rc-border:      #E5E5E5;
          --rc-border-mid:  #CACACB;
          --rc-text-pri:    #111111;
          --rc-text-sec:    #4B4B4D;
          --rc-text-mute:   #707072;
          --rc-accent:      #D30005;
          --rc-pill-bg:     #111111;
          --rc-pill-txt:    #FFFFFF;
          --rc-pill-hov:    #39393B;
          --rc-tag-txt:     #4B4B4D;
          --rc-hero-acc:    rgba(211,0,5,0.06);
        }

        .rc-root {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background: var(--rc-bg);
          color: var(--rc-text-pri);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          transition: background 0.25s ease, color 0.25s ease;
        }
        a { text-decoration: none; color: inherit; }
        button { cursor: pointer; font-family: inherit; border: none; background: none; }

        /* ── HERO ── */
        .rc-hero {
          position: relative;
          overflow: hidden;
          padding: 80px 48px 64px;
          background: var(--rc-bg);
          border-bottom: 1px solid var(--rc-border);
        }
        .rc-hero-noise {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .rc-hero-accent {
          position: absolute; top: -60px; right: -80px;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, var(--rc-hero-acc) 0%, transparent 70%);
          pointer-events: none;
        }
        .rc-hero-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.25em;
          color: var(--rc-accent); text-transform: uppercase; margin-bottom: 16px;
          display: flex; align-items: center; gap: 10px;
        }
        .rc-hero-eyebrow::before {
          content: ''; display: block; width: 24px; height: 2px; background: var(--rc-accent);
        }
        .rc-hero-title {
          font-size: clamp(52px, 8vw, 96px);
          font-weight: 900;
          line-height: 0.9;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: var(--rc-text-pri);
          margin-bottom: 8px;
        }
        .rc-hero-title span { color: var(--rc-accent); }
        .rc-hero-sub {
          font-size: 15px; color: var(--rc-text-mute); margin-top: 20px; max-width: 480px;
          line-height: 1.7; font-weight: 400;
        }
        .rc-hero-stats {
          display: flex; gap: 40px; margin-top: 40px; flex-wrap: wrap;
        }
        .rc-hero-stat-num {
          font-size: 36px; font-weight: 900; color: var(--rc-text-pri); line-height: 1;
        }
        .rc-hero-stat-label {
          font-size: 11px; color: var(--rc-text-mute); text-transform: uppercase;
          letter-spacing: 0.15em; margin-top: 4px;
        }
        .rc-hero-open-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(0,125,72,0.15); border: 1px solid rgba(0,125,72,0.4);
          color: #1EAA52; font-size: 11px; font-weight: 700;
          letter-spacing: 0.15em; padding: 5px 12px; border-radius: 30px;
          margin-top: 24px; text-transform: uppercase;
        }
        .rc-hero-open-badge::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: #1EAA52; animation: rc-pulse 2s infinite;
        }
        @keyframes rc-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }

        /* ── NAV TABS ── */
        .rc-tabs {
          display: flex; align-items: center; gap: 0;
          padding: 0 48px;
          background: var(--rc-bg);
          border-bottom: 1px solid var(--rc-border);
          position: sticky; top: 0; z-index: 10;
          transition: background 0.25s ease;
        }
        .rc-tab {
          padding: 20px 24px; font-size: 13px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--rc-text-mute); border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          background: none; cursor: pointer;
        }
        .rc-tab.active { color: var(--rc-text-pri); border-bottom-color: var(--rc-accent); }
        .rc-tab:hover:not(.active) { color: var(--rc-text-sec); }

        .rc-theme-toggle {
          margin-left: auto;
          display: flex; align-items: center; gap: 7px;
          padding: 8px 14px; border-radius: 30px;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--rc-text-mute);
          border: 1.5px solid var(--rc-border-mid);
          background: none; cursor: pointer;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .rc-theme-toggle:hover {
          color: var(--rc-text-pri);
          border-color: var(--rc-text-mute);
          background: var(--rc-surface);
        }

        /* ── FILTERS ── */
        .rc-filters {
          padding: 24px 48px; display: flex; gap: 8px; flex-wrap: wrap;
          border-bottom: 1px solid var(--rc-border);
          background: var(--rc-bg);
          transition: background 0.25s ease;
        }
        .rc-filter-pill {
          padding: 8px 18px; border-radius: 30px; font-size: 12px;
          font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
          border: 1.5px solid var(--rc-border); color: var(--rc-text-mute);
          background: none;
          transition: all 0.15s;
        }
        .rc-filter-pill.active {
          background: var(--rc-pill-bg); color: var(--rc-pill-txt); border-color: var(--rc-pill-bg);
        }
        .rc-filter-pill:hover:not(.active) {
          border-color: var(--rc-text-mute); color: var(--rc-text-sec);
        }

        /* ── GRID ── */
        .rc-section {
          padding: 40px 48px 80px;
          background: var(--rc-bg);
          transition: background 0.25s ease;
        }
        .rc-section-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          color: var(--rc-text-mute); text-transform: uppercase; margin-bottom: 24px;
        }
        .rc-events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1px;
          background: var(--rc-border);
          border: 1px solid var(--rc-border);
        }
        .rc-clubs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1px;
          background: var(--rc-border);
          border: 1px solid var(--rc-border);
        }

        /* ── EVENT CARD ── */
        .rc-event-card {
          background: var(--rc-surface); padding: 28px 24px;
          transition: background 0.15s;
        }
        .rc-event-card:hover { background: var(--rc-surface-hov); }
        .rc-event-card[data-past="true"] { opacity: 0.5; }
        .rc-event-header {
          display: flex; justify-content: space-between;
          align-items: flex-start; gap: 12px; margin-bottom: 16px;
        }
        .rc-event-distance {
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          color: var(--rc-accent); text-transform: uppercase; margin-bottom: 6px;
        }
        .rc-event-name {
          font-size: 20px; font-weight: 900; color: var(--rc-text-pri);
          line-height: 1.1; text-transform: uppercase;
        }
        .rc-event-organizer {
          font-size: 12px; color: var(--rc-text-mute); margin-top: 4px;
        }
        .rc-event-status-pill {
          font-size: 10px; font-weight: 800; letter-spacing: 0.15em;
          padding: 4px 10px; border-radius: 30px; white-space: nowrap;
          color: #fff; flex-shrink: 0;
        }
        .rc-event-meta {
          display: flex; gap: 20px; margin-bottom: 16px;
        }
        .rc-meta-item {
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; color: var(--rc-text-sec);
        }
        .rc-meta-item svg { opacity: 0.6; }
        .rc-event-details {
          padding: 16px 0; border-top: 1px solid var(--rc-border);
          margin-bottom: 12px;
        }
        .rc-event-details p {
          font-size: 13px; color: var(--rc-text-sec); line-height: 1.7;
        }
        .rc-promo-row {
          display: flex; align-items: center; gap: 12px; margin-top: 14px;
        }
        .rc-promo-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.2em;
          color: var(--rc-text-mute); text-transform: uppercase;
        }
        .rc-promo-btn {
          font-size: 12px; font-weight: 700; color: #1EAA52;
          border: 1px dashed rgba(30,170,82,0.4);
          padding: 4px 12px; border-radius: 6px;
          transition: background 0.15s;
          letter-spacing: 0.05em; background: none;
        }
        .rc-promo-btn:hover { background: rgba(30,170,82,0.1); }
        .rc-event-actions {
          display: flex; align-items: center; gap: 12px;
          border-top: 1px solid var(--rc-border); padding-top: 16px;
        }
        .rc-ghost-btn {
          font-size: 11px; font-weight: 800; letter-spacing: 0.15em;
          color: var(--rc-text-mute); text-transform: uppercase;
          padding: 8px 0; transition: color 0.15s; background: none;
        }
        .rc-ghost-btn:hover { color: var(--rc-text-pri); }
        .rc-pill-btn {
          display: inline-block;
          font-size: 12px; font-weight: 800; letter-spacing: 0.1em;
          background: var(--rc-pill-bg); color: var(--rc-pill-txt); text-transform: uppercase;
          padding: 10px 20px; border-radius: 30px;
          transition: background 0.15s;
          margin-left: auto;
        }
        .rc-pill-btn:hover { background: var(--rc-pill-hov); color: var(--rc-pill-txt); }

        /* ── CLUB CARD ── */
        .rc-club-card {
          background: var(--rc-surface); padding: 28px 24px;
          transition: background 0.15s;
        }
        .rc-club-card:hover { background: var(--rc-surface-hov); }
        .rc-club-icon { font-size: 32px; margin-bottom: 12px; }
        .rc-club-location {
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          color: var(--rc-text-mute); text-transform: uppercase; margin-bottom: 6px;
        }
        .rc-club-name {
          font-size: 22px; font-weight: 900; color: var(--rc-text-pri);
          text-transform: uppercase; line-height: 1.05; margin-bottom: 14px;
        }
        .rc-club-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
        .rc-tag {
          font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
          color: var(--rc-tag-txt); border: 1px solid var(--rc-border-mid);
          padding: 4px 10px; border-radius: 30px; text-transform: uppercase;
        }
        .rc-club-meta {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 0; border-top: 1px solid var(--rc-border);
          border-bottom: 1px solid var(--rc-border); padding: 16px 0;
        }
        .rc-club-stat { text-align: center; }
        .rc-club-stat + .rc-club-stat { border-left: 1px solid var(--rc-border); }
        .rc-stat-val {
          display: block; font-size: 18px; font-weight: 900;
          color: var(--rc-text-pri); line-height: 1;
        }
        .rc-stat-key {
          display: block; font-size: 10px; color: var(--rc-text-mute);
          text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px;
        }
        .rc-club-details {
          padding: 20px 0; border-top: 1px solid var(--rc-border); margin-top: 16px;
        }
        .rc-club-desc {
          font-size: 13px; color: var(--rc-text-sec); line-height: 1.7; margin-bottom: 20px;
        }
        .rc-club-info-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
          margin-bottom: 16px;
        }
        .rc-info-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.2em;
          color: var(--rc-text-mute); text-transform: uppercase; margin-bottom: 6px;
        }
        .rc-info-val {
          font-size: 13px; color: var(--rc-text-sec); line-height: 1.6;
        }
        .rc-ig-link {
          font-size: 12px; font-weight: 700; color: #1151FF;
          letter-spacing: 0.05em; transition: color 0.15s;
        }
        .rc-ig-link:hover { color: #1190FF; }

        /* ── FOOTER ── */
        .rc-footer {
          border-top: 1px solid var(--rc-border);
          padding: 32px 48px;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 16px;
          background: var(--rc-bg);
          transition: background 0.25s ease;
        }
        .rc-footer-text {
          font-size: 12px; color: var(--rc-text-mute);
        }
        .rc-footer-text strong { color: var(--rc-text-sec); }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .rc-hero { padding: 48px 20px 40px; }
          .rc-tabs { padding: 0 20px; }
          .rc-tab { padding: 16px 16px; font-size: 11px; }
          .rc-filters { padding: 16px 20px; }
          .rc-section { padding: 28px 20px 60px; }
          .rc-events-grid, .rc-clubs-grid { grid-template-columns: 1fr; }
          .rc-hero-stats { gap: 24px; }
          .rc-footer { padding: 24px 20px; flex-direction: column; text-align: center; }
          .rc-club-info-grid { grid-template-columns: 1fr; }
        }

        /* ── EMPTY STATE ── */
        .rc-empty {
          grid-column: 1 / -1; background: var(--rc-surface);
          padding: 60px 24px; text-align: center;
        }
        .rc-empty-icon { font-size: 40px; margin-bottom: 16px; }
        .rc-empty-text { font-size: 14px; color: var(--rc-text-mute); }

        /* ── FADE IN ── */
        @keyframes rc-fadeup {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .rc-event-card, .rc-club-card {
          animation: rc-fadeup 0.3s ease both;
        }
      `}</style>

      {/* HERO */}
      <div className="rc-hero">
        <div className="rc-hero-noise" />
        <div className="rc-hero-accent" />
        <div className="rc-hero-eyebrow">Egypt Running Scene</div>
        <h1 className="rc-hero-title">
          RUN<br /><span>EGYPT</span>
        </h1>
        <p className="rc-hero-sub">
          Every race. Every crew. Every finish line in Egypt — tracked in one place.
        </p>
        <div className="rc-hero-stats">
          <div>
            <div className="rc-hero-stat-num">{EVENTS.length}</div>
            <div className="rc-hero-stat-label">Events Listed</div>
          </div>
          <div>
            <div className="rc-hero-stat-num">{CLUBS.length}</div>
            <div className="rc-hero-stat-label">Active Clubs</div>
          </div>
          <div>
            <div className="rc-hero-stat-num">
              {CLUBS.reduce((a, c) => a + c.members, 0).toLocaleString()}
            </div>
            <div className="rc-hero-stat-label">Community Members</div>
          </div>
        </div>
        {openCount > 0 && (
          <div className="rc-hero-open-badge">
            {openCount} event{openCount > 1 ? "s" : ""} open for registration
          </div>
        )}
      </div>

      {/* TABS */}
      <div className="rc-tabs">
        <button
          className={`rc-tab ${tab === "events" ? "active" : ""}`}
          onClick={() => setTab("events")}
        >
          Events
        </button>
        <button
          className={`rc-tab ${tab === "clubs" ? "active" : ""}`}
          onClick={() => setTab("clubs")}
        >
          Running Clubs
        </button>
        <button
          className="rc-theme-toggle"
          onClick={() => setDark(d => !d)}
          aria-label="Toggle dark mode"
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
          <span>{dark ? "Light" : "Dark"}</span>
        </button>
      </div>

      {/* EVENTS TAB */}
      {tab === "events" && (
        <>
          <div className="rc-filters">
            {[
              { key: "all", label: "All Events" },
              { key: "open", label: "Open Now" },
              { key: "upcoming", label: "Upcoming" },
              { key: "past", label: "Past" },
            ].map(f => (
              <button
                key={f.key}
                className={`rc-filter-pill ${filter === f.key ? "active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="rc-section">
            <div className="rc-section-label">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
            </div>
            <div className="rc-events-grid">
              {filteredEvents.length === 0 ? (
                <div className="rc-empty">
                  <div className="rc-empty-icon">🏁</div>
                  <div className="rc-empty-text">No events match this filter.</div>
                </div>
              ) : (
                filteredEvents.map(ev => <EventCard key={ev.id} ev={ev} />)
              )}
            </div>
          </div>
        </>
      )}

      {/* CLUBS TAB */}
      {tab === "clubs" && (
        <>
          <div className="rc-filters">
            {allLocations.map(loc => (
              <button
                key={loc}
                className={`rc-filter-pill ${clubFilter === loc ? "active" : ""}`}
                onClick={() => setClubFilter(loc)}
              >
                {loc === "all" ? "All Cities" : loc}
              </button>
            ))}
          </div>
          <div className="rc-section">
            <div className="rc-section-label">
              {filteredClubs.length} club{filteredClubs.length !== 1 ? "s" : ""}
            </div>
            <div className="rc-clubs-grid">
              {filteredClubs.map(club => <ClubCard key={club.id} club={club} />)}
            </div>
          </div>
        </>
      )}

      {/* FOOTER */}
      <div className="rc-footer">
        <div className="rc-footer-text">
          <strong>RunEgypt</strong> — Community-maintained. Not affiliated with any organizer.
        </div>
        <div className="rc-footer-text">
          Data last updated: {new Date().toLocaleDateString("en-EG", { month: "long", year: "numeric" })}
        </div>
      </div>
    </div>
  );
}