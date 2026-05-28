// scripts/build-llms-full.mjs
// Gera public/llms-full.txt — concatenação em markdown do conteúdo principal do site,
// permitindo que LLMs absorvam o site inteiro em um único request.
//
// Rodado via npm `prebuild` antes do vite build.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const BASE = "https://solvefy.com";

// ──────────────────────────────────────────────────────────
// 1. Páginas principais (metadados manuais espelhando <SEO> de cada página)
// ──────────────────────────────────────────────────────────

const pages = [
  {
    url: `${BASE}/`,
    title: "Solvefy — Plataforma B2B de Comunicação Multicanal",
    description:
      "A Solvefy conecta sua empresa aos clientes por WhatsApp, SMS, e-mail, voz e RCS. CRM, CPaaS, Marketing e Cloud em uma única plataforma.",
    body: `A Solvefy é uma plataforma B2B brasileira que unifica comunicação multicanal, CRM, automação de marketing, gestão de tráfego pago, agentes de IA e infraestrutura em nuvem. Atende empresas que precisam escalar atendimento e vendas integrando WhatsApp, SMS, RCS, voz e e-mail em um único fluxo operacional.

Diferenciais: integração nativa entre canais, infraestrutura própria (Solvefy/Cloud), agentes de IA prontos para uso (Solvefy/Agents) e tagline "+Perto. +Rápido. Melhor."`,
  },
  {
    url: `${BASE}/cpaas`,
    title: "Solvefy/CPaaS — Comunicação Programável via API",
    description:
      "Integre WhatsApp, SMS, RCS, voz e e-mail via API única. Plataforma CPaaS B2B com infraestrutura própria, alta entregabilidade e suporte a alto volume.",
    body: `Solvefy/CPaaS é a plataforma de comunicação programável da Solvefy. Permite que aplicações enviem e recebam mensagens em WhatsApp, SMS, RCS, voz e e-mail por uma API HTTP/JSON unificada. Suporta alto volume, possui infraestrutura própria e oferece templates aprovados, fluxos de fallback entre canais e dashboards de entregabilidade.

Casos de uso: notificações transacionais, OTP, atendimento, campanhas de marketing, recuperação de carrinho, alertas operacionais.`,
  },
  {
    url: `${BASE}/ads`,
    title: "Solvefy/Ads — Gestão de Tráfego Pago Inteligente",
    description:
      "Gerencie campanhas de mídia paga em Google, Meta e demais plataformas com automação, otimização e relatórios unificados.",
    body: `Solvefy/Ads é a solução da Solvefy para gestão de tráfego pago multi-plataforma (Google Ads, Meta Ads, TikTok Ads, LinkedIn). Centraliza criação, otimização, monitoramento e relatórios em um único painel. Aplica regras automatizadas de bid, criativos dinâmicos e attribution multi-touch.`,
  },
  {
    url: `${BASE}/marketing`,
    title: "Solvefy/Marketing — Automação Multicanal",
    description:
      "Crie jornadas automatizadas que combinam WhatsApp, SMS, e-mail e RCS para conversão e retenção em larga escala.",
    body: `Solvefy/Marketing é a plataforma de automação de marketing multicanal. Permite construir jornadas baseadas em comportamento e eventos do CRM, disparando comunicações no canal certo no momento certo (WhatsApp, SMS, RCS, e-mail). Inclui segmentação, A/B testing, atribuição e relatórios de ROI.`,
  },
  {
    url: `${BASE}/crm`,
    title: "Solvefy/CRM — Gestão de Relacionamento Omnichannel",
    description:
      "Centralize o relacionamento com clientes integrando canais, vendas, atendimento e dados em uma plataforma única.",
    body: `Solvefy/CRM é a plataforma de gestão de relacionamento da Solvefy. Concentra histórico unificado de contatos com integração nativa a todos os canais Solvefy/CPaaS, pipelines de vendas, automações e atendimento. Suporta times comerciais, SDR, customer success e suporte em um único banco de dados.`,
  },
  {
    url: `${BASE}/agents`,
    title: "Solvefy/Agents — Copiloto de IA para Vendas e Atendimento",
    description:
      "15+ agentes de IA prontos para uso em vendas, marketing, atendimento e operações. Sem prompt engineering, sem treinamento.",
    body: `Solvefy/Agents é o conjunto de agentes de IA da Solvefy. Disponibiliza mais de 15 agentes especializados em tarefas comerciais e operacionais — qualificação de leads, atendimento de pós-venda, redação de copy, análise de campanhas, recuperação de inadimplência, etc. Agentes acessam o contexto do Solvefy/CRM e disparam ações via Solvefy/CPaaS.

Plano Veloz a partir de R$ 80; plano Melhor R$ 80 (preços vigentes em 2026-05-14).`,
  },
  {
    url: `${BASE}/cloud`,
    title: "Solvefy/Cloud — Infraestrutura em Nuvem para Aplicações",
    description:
      "Hospede suas aplicações em infraestrutura cloud confiável, escalável e suportada por engenharia brasileira.",
    body: `Solvefy/Cloud é a infraestrutura em nuvem da Solvefy. Oferece hospedagem gerenciada para aplicações web, APIs e cargas críticas, com SLAs, suporte técnico em português e integração com os demais produtos Solvefy. Inclui calculadora de custo, configurações pré-validadas e migração assistida.`,
  },
  {
    url: `${BASE}/quem-somos`,
    title: "Quem Somos — A Solvefy",
    description:
      "Conheça a Solvefy: empresa brasileira de tecnologia especializada em comunicação multicanal, IA aplicada e infraestrutura para times B2B.",
    body: `A Solvefy é uma empresa brasileira de tecnologia sediada em Florianópolis, SC, com selo ACATE 2024. Especializada em comunicação multicanal B2B, IA aplicada e infraestrutura em nuvem, atende empresas que precisam escalar atendimento e vendas. CNPJ 35.693.806/0001-97.`,
  },
  {
    url: `${BASE}/contato`,
    title: "Contato — Fale com a Solvefy",
    description:
      "Entre em contato com nossa equipe comercial. Atendimento via formulário, WhatsApp e e-mail para empresas em todo o Brasil.",
    body: `Página de contato da Solvefy. Formulário comercial gerenciado via RD Station, com opções de canal por solução de interesse. Atendimento em todo o território brasileiro a partir de Florianópolis/SC.`,
  },
];

// ──────────────────────────────────────────────────────────
// 2. Posts do blog (corpo completo de mock-data.ts)
// ──────────────────────────────────────────────────────────

const mock = readFileSync(resolve(root, "src/lib/mock-data.ts"), "utf8");
const [postsSection = ""] = mock.split("export const MOCK_CATEGORIES");

// Cada post é um bloco { id: ..., title: ..., slug: ..., excerpt: ..., content: `...` }
// Capturamos title, slug, created_at, excerpt, content (template literal multilinha).
const postBlocks = [
  ...postsSection.matchAll(
    /\{\s*\n\s*id:\s*"[^"]+",\s*\n\s*title:\s*"([^"]+)",\s*\n\s*slug:\s*"([^"]+)",\s*\n\s*excerpt:\s*"([^"]+)",\s*\n[\s\S]*?created_at:\s*new Date\("([^"]+)"\)[\s\S]*?content:\s*`([\s\S]*?)`\s*\n\s*\}/g,
  ),
].map((m) => ({
  title: m[1],
  slug: m[2],
  excerpt: m[3],
  date: m[4].slice(0, 10),
  content: m[5],
}));

// HTML → markdown simples (conteúdo é Tiptap, gerado de forma previsível)
function htmlToMarkdown(html) {
  return html
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n")
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n")
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*")
    .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*")
    .replace(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n")
    .replace(/<\/?(ul|ol)[^>]*>/gi, "\n")
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ──────────────────────────────────────────────────────────
// 3. Montar llms-full.txt
// ──────────────────────────────────────────────────────────

const today = new Date().toISOString().slice(0, 10);

let out = `# Solvefy — Conteúdo completo do site

> Plataforma B2B de comunicação multicanal, CRM, automação de marketing, tráfego pago, agentes de IA e infraestrutura em nuvem.
> Empresa brasileira sediada em Florianópolis/SC. CNPJ 35.693.806/0001-97. Selo ACATE 2024.
> Idioma: pt-BR. Atualizado em ${today}.

---

## Páginas

`;

for (const p of pages) {
  out += `### ${p.title}

URL: ${p.url}
Descrição: ${p.description}

${p.body}

---

`;
}

out += `## Artigos do blog

`;

for (const post of postBlocks) {
  out += `### ${post.title}

URL: ${BASE}/blog/${post.slug}
Publicado: ${post.date}
Resumo: ${post.excerpt}

${htmlToMarkdown(post.content)}

---

`;
}

out += `## Contato

- Site: ${BASE}
- E-mail comercial: via formulário em ${BASE}/contato
- Sede: Florianópolis, SC, Brasil
- CNPJ: 35.693.806/0001-97
`;

writeFileSync(resolve(root, "public/llms-full.txt"), out, "utf8");

console.log(
  `[build-llms-full] wrote public/llms-full.txt — ` +
    `${pages.length} pages + ${postBlocks.length} posts, ${out.length} chars`,
);
