import { ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import {
  LOCALE_LABEL,
  LOCALE_NAME,
  Locale,
  SUPPORTED_LOCALES,
  localizePath,
  stripLocale,
} from "@/i18n/locales";
import { useLocale } from "@/i18n/useLocale";

interface LanguageSwitcherProps {
  /** Variante de cor — black topbar usa texto branco, contexto claro inverte. */
  variant?: "dark" | "light";
}

/**
 * Dropdown no topbar do header — troca de língua preservando a rota.
 * O `<select>` nativo dispensa estado/menus customizados e já é acessível,
 * dispara `change` no teclado e funciona offline sem JS extra.
 */
export function LanguageSwitcher({ variant = "dark" }: LanguageSwitcherProps) {
  const { t } = useTranslation("common");
  const { locale } = useLocale();
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  const onChange = (next: Locale) => {
    if (next === locale) return;
    const canonical = stripLocale(pathname);
    navigate(`${localizePath(canonical, next)}${search}${hash}`);
  };

  const textClass = variant === "dark" ? "text-white/80" : "text-foreground/70";
  const hoverClass =
    variant === "dark" ? "hover:text-white" : "hover:text-foreground";

  return (
    <div className={`relative flex items-center gap-1.5 ${textClass}`}>
      <Globe className="h-3.5 w-3.5 pointer-events-none" aria-hidden="true" />
      <span className="font-medium pointer-events-none">
        {LOCALE_LABEL[locale]}
      </span>
      <ChevronDown className="h-3 w-3 pointer-events-none" aria-hidden="true" />
      <select
        value={locale}
        onChange={(e) => onChange(e.target.value as Locale)}
        aria-label={t("languageSwitcher.label")}
        className={`absolute inset-0 w-full h-full cursor-pointer opacity-0 transition-colors ${hoverClass}`}
      >
        {SUPPORTED_LOCALES.map((l) => (
          <option key={l} value={l} className="text-black">
            {LOCALE_NAME[l]} ({LOCALE_LABEL[l]})
          </option>
        ))}
      </select>
    </div>
  );
}
