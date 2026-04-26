# Data model: 002 Portfolio showcase

**Source**: `specs/002-portfolio-showcase/spec.md` Key Entities + existing `001` schemas where reused.

## Conventions

- Content is **files** under `apps/web/content/` (and optionally `poc/` for shared badge inventory path).
- Validation at build time with **Zod** (existing pattern from 001).

## Entities

### SiteProfile (existing)

- **Fields**: name, roles/tagline, summary, social keys, SEO fields, hero CTA targets.
- **Files**: `apps/web/content/site-profile.json`.
- **Relationships**: Referenced by home, about, metadata.

### DemoExperience (existing; extend if needed)

- **Fields**: slug, title, summary, tags[], estimatedDuration, deviceHints, featureFlagKey?, preview asset path.
- **Files**: `apps/web/content/demos.json`.
- **Validation**: Primary task description optional string for UX copy.

### Project (existing)

- **Fields**: slug, title, excerpt, dates, body MDX, optional media.
- **Files**: `apps/web/content/projects/*`.

### Article (Blog post) (existing)

- **Fields**: slug, title, date, categories[] (tech | life | health | hobbies), body.
- **Files**: `apps/web/content/blog/*`.

### LifeMoment (Media card)

- **Fields**: id, title, caption, image path, alt (required), date optional, tags optional.
- **Files**: New `apps/web/content/life/` JSON array **or** extend adventures content—**single source** after IA decision.
- **Relationships**: Rendered on `/adventures` (or `/life` if introduced).

### AchievementBadge

- **Fields**: sourceUrl (Credly page URL), displayTitle (resolved or manual), imageUrl optional (resolved asset), issuedOn optional.
- **Files**: `poc/credly-badges.json` (`badge_urls[]`) + optional sidecar `achievements-meta.json` for titles if URLs alone insufficient.
- **Validation**: URL format; dedupe; max length for titles.

### CareerMilestone (optional)

- **Fields**: title, organization, date, type (certificate | role | award), description optional.
- **Files**: `apps/web/content/highlights.json` or `milestones.json`.

### GamePack

- **Fields**: gameId, title, rules copy, rounds[] (prompts, answers), outcome messages (no PII).
- **Files**: `apps/web/content/games/*.json`.
- **State**: Ephemeral client only.

### MentoringOffering

- **Fields**: sessionTypes[] (one_to_one | group), audience, duration, bookingUrl, calendarEmbedUrl optional, testimonials[] { quote, name, context }.
- **Files**: `apps/web/content/mentoring.json` (new) or partial in MDX page.

### ResumeDocument

- **Fields**: experiences[], education[], skillGroups { programmingLanguages[], frameworks[], concepts[], tools[] }.
- **Files**: `apps/web/content/resume.json` (new).

### OutboundLink (optional normalized)

- **Fields**: label, href, category, icon optional.
- **Files**: May remain inline in `links` page or `site-profile`—normalize if duplicated.

## Validation rules (summary)

- **LifeMoment**: `alt` non-empty; image paths under `public/media` or remote allowlist.
- **AchievementBadge**: HTTP(S) URLs only; graceful display without image.
- **ResumeDocument**: At least one experience and one education entry for non-empty resume; skill groups may start empty with empty states.

## State transitions

- Not applicable (static site); demo/game UI uses React component state only.
