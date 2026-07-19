import { Helmet } from "react-helmet-async";

import {
  DEFAULT_LOCALE,
  HREFLANG,
  Locale,
  LOCALE_PREFIX,
  OG_LOCALE,
  SUPPORTED_LOCALES,
  localizePath,
} from "@/i18n/locales";
import { useLocale } from "@/i18n/useLocale";

interface SEOProps {
  title: string;
  description: string;
  /**
   * Path canônico SEM prefixo de locale, ex: `/`, `/cpaas`. O SEO injeta
   * o prefixo de cada locale automaticamente (canonical e hreflang).
   */
  canonical?: string;
  ogImage?: string;
  /** @deprecated use `schemas` */
  schema?: Record<string, unknown>;
  schemas?: Array<Record<string, unknown>>;
  noindex?: boolean;
  keywords?: string[];
  /**
   * Quando informado, sobrescreve o locale derivado do contexto. Útil para
   * páginas que não estão dentro do `LocaleLayout` (catch-all do `/404`,
   * por exemplo). Default: locale do contexto.
   */
  locale?: Locale;
}

const BASE_URL = "https://mtorteli.github.io/solvefy-prototype";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og/og-default.jpg`;
const SITE_NAME = "Protótipo Solvefy";
const TWITTER_HANDLE = "@Solvefy";

export function SEO({
  title,
  description,
  canonical,
  ogImage,
  schema,
  schemas,
  noindex,
  keywords,
  locale: localeProp,
}: SEOProps) {
  const ctx = useLocale();
  const locale = localeProp ?? ctx.locale;

  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalPath = canonical ?? "/";
  const localizedCanonical = localizePath(canonicalPath, locale);
  const url = `${BASE_URL}${localizedCanonical}`;
  const rawImage = ogImage ?? DEFAULT_OG_IMAGE;
  const image = rawImage.startsWith("http") ? rawImage : `${BASE_URL}${rawImage}`;

  const allSchemas = [
    ...(schemas ?? []),
    ...(schema ? [schema] : []),
  ];

  // Alternates apontam para todas as línguas suportadas. x-default → pt-BR.
  const alternates = SUPPORTED_LOCALES.map((alt) => ({
    hreflang: HREFLANG[alt],
    href: `${BASE_URL}${localizePath(canonicalPath, alt)}`,
  }));

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* hreflang alternates — sinaliza ao Google as versões equivalentes */}
      {alternates.map((alt) => (
        <link
          key={alt.hreflang}
          rel="alternate"
          hrefLang={alt.hreflang}
          href={alt.href}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}${localizePath(canonicalPath, DEFAULT_LOCALE) || "/"}`}
      />

      {/* Protótipo de portfólio: nunca indexar em buscadores. */}
      <meta name="robots" content="noindex, nofollow" />
      <meta name="googlebot" content="noindex, nofollow" />

      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={OG_LOCALE[locale]} />
      {SUPPORTED_LOCALES.filter((l) => l !== locale).map((alt) => (
        <meta key={alt} property="og:locale:alternate" content={OG_LOCALE[alt]} />
      ))}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} — ${SITE_NAME}`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${title} — ${SITE_NAME}`} />

      {allSchemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}

// Re-exporta utilitários internos pra evitar import dupla camada nos consumidores
export { LOCALE_PREFIX };
