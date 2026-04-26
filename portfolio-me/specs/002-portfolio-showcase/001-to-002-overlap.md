# 001 epic → 002 epic overlap (T001)

**Source**: `D:\personal\portfolio-me\portfolio-me\specs\001-portfolio-site-demos\tasks.md` (all phases marked complete)  
**Purpose**: Avoid redoing finished work; clarify **extend** vs **replace** for `apps/web`.

## Already delivered in 001 (do not re-implement)

| Area | Location | Notes |
|------|----------|--------|
| Workspaces + `apps/web` host | `D:\personal\portfolio-me\package.json`, `apps/web\` | 002 builds on this layout. |
| Content folders + `site-profile.json` | `D:\personal\portfolio-me\apps\web\content\` | Extend JSON; do not recreate empty tree. |
| Zod schemas + loaders (SiteProfile, Project, Article, DemoExperience) | `apps/web\lib\content\schemas\`, `lib\content\load\` | 002 **adds** new schemas/loaders (resume, mentoring, games, achievements); keep existing APIs stable. |
| Feature flags for demo families | `apps/web\lib\config\feature-flags.js` (or `.ts`) | 002 may add keys; keep existing slugs working. |
| Shell: layout, header, footer, error UI | `app\layout.jsx`, `components\site-header.jsx`, `site-footer.jsx`, `app\error.jsx` | 002 **extends** `NAV_ITEMS` / routes—replace only with intentional IA refresh. |
| Route constants | `apps/web\lib\constants\routes.js` | 001 tasks text said `routes.ts`; actual file is **`routes.js`**. 002 tasks target `routes.js`. |
| Marketing pages: home, contact, links, about, mentoring, interests, blog, adventures, projects | `app\*\page.jsx` | 002 **enhances** copy/sections (hero flare, mentoring embed/testimonials, adventures grid polish, blog categories) rather than deleting routes. |
| Highlights | `content\highlights.json`, about integration | 002 adds **`/achievements`** with Credly inventory; may reuse or link highlights—avoid duplicating two conflicting sources without a loader decision. |
| Demos hub, launcher, error boundary, `demos.json`, hello / creative / three / ar / vr | `app\demos\**`, `components\demo-*.jsx` | 002 **polishes** flows and adds **one** new high-flair demo per plan; keep isolation contract. |
| Mobile epic (US4 in 001) | `apps/mobile`, any web showcase page from 001 Phase 6 | If web `/mobile` route missing, 002 **adds** it; do not duplicate native app code in web. |

## 002-specific net-new (not in 001 task list)

- Routes/pages: `/resume`, `/achievements`, `/games` (+ game detail), `/mobile` (if absent).
- Loaders + content: `poc\credly-badges.json`, optional `achievements-meta.json`, `resume.json`, `mentoring.json`, `content\games\*.json`.
- Nav grouping / redirects per `specs\002-portfolio-showcase\contracts\site-information-architecture.md`.

## Replace vs extend (summary)

- **Extend**: header/footer, `routes.js`, `demos.json`, existing demo pages, mentoring/about/contact pages, `site-profile.json`.
- **Replace**: nothing wholesale unless a 002 task explicitly migrates content shape (e.g. achievements moving off about-only strip to dedicated page—keep redirects or copy in sync during transition).
