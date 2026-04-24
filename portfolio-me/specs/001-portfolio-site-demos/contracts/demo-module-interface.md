# Contract: Demo module interface (web)

**Applies to**: All experiences mounted under `/demos/[slug]`  
**Version**: 2026-04-24

## Lifecycle

Each demo **MUST** export a default React client component (or wrapper) that:

1. **Mounts** only after user intent when the bundle is heavy (use explicit “Start demo” if auto-load would exceed shell performance budget).
2. **Unmounts** cleanly: cancel `requestAnimationFrame`, dispose Three.js renderers, remove A-Frame listeners, stop p5 instances—**no leaks** when navigating away.
3. **Surfaces** capability errors with user-readable text (WebGL missing, permission denied, WebXR unsupported)—maps to SC-006.

## Props / context (conventional)

Implementations **SHOULD** accept optional props (exact names flexible):

| Prop | Purpose |
|------|---------|
| `onStatusChange` | Callback: `loading` \| `ready` \| `error` \| `unsupported` |
| `reducedMotion` | Boolean from shell context—simplify effects when true |

## Performance budget (guideline)

- Initial JS for marketing shell: unchanged by demo code paths until `/demos/*` visited.
- Per-demo additional transfer: document target in PR; default guidance **≤ 500 KB gzip** for first paint of demo entry (excluding streaming assets); heavy assets lazy-loaded.

## Security / privacy

- Camera or motion APIs: request **in context of user gesture** where possible; explain why in UI before prompt.
- No fingerprinting, no cryptomining, no background network calls except documented asset hosts.

## Mobile companion

Native demos under `apps/mobile` **SHOULD** mirror slug naming for cross-linking (e.g., `mobile://demo/neon-grid` ↔ web `/demos/neon-grid`) even if URLs differ technically.
