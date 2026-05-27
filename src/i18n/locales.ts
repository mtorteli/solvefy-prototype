/**
 * Locales suportados pelo site. Adicionar um novo idioma exige:
 * 1. nova entrada aqui;
 * 2. nova pasta em `src/i18n/locales/<code>/` com os mesmos namespaces;
 * 3. registrar os recursos em `config.ts`;
 * 4. acrescentar prefixo de rota em `App.tsx` e nos scripts de SEO.
 */
export const SUPPORTED_LOCALES = ["pt-BR", "en", "es"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt-BR";

/** Prefixo de URL para cada locale. PT-BR fica na raiz (string vazia). */
export const LOCALE_PREFIX: Record<Locale, string> = {
  "pt-BR": "",
  en: "/en",
  es: "/es",
};

/** Código usado em `<html lang>` e `og:locale` (formato `xx_YY`). */
export const HTML_LANG: Record<Locale, string> = {
  "pt-BR": "pt-BR",
  en: "en",
  es: "es",
};

export const OG_LOCALE: Record<Locale, string> = {
  "pt-BR": "pt_BR",
  en: "en_US",
  es: "es_ES",
};

/** Códigos para `hreflang` (segue ISO 639-1, com região quando relevante). */
export const HREFLANG: Record<Locale, string> = {
  "pt-BR": "pt-BR",
  en: "en",
  es: "es",
};

/** Label curto exibido no LanguageSwitcher. */
export const LOCALE_LABEL: Record<Locale, string> = {
  "pt-BR": "PT",
  en: "EN",
  es: "ES",
};

/** Nome completo, usado no menu expandido. */
export const LOCALE_NAME: Record<Locale, string> = {
  "pt-BR": "Português",
  en: "English",
  es: "Español",
};

/**
 * Extrai o locale a partir de um pathname. Retorna `DEFAULT_LOCALE` quando
 * nenhum prefixo conhecido é encontrado.
 */
export function detectLocale(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  return DEFAULT_LOCALE;
}

/**
 * Remove o prefixo de locale de um pathname, retornando o path "canônico"
 * (sempre com `/` inicial). Útil para o LanguageSwitcher trocar a URL
 * preservando a rota.
 */
export function stripLocale(pathname: string): string {
  if (pathname === "/en" || pathname === "/es") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  if (pathname.startsWith("/es/")) return pathname.slice(3);
  return pathname || "/";
}

/**
 * Aplica o prefixo do locale a um path "canônico" (sem prefixo).
 * `localizePath("/cpaas", "en")` → `"/en/cpaas"`.
 */
export function localizePath(path: string, locale: Locale): string {
  const prefix = LOCALE_PREFIX[locale];
  if (!prefix) return path;
  if (path === "/") return prefix;
  return `${prefix}${path}`;
}
