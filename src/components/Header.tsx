import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLocale } from "@/i18n/useLocale";
import { AnimatePresence, motion } from "framer-motion";
import iconCpaas from "@/assets/icons/cpaas.svg";
import iconAds from "@/assets/icons/ads.svg";
import iconMarketing from "@/assets/icons/marketing.svg";
import iconCrm from "@/assets/icons/crm.svg";
import iconAgents from "@/assets/icons/agents.svg";
import iconCloud from "@/assets/icons/cloud.svg";
import logoCpaas from "@/assets/logos/solvefy-cpaas.png";
import logoAds from "@/assets/logos/solvefy-ads.png";
import logoMarketing from "@/assets/logos/solvefy-marketing.png";
import logoCrm from "@/assets/logos/solvefy-crm.png";
import logoAgents from "@/assets/logos/solvefy-agents.png";
import logoCloud from "@/assets/logos/solvefy-cloud.png";

const solutionImages = {
  cpaas: { logo: logoCpaas, icon: iconCpaas, hover: "hover:bg-[hsl(var(--cpaas))]/10", to: "/cpaas" },
  ads: { logo: logoAds, icon: iconAds, hover: "hover:bg-[hsl(var(--ads))]/10", to: "/ads" },
  marketing: { logo: logoMarketing, icon: iconMarketing, hover: "hover:bg-[hsl(var(--marketing))]/10", to: "/marketing" },
  crm: { logo: logoCrm, icon: iconCrm, hover: "hover:bg-[hsl(var(--crm))]/10", to: "/crm" },
  agents: { logo: logoAgents, icon: iconAgents, hover: "hover:bg-[hsl(var(--agents))]/10", to: "/agents" },
  cloud: { logo: logoCloud, icon: iconCloud, hover: "hover:bg-[hsl(var(--cloud))]/10", to: "/cloud" },
} as const;

type SolutionKey = keyof typeof solutionImages;
const SOLUTION_KEYS: SolutionKey[] = ["cpaas", "ads", "marketing", "crm", "agents", "cloud"];

const NavDropdown = ({
  label,
  items,
}: {
  label: string;
  items: { name: string; desc?: string; to?: string }[];
}) => (
  <div className="relative group">
    <button
      className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
      aria-haspopup="true"
    >
      {label}
      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
    </button>
    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
      <div className="w-72 rounded-2xl border border-border bg-card shadow-elegant p-2">
        {items.map((item) =>
          item.to?.startsWith("http") ? (
            <a
              key={item.name}
              href={item.to}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-muted transition-colors"
            >
              <div>
                <div className="text-sm font-semibold text-foreground">{item.name}</div>
                {item.desc && <div className="text-xs text-muted-foreground">{item.desc}</div>}
              </div>
            </a>
          ) : item.to ? (
            <Link
              key={item.name}
              to={item.to}
              className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-muted transition-colors"
            >
              <div>
                <div className="text-sm font-semibold text-foreground">{item.name}</div>
                {item.desc && <div className="text-xs text-muted-foreground">{item.desc}</div>}
              </div>
            </Link>
          ) : (
            <a
              key={item.name}
              href="#"
              className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-muted transition-colors"
            >
              <div>
                <div className="text-sm font-semibold text-foreground">{item.name}</div>
                {item.desc && <div className="text-xs text-muted-foreground">{item.desc}</div>}
              </div>
            </a>
          )
        )}
      </div>
    </div>
  </div>
);

const SolutionsMegaMenu = ({
  label,
  ariaLabel,
  solutions,
}: {
  label: string;
  ariaLabel: string;
  solutions: { key: SolutionKey; name: string; desc: string; to: string }[];
}) => (
  <div className="relative group">
    <button
      className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
      aria-haspopup="true"
      aria-label={ariaLabel}
    >
      {label}
      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
    </button>
    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
      <div className="w-[600px] rounded-2xl border border-border bg-card shadow-elegant p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {solutions.map((s) => {
            const img = solutionImages[s.key];
            return (
              <Link
                key={s.key}
                to={s.to}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white border border-gray-100 shadow-sm transition-colors duration-200 ${img.hover}`}
              >
                <img src={img.icon} alt={s.name} className="w-7 h-7 object-contain flex-shrink-0" />
                <div className="flex flex-col justify-center items-start gap-0.5">
                  <img src={img.logo} alt={s.name} className="h-[13px] w-auto" />
                  <div className="text-xs font-normal text-black/70">{s.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

export const Header = () => {
  const { t } = useTranslation("common");
  const { localizedPath } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solutionLinks = SOLUTION_KEYS.map((key) => ({
    key,
    name: `Solvefy/${key === "cpaas" || key === "crm" ? key.toUpperCase() : key.charAt(0).toUpperCase() + key.slice(1)}`,
    desc: t(`header.solutions.${key}`),
    to: localizedPath(solutionImages[key].to),
  }));

  const resourceLinks = [
    { name: t("header.resources.blog"), to: localizedPath("/blog") },
    { name: t("header.resources.helpCenter"), to: "https://intercom.help/Solvefy/pt-BR" },
  ];

  const companyLinks = [
    { name: t("header.company.about"), to: localizedPath("/quem-somos") },
    { name: t("header.company.careers"), to: "https://ativoscapital.rhgestor.com.br/" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
        scrolled ? "shadow-elegant" : ""
      }`}
    >
      {/* Top bar */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex h-9 items-center justify-end gap-5 py-2 text-xs">
          <LanguageSwitcher />
          <Link
            to={localizedPath("/contato")}
            className="text-white hover:text-white/80 font-medium transition-colors"
          >
            {t("header.topBar.contact")}
          </Link>
          <a
            href="https://auth.solvefy.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-white px-3 py-1 text-xs font-semibold text-black hover:bg-white/90 transition-colors"
          >
            {t("header.topBar.login")}
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={`bg-background transition-colors duration-300 ${
          scrolled ? "border-b border-border" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex h-auto items-center justify-between gap-6 py-4">
          <Logo />

          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to={localizedPath("/")}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
            >
              {t("header.nav.home")}
            </Link>
            <SolutionsMegaMenu
              label={t("header.nav.solutionsLabel")}
              ariaLabel={t("header.nav.solutionsAria")}
              solutions={solutionLinks}
            />
            <NavDropdown label={t("header.nav.resources")} items={resourceLinks} />
            <NavDropdown label={t("header.nav.company")} items={companyLinks} />
          </nav>

          <div className="hidden lg:flex items-center">
            <Link to={localizedPath("/contato")}>
              <Button variant="hero" size="lg" className="group text-black font-semibold">
                {t("header.ctaSpecialist")}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
            aria-label={t("header.mobileMenu")}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-background border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              <Link to={localizedPath("/")} className="block px-3 py-2.5 rounded-lg hover:bg-muted text-sm font-medium">
                {t("header.nav.home")}
              </Link>
              <div className="text-xs font-semibold uppercase text-muted-foreground px-3 pt-2">
                {t("header.nav.solutionsLabel")}
              </div>
              {solutionLinks.map((s) => {
                const img = solutionImages[s.key];
                return (
                  <Link
                    key={s.key}
                    to={s.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted"
                  >
                    <img src={img.icon} alt={s.name} className="h-5 w-5 object-contain" />
                    <img src={img.logo} alt={s.name} className="h-[14px] w-auto object-contain" />
                  </Link>
                );
              })}
              <Link to={localizedPath("/blog")} className="block px-3 py-2.5 rounded-lg hover:bg-muted text-sm font-medium">
                {t("header.nav.resources")}
              </Link>
              <Link to={localizedPath("/quem-somos")} className="block px-3 py-2.5 rounded-lg hover:bg-muted text-sm font-medium">
                {t("header.nav.company")}
              </Link>
              <div className="px-3 pt-2">
                <Button variant="hero" className="w-full group">
                  {t("header.ctaSolutions")}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
