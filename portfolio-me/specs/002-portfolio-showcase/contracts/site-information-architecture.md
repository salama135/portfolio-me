# Contract: Site information architecture (002 alignment)

**Applies to**: `D:\personal\portfolio-me\apps\web`  
**Version**: 2026-04-26  
**Supersedes for new work**: Prior informal nav; keep compatible with `specs/001-portfolio-site-demos/contracts/public-site-ia.md` unless this doc explicitly revises a path.

## Route table

| Path | Purpose | Nav visibility |
|------|---------|----------------|
| `/` | Hero, summary, CTAs | Home |
| `/about` | Professional narrative | About |
| `/resume` | Experience, education, grouped skills | Resume (new) |
| `/projects` | Project index | Projects |
| `/projects/[slug]` | Project detail | — |
| `/demos` | Demo hub | Demos |
| `/demos/[slug]` | Demo shell | — |
| `/mobile` | Native apps showcase | Mobile (new or verify existing) |
| `/blog`, `/blog/[slug]` | Writing | Blog |
| `/adventures` | Life / events / gallery grid | Life / Adventures (single canonical) |
| `/interests` | Hobbies text/media | Interests |
| `/achievements` | Credly + milestones | Achievements (new) |
| `/games` | Ice-breakers | Games (new) |
| `/mentoring` | Offerings, calendar embed, testimonials, booking CTA | Mentoring |
| `/links` | Outbound links | Links |
| `/contact` | Contact / hire | Contact |

## Redirect / naming

- If marketing label “Life” is preferred over “Adventures”, **nav label** may read “Life” while path remains `/adventures` **or** add `next.config.js` redirect `/life` → `/adventures` (pick one; document in `site-header`).

**Implemented (002 Phase 3)**:

- Primary nav shows the label **Life** for the canonical path `/adventures` (`NAV_ITEMS` in `apps/web/lib/constants/routes.js`).
- **Permanent redirect**: `/life` → `/adventures` in `apps/web/next.config.js`.

## Two-click rule

From any row in the table (except dynamic `[slug]`), user MUST reach any other marketing row within **two navigational actions** (prefer primary nav over buried links).

## Reduced motion

Shell and marketing pages MUST respect `prefers-reduced-motion` for decorative loops; demos MAY show static first frame + “enable motion” optional control.
