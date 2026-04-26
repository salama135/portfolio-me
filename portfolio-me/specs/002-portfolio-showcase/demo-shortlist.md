# Demo shortlist — FR-016 sign-off

**Spec**: [spec.md](./spec.md) FR-016, FR-017 · **Research**: [research.md](./research.md) §2  
**Status**: Documented for owner review — check **Sign-off** when the set below is approved.

## Showcase goals (mapping)


| Goal                   | Meaning for demos                                                             |
| ---------------------- | ----------------------------------------------------------------------------- |
| **Creativity**         | Original visuals or generative feel; memorable art direction.                 |
| **Interaction design** | Clear primary task, obvious controls, feedback under 2 minutes without docs.  |
| **Visual craft**       | Motion, depth, or polish that reads intentional to a non-specialist (FR-004). |


## Candidate concepts (from research)


| Concept                       | Showcase signal            | Notes                                             |
| ----------------------------- | -------------------------- | ------------------------------------------------- |
| Audio-reactive visual         | Creative coding + Web APIs | Mic optional; mouse/touch fallback.               |
| Generative “brand field”      | Math + design              | Seeded noise / flow field; optional PNG snapshot. |
| Mini shader playground        | Graphics literacy          | Few presets + sliders; no persistence.            |
| Gesture / device motion lab   | Mobile sensors             | Permission-gated; static fallback.                |
| Timeline story scrollytelling | UX + motion                | CSS scroll-driven; lightweight.                   |
| “Debug aesthetic” terminal    | Personality + UI           | Fake shell reveals facts about you.               |


## Recommended v1 implementation set (meets SC-003: ≥4 demos)

Polish and treat as the **four core** shipped demos (registry + primary task under two minutes each):

1. **AR overlay** — `apps/web/app/demos/ar-overlay/`
2. **VR room** — `apps/web/app/demos/vr-room/`
3. **Three showcase** — `apps/web/app/demos/three-showcase/`
4. **Creative sketch** — `apps/web/app/demos/creative-sketch/`

**Fifth (new high-flair)** — pick **one** for Phase 5 T022:


| Option                                | Rationale                                                                               |
| ------------------------------------- | --------------------------------------------------------------------------------------- |
| **Generative “brand field”**          | No mic permission; works desktop/mobile; strong “flare” per interaction + visual craft. |
| Audio-reactive visual                 | Strong creative signal; needs solid no-mic fallback.                                    |
| Mini shader playground (default pick) | Strong technical signal; slightly higher implementation cost.                           |


**Default recommendation**: implement **Generative “brand field”** as `app/demos/<new-slug>/` unless owner prefers another row in the table above.

## Optional later (post–v1)

- Gesture lab, scrollytelling chapter, debug terminal — good stretch goals; not required for SC-003 once five demos above are polished + one new ships.

---

## Sign-off (FR-016)

- Owner confirms recommended v1 set (four existing + one new concept).  
- Owner picks **new** demo row: Generative brand field **or** substitute: _______________________

**Owner / date**: _________________ / _________________