# AGENTS: Add a new demo

This file documents the canonical process for adding a new demo to `apps/web` and serves as the first reference for any agent or developer asked to create a demo.

## Why this exists

When asked to create a new demo, consult this document first. It describes the required registry, page structure, client wrapper contract, and feature-flag gating used by the current web portfolio.

## Key files to inspect

- `apps/web/content/demos.json` — demo registry. Every shipped demo must have an entry here.
- `apps/web/components/demo-launcher.jsx` — client launcher with deferred start and `DemoErrorBoundary`.
- `apps/web/components/demo-page-shell.jsx` — server-side gate for disabled demos by slug.
- `apps/web/lib/config/feature-flags.js` — env-driven enable/disable logic for demo families and per-demo flags.
- `apps/web/app/demos/<slug>/page.jsx` — route wrapper for each demo.
- `apps/web/app/demos/<slug>/<slug>-client.jsx` — client wrapper that dynamically imports the inner demo.
- `apps/web/app/demos/<slug>/<slug>-inner.jsx` — actual demo implementation.

## Required structure for a new demo

1. Create a new folder under `apps/web/app/demos/` with the demo slug.
2. Add a server page component at `apps/web/app/demos/<slug>/page.jsx`.
3. Add a client wrapper at `apps/web/app/demos/<slug>/<slug>-client.jsx`.
4. Add the inner client demo implementation at `apps/web/app/demos/<slug>/<slug>-inner.jsx`.
5. Register the demo in `apps/web/content/demos.json`.
6. Add or update feature flags in `apps/web/lib/config/feature-flags.js` and `.env.example` when needed.

## Page component pattern

Every demo route should follow this server-side wrapper pattern:

```jsx
import { DemoPageShell } from '../../../components/demo-page-shell.jsx';
import { MyDemoClient } from './my-demo-client.jsx';

export default async function MyDemoPage() {
  return (
    <div className="page-shell-wide py-[clamp(2rem,6vw,3rem)]">
      <DemoPageShell slug="my-demo">
        <MyDemoClient />
      </DemoPageShell>
    </div>
  );
}
```

### Why use `DemoPageShell`

- It loads the demo registry server-side.
- It checks `isDemoExperienceEnabled(demo)`.
- It prevents disabled demos from mounting the client bundle.

## Client wrapper pattern

The client wrapper ensures the heavy demo code only loads after the user clicks Start.

```jsx
'use client';

import dynamic from 'next/dynamic';
import { DemoLauncher } from '../../../components/demo-launcher.jsx';

const MyDemoInner = dynamic(() => import('./my-demo-inner.jsx'), { ssr: false });

export function MyDemoClient() {
  return (
    <DemoLauncher
      Demo={MyDemoInner}
      title="My Demo Title"
      description="Short demo description."
    />
  );
}
```

### Important contract

- Use `dynamic(..., { ssr: false })` for the inner demo.
- Do not import the inner demo directly in `page.jsx`.
- The `DemoLauncher` component wraps the demo in `DemoErrorBoundary`.

## Inner demo implementation

The inner demo can be any client-only component that renders the live experience. Keep the contract simple:

- `game-inner.jsx`, `hello-inner.jsx`, or similar.
- Use hooks, DOM APIs, graphics libraries, or animation logic here.
- This file is the only part loaded after the user presses Start.

## Registry entry

Add one object to `apps/web/content/demos.json`:

```json
{
  "slug": "my-demo",
  "title": "My Demo Title",
  "category": "creative",
  "summary": "Primary task: do something interactive.",
  "deviceNeeds": "Any current desktop or mobile browser.",
  "durationHint": "~2 min",
  "entryPath": "/demos/my-demo"
}
```

### Optional fields

- `featureFlag`: use when you want a custom env variable instead of a category family flag.
- `mobileAppLink`: deep-link target for mobile if the demo is available in the Expo app.

## Feature flags

`apps/web/lib/config/feature-flags.js` maps demo `category` values to env vars.

- Family flags are defined in `CATEGORY_ENV`.
- A demo row with `featureFlag` uses `NEXT_PUBLIC_DEMO_<FLAG>`.
- Any env var omitted or set to a non-`0` value means the demo is enabled.

Example for a custom demo-specific flag:

```json
{
  "slug": "hello",
  "featureFlag": "HELLO"
}
```

Then set `NEXT_PUBLIC_DEMO_HELLO` in `.env.example` or `.env.local`.

## Special notes

- Keep `slug` stable. It must match both the route folder and `entryPath`.
- For heavy demos, maintain the `page.jsx` / client wrapper / inner demo separation.
- If the demo needs mobile app deep linking, align `mobileAppLink` with `apps/mobile/app.json` scheme.
- Use existing demos as examples:
  - `apps/web/app/demos/hello/page.jsx`
  - `apps/web/app/demos/hello/hello-client.jsx`
  - `apps/web/app/demos/hello/hello-inner.jsx`
  - `apps/web/app/demos/creative-sketch/creative-client.jsx`
  - `apps/web/app/demos/identical-game/game-client.jsx`

## What to do when asked to create a new demo

1. Read this `AGENTS.md` file.
2. Confirm the demo slug and category.
3. Create the route folder and files.
4. Register the demo in `apps/web/content/demos.json`.
5. If needed, update feature flags and `.env.example`.
6. Verify the route builds and the demo launches behind `Start demo`.

## Private (password-protected) demos

Standalone single-file HTML demos that should not be public go in the private collection instead of the flow above.

1. Add an entry to `apps/web/content/private-demos.json` (`slug`, `title`, `category`, `summary`, `deviceNeeds`, `durationHint`).
2. Save the page as `apps/web/private-demos/<slug>.html` (outside `public/`).
3. That's it: `/demos/private/<slug>` wraps it in `DemoLauncher` and frames the gated route `/demos/private/<slug>/raw`.

The password is `PRIVATE_DEMOS_PASSWORD` (server env). Gate logic: `apps/web/lib/private-demos/auth.js`.
`NEXT_PUBLIC_DEMO_PRIVATE=0` hides the collection's entry card on `/demos`.

## Testing

- Open `/demos` and confirm the new demo appears.
- Visit `/demos/<slug>` and confirm the Start button appears.
- Confirm disabled demos show the unavailable notice when feature flags are off.
- Confirm `DemoErrorBoundary` catches runtime errors.
