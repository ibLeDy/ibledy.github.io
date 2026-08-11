import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDirectory = path.resolve("public");
const outputFile = path.join(outputDirectory, "og-card.png");

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#11130f"/>
  <circle cx="1030" cy="82" r="290" fill="#caf562" opacity=".07"/>
  <path d="M0 116h1200M0 514h1200" stroke="#f3f0e7" stroke-opacity=".13"/>
  <path d="M92 116v398M1108 116v398" stroke="#f3f0e7" stroke-opacity=".13"/>
  <text x="92" y="78" fill="#caf562" font-family="ui-monospace, monospace" font-size="20" font-weight="700" letter-spacing="3">IAGO ALONSO / SYSTEMS &amp; PLATFORM ENGINEER</text>
  <text x="88" y="264" fill="#f3f0e7" font-family="Arial, sans-serif" font-size="92" font-weight="650" letter-spacing="-5">Production systems,</text>
  <text x="88" y="372" fill="#caf562" font-family="Georgia, serif" font-size="105" font-style="italic" letter-spacing="-5">made calmer.</text>
  <text x="92" y="566" fill="#7e8275" font-family="ui-monospace, monospace" font-size="18" font-weight="600" letter-spacing="2">IAGOALONSO.XYZ</text>
  <circle cx="1089" cy="557" r="9" fill="#caf562"/>
</svg>`;

await mkdir(outputDirectory, { recursive: true });
await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, palette: true })
  .toFile(outputFile);
console.log(`Generated ${path.relative(process.cwd(), outputFile)}`);
