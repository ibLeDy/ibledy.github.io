import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const dist = path.resolve("dist");
const requiredFiles = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "og-card.png",
];

for (const file of requiredFiles) {
  await access(path.join(dist, file));
}

const html = await readFile(path.join(dist, "index.html"), "utf8");
const requiredFragments = [
  "<title>Iago Alonso — Systems &amp; Platform Engineer</title>",
  'rel="canonical" href="https://iagoalonso.xyz/"',
  'property="og:image" content="https://iagoalonso.xyz/og-card.png"',
  'type="application/ld+json"',
  'href="#main-content"',
];

for (const fragment of requiredFragments) {
  if (!html.includes(fragment)) {
    throw new Error(`Missing expected production markup: ${fragment}`);
  }
}

const forbiddenFragments = [
  "cloudflareinsights.com",
  "googletagmanager.com",
  "google-analytics.com",
  "facebook.net",
  "streetAddress",
  "postalCode",
  "addressLocality",
];

for (const fragment of forbiddenFragments) {
  if (html.includes(fragment)) {
    throw new Error(
      `Forbidden privacy-sensitive production markup found: ${fragment}`,
    );
  }
}

const assets = await readdir(path.join(dist, "_astro"));
if (!assets.some((file) => /profile\..+\.(avif|webp)$/.test(file))) {
  throw new Error("Optimized portrait variants were not generated");
}

console.log("Production output checks passed");
