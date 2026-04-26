# Research: 002 Portfolio showcase, demos, and site alignment

**Feature**: `002-portfolio-showcase`  
**Date**: 2026-04-26

## 1. Hero visual treatment (depth vs 2D motion)

**Decision**: Ship hero as a **layered composition**: primary copy and CTA stay stable; background uses either CSS-driven parallax / gradient mesh **or** a lightweight canvas/SVG loop, chosen per performance budget. Defer heavy WebGL on the home hero unless behind a “full effect” interaction or progressive enhancement.

**Rationale**: Matches spec FR-001 and edge cases (reduced motion, mobile). GitHub-style 3D globes are high bundle cost; portfolio constitution favors KISS and Netlify static delivery.

**Alternatives considered**: Full Three.js hero (rejected for initial LCP unless dynamically imported and idle-loaded); static image only (rejected—fails “intentional flare”).

---

## 2. Demo curation and technical stack per demo family

**Decision**: Keep **registry-driven** demos (`content/demos.json` + `DemoExperience` schema) with **client-only** routes under `app/demos/[slug]`. Minimum four shipped demos for SC-003: extend existing families (AR overlay, VR room, Three showcase, creative sketch) toward a primary task completable in under two minutes; add one new **high-flair** demo from shortlist below.

**Recommended demo concepts** (for FR-016 shortlist; pick 4–6 for implementation):

| Concept | Showcase signal | Notes |
|--------|-----------------|--------|
| **Audio-reactive visual** | Creative coding + Web APIs | Mic optional; fallback to mouse/touch; particle or bar field |
| **Generative “brand field”** | Math + design | Seeded noise or flow field; export PNG snapshot |
| **Mini shader playground** | Graphics literacy | 2–3 presets, sliders, no save |
| **Gesture / device motion lab** | Mobile sensors | Permission-gated; static fallback copy |
| **Timeline story scrollytelling** | UX + motion | CSS scroll-driven; lightweight |
| **“Debug aesthetic” terminal** | Personality + UI | Fake shell commands reveal facts about you |

**Rationale**: Aligns with FR-002–FR-004 and existing launcher/error-boundary patterns from `001` tasks.

**Alternatives considered**: Data-backed demos requiring API/DB (rejected—constitution: no DB).

---

## 3. Credly badge URLs as content source

**Decision**: Treat `poc/credly-badges.json` (or a copy under `apps/web/content/achievements/credly-badges.json`) as **build-time content**. Loader resolves `badge_urls` to **Open Badge / Credly image URLs** where possible: prefer embedding **og:image** or documented Credly badge image pattern; if only profile page URLs exist, use **placeholder tile + link** and optional serverless fetch only if later added (out of scope for no-DB v1).

**Rationale**: Current file is page URLs, not direct PNG URLs—implementation must not assume hotlinking works without verification.

**Alternatives considered**: Manual duplicate JSON only in web app (rejected—spec says single maintained inventory).

---

## 4. Information architecture: new sections vs existing routes

**Decision**:

- **Life / Pinterest-style**: consolidate on **`/adventures`** (existing) with card grid and optional rename in nav to “Life” or “Gallery” if copy fits—document in IA contract; avoid duplicate `/life` unless redirect.
- **Achievements**: add **`/achievements`** page fed by credly inventory + optional `highlights.json` milestones.
- **Games**: add **`/games`** hub; at least one of: Two truths & a lie, This or that, “Ahmed quiz” (spec examples).
- **Resume**: add **`/resume`** with tabs/anchors for Experience, Education, skill groups (matches FR-012).
- **Mentoring**: extend **`/mentoring`** with Google Calendar embed + testimonial strip (spec FR-010); keep external booking as primary CTA.
- **Mobile apps**: ensure **`/mobile`** or equivalent exists in nav (add route if missing) per FR-015.

**Rationale**: Minimizes route churn; satisfies SC-001/SC-002 reachability.

**Alternatives considered**: Many top-level nav items (12+)—mitigate with grouped dropdown “Connect” (Contact, Links, Mentoring) and “Play” (Demos, Games).

---

## 5. Games and privacy

**Decision**: All game state **in-memory**; no cookies for gameplay; optional localStorage for “seen intro” only with clear non-PII use.

**Rationale**: FR-009 and spec edge cases.

---

## 6. Testing strategy (lightweight)

**Decision**: Manual smoke + optional Playwright later (same as 001 tasks note). No new test framework required for epic acceptance.

**Rationale**: Constitution does not mandate automated tests; scope is UI demos.

---

## 7. Dependency on prior epic

**Decision**: All implementation work **assumes** `001-portfolio-site-demos` workspace layout (`apps/web`, content loaders, `demos.json`, shell). Cross-check `specs/001-portfolio-site-demos/tasks.md` before changing IA or loaders.

**Rationale**: Spec assumption line 150–151 in `spec.md`.
