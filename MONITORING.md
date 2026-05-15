# Monitoramento SEO + GEO

Este documento centraliza painéis, contas e procedimentos para acompanhar
indexação tradicional, visibilidade em IA generativa (GEO) e Core Web Vitals
do site **solvefy.com** após a otimização técnica concluída em 2026-05-14.

---

## 1. Google Search Console (indexação tradicional)

**URL:** https://search.google.com/search-console
**Propriedade:** Domain property `solvefy.com` (apex)

### Setup inicial (uma vez)

1. Acessar GSC, "Add property" → "Domain" → digitar `solvefy.com`.
2. Verificar via DNS TXT (preferencial; cobre apex + www + subdomínios) ou
   via meta tag — para a meta tag, adicionar em [src/components/SEO.tsx](src/components/SEO.tsx)
   um campo `googleSiteVerification` que injete
   `<meta name="google-site-verification" content="...">` (slot reservado).
3. Após verificação, submeter o sitemap:
   - Menu "Sitemaps" → "Add a new sitemap" → `sitemap.xml`
   - URL completa: `https://solvefy.com/sitemap.xml` (22 URLs)
4. Solicitar indexação manual das páginas principais via "URL inspection":
   `/`, `/cpaas`, `/ads`, `/marketing`, `/crm`, `/agents`, `/cloud`,
   `/quem-somos`, `/contato`, `/blog`.

### Monitoramento contínuo

- **Coverage** → "Pages": verificar se há URLs com status "Error", "Excluded",
  "Discovered – currently not indexed". Investigar e corrigir.
- **Performance** → impressões, cliques, CTR, posição média. Filtrar por
  pt-BR e por dispositivo.
- **Core Web Vitals**: aparece após 28 dias de dados reais (CrUX). Mobile e
  Desktop separados. Threshold "Good" = LCP < 2.5s, INP < 200ms, CLS < 0.1.
- **Enhancements**: vai listar tipos de rich result detectados (Organization,
  BlogPosting, FAQPage, BreadcrumbList) — confirmar que todos aparecem sem
  warnings.
- **Manual Actions / Security Issues**: monitorar mensalmente.

### Alertas

Habilitar e-mail para "Critical issues" no GSC (Settings → Users and
permissions → modificar preferências de e-mail).

---

## 2. Bing Webmaster Tools

**URL:** https://www.bing.com/webmasters/

### Setup inicial

1. "Add a site" → `https://solvefy.com`.
2. Verificar via XML file ou meta tag.
3. **Importar de GSC** (botão "Import from GSC") — atalho que já configura
   sitemap e algumas verificações.
4. Submeter sitemap manualmente se a importação falhar:
   `https://solvefy.com/sitemap.xml`.

### Monitoramento

- "Site Explorer" → URLs indexadas.
- "SEO Reports" → erros técnicos (Bing reporta diferentes problemas que o
  Google).
- "Backlinks" → perfil de links externos (Bing é mais completo que GSC
  para isso).

Bing alimenta DuckDuckGo, Yahoo e o Copilot/Bing Chat — é o segundo motor
mais relevante para o mercado brasileiro depois do Google.

---

## 3. Google Analytics 4

**URL:** https://analytics.google.com

### Pendente de implementação (Fase 8.3)

GA4 não está configurado neste momento. Para ativar:

1. Criar uma propriedade GA4 e obter um Measurement ID `G-XXXXXXXXXX`.
2. Adicionar slot opcional em [src/components/SEO.tsx](src/components/SEO.tsx)
   ou diretamente em [index.html](index.html) (recomendado, pra capturar
   page view do shell antes da hidratação React).
3. Implementar gate de consentimento LGPD: já existe
   [public/cookie-consent.html](public/cookie-consent.html) (provavelmente
   embed iframe) — confirmar e plumbar o GA4 para só disparar após "accept".
4. Configurar conversões: clique em "Entre em contato", envio de formulário
   RD Station, leitura completa de post de blog.

**Decisão pendente:** Measurement ID do usuário.

---

## 4. Validação de schemas (uma vez após deploy)

Rodar cada uma das URLs abaixo nos dois validadores:

### Schema.org Validator

**URL:** https://validator.schema.org/

URLs a testar (esperar zero erros e zero warnings críticos):
- `https://solvefy.com/` → Organization + WebSite
- `https://solvefy.com/cpaas` → Service + SoftwareApplication + Breadcrumb
- `https://solvefy.com/blog/como-evitar-bloqueio-whatsapp-business` →
  BlogPosting + Breadcrumb
- `https://solvefy.com/quem-somos` → Breadcrumb

### Google Rich Results Test

**URL:** https://search.google.com/test/rich-results

Mesmas URLs. Confirmar que os tipos detectados pelo Google batem com os
schemas que emitimos.

Documentar resultados em [SEO-GEO-NOTES.md](SEO-GEO-NOTES.md) seção
"Verificação Fase 4".

---

## 5. Validação de Open Graph e Twitter Card

- **OpenGraph Debugger:** https://www.opengraph.xyz/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
  (requer login no X)
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/
- **WhatsApp link preview:** colar em qualquer chat de teste

Testar pelo menos 3 URLs (home, uma página de produto, um post de blog).
Confirmar que cada uma exibe sua imagem OG dedicada (1200×630) e título
em pt-BR.

---

## 6. Crawlers de IA (GEO)

Não existem painéis públicos como GSC para crawlers de IA. O monitoramento
é semi-manual. Procedimentos:

### Teste direto via curl com user-agent de cada crawler

```bash
# GPTBot (OpenAI)
curl -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.0; +https://openai.com/gptbot)" https://solvefy.com/

# ClaudeBot (Anthropic)
curl -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)" https://solvefy.com/

# PerplexityBot
curl -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)" https://solvefy.com/
```

**Resultado esperado (depois de Fase 5.4 — prerender):** HTML completo com
conteúdo principal no `<body>`. Hoje (SPA puro), só o shell + meta tags.
A Fase 5.4 (pré-renderização estática) destrava esse cenário.

### Teste em produtos consumer

Perguntar diretamente em cada produto:
- **ChatGPT:** "O que é a Solvefy?", "O que faz o Solvefy/CPaaS?"
- **Claude:** mesmas perguntas, comparar a riqueza da resposta.
- **Perplexity:** "Solvefy site:solvefy.com"
- **Gemini / Bing Chat / Copilot:** idem
- **Google AI Overviews:** buscar "plataforma B2B comunicação multicanal
  brasileira" e ver se a Solvefy aparece nos resumos gerados.

Cadenciar: rodar 1x por mês após o deploy.

### llms.txt e llms-full.txt

- **llms.txt:** https://solvefy.com/llms.txt
- **llms-full.txt:** https://solvefy.com/llms-full.txt

Validar que ambos retornam HTTP 200, Content-Type `text/plain; charset=utf-8`
(garantido via [netlify.toml](netlify.toml)) e que o conteúdo está atualizado
(o `prebuild` regenera o llms-full a cada deploy).

---

## 7. Core Web Vitals + Lighthouse

### Lighthouse local (durante desenvolvimento)

```bash
npm run build
npm run preview &
npx lighthouse http://localhost:4173 --view --preset=desktop
npx lighthouse http://localhost:4173 --view  # mobile
```

Documentar Performance / Accessibility / Best Practices / SEO em
[SEO-GEO-NOTES.md](SEO-GEO-NOTES.md) antes e depois de cada mudança grande.

### PageSpeed Insights (CrUX + Lighthouse no servidor do Google)

**URL:** https://pagespeed.web.dev/?url=https://solvefy.com/

Roda Lighthouse e mostra dados de campo (CrUX) se disponíveis (precisa
de tráfego real).

### WebPageTest

**URL:** https://www.webpagetest.org/?url=https://solvefy.com/

Mais detalhado que PageSpeed, com waterfall de requests e análise de TTFB
do CDN. Útil pra debugar regressões.

---

## 8. Alertas e rotinas

| Frequência | O que verificar | Onde |
|---|---|---|
| Diário (e-mail) | Erros críticos | GSC + Bing |
| Semanal | URLs indexadas vs sitemap | GSC, Bing |
| Quinzenal | Posições e CTR principais | GSC Performance |
| Mensal | Aparições em IA generativa | Manual (ChatGPT, Claude, Perplexity) |
| Mensal | CWV (após 28 dias) | GSC Core Web Vitals |
| Trimestral | Auditoria full | Lighthouse + WebPageTest + revisão de schemas |

---

## 9. Logins e responsáveis

| Recurso | Responsável | Credencial |
|---|---|---|
| Google Search Console | (definir) | italo@ativos.capital |
| Bing Webmaster Tools | (definir) | (a confirmar) |
| GA4 | (definir) | (a confirmar) |
| Netlify | (definir) | (a confirmar) |
| DNS (registro do domínio solvefy.com) | (definir) | (a confirmar) |

**A preencher pelo usuário.** A inclusão de e-mails nesta tabela facilita
sucessão se a responsabilidade mudar.

---

## 10. Próximos passos após este documento

1. Concluir Fase 5.4 (pré-renderização estática) — bloqueador crítico para
   GEO. Sem isso, os crawlers de IA continuam vendo apenas o shell HTML.
2. Coletar dados da empresa para enriquecer o `Organization` schema
   (endereço completo, telefone, URLs reais de redes sociais).
3. Definir conteúdo de FAQs por página (Fase 4.5 / 5.2) — sem isso, o
   componente `<FaqSection>` fica não-usado.
4. Configurar GA4 + verificar GSC + Bing.
5. Rodar Lighthouse pós-deploy e iterar nas otimizações de performance
   da Fase 6.
