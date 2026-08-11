# iagoalonso.xyz

Iago Alonso's personal website and professional CV. It is a custom Astro site
that builds to static HTML, CSS, and optimized images with no client-side
JavaScript or third-party browser requests.

## Development

Requires Node.js 22.12 or newer. Node.js 24 is used in CI and the container
build.

```bash
npm install
npm run dev
```

The main commands are:

```bash
npm run check         # Astro and TypeScript diagnostics
npm run format:check  # formatting validation
npm run build         # production build and output/privacy checks
npm test              # all repository-level application checks
```

## Structure

- `src/data/site.ts` — professional content and public profile data.
- `src/pages/` — static routes.
- `src/components/` — reusable presentation components.
- `src/styles/global.css` — design system, responsive layout, and print styles.
- `src/assets/profile.jpeg` — source avatar; transformed variants are the only
  copies published by the build.
- `scripts/` — deterministic social-card generation and production-output
  checks.
- `deploy/` — unprivileged static nginx configuration.
- `docs/deployment.md` — self-hosting and Cloudflare guidance.

## Production

```bash
docker compose up --build
```

The container binds to `127.0.0.1:8080` by default and is intended to sit behind
a host reverse proxy or Cloudflare Tunnel. The planned source repository is the
public `ibLeDy/iagoalonso.xyz` repository with `main` as its default branch. See
[deployment](docs/deployment.md) before creating the repository or changing DNS
or the current GitHub Pages configuration.

## Privacy

The generated site includes only the deliberately public name, professional
email, portrait, work history, and profile links. It has no visitor-side
analytics, remote fonts, contact form, exact location, phone number, or embedded
third-party content. The build checks guard against reintroducing common tracking
origins and structured address fields.

## Licensing

The original source code for this Astro site is available under the
[MIT License](LICENSE). Personal CV text and data, the portrait, and personal
branding are not included in that software license and remain copyright Iago
Alonso, all rights reserved. See [CONTENT-LICENSE.md](CONTENT-LICENSE.md) for the
exact boundary. Third-party dependencies remain subject to their own licenses.
