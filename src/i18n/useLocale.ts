import { createContext, useCallback, useContext } from "react";

import { DEFAULT_LOCALE, Locale, localizePath, stripLocale } from "./locales";

interface LocaleContextValue {
  locale: Locale;
}

export const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
});

/**
 * Hook central de i18n. Sempre que precisar saber a língua atual ou gerar
 * URLs para a língua atual, use isto em vez de inspecionar `useLocation`.
 *
 * - `locale`: locale ativo desta árvore de rotas.
 * - `localizedPath(path)`: prefixa `path` (sem prefixo) com `/en`/`/es`/etc.
 * - `pathFor(path, locale)`: gera URL de outro locale (usado pelo switcher).
 * - `stripCurrentLocale(path)`: remove o prefixo da URL atual.
 */
export function useLocale() {
  const { locale } = useContext(LocaleContext);

  const localizedPath = useCallback(
    (path: string) => localizePath(path, locale),
    [locale],
  );

  const pathFor = useCallback(
    (path: string, targetLocale: Locale) => localizePath(path, targetLocale),
    [],
  );

  return {
    locale,
    localizedPath,
    pathFor,
    stripCurrentLocale: stripLocale,
  };
}
