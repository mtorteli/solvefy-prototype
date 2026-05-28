import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { detectLocale } from "@/i18n/locales";

/**
 * Skip link de acessibilidade: aparece quando recebe foco (Tab) e leva o
 * usuário direto ao conteúdo principal, pulando header + nav. Garante WCAG
 * 2.4.1 (Bypass Blocks).
 *
 * Para funcionar, a página deve ter um elemento com `id="main"` (geralmente
 * o `<main>`).
 *
 * Renderiza fora do `LocaleLayout` (precisa estar antes de qualquer foco
 * do tab), por isso deriva o locale direto do path.
 */
export function SkipLink() {
  const { pathname } = useLocation();
  const locale = detectLocale(pathname);
  const { t } = useTranslation("common", { lng: locale });
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      {t("skipLink")}
    </a>
  );
}
