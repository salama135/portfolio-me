# Contract: Games (ice-breakers)

**Applies to**: `app/games/*`  
**Version**: 2026-04-26

## Goals

- Teach visitors something about the owner through play (spec FR-009).
- No collection of visitor identity; no server persistence (constitution: no DB).

## Minimum ship set

At least **one** of the following patterns MUST ship in v1; spec examples encourage multiple over time:

1. **Two truths and a lie** — three statements; user picks; reveals which was lie with short story copy.
2. **This or that** — binary choices with personality-revealing blurbs after N rounds.
3. **Ahmed quiz** — multiple choice; score band maps to playful outcome messages.

## Content format

- Game copy and structure in `apps/web/content/games/<gameId>.json` (schema TBD in implementation; must include `title`, `intro`, `rounds[]`, `outcomes[]`).

## Accessibility

- Keyboard operable controls; color contrast for game UI matches shell tokens.
