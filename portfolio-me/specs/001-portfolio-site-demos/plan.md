# Implementation Plan: Personal portfolio and live demonstration hub

**Branch**: `001-portfolio-site-demos` | **Date**: 2026-04-24 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\spec.md`  
**Repository application code (current)**: `D:\personal\portfolio-me` (Next.js app + `poc\index.html` reference)

**Note**: This file is the living implementation plan; keep it aligned with `/speckit.tasks` and constitution updates.

## Summary

Deliver a hiring-focused **Next.js** portfolio hosted on **Netlify** that migrates the narrative, sections, and visual intent of `D:\personal\portfolio-me\poc\index.html` into a modular app shell with **toggleable demo surfaces**. Add **client-only interactive demos** (immersive, AR, 3D WebGL-style, creative coding) and a **separate mobile showcase app** (React Native / Expo-style workflow) that need **no database or auth**, per constitution. Work is sequenced in **phases** with **sprints** sized for independent shippable slices; **boundaries** below prevent scope creep (no CMS backend, no persisted visitor state on server).

## Technical Context

**Language/Version**: TypeScript (strict), Node.js LTS matching Next 16; React 19 as already in repo  
**Primary Dependencies**: Next.js (App Router), React, Tailwind CSS v4 (present); demo stacks per research: A-Frame, AR.js, three (r3f optional), p5 (react-p5-wrapper or instance mode), Expo SDK for mobile demo app  
**Storage**: None for visitor data; editorial content as **git-tracked files** (MDX/JSON + images under `public/` or `content/`)  
**Testing**: ESLint; Playwright (or Cypress) for portfolio shell smoke + a11y checks on key routes; manual/device matrices for XR and camera demos; Jest/Vitest only where pure logic warrants  
**Target Platform**: Modern evergreen browsers + Netlify edge; WebXR/WebGL subset for demos; iOS/Android for mobile demo app  
**Project Type**: Web application (primary) + auxiliary mobile app package in same monorepo (npm workspaces)  
**Performance Goals**: Portfolio shell: meet agreed automated quality baselines (see spec SC-004); demos: stable frame budget on reference devices (documented in `research.md`)  
**Constraints**: No DB, no auth (constitution); demos isolated so failure does not blank the site (FR-012); reduced-motion respected on shell; minimal permissions for AR/camera  
**Scale/Scope**: Single owner, low traffic, high visual impact; ~8–10 primary marketing sections + 4 web demo categories + 1 mobile demo flagship

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle / rule | Status | Evidence in this plan |
|------------------|--------|------------------------|
| Ask if not sure | Pass | Open choices resolved in `research.md` (workspaces, content format, demo packaging) |
| Small, detachable, flaggable features | Pass | Demo routes behind lazy boundaries + env or config flags per demo family; mobile app optional install |
| Change requests preserve self-contained components | Pass | Feature folders per demo + shared `packages/ui` only for true primitives |
| Design before implement | Pass | This plan + `contracts/` + `data-model.md` precede coding |
| Impeccable-style UI polish | Pass | Dedicated polish sprint; reference `D:\personal\portfolio-me\.claude\skills\impeccable\SKILL.md` during UI work |
| Next.js + Netlify + NPM, no DB, no auth | Pass | Technical Context and boundaries enforce |
| Governance: specs in context, KISS, readable names | Pass | Artifacts under `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\`; avoid deep abstraction |

**Post–Phase 1 re-check**: Data and contracts are file-based only; no sneaking in server persistence—**Pass**.

## Roadmap: Phases and sprints

Phases are **ordering and dependency gates**; sprints are **timeboxed slices** (assume 1–2 week sprints—adjust to your cadence). Each sprint ends with something **demoable** to stakeholders.

### Phase 0 — Alignment and foundations (complete when `research.md` is accepted)

| Sprint | Goal | Exit criteria |
|--------|------|----------------|
| **Sprint 0** | Lock boundaries, repo layout, content strategy | `research.md` signed off; no open NEEDS CLARIFICATION |

### Phase 1 — Shell and content (maps to spec P1 + P2)

| Sprint | Goal | Exit criteria |
|--------|------|----------------|
| **Sprint 1** | **App boundary**: npm workspaces at `D:\personal\portfolio-me`; `apps/web` hosts Next portfolio (migrate from flat root in follow-on PR or keep root as `apps/web`—see `research.md`); shared `packages/config` or `packages/typescript-config` | `pnpm`/`npm i` works from root; `dev` runs web app; Netlify build path documented |
| **Sprint 2** | **P1 Hiring path**: global layout, nav, hero, contact/links, keyboard focus order | SC-001 walkthrough succeeds in manual test script |
| **Sprint 3** | **P2 Credibility**: projects, about, mentoring, interests, blog MDX, achievements/adventures/gallery sections | All FR-002–FR-006 covered with static content; empty states designed |

### Phase 2 — Demo platform (maps to spec P3)

| Sprint | Goal | Exit criteria |
|--------|------|----------------|
| **Sprint 4** | **Demo hub**: index of demos with expectations (device, duration); lazy `next/dynamic` + error boundaries; loading skeletons | FR-007, FR-012 verified; one “hello demo” (smallest bundle) ships |
| **Sprint 5** | **Creative coding** demo (P5.js pattern) | Happy path ≤ 5 min; degradation message on WebGL off (where applicable) |
| **Sprint 6** | **Three.js / WebGL** interactive demo | Same + performance spot-check on reference laptop |
| **Sprint 7** | **AR.js** camera demo + permission UX | Denied camera shows actionable copy; granted shows experience |
| **Sprint 8** | **A-Frame** VR-style demo + onboarding copy | Unsupported XR shows fallback per edge cases |

### Phase 3 — Mobile showcase (maps to spec P4)

| Sprint | Goal | Exit criteria |
|--------|------|----------------|
| **Sprint 9** | **Mobile app package**: Expo RN project under `apps/mobile`; one flagship touch-first demo; deep link / QR from web | FR-011 satisfied for one demo; touch targets and readability at 360px |

### Phase 4 — Hardening and launch

| Sprint | Goal | Exit criteria |
|--------|------|----------------|
| **Sprint 10** | **Polish**: motion audit, reduced motion, image optimization, automated checks on shell | SC-004/SC-005/SC-006 addressed per checklist |
| **Sprint 11** | **Release**: Netlify production cutover, README, `quickstart.md` verified by fresh clone | Production URL live; runbook complete |

## Scope boundaries

### In scope

- Next.js portfolio matching POC **information architecture** unless intentionally changed.
- Static, author-controlled content (posts, projects, images).
- Client-side demos only; ephemeral UI state; optional `localStorage` for trivial UI prefs only if privacy-safe and documented.
- One React Native (Expo) **showcase** app with non-persistent demo flows.
- Netlify deployment for web; documented path for mobile (EAS or local build).

### Out of scope (explicit)

- User accounts, login, roles, or **any** server-side database for portfolio or demos.
- Headless CMS with editorial workflows, webhooks, or paid content tiers.
- Multi-tenant or team collaboration features.
- Production game monetization, IAP, or anti-cheat.
- Full app-store compliance narrative (privacy nutrition labels, etc.) beyond reasonable defaults—track as future hardening if you ship publicly to stores.

### Repository and package boundaries

| Area | Owns | Must not own |
|------|------|----------------|
| `apps/web` (or repo-root Next during migration) | Routing, layout, content loading, demo **entry** routes, marketing pages | Native mobile UI |
| `apps/mobile` | Touch demos, mobile-specific assets | Blog authoring or SSR for marketing site |
| `packages/*` | Shared tokens, TypeScript types, headless small UI primitives | Demo-specific WebGL/XR scenes |
| `portfolio-me/specs/...` | Spec, plan, research, tasks | Application runtime code |

### Integration boundaries (web ↔ demos)

- Demos **do not** import server actions that persist data.
- Cross-origin iframes only if strictly needed; prefer first-party routes under `/demos/*` for SEO and trust.
- Each demo fails in isolation; no shared global mutable singletons across demos without cleanup on route leave.

## Project Structure

### Documentation (this feature)

```text
portfolio-me/specs/001-portfolio-site-demos/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── public-site-ia.md
│   └── demo-module-interface.md
├── spec.md
├── checklists/
└── tasks.md              # produced by /speckit.tasks
```

### Source code (target layout at `D:\personal\portfolio-me`)

```text
D:\personal\portfolio-me\
├── package.json                    # workspaces: "apps/*", "packages/*"
├── apps/
│   ├── web/                        # Next.js portfolio (migrate from root incrementally)
│   │   ├── app/
│   │   ├── components/
│   │   ├── content/                # MDX/MD or JSON content
│   │   └── public/
│   └── mobile/                     # Expo (React Native) demo shell
├── packages/
│   ├── eslint-config/              # optional shared lint
│   └── tsconfig/                   # optional shared TS bases
├── poc/
│   └── index.html                  # visual reference; not runtime dependency
└── portfolio-me/                   # specify kit + specs (no duplicate Next app required here)
    └── .specify/
```

**Structure Decision**: Use **npm workspaces** at `D:\personal\portfolio-me` so the constitution-mandated Next + Netlify web app and the React Native demo coexist with clear package boundaries. Until migration completes, the existing root Next app may remain the default `apps/web` target folder in a **single PR** that moves files—see `research.md` for the preferred migration slice order.

## Complexity Tracking

> Fill only if constitution violations need justification.

| Violation | Why needed | Simpler alternative rejected because |
|-----------|------------|--------------------------------------|
| Multiple deployables (web + mobile) | Spec FR-011 requires handheld-first demo beyond responsive web | Responsive web alone does not satisfy “installable / native shell” intent for hiring signal |

## Generated artifacts (this command)

| Artifact | Path |
|----------|------|
| Plan | `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\plan.md` |
| Research | `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\research.md` |
| Data model | `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\data-model.md` |
| Quickstart | `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\quickstart.md` |
| Contracts | `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\contracts\` |

**Agent context script**: `update-agent-context.ps1` is **not present** under `D:\personal\portfolio-me\portfolio-me\.specify\scripts\powershell\`; manual step—paste links to this plan and `spec.md` into your agent rules or Cursor context when implementing.
