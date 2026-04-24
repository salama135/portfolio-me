# Contract: Public site information architecture

**Applies to**: Next.js app (`apps/web` or equivalent)  
**Version**: 2026-04-24

## Route contract

Primary routes are **stable paths** (adjust slugs in implementation, but keep redirects if renamed):

| Path | Purpose | Spec trace |
|------|---------|-------------|
| `/` | Hero + primary CTA to contact/hiring | P1 |
| `/projects` | Project grid + detail `[slug]` | FR-003 |
| `/about` | Professional narrative | FR-002 |
| `/mentoring` | Teaching / instruction angle | FR-002 |
| `/interests` | Hobbies | FR-005 |
| `/blog` | Post list | FR-004 |
| `/blog/[slug]` | Post reader | FR-004 |
| `/adventures` or `/life` | Adventures + galleries (pick one canonical) | FR-005 |
| `/links` | External professional links | FR-002 / FR-006 |
| `/contact` | Hiring pathways | FR-006 |
| `/demos` | Demo hub index | FR-007 |
| `/demos/[slug]` | Individual demo shell | FR-007–FR-010 |

## Navigation contract

- Global nav **MUST** expose: Home, Projects, About, Mentoring, Interests, Blog, Links, Contact, Demos (or group Demos under “Playground” if label preferred—document in UI copy table).
- **Two-click rule** (spec SC-002): from any marketing page, user reaches any other marketing section in ≤2 navigational actions (nav + one sub-click max; direct nav preferred).

## Accessibility contract (shell)

- Visible focus rings on interactive elements.
- Skip link to main content.
- Respect `prefers-reduced-motion` for shell transitions.

## SEO contract

- Each marketing route exposes unique `<title>` and `meta description`.
- Open Graph image optional; default to profile or site card.
