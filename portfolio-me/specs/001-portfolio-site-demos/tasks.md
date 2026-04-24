# Tasks: Personal portfolio and live demonstration hub

**Input**: Design documents from `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md  

**Tests**: Omitted (not requested in spec); add Playwright smoke tasks in Polish phase as optional hardening per plan.

**Organization**: Phases follow spec user-story priorities (US1 = P1 … US4 = P4), after shared setup and foundation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallel-safe (different files, no ordering dependency on incomplete sibling tasks in the same group).
- **[USn]**: Maps to `spec.md` user story n (US1 = P1 hiring path, US2 = P2 credibility content, US3 = P3 web demos, US4 = P4 mobile demo).

## Path conventions (this repo)

- Application root: `D:\personal\portfolio-me`
- Web app after migration: `D:\personal\portfolio-me\apps\web\`
- Mobile app: `D:\personal\portfolio-me\apps\mobile\`
- Specs (no runtime code): `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: npm workspaces, `apps/web` host for Next.js, Netlify-aware layout per `plan.md` / `research.md`.

- [ ] T001 Add npm `workspaces` (`apps/*`, `packages/*`) and private root metadata in `D:\personal\portfolio-me\package.json`
- [ ] T002 [P] Create `D:\personal\portfolio-me\apps\web\package.json` extending workspace (name, scripts: dev, build, lint)
- [ ] T003 [P] Create shared `D:\personal\portfolio-me\packages\tsconfig\package.json` and `D:\personal\portfolio-me\packages\tsconfig\base.json` for `extends` from `apps/web`
- [ ] T004 Move existing Next `app/`, `components/`, `public/`, `next.config.*`, `postcss.config.*`, `eslint.config.*`, `jsconfig.json`/`tsconfig.json` from `D:\personal\portfolio-me\` into `D:\personal\portfolio-me\apps\web\` and fix relative imports
- [ ] T005 Update Netlify configuration (`D:\personal\portfolio-me\netlify.toml` or dashboard doc in `D:\personal\portfolio-me\README.md`) so build runs from `apps/web` with correct publish directory
- [ ] T006 [P] Add root orchestration scripts (`dev`, `build`, `lint`) in `D:\personal\portfolio-me\package.json` targeting workspace `apps/web`
- [ ] T007 [P] Update `D:\personal\portfolio-me\README.md` with workspace install, dev URL, and Netlify base-directory notes
- [ ] T008 Align `D:\personal\portfolio-me\apps\web\next.config.js` with static/Netlify deployment assumptions from plan (no server DB features)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Content pipeline, routing constants, shell components, and error isolation before user-story pages.

**⚠️ CRITICAL**: No user story phase work until this checkpoint passes.

- [ ] T009 Create editorial folders `D:\personal\portfolio-me\apps\web\content\` with subfolders `projects\`, `blog\`, and file `D:\personal\portfolio-me\apps\web\content\site-profile.json` (stub)
- [ ] T010 [P] Implement Zod schemas under `D:\personal\portfolio-me\apps\web\lib\content\schemas\` for `SiteProfile`, `Project`, `Article`, `DemoExperience` per `data-model.md`
- [ ] T011 [P] Implement build-time loaders under `D:\personal\portfolio-me\apps\web\lib\content\load\` (read JSON/MDX, validate with schemas from T010)
- [ ] T012 Add env-driven feature flags in `D:\personal\portfolio-me\apps\web\lib\config\feature-flags.ts` for demo families (immersive, augmented, three_d, creative)
- [ ] T013 Refactor root layout in `D:\personal\portfolio-me\apps\web\app\layout.jsx` for skip-link, default metadata, and shell-wide providers only (no demo-heavy imports)
- [ ] T014 [P] Extend `D:\personal\portfolio-me\apps\web\app\globals.css` with CSS variables / Tailwind tokens mirroring `D:\personal\portfolio-me\poc\index.html` palette intent
- [ ] T015 Implement `D:\personal\portfolio-me\apps\web\components\site-header.jsx` with nav items from `contracts\public-site-ia.md` (href placeholders allowed until pages exist)
- [ ] T016 [P] Implement `D:\personal\portfolio-me\apps\web\components\site-footer.jsx` with secondary links and colophon
- [ ] T017 Add canonical route constants in `D:\personal\portfolio-me\apps\web\lib\constants\routes.ts` (no magic path strings in components)
- [ ] T018 Add marketing-shell error UI in `D:\personal\portfolio-me\apps\web\app\error.jsx` (and optional `D:\personal\portfolio-me\apps\web\app\not-found.jsx`) without impacting demo routes

**Checkpoint**: `npm run dev` from workspace root serves shell with header/footer and loads stub content without errors.

---

## Phase 3: User Story 1 — Understand who you are and how to hire you (Priority: P1)

**Goal**: Clear roles, value proposition, and hiring pathways within 90 seconds (SC-001).

**Independent Test**: First-time visitor reaches contact or external hiring link from hero without opening projects or demos.

### Implementation for User Story 1

- [ ] T019 [US1] Replace starter home with portfolio hero in `D:\personal\portfolio-me\apps\web\app\page.jsx` using `content/site-profile.json` (roles, tagline, CTAs) per FR-001
- [ ] T020 [P] [US1] Fill real copy in `D:\personal\portfolio-me\apps\web\content\site-profile.json` (roles array, social keys, SEO fields)
- [ ] T021 [US1] Implement hiring/contact page `D:\personal\portfolio-me\apps\web\app\contact\page.jsx` with mailto, calendar, and outbound profile links per FR-006
- [ ] T022 [P] [US1] Implement `D:\personal\portfolio-me\apps\web\app\links\page.jsx` listing outbound professional links
- [ ] T023 [US1] Wire `D:\personal\portfolio-me\apps\web\components\site-header.jsx` active states and CTA button to `routes.ts` entries for `/`, `/contact`, `/demos`
- [ ] T024 [US1] Verify keyboard focus order and visible focus styles across header, main, and footer in `D:\personal\portfolio-me\apps\web\app\layout.jsx` and `D:\personal\portfolio-me\apps\web\app\page.jsx` per US1 acceptance scenario 3
- [ ] T025 [P] [US1] Export route-level `metadata` in `D:\personal\portfolio-me\apps\web\app\page.jsx` and `D:\personal\portfolio-me\apps\web\app\contact\page.jsx` per `contracts\public-site-ia.md` SEO contract
- [ ] T026 [US1] Extract reusable primary CTA component `D:\personal\portfolio-me\apps\web\components\cta-hire.jsx` used by hero and nav

**Checkpoint**: US1 manual walkthrough passes without visiting `/projects` or `/demos/*`.

---

## Phase 4: User Story 2 — Explore credibility through projects, writing, and life context (Priority: P2)

**Goal**: Projects, about, mentoring, interests, blog, adventures/gallery, achievements (FR-002–FR-006).

**Independent Test**: Visitor reviews depth content without launching demos.

### Implementation for User Story 2

- [ ] T027 [US2] Implement projects index `D:\personal\portfolio-me\apps\web\app\projects\page.jsx` consuming validated project list from `content/projects/*`
- [ ] T028 [P] [US2] Implement project detail `D:\personal\portfolio-me\apps\web\app\projects\[slug]\page.jsx` with `generateStaticParams` from loader
- [ ] T029 [P] [US2] Seed at least two projects as `D:\personal\portfolio-me\apps\web\content\projects\*.mdx` (or `.json`) with frontmatter per `data-model.md`
- [ ] T030 [US2] Implement `D:\personal\portfolio-me\apps\web\app\about\page.jsx` with profile narrative and optional highlights strip
- [ ] T031 [P] [US2] Implement `D:\personal\portfolio-me\apps\web\app\mentoring\page.jsx` for instruction/teaching positioning
- [ ] T032 [P] [US2] Implement `D:\personal\portfolio-me\apps\web\app\interests\page.jsx` for hobbies content
- [ ] T033 [US2] Implement blog list `D:\personal\portfolio-me\apps\web\app\blog\page.jsx` and post reader `D:\personal\portfolio-me\apps\web\app\blog\[slug]\page.jsx` using MDX pipeline chosen in `research.md`
- [ ] T034 [P] [US2] Seed sample posts under `D:\personal\portfolio-me\apps\web\content\blog\*.mdx` with title, date, author frontmatter
- [ ] T035 [US2] Implement adventures/gallery `D:\personal\portfolio-me\apps\web\app\adventures\page.jsx` rendering `MediaAsset` lists with required `alt` text
- [ ] T036 [P] [US2] Add `D:\personal\portfolio-me\apps\web\content\highlights.json` and render achievements on `D:\personal\portfolio-me\apps\web\app\about\page.jsx` or dedicated section component `D:\personal\portfolio-me\apps\web\components\highlights-list.jsx`
- [ ] T037 [US2] Add `D:\personal\portfolio-me\apps\web\components\content-empty-state.jsx` and use on `D:\personal\portfolio-me\apps\web\app\projects\page.jsx` and `D:\personal\portfolio-me\apps\web\app\blog\page.jsx` when lists empty
- [ ] T038 [P] [US2] Standardize imagery via `next/image` in `D:\personal\portfolio-me\apps\web\app\projects\page.jsx` and `D:\personal\portfolio-me\apps\web\app\adventures\page.jsx` sourcing files under `D:\personal\portfolio-me\apps\web\public\media\`

**Checkpoint**: All IA routes from `contracts\public-site-ia.md` except demos resolve with real or placeholder copy; two-click navigation smoke passes for marketing sections.

---

## Phase 5: User Story 3 — Launch polished web-first live demos (Priority: P3)

**Goal**: Demo hub plus isolated client demos (creative, three.js, AR.js, A-Frame) with graceful failure (FR-007–FR-012, SC-003, SC-006).

**Independent Test**: Each `/demos/[slug]` runs without server persistence and survives demo throw without breaking shell.

### Implementation for User Story 3

- [ ] T039 [US3] Add demos segment layout `D:\personal\portfolio-me\apps\web\app\demos\layout.jsx` (lightweight wrapper; no heavy imports)
- [ ] T040 [US3] Implement hub page `D:\personal\portfolio-me\apps\web\app\demos\page.jsx` listing demos from `D:\personal\portfolio-me\apps\web\content\demos.json` with device and duration hints
- [ ] T041 [P] [US3] Author `D:\personal\portfolio-me\apps\web\content\demos.json` registry rows matching `DemoExperience` fields in `data-model.md`
- [ ] T042 [US3] Create `D:\personal\portfolio-me\apps\web\components\demo-error-boundary.jsx` implementing per-demo isolation per `contracts\demo-module-interface.md`
- [ ] T043 [US3] Create `D:\personal\portfolio-me\apps\web\components\demo-launcher.jsx` using `next/dynamic` with `ssr: false` and explicit “Start” for heavy bundles
- [ ] T044 [US3] Ship minimal `D:\personal\portfolio-me\apps\web\app\demos\hello\page.jsx` hello-world client demo to validate launcher pipeline
- [ ] T045 [P] [US3] Implement creative demo `D:\personal\portfolio-me\apps\web\app\demos\creative-sketch\page.jsx` with p5 instance mode and cleanup on unmount per contract
- [ ] T046 [P] [US3] Implement three.js demo `D:\personal\portfolio-me\apps\web\app\demos\three-showcase\page.jsx` with renderer dispose on unmount and WebGL unsupported messaging
- [ ] T047 [P] [US3] Implement AR demo `D:\personal\portfolio-me\apps\web\app\demos\ar-overlay\page.jsx` with AR.js and camera-permission denied UX copy
- [ ] T048 [US3] Implement A-Frame demo `D:\personal\portfolio-me\apps\web\app\demos\vr-room\page.jsx` with enter-VR prompts and WebXR unsupported fallback
- [ ] T049 [US3] Wire `D:\personal\portfolio-me\apps\web\lib\config\feature-flags.ts` to hide or show demo slugs in `D:\personal\portfolio-me\apps\web\app\demos\page.jsx` and document vars in `D:\personal\portfolio-me\apps\web\.env.example`

**Checkpoint**: Each demo category has a happy path under five minutes on reference devices; turning off a flag removes demo without build failure.

---

## Phase 6: User Story 4 — Experience mobile-oriented demos (Priority: P4)

**Goal**: Expo/React Native handheld showcase with touch-first flagship demo and link-out from web (FR-011).

**Independent Test**: Install or Expo Go open app, run flagship demo, no account or API persistence.

### Implementation for User Story 4

- [ ] T050 [US4] Scaffold Expo project files `D:\personal\portfolio-me\apps\mobile\package.json`, `D:\personal\portfolio-me\apps\mobile\app.json`, `D:\personal\portfolio-me\apps\mobile\tsconfig.json` in workspace
- [ ] T051 [US4] Implement entry `D:\personal\portfolio-me\apps\mobile\App.tsx` with React Navigation (or Expo Router) shell and home screen linking to demo
- [ ] T052 [US4] Implement flagship demo screen `D:\personal\portfolio-me\apps\mobile\src\screens\FlagshipDemoScreen.tsx` (UI-only state, 60fps target, readable at 360px width)
- [ ] T053 [P] [US4] Configure deep-link scheme in `D:\personal\portfolio-me\apps\mobile\app.json` aligned with slug naming in `D:\personal\portfolio-me\apps\web\content\demos.json`
- [ ] T054 [US4] Update `D:\personal\portfolio-me\apps\web\app\demos\page.jsx` (or `D:\personal\portfolio-me\apps\web\components\mobile-demo-callout.jsx`) with instructions / QR / store-less Expo Go path for the mobile demo

**Checkpoint**: Web hub references mobile demo; `npx expo start` from `apps/mobile` runs flagship flow.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Motion, a11y automation, docs, and release readiness (SC-004–SC-006, Sprint 10–11).

- [ ] T055 [P] Apply `prefers-reduced-motion` friendly shell transitions in `D:\personal\portfolio-me\apps\web\app\globals.css` and audit demo motion disclaimers in `D:\personal\portfolio-me\apps\web\app\demos\page.jsx`
- [ ] T056 [P] Add Playwright dependency and `D:\personal\portfolio-me\apps\web\playwright.config.ts` plus `D:\personal\portfolio-me\apps\web\e2e\shell.spec.ts` covering `/`, `/contact`, `/projects`, `/demos` smoke
- [ ] T057 Optimize static assets: compress hero media in `D:\personal\portfolio-me\apps\web\public\media\` and verify LCP target on `D:\personal\portfolio-me\apps\web\app\page.jsx`
- [ ] T058 Run ESLint from root across `D:\personal\portfolio-me\apps\web\` and fix regressions introduced by migration
- [ ] T059 Sync `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\quickstart.md` with final scripts and paths after T001–T008 land
- [ ] T060 Final pass on `D:\personal\portfolio-me\README.md` and Netlify env vars; confirm `D:\personal\portfolio-me\poc\index.html` remains reference-only

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No upstream deps; T004 depends on T001–T003 scaffolding existing.
- **Phase 2 (Foundational)**: Depends on Phase 1 (workspace resolves `apps/web`).
- **Phase 3 (US1)**: Depends on Phase 2 (T015 header, T017 routes, T009 content).
- **Phase 4 (US2)**: Depends on Phase 2; soft dependency on US1 for real nav polish (can stub links until T023).
- **Phase 5 (US3)**: Depends on Phase 2 (feature flags, error patterns); independent of US2 content volume.
- **Phase 6 (US4)**: Depends on Phase 1; soft dependency on T041 for consistent slugs with web hub (T054 after T040–T041).
- **Phase 7 (Polish)**: Depends on phases targeted for release (minimum US1–US3 for web launch; include US4 if mobile ships).

### User Story Dependencies

- **US1**: Independent after Foundation.
- **US2**: Independent after Foundation; best after US1 for production nav order (optional sequencing).
- **US3**: Independent after Foundation; can parallelize demo implementations T045–T048 after T042–T044.
- **US4**: Independent after Phase 1 workspace; connect to web after T040–T041.

### Within User Story 3

- T042 → T043 → T044 (pipeline) before T045–T048 parallel demo implementations.
- T049 last in US3 to wire flags across registry.

### Parallel Opportunities

- **Phase 1**: T002, T003, T006, T007 in parallel after T001; T004 serial after scaffold.
- **Phase 2**: T010, T011, T014, T016 in parallel after T009; T012 parallel with schemas once paths agreed.
- **US2**: T028–T029 pair; T031–T032 parallel; T034 parallel with T033 once loader ready; T036–T038 parallel late in US2.
- **US3**: T045, T046, T047 parallel after T044; T048 can parallelize with T045–T047 if separate files and no shared global singletons.
- **US4**: T053 parallel with T052 once `app.json` exists.
- **Polish**: T055, T056, T057 parallel.

### Parallel Example: User Story 3 (after T044)

```text
Parallel batch: T045 in apps/web/app/demos/creative-sketch/page.jsx
               T046 in apps/web/app/demos/three-showcase/page.jsx
               T047 in apps/web/app/demos/ar-overlay/page.jsx
Serial finish: T048 (vr-room), then T049 feature-flag wiring
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1 (T001–T008) and Phase 2 (T009–T018).
2. Complete Phase 3 (T019–T026).
3. **Stop and validate** SC-001 manually; deploy marketing shell only.

### Incremental delivery

1. Add Phase 4 (US2) → static credibility site.
2. Add Phase 5 (US3) → demo differentiation.
3. Add Phase 6 (US4) → mobile hiring signal.
4. Phase 7 before public launch.

### Parallel team split (optional)

- Developer A: US1 then US2 content.
- Developer B: Foundation loaders + US3 demo hub early (T039–T044), then demos.
- Developer C: US4 mobile once T001–T002 complete.

---

## Task counts

| Scope | Count |
|-------|------:|
| Phase 1 Setup | 8 |
| Phase 2 Foundational | 10 |
| Phase 3 US1 | 8 |
| Phase 4 US2 | 12 |
| Phase 5 US3 | 11 |
| Phase 6 US4 | 5 |
| Phase 7 Polish | 6 |
| **Total** | **60** |

## Format validation

- All 60 lines use `- [ ]`, sequential `T001`–`T060`, and **file paths** in descriptions.
- `[P]` only where parallel-safe; `[US1]`–`[US4]` only on user-story phases; Setup (1–2) and Polish (7) omit story labels per rules.

## Notes

- If migration (T004) is too large for one change set, split into sub-PRs: (a) copy tree to `apps/web`, (b) fix imports, (c) delete old root duplicates—still satisfy T004 acceptance before Phase 2.
- Remove or archive starter Netlify demo routes under `D:\personal\portfolio-me\apps\web\app\blobs\` etc., when portfolio routes replace them, to avoid duplicate IA noise.
