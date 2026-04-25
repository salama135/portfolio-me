# Data model: Personal portfolio and live demonstration hub

**Feature**: `001-portfolio-site-demos` | **Date**: 2026-04-24  
**Persistence**: Git-tracked files only—no database, no authenticated user profiles.

All entities are **content** or **configuration**, validated at build time (recommended: Zod) where types are listed below.

## Entity: SiteProfile

Represents global copy and metadata for the portfolio shell.

| Field | Type | Rules |
|-------|------|--------|
| `title` | string | Required; site title |
| `tagline` | string | Required; short hook |
| `roles` | string[] | Required; e.g. software engineer, instructor, game developer |
| `locale` | string | Default `en` |
| `social` | object | Optional keys: `github`, `linkedin`, `email`, `calendar`, etc. |
| `seo` | object | Optional `description`, `ogImage` path |

## Entity: NavItem

| Field | Type | Rules |
|-------|------|--------|
| `label` | string | Required |
| `href` | string | Required; in-app path or external URL |
| `order` | number | Required; sort ascending |
| `featureFlag` | string | Optional; when set, item hidden unless flag enabled |

## Entity: Project

| Field | Type | Rules |
|-------|------|--------|
| `slug` | string | Required; unique; kebab-case |
| `title` | string | Required |
| `summary` | string | Required; 1–3 sentences |
| `role` | string | Required; your contribution framing |
| `outcomes` | string | Optional; business-friendly bullets |
| `techLabels` | string[] | Optional; display labels, not a dependency manifest |
| `links` | object | Optional `repo`, `demo`, `caseStudy` URLs |
| `coverImage` | string | Optional; path under `public/` |
| `featured` | boolean | Default false |
| `order` | number | Sort for listing |

## Entity: Article (blog post)

| Field | Type | Rules |
|-------|------|--------|
| `slug` | string | Required; unique |
| `title` | string | Required |
| `date` | ISO date string | Required |
| `author` | string | Required; display name |
| `tags` | string[] | Optional |
| `body` | MDX/Markdown | Required |
| `excerpt` | string | Optional; else derived |

## Entity: Highlight (achievement)

| Field | Type | Rules |
|-------|------|--------|
| `id` | string | Required; stable id |
| `title` | string | Required |
| `description` | string | Optional |
| `date` | ISO date string | Optional |
| `icon` | string | Optional; icon key |

## Entity: Interest

| Field | Type | Rules |
|-------|------|--------|
| `id` | string | Required |
| `title` | string | Required |
| `body` | string | Optional short text |
| `image` | string | Optional |

## Entity: Adventure (album / story)

| Field | Type | Rules |
|-------|------|--------|
| `slug` | string | Required |
| `title` | string | Required |
| `description` | string | Optional |
| `media` | MediaAsset[] | Required; min 1 |

## Entity: MediaAsset

| Field | Type | Rules |
|-------|------|--------|
| `src` | string | Required; path or remote URL (prefer local for stability) |
| `alt` | string | Required for images |
| `caption` | string | Optional |
| `type` | `"image"` \| `"video"` | Required |

## Entity: DemoExperience

Registry row for the demo hub (may duplicate minimal fields from code constants).

| Field | Type | Rules |
|-------|------|--------|
| `slug` | string | Required; matches route under `/demos/` |
| `title` | string | Required |
| `category` | enum-like string | One of: `immersive`, `augmented`, `three_d`, `creative`, `mobile` |
| `summary` | string | Required; visitor-facing |
| `deviceNeeds` | string | Required; e.g. “WebXR-capable browser”, “Webcam” |
| `durationHint` | string | Required; e.g. “~2 min” |
| `entryPath` | string | Required; app-relative path |
| `featureFlag` | string | Optional |
| `mobileAppLink` | string | Optional; deep link or store placeholder |

## Relationships (conceptual)

- `Adventure` **contains many** `MediaAsset`.
- `Project` **optional link** to `DemoExperience` via `links.demo`.
- `DemoExperience` of category `mobile` **may reference** external `mobileAppLink` instead of web `entryPath` only.

## State transitions

Not applicable—no server-side state machine. Client demo **UI state** is ephemeral (reset on reload).

## Validation rules summary

- Slugs: unique per collection.
- All user-visible images: non-empty `alt`.
- External URLs: HTTPS preferred in content review (not enforced in schema if you need `mailto:` elsewhere).
