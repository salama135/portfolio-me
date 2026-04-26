# Contract: Demo delivery and isolation

**Applies to**: `app/demos/*` in `apps/web`  
**Version**: 2026-04-26

## Runtime

- Demos run **client-side**; no server database or authenticated APIs required for demo correctness.
- Heavy bundles MUST use **dynamic import** with `ssr: false` behind an explicit user gesture (“Start” / “Launch”) where bundle size impacts LCP.

## Failure isolation

- Each demo route MUST be wrapped in an **error boundary** that contains failures to the demo card—marketing shell (header/footer) remains usable.

## Persistence

- Demos MUST NOT require cross-visit persistence. In-memory or `sessionStorage` for the session is allowed; avoid storing visitor PII.

## Loading UX

- Demos MUST show **skeleton or spinner** state while chunk loads on slow networks.

## Registry

- Each shipped demo MUST have a row in `content/demos.json` with stable `slug` matching `app/demos/[slug]` or nested segment per existing convention.
