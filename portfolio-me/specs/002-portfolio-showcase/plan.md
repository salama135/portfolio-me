# Implementation Plan: Portfolio showcase, demos, and site alignment

**Branch**: `002-portfolio-showcase` | **Date**: 2026-04-26 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/002-portfolio-showcase/spec.md`  
**Prerequisite context**: Completed work tracked in [../001-portfolio-site-demos/tasks.md](../001-portfolio-site-demos/tasks.md)

## Summary

Deliver a cohesive **portfolio experience** that matches spec FR-001–FR-018: polished **home hero** with intentional motion or depth; **≥4 interactive demos** that are client-only, registry-driven, and visually striking; new or aligned areas for **achievements** (Credly URL inventory), **games**, **resume**, **mentoring** (calendar embed + testimonials), **life/gallery**, **blog**, **projects**, **mobile apps**, **links**, **contact**, and **about**; global **IA and navigation** updated per contracts. Technical approach: extend the existing **Next.js** app in `apps/web`, **file-based content** + Zod loaders, **feature flags** for heavy demo families, **Netlify** static deployment, **no database and no auth** per constitution.

## Technical Context

**Language/Version**: JavaScript / TypeScript as already used in `apps/web` (Node LTS for build).  
**Primary Dependencies**: Next.js (App Router), React, existing content stack (Zod, MDX/JSON loaders per 001), Tailwind/CSS variables, optional Three.js / A-Frame / AR.js only inside demo bundles.  
**Storage**: None (static files and build-time content only).  
**Testing**: Manual smoke per acceptance; optional Playwright hardening later (not blocking this epic).  
**Target Platform**: Modern evergreen browsers; responsive mobile; degraded experience for `prefers-reduced-motion`.  
**Project Type**: Monorepo web app (`apps/web`) with optional `apps/mobile` references for showcase section.  
**Performance Goals**: Marketing routes meet comfortable LCP on 4G; demo routes defer heavy JS until user intent; hero avoids blocking main thread on first paint.  
**Constraints**: No DB, no auth; demo failures isolated; Credly source URLs may not be direct images—UI must tolerate missing thumbnails.  
**Scale/Scope**: ~15 marketing routes, ≥4 demos, JSON/MDX content growth; navigation grouping to avoid 12+ flat top-level items if needed.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| Ask if not sure | Pass | Open items resolved in [research.md](./research.md) (hero approach, IA canonical path, Credly image strategy). |
| Small / flaggable features | Pass | Demos remain behind registry + optional feature flags; new sections (games, achievements) as separate routes and content files. |
| Design before implement | Pass | This plan + contracts + data-model precede coding; align with `PRODUCT.md` / `DESIGN.md` for UI polish. |
| Impeccable style | Pass | Plan defers visual execution to those playbooks; hero and demos explicitly require intentional motion/visual hierarchy. |
| Tech stack (Next, Netlify, npm, no DB, no auth) | Pass | No persistence layer introduced; mentoring uses embeds/external URLs. |
| Specs context / governance | Pass | Plan references `001` tasks and `002` spec; IA contract versioned. |

**Post-design re-check**: Phase 1 artifacts (`research.md`, `data-model.md`, `contracts/*`, `quickstart.md`) introduce no constitution violations.

## Project Structure

### Documentation (this feature)

```text
D:\personal\portfolio-me\portfolio-me\specs\002-portfolio-showcase\
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts\
│   ├── site-information-architecture.md
│   ├── demo-delivery.md
│   ├── credly-badges-content.md
│   └── games-content.md
└── tasks.md              # Created by /speckit.tasks (not this command)
```

### Source code (repository)

```text
D:\personal\portfolio-me\
├── apps\
│   ├── web\                 # Next.js portfolio site
│   │   ├── app\             # Routes (pages, layouts)
│   │   ├── components\
│   │   ├── content\         # JSON, MDX, registries
│   │   ├── lib\             # Loaders, schemas, constants, feature flags
│   │   └── public\media\
│   └── mobile\              # React Native apps (showcase references)
├── poc\
│   └── credly-badges.json   # Badge URL inventory (authoritative list)
├── netlify.toml
├── package.json             # npm workspaces
├── PRODUCT.md
├── DESIGN.md
└── portfolio-me\specs\      # Speckit specs (this feature under 002-…)
```

**Structure decision**: Continue **001** monorepo layout; all new pages and loaders live under `apps/web` unless mobile showcase requires linking to `apps/mobile` README or deep links only.

## Phase 0: Outline and research

**Output**: [research.md](./research.md) — hero strategy, demo shortlist, Credly handling, IA decisions, games privacy, dependency on `001` tasks.

## Phase 1: Design and contracts

**Outputs**:

- [data-model.md](./data-model.md) — entities and file locations.
- [contracts/site-information-architecture.md](./contracts/site-information-architecture.md) — routes and two-click rule.
- [contracts/demo-delivery.md](./contracts/demo-delivery.md) — client-only, isolation, loading.
- [contracts/credly-badges-content.md](./contracts/credly-badges-content.md) — inventory shape and rendering rules.
- [contracts/games-content.md](./contracts/games-content.md) — ice-breaker minimum and format.
- [quickstart.md](./quickstart.md) — dev commands and content paths.

**Agent context script**: `update-agent-context.ps1` was **not found** under `D:\personal\portfolio-me\portfolio-me\.specify\scripts\`; skip automated agent file update unless added later.

## Phase 2 (handoff)

Implementation sequencing and task IDs belong in **`tasks.md`** via `/speckit.tasks` — map user stories US1–US5 from `spec.md` to concrete file edits (nav, new routes, loaders, demo polish, hero).

## Complexity Tracking

_No constitution violations requiring justification._

## Next steps

1. Run **`/speckit.tasks`** to break this plan into phased tasks.  
2. Optionally run **`/speckit.checklist`** for a QA or accessibility checklist domain.  
3. Implement starting with **IA + nav** (`site-header`, `routes.js`), then **content stubs** for new JSON files, then **demos** and **hero**.
