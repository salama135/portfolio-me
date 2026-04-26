# Contract: Credly badge inventory

**Applies to**: Achievements page and loaders  
**Version**: 2026-04-26

## Source files

**Primary (curated UI, embeds + manual rows):** `D:\personal\portfolio-me\apps\web\content\achievements.json` — see `achievement-entry` schema in `apps/web/lib/content/schemas/achievement-entry.js`.

**Fallback:** if `achievements.json` is missing or has an empty `achievements` array, the loader builds `credly_embed` rows from:

`D:\personal\portfolio-me\poc\credly-badges.json`

Shape:

```json
{
  "badge_urls": ["https://www.credly.com/badges/…", "…"]
}
```

## Consumption rules

1. **Build-time import**: App MAY read a **copy** under `apps/web/content/` if repo packaging requires it; if duplicated, CI or docs MUST state which file is authoritative (prefer single source + copy script in package.json if needed).
2. **Rendering**: Each entry MUST render at minimum a **linked card** (title from sidecar metadata or generic “Credential” label until metadata exists).
3. **Images**: If `imageUrl` is unknown, UI MUST show **placeholder** and still link to Credly; no broken layout.
4. **Optional enrichment**: `achievements-meta.json` MAY map `badge_urls[]` index or URL to `{ title, issuer, issuedOn }`.

## Validation

- `badge_urls` MUST be an array of strings matching `^https://`.
- De-duplicate URLs on load.
