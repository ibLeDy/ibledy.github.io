# Repository guidance for coding agents

This file describes how to work safely and maintainably in this repository. It
records the current implementation, not a commitment to keep it. Proposed
replacements belong in a design plan and must not be presented as existing
architecture.

## Purpose

This repository publishes Iago Alonso's personal website and professional CV at
`iagoalonso.xyz`. Treat it as both a public professional profile and a small
production website: content accuracy, privacy, accessibility, performance, and
stable deployment all matter.

## Start with discovery

Before proposing or making changes:

1. Confirm the working directory, branch, and worktree state with `pwd`,
   `git branch --show-current`, and `git status --short`.
2. Inventory the repository with `rg --files`, including hidden configuration
   when relevant.
3. Read the files that currently control the requested behavior. For broad site
   work, start with `README.md`, `package.json`, `astro.config.mjs`,
   `src/data/site.ts`, `src/pages/index.astro`, `src/layouts/BaseLayout.astro`,
   `src/styles/global.css`, `Dockerfile`, `deploy/nginx.conf`, and
   `docs/current-architecture.md`.
4. Distinguish verified repository facts from assumptions about hosting or
   external configuration. GitHub, Cloudflare, DNS, and analytics settings are
   not fully represented by local files.
5. Inspect existing user changes before editing and preserve unrelated work.

Do not choose a framework, hosting platform, visual direction, or content model
merely because another repository uses it. Compare options against this site's
actual needs first.

## Current implementation

The site is an Astro 7 project that produces static HTML, CSS, and optimized
images. Production serves the generated files from an unprivileged nginx
container; no Node.js application runtime is present after the build.

- `src/data/site.ts` is the source of truth for CV content and public links.
- `src/pages/index.astro` composes the single-page site; `404.astro` and
  `sitemap.xml.ts` provide supporting routes.
- `src/layouts/BaseLayout.astro` owns metadata, canonical URLs, social cards,
  and privacy-conscious structured data.
- `src/components/` contains reusable presentational components.
- `src/styles/global.css` contains the visual system, responsive breakpoints,
  reduced-motion behavior, and print styles.
- `src/assets/profile.jpeg` is a source-only portrait. Astro publishes re-encoded
  variants and does not copy the original file to `dist/`.
- `scripts/generate-og.mjs` generates the social preview card;
  `scripts/check-build.mjs` verifies required production output and privacy
  invariants.
- `Dockerfile`, `compose.yaml`, and `deploy/nginx.conf` define self-hosting on a
  localhost-bound port behind a reverse proxy or Cloudflare Tunnel.
- `dist/`, `.astro/`, `node_modules/`, and `public/og-card.png` are generated and
  git-ignored; never edit or commit them.

This worktree may still belong to the legacy `ibledy.github.io` migration PR.
The site is intended to use `main` in its dedicated repository; do not treat
`gh-pages` as the site's future trunk. DNS, Cloudflare, the VPS, repository
creation, and GitHub Pages settings remain external state.

## Local commands

Install the Node.js dependencies:

```bash
npm install
```

Run a local preview:

```bash
npm run dev
```

Build the production site:

```bash
npm run build
```

Run formatting, Astro, TypeScript, output, and build checks:

```bash
npm test
```

Run repository hygiene checks:

```bash
pre-commit run --all-files
```

Node.js 22.12 or newer is required; Node.js 24 is the container and CI target.
Do not bypass dependency conflicts with `--force` or `--legacy-peer-deps`.

## Quality bar

- Keep professional claims precise, specific, and supportable. Do not invent
  metrics, responsibilities, employers, dates, or project capabilities.
- Keep content easy to update. Structured data may be useful, but avoid
  abstractions that make a small site harder to understand.
- Prefer semantic HTML, keyboard accessibility, visible focus states, sufficient
  color contrast, useful alternative text, reduced-motion support, and a logical
  heading hierarchy.
- Prefer static output and progressive enhancement. Add client-side JavaScript
  only when it materially improves the experience.
- Preserve or deliberately replace SEO metadata, canonical URLs, social preview
  metadata, favicons, the custom domain, and analytics behavior.
- Optimize images and fonts, prevent layout shift, and avoid unnecessary third-
  party requests.
- Test the production build and inspect desktop, mobile, and print layouts after
  meaningful presentation changes.

## Privacy and public identity

The site may intentionally publish a name, professional portrait, professional
email address, and links to public professional profiles. Each is an explicit
content decision, not a default.

- Never add a home address, precise personal location, personal phone number,
  travel pattern, private email address, or hidden image/location metadata.
- A broad location such as a country, region, or time zone may be added only when
  it has clear professional value and the owner explicitly wants it public.
- Do not add new tracking, contact forms, data collection, or third-party embeds
  without documenting the privacy and maintenance implications.
- When replacing the portrait, keep it in `src/assets/`, strip hidden metadata,
  rebuild, and verify that only Astro-generated image variants appear in
  `dist/`. The typographic social card deliberately does not contain the face.

## Documentation

Use `docs/plans/YYYY-MM-DD-topic.md` for design decisions and implementation
plans that have not yet become current architecture. Use `docs/tasks/` only for
durable follow-up notes that are useful beyond an issue or pull request.

Update `docs/current-architecture.md` when an architectural change ships. Keep
future intent out of that document.

## Migration discipline

A redesign or rewrite is welcome when it earns its maintenance cost. Before
replacing the current site:

1. Write down the goals, non-goals, content model, visual direction, deployment
   target, migration steps, and rollback path in `docs/plans/`.
2. Separate the design/framework decision from the hosting decision; a custom
   site does not inherently require a server or a particular host.
3. Build and review the replacement before changing DNS or the production
   publishing source.
4. Preserve the current deployable version until the replacement is verified at
   a preview URL.
5. Remove obsolete implementation files and generated artifacts in the final
   migration change so two competing architectures do not linger.

## Git workflow

- Stay in the current worktree and do not switch branches unless the task calls
  for it.
- Use focused changes and Conventional Commit subjects (`feat:`, `fix:`,
  `docs:`, `chore:`, and similar) when committing.
- Do not rewrite published history or force-push.
- Do not commit generated `dist/`, `.astro/`, `node_modules/`, social-card
  output, credentials, or local environment files.
- Run checks proportionate to the change and report both completed verification
  and anything that could not be run.
- Commit, push, deploy, or open a pull request only when the user's task includes
  that workflow or they approve it.
