# portfolio-me (monorepo)

This repository uses **npm workspaces**. The Next.js site lives in `apps/web`.

## Quick commands (from repo root)

```bash
npm install          # installs all workspaces (hoisted to root node_modules)
npm run dev          # runs next dev for apps/web
npm run build        # production build for apps/web
npm run lint         # eslint for apps/web
```

Local dev URL when using `npm run dev`: [http://localhost:3000](http://localhost:3000).

## Netlify

Build runs from the **repository root** (`npm install && npm run build`) so npm workspaces resolve.

Netlify settings in `netlify.toml`:

- Build command: `npm install && npm run build`
- Publish directory: `apps/web/.next`

### Environment variables

Web demo flags are optional and enabled by default. Set to `0` to hide:

- `NEXT_PUBLIC_DEMO_IMMERSIVE`
- `NEXT_PUBLIC_DEMO_AUGMENTED`
- `NEXT_PUBLIC_DEMO_THREE_D`
- `NEXT_PUBLIC_DEMO_CREATIVE`
- `NEXT_PUBLIC_DEMO_MOBILE`
- `NEXT_PUBLIC_DEMO_HELLO`

## Mobile companion

```bash
npm run mobile
```

Or:

```bash
cd apps/mobile
npx expo start
```

Deep link target for flagship demo: `portfolio://demo/hello`.

## Testing

```bash
npm run lint -w web
npm run test:e2e -w web
```

## POC reference-only

`poc/index.html` is design reference only. It is not part of runtime routes or deploy output.
