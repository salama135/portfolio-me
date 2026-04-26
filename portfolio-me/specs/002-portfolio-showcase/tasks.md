# Tasks: Portfolio showcase, demos, and site alignment (002)

**Input**: Design documents from `D:\personal\portfolio-me\portfolio-me\specs\002-portfolio-showcase\`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Omitted (not requested in spec); optional Playwright smoke may be added in Polish phase.

**Organization**: Phases follow dependency order. User story labels match [spec.md](./spec.md) (US1–US5). Before implementation, reconcile with `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\tasks.md` to avoid redoing completed work.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallel-safe (different files, no ordering dependency on incomplete siblings in the same group).
- **[USn]**: User story from spec (setup and foundational phases have no story label).

## Path conventions (this repo)

- **Monorepo root**: `D:\personal\portfolio-me`
- **Next.js app**: `D:\personal\portfolio-me\apps\web\`
- **Credly inventory (source)**: `D:\personal\portfolio-me\poc\credly-badges.json`
- **Specs**: `D:\personal\portfolio-me\portfolio-me\specs\002-portfolio-showcase\`

---

## Phase 1: Setup (shared)

**Purpose**: Align with prior epic outputs and freeze demo shortlist (FR-016).

- [x] T001 Review completed items in `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\tasks.md` and note which 002 tasks extend versus replace existing `apps/web` work.
- [x] T002 [P] Add `D:\personal\portfolio-me\portfolio-me\specs\002-portfolio-showcase\demo-shortlist.md` listing the agreed demo concepts to implement (from [research.md](./research.md) table) with mapping to showcase goals for FR-016 sign-off.

---

## Phase 2: Foundational (blocking prerequisites)

**Purpose**: Route constants, schemas, and loaders for new content types so user-story pages can ship without rework.

**CRITICAL**: Complete before user-story phases that consume new JSON.

- [x] T003 Extend `D:\personal\portfolio-me\apps\web\lib\constants\routes.js` with stable paths and `NAV_ITEMS` updates for `/resume`, `/achievements`, `/games`, `/mobile` per `D:\personal\portfolio-me\portfolio-me\specs\002-portfolio-showcase\contracts\site-information-architecture.md` (use grouped labels if nav overflow).
- [x] T004 [P] Add Zod schema for resume content in `D:\personal\portfolio-me\apps\web\lib\content\schemas\resume.js` per [data-model.md](./data-model.md) `ResumeDocument`.
- [x] T005 [P] Add Zod schema for mentoring content in `D:\personal\portfolio-me\apps\web\lib\content\schemas\mentoring.js` (session types, booking URLs, testimonials array).
- [x] T006 [P] Add Zod schema for game packs in `D:\personal\portfolio-me\apps\web\lib\content\schemas\game-pack.js` per `D:\personal\portfolio-me\portfolio-me\specs\002-portfolio-showcase\contracts\games-content.md`.
- [x] T007 Implement `D:\personal\portfolio-me\apps\web\lib\content\load\achievements.js` to read `D:\personal\portfolio-me\poc\credly-badges.json` (and optional `D:\personal\portfolio-me\apps\web\content\achievements-meta.json`) with URL validation and deduplication per `D:\personal\portfolio-me\portfolio-me\specs\002-portfolio-showcase\contracts\credly-badges-content.md`.
- [x] T008 Add `D:\personal\portfolio-me\apps\web\lib\content\load\resume.js`, `D:\personal\portfolio-me\apps\web\lib\content\load\mentoring.js`, and `D:\personal\portfolio-me\apps\web\lib\content\load\games.js` wired to new schemas and `D:\personal\portfolio-me\apps\web\content\` JSON paths.

**Checkpoint**: `npm run dev` from `D:\personal\portfolio-me` runs with no loader import errors for new modules.

---

## Phase 3: User Story 5 — Site map matches portfolio (Priority: P1)

**Goal**: FR-018; SC-002; every required area discoverable from shell navigation or documented hub.

**Independent Test**: Audit each route in `site-information-architecture.md` from `D:\personal\portfolio-me\apps\web\components\site-header.jsx` without using address bar guesses.

- [x] T009 [US5] Create `D:\personal\portfolio-me\apps\web\app\resume\page.jsx` stub with section anchors and `metadata` using `ContentEmptyState` or equivalent until resume JSON wired in US3.
- [x] T010 [P] [US5] Create `D:\personal\portfolio-me\apps\web\app\achievements\page.jsx` listing badges from `achievements` loader with link + image fallback per spec edge cases.
- [x] T011 [P] [US5] Create `D:\personal\portfolio-me\apps\web\app\games\page.jsx` as hub and `D:\personal\portfolio-me\apps\web\app\games\[gameId]\page.jsx` (or equivalent pattern) for individual games.
- [x] T012 [P] [US5] Create `D:\personal\portfolio-me\apps\web\app\mobile\page.jsx` for native app showcase (screens, links to `D:\personal\portfolio-me\apps\mobile` or store URLs) per FR-015.
- [x] T013 [US5] Update `D:\personal\portfolio-me\apps\web\components\site-header.jsx` to render updated `NAV_ITEMS` from `routes.js` including new routes and accessible labels (e.g. Adventures vs Life per contract).
- [x] T014 [P] [US5] Update `D:\personal\portfolio-me\apps\web\components\site-footer.jsx` with secondary links to new sections if needed for two-click rule.
- [x] T015 [US5] If IA contract chooses `/life` → `/adventures`, add redirect in `D:\personal\portfolio-me\apps\web\next.config.js` and document choice in `D:\personal\portfolio-me\portfolio-me\specs\002-portfolio-showcase\contracts\site-information-architecture.md` footer note.

**Checkpoint**: All marketing routes from contract exist (no 404 on nav clicks); mobile page live.

---

## Phase 4: User Story 1 — First impression and orientation (Priority: P1)

**Goal**: FR-001; hero flare + clear paths to demos and major areas; SC-001.

**Independent Test**: Cold open `/`; confirm motion or layered hero and CTAs to `/demos` and `/projects` within three clicks.

- [x] T016 [US1] Implement layered or motion hero in `D:\personal\portfolio-me\apps\web\app\page.jsx` with supporting component under `D:\personal\portfolio-me\apps\web\components\` (e.g. `hero-showcase.jsx`) per [research.md](./research.md) with `prefers-reduced-motion` static fallback.
- [x] T017 [P] [US1] Extend `D:\personal\portfolio-me\apps\web\content\site-profile.json` with any new hero fields (taglines, subcopy, CTA labels) required by the hero component.
- [x] T018 [US1] Wire primary and secondary CTAs on `D:\personal\portfolio-me\apps\web\app\page.jsx` exclusively through `D:\personal\portfolio-me\apps\web\lib\constants\routes.js` constants for demos, projects, resume, about, contact (SC-001).

**Checkpoint**: Home matches US1 acceptance scenarios; keyboard focus order still correct with shell.

---

## Phase 5: User Story 2 — Credibility through live demos (Priority: P1)

**Goal**: FR-002–FR-004, FR-017; SC-003; ≥4 demos with primary task under two minutes.

**Independent Test**: From `/demos`, open each shipped slug; complete primary interaction; no account prompt; observe loading states.

- [x] T019 [US2] Update `D:\personal\portfolio-me\apps\web\content\demos.json` so at least four demos include accurate duration, device hints, and slug entries aligned with `D:\personal\portfolio-me\portfolio-me\specs\002-portfolio-showcase\demo-shortlist.md`.
- [x] T020 [P] [US2] Add skeleton or loading placeholders to `D:\personal\portfolio-me\apps\web\app\demos\page.jsx` cards per `D:\personal\portfolio-me\portfolio-me\specs\002-portfolio-showcase\contracts\demo-delivery.md`.
- [x] T021 [P] [US2] Verify `D:\personal\portfolio-me\apps\web\components\demo-launcher.jsx` and `D:\personal\portfolio-me\apps\web\components\demo-error-boundary.jsx` wrap every heavy demo route listed in `demos.json`.
- [x] T022 [US2] Implement one new high-flair demo under `D:\personal\portfolio-me\apps\web\app\demos\<new-slug>\page.jsx` per demo-shortlist and register it in `D:\personal\portfolio-me\apps\web\content\demos.json`.
- [x] T023 [P] [US2] Polish primary flows for existing demos under `D:\personal\portfolio-me\apps\web\app\demos\ar-overlay\`, `D:\personal\portfolio-me\apps\web\app\demos\creative-sketch\`, `D:\personal\portfolio-me\apps\web\app\demos\three-showcase\`, and `D:\personal\portfolio-me\apps\web\app\demos\vr-room\` (default state, controls, unmount cleanup).

**Checkpoint**: SC-003 satisfied (four demos, each completable quickly); demo isolation holds on thrown errors.

---

## Phase 6: User Story 3 — Depth beyond code (Priority: P2)

**Goal**: FR-005–FR-008, FR-012; projects, life grid, blog categories, achievements polish, resume structure.

**Independent Test**: Visit projects detail, adventures grid, blog index, achievements, resume; categories are clear; badge fallbacks work.

- [x] T024 [P] [US3] Author `D:\personal\portfolio-me\apps\web\content\resume.json` and render full resume layout in `D:\personal\portfolio-me\apps\web\app\resume\page.jsx` using `resume` loader (experience, education, four skill groups).
- [x] T025 [US3] Add optional `D:\personal\portfolio-me\apps\web\content\achievements-meta.json` and enhance `D:\personal\portfolio-me\apps\web\app\achievements\page.jsx` with titles and milestone section using `D:\personal\portfolio-me\apps\web\content\highlights.json` if present.
- [x] T026 [P] [US3] Refine `D:\personal\portfolio-me\apps\web\app\adventures\page.jsx` to gallery/card grid with required `alt` text and spacing per FR-006 and `PRODUCT.md` / `DESIGN.md`.
- [x] T027 [P] [US3] Surface blog categories (tech, life, health, hobbies) on `D:\personal\portfolio-me\apps\web\app\blog\page.jsx` and ensure `D:\personal\portfolio-me\apps\web\app\blog\[slug]\page.jsx` shows category chips.
- [x] T028 [US3] Review `D:\personal\portfolio-me\apps\web\app\projects\[slug]\page.jsx` and project content under `D:\personal\portfolio-me\apps\web\content\projects\` for role, scope, and outcomes fields per FR-005.

**Checkpoint**: US3 acceptance scenarios pass for projects, life grid, achievements listing.

---

## Phase 7: User Story 4 — Engagement, mentoring, outreach (Priority: P2)

**Goal**: FR-009, FR-010, FR-013; games, mentoring + testimonials + calendar embed, contact feedback.

**Independent Test**: Play one game round; mentoring shows 1:1 vs group + booking + embed + testimonial; contact shows success or error guidance.

- [x] T029 [P] [US4] Author first game JSON under `D:\personal\portfolio-me\apps\web\content\games\` (e.g. `two-truths.json`) per `games-content.md`.
- [x] T030 [US4] Implement client-only game UI in `D:\personal\portfolio-me\apps\web\app\games\[gameId]\page.jsx` (or shared `D:\personal\portfolio-me\apps\web\components\games\`) reading `games` loader; no visitor PII persistence.
- [x] T031 [US4] Author `D:\personal\portfolio-me\apps\web\content\mentoring.json` and update `D:\personal\portfolio-me\apps\web\app\mentoring\page.jsx` with session types, Google Calendar embed, booking CTAs, and testimonials strip per FR-010.
- [x] T032 [P] [US4] Harden `D:\personal\portfolio-me\apps\web\app\contact\page.jsx` for explicit success, validation, and configuration-missing messages (mailto or form provider).
- [x] T033 [P] [US4] Align `D:\personal\portfolio-me\apps\web\app\links\page.jsx` and `D:\personal\portfolio-me\apps\web\app\about\page.jsx` copy with outreach goals (FR-011, FR-014).

**Checkpoint**: US4 acceptance scenarios satisfied; games respect reduced motion where applicable.

---

## Phase 8: Polish and cross-cutting

**Purpose**: SEO, motion pass, deploy smoke; FR-004 polish across sections.

- [ ] T034 [P] Export unique `metadata` in `D:\personal\portfolio-me\apps\web\app\resume\page.jsx`, `D:\personal\portfolio-me\apps\web\app\achievements\page.jsx`, `D:\personal\portfolio-me\apps\web\app\games\page.jsx`, `D:\personal\portfolio-me\apps\web\app\mobile\page.jsx`, and nested game routes.
- [ ] T035 Run validation steps in `D:\personal\portfolio-me\portfolio-me\specs\002-portfolio-showcase\quickstart.md` locally and on Netlify preview for SC-002 and navigation smoke.
- [ ] T036 [P] Pass `prefers-reduced-motion` audit for new hero, games, and demo entry animations; adjust `D:\personal\portfolio-me\apps\web\app\globals.css` or component classes as needed.

---

## Dependencies and execution order

### Phase dependencies

- **Phase 1** → no prerequisites.
- **Phase 2** → after Phase 1 (shortlist informs loaders only loosely; T002 can finish before T007).
- **Phase 3 (US5)** → depends on Phase 2 (`routes.js`, loaders for achievements hub).
- **Phase 4 (US1)** → depends on Phase 3 for correct nav targets (can stub routes earlier, but acceptance needs T013).
- **Phase 5 (US2)** → can start after Phase 2; full polish benefits from Phase 3 nav to `/demos`.
- **Phase 6 (US3)** → depends on Phase 2 loaders and Phase 3 routes for resume/achievements pages.
- **Phase 7 (US4)** → depends on Phase 2 games/mentoring loaders and Phase 3 routes.
- **Phase 8** → after all targeted user stories for this release are done.

### User story dependencies

| Story | Depends on | Notes |
|-------|------------|--------|
| US5 | Phase 2 | IA and stubs. |
| US1 | US5 (nav), Phase 2 | Hero CTAs use routes. |
| US2 | Phase 2 | Demos registry; nav optional for test but required for spec journeys. |
| US3 | Phase 2, US5 routes | Content pages. |
| US4 | Phase 2, US5 routes | Games and mentoring pages. |

### Parallel opportunities

- **Phase 1**: T002 [P] after T001 context read (different files).
- **Phase 2**: T004, T005, T006 [P] together; T007–T008 sequential after schemas if loaders import schemas.
- **Phase 3**: T010, T011, T012 [P] together after T009 or in parallel if no shared component conflicts.
- **Phase 5**: T020, T021, T023 [P] together; T022 coordinates `demos.json`.
- **Phase 6**: T024, T026, T027 [P] together.
- **Phase 7**: T029, T032, T033 [P] together early; T030–T031 use game and mentoring content.

### Parallel example: Phase 3 (US5)

```text
Parallel: T010 achievements page, T011 games hub + dynamic route, T012 mobile page (distinct files).
Then: T013 header (depends on routes.js from Phase 2) and T014 footer.
```

---

## Implementation strategy

### MVP slice (orientation + map)

1. Complete Phase 1–2.  
2. Complete Phase 3 (US5) + Phase 4 (US1).  
3. STOP and validate SC-001 / SC-002 for navigation and hero.  
4. Continue Phase 5 (US2) for demo credibility.

### Incremental delivery

1. Setup + Foundational → stable constants and loaders.  
2. US5 → full route map.  
3. US1 → hero experience.  
4. US2 → demos meet SC-003.  
5. US3 → resume and depth content.  
6. US4 → games and mentoring funnel.  
7. Polish → SEO and motion.

### Task counts

| Scope | Count |
|-------|-------|
| Phase 1 Setup | 2 |
| Phase 2 Foundational | 6 |
| Phase 3 US5 | 7 |
| Phase 4 US1 | 3 |
| Phase 5 US2 | 5 |
| Phase 6 US3 | 5 |
| Phase 7 US4 | 5 |
| Phase 8 Polish | 3 |
| **Total** | **36** |

---

## Notes

- Every implementation task names at least one absolute path under `D:\personal\portfolio-me\apps\web\` or the spec directory.  
- Keep demos behind existing feature flags in `D:\personal\portfolio-me\apps\web\lib\config\feature-flags.ts` when adding heavy bundles.  
- Prefer small, toggleable components per constitution (`small-componenets`).
