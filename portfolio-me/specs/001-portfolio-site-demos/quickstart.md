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
npm install
```

The repository already uses npm workspaces (`apps/web`, `apps/mobile`).

## Run web (npm workspaces)

```powershell
cd D:\personal\portfolio-me
npm install
npm run dev
```

This runs the `web` workspace (`apps\web`). Open `http://localhost:3000`.

## Web quality checks

```powershell
cd D:\personal\portfolio-me
npm run lint -w web
npm run test:e2e -w web
```

Playwright smoke tests cover `/`, `/contact`, `/projects`, and `/demos`.

## POC reference

Open `D:\personal\portfolio-me\poc\index.html` in a browser for **design and IA reference**; it is not served by Next unless you explicitly copy patterns.

## Mobile app (after Sprint 9)

```powershell
cd D:\personal\portfolio-me\apps\mobile
npx expo start
```

Deep link for flagship demo: `portfolio://demo/hello`.

## Useful specs for agents

Before coding a slice, load:

1. `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\spec.md`
2. `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\plan.md`
3. `D:\personal\portfolio-me\portfolio-me\.specify\memory\constitution.md`

## Netlify

Production deploy expects **static-friendly** Next build and workspace install from repo root:

- **Base directory**: repo root (`D:\personal\portfolio-me`)
- **Build command**: `npm install && npm run build`
- **Publish directory**: `apps/web/.next`

Document final values in the repo `README.md` when implementation tasks complete.
