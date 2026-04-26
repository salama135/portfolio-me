# Quickstart: 002 Portfolio showcase work

**Monorepo root (git)**: `D:\personal\portfolio-me`  
**Next.js app**: `D:\personal\portfolio-me\apps\web`  
**Feature spec kit root**: `D:\personal\portfolio-me\portfolio-me` (contains `.specify` and `specs/`)

## Prerequisites

- Node.js LTS and **npm** (workspace installs from repo root).
- Optional: Netlify CLI for deploy parity.

## Install and dev

```bash
cd D:\personal\portfolio-me
npm install
npm run dev
```

Open the local URL printed for `apps/web` (typically `http://localhost:3000`).

## Where to edit content

| Area | Path |
|------|------|
| Site profile / hero copy | `apps/web/content/site-profile.json` |
| Demos registry | `apps/web/content/demos.json` |
| Projects | `apps/web/content/projects/` |
| Blog | `apps/web/content/blog/` |
| Achievements (Credly embeds + manual certs) | `apps/web/content/achievements.json` (fallback: `poc/credly-badges.json`) |
| New: resume | `apps/web/content/resume.json` (to be added) |
| New: games | `apps/web/content/games/` (to be added) |
| New: mentoring + testimonials | `apps/web/content/mentoring.json` (to be added) |

## Specs and planning

- **This feature**: `D:\personal\portfolio-me\portfolio-me\specs\002-portfolio-showcase\`
- **Prior epic tasks (check first)**: `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\tasks.md`
- **Design playbooks (constitution)**: `D:\personal\portfolio-me\PRODUCT.md`, `D:\personal\portfolio-me\DESIGN.md`

## Build

```bash
cd D:\personal\portfolio-me
npm run build
```

Netlify should use `apps/web` as base directory per existing root config.

## Phase 8 validation (SC-002 navigation smoke)

Run locally after `npm install`:

1. `cd D:\personal\portfolio-me` then `npm run build` (must succeed).
2. `npm run dev` and open the printed URL (usually `http://localhost:3000`).
3. From the header, open **Resume**, **Achievements**, **Games**, **Mobile**, and one nested **game** route; confirm no 404 and pages render.
4. Optional: set `NEXT_PUBLIC_SITE_URL` in `apps/web/.env.local` to your deploy origin, restart dev, and view page source or DevTools Application tab to confirm absolute Open Graph URLs on those routes.
5. On Netlify: open the deploy preview, repeat step 3, and spot-check **Contact** and **Mentoring** links from **About** / **Links**.

From `apps/web`: `npm run validate:quickstart` runs `next build` (same as step 1). From monorepo root you can use `npm run build -w web`.

## Branch note

Speckit scripts run from `portfolio-me` may report `HAS_GIT: false`. Git operations (branch `002-portfolio-showcase`) should be run from `D:\personal\portfolio-me` where `.git` exists.
