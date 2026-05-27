// scripts/build-sitemap.mjs
// Gera public/sitemap.xml a partir das rotas estáticas + slugs do mock-data.ts.
// Rodado via npm `prebuild` antes do vite build.
//
// Cada URL ganha tags <xhtml:link rel="alternate" hreflang="..."> apontando
// para suas equivalentes nas 3 línguas (pt-BR, en, es), conforme exigido
// pelo Google para sites multilíngues. PT-BR fica na raiz; EN e ES com
// prefixo /en e /es.
//
// Nesta fase do i18n, apenas a Home (`/`) tem versões reais em /en e /es.
// As demais URLs são listadas só em pt-BR — alternates entram conforme as
// páginas forem migradas.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const BASE = "https://solvefy.com";

const LOCALES = ["pt-BR", "en", "es"];
const PREFIX = { "pt-BR": "", en: "/en", es: "/es" };

/** Páginas indexáveis que já têm versões traduzidas em todas as línguas. */
const TRANSLATED_PATHS = new Set([
  "/",
  "/contato",
  "/quem-somos",
  "/cpaas",
]);
// Cpaas subpaths (voz/sms/whatsapp/email/rcs) também são traduzidos, mas estão
// marcados `noindex` e por isso ficam fora do sitemap.

const mock = readFileSync(resolve(root, "src/lib/mock-data.ts"), "utf8");

// MOCK_POSTS vem antes de MOCK_CATEGORIES no arquivo
const [postsSection = "", categoriesSection = ""] = mock.split(
  "export const MOCK_CATEGORIES",
);

// Posts: slug e created_at indentados com 4 espaços (campos do objeto post)
const postSlugs = [...postsSection.matchAll(/^    slug: "([^"]+)"/gm)].map(
  (m) => m[1],
);
const postDates = [
  ...postsSection.matchAll(/^    created_at: new Date\("([^"]+)"\)/gm),
].map((m) => m[1].slice(0, 10));

const posts = postSlugs.map((slug, i) => ({
  slug,
  lastmod: postDates[i] || new Date().toISOString().slice(0, 10),
}));

// Categories: pares { name, slug } — extrai todos os slugs da seção
const categorySlugs = [
  ...categoriesSection.matchAll(/slug:\s*"([^"]+)"/g),
].map((m) => m[1]);

const today = new Date().toISOString().slice(0, 10);

const staticPages = [
  { loc: "/",            priority: 1.0, changefreq: "weekly",  lastmod: today },
  { loc: "/cpaas",       priority: 0.9, changefreq: "monthly", lastmod: today },
  { loc: "/ads",         priority: 0.9, changefreq: "monthly", lastmod: today },
  { loc: "/marketing",   priority: 0.9, changefreq: "monthly", lastmod: today },
  { loc: "/crm",         priority: 0.9, changefreq: "monthly", lastmod: today },
  { loc: "/agents",      priority: 0.9, changefreq: "monthly", lastmod: today },
  { loc: "/cloud",       priority: 0.9, changefreq: "monthly", lastmod: today },
  { loc: "/quem-somos",  priority: 0.7, changefreq: "monthly", lastmod: today },
  { loc: "/contato",     priority: 0.7, changefreq: "monthly", lastmod: today },
  { loc: "/blog",        priority: 0.8, changefreq: "weekly",  lastmod: today },
];

const blogPostPages = posts.map(({ slug, lastmod }) => ({
  loc: `/blog/${slug}`,
  priority: 0.7,
  changefreq: "monthly",
  lastmod,
}));

const blogCategoryPages = categorySlugs.map((slug) => ({
  loc: `/blog/categoria/${slug}`,
  priority: 0.6,
  changefreq: "weekly",
  lastmod: today,
}));

const canonicalUrls = [...staticPages, ...blogPostPages, ...blogCategoryPages];

/**
 * Expande as URLs canônicas em entradas por locale, marcando cada entrada
 * com `<xhtml:link>` alternates quando a página existe em múltiplas línguas.
 */
const urls = canonicalUrls.flatMap((page) => {
  const isTranslated = TRANSLATED_PATHS.has(page.loc);
  const localesForThisPage = isTranslated ? LOCALES : ["pt-BR"];

  return localesForThisPage.map((locale) => {
    const prefix = PREFIX[locale];
    const localizedLoc = prefix === "" ? page.loc : `${prefix}${page.loc === "/" ? "" : page.loc}`;
    const finalLoc = localizedLoc || "/";

    const alternates = isTranslated
      ? LOCALES.map((alt) => ({
          hreflang: alt,
          href: `${BASE}${PREFIX[alt] === "" ? page.loc : `${PREFIX[alt]}${page.loc === "/" ? "" : page.loc}` || "/"}`,
        }))
      : [];

    return {
      loc: `${BASE}${finalLoc}`,
      lastmod: page.lastmod,
      changefreq: page.changefreq,
      priority: page.priority,
      alternates,
    };
  });
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(({ loc, lastmod, changefreq, priority, alternates }) => {
    const alts = alternates
      .map(
        (a) =>
          `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`,
      )
      .join("\n");
    const xdefault = alternates.length
      ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${alternates.find((a) => a.hreflang === "pt-BR").href}"/>`
      : "";
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>${alts ? "\n" + alts : ""}${xdefault}
  </url>`;
  })
  .join("\n")}
</urlset>
`;

writeFileSync(resolve(root, "public/sitemap.xml"), xml, "utf8");

const translatedCount = urls.filter((u) => u.alternates.length > 0).length;
console.log(
  `[build-sitemap] wrote public/sitemap.xml — ${urls.length} URLs ` +
    `(${translatedCount} with hreflang alternates)`,
);
