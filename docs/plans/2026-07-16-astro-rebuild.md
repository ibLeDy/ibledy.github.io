# Astro rebuild plan

Status: In progress

## Task and intended files

Replace the Sproogen/Jekyll site with an original Astro implementation while
keeping the existing public site recoverable until a VPS preview and Cloudflare
cutover have been verified. Implementation is concentrated in `src/`, `public/`,
`scripts/`, the Node package files, container configuration, and the supporting
documentation under `docs/`.

## Goals

- Replace the remote Jekyll resume theme with a distinctive, maintainable site.
- Preserve the verified CV content while improving hierarchy and presentation.
- Produce static HTML with no required client-side JavaScript.
- Make privacy, accessibility, performance, SEO, mobile layout, and print output
  part of the implementation rather than later additions.
- Support self-hosting on a VPS behind Cloudflare without requiring an
  application runtime in production.

## Non-goals

- No blog, CMS, contact form, database, authentication, or application server.
- No exact location, phone number, visitor fingerprinting, or new analytics
  beacon.
- No DNS, GitHub Pages, Cloudflare, or production-server changes from this
  repository change alone.
- No invented employment metrics or project claims.

## Compatibility and behavior changes

- `gh-pages` remains the repository's default and target branch, but it stops
  being the production publishing source after the self-hosted cutover.
- The Jekyll theme, `CNAME`, visitor-side Cloudflare analytics, and inherited
  Sproogen assets are removed from the Astro branch.
- Original site code changes from the inherited GPLv3 file to MIT. Personal CV
  content, the portrait, likeness, and branding remain all rights reserved.
- The production runtime changes from GitHub Pages to a static, unprivileged
  nginx container behind Cloudflare.

## Design direction

The site uses an editorial systems-console visual language: warm near-black,
paper white, an electric green accent, strong typography, restrained grid lines,
and monospace labels. The portrait is secondary to the written introduction and
is cropped to focus on the face rather than clothing.

The page remains a single, scannable document with anchored sections for work,
experience, toolkit, and contact. It is designed to print cleanly as a CV.

## Architecture

- Astro 7 static output and strict TypeScript.
- CV data in `src/data/site.ts` with explicit types.
- Reusable Astro components for metadata, icons, section headings, experience,
  and projects.
- Custom CSS only; no UI framework, remote font, or client bundle.
- Astro's image pipeline re-encodes the portrait into generated WebP/AVIF
  variants without retaining source metadata in published files.
- A local Sharp script creates the PNG social card during builds.
- An nginx production image serves only the generated `dist/` directory.

## Verification

- `astro check` for template and TypeScript diagnostics.
- Prettier with Astro support.
- Production build plus a custom output check for required metadata, pages,
  forbidden tracking scripts, and accidental location fields.
- Pre-commit repository hygiene hooks.
- Desktop, mobile, and print inspection in a browser.

## Progress

Completed on 2026-07-23:

- Preserved the current GitHub Pages revision `3a6e48a` as remote branch
  `legacy-pages` and annotated tag `pre-astro-pages-2026-07-23`.
- Reconciled `codex/astro-rebuild` into its compliant external worktree and
  restored the protected primary checkout to clean, synchronized `gh-pages`.
- Clarified the MIT software and reserved personal-content licensing boundary.
- Updated Astro to 7.1.3 and `fast-uri` to 3.1.4, clearing the two build-time
  dependency audit findings without a major-version change.
- Validated the isolated Node 24/nginx image on desktop and 390 px mobile with
  no overflow or console errors, then rendered and visually inspected a clean
  four-page A4 PDF from the same container.

Remaining before the PR is ready:

- Deploy the final validated feature head to a VPS preview hostname.
- Validate the public preview, including TLS, headers, caching, redirects,
  health checks, and privacy invariants.
- Coordinate the GitHub Pages source change and Cloudflare origin cutover.

## Deployment and rollback

Build and validate the container on a preview hostname before changing DNS. Bind
the container to localhost and put the existing host reverse proxy or a
Cloudflare Tunnel in front of it. Keep Cloudflare SSL/TLS in Full (strict) mode
when using a public origin.

> [!CAUTION]
> 🔴 **DANGER** — `gh-pages` is currently both the default branch and the live
> legacy GitHub Pages source. Do not merge the Astro PR until Pages publishes
> from `legacy-pages` and that rollback site has been verified.

After preview approval, move the GitHub Pages publishing source to
`legacy-pages`, verify the existing site, then point Cloudflare at the VPS. Merge
the Astro PR into `gh-pages` only after production traffic reaches the new
origin. Rollback consists of returning Cloudflare to GitHub Pages or restarting
the previous VPS image; no data migration is involved because both sites are
static.

## ⚠️ Attention and behavior changes

> [!CAUTION]
> 🛑 **BLOCKER** — Production cutover remains blocked until an exact VPS target,
> access method, preview hostname, and Cloudflare context are supplied and the
> preview passes validation.

> [!IMPORTANT]
> 🔵 **BEHAVIOR CHANGE** — Hosting moves from legacy GitHub Pages to a static
> nginx container, while `gh-pages` remains the repository's default branch.

> [!IMPORTANT]
> 🟣 **VISUAL QA** — Desktop, mobile, and four-page A4 print output passed on the
> local container. Repeat visual inspection if the VPS preview uses a different
> image or configuration.
