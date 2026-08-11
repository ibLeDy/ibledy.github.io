Status: In progress

# Astro rebuild plan

## Task and intended files

Replace the Sproogen/Jekyll site with an original Astro implementation while
keeping the existing public site recoverable until a VPS preview and Cloudflare
cutover have been verified. Extract the finished site into a dedicated source
repository so `ibLeDy/ibledy.github.io` remains available for a different use.
Implementation is concentrated in `src/`, `public/`, `scripts/`, the Node
package files, container configuration, and the supporting documentation under
`docs/`.

## Goals

- Replace the remote Jekyll resume theme with a distinctive, maintainable site.
- Preserve the verified CV content while improving hierarchy and presentation.
- Produce static HTML with no required client-side JavaScript.
- Make privacy, accessibility, performance, SEO, mobile layout, and print output
  part of the implementation rather than later additions.
- Support self-hosting on a VPS behind Cloudflare without requiring an
  application runtime in production.
- Decouple the personal-domain source from the special GitHub user-site
  repository and its `gh-pages` history.

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

## Repository extraction decision

The earlier implementation targeted `gh-pages` because that was the existing
repository trunk. That target is superseded: the Astro site should move to a
dedicated `ibLeDy/iagoalonso.xyz` repository with `main` as its default branch.
The existing draft PR remains a staging and review surface and must not be
merged into `ibLeDy/ibledy.github.io`.

The dedicated repository should be public. The website and its source are
already public, the original code is MIT-licensed, and public CI, dependency
updates, and source visibility are useful portfolio signals. Personal CV data,
the avatar, likeness, and branding remain reserved by `CONTENT-LICENSE.md`.
The repository must contain no server credentials, Cloudflare tokens, private
operations data, or environment files. A private repository would be reasonable
only if hiding the implementation or unpublished history became an explicit
goal.

Initialize the destination with a minimal `main`, then import the validated
Astro tree on a feature branch and open a new draft PR. Use a clean repository
history rather than carrying the legacy Jekyll/Sproogen history into the new
project. Keep this branch and PR until the destination PR and preview are
verified, then close the old PR as superseded rather than merging it.

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

Completed on 2026-08-11:

- Merged the latest production branch state into the Astro worktree and resolved
  the legacy Jekyll deletion and portrait rename in favor of the production
  illustrated avatar.
- Stripped hidden metadata from the avatar source before committing it under
  `src/assets/`; Astro continues to publish only generated variants.
- Decided to extract the site into a dedicated repository instead of merging it
  into `ibLeDy/ibledy.github.io`.
- Applied patch-level fixes for the current transitive dependency advisories;
  `npm audit` again reports zero vulnerabilities.
- Revalidated desktop and mobile layouts with the production avatar and fixed a
  headless-print margin incompatibility; the resulting four-page A4 CV has no
  clipping or overlap.

Remaining before the destination PR is ready:

- Create the dedicated public repository and import the validated Astro tree on
  a feature branch with a new draft PR.
- Deploy the final validated feature head to a VPS preview hostname.
- Validate the public preview, including TLS, headers, caching, redirects,
  health checks, and privacy invariants.
- Coordinate the Cloudflare origin cutover while retaining the old GitHub Pages
  site as rollback.

## Deployment and rollback

Build and validate the container on a preview hostname before changing DNS. Bind
the container to localhost and put the existing host reverse proxy or a
Cloudflare Tunnel in front of it. Keep Cloudflare SSL/TLS in Full (strict) mode
when using a public origin.

> [!CAUTION]
> 🔴 **DANGER** — `gh-pages` is currently both the default branch and the live
> legacy GitHub Pages source. Do not merge the Astro PR into this repository;
> leave the existing Pages site unchanged as the rollback target while the
> dedicated repository and VPS origin are validated.

Do not move the old Pages publishing source or merge the Astro PR into
`gh-pages`. Create and review the site in the dedicated repository, deploy its
exact validated commit to the VPS, and leave the current GitHub Pages site
unchanged until Cloudflare is pointed at the new origin. Rollback consists of
returning DNS to the unchanged GitHub Pages site or restarting the previous VPS
image; no data migration is involved because both sites are static.

After an observation window, detach `iagoalonso.xyz` from the old GitHub Pages
configuration. Only then is `ibLeDy/ibledy.github.io` free to publish unrelated
content without risking the CV site's rollback path.

## ⚠️ Attention and behavior changes

> [!CAUTION]
> 🛑 **BLOCKER** — Repository publication is blocked until the recommended
> public `ibLeDy/iagoalonso.xyz` destination is confirmed and created.

> [!CAUTION]
> 🛑 **BLOCKER** — Production cutover remains blocked until an exact VPS target,
> access method, preview hostname, and Cloudflare context are supplied and the
> preview passes validation.

> [!IMPORTANT]
> 🔵 **BEHAVIOR CHANGE** — Hosting moves from legacy GitHub Pages to a static
> nginx container. Source moves to a dedicated repository using `main`, while
> the old `ibledy.github.io` site remains the rollback target during observation.

> [!IMPORTANT]
> 🟣 **VISUAL QA** — Desktop, mobile, and four-page A4 print output passed on the
> local container. Repeat visual inspection if the VPS preview uses a different
> image or configuration.
