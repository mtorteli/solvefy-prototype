import { ArrowRight, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { stripLocale } from "@/i18n/locales";
import { useLocale } from "@/i18n/useLocale";

const ITEMS = [
  { key: "overview", path: "/cpaas" },
  { key: "voz",      path: "/cpaas/voz" },
  { key: "sms",      path: "/cpaas/sms" },
  { key: "whatsapp", path: "/cpaas/whatsapp" },
  { key: "email",    path: "/cpaas/email" },
  { key: "rcs",      path: "/cpaas/rcs" },
] as const;

const isActive = (canonicalPath: string, target: string) =>
  target === "/cpaas" ? canonicalPath === "/cpaas" : canonicalPath === target || canonicalPath.startsWith(`${target}/`);

export const CpaasSubNav = () => {
  const { t } = useTranslation("cpaas");
  const { localizedPath } = useLocale();
  const { pathname } = useLocation();
  const canonical = stripLocale(pathname);
  const onCpaas = canonical === "/cpaas" || canonical.startsWith("/cpaas/");
  if (!onCpaas) return null;

  const current = ITEMS.find((i) => isActive(canonical, i.path)) ?? ITEMS[0];

  return (
    <nav
      aria-label={t("subNav.ariaLabel")}
      className="bg-white border-b border-border border-t-2 border-t-[hsl(var(--cpaas))]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Desktop */}
        <div className="hidden lg:flex items-center justify-between gap-6 h-12">
          <div className="invisible pointer-events-none" aria-hidden="true">
            <Logo />
          </div>
          <ul className="flex items-center gap-8 h-12">
            {ITEMS.map((item) => {
              const active = isActive(canonical, item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={localizedPath(item.path)}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center h-12 text-sm transition-colors border-b-2 -mb-px ${
                      active
                        ? "border-[hsl(var(--cpaas))] text-foreground font-medium"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t(`subNav.${item.key}`)}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="invisible pointer-events-none" aria-hidden="true">
            <Button variant="hero" size="lg" className="text-black font-semibold" tabIndex={-1}>
              {t("hero.cta")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden py-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="w-full flex items-center justify-between rounded-lg border border-border bg-white px-3 py-2.5 text-sm font-medium"
                aria-label={t("subNav.ariaLabel")}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: "hsl(var(--cpaas))" }}
                  />
                  <span className="text-muted-foreground">CPaaS ·</span>
                  <span className="text-foreground">{t(`subNav.${current.key}`)}</span>
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[calc(100vw-2rem)] max-w-sm">
              {ITEMS.map((item) => {
                const active = isActive(canonical, item.path);
                return (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link
                      to={localizedPath(item.path)}
                      aria-current={active ? "page" : undefined}
                      className={active ? "font-medium text-[hsl(var(--cpaas))]" : ""}
                    >
                      {t(`subNav.${item.key}`)}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
