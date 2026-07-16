# Astro rebuild plan

Status: implemented in the working tree; production cutover remains external.

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

## Deployment and rollback

Build and validate the container on a preview hostname before changing DNS. Bind
the container to localhost and put the existing host reverse proxy or a
Cloudflare Tunnel in front of it. Keep Cloudflare SSL/TLS in Full (strict) mode
when using a public origin.

The current production site remains recoverable from Git history. DNS or the
GitHub Pages publishing source should only change after the preview is approved.
Rollback consists of restoring the previous origin/DNS target; no data migration
is involved because both sites are static.
