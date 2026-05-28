// scripts/generate-og-images.mjs
// Gera imagens Open Graph (1200×630) por rota, em public/og/.
// Rodar manualmente: `npm run seo:og`. Os JPEGs resultantes são commitados.
//
// Layout: fundo dark com gradiente, faixa verde inferior (cor da marca),
// "SOLVEFY" + título da página + descrição curta em pt-BR.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const BRAND_GREEN = "#00df71";
const BRAND_DARK_FROM = "#0F172A";
const BRAND_DARK_TO = "#1E293B";

const ogDir = resolve(root, "public/og");
mkdirSync(ogDir, { recursive: true });

const pages = [
  {
    file: "og-default.jpg",
    title: "Solvefy",
    subtitle:
      "Plataforma B2B de comunicação multicanal, CRM e infraestrutura.",
  },
  {
    file: "og-home.jpg",
    title: "Comunicação B2B Multicanal",
    subtitle:
      "WhatsApp, SMS, RCS, voz e e-mail integrados ao seu CRM e fluxos.",
  },
  {
    file: "og-cpaas.jpg",
    title: "Solvefy/CPaaS",
    subtitle: "Comunicação programável via API com alta entregabilidade.",
  },
  {
    file: "og-ads.jpg",
    title: "Solvefy/Ads",
    subtitle: "Gestão de tráfego pago inteligente em Google, Meta e mais.",
  },
  {
    file: "og-marketing.jpg",
    title: "Solvefy/Marketing",
    subtitle: "Automação multicanal de jornadas e campanhas em escala.",
  },
  {
    file: "og-crm.jpg",
    title: "Solvefy/CRM",
    subtitle: "Gestão de relacionamento omnichannel para times B2B.",
  },
  {
    file: "og-agents.jpg",
    title: "Solvefy/Agents",
    subtitle: "15+ agentes de IA prontos para vendas, marketing e atendimento.",
  },
  {
    file: "og-cloud.jpg",
    title: "Solvefy/Cloud",
    subtitle: "Infraestrutura em nuvem para hospedar e escalar suas aplicações.",
  },
  {
    file: "og-quem-somos.jpg",
    title: "Quem Somos",
    subtitle: "A Solvefy: empresa brasileira de tecnologia B2B em Florianópolis.",
  },
  {
    file: "og-contato.jpg",
    title: "Fale com a Solvefy",
    subtitle: "Atendimento comercial e técnico em todo o Brasil.",
  },
  {
    file: "og-blog.jpg",
    title: "Blog Solvefy",
    subtitle: "Artigos, guias e novidades sobre comunicação B2B.",
  },
];

// Quebra a linha do título em até 2 linhas com largura aproximada de 24
// caracteres por linha (font-size 88 cabe ~24 chars em 1200px).
function wrapTitle(text, maxChars = 24) {
  if (text.length <= maxChars) return [text];
  const words = text.split(/\s+/);
  const lines = [""];
  for (const word of words) {
    const candidate = lines[lines.length - 1]
      ? `${lines[lines.length - 1]} ${word}`
      : word;
    if (candidate.length > maxChars && lines[lines.length - 1]) {
      lines.push(word);
    } else {
      lines[lines.length - 1] = candidate;
    }
  }
  return lines.slice(0, 2);
}

function wrapSubtitle(text, maxChars = 60) {
  if (text.length <= maxChars) return [text];
  const words = text.split(/\s+/);
  const lines = [""];
  for (const word of words) {
    const candidate = lines[lines.length - 1]
      ? `${lines[lines.length - 1]} ${word}`
      : word;
    if (candidate.length > maxChars && lines[lines.length - 1]) {
      lines.push(word);
    } else {
      lines[lines.length - 1] = candidate;
    }
  }
  return lines.slice(0, 2);
}

function escapeSvg(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildSvg({ title, subtitle }) {
  const titleLines = wrapTitle(title).map(escapeSvg);
  const subtitleLines = wrapSubtitle(subtitle).map(escapeSvg);

  const titleY0 = titleLines.length === 2 ? 280 : 340;
  const titleTspans = titleLines
    .map(
      (line, i) =>
        `<tspan x="80" y="${titleY0 + i * 110}">${line}</tspan>`,
    )
    .join("");

  const subtitleY0 = titleY0 + titleLines.length * 110 + 40;
  const subtitleTspans = subtitleLines
    .map(
      (line, i) =>
        `<tspan x="80" y="${subtitleY0 + i * 48}">${line}</tspan>`,
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND_DARK_FROM}"/>
      <stop offset="100%" stop-color="${BRAND_DARK_TO}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="600" width="1200" height="30" fill="${BRAND_GREEN}"/>
  <circle cx="1090" cy="120" r="56" fill="${BRAND_GREEN}" opacity="0.18"/>
  <text x="80" y="140" font-family="Pacaembu, Inter, system-ui, sans-serif" font-weight="900" font-size="42" letter-spacing="6" fill="${BRAND_GREEN}">SOLVEFY</text>
  <text font-family="Pacaembu, Inter, system-ui, sans-serif" font-weight="900" font-size="88" fill="#FFFFFF">
    ${titleTspans}
  </text>
  <text font-family="Pacaembu, Inter, system-ui, sans-serif" font-weight="400" font-size="32" fill="#94A3B8">
    ${subtitleTspans}
  </text>
  <text x="80" y="570" font-family="Pacaembu, Inter, system-ui, sans-serif" font-weight="700" font-size="22" letter-spacing="4" fill="${BRAND_GREEN}">+Perto. +Rápido. Melhor.</text>
</svg>`;
}

for (const page of pages) {
  const svg = buildSvg(page);
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(resolve(ogDir, page.file));
  console.log(`[og] public/og/${page.file} — "${page.title}"`);
}

console.log(`[og] generated ${pages.length} images`);
