# Self-hosted deployment

The production artifact is static. The supplied container builds it with Astro
and serves only `dist/` through nginx on container port 8080.

## Verified migration baseline

As verified on 2026-07-23, GitHub repository `ibLeDy/ibledy.github.io` uses
`gh-pages` as both its default branch and the legacy GitHub Pages publishing
source for `iagoalonso.xyz`. The recoverable pre-Astro revision is `3a6e48a` and
is preserved remotely as:

- branch `legacy-pages`;
- annotated tag `pre-astro-pages-2026-07-23`.

The Astro work remains on `codex/astro-rebuild`. Targeting `gh-pages` in the PR
does not require GitHub Pages to remain the production host.

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

1. Deploy the exact PR commit to a private or access-controlled VPS preview
   hostname.
2. Verify status codes, TLS, security headers, caching, canonical redirects,
   `/healthz`, third-party requests, desktop/mobile layouts, and print output.
3. Change the GitHub Pages publishing source from `gh-pages` to `legacy-pages`.
4. Verify that `iagoalonso.xyz` still serves the unchanged legacy site from the
   preserved branch.
5. Point the Cloudflare proxied record or Tunnel route at the VPS origin.
6. Verify the public site from outside the origin network before merging.
7. Merge the Astro PR into `gh-pages` after production traffic reaches the VPS.
8. Retain GitHub Pages, the rollback branch/tag, and the previous container image
   for an agreed observation window.
9. Disable GitHub Pages only after the new origin has remained stable.

> [!CAUTION]
> 🔴 **DANGER** — Changing either the GitHub Pages source or the Cloudflare
> origin affects production. Capture the current settings, perform one change at
> a time, verify after each change, and obtain explicit confirmation immediately
> before each write.

### Rollback

Before GitHub Pages is disabled, restore the prior Cloudflare DNS/origin target
and verify that `legacy-pages` serves the existing site. After Pages is retired,
restart the previously retained container image and restore its Cloudflare
origin route. Do not delete the rollback branch, tag, or previous image as part
of the initial cutover.

DNS, Cloudflare, GitHub Pages, and VPS configuration are external state. This
repository documents but does not mutate them.

## ⚠️ Attention and behavior changes

> [!CAUTION]
> 🛑 **BLOCKER** — An external preview cannot be deployed until the VPS host,
> access method, preview hostname, reverse-proxy or Tunnel choice, and Cloudflare
> context are explicitly identified.

> [!IMPORTANT]
> 🔵 **BEHAVIOR CHANGE** — The production origin moves from GitHub Pages to the
> VPS; the `gh-pages` branch remains the source-code trunk after migration.

> [!IMPORTANT]
> 🟣 **VISUAL QA** — Approve desktop, mobile, and print output from the exact
> image intended for production before changing external traffic.
