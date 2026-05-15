# Auditoria SEO + GEO inicial — solvefy.com

**Data:** 2026-05-14
**Auditor:** Claude (Opus 4.7)
**Escopo:** Indexação tradicional + GEO (citação por LLMs) + Core Web Vitals
**Idioma-alvo do site:** pt-BR
**Modo:** Read-only — nenhum arquivo do projeto foi alterado durante esta auditoria.

---

## 1. Stack identificada

| Item | Valor |
|---|---|
| Framework | **Vite 5 + React 18 + TypeScript** (SPA puro, SWC) |
| Hospedagem | **Netlify** (`netlify.toml`) |
| Roteamento | `react-router-dom` v6 (BrowserRouter) com lazy chunks |
| SEO atual | `react-helmet-async` via [src/components/SEO.tsx](src/components/SEO.tsx) |
| CSS / UI | Tailwind + shadcn/ui (Radix) |
| Conteúdo de blog | Mock estático em [src/lib/mock-data.ts](src/lib/mock-data.ts) (7 posts) + Supabase como fallback opcional; corpo em HTML via Tiptap (`@tiptap/html`) |
| Otimização de imagem | `vite-plugin-image-optimizer` já configurado (sharp + svgo) com PNG/JPEG/WebP/AVIF |
| Microsite separado | `public/em-breve/` (página de termos servida via redirect 200 do Netlify) |

**Implicação principal:** site é **SPA sem SSR/SSG**. O servidor entrega o mesmo `dist/index.html` (shell) para qualquer URL, e o React popula `<head>` + `<body>` no cliente. Crawlers sem execução de JS recebem só o shell — bloqueador crítico para GEO (vários bots de IA não executam JS).

---

## 2. Inventário de rotas

Rotas declaradas em [src/App.tsx](src/App.tsx):

| Rota | Componente | No sitemap? | `<SEO>` component? | JSON-LD presente? |
|---|---|---|---|---|
| `/` | [Index.tsx](src/pages/Index.tsx) | ✓ | ✓ ([L15–19](src/pages/Index.tsx#L15)) | ✗ |
| `/cpaas` | [Cpaas.tsx](src/pages/Cpaas.tsx) | ✓ | ✓ ([L83–101](src/pages/Cpaas.tsx#L83)) | ✓ `SoftwareApplication` |
| `/ads` | [Ads.tsx](src/pages/Ads.tsx) | ✓ | ✓ ([L170–183](src/pages/Ads.tsx#L170)) | ✓ `SoftwareApplication` |
| `/marketing` | [Marketing.tsx](src/pages/Marketing.tsx) | ✓ | ✓ ([L157–176](src/pages/Marketing.tsx#L157)) | ✓ `SoftwareApplication` |
| `/crm` | [Crm.tsx](src/pages/Crm.tsx) | ✓ | ✓ ([L107–126](src/pages/Crm.tsx#L107)) | ✓ `SoftwareApplication` |
| `/agents` | [Agents.tsx](src/pages/Agents.tsx) | ✗ **FALTA** | ✓ ([L160–164](src/pages/Agents.tsx#L160)) | ✗ **FALTA** |
| `/cloud` | [Cloud.tsx](src/pages/Cloud.tsx) | ✓ | ✓ ([L318–337](src/pages/Cloud.tsx#L318)) | ✓ `SoftwareApplication` |
| `/quem-somos` | [QuemSomos.tsx](src/pages/QuemSomos.tsx) | ✓ | ✓ ([L45–49](src/pages/QuemSomos.tsx#L45)) | ✗ |
| `/contato` | [Contact.tsx](src/pages/Contact.tsx) | ✓ | ✓ ([L168–172](src/pages/Contact.tsx#L168)) | ✗ |
| `/blog` | [BlogIndex.tsx](src/pages/BlogIndex.tsx) | ✓ | ✓ ([L125–129](src/pages/BlogIndex.tsx#L125)) | ✗ |
| `/blog/:slug` | [BlogPost.tsx](src/pages/BlogPost.tsx) | ✗ (URLs por post ausentes) | ✓ ([L101–106](src/pages/BlogPost.tsx#L101)) | ✗ **FALTA `Article`** |
| `/blog/categoria/:cat` | [BlogCategory.tsx](src/pages/BlogCategory.tsx) | ✗ | ✓ ([L140–144](src/pages/BlogCategory.tsx#L140)) | ✗ |
| `/termos-e-politicas` | Redirect 200 → `/em-breve/termos-e-politicas.html` ([netlify.toml](netlify.toml)) | ✗ | n/a (HTML estático) | n/a |
| `*` (404) | [NotFound.tsx](src/pages/NotFound.tsx) | ✗ (correto) | ✓ | n/a |

**Posts de blog identificados** ([src/lib/mock-data.ts](src/lib/mock-data.ts)):

1. `como-escalar-vendas-infoprodutos-multicanal-automacao` — Produto, 2026-05-14
2. `como-evitar-bloqueio-whatsapp-business` — Comercial, 2026-05-13
3. `rcs-saas-vender-engajar-escalar` — Tecnologia, 2026-05-12
4. `whatsapp-marketing-guia-definitivo` — Marketing, 2026-05-11
5. `automacao-comunicacao-multicanal` — Tecnologia, 2026-05-10
6. `whatsapp-lgpd-guia-completo` — Tecnologia, 2026-05-09
7. `rcs-para-empresas-saas` — Tecnologia, 2026-05-05

**Categorias do blog:** Tecnologia, Marketing, Vendas, Comercial, Produto (5 totais — [src/lib/mock-data.ts:591–597](src/lib/mock-data.ts#L591-L597)).

---

## 3. Tabela de achados × severidade × plano

### CRÍTICO

| # | Achado | Local | Plano |
|---|---|---|---|
| C1 | **SPA puro sem SSR/SSG.** Netlify redireciona `/* → /index.html 200` ([netlify.toml:14-16](netlify.toml#L14-L16)). Todo conteúdo depende de JS para renderizar. | [netlify.toml](netlify.toml), [src/App.tsx](src/App.tsx) | **Fase 5.4** — adicionar pré-renderização estática (vite-plugin-prerender ou react-snap) para gerar HTML por rota com `<head>` + `<body>` populados. Mantém hidratação React. |
| C2 | **Meta description e OG title em INGLÊS no shell HTML** — "Solvefy is a B2B platform for integrated, multi-channel communication and customer engagement." Conflita com pt-BR. É o que crawlers sem JS veem como fallback. | [index.html:7,21,23,24](index.html#L7), [dist/index.html:7,21-24](dist/index.html#L7) | **Fase 3.2** — reescrever shell em pt-BR. |
| C3 | **Nenhum schema `Organization` global.** LLMs não conseguem montar perfil consistente da empresa. | (ausente em todas as páginas) | **Fase 4.1 + 4.2** — criar `src/lib/schemas.ts` com helpers; popular Organization na home e referenciar via `@id` nas demais. |
| C4 | **`llms.txt` e `llms-full.txt` inexistentes.** Sem hint explícito para crawlers de IA. | `public/` | **Fase 2.3 + 2.4** — criar manualmente o `llms.txt` e gerar `llms-full.txt` via script de build. |
| C5 | **`robots.txt` genérico** — sem permissão explícita para crawlers de IA. | [public/robots.txt](public/robots.txt) (5 linhas totais) | **Fase 2.1** — reescrever com `User-agent` específicos: GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, CCBot, Applebot-Extended, Bytespider, cohere-ai, Meta-ExternalAgent. |

### ALTO

| # | Achado | Local | Plano |
|---|---|---|---|
| A1 | **Sitemap não inclui `/agents`** nem URLs por post de blog. | [public/sitemap.xml](public/sitemap.xml) | **Fase 2.2** — converter em geração dinâmica via `scripts/build-sitemap.ts` rodado no build. Inclui rotas + slugs do mock-data. |
| A2 | **Posts de blog sem JSON-LD `Article`/`BlogPosting`** — sem `datePublished`, `dateModified`, `author`, `publisher`. | [src/pages/BlogPost.tsx:101-106](src/pages/BlogPost.tsx#L101-L106) | **Fase 4.6** — gerar `BlogPosting` por post com headline, image, dates, author, publisher (ref Org). |
| A3 | **`/agents` sem `schema` populado** apesar de ter prop disponível. | [src/pages/Agents.tsx:160-164](src/pages/Agents.tsx#L160-L164) | **Fase 4.4** — adicionar `Service`/`SoftwareApplication`. |
| A4 | **Sem `BreadcrumbList`** em nenhuma página interna. | (ausente) | **Fase 4.3** — helper `breadcrumbSchema(items)`, aplicar em todas as páginas internas. |
| A5 | **Sem `WebSite` + `SearchAction`** na home. (Site não tem busca interna, então omitir `SearchAction`.) | [src/pages/Index.tsx](src/pages/Index.tsx) | **Fase 4.2** — adicionar `WebSite` na home; omitir `SearchAction`. |
| A6 | **Imagens OG genéricas** — uma única `opengraph.webp` global para todas as páginas. | [public/opengraph.webp](public/opengraph.webp), [src/components/SEO.tsx:12](src/components/SEO.tsx#L12) | **Fase 3.3** — gerar 1 imagem OG (1200×630) por rota com `sharp`. |
| A7 | **`<h1>` em páginas de produto** usa abstração `<ProductHero variant="h1">`. Confirmar se renderiza tag HTML `<h1>` real e único. | [src/components/ProductHero.tsx](src/components/ProductHero.tsx) | **Fase 7.1** — auditar o componente; corrigir se necessário. |
| A8 | **`<h1>` em QuemSomos** marcado com `sr-only` (escondido visualmente). Funciona para SEO, mas pode confundir crawlers e quebra E-E-A-T visual. | [src/pages/QuemSomos.tsx:62](src/pages/QuemSomos.tsx#L62) | **Fase 7.1** — substituir por h1 visível ou tornar o título do hero o h1 real. |
| A9 | **Datas no blog sem `<time datetime="...">`** — apenas texto formatado via `toLocaleDateString`. | [src/pages/BlogPost.tsx:129](src/pages/BlogPost.tsx#L129) | **Fase 5.3** — usar `<time datetime="ISO-8601">` + bloco "Atualizado em DD/MM/AAAA" visível. |
| A10 | **Sem skip link** (`<a href="#main">Pular para conteúdo</a>`). | (ausente) | **Fase 7.3** — criar `src/components/SkipLink.tsx` ou inline no `<body>`. |
| A11 | **HTML do blog renderizado via `dangerouslySetInnerHTML` sem sanitização explícita.** Tiptap output é controlado, mas Supabase pode trazer conteúdo de terceiros. | [src/pages/BlogPost.tsx:151](src/pages/BlogPost.tsx#L151) | **Fase 5.8** — adicionar `DOMPurify` no caminho Supabase. |

### MÉDIO

| # | Achado | Local | Plano |
|---|---|---|---|
| M1 | **Sem `FAQPage` schema** em nenhuma página. Alto valor GEO. | (ausente) | **Fase 4.5 + 5.2** — criar `<FaqSection>` reutilizável com schema embutido; 3–6 Q&A por página-chave. |
| M2 | **Sem `<picture>` ou `srcset`** — 92 arquivos em `src/assets/` (67 PNG, 20 SVG, 2 JPEG); WebP/AVIF subutilizado. | `src/assets/`, `public/images/` | **Fase 6.1** — `<picture>` com AVIF/WebP + fallback; `width`/`height` em todas. |
| M3 | **Sem `loading="lazy"` consistente** nem `fetchpriority="high"` na LCP. Hero usa `<video autoplay>` sem `poster`. | [src/components/Hero.tsx](src/components/Hero.tsx) | **Fase 6.1** — adicionar `poster` para LCP do vídeo; `fetchpriority="high"` na primeira imagem visível. |
| M4 | **Sem `width`/`height`** em muitas imagens — risco de CLS. | múltiplos | **Fase 6.1** — auditar `<img>`. |
| M5 | **Sem `public/.well-known/security.txt`.** | `public/` | **Fase 2.5** — criar com contato `security@solvefy.com` (a confirmar). |
| M6 | **Sem `manifest.webmanifest`** e variantes de favicon. Só `favicon.ico`. | [public/favicon.ico](public/favicon.ico) | **Fase 3.5** — gerar `favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png`, `site.webmanifest`. |
| M7 | **Sem `<meta name="theme-color">`.** | [index.html](index.html) | **Fase 3.1 / 3.2**. |
| M8 | **Domínio canônico ambíguo.** SEO.tsx e sitemap usam apex (`https://solvefy.com`), mas brief do usuário e muitos sites usam `www.`. | [src/components/SEO.tsx:11](src/components/SEO.tsx#L11), [public/sitemap.xml](public/sitemap.xml), [public/robots.txt](public/robots.txt) | **Fase 2.0** — perguntar ao usuário; padronizar tudo + redirect 301 do outro. |
| M9 | **Sem cabeçalhos `Cache-Control` explícitos** no `netlify.toml`. | [netlify.toml](netlify.toml) | **Fase 2.7** — `[[headers]]` para `/assets/*` (`max-age=31536000, immutable`), HTML (`no-cache`), fontes idem. |
| M10 | **Sem `<link rel="preload" as="font">`.** `public/fonts/` existe mas não conectado via preload. | `public/fonts/`, [index.html](index.html) | **Fase 6.4** — preload da fonte principal woff2; `font-display: swap`. |

### BAIXO

| # | Achado | Local | Plano |
|---|---|---|---|
| B1 | `<meta name="author">` redundante com Organization schema. | [index.html:8](index.html#L8) | **Fase 3.2** — opcional remover. |
| B2 | Sem `hreflang` — só relevante se houver versão em outro idioma futuramente. | n/a | (sem ação) |
| B3 | GA4 / GSC / Bing não verificados via meta. | (ausente) | **Fase 8** — perguntar ao usuário; adicionar slot. |
| B4 | Preconnect a Google Fonts mantido, mas `public/fonts/` sugere fontes self-hosted. | [index.html:12-13](index.html#L12-L13) | **Fase 3.2** — auditar runtime e remover se não usado. |
| B5 | Preconnect a CloudFront mantido — verificar origem ainda em uso. | [index.html:11](index.html#L11) | **Fase 3.2** — verificar e remover se obsoleto. |
| B6 | `tsdr` — `vite-plugin-image-optimizer` configurado mas resultado não é `<picture>` ainda; é otimização inline. | [vite.config.ts:19-25](vite.config.ts#L19-L25) | (já será coberto em **Fase 6.1**) |

---

## 4. Pontos fortes a preservar

- **Componente `<SEO>`** ([src/components/SEO.tsx](src/components/SEO.tsx)) é simples, tipado e aceita `schema` prop. Será **estendido**, não reescrito. (Backward-compatible.)
- **`HelmetProvider`** corretamente plugado em [src/main.tsx:7](src/main.tsx#L7).
- **5 das 7 páginas de produto já têm `SoftwareApplication`** schema — base sólida para padronização.
- **100% das páginas têm `<SEO>` aplicado** (incluindo 404).
- **`vite-plugin-image-optimizer`** já presente — toolchain pronta para usar.
- **Conteúdo já é consistentemente pt-BR** (com exceção do shell HTML — C2).
- **Roteamento com lazy chunks** + manualChunks em [vite.config.ts:33-43](vite.config.ts#L33-L43) — boa base de performance.
- **`<header>`, `<nav>`, `<main>`, `<footer>` e `<article>`** já em uso correto na maior parte dos componentes.
- **Cobertura de `alt`** em imagens é ~95% — gaps são pontuais.

---

## 5. Resumo executivo

| Categoria | Score (qualitativo) | Nota |
|---|---|---|
| Indexação tradicional | **6/10** | Componente SEO bom, mas falta schema, sitemap incompleto, sem prerender. |
| GEO (IA) | **3/10** | SPA sem prerender + sem `llms.txt` + sem Organization + robots.txt genérico. Bloqueador crítico em todos os pontos principais. |
| Core Web Vitals | **6/10** | Lazy chunks ok, imagens otimizadas no build, mas sem `<picture>`/`srcset`, video LCP sem `poster`, sem critical CSS inline, fontes sem preload. (Score real depende do Lighthouse — a medir.) |
| HTML semântico | **7/10** | Estrutura boa, gaps em `<h1>` real, skip link, `<time>`. |
| Acessibilidade | **7/10** | aria-labels bons, contraste a confirmar, sem skip link, alguns labels faltando. |

**3 prioridades absolutas para destravar o resto:**

1. **Pré-renderização estática** (Fase 5.4) — destrava GEO + corrige fallback de crawlers.
2. **Schema `Organization` + `llms.txt`** (Fases 4.1/4.2 + 2.3) — dá identidade institucional para LLMs.
3. **Corrigir shell HTML em pt-BR + robots.txt explícito para crawlers de IA** (Fases 3.2 + 2.1) — quick wins de 1 commit cada.

---

## 6. Próximos passos

Aguardando aprovação do usuário para iniciar **Fase 2 — Infraestrutura SEO (arquivos da raiz)**.

Antes da Fase 2 vou precisar das seguintes respostas (algumas em lote):

1. **Domínio canônico:** `www.solvefy.com` ou `solvefy.com`?
2. **E-mail de segurança** para `security.txt` (existe `security@solvefy.com`?).
3. **Dados da empresa** para `Organization` schema (vão ser pedidos antes da Fase 4): CNPJ, endereço, telefone, ano de fundação, redes sociais.
4. **Estratégia de prerender** (Fase 5.4): vite-plugin-prerender ou react-snap?
5. **Imagens OG:** estáticas (eu gero com sharp) ou dinâmicas via Netlify Edge Function?

Tudo isso pode esperar a aprovação da Fase 2 — só listando para você ter visibilidade.
