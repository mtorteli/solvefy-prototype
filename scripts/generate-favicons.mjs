// scripts/generate-favicons.mjs
// Gera os arquivos de favicon (SVG + PNGs em vários tamanhos + apple-touch-icon).
// Rodar manualmente: `npm run seo:favicons`. Os arquivos resultantes são commitados.

import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const BRAND_GREEN = "#00df71";
const BRAND_DARK = "#0F172A";

// Marca tipográfica: quadrado com cor da marca + letra "S" em peso Black.
// O "S" usa Pacaembu como primeira escolha; cai para system-ui se Pacaembu não
// estiver instalado no sistema (não afeta o resultado em produção — os PNGs são
// gerados uma vez e commitados).
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="${BRAND_GREEN}"/>
  <text x="256" y="370" font-family="Pacaembu, Inter, system-ui, sans-serif" font-weight="900" font-size="380" fill="${BRAND_DARK}" text-anchor="middle">S</text>
</svg>`;

writeFileSync(resolve(root, "public/favicon.svg"), faviconSvg, "utf8");
console.log("[favicons] public/favicon.svg");

const sizes = [
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-192x192.png", size: 192 },
  { name: "favicon-512x512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
];

for (const { name, size } of sizes) {
  await sharp(Buffer.from(faviconSvg))
    .resize(size, size)
    .png()
    .toFile(resolve(root, `public/${name}`));
  console.log(`[favicons] public/${name} (${size}x${size})`);
}

// Web manifest (PWA + ícones do Android Chrome)
const manifest = {
  name: "Solvefy",
  short_name: "Solvefy",
  description:
    "Plataforma B2B de comunicação multicanal, CRM, automação de marketing e infraestrutura em nuvem.",
  start_url: "/",
  display: "standalone",
  background_color: "#0F172A",
  theme_color: BRAND_GREEN,
  lang: "pt-BR",
  icons: [
    { src: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    {
      src: "/favicon-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable",
    },
  ],
};

writeFileSync(
  resolve(root, "public/site.webmanifest"),
  JSON.stringify(manifest, null, 2),
  "utf8",
);
console.log("[favicons] public/site.webmanifest");
