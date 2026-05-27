import { ReactNode, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { HTML_LANG, Locale } from "./locales";
import { LocaleContext } from "./useLocale";

interface LocaleLayoutProps {
  lang: Locale;
  children: ReactNode;
}

/**
 * Wrapper das rotas que carrega o locale apropriado. Existe um por prefixo
 * de URL (`/`, `/en`, `/es`). Mantém `<html lang>` e `i18n.language` em
 * sincronia com a rota — single source of truth = path.
 */
export function LocaleLayout({ lang, children }: LocaleLayoutProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = HTML_LANG[lang];
    }
  }, [i18n, lang]);

  // Garante que componentes filhos que chamarem t() no primeiro render já
  // recebam strings do locale correto, mesmo antes do useEffect rodar.
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  const value = useMemo(() => ({ locale: lang }), [lang]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
