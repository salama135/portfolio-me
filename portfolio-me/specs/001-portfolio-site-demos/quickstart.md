# Quickstart: Personal portfolio and live demonstration hub

**Paths**: Application root `D:\personal\portfolio-me` · Specs `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos`

## Prerequisites

- Node.js **LTS** (match version in `.nvmrc` or `.node-version` if present; else 20+)
- **npm** (constitution); enable workspaces in root `package.json` when migration lands
- Git
- For mobile later: **Expo CLI** / Android Studio or Xcode simulators

## Clone and install

```powershell
cd D:\personal\portfolio-me
git checkout 001-portfolio-site-demos
npm install
```

> Until workspace migration merges, `npm install` at repo root already installs the existing Next app.

## Run web (current root layout)

```powershell
cd D:\personal\portfolio-me
npm run dev
```

Open `http://localhost:3000`.

## Run web (after `apps/web` workspace migration)

```powershell
cd D:\personal\portfolio-me
npm run dev --workspace apps/web
```

(Exact script names may be `dev:web`—align with root `package.json` when tasks implement migration.)

## POC reference

Open `D:\personal\portfolio-me\poc\index.html` in a browser for **design and IA reference**; it is not served by Next unless you explicitly copy patterns.

## Mobile app (after Sprint 9)

```powershell
cd D:\personal\portfolio-me\apps\mobile
npx expo start
```

## Useful specs for agents

Before coding a slice, load:

1. `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\spec.md`
2. `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\plan.md`
3. `D:\personal\portfolio-me\portfolio-me\.specify\memory\constitution.md`

## Netlify

Production deploy expects **static-friendly** Next build. After monorepo move, set:

- **Base directory**: `apps/web` (or repo root if not yet moved)
- **Build command**: `npm run build` (workspace-aware)
- **Publish directory**: Next output per Netlify Next plugin defaults

Document final values in the repo `README.md` when implementation tasks complete.
