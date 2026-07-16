# Self-hosted deployment

The production artifact is static. The supplied container builds it with Astro
and serves only `dist/` through nginx on container port 8080.

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

DNS and the current GitHub Pages setting are external state and are not changed
by this repository. Disable the old Pages custom-domain publishing only after
the self-hosted preview is approved and production DNS has been verified.
