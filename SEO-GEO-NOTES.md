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
- Pendente: `npm run build` end-to-end + validação dos endpoints no preview.
