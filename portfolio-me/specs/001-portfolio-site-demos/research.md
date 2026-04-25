# Research: Personal portfolio and live demonstration hub

**Feature**: `001-portfolio-site-demos` | **Date**: 2026-04-24

## 1. Monorepo layout vs single package

**Decision**: Adopt **npm workspaces** at `D:\personal\portfolio-me` with `apps/web` (Next.js) and `apps/mobile` (Expo), plus optional thin `packages/*` for shared types and ESLint/TSConfig.

**Rationale**: Spec requires web portfolio plus a distinct mobile showcase (FR-011). Workspaces give clear **boundary** between deployables while keeping one clone and shared semver discipline. Constitution “small flaggable features” maps well to **per-app** and **per-route** isolation.

**Alternatives considered**:

- **Single Next.js only**: Rejected for FR-011 native-handheld signaling.
- **Polyrepo**: Rejected—duplicated content types and slower iteration for a solo maintainer.

## 2. Migrating existing Next starter vs greenfield folder

**Decision**: **Incremental migration**: introduce `apps/web`, move the current root Next project into `apps/web` in one focused change set, update Netlify `base`/`publish`/`command` to build from workspace; keep `poc/index.html` as design reference only.

**Rationale**: Root already has Next 16 + Tailwind v4 (`D:\personal\portfolio-me\package.json`); throwing away wastes working deploy wiring. Moving preserves history and reduces risk.

**Alternatives considered**:

- **Rewrite in place at repo root without workspaces**: Rejected—blocks clean `apps/mobile` boundary.

## 3. Editorial content format

**Decision**: **MDX (or Markdown + frontmatter)** colocated under `apps/web/content/` with a small Zod-validated loader at build time; images in `apps/web/public/media/`.

**Rationale**: No DB/auth; Git is source of truth; matches blog + project case studies. Zod gives testable contracts without a database.

**Alternatives considered**:

- **CMS (Sanity/Contentful)**: Rejected—violates “no DB” spirit and constitution simplicity for v1.
- **JSON-only**: Possible for projects; MDX wins for long-form posts (FR-004).

## 4. Demo embedding strategy (Next + heavy WebGL/XR)

**Decision**: Route group `app/demos/<slug>/page.tsx` with **`next/dynamic(..., { ssr: false })`** wrappers, **React error boundaries** per demo, and **intersection observer** or explicit “Launch” button to defer download. A-Frame / AR.js / three loaded only on demo routes.

**Rationale**: Keeps marketing shell lean (SC-004); satisfies FR-012 isolation; Netlify still static export compatible if demos are client-only.

**Alternatives considered**:

- **Separate Netlify sites per demo**: Higher ops burden; only revisit if bundle exceeds practical limits.

## 5. Mobile stack

**Decision**: **Expo (React Native)** managed workflow for `apps/mobile`; TypeScript; deep links to marketing site for “learn more.”

**Rationale**: Matches stakeholder direction (React Native) with fastest path to device smoke tests and optional EAS builds.

**Alternatives considered**:

- **Capacitor wrapper around web demos**: Cheaper but weaker hiring signal for “mobile engineer” narrative.

## 6. Reference devices (concrete)

**Decision** (for SC-003 / spec assumptions):

- **Web**: Windows 11 laptop with integrated GPU (e.g., recent Intel Iris); Chrome current stable.
- **Mobile web**: Android mid-tier ~2 years old, 6 GB RAM, Chrome.
- **XR**: Meta Quest browser or desktop Chrome WebXR where applicable—document “best effort” in demo cards.

**Rationale**: Turns “mid-range” into repeatable acceptance language.

## 7. Analytics and contact

**Decision**: **Plausible or Netlify analytics** (privacy-light) optional behind env flag; contact = `mailto:` + external links (LinkedIn/GitHub) v1; optional Netlify Forms later without DB.

**Rationale**: Constitution allows no auth/DB; avoids blocking portfolio on third-party form backends.

**Alternatives considered**:

- **Custom server API**: Rejected—conflicts with static-first simplicity.

## Open items for `/speckit.tasks` (not blocking plan)

- Exact Netlify `build` command after workspace extraction.
- Whether blog MDX uses `next-mdx-remote` or built-in MDX compiler—pick during Sprint 1 implementation design doc per constitution.
