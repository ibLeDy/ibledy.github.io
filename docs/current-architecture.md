# Current architecture

Last verified from the working tree on 2026-07-23.

## Product

The repository contains a single-page personal website and professional CV for
Iago Alonso at `iagoalonso.xyz`. It presents an introduction, engineering
principles, selected projects, employment history, technical skills, contact
information, and public professional profiles.

The content deliberately contains no exact location, home address, phone number,
contact form, or visitor-side tracking.

## Build and presentation

Astro 7 produces a fully static site:

```text
src/data/site.ts
  -> Astro page and components
  -> custom responsive and print CSS
  -> optimized portrait variants + generated social card
  -> dist/ static production artifact
  -> unprivileged nginx container
```

`src/data/site.ts` keeps professional content separate from layout. The site uses
strict TypeScript, reusable Astro components, and custom CSS without a UI
framework, remote font, or client-side JavaScript bundle.

The visual system uses system fonts, a warm near-black canvas, paper-colored
type, an electric green accent, grid lines, and monospace operational labels. It
supports desktop, mobile, reduced-motion preferences, keyboard focus, and a
dedicated A4 print layout.

## Metadata and public assets

`src/layouts/BaseLayout.astro` supplies the canonical URL, explicit description,
Open Graph and Twitter metadata, a typographic social image, and Person JSON-LD.
Structured data contains only the public name, professional role, professional
email, site URL, profile links, and work topics; it contains no address object.

`src/assets/profile.jpg` is retained as a build source. Astro re-encodes it into
responsive AVIF, WebP, and JPEG variants and publishes only those generated
files. The source file is not copied to the public output. The social card is
generated locally as PNG and does not contain the portrait.

The site loads no analytics beacon, remote font, third-party script, iframe, or
embedded third-party media. Cloudflare and the self-hosted origin can still
observe ordinary request data at the network layer; log retention is an
operational privacy decision.

## Routes

- `/` — the professional profile and CV.
- `/404.html` — a custom static not-found page.
- `/robots.txt` — crawl policy and sitemap location.
- `/sitemap.xml` — canonical home-page sitemap.
- `/healthz` — nginx-only container health endpoint.

## Verification

- `npm run format:check` validates formatting.
- `npm run check` runs Astro and TypeScript diagnostics.
- `npm run build` generates assets, type-checks, builds production output, and
  checks required metadata, routes, optimized portrait variants, and forbidden
  tracking/address fragments.
- `npm test` runs formatting plus the complete production build validation.
- Pre-commit runs repository hygiene, formatting, and Astro diagnostics.
- GitHub Actions repeats `npm test` and builds the production container.

## Deployment

The multi-stage Docker build uses Node.js only to compile the site. Its final
image contains nginx and `dist/` only. nginx runs as its unprivileged user, with
a read-only root filesystem, dropped Linux capabilities, temporary files limited
to tmpfs, security headers, immutable caching for hashed assets, and a health
endpoint.

Compose binds the service to `127.0.0.1:8080` by default. The intended public
path is Cloudflare followed by a TLS host reverse proxy or Cloudflare Tunnel.
See `docs/deployment.md` for cutover, cache, origin, and rollback guidance.

The repository does not change DNS, Cloudflare, GitHub Pages settings, or a VPS.
Those remain external deployment state and must be verified during production
cutover.

## Licensing boundary

Original site code is MIT-licensed. Personal CV text and identifying data,
portrait assets, and personal branding remain copyright Iago Alonso, all rights
reserved. `CONTENT-LICENSE.md` defines this boundary; third-party dependencies
retain their own license terms.
