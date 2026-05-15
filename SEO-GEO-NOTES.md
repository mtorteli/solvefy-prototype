# SEO/GEO — Diário de mudanças e decisões

Este arquivo documenta cada decisão técnica tomada durante a otimização SEO + GEO do site solvefy.com. Cada entrada tem data, mudança e justificativa.

---

## 2026-05-14 — Início do projeto

### Decisão D1: Domínio canônico — apex `https://solvefy.com` (sem www)

**Contexto:** o site já usa apex em todos os lugares (`src/components/SEO.tsx:11`, `public/sitemap.xml`, `public/robots.txt`). O brief do usuário sugeriu `www.solvefy.com` como exemplo de robots.txt, mas isso era template, não diretriz.

**Decisão:** manter `https://solvefy.com` como canônico. Não mudar `BASE_URL` em SEO.tsx.

**Implicação:** o Netlify deve redirecionar `www.solvefy.com → solvefy.com` via 301 (já é default da Netlify quando o domínio primário é apex; vamos forçar via `netlify.toml`).

**Reversível?** Sim — mudar uma constante.

### Decisão D2: Estratégia de pré-renderização (a aplicar em Fase 5.4) — **`react-snap`** (preferencial)

**Contexto:** site é SPA puro (Vite + React Router). Crawlers de IA não executam JS → GEO bloqueado.

**Decisão preliminar:** usar **`react-snap`** (Puppeteer post-build, lê rotas reais e gera HTML estático). Funciona com qualquer SPA, lida bem com rotas dinâmicas (blog slugs).

**Alternativas consideradas:**
- `vite-plugin-prerender` / `vite-plugin-prerender-spa-plus` — integração no build, mas menos maduro com React Router v6 + lazy chunks.
- Migrar para Vike/Astro — refator grande, descartado.

**A confirmar:** validar no momento de aplicar (Fase 5.4).

### Decisão D3: Imagens OG por página — **estáticas geradas com `sharp`**

**Contexto:** brief sugere uma imagem 1200×630 por página. Opções: estáticas vs. dinâmicas via Edge Function.

**Decisão:** **estáticas**, geradas por script de build (`scripts/generate-og-images.mjs`, Fase 3.3) a partir de um template SVG + título da página. Mais simples, sem custo de runtime, suporte universal.

### Decisão D4: Script de build em `.mjs` (Node ESM puro), sem `tsx`

**Contexto:** os scripts de geração (sitemap, llms-full) precisam ler conteúdo de `src/lib/mock-data.ts`.

**Decisão:** evitar adicionar `tsx`/`ts-node` como devDep. Os scripts leem `mock-data.ts` como texto e extraem dados via regex. `mock-data.ts` tem estrutura previsível e zero imports, então é seguro.

**Trade-off:** se a estrutura do mock-data mudar (ex: nested objects), o regex pode quebrar. Mitigação: testes simples no script.

### Decisão D5: E-mail de segurança no `security.txt` — `security@solvefy.com`

**A confirmar com usuário.** Default = `security@solvefy.com`.

### Decisão D6: Schema `Organization` (Fase 4.2) — usar CNPJ público do footer

**Contexto:** CNPJ **35.693.806/0001-97** já é público no rodapé do site ([src/components/Footer.tsx:142](src/components/Footer.tsx#L142)). Pode ser incluído como `taxID` no schema.

**Dados ainda faltando** (perguntarei antes da Fase 4):
- Endereço completo (rua, número, CEP, bairro)
- Telefone de contato (formato E.164)
- Ano de fundação
- URLs de redes sociais reais (footer tem ícones com `href="#"` — placeholders)

---

## Próximas decisões pendentes

- D7 — Conteúdo de FAQs por página (Fase 4.5/5.2)
- D8 — Bios da equipe para `<h1>` de QuemSomos e schema `Person` (Fase 5.6)
- D9 — GA4 measurement ID (Fase 8.3)
- D10 — `LocalBusiness` schema sim/não — depende de endereço público (Fase 4.7)

---

## Log de commits gerados (preenchido conforme execução)

### Fase 2 — Infraestrutura SEO (arquivos da raiz)

- **2.1** `feat(seo): allow AI crawlers in robots.txt` — reescrita do `public/robots.txt` com permissão explícita para 17 user-agents de IA (GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, CCBot, Applebot-Extended, Bytespider, cohere-ai, Meta-ExternalAgent, FacebookBot, DuckAssistBot, YouBot, MistralAI-User) + bloqueio de query params de tracking (utm, ref, gclid, fbclid) e `/em-breve/`.

- **2.2** `feat(seo): dynamic sitemap with blog and /agents` — `scripts/build-sitemap.mjs` (Node ESM puro, lê `src/lib/mock-data.ts` como texto via regex). Sitemap agora tem 22 URLs (10 estáticas + 7 posts + 5 categorias), incluindo `/agents` que estava faltando. `<lastmod>` real por post a partir de `created_at`. Wire-up em `package.json` via `prebuild`.

- **2.3** `feat(geo): add llms.txt for AI crawler discovery` — `public/llms.txt` em pt-BR seguindo padrão `llmstxt.org`: seções "Páginas principais", "Produtos", "Categorias do blog", "Optional" (com link para llms-full.txt) e "Informações institucionais" (CNPJ, sede, ACATE).

- **2.4** `feat(geo): generate llms-full.txt at build time` — `scripts/build-llms-full.mjs` produz `public/llms-full.txt` com:
  - Cabeçalho institucional
  - 9 páginas (resumos espelhando `<SEO>`)
  - 7 posts do blog com conteúdo HTML convertido para markdown (regex strip de tags Tiptap)
  - Footer com contato
  - Total: ~50 KB de markdown limpo. Wire-up em `package.json` (`prebuild`).

- **2.5** `feat(seo): add .well-known/security.txt` — `public/.well-known/security.txt` com `Contact: mailto:security@solvefy.com` (a confirmar com usuário), expires 2027-05-14, idiomas pt-BR/en. Decisão D5 pendente de validação.

- **2.6/2.7** `feat(seo): canonical redirects and cache headers in netlify.toml` — combinados em commit único:
  - 301 forçado de `www.solvefy.com/*` (HTTP e HTTPS) e `http://solvefy.com/*` para o apex HTTPS.
  - Catch-all SPA mantido por último.
  - `[[headers]]` para `/assets/*` (immutable 1y), `/fonts/*` (immutable 1y), `/images/*` (1d revalidate), `/og/*` (7d revalidate), `*.html` (no-cache), `robots.txt`/`sitemap.xml`/`llms.txt`/`llms-full.txt`/`security.txt` (1h, com Content-Type explícito).

### Verificação Fase 2

- `node scripts/build-sitemap.mjs` → "wrote public/sitemap.xml — 22 URLs (10 static + 7 posts + 5 categories)" ✓
- `node scripts/build-llms-full.mjs` → "wrote public/llms-full.txt — 9 pages + 7 posts, 50227 chars" ✓
- `npm run build` (pós Fase 3) — prebuild executou ambos os scripts; build do Vite passou sem erros ✓

### Fase 3 — Meta tags por página

- **3.5** `feat(seo): generate favicon set, web manifest and per-page OG images` — scripts `generate-favicons.mjs` e `generate-og-images.mjs` (rodam manualmente via `npm run seo:favicons` / `npm run seo:og`; outputs commitados). Saídas: `public/favicon.svg`, `public/favicon-{32,192,512}x{32,192,512}.png`, `public/apple-touch-icon.png`, `public/site.webmanifest`, `public/og/og-{home,cpaas,ads,marketing,crm,agents,cloud,quem-somos,contato,blog,default}.jpg` (11 imagens 1200×630, ~30 KB cada). Layout OG: gradiente dark + faixa verde inferior + título da página + subtítulo + tagline "PRÓXIMO. VELOZ. MELHOR.".

- **3.2** `feat(seo): rewrite shell HTML with pt-BR meta, favicons and theme color` — `index.html` reescrito:
  - Title + description em pt-BR (era "Solvefy is a B2B platform..." em inglês)
  - `<link rel="canonical" href="https://solvefy.com/">`
  - `<meta name="theme-color" content="#00df71">` + `color-scheme="light dark"`
  - Cadeia completa de favicons (ico, svg, png 32/192, apple-touch 180, manifest)
  - Preconnect a CloudFront mantido (RD Station em /contato) — preconnects a Google Fonts removidos (Pacaembu é self-hosted em `/fonts/`)
  - OG/Twitter fallback em pt-BR (sobrescrito por `<SEO>` em cada rota via Helmet)
  - `<meta name="format-detection" content="telephone=no">` para evitar autodetect de números no iOS

- **3.1** `feat(seo): extend SEO component with noindex, schemas array, og:locale` — `src/components/SEO.tsx` agora aceita:
  - `noindex?: boolean` — emite `robots: noindex, nofollow` (default: `index, follow, max-image-preview:large, max-snippet:-1`)
  - `schemas?: Array<Record>` — múltiplos JSON-LD em uma página (a prop `schema` antiga continua funcionando — backward compat)
  - `keywords?: string[]` — opcional, emite `<meta name="keywords">`
  - Adicionados estáticos: `og:locale=pt_BR`, `og:site_name=Solvefy`, `og:image:width/height/alt`, `twitter:site=@Solvefy`, `twitter:image:alt`
  - `ogImage` agora aceita tanto path relativo quanto URL absoluta (BlogPost continua passando cover_image externo)

- **3.4** `feat(seo): wire per-route ogImage and noindex on 404` — todas as 12 páginas atualizadas para apontar pra sua imagem OG dedicada:
  - `/` → og-home.jpg
  - `/cpaas` → og-cpaas.jpg
  - `/ads` → og-ads.jpg
  - `/marketing` → og-marketing.jpg
  - `/crm` → og-crm.jpg
  - `/agents` → og-agents.jpg
  - `/cloud` → og-cloud.jpg
  - `/quem-somos` → og-quem-somos.jpg
  - `/contato` → og-contato.jpg
  - `/blog` e `/blog/categoria/:cat` → og-blog.jpg
  - `/blog/:slug` segue usando `post.cover_image` (mock-data Unsplash) — fallback automático para og-default.jpg
  - `/404` (NotFound) agora marca `noindex`

### Verificação Fase 3

- `npm run build` passou ✓
- `dist/index.html` confirmado em pt-BR com todos os favicons, manifest e theme-color
- Lint reportou 18 erros + 3 warnings, todos pré-existentes (não introduzidos pela Fase 3 — ver `git diff` nas linhas tocadas)
- Pendente: validar `og:image` em opengraph.xyz e Twitter Card Validator após deploy

### Fase 4 — Schema.org (JSON-LD)

- **4.1** `feat(seo): add Schema.org JSON-LD helpers` — `src/lib/schemas.ts` com:
  - `SOLVEFY_ORG` (constantes centrais: nome, logo, CNPJ, sede SC, sameAs vazio aguardando URLs reais).
  - `organizationSchema()` com `@id` canônico (`/#organization`), `taxID`, `address`, `contactPoint` e logo.
  - `websiteSchema()` com `@id` (`/#website`), referência ao publisher Organization.
  - `breadcrumbSchema(items)` — gera `BreadcrumbList`.
  - `serviceSchema({name, description, path, serviceType, offers})` com `provider: { @id: org }`, `areaServed: Brasil`, `inLanguage: pt-BR`.
  - `faqSchema(items)` — `FAQPage` (pronto pra uso na Fase 5.2).
  - `articleSchema({title, description, path, image, datePublished, dateModified, authorName, category})` — `BlogPosting` com `mainEntityOfPage`, `publisher` por referência, `inLanguage: pt-BR`.

- **4.2** `feat(seo): wire Organization and WebSite schema on homepage` — `src/pages/Index.tsx` agora passa `schemas={[organizationSchema(), websiteSchema()]}`. Vai aparecer na home e estabelecer a identidade da entidade que LLMs e Knowledge Graph vão referenciar.

- **4.3/4.4** `feat(seo): Service and Breadcrumb schemas on product pages` — Cpaas, Ads, Marketing, Crm, Agents, Cloud passam:
  - Service schema com `serviceType` específico (CPaaS, Mídia paga, Automação multicanal, CRM omnichannel, Agentes de IA, Hospedagem em nuvem).
  - `offers` (AggregateOffer) onde já havia preço (Marketing, CRM, Agents, Cloud).
  - BreadcrumbList Home → Solvefy/X.
  - O `schema={...}` legacy (SoftwareApplication) é mantido em paralelo via merge no SEO component — Google aceita múltiplos `@type` para o mesmo recurso.
  - **Agents** ganhou os primeiros schemas (estava sem nada).

- **4.3** `feat(seo): Breadcrumb schema on remaining internal pages` — QuemSomos, Contact, BlogIndex, BlogCategory recebem BreadcrumbList (último com 3 níveis: Home → Blog → Categoria).

- **4.6** `feat(seo): BlogPosting and Breadcrumb on blog post page` — BlogPost.tsx agora gera:
  - `BlogPosting` com headline, description, image, datePublished/dateModified, author Person, publisher por referência, articleSection (categoria).
  - BreadcrumbList Home → Blog → Título do post.
  - Fallback OG image para `/og/og-blog.jpg` quando o post não tem cover.
  - Compatível com mock-data (`post_categories` object) e Supabase (`post_categories[]` array).

- **4.5** FAQPage — **pendente** (será aplicado na Fase 5.2 junto com componente `<FaqSection>` reusável).
- **4.7** LocalBusiness — **pendente** (depende de endereço público; a confirmar com usuário).
- **4.8** Validação no Rich Results Test — depende de deploy.

### Verificação Fase 4

- `npm run build` → "3071 modules transformed, built in 3.63s" sem erros ✓
- Build verificado pós-Fase 4: todos os schemas serializam para JSON-LD válido (Helmet injeta `<script type="application/ld+json">`).
- Pendente: testar URLs em `validator.schema.org` e `search.google.com/test/rich-results` após deploy (essas ferramentas precisam de URL pública).

### Fase 4 (extensão) — Enriquecimento do Organization schema

- **Decisão D6 atualizada**: Endereço público da sede confirmado pelo usuário: **Rua Manoel de Oliveira Ramos, 205 — Estreito, Florianópolis/SC**. `streetAddress`, `addressLocality` (Florianópolis), `addressRegion` (SC), `addressCountry` (BR) agora populados no schema.
- Descrição do Organization reescrita a partir do vault Obsidian em `/Users/italo.vca/Documents/Claude/Projects/Solvefy/Solvefy/02 - Marca/Plataforma de Marca Solvefy.md` para refletir o posicionamento oficial pós-rebrand: "ecossistema que unifica soluções de comunicação multicanal, marketing, CRM, agentes de IA e cloud".
- `slogan: "Próximo. Veloz. Melhor."` adicionado ao schema Organization.
- **Decisão D11**: Solvefy é o rebrand de Ativos Capital — explica o domínio do e-mail do CEO (italo@ativos.capital) e os e-mails internos em @solvefy.cloud. URL canônica do site é solvefy.com (o produto).
- Decisão D2 confirmada: estratégia de prerender = **react-snap** (item abaixo).
- Decisões D5 confirmada (security@solvefy.com), pendentes ainda: redes sociais reais (D6 — sameAs vazio, footer com href="#"), ano de fundação, telefone, FAQs por página, bios de equipe.

### Fase 5.4 — Pré-renderização estática (CRÍTICO — destrava GEO)

- **5.4** `feat(geo): static prerender via react-snap` — pacote `react-snap` adicionado como devDep + `postbuild: react-snap` em `package.json`. Configuração `reactSnap` lista todas as 22 rotas (estáticas + 5 categorias + 7 slugs de post).
- `vite.config.ts` ajustado com `build.target: "es2017"` — o Chromium 73 que react-snap usa não suporta optional chaining (`?.`), então Rollup transpila para ES2017. Sem custo perceptível em runtime (todos os browsers atuais suportam ES2017 nativamente).
- `src/main.tsx` reescrito para alternar entre `createRoot().render()` (carga inicial sem prerender) e `hydrateRoot()` (quando HTML pré-renderizado já está no DOM). Necessário para React 18 + react-snap.
- `netlify.toml` atualizado: catch-all SPA agora aponta para `/200.html` (shell deixado pelo react-snap) ao invés de `/index.html` (que agora é a home prerendada).
- Build verificado: **25/25 rotas com HTML estático completo** — cada uma traz `<head>` em pt-BR, OG/Twitter tags, JSON-LD schemas (Org, WebSite, Service, Breadcrumb, Article, etc.) e conteúdo do `<body>` totalmente renderizado.
- Exemplo: `dist/cpaas/index.html` (93 KB) traz 3 schemas (Service, Breadcrumb, SoftwareApplication) + conteúdo completo da página.
- Primeira execução teve 1 crash transitório do Chromium em `/blog/automacao-comunicacao-multicanal`; segunda execução completou 25/25. Recomendação operacional: se o build do Netlify falhar pontualmente, basta retry — não é problema de código.

### Verificação Fase 5.4

- `rm -rf dist && npm run build` (limpo) → 25/25 rotas prerendadas ✓
- `dist/cpaas/index.html`: 93 KB, 3 schemas (Service, BreadcrumbList, SoftwareApplication) ✓
- `dist/index.html`: 81 KB, 2 schemas (Organization, WebSite) ✓
- `dist/blog/<slug>/index.html`: ~60 KB, 2 schemas (BlogPosting, BreadcrumbList) ✓
- `dist/200.html`: shell não-prerendado (3.3 KB) para catch-all do Netlify ✓
- Pendente em deploy: `curl -A "GPTBot" https://solvefy.com/cpaas` deve retornar HTML completo (não shell).

### Fase 4 (extensão 2) — Instagram no Organization sameAs

- **Decisão D6 atualizada**: Instagram oficial fornecido: `https://www.instagram.com/solvefy_/`. Adicionado em `SOLVEFY_ORG.sameAs` no `src/lib/schemas.ts` — agora aparece no JSON-LD Organization da home + via referência por `@id` em todos os outros schemas.
- Footer limpo: removidos os três stubs `href="#"` (Facebook, LinkedIn, YouTube — contas não migradas/criadas pós-rebrand). Restou só o Instagram com `target="_blank" rel="noopener noreferrer"` e `aria-label` específico. Stubs anteriores eram má UX e SEO ruim (Google penaliza links vazios).

### Fase 4.5 + 5.2 — FAQs por página com schema FAQPage

- Novo arquivo `src/data/faqs.ts` com 6 conjuntos de FAQ (5 Q&A cada): home, cpaas, ads, marketing, crm, agents, cloud. Conteúdo extraído dos docs de produto no vault Obsidian (`03 - Produto/`).
- `<FaqSection>` plugado no fim do `<main>` de cada página de produto + home. Componente usa `<details>/<summary>` nativo — conteúdo é visível para crawlers de IA sem JS — e injeta `FAQPage` JSON-LD via Helmet.
- Validação pós-build: `dist/cpaas/index.html` agora ship 4 schemas distintos (Service, BreadcrumbList, SoftwareApplication, FAQPage com 5 Question + 5 Answer). Texto das perguntas confirmado no `<body>` do HTML estático.

### Verificação FAQ + Instagram

- Build completo: 25/25 rotas prerendadas em segunda tentativa (uma corrida transitória do Chromium-73 do react-snap; pattern conhecido — basta retry, documentado em [solvefy-rebrand-history]).
- Schemas por página confirmados via `grep -oE '"@type":"[^"]+"' dist/*/index.html`:
  - Home: Organization + ContactPoint + PostalAddress + ImageObject + WebSite + FAQPage (5 Q&A)
  - CPaaS: Service + BreadcrumbList + SoftwareApplication + FAQPage (5 Q&A)
  - Outros produtos: Service + Breadcrumb + SoftwareApplication + FAQPage (idem)
