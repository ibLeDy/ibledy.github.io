# Self-hosted deployment

The production artifact is static. The supplied container builds it with Astro
and serves only `dist/` through nginx on container port 8080.

## Verified migration baseline

As verified on 2026-08-11, GitHub repository `ibLeDy/ibledy.github.io` uses
`gh-pages` as both its default branch and the GitHub Pages publishing source for
`iagoalonso.xyz`. The live legacy revision is `0e39e3f`, including the
illustrated avatar. The older revision `3a6e48a` remains preserved as branch
`legacy-pages` and annotated tag `pre-astro-pages-2026-07-23`.

The Astro work remains on `codex/astro-rebuild`, but its draft PR is a staging
surface only. The intended destination is a dedicated public
`ibLeDy/iagoalonso.xyz` repository with `main` as its default branch. Do not
merge the Astro work into `ibLeDy/ibledy.github.io`; preserving that repository
unchanged keeps the current Pages site available for rollback and later reuse.

## Dedicated repository

Create `ibLeDy/iagoalonso.xyz` as a public repository initialized with a minimal
`main`. Import the validated Astro tree on a feature branch and open a draft PR
there. Start with a clean history instead of copying the legacy Jekyll/Sproogen
history. Keep personal content covered by `CONTENT-LICENSE.md` and never commit
server credentials, Cloudflare tokens, `.env` files, access logs, or private
operational details.

The old branch and PR remain recoverable migration evidence until the new PR and
preview are verified. Close the old PR as superseded only after the destination
PR exists and points to the validated tree.

## Preview locally

```bash
docker compose up --build
```

The default host endpoint is `http://127.0.0.1:8080`. Set `SITE_PORT` if that
port is already in use.

## VPS topology

Recommended public request path:

```text
Browser -> Cloudflare proxy -> TLS host reverse proxy or Cloudflare Tunnel
        -> 127.0.0.1:8080 -> static nginx container
```

The Compose mapping deliberately binds only to loopback. Do not change it to
`0.0.0.0` unless a firewall and an intentional origin-access policy are in
place.

For a conventional public origin:

1. Put a host nginx, Caddy, or equivalent reverse proxy in front of port 8080.
2. Install a Cloudflare Origin CA or publicly trusted certificate on the origin.
3. Use Cloudflare SSL/TLS mode **Full (strict)**, never Flexible.
4. Proxy the public DNS record and redirect one of `www` or the apex domain to
   the chosen canonical hostname.
5. Restrict origin ingress to Cloudflare IP ranges if operationally practical,
   and automate updates to that allowlist.

Cloudflare Tunnel is a reasonable alternative when hiding the origin address or
avoiding inbound web ports is worth the additional daemon and credential. Keep
its token outside the repository.

## Privacy and caching

The site makes no analytics, font, image, or JavaScript requests to third-party
origins. Cloudflare and the VPS will still receive normal HTTP request data. Use
short, access-controlled log retention and avoid enabling browser-fingerprint or
marketing products unless the privacy decision changes.

Hashed Astro assets can be cached immutably. HTML should retain a short cache or
revalidation policy so CV updates become visible quickly. The included nginx
configuration applies those origin defaults; Cloudflare cache rules should not
override HTML with a long edge TTL.

## Release and rollback

Build a uniquely tagged image in CI, deploy it to a preview hostname, and run a
smoke request before moving production traffic. Retain the previous image tag so
rollback is a container restart rather than a rebuild.

### Non-destructive migration

1. Create the dedicated public repository with a minimal `main` branch.
2. Import the validated Astro tree on a feature branch and open a draft PR.
3. Deploy the exact destination-PR commit to a private or access-controlled VPS
   preview hostname.
4. Verify status codes, TLS, security headers, caching, canonical redirects,
   `/healthz`, third-party requests, desktop/mobile layouts, and print output.
5. Mark the destination PR ready, merge it into `main`, and deploy that exact
   merge commit to the preview before changing public traffic.
6. Confirm that the old `ibLeDy/ibledy.github.io` Pages site still serves the
   current legacy site and avatar as the rollback target.
7. Point the Cloudflare proxied record or Tunnel route at the VPS origin.
8. Verify the public site from outside the origin network.
9. Retain the old Pages configuration, rollback refs, and previous container
   image for an agreed observation window.
10. Detach the custom domain from the old Pages repository only after the new
    origin has remained stable; the old repository can then be repurposed.

> [!CAUTION]
> 🔴 **DANGER** — Changing the Cloudflare origin or detaching the custom domain
> from the old GitHub Pages repository affects production and rollback. Capture
> current settings, perform one change at a time, verify after each change, and
> obtain explicit confirmation immediately before each write.

### Rollback

During the observation window, restore the prior Cloudflare DNS/origin target
and verify that the unchanged `gh-pages` site serves the existing site. After
the old custom-domain configuration is retired, restart the previously retained
container image and restore its Cloudflare origin route. Do not delete the old
repository, rollback refs, or previous image as part of the initial cutover.

DNS, Cloudflare, GitHub Pages, and VPS configuration are external state. This
repository documents but does not mutate them.

## ⚠️ Attention and behavior changes

> [!CAUTION]
> 🛑 **BLOCKER** — Repository publication cannot proceed until the recommended
> public `ibLeDy/iagoalonso.xyz` destination is confirmed and created.

> [!CAUTION]
> 🛑 **BLOCKER** — An external preview cannot be deployed until the VPS host,
> access method, preview hostname, reverse-proxy or Tunnel choice, and Cloudflare
> context are explicitly identified.

> [!IMPORTANT]
> 🔵 **BEHAVIOR CHANGE** — The production origin moves from GitHub Pages to the
> VPS, and source moves to a dedicated repository using `main`. The old Pages
> repository remains the rollback target during observation.

> [!IMPORTANT]
> 🟣 **VISUAL QA** — Approve desktop, mobile, and print output from the exact
> image intended for production before changing external traffic.
